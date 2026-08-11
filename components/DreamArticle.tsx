import Link from "next/link";
import type { DreamArticleContent, DreamEntity, EvidenceType } from "@/lib/data";
import type { PageConfig } from "@/lib/site";
import { resolvePublicSources, type SourceType } from "@/data/sources";
import { categoryLabel } from "@/lib/data";
import { LAST_UPDATED } from "@/lib/site";
import { readingMinutes } from "@/lib/article-text";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AiEntryBanner } from "@/components/AiEntryBanner";
import { DreamReflectionCta } from "@/components/DreamReflectionCta";
import { FaqSection } from "@/components/FaqSection";
import { RelatedDreams } from "@/components/RelatedDreams";
import { SymbolArtwork } from "@/components/SymbolArtwork";

const EVIDENCE_LABEL: Record<EvidenceType, string> = {
  quran: "Qur'an",
  hadith: "Hadith",
  "classical-tradition": "Classical Tradition",
  "editorial-reflection": "Personal Reflection"
};

const SOURCE_TYPE_LABEL: Record<SourceType, string> = {
  quran: "Qur'an",
  hadith: "Hadith",
  "classical-work": "Classical work",
  "modern-reference": "Modern reference",
  methodology: "Methodology"
};

function collectSourceIds(article: DreamArticleContent): string[] {
  const ids: string[] = [];
  article.themes.forEach((t) => t.sourceIds?.forEach((id) => ids.push(id)));
  article.scenarios.forEach((s) => s.sourceIds?.forEach((id) => ids.push(id)));
  article.actionsAfterDream.forEach((a) => a.sourceIds?.forEach((id) => ids.push(id)));
  article.classicalNotes?.forEach((c) => c.sourceIds.forEach((id) => ids.push(id)));
  return [...new Set(ids)];
}

function InlineLink({ href, anchor }: { href: string; anchor: string }) {
  return (
    <p className="inline-link">
      <Link href={href}>{anchor}</Link>
    </p>
  );
}

export function DreamArticle({
  entity,
  pageTitle,
  slug,
  pages
}: {
  entity: DreamEntity;
  pageTitle: string;
  slug: string;
  pages: Array<{ page: PageConfig; entity: DreamEntity }>;
}) {
  const article = entity.article!;
  const sourceIds = collectSourceIds(article);
  const publicSources = resolvePublicSources(sourceIds);
  const hasClassicalNotes =
    (article.classicalNotes?.length ?? 0) > 0 &&
    (article.classicalNotes ?? []).some((c) => c.sourceIds.length > 0);

  const linksByPlacement = (placement: string) =>
    article.contextualLinks.filter((l) => l.placement === placement);

  return (
    <article className="shell">
      <section className="article-hero">
        <div className="wide-container article-hero__layout">
          <div className="article-hero__copy">
            <Breadcrumbs title={pageTitle} />
            <h1>{pageTitle}</h1>
            <AiEntryBanner entityId={entity.id} />
            <div className="quick-answer" style={{ marginTop: 18 }}>
              <p>{article.quickAnswer}</p>
              <span className="disclaimer">
                Traditional perspectives vary by context and are not predictions
                or religious rulings.
              </span>
            </div>
            <p
              className="page-meta"
              style={{ marginTop: 14, fontSize: 13, color: "var(--ink-faint)" }}
            >
              Prepared by <Link href="/about#methodology">Islamic Dream Reflection</Link> |{" "}
              Updated: {entity.last_reviewed ?? LAST_UPDATED} | {readingMinutes(entity)} min read
            </p>
          </div>
          <SymbolArtwork entity={entity} priority variant="hero" className="article-hero__art" />
        </div>
      </section>

      <div className="reading-container">
        <nav className="article-toc" aria-label="Table of contents">
          <h2>On this page</h2>
          <ol>
            <li>
              <a href="#what-this-dream-may-reflect">What This Dream May Reflect</a>
            </li>
            <li>
              <a href="#islamic-perspective">Islamic Perspective</a>
            </li>
            <li>
              <a href="#your-context-matters">Your Context Matters</a>
            </li>
            <li>
              <a href="#actions">What to Do After This Dream</a>
            </li>
            {publicSources.length > 0 && (
              <li>
                <a href="#sources">Sources</a>
              </li>
            )}
            <li>
              <a href="#faq">Frequently asked questions</a>
            </li>
            <li>
              <a href="#related-dreams">Explore further</a>
            </li>
          </ol>
        </nav>
      </div>

      <section className="section" id="what-this-dream-may-reflect">
        <div className="reading-container">
          <div className="section__head">
            <h2>What This Dream May Reflect</h2>
            <span className="rule" />
          </div>
          <div className="prose">
            {article.introduction.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {article.themes.map((theme) => (
            <div key={theme.id} className="theme-block">
              <div className="theme-block__head">
                <p className="theme-block__title">{theme.title}</p>
                <span className={`evidence-tag evidence-tag--${theme.evidenceType}`}>
                  {EVIDENCE_LABEL[theme.evidenceType]}
                </span>
              </div>
              <p className="theme-block__summary">{theme.summary}</p>
              {theme.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          ))}
          {linksByPlacement("themes").map((l) => (
            <InlineLink key={l.href} href={l.href} anchor={l.anchor} />
          ))}
        </div>
      </section>

      <section className="section" id="islamic-perspective">
        <div className="reading-container">
          <div className="section__head">
            <h2>Islamic Perspective</h2>
            <span className="rule" />
          </div>
          {hasClassicalNotes &&
            article.classicalNotes!.map((note) => (
              <div key={note.title} className="theme-block">
                <p className="theme-block__title">{note.title}</p>
                {note.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            ))}
          <ul className="not-prove-list">
            {article.doesNotProve.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="your-context-matters">
        <div className="wide-container">
          <div className="section__head">
            <h2>Your Context Matters</h2>
            <span className="rule" />
          </div>
          <div className="article-grid">
            {article.beforeInterpreting.map((item, i) => (
              <div key={item.title} className="article-grid__item">
                <span className="article-grid__num" aria-hidden="true">
                  {i + 1}
                </span>
                <p className="article-grid__title">{item.title}</p>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {article.contextQuestions.length > 0 && (
          <div className="reading-container">
            <p className="context-questions__intro">
              These questions are not an interpretation. They are an invitation
              to notice the details that made the dream yours, before reading any
              symbolic reading below.
            </p>
            <ul className="context-questions">
              {article.contextQuestions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="wide-container">
          {article.scenarios.map((scenario) => (
            <div key={scenario.id} className="scenario-block">
              <p className="scenario-block__title">{scenario.title}</p>
              <p className="scenario-block__summary">{scenario.summary}</p>
              {scenario.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {scenario.positiveReading && (
                <p className="scenario-block__reading scenario-block__reading--positive">
                  <b>Positive reading:</b> {scenario.positiveReading}
                </p>
              )}
              {scenario.cautionaryReading && (
                <p className="scenario-block__reading scenario-block__reading--caution">
                  <b>Cautionary reading:</b> {scenario.cautionaryReading}
                </p>
              )}
              {scenario.doesNotProve && scenario.doesNotProve.length > 0 && (
                <p className="scenario-block__not-prove">
                  <b>It does not prove:</b> {scenario.doesNotProve.join(" | ")}
                </p>
              )}
              {scenario.relatedGuide && (
                <p className="inline-link">
                  <Link href={scenario.relatedGuide.href}>
                    {scenario.relatedGuide.label}
                  </Link>
                </p>
              )}
            </div>
          ))}
          {linksByPlacement("scenarios").map((l) => (
            <InlineLink key={l.href} href={l.href} anchor={l.anchor} />
          ))}
        </div>
      </section>

      <section className="section" id="actions">
        <div className="wide-container">
          <div className="section__head">
            <h2>What to Do After This Dream</h2>
            <span className="rule" />
          </div>
          <div className="article-grid">
            {article.actionsAfterDream.map((action, i) => (
              <div key={action.title} className="article-grid__item">
                <span className="article-grid__num" aria-hidden="true">
                  {i + 1}
                </span>
                <p className="article-grid__title">{action.title}</p>
                <p>{action.body}</p>
              </div>
            ))}
          </div>
          {linksByPlacement("actions").map((l) => (
            <InlineLink key={l.href} href={l.href} anchor={l.anchor} />
          ))}
        </div>
      </section>

      {publicSources.length > 0 && (
        <section className="section" id="sources">
          <div className="wide-container">
            <div className="section__head">
              <h2>Sources</h2>
              <span className="rule" />
            </div>
            <div className="source-list">
              {publicSources.map((s) => (
                <article key={s.id} className="source-item">
                  <h3>
                    {s.title}{" "}
                    <span className={`source-type source-type--${s.type}`}>
                      {SOURCE_TYPE_LABEL[s.type]}
                    </span>
                  </h3>
                  <p className="source-item__ref">
                    {s.reference}
                    {s.url && (
                      <>
                        {" | "}
                        <a href={s.url} target="_blank" rel="noopener noreferrer">
                          Read original &rarr;
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
            {linksByPlacement("sources").map((l) => (
              <InlineLink key={l.href} href={l.href} anchor={l.anchor} />
            ))}
          </div>
        </section>
      )}

      <section className="section" id="faq">
        <div className="reading-container">
          <div className="section__head">
            <h2>Frequently Asked Questions</h2>
            <span className="rule" />
          </div>
          <FaqSection entity={entity} />
        </div>
      </section>

      <section className="section">
        <div className="wide-container">
          <DreamReflectionCta entityId={entity.id} />
        </div>
      </section>

      <section className="section" id="related-dreams">
        <div className="wide-container">
          <div className="section__head">
            <h2>Explore Further</h2>
            <span className="rule" />
          </div>
          <RelatedDreams pages={pages} currentSlug={slug} />
          <p style={{ color: "var(--ink-faint)", fontSize: 13.5, marginTop: 14 }}>
            More {categoryLabel(entity.category)} dream pages are added as
            interpretations are reviewed and prepared.
          </p>
        </div>
      </section>
    </article>
  );
}
