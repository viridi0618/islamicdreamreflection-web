import Link from "next/link";
import type { DreamArticle } from "@/lib/dream-articles";
import { collectArticleSourceIds } from "@/lib/dream-articles";
import { resolvePublicSources } from "@/data/sources";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AiEntryBanner } from "@/components/AiEntryBanner";
import { DreamReflectionCta } from "@/components/DreamReflectionCta";

export function DreamArticlePage({ article }: { article: DreamArticle }) {
  const sourceIds = collectArticleSourceIds(article);
  const sources = resolvePublicSources(sourceIds);

  return (
    <article className="shell">
      <section className="article-hero">
        <div className="reading-container">
          <Breadcrumbs title={article.title} />
          <h1>{article.title}</h1>
          <AiEntryBanner entityId={article.hubEntityId} />
        </div>
      </section>

      <section className="section">
        <div className="reading-container">
          <div className="quick-answer">
            <p>{article.quickAnswer}</p>
          </div>
        </div>
      </section>

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
          {article.interpretations.map((item) => (
            <div key={item.title} className="theme-block">
              <p className="theme-block__title">{item.title}</p>
              {item.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="islamic-perspective">
        <div className="reading-container">
          <div className="section__head">
            <h2>Islamic Perspective</h2>
            <span className="rule" />
          </div>
          {article.islamicPerspective.map((block) => (
            <div key={block.title} className="theme-block">
              <p className="theme-block__title">{block.title}</p>
              {block.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          ))}
          <ul className="not-prove-list">
            {article.whatItDoesNotProve.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="your-context-matters">
        <div className="reading-container">
          <div className="section__head">
            <h2>Your Context Matters</h2>
            <span className="rule" />
          </div>
          {article.scenarios.length > 0 &&
            article.scenarios.map((scenario) => (
              <div key={scenario.id} className="scenario-block">
                <p className="scenario-block__title">{scenario.title}</p>
                {scenario.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            ))}
          <ul className="context-questions">
            {article.reflectionQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
      </section>

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
          </div>
        </section>
      )}

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

      <section className="section">
        <div className="wide-container">
          <DreamReflectionCta entityId={article.hubEntityId} />
        </div>
      </section>
    </article>
  );
}
