/**
 * verify:dream-ai — Phase 3 acceptance checks for the AI interpreter layer.
 *
 * 1. Every symbol id in web/lib/lexicon.json MUST have a matching knowledge
 *    entity at ../data/dreams/<id>.json (no invented entities).
 * 2. Every enabled page entity (web/lib/site.ts) with an `image` field MUST
 *    have that image file present under web/public/images/dreams/.
 * 3. Anti-fabrication scan: the source of app/, components/ and lib/ must
 *    not contain deterministic religious claims (e.g. "this dream means
 *    Allah will...", "Ibn Sirin said this dream predicts...").
 *
 * Usage: npm run verify:dream-ai
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(scriptDir, "..");
const dataRoot = path.resolve(webRoot, "..", "data");
const dreamsDir = path.join(dataRoot, "dreams");

const errors = [];
const fail = (msg) => errors.push(msg);

/* 1. Lexicon symbols must exist in the knowledge base. */
const lexicon = JSON.parse(readFileSync(path.join(webRoot, "lib", "lexicon.json"), "utf8"));
const symbolIds = Object.keys(lexicon.symbols ?? {});
for (const id of symbolIds) {
  if (!existsSync(path.join(dreamsDir, `${id}.json`))) {
    fail(`lexicon symbol "${id}" has no knowledge entity at data/dreams/${id}.json`);
  }
}

/* 2. Enabled pages' images must exist. */
const siteSource = readFileSync(path.join(webRoot, "lib", "site.ts"), "utf8");
const imageRefs = [...siteSource.matchAll(/entityId:\s*"([^"]+)"/g)].map((m) => m[1]);
for (const entityId of imageRefs) {
  const entityFile = path.join(dreamsDir, `${entityId}.json`);
  if (!existsSync(entityFile)) {
    fail(`site.ts enables entity "${entityId}" but data/dreams/${entityId}.json is missing`);
    continue;
  }
  const entity = JSON.parse(readFileSync(entityFile, "utf8"));
  if (entity.image) {
    const imagePath = path.join(webRoot, "public", entity.image.replace(/^\//, ""));
    if (!existsSync(imagePath)) {
      fail(`entity "${entityId}" references image ${entity.image} but the file is missing`);
    }
  }
}

/* 3. Anti-fabrication scan of source files. */
const FORBIDDEN_PATTERNS = [
  {
    re: /\b(this|your|the|that)\s+dream\s+(means|will|predicts|signifies|is\s+a\s+sign\s+that)/i,
    label: "deterministic dream claim"
  },
  {
    re: /ibn\s+sirin\s+said\s+(this|that)\s+dream\s+predicts/i,
    label: "fabricated Ibn Sirin prediction"
  },
  {
    re: /allah\s+will\s+(grant|give|punish|bless|test)/i,
    label: "deterministic divine decree claim"
  },
  {
    re: /quran\s+(says|states|predicts)\s+(this|your|that)\s+dream/i,
    label: "fabricated Quran-dream link"
  },
  {
    re: /\byou\s+will\b/i,
    label: "direct future prediction ('you will')"
  },
  {
    re: /\bwill\s+happen\b/i,
    label: "deterministic event prediction ('will happen')"
  }
];

/* 3b. Phase 2 prompt must embed the anti-fabrication rules. */
const PROMPTS_FILE = path.join(webRoot, "lib", "ai", "prompts.ts");
if (!existsSync(PROMPTS_FILE)) {
  fail("lib/ai/prompts.ts is missing — the Phase 2 anti-fabrication prompt contract is required");
} else {
  const prompts = readFileSync(PROMPTS_FILE, "utf8").toLowerCase();
  const requiredRules = [
    { needle: "never claim certainty", label: "no-certainty rule" },
    { needle: "never invent sources", label: "no-invented-sources rule" },
    { needle: "not a religious authority", label: "no-religious-authority rule" },
    { needle: "do not predict future events", label: "no-prediction rule" },
    { needle: "do not issue religious rulings", label: "no-fatwa rule" },
    { re: /pending\s+verification/, label: "verification marker rule" },
    { needle: "not predictions or religious rulings", label: "disclaimer rule" }
  ];
  for (const { needle, re, label } of requiredRules) {
    const ok = re ? re.test(prompts) : prompts.includes(needle);
    if (!ok) {
      fail(`prompts.ts is missing the "${label}" in the generation system prompt`);
    }
  }
}

/* 3c. Phase 5.1 Trust Layer: verify dream data files have traditional_notes + source status. */
const VALID_SOURCE_STATUSES = ["verified", "reviewed", "pending"];
const VALID_REVIEW_STATUSES = ["draft", "reviewed", "verified"];

/**
 * Phase 5.2 P0-2: assertion verbs that must NOT appear combined with a
 * religious authority name inside pending-source content.
 */
const ASSERTION_VERBS = /\b(said|states|says|proves|confirms|predicts|teaches)\b/i;
const AUTHORITY_NAMES = /\b(Ibn Sirin|Ibn\s+Shaheen|Quran|Hadith|Prophet|Allah)\b/i;
/** Allowed hedged phrasings for pending sources. */
const ALLOWED_HEDGES = /\b(some classical discussions associate|traditional interpretations may explore|some scholars have discussed|may|can|traditionally discussed)\b/i;

if (existsSync(dreamsDir)) {
  for (const entityId of imageRefs) {
    const entityFile = path.join(dreamsDir, `${entityId}.json`);
    if (!existsSync(entityFile)) continue;
    const entity = JSON.parse(readFileSync(entityFile, "utf8"));

    // traditional_notes must exist and be non-empty.
    if (!Array.isArray(entity.traditional_notes) || entity.traditional_notes.length === 0) {
      fail(`entity "${entityId}" is missing traditional_notes (Phase 5.1 Trust Layer)`);
    }

    // P2-1: review_status audit trail must exist with a valid value.
    if (!entity.review_status || !VALID_REVIEW_STATUSES.includes(entity.review_status)) {
      fail(`entity "${entityId}" is missing review_status (Phase 5.2 P2-1); expected one of ${VALID_REVIEW_STATUSES.join("/")}`);
    }

    // classical_sources must each have a valid status field.
    const sources = entity.classical_sources ?? [];
    for (const src of sources) {
      if (!src.status || !VALID_SOURCE_STATUSES.includes(src.status)) {
        fail(`entity "${entityId}" has a classical_source with missing or invalid status: ${JSON.stringify(src)}`);
      }
      // P0-2: multi-source structure requires tradition field (Phase 5.2 P1-2).
      if (typeof src.tradition !== "string" || src.tradition.length === 0) {
        fail(`entity "${entityId}" has a classical_source missing the "tradition" field (Phase 5.2 P1-2): ${JSON.stringify(src)}`);
      }
    }

    // P0-2: pending source content must not assert certainty via a
    // religious authority + assertion-verb combination, and must stay
    // hedged ("may", "can", "traditionally discussed"). Scan traditional_notes
    // and per-source notes whenever any source is pending.
    const anyPending = sources.some((s) => s.status === "pending");
    if (anyPending) {
      const pendingTexts = [
        ...(entity.traditional_notes ?? []),
        ...sources.filter((s) => s.status === "pending").map((s) => s.notes ?? "")
      ];
      const combined = pendingTexts.join("\n");
      for (const text of pendingTexts) {
        if (AUTHORITY_NAMES.test(text) && ASSERTION_VERBS.test(text)) {
          fail(
            `entity "${entityId}" has a pending source with a deterministic religious claim: "${text.slice(0, 120)}" ` +
            `(Phase 5.2 P0-2: pending content must use hedged phrasing)`
          );
        }
      }
      if (pendingTexts.length > 0 && !ALLOWED_HEDGES.test(combined)) {
        fail(
          `entity "${entityId}" has pending sources with no hedged phrasing ("may", "can", "traditionally discussed") ` +
          `(Phase 5.2 P0-2)`
        );
      }
    }
  }
}

/* 3d. Phase 5.2 P2-2: every core symbol in data/core-symbols.json must have a knowledge entity. */
const CORE_SYMBOLS_FILE = path.join(dataRoot, "core-symbols.json");
let coreSymbolCount = 0;
if (!existsSync(CORE_SYMBOLS_FILE)) {
  fail("data/core-symbols.json is missing (Phase 5.2 P2-2 core trust list)");
} else {
  const coreSymbols = JSON.parse(readFileSync(CORE_SYMBOLS_FILE, "utf8"));
  const list = Array.isArray(coreSymbols) ? coreSymbols : coreSymbols.core_symbols ?? [];
  if (!Array.isArray(list) || list.length === 0) {
    fail("data/core-symbols.json does not contain a non-empty symbol list (Phase 5.2 P2-2)");
  } else {
    coreSymbolCount = list.length;
    for (const id of list) {
      if (!existsSync(path.join(dreamsDir, `${id}.json`))) {
        fail(`core symbol "${id}" (Phase 5.2 P2-2) has no knowledge entity at data/dreams/${id}.json`);
      }
    }
  }
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, out);
    } else if (/\.(ts|tsx)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

for (const dir of ["app", "components", "lib"]) {
  const dirPath = path.join(webRoot, dir);
  if (!existsSync(dirPath)) continue;
  for (const file of walk(dirPath)) {
    // lib/ai contains model instructions whose anti-fabrication rules
    // legitimately quote forbidden phrases as counter-examples; those are
    // validated by the prompt contract check (3b), not this scan.
    if (file.includes(`${path.sep}ai${path.sep}`)) continue;
    const content = readFileSync(file, "utf8");
    for (const { re, label } of FORBIDDEN_PATTERNS) {
      const match = content.match(re);
      if (match) {
        fail(`${path.relative(webRoot, file)}: forbidden ${label} pattern "${match[0].trim()}"`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`verify:dream-ai FAILED with ${errors.length} error(s):`);
  for (const e of errors) console.error(` - ${e}`);
  process.exit(1);
}

console.log(
  `verify:dream-ai passed: ${symbolIds.length} lexicon symbols verified against data/dreams/, ` +
  `${imageRefs.length} enabled entities, ${coreSymbolCount} core symbols (P2-2), ` +
  `0 forbidden religious claims in source.`
);
