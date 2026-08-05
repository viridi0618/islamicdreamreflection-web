/**
 * JSON-LD structured data builders. All output is derived from verified
 * repository data only; unverified content is never asserted in schema.
 */
import type { DreamEntity } from "./data";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";

export function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION
  };
}

export function webSiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
    description: SITE_DESCRIPTION
  };
}

/** Rough word count of the visible article body for schema wordCount. */
function articleWordCount(entity: DreamEntity): number {
  let text = entity.interpretation.general.join(" ") + " " +
    entity.interpretation.positive.join(" ") + " " +
    entity.interpretation.negative.join(" ") + " " +
    (entity.traditional_notes ?? []).join(" ");
  if (entity.article) {
    const a = entity.article;
    text += " " + a.quickAnswer + " " + a.introduction.join(" ") + " " +
      a.beforeInterpreting.map((b) => b.title + " " + b.body).join(" ") + " " +
      a.themes.map((t) => t.title + " " + t.summary + " " + t.body.join(" ")).join(" ") + " " +
      a.scenarios.map((s) => s.title + " " + s.summary + " " + s.body.join(" ")).join(" ") + " " +
      a.doesNotProve.join(" ") + " " +
      a.actionsAfterDream.map((x) => x.title + " " + x.body).join(" ");
  }
  return text.split(/\s+/).filter(Boolean).length;
}

export function articleSchema(params: {
  title: string;
  slug: string;
  entity: DreamEntity;
  datePublished: string;
  dateModified: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.title,
    description: params.entity.interpretation.general?.[0] ?? params.title,
    url: `${SITE_URL}/dreams/${params.slug}`,
    datePublished: params.datePublished,
    dateModified: params.dateModified,
    mainEntityOfPage: `${SITE_URL}/dreams/${params.slug}`,
    about: params.entity.name,
    articleSection: params.entity.category,
    keywords: params.entity.keywords.join(", "),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: `${SITE_URL}/about`
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL
    },
    wordCount: articleWordCount(params.entity),
    inLanguage: "en"
  };
}

export function breadcrumbSchema(params: {
  title: string;
  slug: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL
      },
      {
        "@type": "ListItem",
        position: 2,
        name: params.title,
        item: `${SITE_URL}/dreams/${params.slug}`
      }
    ]
  };
}

export function faqSchema(
  faqs: Array<{ question: string; answer: string }>
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer
      }
    }))
  };
}
