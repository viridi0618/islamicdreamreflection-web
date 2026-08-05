import type { Metadata } from "next";
import Link from "next/link";
import { loadCategories, loadEnabledPages } from "@/lib/data";
import { RitualFlow } from "@/components/RitualFlow";
import { dreamUrl, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Islamic Dream Interpretation — Traditional Meanings & Sources",
  description:
    "Snake, water, teeth, dead person and pregnancy dreams explained the traditional Islamic way, drawing from classical dream traditions. Not predictions.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Islamic Dream Interpretation — Traditional Meanings & Sources",
    description:
      "Snake, water, teeth, dead person and pregnancy dreams explained the traditional Islamic way, drawing from classical dream traditions. Not predictions.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Islamic Dream Interpretation — Traditional Meanings & Sources",
    description:
      "Snake, water, teeth, dead person and pregnancy dreams explained the traditional Islamic way, drawing from classical dream traditions. Not predictions."
  }
};

export default function HomePage() {
  const pages = loadEnabledPages();
  const categories = loadCategories();
  const categoryEntries = Object.entries(categories).filter(
    ([key]) => key !== "meta" && !key.startsWith("$")
  ) as Array<[string, string[]]>;

  return (
    <>
      <section className="hero hero--home">
        <div className="shell">
          <h1>Islamic Dream Interpretation &amp; Reflection</h1>
          <p className="hero__lead">
            Reflect on your dream through Islamic traditions.
          </p>
          <p className="hero__sub">
            Describe what you remember and receive a gentle, personal
            reflection.
          </p>
          <div className="hero__ritual">
            <RitualFlow entryPoint="home" />
          </div>
          <p className="hero__browse">
            <Link href="/#dreams">Browse dream pages</Link>
          </p>
        </div>
      </section>

      <section className="section" id="dreams">
        <div className="shell">
          <div className="section__head">
            <h2>Dream pages</h2>
            <span className="rule" />
            <span className="section__sub">{pages.length} symbols</span>
          </div>
          <div className="dream-grid">
            {pages.map(({ page, entity }, i) => (
              <Link
                key={page.slug}
                href={dreamUrl(page.slug)}
                className="dream-card"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="dream-card__top">
                  <span className="dream-card__cat">{entity.category}</span>
                </div>
                <h3>{page.title}</h3>
                <p>
                  {(
                    entity.traditional_notes?.[1] ??
                    entity.interpretation.general?.[0] ??
                    ""
                  ).slice(0, 120)}…
                </p>
                <span className="dream-card__link">Read interpretation →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="categories">
        <div className="shell">
          <div className="section__head">
            <h2>Browse by category</h2>
            <span className="rule" />
            <span className="section__sub">
              {categoryEntries.length} categories · common dream themes
            </span>
          </div>
          <div className="cat-strip">
            {categoryEntries.map(([category, themes]) => (
              <span key={category} className="cat-chip">
                <b>{category}</b>
                <span>{themes.length} themes</span>
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
