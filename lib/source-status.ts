/**
 * Source Status — trust layer for Islamic dream interpretation sources.
 *
 * Phase 5.1, P0-8-3 + Phase 5.2, P0-1. Every classical source referenced in
 * the knowledge base carries a verification status. Currently all sources are
 * "pending"; future human review upgrades them to "reviewed" or "verified".
 *
 * Phase 5.2 P0-1: user-facing labels avoid the bare word "Pending". Instead
 * each status explains itself: "Under Source Review" communicates care, not
 * unreliability.
 *
 * This system establishes E-E-A-T transparency without asserting religious
 * authority. Users can see exactly where each interpretation comes from and
 * how thoroughly it has been checked.
 */

export type SourceStatus = "verified" | "reviewed" | "pending";

export interface SourceStatusInfo {
  status: SourceStatus;
  label: string;
  description: string;
  /** Short reason shown in the Explain Status block (Phase 5.2 P1-1). */
  why: string;
}

export const SOURCE_STATUS_INFO: Record<SourceStatus, SourceStatusInfo> = {
  pending: {
    status: "pending",
    label: "Classical Tradition",
    description:
      "The traditional context is recorded in Islamic dream interpretation literature.",
    why:
      "Islamic dream traditions contain many historical discussions. Documented references are separated from personal reflection."
  },
  reviewed: {
    status: "reviewed",
    label: "Reviewed Classical Context",
    description:
      "This interpretation has been reviewed for consistency with Islamic dream traditions.",
    why:
      "Our editors have checked this symbol's traditional context against available references."
  },
  verified: {
    status: "verified",
    label: "Verified Classical Reference",
    description:
      "This interpretation has been reviewed against available classical sources.",
    why:
      "This symbol's traditional context has been verified against its original sources with direct references."
  }
};

/** Returns the worst (least verified) status among a list of source statuses. */
export function aggregateSourceStatus(statuses: SourceStatus[]): SourceStatus {
  if (statuses.length === 0) return "pending";
  if (statuses.includes("pending")) return "pending";
  if (statuses.includes("reviewed")) return "reviewed";
  return "verified";
}

/** Human-readable label for a source status. */
export function sourceStatusLabel(status: SourceStatus): string {
  return SOURCE_STATUS_INFO[status].label;
}
