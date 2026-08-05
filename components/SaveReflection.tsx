"use client";

import { useState } from "react";
import Link from "next/link";
import { saveMemory, updateMemoryShareId } from "@/lib/dream-memory";
import { track } from "@/lib/events";
import { CURRENT_TIER, MEMORY_POLICY } from "@/lib/memory-policy";

export interface SaveReflectionProps {
  /** Optional title the dreamer gave their dream (Phase 5.2 P0-2). */
  dreamTitle?: string;
  dreamText: string;
  focus: string[];
  context: {
    emotion?: string[];
    memoryLevel?: string;
    characters?: string[];
  };
  symbols: string[];
  reflection: string;
  guidance?: string;
  /** Trust Layer: source status per symbol (Phase 5.1 P0-8-5). */
  sources?: Array<{ symbol: string; sourceStatus: string }>;
}

/**
 * Ritual save flow (Phase 5.1, P0-3/P0-4).
 *
 * Keep this dream moment 🌙 → two single-choice questions (feeling +
 * expectation) → ritual completion → link to My Dreams.
 *
 * Sharing (P0-6) is purely a way to spread the reflection — it no longer
 * grants extra analysis slots.
 */
const FEELING_OPTIONS: Array<{ value: string; icon: string; label: string }> = [
  { value: "peaceful", icon: "😌", label: "Peaceful" },
  { value: "worried", icon: "😰", label: "Worried" },
  { value: "sad", icon: "😢", label: "Sad" },
  { value: "happy", icon: "😊", label: "Happy" },
  { value: "curious", icon: "🤔", label: "Curious" },
  { value: "neutral", icon: "😐", label: "Neutral" }
];

const EXPECTATION_OPTIONS: Array<{ value: string; icon: string; label: string }> = [
  { value: "love", icon: "❤️", label: "Love" },
  { value: "career", icon: "💼", label: "Career" },
  { value: "growth", icon: "🌱", label: "Personal Growth" },
  { value: "spiritual", icon: "🕌", label: "Spiritual Reflection" },
  { value: "general", icon: "🌙", label: "General Understanding" }
];

type SaveStage = "closed" | "questions" | "saving" | "done" | "full";

export function SaveReflection(props: SaveReflectionProps) {
  const [stage, setStage] = useState<SaveStage>("closed");
  const [feeling, setFeeling] = useState<string | null>(null);
  const [expectation, setExpectation] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copying, setCopying] = useState(false);

  const policy = MEMORY_POLICY[CURRENT_TIER];

  function openFlow() {
    track("save_flow_started");
    setStage("questions");
  }

  function pickFeeling(value: string) {
    setFeeling(value);
    track("feeling_selected", { feeling: value });
  }

  function pickExpectation(value: string) {
    setExpectation(value);
    track("expectation_selected", { expectation: value });
  }

  function completeSave() {
    if (!feeling || !expectation) return;
    setStage("saving");
    const result = saveMemory({
      title: props.dreamTitle,
      dreamText: props.dreamText,
      focus: props.focus,
      context: props.context,
      symbols: props.symbols,
      reflection: props.reflection,
      guidance: props.guidance ?? "",
      userFeeling: feeling,
      expectation,
      sources: props.sources
    });
    if (!result.ok) {
      track("memory_limit_hit");
      setStage("full");
      return;
    }
    if (result.expiredCount > 0) track("memory_expired", { removed: result.expiredCount });
    track("save_completed");
    setTimeout(() => setStage("done"), 700);
  }

  async function handleShare() {
    track("share_clicked");
    try {
      const res = await fetch("/api/reflections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbols: props.symbols,
          focus: props.focus,
          reflection: props.reflection
        })
      });
      if (!res.ok) throw new Error("Share failed");
      const data = (await res.json()) as { shareId: string };
      const url = `${window.location.origin}/reflection/${data.shareId}`;

      const saved = saveMemory({
        title: props.dreamTitle,
        dreamText: props.dreamText,
        focus: props.focus,
        context: props.context,
        symbols: props.symbols,
        reflection: props.reflection,
        guidance: props.guidance ?? ""
      });
      if (saved.ok) updateMemoryShareId(saved.memory.id, data.shareId);

      track("share_completed");
      setShareUrl(url);
    } catch {
      setError(true);
    }
  }

  async function copyLink() {
    if (!shareUrl) return;
    setCopying(true);
    try {
      await navigator.clipboard.writeText(shareUrl);
    } finally {
      setTimeout(() => setCopying(false), 1200);
    }
  }

  /* ------------------------- done (ritual completion) ------------------------- */
  if (stage === "done") {
    return (
      <div className="ritual-done">
        <div className="ritual-done__moon" aria-hidden="true">
          <span className="ritual-done__crescent" />
        </div>
        <h3>Reflection preserved 🌙</h3>
        <p className="ritual-done__date">
          {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <p className="ritual-done__line">Your dream journey has begun.</p>
        <Link href="/my-dreams" className="ritual-done__btn">
          View My Dreams
        </Link>
      </div>
    );
  }

  /* ------------------------- full (limit reached) ------------------------- */
  if (stage === "full") {
    return (
      <div className="ritual-full">
        <h3>Your dream space is full 🌙</h3>
        <p>
          Anonymous reflections are kept for {policy.retentionDays} days
          ({policy.maxRecords} at a time). Create an account later to keep your
          dream journey longer.
        </p>
        <button type="button" className="ritual-full__btn" onClick={() => setStage("closed")}>
          Continue exploring
        </button>
      </div>
    );
  }

  /* ------------------------- questions ------------------------- */
  if (stage === "questions" || stage === "saving") {
    return (
      <div className="ritual-questions">
        <h3>Before keeping this reflection…</h3>

        <fieldset className="ritual-group" disabled={stage === "saving"}>
          <legend>How did this dream make you feel?</legend>
          <div className="option-row">
            {FEELING_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`option-chip${feeling === opt.value ? " option-chip--selected" : ""}`}
                onClick={() => pickFeeling(opt.value)}
                aria-pressed={feeling === opt.value}
              >
                <span aria-hidden="true">{opt.icon}</span> {opt.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="ritual-group" disabled={stage === "saving"}>
          <legend>What would you like to reflect on?</legend>
          <div className="option-row">
            {EXPECTATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`option-chip${expectation === opt.value ? " option-chip--selected" : ""}`}
                onClick={() => pickExpectation(opt.value)}
                aria-pressed={expectation === opt.value}
              >
                <span aria-hidden="true">{opt.icon}</span> {opt.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="ritual-questions__actions">
          <button type="button" className="ritual-nav__back" onClick={() => setStage("closed")}>
            ← Back
          </button>
          <button
            type="button"
            className="ritual-nav__primary"
            disabled={!feeling || !expectation || stage === "saving"}
            onClick={completeSave}
          >
            {stage === "saving" ? "Preserving…" : "Save"}
          </button>
        </div>
      </div>
    );
  }

  /* ------------------------- closed (default) ------------------------- */
  return (
    <div className="save-reflection">
      <h3 className="save-reflection__title">Keep this dream reflection</h3>
      <p className="save-reflection__sub">Save this moment and revisit it later.</p>

      <div className="save-reflection__actions">
        <button type="button" className="save-reflection__save" onClick={openFlow}>
          Save Dream
        </button>
        <button type="button" className="save-reflection__share-btn" onClick={handleShare}>
          Share Reflection
        </button>
      </div>

      {shareUrl && (
        <div className="save-reflection__share">
          <span className="save-reflection__share-label">Your reflection link is ready:</span>
          <div className="save-reflection__linkrow">
            <code className="save-reflection__link">{shareUrl}</code>
            <button type="button" className="save-reflection__copy" onClick={copyLink}>
              {copying ? "Copied ✓" : "Copy link"}
            </button>
          </div>
        </div>
      )}
      {error && <p className="save-reflection__error">Sharing failed. Please try again shortly.</p>}
    </div>
  );
}
