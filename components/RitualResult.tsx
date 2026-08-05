"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { AnalyzeResponse, ApiVerifiedSymbol } from "@/components/AiReflectionCard";
import { SaveReflection } from "@/components/SaveReflection";
import { ShareCard } from "@/components/ShareCard";
import { TraditionalPerspective, type TraditionalSymbolData } from "@/components/TraditionalPerspective";
import { track } from "@/lib/events";
import {
  deriveThemes,
  emotionLabel,
  focusLabel,
  type DreamContext
} from "@/lib/ritual";
import { dreamUrl } from "@/lib/site";

export interface RitualResultProps {
  response: AnalyzeResponse;
  dreamContext: DreamContext;
  dreamText: string;
  /** Optional title the dreamer gave their dream (Phase 5.2 P0-2). */
  dreamTitle?: string;
  onRestart: () => void;
}

function symbolName(s: ApiVerifiedSymbol): string {
  return (s.entityName ?? s.raw).replace(/\s*Dream\s*/i, "");
}

/**
 * Neutral reflection line per symbol. Deterministic template — never a claim.
 */
function symbolReflection(name: string): string {
  const n = name.toLowerCase();
  if (/snake/.test(n)) {
    return "This symbol may invite you to think about changes, uncertainty, or hidden concerns.";
  }
  if (/water|river|sea/.test(n)) {
    return "Water may invite reflection on emotions, flow, and the pace of your inner life.";
  }
  if (/dead|deceased|passed/.test(n)) {
    return "Dreams of the departed may invite gentle remembrance and quiet reflection on what they meant to you.";
  }
  if (/teeth|tooth/.test(n)) {
    return "Teeth may invite reflection on confidence, self-image, or things you feel you cannot hold onto.";
  }
  if (/pregnan|baby/.test(n)) {
    return "This symbol may invite reflection on beginnings, hopes, or something new taking shape in your life.";
  }
  return `${name} may invite you to consider what it represents in your own life right now.`;
}

function guidanceTemplates(emotions: string[], memoryLevel: DreamContext["memoryLevel"]) {
  const feelsPeaceful = emotions.some((e) => e === "peace" || e === "beauty");
  const feelsHeavy = emotions.some((e) => e === "fear" || e === "sadness");

  const positive = feelsPeaceful
    ? "Your dream carries a gentle, calm tone. It may point toward inner peace, clarity, or something uplifting in your waking life."
    : feelsHeavy
      ? "Even when a dream feels heavy, it can be a way for your mind to process what matters to you. Noticing it is already a meaningful step."
      : "Your dream may carry a meaningful invitation to pause and look inward with kindness.";

  const consider = [
    `You remember ${memoryLevel === "full" ? "the full dream" : memoryLevel === "partial" ? "important moments" : "only one symbol"} — that is enough to begin reflecting.`,
    "Consider what in your waking life echoes the feeling of this dream.",
    "Consider whether the dream repeated, or whether it felt connected to a specific concern."
  ];

  const actions = [
    "Consider taking a quiet moment today to sit with the symbol that stood out most.",
    "Consider writing the dream down, even in a few words, while it is still fresh.",
    "For recurring or troubling dreams, consider speaking with a trusted scholar."
  ];

  return { positive, consider, actions };
}

export function RitualResult({ response, dreamContext, dreamText, dreamTitle, onRestart }: RitualResultProps) {
  const verified = response.verifiedSymbols;
  const names = verified.map(symbolName);
  const themes = deriveThemes(names);
  const guidance = guidanceTemplates(response.emotions, dreamContext.memoryLevel);
  const hasFocus = dreamContext.focus.length > 0;

  // Trust Layer: build traditional perspective data from verified symbols.
  const traditionalSymbols: TraditionalSymbolData[] = verified.map((s) => ({
    name: symbolName(s),
    entityId: s.entityId,
    traditionalNotes: s.traditionalNotes,
    classicalSources: s.classicalSources,
    sourceStatus: s.sourceStatus
  }));

  // Trust Layer: source status per symbol for memory persistence.
  const memorySources = verified
    .filter((s) => s.entityId)
    .map((s) => ({
      symbol: symbolName(s),
      sourceStatus: s.sourceStatus ?? "pending"
    }));

  // Funnel: the result was reached, symbols and tradition shown.
  useEffect(() => {
    if (verified.length > 0) track("symbol_viewed", { symbolCount: names.length });
    track("traditional_viewed");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ritual-result">
      <div className="ritual-result__kicker">
        {dreamTitle ? `Your Dream Reflection — ${dreamTitle}` : "Your Dream Reflection"}
      </div>

      {/* P1-5: Dream Symbol Summary — instant feedback that the dream was understood */}
      {names.length > 0 && (
        <section className="rr-section rr-summary" aria-labelledby="rr-summary">
          <h2 id="rr-summary">Your Dream Symbols</h2>
          <div className="rr-summary__symbols">
            {names.map((n) => (
              <span key={n} className="rr-summary__sym">🌙 {n}</span>
            ))}
          </div>
          {themes.length > 0 && (
            <p className="rr-summary__note">
              Theme{themes.length > 1 ? "s" : ""}: {themes.join(" · ")}
            </p>
          )}
          <p className="rr-summary__hint">These symbols were identified from your dream.</p>
        </section>
      )}

      {/* Your Reflection Journey (Phase 5, P4) */}
      <section className="rr-section rr-journey" aria-labelledby="rr-journey">
        <h2 id="rr-journey">Your Reflection Journey</h2>
        <div className="rr-journey__body">
          <div className="rr-journey__col">
            <span className="rr-journey__label">You explored</span>
            <div className="rr-journey__symbols">
              {names.length > 0 ? (
                names.map((n) => <span key={n} className="rr-journey__sym">🌙 {n}</span>)
              ) : (
                <span className="rr-journey__sym">—</span>
              )}
            </div>
          </div>
          <div className="rr-journey__col">
            <span className="rr-journey__label">Your focus</span>
            <p className="rr-journey__value">{hasFocus ? dreamContext.focus.map(focusLabel).join(", ") : "General"}</p>
            <span className="rr-journey__label">Reflection created</span>
            <p className="rr-journey__value">Today</p>
          </div>
        </div>
      </section>

      {/* 1. Dream Overview */}
      <section className="rr-section" aria-labelledby="rr-overview">
        <h2 id="rr-overview">Dream Overview</h2>
        {verified.length > 0 ? (
          <p className="rr-overview__intro">
            Your dream contains {names.slice(0, 2).map((n, i) => `${i > 0 ? " and " : ""}${n}`).join("")}.
          </p>
        ) : (
          <p className="rr-overview__intro">Your dream did not clearly match a symbol in the knowledge base yet.</p>
        )}
        {themes.length > 0 && (
          <div className="rr-themes" aria-label="Main themes found">
            <span className="rr-themes__label">Main themes:</span>
            {themes.map((t) => (
              <span key={t} className="rr-theme-chip">{t}</span>
            ))}
          </div>
        )}
        {dreamContext.focus.length > 0 && (
          <p className="rr-overview__focus">
            Reflecting on: {dreamContext.focus.map(focusLabel).join(", ")}
            {dreamContext.emotion.length > 0 && ` · felt ${dreamContext.emotion.map(emotionLabel).join(", ").toLowerCase()}`}
          </p>
        )}
      </section>

      {/* 2. What We Found (Phase 5.2 P3-1/P3-2) */}
      <section className="rr-section" aria-labelledby="rr-symbols">
        <h2 id="rr-symbols">What We Found</h2>
        {verified.length > 0 ? (
          <p className="rr-symbols__lead">
            We matched the following symbols from your dream description.
          </p>
        ) : (
          <p className="rr-symbols__lead">Your dream did not clearly match a symbol in the knowledge base yet.</p>
        )}
        {verified.map((s) => (
          <article key={s.raw} className="rr-symbol">
            <h3>{symbolName(s)}</h3>
            {s.slug ? (
              <Link href={dreamUrl(s.slug)} className="rr-symbol__link">
                Explore the full {symbolName(s)} page →
              </Link>
            ) : (
              <span className="rr-symbol__note">No dedicated page yet.</span>
            )}
            {/* P3-2: why this symbol appeared */}
            <div className="rr-symbol__detect" role="note">
              <span className="rr-symbol__detect-label">Detected</span>
              <p className="rr-symbol__detect-reason">
                Because your dream description mentioned: “{s.raw}”
              </p>
            </div>
            <div className="rr-symbol__block">
              <span className="rr-symbol__block-label">Traditional context</span>
              <p className="rr-symbol__pending">
                Pending verification — sources are reviewed by a human editor before
                any traditional view is presented as doctrine.
              </p>
            </div>
            <div className="rr-symbol__block">
              <span className="rr-symbol__block-label">Reflection</span>
              <p>{symbolReflection(symbolName(s))}</p>
            </div>
          </article>
        ))}
      </section>

      {/* 3. Traditional Perspective (Trust Layer) */}
      <TraditionalPerspective symbols={traditionalSymbols} />

      {/* 4. Context Matters (Phase 5.2 P1-3) */}
      <section className="rr-section rr-context" aria-labelledby="rr-context">
        <h2 id="rr-context">Context Matters</h2>
        <p className="rr-context__lead">
          In Islamic dream traditions, symbols may be understood differently
          depending on:
        </p>
        <ul className="rr-context__list">
          <li>The dreamer&apos;s circumstances</li>
          <li>Emotions during the dream</li>
          <li>The surrounding symbols</li>
          <li>Personal reflection</li>
        </ul>
        <p className="rr-context__note">
          A symbol is not a fixed answer. It is an invitation to look inward
          with your own context in mind.
        </p>
      </section>

      {/* 5. Islamic Reflection — sourced from classical traditions (Phase 5.2 P1-4) */}
      {response.reflection && (
        <section className="rr-section" aria-labelledby="rr-ai">
          <h2 id="rr-ai">Islamic Reflection</h2>
          <p className="rr-ai-lead">
            According to some traditional discussions, these symbols may be
            reflected upon in the following ways. These are not fixed meanings.
          </p>
          <div className="rr-ai-note">
            {response.reflection.split("\n").map((line, i) =>
              line.trim() ? <p key={i}>{line}</p> : null
            )}
          </div>
        </section>
      )}

      {/* 6. Personal Reflection — grounded in the dreamer's input */}
      <section className="rr-section" aria-labelledby="rr-focus">
        <h2 id="rr-focus">Personal Reflection</h2>
        {hasFocus && response.focusReadings && response.focusReadings.length > 0 ? (
          response.focusReadings.map((fr) => (
            <article key={fr.focus} className="rr-focus">
              <h3>{focusLabel(fr.focus)}</h3>
              <ul>
                {fr.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))
        ) : (
          <p className="rr-focus__empty">
            {dreamContext.emotion.length > 0
              ? `Your dream carried feelings of ${dreamContext.emotion.map(emotionLabel).join(", ").toLowerCase()}. You may reflect on where those feelings echo in your waking life right now.`
              : "Your dream is yours to interpret with your own context. Consider what stood out most to you and how it felt."}
          </p>
        )}
      </section>

      {/* 7. Gentle Guidance */}
      <section className="rr-section" aria-labelledby="rr-guidance">
        <h2 id="rr-guidance">Gentle Guidance</h2>
        <div className="rr-guidance">
          <div className="rr-guidance__col">
            <span className="rr-guidance__label">Positive reflection</span>
            <p>{guidance.positive}</p>
          </div>
          <div className="rr-guidance__col">
            <span className="rr-guidance__label">Things to consider</span>
            <ul>{guidance.consider.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
          <div className="rr-guidance__col">
            <span className="rr-guidance__label">Suggested actions</span>
            <ul>{guidance.actions.map((a) => <li key={a}>{a}</li>)}</ul>
          </div>
        </div>
      </section>

      <p className="rr-disclaimer">
        Dream interpretations are not predictions or religious rulings. They are
        reflections based on available traditions and symbolic patterns.
      </p>

      {/* Save / Share (Phase 5, P0+P2) */}
      <div className="rr-save">
        <SaveReflection
          dreamTitle={dreamTitle}
          dreamText={dreamText}
          focus={dreamContext.focus}
          context={{
            emotion: dreamContext.emotion,
            memoryLevel: dreamContext.memoryLevel,
            characters: dreamContext.characters
          }}
          symbols={names}
          reflection={response.reflection}
          guidance={guidance.actions.join(" ")}
          sources={memorySources}
        />
      </div>

      {/* Share card */}
      <ShareCard symbols={names} themes={themes} focus={dreamContext.focus.map(focusLabel)} />

      <div className="ritual-nav ritual-nav--result">
        <button type="button" className="ritual-nav__back" onClick={onRestart}>
          ← Begin a new reflection
        </button>
      </div>
    </div>
  );
}
