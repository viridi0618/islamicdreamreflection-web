/**
 * Anonymous Dream Memory — localStorage persistence (Phase 5.1 upgrade).
 *
 * P0-2 data structure + P0-5 tiered limits:
 *  - DreamMemory gains dreamDate / title / guidance / userFeeling /
 *    expectation / shareId.
 *  - Old records (Phase 5 shape) keep working: missing fields get defaults.
 *  - Every read purges records older than the tier's retentionDays, then the
 *    count is checked against maxRecords (anonymous: 3 records, 7 days).
 *
 * No accounts, no server, no identity data. The dream text stays on-device.
 */

import { CURRENT_TIER, policyFor, type MemoryPolicy } from "./memory-policy";

export interface DreamMemory {
  id: string;
  createdAt: string;
  /** The date the dream happened (defaults to createdAt). */
  dreamDate: string;
  title: string;
  dreamText: string;
  focus: string[];
  context: {
    emotion?: string[];
    memoryLevel?: string;
    characters?: string[];
  };
  symbols: string[];
  reflection: string;
  guidance: string;
  /** How the dream made the user feel (Phase 5.1 save flow). */
  userFeeling?: string | null;
  /** What the user wants to reflect on (Phase 5.1 save flow). */
  expectation?: string | null;
  /** Set when the user shared this reflection. */
  shareId?: string;
  /** Trust Layer: source verification status per symbol (Phase 5.1 P0-8-5). */
  sources?: Array<{ symbol: string; sourceStatus: string }>;
}

export type SaveMemoryResult =
  | { ok: true; memory: DreamMemory; expiredCount: number }
  | { ok: false; reason: "full"; expiredCount: number };

const STORAGE_KEY = "dream_memory";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

/** P0-2: normalize old records to the new shape with safe defaults. */
export function normalizeMemory(raw: Partial<DreamMemory> | null | undefined): DreamMemory | null {
  if (!raw || typeof raw.id !== "string") return null;
  const now = new Date().toISOString();
  return {
    id: raw.id,
    createdAt: typeof raw.createdAt === "string" ? raw.createdAt : now,
    dreamDate: typeof raw.dreamDate === "string" ? raw.dreamDate : raw.createdAt ?? now,
    title: typeof raw.title === "string" && raw.title.length > 0 ? raw.title : "Untitled Dream",
    dreamText: typeof raw.dreamText === "string" ? raw.dreamText : "",
    focus: Array.isArray(raw.focus) ? raw.focus.filter((f): f is string => typeof f === "string") : [],
    context: {
      emotion: Array.isArray(raw.context?.emotion) ? raw.context.emotion.filter((e): e is string => typeof e === "string") : undefined,
      memoryLevel: typeof raw.context?.memoryLevel === "string" ? raw.context.memoryLevel : undefined,
      characters: Array.isArray(raw.context?.characters) ? raw.context.characters.filter((c): c is string => typeof c === "string") : undefined
    },
    symbols: Array.isArray(raw.symbols) ? raw.symbols.filter((s): s is string => typeof s === "string") : [],
    reflection: typeof raw.reflection === "string" ? raw.reflection : "",
    guidance: typeof raw.guidance === "string" ? raw.guidance : "",
    userFeeling: typeof raw.userFeeling === "string" ? raw.userFeeling : null,
    expectation: typeof raw.expectation === "string" ? raw.expectation : null,
    shareId: typeof raw.shareId === "string" ? raw.shareId : undefined,
    sources: Array.isArray(raw.sources)
      ? raw.sources
          .filter(
            (s): s is { symbol: string; sourceStatus: string } =>
              typeof s?.symbol === "string" && typeof s?.sourceStatus === "string"
          )
          .slice(0, 10)
      : undefined
  };
}

/**
 * P0-5: purge expired records per the tier's retentionDays.
 * Returns the number of removed records.
 */
export function purgeExpired(memories: DreamMemory[], policy?: MemoryPolicy): number {
  const p = policy ?? policyFor(CURRENT_TIER);
  if (p.retentionDays === null) return 0;
  const cutoff = Date.now() - p.retentionDays * 24 * 60 * 60 * 1000;
  const before = memories.length;
  const kept = memories.filter((m) => {
    const t = new Date(m.createdAt).getTime();
    return Number.isFinite(t) && t >= cutoff;
  });
  return before - kept.length;
}

/**
 * Reads + normalizes + purges. This is the ONLY read path, so every view
 * automatically applies retention.
 */
export function loadMemories(): DreamMemory[] {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const normalized = parsed
      .map((m) => normalizeMemory(m as Partial<DreamMemory>))
      .filter((m): m is DreamMemory => m !== null);
    const expired = purgeExpired(normalized);
    if (expired > 0) persist(normalized);
    return normalized;
  } catch {
    return [];
  }
}

function persist(memories: DreamMemory[]): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
  } catch {
    // Storage full or unavailable — the user keeps this session.
  }
}

export function newMemoryId(): string {
  if (canUseStorage() && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `m-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * P0-5: save with tier limits. Purges expired records first, then rejects
 * with reason:"full" when maxRecords is reached (anonymous: 3).
 */
export function saveMemory(
  input: Omit<DreamMemory, "id" | "createdAt" | "dreamDate" | "title"> & {
    title?: string;
    dreamDate?: string;
    userFeeling?: string | null;
    expectation?: string | null;
    sources?: Array<{ symbol: string; sourceStatus: string }>;
  }
): SaveMemoryResult {
  const policy = policyFor(CURRENT_TIER);

  // Step 1: purge expired records (P0-5).
  const expiredCount = purgeExpired(loadMemories(), policy);
  const memories = loadMemories();

  // Step 2: enforce maxRecords (anonymous: 3).
  if (policy.maxRecords !== null && memories.length >= policy.maxRecords) {
    return { ok: false, reason: "full", expiredCount };
  }
  const now = new Date();
  const memory: DreamMemory = {
    ...input,
    title: input.title ?? "Untitled Dream",
    dreamDate: input.dreamDate ?? now.toISOString(),
    id: newMemoryId(),
    createdAt: now.toISOString()
  };
  persist([memory, ...memories]);
  return { ok: true, memory, expiredCount };
}

export function updateMemoryShareId(id: string, shareId: string): void {
  const memories = loadMemories().map((m) =>
    m.id === id ? { ...m, shareId } : m
  );
  persist(memories);
}

export function deleteMemory(id: string): void {
  persist(loadMemories().filter((m) => m.id !== id));
}

export function getMemory(id: string): DreamMemory | null {
  return loadMemories().find((m) => m.id === id) ?? null;
}

/* ------------------------------------------------------------------ */
/* Analysis limit (P0-6): sharing no longer grants extra reflections.  */
/* Every anonymous user gets 1 free reflection.                        */
/* ------------------------------------------------------------------ */

const USED_KEY = "dream_used_count";

function readInt(key: string): number {
  if (!canUseStorage()) return 0;
  const v = Number(window.localStorage.getItem(key));
  return Number.isFinite(v) && v > 0 ? Math.floor(v) : 0;
}

function writeInt(key: string, value: number): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(key, String(value));
  } catch {
    /* ignore */
  }
}

/** Free reflections available: 1 baseline (sharing no longer adds more). */
export function availableReflections(): number {
  return 1;
}

export function consumedReflections(): number {
  return readInt(USED_KEY);
}

export function canAnalyzeNow(): boolean {
  return consumedReflections() < availableReflections();
}

export function recordAnalysisUsed(): void {
  writeInt(USED_KEY, consumedReflections() + 1);
}
