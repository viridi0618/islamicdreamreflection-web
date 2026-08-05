/**
 * Site-wide configuration for the SEO validation MVP.
 *
 * DOMAIN: no production domain exists yet. SITE_URL is read from the
 * NEXT_PUBLIC_SITE_URL environment variable and falls back to the RFC 2606
 * reserved example.com so generated canonical/sitemap/robots URLs are never
 * fabricated. Set NEXT_PUBLIC_SITE_URL before deploying.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const SITE_NAME = "Islamic Dream Knowledge Base";

export const SITE_DESCRIPTION =
  "An educational dream reflection platform inspired by Islamic traditions and classical scholarship.";

/** ISO date used for datePublished/dateModified across static pages. */
export const LAST_UPDATED = "2026-08-05";

/**
 * The 5 validation pages for Phase 2. Each entry maps a knowledge-base
 * entity to its public URL slug and H1 title. When validation succeeds this
 * list grows to more entities — the rendering pipeline is entity-driven and
 * needs no other changes.
 */
export interface PageConfig {
  entityId: string;
  slug: string;
  title: string;
  /** Hand-written meta description (SERP). Falls back to auto-built description when absent. */
  metaDescription?: string;
}

export const ENABLED_PAGES: PageConfig[] = [
  {
    entityId: "snake",
    slug: "snake-dream-islam",
    title: "Snake Dream Meaning in Islam",
    metaDescription:
      "Snake dreams are among the most common; Islamic readings differ by color, action and location. Explore meanings through classical dream traditions. Not predictions."
  },
  {
    entityId: "dead-person",
    slug: "dead-person-dream-islam",
    title: "Dead Person Dream Meaning in Islam",
    metaDescription:
      "Dreams of the deceased carry heavy emotional weight and many readings. Islamic interpretations explained, with sources cited for each reading. Not predictions."
  },
  {
    entityId: "teeth",
    slug: "teeth-falling-out-islam",
    title: "Teeth Falling Out Dream Meaning in Islam",
    metaDescription:
      "Teeth dreams are among the most searched topics. Islamic readings vary by which teeth and what happens. Explore meanings through classical dream traditions. Not predictions."
  },
  {
    entityId: "water",
    slug: "water-dream-islam",
    title: "Water Dream Meaning in Islam",
    metaDescription:
      "Water appears in dreams more than almost any element. Islamic readings change with its state and action. Explore meanings through classical dream traditions. Not predictions."
  },
  {
    entityId: "pregnancy",
    slug: "pregnancy-dream-islam",
    title: "Pregnancy Dream Meaning in Islam",
    metaDescription:
      "Pregnancy dreams often symbolize creation, anticipation or a developing stage of life. Explore meanings through classical dream traditions. Not predictions."
  }
];

export const PAGE_BY_SLUG = new Map(ENABLED_PAGES.map((p) => [p.slug, p]));

export const dreamUrl = (slug: string) => `/dreams/${slug}`;
