/**
 * DeepSeek API client (OpenAI-compatible chat completions).
 *
 * Configuration comes from environment variables:
 *   DEEPSEEK_API_KEY   required for AI mode (absent -> rule-based fallback)
 *   DEEPSEEK_MODEL     default "deepseek-v4-flash"
 *   DEEPSEEK_BASE_URL  default "https://api.deepseek.com"
 *
 * Only the server may hold the API key: this module is imported exclusively
 * from route handlers / server code, never from client components.
 */
import {
  EXTRACT_SYSTEM_PROMPT,
  GENERATE_SYSTEM_PROMPT,
  buildGenerationUserPrompt
} from "./prompts";

export interface DeepSeekConfig {
  apiKey?: string;
  baseUrl: string;
  model: string;
  timeoutMs: number;
}

export function deepSeekConfig(): DeepSeekConfig {
  return {
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseUrl: process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com",
    model: process.env.DEEPSEEK_MODEL ?? "deepseek-v4-flash",
    timeoutMs: 45_000
  };
}

/** True when an API key is configured (AI mode enabled). */
export function isAiModeEnabled(config: DeepSeekConfig = deepSeekConfig()): boolean {
  return Boolean(config.apiKey);
}

export interface ExtractedStructure {
  symbols: string[];
  emotions: string[];
  scenario: string[];
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

async function chatCompletion(
  config: DeepSeekConfig,
  messages: ChatMessage[],
  opts: { json?: boolean; maxTokens?: number } = {}
): Promise<string> {
  if (!config.apiKey) {
    throw new Error("DEEPSEEK_API_KEY is not configured");
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs);
  try {
    const res = await fetch(`${config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        model: config.model,
        messages,
        temperature: opts.json ? 0 : 0.6,
        max_tokens: opts.maxTokens ?? (opts.json ? 800 : 1600),
        ...(opts.json ? { response_format: { type: "json_object" } } : {})
      }),
      signal: controller.signal
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`DeepSeek API ${res.status}: ${body.slice(0, 300)}`);
    }
    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("DeepSeek API returned empty content");
    return content;
  } finally {
    clearTimeout(timer);
  }
}

/** Phase 1 — extract structure from the dream text (JSON mode). */
export async function extractDreamStructure(
  dreamText: string,
  config: DeepSeekConfig = deepSeekConfig()
): Promise<ExtractedStructure> {
  const raw = await chatCompletion(
    config,
    [
      { role: "system", content: EXTRACT_SYSTEM_PROMPT },
      { role: "user", content: dreamText }
    ],
    { json: true, maxTokens: 600 }
  );
  return parseExtraction(raw);
}

/**
 * Best-effort JSON object extraction from a model response.
 *
 * Flash models occasionally ignore `response_format: json_object` and return
 * markdown fences, prose before/after the object, or array-shaped payloads.
 * This strips all of that and recovers the first JSON object. Throws only
 * when no object-like content exists at all.
 */
function extractJsonObject(raw: string): string {
  let text = raw.trim();

  // Strip markdown code fences wherever they appear.
  text = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();

  const objectStart = text.indexOf("{");
  const objectEnd = text.lastIndexOf("}");
  if (objectStart !== -1 && objectEnd > objectStart) {
    return text.slice(objectStart, objectEnd + 1);
  }

  // Array-shaped payload (e.g. `[{"symbols": ...}]`): unwrap to its first element.
  const arrayStart = text.indexOf("[");
  if (arrayStart !== -1) {
    const arrayEnd = text.lastIndexOf("]");
    if (arrayEnd > arrayStart) {
      const inner = text.slice(arrayStart + 1, arrayEnd).trim();
      const elStart = inner.indexOf("{");
      const elEnd = inner.lastIndexOf("}");
      if (elStart !== -1 && elEnd > elStart) {
        return inner.slice(elStart, elEnd + 1);
      }
    }
  }

  throw new Error("Extraction returned no JSON");
}

/** Repairs common JSON syntax issues found in model output. */
function repairJson(text: string): string {
  return text
    // trailing commas before } or ]
    .replace(/,\s*([}\]])/g, "$1")
    // unquoted keys
    .replace(/([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:/g, '$1"$2":');
}

/** Tolerant JSON parse for the extraction response. */
export function parseExtraction(raw: string): ExtractedStructure {
  const candidate = extractJsonObject(raw);
  let data: unknown;
  try {
    data = JSON.parse(candidate);
  } catch {
    try {
      data = JSON.parse(repairJson(candidate));
    } catch {
      data = null;
    }
  }
  const obj = (data ?? {}) as Record<string, unknown>;
  const asStringArray = (v: unknown): string[] =>
    Array.isArray(v)
      ? v.filter((x): x is string => typeof x === "string").slice(0, 8)
      : [];
  return {
    symbols: asStringArray(obj.symbols),
    emotions: asStringArray(obj.emotions).slice(0, 4),
    scenario: asStringArray(obj.scenario).slice(0, 3)
  };
}

/** Phase 2 — generate the reflection from dream text + knowledge context. */
export async function generateReflection(
  params: { dreamText: string; knowledgeContext: string; followUp?: string; ritualContext?: string },
  config: DeepSeekConfig = deepSeekConfig()
): Promise<string> {
  return chatCompletion(config, [
    { role: "system", content: GENERATE_SYSTEM_PROMPT },
    { role: "user", content: buildGenerationUserPrompt(params) }
  ]);
}
