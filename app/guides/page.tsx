import type { Metadata } from "next";
import Link from "next/link";
import { loadEnabledPages, categoryLabel } from "@/lib/data";
import { dreamCardSummary } from "@/lib/dream-summaries";
import { dreamUrl, SITE_NAME, SITE_URL, sortDreamPagesByPublishedAt } from "@/lib/site";
import { SymbolArtwork } from "@/components/SymbolArtwork";

export const metadata: Metadata = {
  title: "Islamic Dream Guides",
  description:
    "Explore Islamic perspectives on dreams, traditional sources, and reflections on common dream experiences.",
  alternates: { canonical: `${SITE_URL}/guides` },
  openGraph: {
    title: "Islamic Dream Guides",
    description:
      "Explore Islamic perspectives on dreams, traditional sources, and reflections on common dream experiences.",
    url: `${SITE_URL}/guides`,
    siteName: SITE_NAME,
    type: "website"
  }
};

export default async function GuidesPage() {
  const pages = sortDreamPagesByPublishedAt(loadEnabledPages());

  return (
    <article className="shell section">
      <div className="reading-container">
        <div className="section__head">
          <h1>Islamic Dream Guides</h1>
          <span className="rule" />
        </div>
        <p className="section__sub">
          Explore Islamic perspectives on dreams, traditional sources, and
          reflections on common dream experiences.
        </p>

        <nav className="guide-foundations" aria-labelledby="guide-foundations-title">
          <p id="guide-foundations-title" className="guide-foundations__title">
            Start with the foundations
          </p>
          <div className="guide-foundations__links">
            <Link href="/guides/three-types-of-dreams-in-islam">
              The Three Types of Dreams in Islam &rarr;
            </Link>
            <Link href="/guides/dreams-in-the-quran">
              Dreams in the Qur&apos;an &rarr;
            </Link>
            <Link href="/guides/what-to-do-after-a-bad-dream">
              What to Do After a Bad Dream &rarr;
            </Link>
            <Link href="/sources-methodology">
              Our Sources &amp; Methodology &rarr;
            </Link>
          </div>
        </nav>
      </div>

      <div className="wide-container">
        <div className="dream-grid">
          {pages.map(({ page, entity }, i) => {
            const summary =
              dreamCardSummary(entity.id) ??
              (entity.traditional_notes?.[1] ??
                entity.interpretation.general?.[0] ??
                "");
            return (
              <div
                key={page.slug}
                className="dream-card"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <Link href={dreamUrl(page.slug)}>
                  <SymbolArtwork entity={entity} className="dream-card__art" />
                  <div className="dream-card__top">
                    <span className="dream-card__cat">
                      {categoryLabel(entity.category)}
                    </span>
                  </div>
                  <h3>{page.title}</h3>
                  <p>{summary}</p>
                  <span className="dream-card__link">Read this dream guide &rarr;</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}
