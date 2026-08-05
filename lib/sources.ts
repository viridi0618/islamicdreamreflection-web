/**
 * Minimal source registry reader (homepage trust layer).
 *
 * Reads data/sources.json and exposes only verified sources for public
 * display. Only status === "verified" sources may appear on the homepage.
 */
import sourcesJson from "@/data/sources.json";
import type { SourceRef } from "@/lib/home";

const REGISTRY = sourcesJson as Record<string, SourceRef>;

/** Only status === "verified" sources are eligible for public display. */
export function verifiedSources(): SourceRef[] {
  return Object.values(REGISTRY).filter((s) => s.status === "verified");
}

/** Resolve one source by id; returns undefined unless status is verified. */
export function verifiedSource(id: string): SourceRef | undefined {
  const s = REGISTRY[id];
  if (!s || s.status !== "verified") return undefined;
  return s;
}
