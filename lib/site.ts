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
}

export const ENABLED_PAGES: PageConfig[] = [
  {
    entityId: "snake",
    slug: "snake-dream-islam",
    title: "Snake Dream Meaning in Islam"
  },
  {
    entityId: "dead-person",
    slug: "dead-person-dream-islam",
    title: "Dead Person Dream Meaning in Islam"
  },
  {
    entityId: "teeth",
    slug: "teeth-falling-out-islam",
    title: "Teeth Falling Out Dream Meaning in Islam"
  },
  {
    entityId: "water",
    slug: "water-dream-islam",
    title: "Water Dream Meaning in Islam"
  },
  {
    entityId: "pregnancy",
    slug: "pregnancy-dream-islam",
    title: "Pregnancy Dream Meaning in Islam"
  }
];

export const PAGE_BY_SLUG = new Map(ENABLED_PAGES.map((p) => [p.slug, p]));

export const dreamUrl = (slug: string) => `/dreams/${slug}`;
