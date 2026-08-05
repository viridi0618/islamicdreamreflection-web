/**
 * POST /api/analyze
 *
 * Orchestrates the AI interpreter pipeline on the server:
 *
 *   dream text + ritual context
 *     -> [AI mode] DeepSeek extraction  | [fallback] rule parser
 *     -> symbol verification against the knowledge base (hard boundary)
 *     -> knowledge context built from verified entities only
 *     -> focus reading built from focus modifiers (template, never predicted)
 *     -> [AI mode] DeepSeek generation  | [fallback] template reflection
 *     -> response
 *
 * Security notes:
 *  - The DeepSeek API key lives only on the server (env var).
 *  - Extraction output is never trusted: symbols must resolve to entities.
 *  - Focus readings are deterministic templates tuned to the selected focus;
 *    they never predict outcomes (see lib/ritual.ts FOCUS_MODIFIERS).
 */
import { NextResponse } from "next/server";
import {
  buildKnowledgeContext,
  verifySymbols
} from "@/lib/ai/verify";
import { cacheKeyFor, getCachedReflection, setCachedReflection } from "@/lib/ai/cache";
import {
  deepSeekConfig,
  extractDreamStructure,
  generateReflection,
  isAiModeEnabled
} from "@/lib/ai/deepseek";
import { loadDreamEntity, loadEnabledPages } from "@/lib/data";
import { parseDream } from "@/lib/dream-parser";
import { buildReflection, matchKnowledge } from "@/lib/dream-matcher";
import {
  EMPTY_CONTEXT,
  emotionLabel,
  focusLabel,
  focusModifierById,
  type DreamContext
} from "@/lib/ritual";
import { aggregateSourceStatus, type SourceStatus } from "@/lib/source-status";

export const runtime = "nodejs";
export const maxDuration = 60;

const BAD_REQUEST = { error: "Please describe your dream." } as const;
const TOO_LONG = { error: "Dream description is too long (max 800 characters)." } as const;
const AI_ERROR = {
  error: "The interpreter could not reach the AI service. Please try again shortly."
} as const;

interface AnalyzeBody {
  dream?: string;
  followUp?: string;
  context?: Partial<DreamContext>;
}

function sanitizeContext(ctx: unknown): DreamContext {
  const c = (ctx ?? {}) as Partial<DreamContext>;
  return {
    focus: Array.isArray(c.focus) ? c.focus.filter((f): f is string => typeof f === "string").slice(0, 3) : [],
    emotion: Array.isArray(c.emotion) ? c.emotion.filter((e): e is string => typeof e === "string").slice(0, 3) : [],
    memoryLevel: c.memoryLevel === "full" || c.memoryLevel === "partial" || c.memoryLevel === "symbol"
      ? c.memoryLevel
      : EMPTY_CONTEXT.memoryLevel,
    characters: Array.isArray(c.characters) ? c.characters.filter((x): x is string => typeof x === "string").slice(0, 4) : []
  };
}

/**
 * Builds the ritual context block injected into the generation prompt.
 * Tunes expression only — deterministic, never predictive.
 */
function buildRitualContextText(ctx: DreamContext): string {
  const parts: string[] = [];
  if (ctx.focus.length > 0) {
    parts.push(
      `Focus areas: ${ctx.focus.map(focusLabel).join(", ")}. ` +
      ctx.focus.map((id) => {
        const m = focusModifierById(id);
        return m ? `For ${focusLabel(id)}, reflect on ${m.reflectionPatterns.join(", ")}.` : "";
      }).filter(Boolean).join(" ")
    );
  }
  if (ctx.emotion.length > 0) parts.push(`The dream felt: ${ctx.emotion.map(emotionLabel).join(", ")}.`);
  parts.push(`Memory level: ${ctx.memoryLevel}.`);
  if (ctx.characters.length > 0) parts.push(`Characters present: ${ctx.characters.join(", ")}.`);
  return parts.join("\n");
}

/**
 * Deterministic personal-focus reading from the focus modifiers + verified
 * symbols. Uses only "may / can reflect / consider" phrasing.
 */
function buildFocusReadings(ctx: DreamContext, symbolNames: string[]): Array<{ focus: string; points: string[] }> {
  if (ctx.focus.length === 0) return [];
  const symbols = symbolNames.length > 0 ? symbolNames.slice(0, 3).join(" and ") : "your dream symbols";
  return ctx.focus.map((id) => {
    const m = focusModifierById(id);
    const points = m
      ? [
          `Considering your dream symbols, you may reflect on ${m.reflectionPatterns.join(", ")}.`,
          `The ${symbols} in your dream can serve as a gentle mirror for how you feel about ${focusLabel(id).toLowerCase()} at this moment.`,
          ...m.suggestedActions.slice(0, 2).map((a) => `You may consider: ${a}`)
        ]
      : [
          `Considering your dream symbols, you may take a quiet moment to reflect on ${focusLabel(id).toLowerCase()}.`
        ];
    return { focus: focusLabel(id), points };
  });
}

export async function POST(req: Request): Promise<NextResponse> {
  let body: AnalyzeBody;
  try {
    body = (await req.json()) as AnalyzeBody;
  } catch {
    return NextResponse.json(BAD_REQUEST, { status: 400 });
  }

  const dream = (body.dream ?? "").trim();
  if (dream.length === 0) {
    return NextResponse.json(BAD_REQUEST, { status: 400 });
  }
  if (dream.length > 800) {
    return NextResponse.json(TOO_LONG, { status: 400 });
  }
  const followUp = (body.followUp ?? "").trim().slice(0, 400);
  const context = sanitizeContext(body.context);

  const aiMode = isAiModeEnabled();
  const config = deepSeekConfig();

  const enabled = loadEnabledPages();
  const entities = enabled.map(({ page }) => page.entityId).map(loadDreamEntity);

  try {
    // ---- Phase 1: extraction (AI with graceful degradation to rule parser) ----
    let aiExtracted: Awaited<ReturnType<typeof extractDreamStructure>> | null = null;
    if (aiMode) {
      try {
        aiExtracted = await extractDreamStructure(dream, config);
      } catch (err) {
        // Flash models sometimes return unparseable output; fall back to the
        // deterministic rule parser so the user still gets a result.
        console.warn("[api/analyze] AI extraction failed, using rule parser", err);
      }
    }
    const ruleExtracted = aiExtracted ? null : parseDream(dream);

    const rawSymbols: string[] = aiExtracted
      ? aiExtracted.symbols
      : ruleExtracted!.symbols.map((s) => s.name);

    const emotions = aiExtracted?.emotions ?? ruleExtracted!.emotions ?? [];
    const scenario = aiExtracted?.scenario ?? [];

    // ---- Hard boundary: verify against the knowledge base ----
    const verified = verifySymbols(rawSymbols, entities);
    const matchedIds = verified
      .map((v) => v.entityId)
      .filter((id): id is string => id !== null);

    const contextBlock = buildKnowledgeContext(verified);
    const ritualContext = buildRitualContextText(context);
    const focusReadings = buildFocusReadings(context, verified.map((v) => v.entity?.name ?? v.raw).filter(Boolean));

    // ---- Phase 2: generation (AI, cached, or template fallback) ----
    let reflection: string;
    let generatedByAi = false;
    const cacheKey = cacheKeyFor(matchedIds);
    const cached = followUp ? null : getCachedReflection(cacheKey);

    if (cached) {
      reflection = cached;
    } else if (aiMode) {
      try {
        reflection = await generateReflection(
          { dreamText: dream, knowledgeContext: contextBlock, followUp, ritualContext },
          config
        );
        generatedByAi = true;
        if (!followUp) setCachedReflection(cacheKey, reflection);
      } catch (err) {
        // AI service unreachable/failed: degrade to the deterministic template
        // so the journey is never blocked on an upstream outage.
        console.warn("[api/analyze] AI generation failed, using template reflection", err);
        const parse = parseDream(dream);
        const matches = matchKnowledge(parse, entities, () => undefined);
        reflection = buildReflection(matches);
      }
    } else {
      const parse = parseDream(dream);
      const matches = matchKnowledge(parse, entities, () => undefined);
      reflection = buildReflection(matches);
    }

    return NextResponse.json({
      mode: generatedByAi || (aiMode && cached) ? "ai" : "fallback",
      reflection,
      verifiedSymbols: verified.map((v) => {
        const sources = v.entity?.classical_sources ?? [];
        const sourceStatuses: SourceStatus[] = sources.map((s) => (s.status ?? "pending") as SourceStatus);
        return {
          raw: v.raw,
          entityId: v.entityId,
          entityName: v.entity?.name ?? null,
          slug: v.entityId ? enabled.find(({ page }) => page.entityId === v.entityId)?.page.slug : undefined,
          // Trust Layer: traditional perspective data
          traditionalNotes: v.entity?.traditional_notes ?? [],
          classicalSources: sources.map((s) => ({
            name: s.name ?? s.tradition ?? "Classical tradition",
            tradition: s.tradition,
            status: s.status ?? "pending",
            notes: s.notes
          })),
          sourceStatus: aggregateSourceStatus(sourceStatuses)
        };
      }),
      emotions,
      scenario,
      context,
      focusReadings,
      aiMode
    });
  } catch (err) {
    console.error("[api/analyze]", err);
    return NextResponse.json(AI_ERROR, { status: 502 });
  }
}
