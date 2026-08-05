/**
 * Data access layer. Reads the knowledge base JSON artifacts at build time.
 *
 * The web app lives at <repo>/web while the data layer lives at <repo>/data,
 * so all readers resolve ../data from process.cwd() (the web project root
 * during `next build`).
 */
import fs from "node:fs";
import path from "node:path";
import { ENABLED_PAGES, type PageConfig } from "./site";
export { categoryLabel } from "./labels";

export const DATA_DIR = path.resolve(process.cwd(), "../data");
const DREAMS_DIR = path.join(DATA_DIR, "dreams");

export interface ClassicalSourceRef {
  /** Backward-compatible source name (e.g. "Ibn Sirin tradition"). */
  name?: string;
  /** Reference / citation string. */
  reference?: string;
  /** Verification status (Phase 5.1 Trust Layer). Defaults to "pending". */
  status?: "verified" | "reviewed" | "pending";
  /** Multi-source tradition name (Phase 5.2 P1-2), e.g. "Ibn Shaheen tradition". */
  tradition?: string;
  /** Per-source editorial notes (Phase 5.2 P1-2). */
  notes?: string;
}

export type ReviewStatus = "draft" | "reviewed" | "verified";

export interface DreamEntity {
  id: string;
  name: string;
  category: string;
  volumeClass?: "high" | "medium" | "low";
  image?: string | null;
  keywords: string[];
  classical_sources: ClassicalSourceRef[];
  /** Neutral, context-level notes on how the symbol is discussed in classical traditions (Phase 5.1 Trust Layer). */
  traditional_notes?: string[];
  interpretation: {
    positive: string[];
    negative: string[];
    general: string[];
  };
  related: string[];
  status: string;
  /** Human-review audit trail (Phase 5.2 P2-1). */
  review_status?: ReviewStatus;
  last_reviewed?: string | null;
  review_notes?: string;
}

export interface CategoryCatalog {
  meta?: Record<string, unknown>;
  [category: string]: unknown;
}

export interface KeywordRecord {
  keyword: string;
  slug: string;
  category: string;
  volume: string;
  priority: "A" | "B" | "C";
  priorityScore?: number;
  source: string[];
  status: string;
}

export function loadDreamEntity(entityId: string): DreamEntity {
  const file = path.join(DREAMS_DIR, `${entityId}.json`);
  return JSON.parse(fs.readFileSync(file, "utf8")) as DreamEntity;
}

export function loadCategories(): CategoryCatalog {
  return JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, "categories.json"), "utf8")
  ) as CategoryCatalog;
}

export function loadKeywords(): KeywordRecord[] {
  return JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, "dream-keywords.json"), "utf8")
  ) as KeywordRecord[];
}

/** All enabled pages joined with their entity data. */
export function loadEnabledPages(): Array<{ page: PageConfig; entity: DreamEntity }> {
  return ENABLED_PAGES.map((page) => ({
    page,
    entity: loadDreamEntity(page.entityId)
  }));
}

/** A-priority keywords belonging to a category, for internal-link hints. */
export function topKeywordsForCategory(
  category: string,
  limit = 3
): string[] {
  return loadKeywords()
    .filter((k) => k.category === category && k.priority === "A")
    .slice(0, limit)
    .map((k) => k.keyword);
}
