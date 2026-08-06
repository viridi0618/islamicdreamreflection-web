import Link from "next/link";
import type { DreamArticle } from "@/lib/dream-articles";
import { collectArticleSourceIds } from "@/lib/dream-articles";
import { resolvePublicSources } from "@/data/sources";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AiEntryBanner } from "@/components/AiEntryBanner";
import { DreamReflectionCta } from "@/components/DreamReflectionCta";

/**
 * Long-tail dream article template (Dream Content Architecture Upgrade).
 *
 * Renders a single search-intent page in reading-path order:
 * H1 → Quick Answer → Introduction → Islamic Perspective → Possible Meanings
 * → Common Scenarios → Reflection Questions → What This Dream Does Not Prove
 * → Sources → FAQ → Related Articles + Hub → Try Reflection.
 *
 * Uses the same container system and content classes as the symbol hub
 * (DreamArticle.tsx) so the reading axis stays consistent across the site.
 */
export function DreamArticlePage({ article }: { article: DreamArticle }) {
  const sourceIds = collectArticleSourceIds(article);
  const sources = resolvePublicSources(sourceIds);

  return (
    <article className="shell">
      {/* Hero */}
      <section className="article-hero">
        <div className="reading-container">
          <Breadcrumbs title={article.title} />
          <h1>{article.title}</h1>
          <AiEntryBanner entityId={article.hubEntityId} />
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
            <Link
              href={article.hubSymbol.href}
              className="related-item related-item--hub"
            >
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
          <DreamReflectionCta entityId={article.hubEntityId} />
        </div>
      </section>
    </article>
  );
}
