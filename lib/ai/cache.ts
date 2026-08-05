/**
 * Minimal in-memory response cache for the AI interpreter (cost control).
 *
 * Key = normalized set of verified entity ids (sorted, joined). A follow-up
 * question always bypasses the cache because it changes the answer.
 * TTL default 30 minutes. This is a single-process cache; fine for the MVP.
 */

export interface CacheEntry {
  reflection: string;
  extractedAt: number;
}

const store = new Map<string, CacheEntry>();

export function cacheKeyFor(entityIds: Array<string | null>): string {
  return entityIds.filter(Boolean).sort().join("|");
}

export function getCachedReflection(key: string, ttlMs = 30 * 60 * 1000): string | null {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() - entry.extractedAt > ttlMs) {
    store.delete(key);
    return null;
  }
  return entry.reflection;
}

export function setCachedReflection(key: string, reflection: string): void {
  store.set(key, { reflection, extractedAt: Date.now() });
  // Keep the cache bounded (defensive; MVP scale).
  if (store.size > 500) {
    const oldest = store.keys().next().value;
    if (oldest !== undefined) store.delete(oldest);
  }
}

/** Exposed for tests / diagnostics. */
export function cacheSize(): number {
  return store.size;
}
