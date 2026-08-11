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

export const SITE_NAME = "Islamic Dream Reflection";

export const SITE_DESCRIPTION =
  "An educational dream reflection platform inspired by Islamic traditions and classical scholarship.";

/** ISO date used for datePublished/dateModified across static pages. */
export const LAST_UPDATED = "2026-08-05";

/**
 * The validation pages for Phase 2. Each entry maps a knowledge-base
 * entity to its public URL slug and H1 title. When validation succeeds this
 * list grows to more entities — the rendering pipeline is entity-driven and
 * needs no other changes.
 */
export interface PageConfig {
  entityId: string;
  slug: string;
  title: string;
  /** First public publication date for this Dream detail page. */
  publishedAt: string;
  /** Hand-written meta description (SERP). Falls back to auto-built description when absent. */
  metaDescription?: string;
}

export const ENABLED_PAGES: PageConfig[] = [
  {
    entityId: "snake",
    slug: "snake-dream-islam",
    title: "Snake Dream Meaning in Islam",
    publishedAt: "2026-08-05",
    metaDescription:
      "Snake dreams are among the most common; Islamic readings differ by color, action and location. Explore meanings through classical dream traditions. Not predictions."
  },
  {
    entityId: "dead-person",
    slug: "dead-person-dream-islam",
    title: "Dead Person Dream Meaning in Islam",
    publishedAt: "2026-08-05",
    metaDescription:
      "Dreams of the deceased carry heavy emotional weight and many readings. Islamic interpretations explained, with sources cited for each reading. Not predictions."
  },
  {
    entityId: "teeth",
    slug: "teeth-falling-out-islam",
    title: "Teeth Falling Out Dream Meaning in Islam",
    publishedAt: "2026-08-05",
    metaDescription:
      "Teeth dreams are among the most searched topics. Islamic readings vary by which teeth and what happens. Explore meanings through classical dream traditions. Not predictions."
  },
  {
    entityId: "water",
    slug: "water-dream-islam",
    title: "Water Dream Meaning in Islam",
    publishedAt: "2026-08-05",
    metaDescription:
      "Water appears in dreams more than almost any element. Islamic readings change with its state and action. Explore meanings through classical dream traditions. Not predictions."
  },
  {
    entityId: "pregnancy",
    slug: "pregnancy-dream-islam",
    title: "Pregnancy Dream Meaning in Islam",
    publishedAt: "2026-08-05",
    metaDescription:
      "Pregnancy dreams often symbolize creation, anticipation or a developing stage of life. Explore meanings through classical dream traditions. Not predictions."
  },
  {
    entityId: "fire",
    slug: "fire-dream-islam",
    title: "Fire Dream Meaning in Islam",
    publishedAt: "2026-08-10",
    metaDescription:
      "Explore fire dream meaning in Islam through context, emotion, and careful reflection. Consider possible meanings without treating the dream as a prediction."
  },
  {
    entityId: "death",
    slug: "death-dream-islam",
    title: "Death Dream Meaning in Islam",
    publishedAt: "2026-08-10",
    metaDescription:
      "Explore death dream meaning in Islam through context, emotion, and careful reflection. A death dream is not proof that a real death or disaster will occur."
  },
  {
    entityId: "baby",
    slug: "baby-dream-islam",
    title: "Baby Dream Meaning in Islam",
    publishedAt: "2026-08-10",
    metaDescription:
      "Explore baby dream meaning in Islam through context, emotion, and personal reflection, including themes of care, responsibility, and new beginnings."
  },
  {
    entityId: "cat",
    slug: "cat-dream-islam",
    title: "Cat Dream Meaning in Islam",
    publishedAt: "2026-08-10",
    metaDescription:
      "Explore cat dream meaning in Islam through context, behavior, and emotion. Reflect on companionship, boundaries, and caution without fixed predictions."
  },
  {
    entityId: "dog",
    slug: "dog-dream-islam",
    title: "Dog Dream Meaning in Islam",
    publishedAt: "2026-08-10",
    metaDescription:
      "Explore dog dream meaning in Islam through context, behavior, and emotion. Reflect on fear, loyalty, boundaries, and daily experience without predictions."
  }
];

export const PAGE_BY_SLUG = new Map(ENABLED_PAGES.map((p) => [p.slug, p]));

export function sortDreamPagesByPublishedAt<T extends { page: PageConfig }>(
  pages: T[]
): T[] {
  return pages
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const dateOrder = b.item.page.publishedAt.localeCompare(a.item.page.publishedAt);
      return dateOrder || a.index - b.index;
    })
    .map(({ item }) => item);
}

export const dreamUrl = (slug: string) => `/dreams/${slug}`;
