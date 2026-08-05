import type { Metadata } from "next";
import Link from "next/link";
import { loadCategories, loadEnabledPages } from "@/lib/data";
import { RitualFlow } from "@/components/RitualFlow";
import { HOME_FAQ_PREVIEW } from "@/lib/faq";
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

const HOW_IT_WORKS = [
  {
    title: "Describe your dream",
    body: "Give your dream a name, write what you remember, and add any optional context that feels meaningful."
  },
  {
    title: "Explore traditional perspectives",
    body: "We identify key symbols and present related perspectives from Islamic dream traditions."
  },
  {
    title: "Reflect, save, or share",
    body: "Receive a personal reflection and gentle guidance, then choose whether to save or share the moment."
  }
];

export default function HomePage() {
  const pages = loadEnabledPages();
  const categories = loadCategories();
  const categoryEntries = Object.entries(categories).filter(
    ([key]) => key !== "meta" && !key.startsWith("$")
  ) as Array<[string, string[]]>;

  return (
    <>
      <section className="hero hero--home" id="reflection">
        <div className="shell">
          <h1>Islamic Dream Interpretation &amp; Reflection</h1>
          <p className="hero__lead">
            Reflect on your dream through Islamic traditions.
          </p>
          <p className="hero__sub">
            Give your dream a name, describe what you remember, and add any
            context that feels meaningful.
          </p>
          <div className="hero__ritual">
            <RitualFlow entryPoint="home" compactHeader />
          </div>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="shell">
          <div className="section__head">
            <h2>How It Works</h2>
            <span className="rule" />
          </div>
          <div className="how-grid">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.title} className="how-card">
                <span className="how-card__num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="dreams">
        <div className="shell">
          <div className="section__head">
            <h2>Popular Dream Symbols</h2>
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
            <h2>Browse by Category</h2>
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

      <section className="section" id="common-questions">
        <div className="shell">
          <div className="section__head">
            <h2>Common Questions</h2>
            <span className="rule" />
          </div>
          <div className="faq">
            {HOME_FAQ_PREVIEW.map((faq) => (
              <details key={faq.id} className="faq__item">
                <summary>{faq.question}</summary>
                <div className="faq__body">{faq.answer}</div>
              </details>
            ))}
          </div>
          <p className="faq-view-all">
            <Link href="/faq">View all FAQs</Link>
          </p>
        </div>
      </section>
    </>
  );
}
