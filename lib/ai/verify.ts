/**
 * Symbol verification + knowledge context building (anti-fabrication core).
 *
 * Whatever the AI extraction returns, it is NOT trusted as-is: every symbol
 * must resolve to an existing knowledge entity before it can influence the
 * final reflection. This is the hard boundary between "AI says" and
 * "knowledge base supports".
 */
import type { DreamEntity } from "../data";
import lexicon from "../lexicon.json";

export interface VerifiedSymbol {
  /** Raw term as returned by the AI extraction (e.g. "snake"). */
  raw: string;
  /** Resolved knowledge entity id, or null when no match exists. */
  entityId: string | null;
  entity?: DreamEntity;
}

function slugify(term: string): string {
  return term
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Reverse alias map from the lexicon: "river" -> "water", "snake" -> "snake". */
const aliasToEntityId = new Map<string, string>();
for (const [id, aliases] of Object.entries(lexicon.symbols)) {
  aliasToEntityId.set(id, id);
  for (const alias of aliases) {
    aliasToEntityId.set(alias.toLowerCase(), id);
  }
}

/**
 * Resolves extracted terms against the knowledge base. A term matches when
 * it is (1) an entity id, (2) a lexicon alias of an entity, or (3) contained
 * in an entity name. Terms without a match keep entityId=null so the caller
 * can show them as unmatched — they never receive meaning.
 */
export function verifySymbols(
  rawTerms: string[],
  entities: DreamEntity[]
): VerifiedSymbol[] {
  const byId = new Map(entities.map((e) => [e.id, e]));
  const seen = new Set<string>();
  const result: VerifiedSymbol[] = [];

  for (const term of rawTerms) {
    const normalized = term.toLowerCase().trim();
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);

    const viaAlias = aliasToEntityId.get(normalized);
    let entity: DreamEntity | undefined;
    if (viaAlias) {
      entity = byId.get(viaAlias);
    }
    entity ??= byId.get(slugify(normalized));
    entity ??= entities.find(
      (e) =>
        e.name.toLowerCase().includes(normalized) ||
        normalized.includes(e.name.toLowerCase().replace(/ dream.*/, "").trim())
    );

    result.push({
      raw: normalized,
      entityId: entity?.id ?? null,
      entity
    });
  }
  return result.slice(0, 8);
}

/**
 * Builds the knowledge context string injected into the Phase 2 prompt.
 * Only verified entities contribute content; unverified ones are listed as
 * "pending verification" and never given meaning.
 */
export function buildKnowledgeContext(
  verified: VerifiedSymbol[],
  limitPerEntity = 2
): string {
  const parts: string[] = [];
  for (const v of verified) {
    if (!v.entity) {
      parts.push(
        `- "${v.raw}": no knowledge base entry yet. Do not invent content for it.`
      );
      continue;
    }
    const e = v.entity;
    const lines = [`- ${e.name} (id: ${e.id}, category: ${e.category}):`];
    const general = (e.interpretation.general ?? []).slice(0, limitPerEntity);
    for (const g of general) lines.push(`  general: ${g}`);
    const refs = (e.classical_sources ?? [])
      .map((s) => `${s.name}: ${s.reference}`)
      .join("; ");
    lines.push(
      `  classical references: ${refs || "none recorded"} (all pending verification)`
    );
    parts.push(lines.join("\n"));
  }
  return parts.join("\n\n");
}
