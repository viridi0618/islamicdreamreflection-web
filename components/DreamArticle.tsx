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

/** A contextual in-link inserted at the end of the matching section. */
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
      {/* Hero: centered title, reading-width content */}
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
              Prepared by <Link href="/about#methodology">Islamic Dream Reflection</Link> ·{" "}
              Updated: {entity.last_reviewed ?? LAST_UPDATED} · {readingMinutes(entity)} min read
            </p>
          </div>
          <SymbolArtwork entity={entity} priority variant="hero" className="article-hero__art" />
        </div>
      </section>

      {/* TOC - reading width */}
      <div className="reading-container">
        <nav className="article-toc" aria-label="Table of contents">
          <h2>On this page</h2>
          <ol>
            <li>
              <a href="#before-interpreting">Before interpreting the dream</a>
            </li>
            <li>
              <a href="#themes">Main interpretive themes</a>
            </li>
            <li>
              <a href="#context-questions">Questions for reflection</a>
            </li>
            <li>
              <a href="#scenarios">Common dream scenarios</a>
            </li>
            <li>
              <a href="#does-not-prove">What the dream does not prove</a>
            </li>
            <li>
              <a href="#actions">What to do after the dream</a>
            </li>
            {hasClassicalNotes && (
              <li>
                <a href="#classical-notes">Classical interpretation notes</a>
              </li>
            )}
            {publicSources.length > 0 && (
              <li>
                <a href="#sources">Sources</a>
              </li>
            )}
            <li>
              <a href="#faq">Frequently asked questions</a>
            </li>
          </ol>
        </nav>
      </div>

      {/* Introduction - reading width */}
      <div className="reading-container">
        <div className="prose">
          {article.introduction.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>

      {/* Before Interpreting - card grid, wide */}
      <section className="section" id="before-interpreting">
        <div className="wide-container">
          <div className="section__head">
            <h2>Before Interpreting the Dream</h2>
            <span className="rule" />
          </div>
          <div className="article-grid">
            {article.beforeInterpreting.map((item, i) => (
              <div key={item.title} className="article-grid__item">
                <span className="article-grid__num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Themes - reading content */}
      <section className="section" id="themes">
        <div className="reading-container">
          <div className="section__head">
            <h2>Main Interpretive Themes</h2>
            <span className="rule" />
          </div>
          {article.themes.map((theme) => (
            <div key={theme.id} className="theme-block">
              <div className="theme-block__head">
                <h3>{theme.title}</h3>
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

      {/* Context Questions - reading */}
      {article.contextQuestions.length > 0 && (
        <section className="section" id="context-questions">
          <div className="reading-container">
            <div className="section__head">
              <h2>Questions for Reflection</h2>
              <span className="rule" />
            </div>
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
        </section>
      )}

      {/* Scenarios - wide */}
      <section className="section" id="scenarios">
        <div className="wide-container">
          <div className="section__head">
            <h2>Common Dream Scenarios</h2>
            <span className="rule" />
          </div>
          {article.scenarios.map((scenario) => (
            <div key={scenario.id} className="scenario-block">
              <h3>{scenario.title}</h3>
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
                  <b>It does not prove:</b> {scenario.doesNotProve.join(" · ")}
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

      {/* Does Not Prove - reading */}
      <section className="section" id="does-not-prove">
        <div className="reading-container">
          <div className="section__head">
            <h2>What This Dream Does Not Prove</h2>
            <span className="rule" />
          </div>
          <ul className="not-prove-list">
            {article.doesNotProve.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Actions - card grid, wide */}
      <section className="section" id="actions">
        <div className="wide-container">
          <div className="section__head">
            <h2>What to Do After the Dream</h2>
            <span className="rule" />
          </div>
          <div className="article-grid">
            {article.actionsAfterDream.map((action, i) => (
              <div key={action.title} className="article-grid__item">
                <span className="article-grid__num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{action.title}</h3>
                <p>{action.body}</p>
              </div>
            ))}
          </div>
          {linksByPlacement("actions").map((l) => (
            <InlineLink key={l.href} href={l.href} anchor={l.anchor} />
          ))}
        </div>
      </section>

      {/* Classical Notes - reading */}
      {hasClassicalNotes && (
        <section className="section" id="classical-notes">
          <div className="reading-container">
            <div className="section__head">
              <h2>Classical Interpretation Notes</h2>
              <span className="rule" />
            </div>
            {article.classicalNotes!.map((note) => (
              <div key={note.title} className="theme-block">
                <h3>{note.title}</h3>
                {note.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sources - wide */}
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
            {linksByPlacement("sources").map((l) => (
              <InlineLink key={l.href} href={l.href} anchor={l.anchor} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ - reading */}
      <section className="section" id="faq">
        <div className="reading-container">
          <div className="section__head">
            <h2>Frequently Asked Questions</h2>
            <span className="rule" />
          </div>
          <FaqSection entity={entity} />
        </div>
      </section>

      {/* CTA - wide container */}
      <section className="section">
        <div className="wide-container">
          <DreamReflectionCta entityId={entity.id} />
        </div>
      </section>

      {/* Related Dreams - wide */}
      <section className="section" id="related-dreams">
        <div className="wide-container">
          <div className="section__head">
            <h2>Related dreams</h2>
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
