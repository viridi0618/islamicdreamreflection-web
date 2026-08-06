import type { MetadataRoute } from "next";
import { allGuides } from "@/lib/guides";
import { allDreamArticles } from "@/lib/dream-articles";
import { SITE_URL } from "@/lib/site";

/**
 * Sitemap for Search Console submission. NEXT_PUBLIC_SITE_URL must be set at
 * build time to the real domain (see lib/site.ts).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const dreams = [
    { url: `${SITE_URL}/dreams/snake-dream-islam`, lastModified: new Date() },
    { url: `${SITE_URL}/dreams/dead-person-dream-islam`, lastModified: new Date() },
    { url: `${SITE_URL}/dreams/teeth-falling-out-islam`, lastModified: new Date() },
    { url: `${SITE_URL}/dreams/water-dream-islam`, lastModified: new Date() },
    { url: `${SITE_URL}/dreams/pregnancy-dream-islam`, lastModified: new Date() }
  ];
  const guides = [
    ...allGuides().map((g) => ({
      url: `${SITE_URL}/guides/${g.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6
    })),
    ...allDreamArticles().map((a) => ({
      url: `${SITE_URL}/guides/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6
    }))
  ];
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/interpreter`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...dreams,
    { url: `${SITE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/sources-methodology`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...guides,
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 }
  ];
}
