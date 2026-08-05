"use client";

import { useEffect, useRef, useState } from "react";
import type { AnalyzeResponse } from "@/components/AiReflectionCard";
import { RitualResult } from "@/components/RitualResult";
import { canAnalyzeNow, recordAnalysisUsed } from "@/lib/dream-memory";
import { track } from "@/lib/events";
import {
  EMOTION_OPTIONS,
  EMPTY_CONTEXT,
  FOCUS_OPTIONS,
  type DreamContext
} from "@/lib/ritual";

/**
 * Phase 5.2 Dream Reflection UX — onboard in 3 seconds.
 *
 * Flow: Dream (title optional + description required + optional focus/emotion)
 *       -> Processing ritual -> Reflection Journey -> Save / Share.
 *
 * No forced categorization: focus and emotion are optional modifiers that only
 * shape the Personal Reflection / Guidance, never the interpretation itself.
 */
type Step = "dream" | "processing" | "result";

const STEP_INDEX: Array<{ id: Step; label: string }> = [
  { id: "dream", label: "Dream" },
  { id: "result", label: "Reflection" }
];

const PROCESSING_MESSAGES = [
  "🌙 Reflecting on your dream…",
  "🔎 Exploring symbols…",
  "📖 Reviewing traditional perspectives…",
  "✨ Preparing your reflection…"
];

export interface RitualFlowProps {
  /** Pre-selected symbol from an SEO page link (/interpreter?symbol=snake). */
  initialSymbol?: string;
}

export function RitualFlow({ initialSymbol }: RitualFlowProps) {
  const [step, setStep] = useState<Step>("dream");
  const [context, setContext] = useState<DreamContext>(EMPTY_CONTEXT);
  const [dreamTitle, setDreamTitle] = useState("");
  const [dreamText, setDreamText] = useState(
    initialSymbol ? `I dreamed about a ${initialSymbol.replace(/-/g, " ")}` : ""
  );
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [limitHit, setLimitHit] = useState(false);
  const [visibleMsg, setVisibleMsg] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);
  const titleTracked = useRef(false);

  // Funnel start.
  useEffect(() => {
    track("interpreter_open");
  }, []);

  // Seed the dream input when arriving from an SEO page.
  useEffect(() => {
    if (initialSymbol) {
      setDreamText(`I dreamed about a ${initialSymbol.replace(/-/g, " ")}`);
    }
  }, [initialSymbol]);

  // Processing animation: reveal messages one by one.
  useEffect(() => {
    if (step !== "processing") return;
    setVisibleMsg(0);
    const timer = setInterval(() => {
      setVisibleMsg((v) => Math.min(v + 1, PROCESSING_MESSAGES.length - 1));
    }, 700);
    return () => clearInterval(timer);
  }, [step]);

  // Scroll the result into view + funnel events.
  useEffect(() => {
    if (step === "result") {
      track("result_viewed");
      track("reflection_completed");
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }, [step]);

  function handleTitleChange(value: string) {
    setDreamTitle(value);
    if (value.trim().length > 0 && !titleTracked.current) {
      titleTracked.current = true;
      track("dream_title_added");
    }
  }

  function toggleFocus(id: string) {
    setContext((c) => {
      const has = c.focus.includes(id);
      const next = has ? c.focus.filter((f) => f !== id) : [...c.focus, id];
      return { ...c, focus: next.slice(0, 3) };
    });
    track("focus_selected", { focus: id });
  }

  function toggleEmotion(value: string) {
    setContext((c) => {
      const has = c.emotion.includes(value);
      const next = has ? c.emotion.filter((e) => e !== value) : [value];
      return { ...c, emotion: next.slice(0, 3) };
    });
    track("emotion_selected", { emotion: value });
  }

  async function analyzeDream() {
    const text = dreamText.trim();
    if (!text) return;

    // Soft reflection limit: 1 free reflection per device (Phase 5 P2).
    if (!canAnalyzeNow()) {
      setLimitHit(true);
      return;
    }

    setError(null);
    setResult(null);
    setLimitHit(false);
    track("reflection_started");
    setStep("processing");

    const startedAt = Date.now();
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dream: text, context })
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Analysis failed");
      }
      const data = (await res.json()) as AnalyzeResponse;
      recordAnalysisUsed();
      track("analysis_completed", { symbols: data.verifiedSymbols.length });
      // Keep the ritual pause: always show the animation for ~2.8s.
      const elapsed = Date.now() - startedAt;
      const wait = Math.max(0, 2800 - elapsed);
      setTimeout(() => {
        setResult(data);
        setStep("result");
      }, wait);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setTimeout(() => {
        setError(msg);
        setStep("dream");
      }, 1200);
    }
  }

  function restart() {
    setResult(null);
    setError(null);
    setLimitHit(false);
    setDreamText("");
    setDreamTitle("");
    titleTracked.current = false;
    setContext(EMPTY_CONTEXT);
    setStep("dream");
  }

  /* ---------------------------------------------------------------- */
  /* Step: dream (first screen — title optional, description required) */
  /* ---------------------------------------------------------------- */
  if (step === "dream") {
    return (
      <div className="ritual">
        <StepHeader
          current="dream"
          title="Reflect on Your Dream"
          subtitle="Every dream is personal. Explore its symbols through Islamic traditions and personal reflection."
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (dreamText.trim()) {
              track("dream_submitted");
              void analyzeDream();
            }
          }}
        >
          <label className="interp-form__label" htmlFor="ritual-title">
            Give your dream a name (optional)
          </label>
          <input
            id="ritual-title"
            type="text"
            value={dreamTitle}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="My dream"
            maxLength={60}
            className="ritual-title__input"
          />

          <label className="interp-form__label" htmlFor="ritual-dream">
            Describe your dream
          </label>
          <textarea
            id="ritual-dream"
            value={dreamText}
            onChange={(e) => setDreamText(e.target.value)}
            placeholder="Example: I saw clear water under the moon…"
            rows={5}
            maxLength={800}
            className="interp-form__textarea ritual__textarea"
          />

          <fieldset className="ritual-group ritual-group--optional">
            <legend>What part of life feels connected? <em>(optional)</em></legend>
            <div className="option-row">
              {FOCUS_OPTIONS.map((opt) => {
                const selected = context.focus.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`option-chip${selected ? " option-chip--selected" : ""}`}
                    onClick={() => toggleFocus(opt.id)}
                    aria-pressed={selected}
                  >
                    <span aria-hidden="true">{opt.icon}</span> {opt.title}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="ritual-group ritual-group--optional">
            <legend>How did the dream feel? <em>(optional)</em></legend>
            <div className="option-row">
              {EMOTION_OPTIONS.map((opt) => {
                const selected = context.emotion.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    className={`option-chip${selected ? " option-chip--selected" : ""}`}
                    onClick={() => toggleEmotion(opt.value)}
                    aria-pressed={selected}
                  >
                    <span aria-hidden="true">{opt.icon}</span> {opt.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {error && <div className="chat__error" role="alert">{error}</div>}

          {limitHit && (
            <div className="chat__error" role="alert">
              You have used your free reflection for this device. Save your dream
              to keep the journey going, and check back soon.
            </div>
          )}

          <StepNav
            primaryLabel="Begin Reflection"
            onPrimary={() => {
              if (dreamText.trim()) {
                track("dream_submitted");
                void analyzeDream();
              }
            }}
            disabled={dreamText.trim().length === 0}
          />
        </form>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /* Step: processing                                                  */
  /* ---------------------------------------------------------------- */
  if (step === "processing") {
    return (
      <div className="ritual ritual--processing" role="status" aria-live="polite">
        <div className="processing-moon" aria-hidden="true">
          <span className="processing-moon__crescent" />
          <span className="processing-moon__orbit" />
        </div>
        <h2>Your reflection is being prepared</h2>
        <ul className="processing-list">
          {PROCESSING_MESSAGES.map((msg, i) => (
            <li key={msg} className={visibleMsg >= i ? "processing-list__item--visible" : ""}>
              {msg}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /* Step: result                                                      */
  /* ---------------------------------------------------------------- */
  return (
    <div className="ritual" ref={resultRef}>
      {result && (
        <RitualResult
          response={result}
          dreamContext={context}
          dreamText={dreamText}
          dreamTitle={dreamTitle.trim()}
          onRestart={restart}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared step chrome                                                  */
/* ------------------------------------------------------------------ */

function StepHeader({ current, title, subtitle }: { current: Step; title: string; subtitle: string }) {
  return (
    <div className="ritual__head">
      <div className="ritual-progress" aria-label="Progress">
        {STEP_INDEX.map((s) => (
          <span
            key={s.id}
            className={`ritual-progress__step${s.id === current ? " ritual-progress__step--active" : ""}`}
          >
            {s.label}
          </span>
        ))}
      </div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

function StepNav({
  primaryLabel,
  onPrimary,
  disabled
}: {
  primaryLabel: string;
  onPrimary: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="ritual-nav">
      <button
        type="button"
        className="ritual-nav__primary"
        onClick={onPrimary}
        disabled={disabled}
      >
        {primaryLabel}
      </button>
    </div>
  );
}
