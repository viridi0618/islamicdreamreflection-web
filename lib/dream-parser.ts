/**
 * Dream Parser — local, offline, rule-based NLP layer (no external API).
 *
 * Converts a free-text dream description into structured data:
 *
 *   "I saw a black snake attacking me in a river"
 *     -> { symbols: [{id:"snake", name:"snake", confidence:0.92}, ...],
 *          emotions: ["fear"],
 *          scenes: ["danger"] }
 *
 * Design constraints (Phase 3):
 *  - It NEVER generates an interpretation. It only extracts structure.
 *  - Interpretation happens later by matching against the knowledge base
 *    (see dream-matcher.ts) — never by free-form generation.
 *  - Confidence is a deterministic heuristic (match length + position),
 *    not a model probability.
 */
import lexicon from "./lexicon.json";

export interface DetectedSymbol {
  id: string;
  name: string;
  confidence: number;
}

export interface ParseResult {
  symbols: DetectedSymbol[];
  emotions: string[];
  scenes: string[];
}

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Escape every non-alphanumeric char so the alias is literal in a RegExp. */
function escapeRegex(alias: string): string {
  return alias.replace(/[^a-z0-9]/g, (ch) => `\\${ch}`);
}

/** Word-boundary match: alias must sit between non-letter chars or edges. */
function matchAtWordBoundary(text: string, alias: string): number | null {
  const re = new RegExp(`(^|[^a-z])${escapeRegex(alias)}([^a-z]|$)`, "i");
  const m = text.match(re);
  if (!m) return null;
  // index of the alias itself (after the leading boundary char)
  return (m.index ?? 0) + (m[1]?.length ?? 0);
}

/**
 * Stem-tolerant word match for emotion/scene words: accepts the alias plus
 * common inflections (attack -> attacking/attacked). Still requires a word
 * boundary so "war" never matches inside "warm".
 */
function matchStemAtBoundary(text: string, alias: string): boolean {
  const re = new RegExp(`(^|[^a-z])${escapeRegex(alias)}(?:ing|ed|es|s)?([^a-z]|$)`, "i");
  return re.test(text);
}

/**
 * Heuristic confidence: stronger for longer matches and matches appearing
 * earlier in the sentence. Deterministic and explainable.
 */
function confidenceFor(alias: string, index: number, textLength: number): number {
  const lengthFactor = Math.min(1, alias.length / 8);
  const positionFactor = index === 0 ? 0.12 : index < 10 ? 0.06 : 0;
  const densityFactor = Math.min(0.3, (alias.length * 2) / Math.max(textLength, 10));
  return round2(clamp(0.5 + lengthFactor * 0.22 + positionFactor + densityFactor, 0.5, 0.98));
}

export function parseDream(input: string): ParseResult {
  const text = input.trim().toLowerCase();
  if (text.length === 0) {
    return { symbols: [], emotions: [], scenes: [] };
  }

  const symbols: DetectedSymbol[] = [];
  for (const [id, aliases] of Object.entries(lexicon.symbols)) {
    let best: DetectedSymbol | null = null;
    for (const alias of aliases) {
      const index = matchAtWordBoundary(text, alias);
      if (index === null) continue;
      const confidence = confidenceFor(alias, index, text.length);
      if (!best || confidence > best.confidence) {
        best = { id, name: alias, confidence };
      }
    }
    if (best) symbols.push(best);
  }

  symbols.sort((a, b) => b.confidence - a.confidence);

  const emotions = new Set<string>();
  for (const [emotion, words] of Object.entries(lexicon.emotions)) {
    if (words.some((w) => matchStemAtBoundary(text, w))) emotions.add(emotion);
  }

  const scenes = new Set<string>();
  for (const [scene, words] of Object.entries(lexicon.scenes)) {
    if (words.some((w) => matchStemAtBoundary(text, w))) scenes.add(scene);
  }

  return {
    symbols: symbols.slice(0, 5),
    emotions: [...emotions],
    scenes: [...scenes]
  };
}
