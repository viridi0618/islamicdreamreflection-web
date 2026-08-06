import type { Metadata } from "next";
import Link from "next/link";
import { allGuides } from "@/lib/guides";
import { DREAM_ARTICLES } from "@/lib/dream-articles";
import { loadEnabledPages, categoryLabel } from "@/lib/data";
import { dreamCardSummary } from "@/lib/dream-summaries";
import { dreamUrl, SITE_NAME, SITE_URL } from "@/lib/site";

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

/**
 * Selected long-tail scenario guides shown on the landing page.
 * Kept explicit so the page stays curated — adding a cluster later means
 * adding its most-searched scenarios here, not dumping every article.
 */
const FEATURED_SCENARIOS = [
  "snake-bite-dream-islam",
  "black-snake-dream-islam",
  "killing-snake-dream-islam",
  "snake-in-house-dream-islam",
  "green-snake-dream-islam",
  "dead-person-talking-in-dream-islam",
  "dead-person-alive-again-dream-islam"
];

export default async function GuidesPage() {
  const guides = allGuides();
  const pages = loadEnabledPages();
  const featured = FEATURED_SCENARIOS.map((slug) => DREAM_ARTICLES[slug]).filter(
    Boolean
  );

  return (
    <article className="shell section">
      {/* Hero */}
      <div className="reading-container">
        <div className="section__head">
          <h1>Islamic Dream Guides</h1>
          <span className="rule" />
        </div>
        <p className="section__sub">
          Explore Islamic perspectives on dreams, traditional sources, and
          reflections on common dream experiences.
        </p>
      </div>

      {/* Foundational Knowledge */}
      <section className="section" id="foundational">
        <div className="wide-container">
          <div className="section__head">
            <h2>Foundational Knowledge</h2>
            <span className="rule" />
          </div>
          <div className="dream-grid">
            {guides.map((guide, i) => (
              <div
                key={guide.slug}
                className="dream-card"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <Link href={`/guides/${guide.slug}`}>
                  <div className="dream-card__top">
                    <span className="dream-card__cat">Foundational</span>
                  </div>
                  <h3>{guide.title}</h3>
                  <p>{guide.description}</p>
                  <span className="dream-card__link">Read the guide →</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Dream Symbols */}
      <section className="section" id="symbols">
        <div className="wide-container">
          <div className="section__head">
            <h2>Explore Common Dream Symbols</h2>
            <span className="rule" />
          </div>
          <p className="section__sub">
            Start with a symbol, then explore related meanings, contexts, and
            reflections.
          </p>
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
                    <div className="dream-card__top">
                      <span className="dream-card__cat">
                        {categoryLabel(entity.category)}
                      </span>
                    </div>
                    <h3>{page.title}</h3>
                    <p>{summary}</p>
                    <span className="dream-card__link">Explore this symbol →</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Dream Situations */}
      <section className="section" id="situations">
        <div className="wide-container">
          <div className="section__head">
            <h2>Popular Dream Situations</h2>
            <span className="rule" />
          </div>
          <p className="section__sub">
            When a dream leaves a specific image with you — a bite, a smile, a
            flood — a focused guide can help you reflect on it.
          </p>
          <div className="dream-grid">
            {featured.map((article, i) => (
              <div
                key={article.slug}
                className="dream-card"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <Link href={`/guides/${article.slug}`}>
                  <div className="dream-card__top">
                    <span className="dream-card__cat">Dream guide</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <span className="dream-card__link">Read the guide →</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start Reflection CTA */}
      <section className="section" id="reflection">
        <div className="wide-container">
          <div className="dream-cta" aria-labelledby="guides-cta-heading">
            <h2 id="guides-cta-heading">
              Have a dream you&apos;d like to reflect on?
            </h2>
            <p>
              Begin a private reflection through Islamic traditions and personal
              context.
            </p>
            <Link className="dream-cta__btn" href="/#reflection">
              Start a Reflection
            </Link>
            <p className="dream-cta__note">
              Saved reflections stay in this browser on this device.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
