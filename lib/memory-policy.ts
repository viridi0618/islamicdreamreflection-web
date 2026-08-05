/**
 * Memory Policy — tiered permission model (Phase 5.1, P0-1).
 *
 * Prepares the future business tiers WITHOUT introducing accounts today.
 * Every current user is "anonymous"; the free and premium tiers are reserved
 * for the future Google Login / subscription flows. localStorage remains the
 * only storage.
 *
 * Phase 5.2 P3-11 (reserved, not shipped): the future registered tier maps
 * onto "free" (30 dreams / 30 days) — no code changes needed until Google
 * Login lands. Premium unlocks unlimited history, dream pattern analysis and
 * a private journal.
 */

export type UserTier = "anonymous" | "free" | "premium";

export interface MemoryPolicy {
  /** Max stored records. null = unlimited. */
  maxRecords: number | null;
  /** How long records are kept, in days. null = forever. */
  retentionDays: number | null;
}

export const MEMORY_POLICY: Record<UserTier, MemoryPolicy> = {
  anonymous: {
    maxRecords: 3,
    retentionDays: 7
  },
  free: {
    maxRecords: 30,
    retentionDays: 30
  },
  premium: {
    maxRecords: null,
    retentionDays: null
  }
};

/**
 * Current tier for every user (MVP). Future Google Login upgrades this to
 * "free"; subscription upgrades to "premium".
 */
export const CURRENT_TIER: UserTier = "anonymous";

export function policyFor(tier: UserTier): MemoryPolicy {
  return MEMORY_POLICY[tier];
}
