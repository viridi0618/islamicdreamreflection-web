import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allGuides, loadGuide } from "@/lib/guides";
import { loadDreamArticle, allDreamArticles } from "@/lib/dream-articles";
import { DreamArticlePage } from "@/components/DreamArticlePage";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { resolvePublicSources } from "@/data/sources";
import {
  dreamArticleSchema,
  dreamArticleBreadcrumbSchema,
  faqSchema
} from "@/lib/schema";
import { LAST_UPDATED, SITE_NAME, SITE_URL } from "@/lib/site";

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
    title: guide.metaTitle ?? `${guide.title} — Islamic Dream Reflection`,
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
              {" | "}
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                Read original
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
  if (article) {
    const jsonLd = [
      dreamArticleSchema({
        title: article.title,
        slug,
        article,
        datePublished: LAST_UPDATED,
        dateModified: LAST_UPDATED
      }),
      dreamArticleBreadcrumbSchema({ title: article.title, slug }),
      faqSchema(article.faq)
    ];
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <DreamArticlePage article={article} />
      </>
    );
  }

  const guide = loadGuide(slug);
  if (!guide) notFound();
  const jsonLd = guide.faq?.length ? [faqSchema(guide.faq)] : [];

  return (
    <>
      {jsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <article className="shell section foundation-guide">
        <div className="reading-container">
          <Breadcrumbs title={guide.title} />
          <div className="section__head">
            <h1>{guide.title}</h1>
            <span className="rule" />
          </div>

          {guide.quickAnswer && (
            <div className="quick-answer foundation-guide__quick-answer">
              <p>{guide.quickAnswer}</p>
            </div>
          )}

          <div className="prose">
            {guide.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}

            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body?.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {section.sourceIds && renderSources(section.sourceIds)}
                {section.items && (
                  <div className="foundation-guide__items">
                    {section.items.map((item) => (
                      <article key={item.title} className="foundation-guide__item">
                        <h3>{item.title}</h3>
                        {item.body.map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                        {item.sourceIds && renderSources(item.sourceIds)}
                      </article>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {guide.faq && guide.faq.length > 0 && (
              <section id="faq">
                <h2>Frequently Asked Questions</h2>
                <div className="faq foundation-guide__faq">
                  {guide.faq.map((faq) => (
                    <details key={faq.question} className="faq__item">
                      <summary>{faq.question}</summary>
                      <div className="faq__body">{faq.answer}</div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {guide.relatedLinks && guide.relatedLinks.length > 0 && (
              <section id="continue-exploring">
                <h2>Continue Exploring</h2>
                <div className="foundation-guide__related">
                  {guide.relatedLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="foundation-guide__related-link"
                    >
                      <span>{link.label}</span>
                      {link.description && <small>{link.description}</small>}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <p className="guide-meta">
              Prepared by {SITE_NAME}. Traditional perspectives are not predictions
              or religious rulings.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
