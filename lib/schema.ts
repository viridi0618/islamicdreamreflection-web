/**
 * JSON-LD structured data builders. All output is derived from verified
 * repository data only; unverified content is never asserted in schema.
 */
import type { DreamEntity } from "./data";
import type { DreamArticle } from "./dream-articles";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";
import { visibleWordCount, dreamArticleWordCount } from "./article-text";

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
    wordCount: visibleWordCount(params.entity),
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
        name: "Dream Guides",
        item: `${SITE_URL}/guides`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: params.title,
        item: `${SITE_URL}/dreams/${params.slug}`
      }
    ]
  };
}

/** Article schema for a long-tail DreamArticle page (/guides/<slug>). */
export function dreamArticleSchema(params: {
  title: string;
  slug: string;
  article: DreamArticle;
  datePublished: string;
  dateModified: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.title,
    description: params.article.description,
    url: `${SITE_URL}/guides/${params.slug}`,
    datePublished: params.datePublished,
    dateModified: params.dateModified,
    mainEntityOfPage: `${SITE_URL}/guides/${params.slug}`,
    about: params.article.keyword,
    articleSection: "dream interpretation",
    keywords: params.article.keyword,
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
    wordCount: dreamArticleWordCount(params.article),
    inLanguage: "en"
  };
}

/** Breadcrumb schema for a long-tail DreamArticle page (/guides/<slug>). */
export function dreamArticleBreadcrumbSchema(params: {
  title: string;
  slug: string;
  hubTitle?: string;
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
        name: "Dream Guides",
        item: `${SITE_URL}/guides`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: params.title,
        item: `${SITE_URL}/guides/${params.slug}`
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
