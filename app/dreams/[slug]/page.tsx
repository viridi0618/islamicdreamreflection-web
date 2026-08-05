import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiEntryBanner } from "@/components/AiEntryBanner";
import { AiCta } from "@/components/AiCta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ClassicalReferences } from "@/components/ClassicalReferences";
import { FaqSection, buildFaqs } from "@/components/FaqSection";
import { ReflectionQuestions } from "@/components/ReflectionQuestions";
import { RelatedDreams } from "@/components/RelatedDreams";
import { Scenarios } from "@/components/Scenarios";
import { SymbolOverview } from "@/components/SymbolOverview";
import {
  categoryLabel,
  loadDreamEntity,
  loadEnabledPages
} from "@/lib/data";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema
} from "@/lib/schema";
import { PAGE_BY_SLUG, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...PAGE_BY_SLUG.keys()].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = PAGE_BY_SLUG.get(slug);
  if (!page) return {};
  const entity = loadDreamEntity(page.entityId);
  const description =
    page.metaDescription ??
    [
      entity.interpretation.general?.[0] ?? page.title,
      "Traditional interpretations, not predictions."
    ].join(" ");

  return {
    title: page.title,
    description,
    alternates: { canonical: `${SITE_URL}/dreams/${slug}` },
    openGraph: {
      title: page.title,
      description,
      url: `${SITE_URL}/dreams/${slug}`,
      siteName: "Islamic Dream Knowledge Base",
      type: "article"
    },
    robots: { index: true, follow: true }
  };
}

export default async function DreamPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = PAGE_BY_SLUG.get(slug);
  if (!page) notFound();

  const entity = loadDreamEntity(page.entityId);
  const pages = loadEnabledPages();
  const faqs = buildFaqs(entity);

  const jsonLd = [
    articleSchema({ title: page.title, slug, entity }),
    breadcrumbSchema({ title: page.title, slug }),
    faqSchema(faqs)
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="shell">
        <section className="article-hero">
          <Breadcrumbs title={page.title} />
          <h1>{page.title}</h1>
          <AiEntryBanner entityId={entity.id} />
          <div className="quick-answer" style={{ marginTop: 18 }}>
            <p>
              {entity.interpretation.general?.[0] ??
                "Traditional scholars have discussed this dream symbol; specific meanings are currently pending verification."}
            </p>
            <span className="disclaimer">
              Islamic dream interpretation is a collection of traditional
              readings — not a prediction. Classical references on this page
              are marked pending verification.
            </span>
          </div>
        </section>

        <section className="section" aria-label="Dream symbol overview">
          <SymbolOverview entity={entity} />
        </section>

        <section className="section" id="possible-meanings">
          <div className="section__head">
            <h2>Possible meanings</h2>
            <span className="rule" />
          </div>
          <div className="prose">
            {(entity.interpretation.general ?? []).map((item) => (
              <p key={item}>{item}</p>
            ))}
            {(entity.interpretation.positive ?? []).map((item) => (
              <p key={item}>Positive readings: {item}</p>
            ))}
            {(entity.interpretation.negative ?? []).map((item) => (
              <p key={item}>Cautious readings: {item}</p>
            ))}
          </div>
        </section>

        <section className="section" id="scenarios">
          <div className="section__head">
            <h2>Different scenarios</h2>
            <span className="rule" />
            <span className="section__sub">{entity.related.length} variations</span>
          </div>
          <Scenarios entity={entity} />
        </section>

        <section className="section" id="classical-references">
          <div className="section__head">
            <h2>Classical references</h2>
            <span className="rule" />
          </div>
          <ClassicalReferences entity={entity} />
        </section>

        <section className="section" id="reflection-questions">
          <div className="section__head">
            <h2>Reflection questions</h2>
            <span className="rule" />
          </div>
          <ReflectionQuestions />
        </section>

        <section className="section" id="faq">
          <div className="section__head">
            <h2>Frequently asked questions</h2>
            <span className="rule" />
          </div>
          <FaqSection entity={entity} />
        </section>

        <section className="section">
          <AiCta />
        </section>

        <section className="section" id="related-dreams">
          <div className="section__head">
            <h2>Related dreams</h2>
            <span className="rule" />
          </div>
          <RelatedDreams pages={pages} currentSlug={slug} />
          <p style={{ color: "var(--ink-faint)", fontSize: 13.5, marginTop: 14 }}>
            More {categoryLabel(entity.category)} dream pages will appear here as
            the knowledge base expands beyond validation.
          </p>
        </section>
      </article>
    </>
  );
}
