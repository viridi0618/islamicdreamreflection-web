import type { Metadata } from "next";
import Link from "next/link";
import { allGuides } from "@/lib/guides";
import { allDreamArticles } from "@/lib/dream-articles";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { DreamReflectionCta } from "@/components/DreamReflectionCta";

export const metadata: Metadata = {
  title: "Islamic Dream Guides",
  description:
    "Explore detailed guides about common dreams, symbols, and reflections through Islamic traditions. From dream categories to specific symbol meanings.",
  alternates: { canonical: `${SITE_URL}/guides` },
  openGraph: {
    title: "Islamic Dream Guides",
    description:
      "Explore detailed guides about common dreams, symbols, and reflections through Islamic traditions.",
    url: `${SITE_URL}/guides`,
    siteName: SITE_NAME,
    type: "website"
  }
};

export default async function GuidesPage() {
  const guides = allGuides();
  const articles = allDreamArticles();

  // Group long-tail articles by their hub symbol for clear browsing.
  const clusters = articles.reduce<
    Array<{ hubLabel: string; hubHref: string; items: typeof articles }>
  >((acc, article) => {
    const existing = acc.find((c) => c.hubHref === article.hubSymbol.href);
    if (existing) {
      existing.items.push(article);
    } else {
      acc.push({
        hubLabel: article.hubSymbol.label,
        hubHref: article.hubSymbol.href,
        items: [article]
      });
    }
    return acc;
  }, []);

  return (
    <article className="shell section">
      <div className="reading-container">
        <div className="section__head">
          <h1>Islamic Dream Guides</h1>
          <span className="rule" />
        </div>
        <p className="section__sub">
          Explore detailed guides about common dreams, symbols, and reflections
          through Islamic traditions and personal context.
        </p>
      </div>

      {/* Foundation guides */}
      <section className="section" id="foundation">
        <div className="wide-container">
          <div className="section__head">
            <h2>Foundational Guides</h2>
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
                    <span className="dream-card__cat">Guide</span>
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

      {/* Long-tail article clusters */}
      {clusters.map((cluster) => (
        <section key={cluster.hubHref} className="section" id={`cluster-${cluster.hubHref}`}>
          <div className="wide-container">
            <div className="section__head">
              <h2>{cluster.hubLabel}</h2>
              <span className="rule" />
            </div>
            <div className="dream-grid">
              {cluster.items.map((article, i) => (
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
      ))}

      {/* Back to symbols */}
      <section className="section" id="explore-symbols">
        <div className="wide-container">
          <div className="section__head">
            <h2>Explore Dream Symbols</h2>
            <span className="rule" />
          </div>
          <div className="prose">
            <p>
              Start from a symbol — snake, water, teeth, or another common
              dream image — and explore its meanings through the traditions.
            </p>
          </div>
          <p className="section__link">
            <Link href="/dreams">Explore Dreams →</Link>
          </p>
        </div>
      </section>

      {/* Try reflection */}
      <section className="section">
        <div className="wide-container">
          <DreamReflectionCta entityId="snake" />
        </div>
      </section>
    </article>
  );
}
