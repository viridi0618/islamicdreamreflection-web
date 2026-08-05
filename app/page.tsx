import type { Metadata } from "next";
import Link from "next/link";
import { loadCategories, loadEnabledPages } from "@/lib/data";
import { dreamUrl, SITE_URL } from "@/lib/site";

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
    siteName: "Islamic Dream Knowledge Base",
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
      <section className="hero">
        <div className="shell">
          <span className="hero__eyebrow">Knowledge base · Phase 2</span>
          <h1>Islamic Dream Interpretation</h1>
          <p className="hero__lead">
            A growing reference of dream symbols as recorded in the Islamic
            tradition — organized from the knowledge base, not invented.
          </p>
          <div className="hero__note">
            What you read here is a collection of traditional interpretations,
            not a prediction of your future. Classical references are shown as{" "}
            <em>pending verification</em> until a human editor reviews the
            source.
          </div>
          <div className="hero__cta">
            <Link href="/interpreter" className="hero__cta-btn">
              Try the AI Dream Interpreter
            </Link>
            <Link href="/#dreams" className="hero__cta-secondary">
              Browse dream pages
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="dreams">
        <div className="shell">
          <div className="section__head">
            <h2>Dream pages</h2>
            <span className="rule" />
            <span className="section__sub">{pages.length} validation pages</span>
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
                  <span className="dream-card__vol">
                    {entity.volumeClass === "high" ? "High demand" : "Search demand"}
                  </span>
                </div>
                <h3>{page.title}</h3>
                <p>
                  {(entity.interpretation.general?.[0] ?? "").slice(0, 120)}…
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
              {categoryEntries.length} categories · themes from the taxonomy
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
          <p style={{ textAlign: "center", color: "var(--ink-faint)", fontSize: 14 }}>
            Category landing pages ship after validation of the first dream pages.
          </p>
        </div>
      </section>
    </>
  );
}
