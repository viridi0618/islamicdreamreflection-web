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
/* Daily reflection limit: anonymous devices get 2 free reflections    */
/* per LOCAL calendar day. The old permanent per-device counter        */
/* (dream_used_count) is deliberately ignored and removed on first use */
/* so legacy users are never locked by undated usage data.             */
/* ------------------------------------------------------------------ */

const DAILY_USAGE_KEY = "dream_reflection_daily_usage_v1";
const DAILY_FREE_REFLECTIONS = 2;
/** Legacy key from the old permanent 1-per-device limit — never read. */
const LEGACY_USED_KEY = "dream_used_count";

interface DailyUsage {
  date: string;
  count: number;
}

/** Browser-local calendar date as YYYY-MM-DD (never UTC). */
export function localDateKey(now: Date = new Date()): string {
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/** Reads today's usage record. Any missing/corrupt/invalid data fails open to 0. */
function readDailyUsage(): DailyUsage | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(DAILY_USAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const { date, count } = parsed as { date?: unknown; count?: unknown };
    if (typeof date !== "string" || date.length === 0) return null;
    const n = Number(count);
    if (!Number.isFinite(n) || n < 0) return null;
    return { date, count: Math.floor(n) };
  } catch {
    return null; // corrupted JSON must never lock a device.
  }
}

/** Usage count for the current local calendar day (0 when none/other day). */
function todayUsageCount(): number {
  const usage = readDailyUsage();
  if (!usage) return 0;
  return usage.date === localDateKey() ? usage.count : 0;
}

/** Free reflections per device per local calendar day. */
export function availableReflections(): number {
  return DAILY_FREE_REFLECTIONS;
}

/** Reflections already used today (local calendar day). */
export function consumedReflections(): number {
  return todayUsageCount();
}

export function canAnalyzeNow(): boolean {
  return todayUsageCount() < DAILY_FREE_REFLECTIONS;
}

/**
 * Called ONLY after a successful analysis. Records the use for the current
 * local day; resets the record when the stored date is not today. Also
 * removes the legacy permanent counter so it can never lock a device again.
 */
export function recordAnalysisUsed(): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.removeItem(LEGACY_USED_KEY);
    const today = localDateKey();
    const usage = readDailyUsage();
    const count = usage && usage.date === today ? usage.count : 0;
    const next = Math.min(count + 1, DAILY_FREE_REFLECTIONS);
    window.localStorage.setItem(
      DAILY_USAGE_KEY,
      JSON.stringify({ date: today, count: next } satisfies DailyUsage)
    );
  } catch {
    /* ignore */
  }
}
