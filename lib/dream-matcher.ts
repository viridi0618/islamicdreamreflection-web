/**
 * Dream Knowledge Matcher.
 *
 * Bridges the parser output to the knowledge base: for every detected symbol
 * it looks up the matching dream entity (data/dreams/<id>.json) and expands
 * the related-symbol graph from the entity's `related` field.
 *
 * This module is a pure function over the entity list injected by the
 * caller — the same entities that render the SEO pages, so there is exactly
 * ONE data source and no second set of data.
 */
import type { DreamEntity } from "./data";
import type { DetectedSymbol, ParseResult } from "./dream-parser";

export interface RelatedSymbol {
  /** Raw term from the entity `related` field (e.g. "snake bite"). */
  term: string;
  /** Resolved entity if the term maps to an existing knowledge entity. */
  entity?: DreamEntity;
  /** Public SEO page slug if this related term has an enabled page. */
  slug?: string;
}

export interface KnowledgeMatch {
  symbol: DetectedSymbol;
  entity: DreamEntity;
  /** Public SEO page slug when the entity has an enabled page. */
  slug?: string;
  /** Graph expansion: related symbols of this entity, resolved where possible. */
  related: RelatedSymbol[];
}

function slugifyTerm(term: string): string {
  return term
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function resolveRelated(
  term: string,
  entities: DreamEntity[],
  slugFor: (entityId: string) => string | undefined
): RelatedSymbol {
  const firstWord = term.split(/\s+/)[0] ?? "";
  const entity = entities.find(
    (e) => e.id === slugifyTerm(firstWord) || e.name.toLowerCase().startsWith(firstWord.toLowerCase())
  );
  if (!entity) return { term };
  return { term, entity, slug: slugFor(entity.id) };
}

/**
 * Maps a parse result onto the knowledge base.
 * `slugFor` maps an entity id to its public page slug (enabled pages only).
 */
export function matchKnowledge(
  parse: ParseResult,
  entities: DreamEntity[],
  slugFor: (entityId: string) => string | undefined = () => undefined
): KnowledgeMatch[] {
  return parse.symbols
    .map((symbol): KnowledgeMatch | null => {
      const entity = entities.find((e) => e.id === symbol.id);
      if (!entity) return null;
      const related = entity.related.slice(0, 5).map((term) =>
        resolveRelated(term, entities, slugFor)
      );
      return { symbol, entity, slug: slugFor(entity.id), related };
    })
    .filter((m): m is KnowledgeMatch => m !== null);
}

/** Neutral, source-driven reflection text built from entity + context. */
export function buildReflection(matches: KnowledgeMatch[]): string {
  if (matches.length === 0) {
    return "Your dream did not clearly match a symbol in our knowledge base yet. Descriptions with more specific details (animals, objects, places, people) are easier to match.";
  }
  const themes = matches.map((m) => m.entity.interpretation.general?.[0]).filter(Boolean);
  const joined = themes.length > 0 ? ` ${themes.join(" ")}` : "";
  return (
    `Your dream combines themes of ${matches.map((m) => m.symbol.name).join(" and ")}.` +
    ` Different traditions may interpret these symbols differently, and the context of the dream matters.` +
    joined
  );
}
