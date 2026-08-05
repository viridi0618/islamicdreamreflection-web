# Islamic Dream Web — SEO + Ritual Engine + Retention Loop (Phases 2-5)

A Next.js (App Router) site that renders dream interpretation pages **directly
from the knowledge base JSON** in `../data/`. Phase 2 validated 5 high-intent
pages for Google indexation; Phase 3 added the product entry; Phase 4 turned
the interpreter into an **interactive dream reflection ritual**; Phase 5 adds
an **anonymous retention loop** (save → history → share → return) with no
accounts and no payments.

## Architecture

```
Google Search Demand                    User Dream Input (guided ritual)
        ↓                                         ↓
  SEO Dream Pages (SSG)              Ritual Flow: focus → dream → context
        ↓                                         ↓
  Knowledge Base (data/dreams)  ◄───  symbol verification (hard boundary)
        ↓                                         ↓
  /interpreter (reflection)  ◄───  overview + symbol exploration + focus
        ↓                                 reading + guidance + share card
```

SEO pages capture search demand; the reflection flow carries it. Both read
the SAME `data/dreams/*.json` — there is no second set of data.

## Ritual flow (Phase 4)

```
/interpreter
  1. Focus    — pick life areas (multi-select cards, optional)
  2. Dream    — the ONLY free-text input (≤800 chars)
  3. Context  — quick choice chips: memory level / emotion / characters
  4. Processing — ~2.4s ritual animation (moon + staged messages)
  5. Result   — Dream Overview · Symbol Exploration · Personal Focus
               Reading · Reflection Guidance · Share Card (PNG download)
```

- `web/lib/ritual.ts` defines `DreamContext` + option constants + focus
  modifiers (expression tuning only, never new religious content).
- Focus readings are deterministic templates using only "may / can reflect /
  consider" phrasing (`buildFocusReadings` in the API route).
- The share card is drawn on canvas: symbols, themes, focus, domain. It never
  includes the dream text and never makes religious assertions.

## AI pipeline (Phases 3-4)

Two-phase DeepSeek pipeline, server-side only (the API key never leaves the
server):

1. **Extraction** (`lib/ai/deepseek.ts`): strict JSON (symbols / emotions /
   scenario), JSON mode, no interpretation allowed.
2. **Verification** (`lib/ai/verify.ts`): every extracted symbol MUST resolve
   to a knowledge entity (by id, lexicon alias, or name). Unresolved terms
   never receive meaning.
3. **Generation**: DeepSeek writes the reflection from verified knowledge
   context + ritual context only; anti-fabrication rules are embedded in the
   system prompt (`lib/ai/prompts.ts`).
4. **Cache** (`lib/ai/cache.ts`): identical symbol sets cached (30 min TTL).
5. **Fallback**: without `DEEPSEEK_API_KEY` the API route degrades to the
   offline rule parser (UI shows "offline mode").

### Pipeline

```
POST /api/analyze { dream, context }
  -> DeepSeek extraction | rule parser fallback
  -> verifySymbols() against data/dreams/*.json
  -> buildKnowledgeContext() + focusReadings (templates)
  -> cache lookup -> DeepSeek generation -> { reflection, verifiedSymbols,
     focusReadings, context, ... }
```

## Configuration

Copy `web/.env.example` to `web/.env.local`:

```bash
DEEPSEEK_API_KEY=sk-...      # required for AI mode (platform.deepseek.com)
# DEEPSEEK_MODEL=deepseek-v4-flash   # optional
# DEEPSEEK_BASE_URL=https://api.deepseek.com  # optional
NEXT_PUBLIC_SITE_URL=https://your-domain.com  # before deployment
```

Without a key the site still works fully in offline rule-based mode.

## Retention loop (Phase 5)

```
Result → Save / Share
   ├─ Save privately      -> localStorage (dream_memory, max 20)
   ├─ Share               -> POST /api/reflections (public fields ONLY)
   │                        → /reflection/{shareId} (noindex, no dream text)
   └─ My Dreams (/my-dreams)  -> history cards → detail restore (noindex)
```

- `lib/dream-memory.ts`: on-device persistence, 20-entry cap, share incentive
  counters (1 free reflection + 1 per share, device-local, no account).
- `lib/events.ts`: funnel events (interpreter_open → analysis_completed →
  save/share → share_page_viewed) to console + localStorage queue with a
  device id, ready for later export.
- Share snapshots are stored server-side as JSON files in `web/.reflections/`
  (gitignored). The server rejects any request containing the dream text.
- New pages `/my-dreams`, `/my-dreams/[id]`, `/reflection/[id]` are all
  `noindex` — user content never enters Google. The SEO pages, sitemap and
  canonicals are untouched.

## Pages

| URL | Role |
|---|---|
| `/` | Home: entry to dream pages + interpreter |
| `/dreams/*` | SEO pages (unchanged; CTA = "Explore Your Snake Dream" style) |
| `/interpreter` | Interactive dream reflection ritual |
| `/interpreter?symbol=snake` | Pre-filled from an SEO page's CTA |
| `/my-dreams` | Saved reflections (noindex, device-local) |
| `/my-dreams/[id]` | Restored reflection detail (noindex) |
| `/reflection/[id]` | Public share snapshot (noindex, no dream text) |
| `/api/analyze` | Server pipeline (extraction → verification → generation) |
| `/api/reflections` | Creates public share snapshots |

## Commands

```bash
npm install
npm run dev            # local preview
npm run build          # static generation + sitemap/robots
npm run start          # serve the production build
npm run lint
npm run typecheck
npm run verify:dream-ai   # lexicon integrity + prompt contract + anti-fabrication
```

## Page anatomy (per entity)

1. Breadcrumbs
2. H1 + Quick Answer (with "not a prediction" disclaimer)
3. Symbol overview card (symbol / category / related / status)
4. Possible meanings (neutral observations only, from the entity file)
5. Different scenarios (each marked `needs verification`)
6. Classical references table (`pending verification` until human review)
7. Reflection questions
8. FAQ (FAQPage JSON-LD; answers stay verification-honest)
9. AI interpretation CTA (disabled interface stub — no AI backend yet)
10. Related dreams (internal links to other enabled pages)

## SEO output

- Per-page `metadata`: title, description, canonical, OpenGraph
- JSON-LD: `Article` + `BreadcrumbList` + `FAQPage`
- `sitemap.xml` and `robots.txt` generated at build time

## Content policy (unchanged from Phase 1)

No religious content is invented. Every classical reference stays
`pending verification` until a human editor confirms the citation; the FAQ and
interpretation sections are written to be verification-honest. See
`../docs/page-template.md` for the full policy.

## Deployment & Search Console

1. Deploy the `web/` directory to any Next.js host (Vercel, Netlify, Cloudflare
   Pages, or a VPS with `npm run build && npm run start`).
2. Set the real domain at build time: `NEXT_PUBLIC_SITE_URL=https://your-domain`
   (until set, canonical/sitemap/robots use the RFC 2606 placeholder
   `https://example.com`).
3. Submit `https://your-domain/sitemap.xml` in Google Search Console, and add
   the property for the domain.
4. Track indexation of the 5 dream URLs. If they index, expand `ENABLED_PAGES`.

## Data source of truth

Do not edit rendered content directly. The source of truth is
`../data/dreams/*.json` + `../data/categories.json` + `../data/dream-keywords.json`,
maintained by the scripts in `../scripts/`.
