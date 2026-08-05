import type { MetadataRoute } from "next";
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
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/interpreter`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...dreams
  ];
}
