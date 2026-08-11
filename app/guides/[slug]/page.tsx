import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allGuides, loadGuide } from "@/lib/guides";
import { loadDreamArticle, allDreamArticles } from "@/lib/dream-articles";
import { DreamArticlePage } from "@/components/DreamArticlePage";
import { FloatingContentActions } from "@/components/FloatingContentActions";
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

  // Long-tail dream article (Dream Content Architecture Upgrade).
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
        <FloatingContentActions
          contentType="guide"
          slug={slug}
          title={article.title}
          text={article.description}
          href={`/guides/${slug}`}
        />
        <DreamArticlePage article={article} />
      </>
    );
  }

  // Foundation guide (Phase D).
  const guide = loadGuide(slug);
  if (!guide) notFound();

  return (
    <>
      <FloatingContentActions
        contentType="guide"
        slug={slug}
        title={guide.title}
        text={guide.description}
        href={`/guides/${slug}`}
      />
      <article className="shell section">
        <div className="reading-container">
          <div className="section__head">
            <h1>{guide.title}</h1>
            <span className="rule" />
          </div>

          <div className="prose">
            {guide.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}

            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {section.sourceIds && renderSources(section.sourceIds)}
              </section>
            ))}

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
