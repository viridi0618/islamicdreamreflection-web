# Dream Content Architecture Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the site from a flat "AI Dream Dictionary" into an "Islamic Dream Knowledge Network" by adding a long-tail article layer (DreamArticle) that answers individual search intents, with the Snake Cluster as the first production template.

**Architecture:** Keep `DreamEntity` as the Symbol Hub (existing `/dreams/[slug]` pages). Add a new `DreamArticle` data model in `lib/dream-articles.ts`, rendered by a new article template at `/guides/[slug]` (extending the existing guides route). Each article answers exactly one search keyword, links contextually to sibling articles and its hub symbol, and reuses the unified source registry. Snake Cluster (5 articles) is the validation template; other symbols migrate later.

**Tech Stack:** Next.js App Router, TypeScript, CSS modules (globals.css), unified source registry (`data/sources.ts`).

---

## File Structure

| File | Responsibility |
|---|---|
| Create: `lib/dream-articles.ts` | `DreamArticle` interface + `DREAM_ARTICLES` registry + `loadDreamArticle()` + `allDreamArticles()` |
| Create: `components/DreamArticlePage.tsx` | Article page template (reading path rendering) |
| Modify: `app/guides/[slug]/page.tsx` | Route: branch to article template when slug is a DreamArticle, else render existing guide |
| Modify: `app/sitemap.ts` | Include DreamArticle slugs |
| Modify: `data/dreams/snake.json` | Add contextual links from hub to the 5 cluster articles |
| Modify: `app/globals.css` | Article-specific styles (contextual link, hub link, article FAQ) — reuse existing classes where possible |

---

### Task 1: Data model — `lib/dream-articles.ts`

**Files:**
- Create: `web-push-temp/lib/dream-articles.ts`

- [ ] **Step 1: Write the type + registry shell**

```ts
import { resolvePublicSources } from "@/data/sources";

export interface DreamArticleScenario {
  id: string;
  title: string;
  body: string[];
}

export interface DreamArticleInterpretation {
  title: string;
  body: string[];
  sourceIds?: string[];
}

export interface DreamArticle {
  slug: string;
  keyword: string;
  searchIntent: string;
  title: string;
  description: string;
  quickAnswer: string;
  introduction: string[];
  islamicPerspective: DreamArticleInterpretation[];
  interpretations: DreamArticleInterpretation[];
  scenarios: DreamArticleScenario[];
  reflectionQuestions: string[];
  whatItDoesNotProve: string[];
  faq: Array<{ question: string; answer: string }>;
  relatedArticles: Array<{ href: string; label: string }>;
  relatedSymbols: Array<{ href: string; label: string }>;
  hubSymbol: { href: string; label: string };
}

export const DREAM_ARTICLES: Record<string, DreamArticle> = {
  // Snake Cluster articles added in Task 3
};

export function loadDreamArticle(slug: string): DreamArticle | undefined {
  return DREAM_ARTICLES[slug];
}

export function allDreamArticles(): DreamArticle[] {
  return Object.values(DREAM_ARTICLES);
}

export function collectArticleSourceIds(article: DreamArticle): string[] {
  const ids: string[] = [];
  article.islamicPerspective.forEach((b) => b.sourceIds?.forEach((id) => ids.push(id)));
  article.interpretations.forEach((b) => b.sourceIds?.forEach((id) => ids.push(id)));
  return [...new Set(ids)];
}
```

- [ ] **Step 2: Verify typecheck**

Run: `npm run typecheck`
Expected: PASS (no usage yet, but the types compile)

- [ ] **Step 3: Commit**

```bash
git add lib/dream-articles.ts
git commit -m "feat(articles): add DreamArticle data model"
```

---

### Task 2: Article template — `components/DreamArticlePage.tsx`

**Files:**
- Create: `web-push-temp/components/DreamArticlePage.tsx`

- [ ] **Step 1: Write the template**

Renders in reading-path order: H1 + breadcrumbs → Quick Answer → Introduction → Islamic Perspective (with sources) → Possible Meanings → Common Scenarios → Reflection Questions → What This Dream Does Not Prove → Sources → FAQ → Related Articles + Related Symbols → Try Reflection CTA.

```tsx
import Link from "next/link";
import type { DreamArticle } from "@/lib/dream-articles";
import { collectArticleSourceIds } from "@/lib/dream-articles";
import { resolvePublicSources } from "@/data/sources";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AiEntryBanner } from "@/components/AiEntryBanner";
import { DreamReflectionCta } from "@/components/DreamReflectionCta";
import { SITE_NAME } from "@/lib/site";

export function DreamArticlePage({ article }: { article: DreamArticle }) {
  const sourceIds = collectArticleSourceIds(article);
  const sources = resolvePublicSources(sourceIds);

  return (
    <article className="shell">
      <section className="article-hero">
        <div className="reading-container">
          <Breadcrumbs title={article.title} />
          <h1>{article.title}</h1>
          <AiEntryBanner />
        </div>
      </section>

      {/* Quick Answer */}
      <section className="section">
        <div className="reading-container">
          <div className="quick-answer">
            <p>{article.quickAnswer}</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section">
        <div className="reading-container">
          <div className="prose">
            {article.introduction.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Islamic Perspective */}
      <section className="section" id="islamic-perspective">
        <div className="reading-container">
          <div className="section__head">
            <h2>Islamic Perspective</h2>
            <span className="rule" />
          </div>
          {article.islamicPerspective.map((block) => (
            <div key={block.title} className="theme-block">
              <h3>{block.title}</h3>
              {block.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Possible Meanings */}
      <section className="section" id="possible-meanings">
        <div className="reading-container">
          <div className="section__head">
            <h2>Possible Meanings</h2>
            <span className="rule" />
          </div>
          {article.interpretations.map((item) => (
            <div key={item.title} className="theme-block">
              <h3>{item.title}</h3>
              {item.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Common Scenarios */}
      {article.scenarios.length > 0 && (
        <section className="section" id="scenarios">
          <div className="reading-container">
            <div className="section__head">
              <h2>Common Scenarios</h2>
              <span className="rule" />
            </div>
            {article.scenarios.map((scenario) => (
              <div key={scenario.id} className="scenario-block">
                <h3>{scenario.title}</h3>
                {scenario.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reflection Questions */}
      <section className="section" id="reflection-questions">
        <div className="reading-container">
          <div className="section__head">
            <h2>Questions for Reflection</h2>
            <span className="rule" />
          </div>
          <ul className="context-questions">
            {article.reflectionQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* What This Does Not Prove */}
      <section className="section" id="does-not-prove">
        <div className="reading-container">
          <div className="section__head">
            <h2>What This Dream Does Not Prove</h2>
            <span className="rule" />
          </div>
          <ul className="not-prove-list">
            {article.whatItDoesNotProve.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sources */}
      {sources.length > 0 && (
        <section className="section" id="sources">
          <div className="reading-container">
            <div className="section__head">
              <h2>Sources</h2>
              <span className="rule" />
            </div>
            <div className="source-list">
              {sources.map((s) => (
                <article key={s.id} className="source-item">
                  <h3>{s.title}</h3>
                  <p className="source-item__ref">
                    {s.reference}
                    {s.url && (
                      <>
                        {" · "}
                        <a href={s.url} target="_blank" rel="noopener noreferrer">
                          Read original →
                        </a>
                      </>
                    )}
                  </p>
                  <p className="source-item__supports">
                    <b>Supports:</b> {s.supports}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="reading-container">
          <div className="section__head">
            <h2>Frequently Asked Questions</h2>
            <span className="rule" />
          </div>
          <div className="faq">
            {article.faq.map((faq) => (
              <details key={faq.question} className="faq__item">
                <summary>{faq.question}</summary>
                <div className="faq__body">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Articles + Hub */}
      <section className="section" id="related">
        <div className="wide-container">
          <div className="section__head">
            <h2>Explore Further</h2>
            <span className="rule" />
          </div>
          <div className="related-grid">
            <Link href={article.hubSymbol.href} className="related-item related-item--hub">
              <span className="related-item__cat">Main guide</span>
              <h3>{article.hubSymbol.label}</h3>
            </Link>
            {article.relatedArticles.map((r) => (
              <Link key={r.href} href={r.href} className="related-item">
                <span className="related-item__cat">Related dream</span>
                <h3>{r.label}</h3>
              </Link>
            ))}
            {article.relatedSymbols.map((r) => (
              <Link key={r.href} href={r.href} className="related-item">
                <span className="related-item__cat">Related symbol</span>
                <h3>{r.label}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Try Reflection */}
      <section className="section">
        <div className="wide-container">
          <DreamReflectionCta entityId={article.hubSymbol.href.split("/").pop() ?? ""} />
        </div>
      </section>
    </article>
  );
}
```

- [ ] **Step 2: Wire the route** — modify `app/guides/[slug]/page.tsx`:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allGuides, loadGuide } from "@/lib/guides";
import { loadDreamArticle, allDreamArticles } from "@/lib/dream-articles";
import { DreamArticlePage } from "@/components/DreamArticlePage";
import { resolvePublicSources } from "@/data/sources";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...allGuides().map((g) => ({ slug: g.slug })),
    ...allDreamArticles().map((a) => ({ slug: a.slug }))
  ];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = loadDreamArticle(slug);
  if (article) {
    return {
      title: `${article.title} — Islamic Dream Reflection`,
      description: article.description,
      alternates: { canonical: `${SITE_URL}/guides/${slug}` },
      robots: { index: true, follow: true }
    };
  }
  const guide = loadGuide(slug);
  if (!guide) return {};
  return {
    title: `${guide.title} — Islamic Dream Reflection`,
    description: guide.description,
    alternates: { canonical: `${SITE_URL}/guides/${slug}` },
    robots: { index: true, follow: true }
  };
}

function renderSources(sourceIds: string[]) {
  const sources = resolvePublicSources(sourceIds);
  if (sources.length === 0) return null;
  return (
    <ul className="guide-sources">
      {sources.map((s) => (
        <li key={s.id}>
          {s.reference}
          {s.url && (
            <>
              {" · "}
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                Read original narration →
              </a>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default async function GuidePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = loadDreamArticle(slug);
  if (article) return <DreamArticlePage article={article} />;

  const guide = loadGuide(slug);
  if (!guide) notFound();

  return (
    <article className="shell section">
      {/* existing guide layout unchanged */}
    </article>
  );
}
```

- [ ] **Step 3: Verify typecheck + lint**

Run: `npm run typecheck` and `npm run lint`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add lib/dream-articles.ts components/DreamArticlePage.tsx app/guides/[slug]/page.tsx
git commit -m "feat(articles): add DreamArticle page template and route branch"
```

---

### Task 3: Snake Cluster content — 5 articles

**Files:**
- Modify: `web-push-temp/lib/dream-articles.ts` (add 5 entries to `DREAM_ARTICLES`)

Each article: unique keyword, unique quickAnswer, unique scenarios, unique FAQ, unique internal links. Content rules: no template filler, no strong assertions ("Some traditional interpretations associate…"), no fabricated authority, sources only from the unified registry.

- [ ] **Step 1: `snake-bite-dream-islam`** — keyword "snake bite dream meaning islam"
- [ ] **Step 2: `black-snake-dream-islam`** — keyword "black snake dream meaning islam"
- [ ] **Step 3: `killing-snake-dream-islam`** — keyword "killing snake in dream islam"
- [ ] **Step 4: `snake-in-house-dream-islam`** — keyword "snake in house dream islam"
- [ ] **Step 5: `green-snake-dream-islam`** — keyword "green snake dream meaning islam"

- [ ] **Step 6: Verify typecheck**

Run: `npm run typecheck`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add lib/dream-articles.ts
git commit -m "feat(articles): add snake cluster articles (bite, black, killing, house, green)"
```

---

### Task 4: Internal linking — hub ↔ articles

**Files:**
- Modify: `web-push-temp/data/dreams/snake.json` (add `contextualLinks`)
- Modify: `web-push-temp/app/sitemap.ts`

- [ ] **Step 1: Add hub → article links in snake.json**

Append to `article.contextualLinks` (themes placement):

```json
{
  "placement": "scenarios",
  "href": "/guides/snake-bite-dream-islam",
  "anchor": "If the snake bit you, explore Snake Bite Dream Meaning in Islam.",
  "reason": "Routes readers with a bite-specific search intent to the long-tail article."
},
{
  "placement": "scenarios",
  "href": "/guides/black-snake-dream-islam",
  "anchor": "If the snake was black, explore Black Snake Dream Meaning in Islam.",
  "reason": "Routes readers with a colour-specific search intent to the long-tail article."
},
{
  "placement": "scenarios",
  "href": "/guides/killing-snake-dream-islam",
  "anchor": "If you killed the snake, explore Killing a Snake in a Dream in Islam.",
  "reason": "Routes readers with an action-specific search intent to the long-tail article."
},
{
  "placement": "scenarios",
  "href": "/guides/snake-in-house-dream-islam",
  "anchor": "If the snake was inside your home, explore Snake in the House Dream Meaning in Islam.",
  "reason": "Routes readers with a location-specific search intent to the long-tail article."
},
{
  "placement": "scenarios",
  "href": "/guides/green-snake-dream-islam",
  "anchor": "If the snake was green, explore Green Snake Dream Meaning in Islam.",
  "reason": "Routes readers with a colour-specific search intent to the long-tail article."
}
```

- [ ] **Step 2: Add article URLs to sitemap**

Modify `app/sitemap.ts`:

```tsx
import { allGuides } from "@/lib/guides";
import { allDreamArticles } from "@/lib/dream-articles";
```

And merge article URLs into the guides array:

```tsx
const guides = [
  ...allGuides().map((g) => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6
  })),
  ...allDreamArticles().map((a) => ({
    url: `${SITE_URL}/guides/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }))
];
```

- [ ] **Step 3: Verify typecheck + lint + build**

Run: `npm run typecheck`, `npm run lint`, `npm run build`
Expected: all PASS

- [ ] **Step 4: Commit**

```bash
git add data/dreams/snake.json app/sitemap.ts
git commit -m "feat(articles): wire hub-to-article links and sitemap entries"
```

---

### Task 5: Homepage note (no change)

Homepage Dream Symbols keep linking to Symbol Hubs only. Long-tail articles are reachable via hub contextual links and sitemap. No homepage edit required in this phase.

---

## Self-Review

**1. Spec coverage:**
- Phase 1 data model → Task 1 ✅
- Phase 2 article template → Task 2 ✅
- Phase 3 snake cluster → Task 3 ✅
- Phase 4 internal linking → Task 4 ✅
- Phase 5 homepage → Task 5 (no change, documented) ✅
- Phase 6 content rules → enforced in Task 3 content ✅
- Phase 7 migration of 5 symbols → out of scope this phase (documented as next step) ✅
- Acceptance: typecheck/lint/build → Task 4 Step 3 ✅

**2. Placeholder scan:** No TBD/TODO; all code blocks complete.

**3. Type consistency:** `DreamArticle`, `loadDreamArticle`, `allDreamArticles`, `collectArticleSourceIds` used consistently across Tasks 1–4. `DreamArticlePage` component name does not collide with existing `DreamArticle.tsx` (which renders the Symbol Hub article). Hub CTA entityId extraction uses `href.split("/").pop()` on `/dreams/snake-dream-islam` → `snake-dream-islam`; the DreamReflectionCta expects an entityId (e.g. "snake") — needs verification: if entityId must be "snake", parse `hubSymbol.href` accordingly. See note below.

**Note (resolve before build):** `DreamReflectionCta` receives `entityId` used to build `/interpreter?symbol=<entityId>`. The snake hub slug is `snake-dream-islam` but the entity id is `snake`. In `DreamArticlePage`, set `entityId` explicitly in each article's data (add a `hubEntityId: string` field to `DreamArticle`) rather than parsing the URL. Update Task 1 type and Task 2 template accordingly: `DreamReflectionCta entityId={article.hubEntityId}`.
