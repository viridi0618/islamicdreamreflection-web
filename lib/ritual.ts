/**
 * Interactive Dream Ritual Engine — data model (Phase 4).
 *
 * Collects structured context around the dream (focus, memory level,
 * emotion, characters) WITHOUT adding any new interpretation database.
 * The knowledge layer stays data/dreams/*.json; focus modifiers below only
 * adjust the EXPRESSION of a reflection, never add religious meaning.
 */

export type MemoryLevel = "full" | "partial" | "symbol";

export interface DreamContext {
  /** Life focus areas selected in Step 2 (multi-select, 1-3). */
  focus: string[];
  /** Dream emotion(s). */
  emotion: string[];
  memoryLevel: MemoryLevel;
  /** People/animals who appeared. */
  characters: string[];
}

export const EMPTY_CONTEXT: DreamContext = {
  focus: [],
  emotion: [],
  memoryLevel: "symbol",
  characters: []
};

/* ------------------------------------------------------------------ */
/* Step 2 — Life Focus selection                                      */
/* ------------------------------------------------------------------ */

export interface FocusOption {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export const FOCUS_OPTIONS: FocusOption[] = [
  { id: "love", title: "Love", icon: "❤️", description: "Relationships and emotions" },
  { id: "career", title: "Career", icon: "💼", description: "Work and opportunities" },
  { id: "wealth", title: "Wealth", icon: "💰", description: "Resources and success" },
  { id: "family", title: "Family", icon: "👨‍👩‍👧", description: "Family relationships" },
  { id: "growth", title: "Personal Growth", icon: "🌱", description: "Inner development and habits" },
  { id: "spiritual", title: "Spiritual Reflection", icon: "🕌", description: "Faith and meaning" }
];

/* ------------------------------------------------------------------ */
/* Step 4 — Dream context selections                                  */
/* ------------------------------------------------------------------ */

export const MEMORY_OPTIONS: Array<{ value: MemoryLevel; icon: string; label: string }> = [
  { value: "full", icon: "🌕", label: "Full dream" },
  { value: "partial", icon: "🌗", label: "Important moments" },
  { value: "symbol", icon: "🌑", label: "Only one symbol" }
];

export const EMOTION_OPTIONS: Array<{ value: string; icon: string; label: string }> = [
  { value: "fear", icon: "😨", label: "Fearful" },
  { value: "sadness", icon: "😢", label: "Sad" },
  { value: "peace", icon: "😊", label: "Peaceful" },
  { value: "confusion", icon: "🤔", label: "Confusing" },
  { value: "beauty", icon: "✨", label: "Beautiful" },
  { value: "neutral", icon: "😐", label: "Neutral" }
];

export const CHARACTER_OPTIONS: Array<{ value: string; icon: string; label: string }> = [
  { value: "myself", icon: "🙋", label: "Myself" },
  { value: "family", icon: "👨‍👩‍👧", label: "Family member" },
  { value: "known", icon: "🤝", label: "Someone I know" },
  { value: "deceased", icon: "🕊️", label: "Someone who passed away" },
  { value: "animal", icon: "🐾", label: "Animal" },
  { value: "unknown", icon: "🌫️", label: "Unknown person" }
];

/* ------------------------------------------------------------------ */
/* Focus modifiers — expression tuning only (no new religious content) */
/* ------------------------------------------------------------------ */

export interface FocusModifier {
  id: string;
  /** Gentle verbs used when phrasing the focus reading. */
  reflectionPatterns: string[];
  /** Generic prompts for the "suggested actions" area. */
  suggestedActions: string[];
}

export const FOCUS_MODIFIERS: Record<string, FocusModifier> = {
  love: {
    id: "love",
    reflectionPatterns: ["connection", "trust", "openness in relationships"],
    suggestedActions: [
      "Consider what the dream symbol suggests about how you give or receive care.",
      "Reflect on whether a recent conversation or relationship felt unfinished."
    ]
  },
  career: {
    id: "career",
    reflectionPatterns: ["change in your current path", "decisions you are making", "uncertainty about future steps"],
    suggestedActions: [
      "Consider taking time to reflect before making important decisions.",
      "Think about which part of your work feels most uncertain right now."
    ]
  },
  wealth: {
    id: "wealth",
    reflectionPatterns: ["how you relate to resources", "a sense of plenty or lack", "long-term security"],
    suggestedActions: [
      "Review a recent financial decision with a calm, patient mindset.",
      "Reflect on whether the dream points to gratitude or to worry."
    ]
  },
  family: {
    id: "family",
    reflectionPatterns: ["family bonds", "care and responsibility", "messages between loved ones"],
    suggestedActions: [
      "Consider reaching out to a family member you have not spoken with recently.",
      "Reflect on what role you play in your family's life right now."
    ]
  },
  growth: {
    id: "growth",
    reflectionPatterns: ["personal development", "habits and inner strength", "a phase of learning"],
    suggestedActions: [
      "Choose one small habit the dream symbol might be inviting you to notice.",
      "Give yourself space to grow without rushing the outcome."
    ]
  },
  spiritual: {
    id: "spiritual",
    reflectionPatterns: ["your inner life", "connection to faith", "quiet reflection"],
    suggestedActions: [
      "Set aside a quiet moment to reflect on the symbol with an open heart.",
      "Consider discussing a recurring dream with a trusted scholar."
    ]
  }
};

export function focusModifierById(id: string): FocusModifier | undefined {
  return FOCUS_MODIFIERS[id];
}

/** Human label for a focus id (fallback to the id itself). */
export function focusLabel(id: string): string {
  return FOCUS_OPTIONS.find((o) => o.id === id)?.title ?? id;
}

/** Human label for an emotion value. */
export function emotionLabel(value: string): string {
  return EMOTION_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

/** Theme summary derived from the verified symbols (used in overview). */
export function deriveThemes(symbolNames: string[]): string[] {
  const themes: string[] = [];
  if (symbolNames.some((n) => /snake|water|river|sea|storm|fire|flying|falling/i.test(n))) {
    themes.push("Change");
  }
  if (symbolNames.some((n) => /water|river|sea|rain|tears|crying|dead|death|funeral/i.test(n))) {
    themes.push("Emotion");
  }
  if (symbolNames.some((n) => /mirror|book|exam|school|teacher|quran|mosque|praying/i.test(n))) {
    themes.push("Reflection");
  }
  if (symbolNames.some((n) => /gold|money|treasure|house|car|business|market/i.test(n))) {
    themes.push("Resources");
  }
  if (symbolNames.some((n) => /baby|pregnancy|child|marriage|wedding|mother|father|family/i.test(n))) {
    themes.push("Family");
  }
  return themes.length > 0 ? themes.slice(0, 3) : ["Symbolic meaning"];
}
