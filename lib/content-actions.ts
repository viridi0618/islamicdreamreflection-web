"use client";

export interface ContentActionState {
  saved: boolean;
  shareCount: number;
  lastShareActionAt?: number;
}

type ContentActionStore = Record<string, ContentActionState>;

const STORAGE_KEY = "content_actions_v1";
const SHARE_COOLDOWN_MS = 45_000;

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function keyFor(pathname: string): string {
  return `page:${pathname}`;
}

function normalizeState(raw: Partial<ContentActionState> | null | undefined): ContentActionState {
  const shareCount = Number(raw?.shareCount);
  const lastShareActionAt = Number(raw?.lastShareActionAt);
  return {
    saved: raw?.saved === true,
    shareCount: Number.isFinite(shareCount) && shareCount > 0 ? Math.floor(shareCount) : 0,
    lastShareActionAt:
      Number.isFinite(lastShareActionAt) && lastShareActionAt > 0
        ? Math.floor(lastShareActionAt)
        : undefined
  };
}

function readStore(): ContentActionStore {
  if (!canUseStorage()) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return Object.fromEntries(
      Object.entries(parsed as Record<string, Partial<ContentActionState>>).map(([key, value]) => [
        key,
        normalizeState(value)
      ])
    );
  } catch {
    return {};
  }
}

function writeStore(store: ContentActionStore): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* Storage may be unavailable or full. The page action still completed. */
  }
}

export function getContentActionState(pathname: string): ContentActionState {
  return readStore()[keyFor(pathname)] ?? { saved: false, shareCount: 0 };
}

export function setContentSaved(pathname: string, saved: boolean): ContentActionState {
  const store = readStore();
  const key = keyFor(pathname);
  const next = { ...(store[key] ?? { saved: false, shareCount: 0 }), saved };
  store[key] = next;
  writeStore(store);
  return next;
}

export function recordContentShareAction(
  pathname: string
): { counted: boolean; state: ContentActionState } {
  const store = readStore();
  const key = keyFor(pathname);
  const current = normalizeState(store[key]);
  const now = Date.now();

  if (current.lastShareActionAt && now - current.lastShareActionAt < SHARE_COOLDOWN_MS) {
    return { counted: false, state: current };
  }

  const next = {
    ...current,
    shareCount: current.shareCount + 1,
    lastShareActionAt: now
  };
  store[key] = next;
  writeStore(store);
  return { counted: true, state: next };
}
