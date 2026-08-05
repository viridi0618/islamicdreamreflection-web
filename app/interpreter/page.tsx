import type { Metadata } from "next";
import { RitualFlow } from "@/components/RitualFlow";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Islamic Dream Interpreter — AI Dream Meaning Analysis",
  description:
    "Explore your dream's symbols, emotions and Islamic traditions with a guided reflection. Grounded in the knowledge base, not predictions.",
  alternates: { canonical: `${SITE_URL}/interpreter` },
  openGraph: {
    title: "Islamic Dream Interpreter — AI Dream Meaning Analysis",
    description:
      "Explore your dream's symbols, emotions and Islamic traditions with a guided reflection. Grounded in the knowledge base, not predictions.",
    url: `${SITE_URL}/interpreter`,
    siteName: SITE_NAME,
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Islamic Dream Interpreter — AI Dream Meaning Analysis",
    description:
      "Explore your dream's symbols, emotions and Islamic traditions with a guided reflection. Grounded in the knowledge base, not predictions."
  }
};

export default async function InterpreterPage({
  searchParams
}: {
  searchParams: Promise<{ symbol?: string }>;
}) {
  const { symbol } = await searchParams;

  // Only pass through a known symbol; the client validates it against
  // the enabled pages before auto-running.
  const knownSymbols = ["snake", "dead-person", "teeth", "water", "pregnancy"];
  const initialSymbol = symbol && knownSymbols.includes(symbol) ? symbol : undefined;

  const faqs = [
    {
      question: "Is Islamic dream reflection a prediction or religious ruling?",
      answer:
        "No. The reflections are educational perspectives intended to support personal reflection. They do not predict future events or provide fatwas."
    }
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Islamic Dream Interpretation AI",
      url: `${SITE_URL}/interpreter`,
      applicationCategory: "LifestyleApplication",
      description:
        "Describe a dream and receive a structured reflection grounded in an Islamic dream knowledge base.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer }
      }))
    }
  ];

  return (
    <article className="shell interp-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="interp-hero ritual-hero">
        <h1>Begin Your Islamic Dream Reflection</h1>
        <p className="interp-hero__sub">
          Describe your dream, explore its symbols through Islamic traditions,
          and receive a gentle personal reflection.
        </p>
      </section>

      <RitualFlow initialSymbol={initialSymbol} />

      <section className="interp-how" aria-labelledby="how-heading">
        <h2 id="how-heading">How it works</h2>
        <ol className="interp-how__list">
          <li>
            <b>Share your dream</b> — give it a name (optional) and describe it
            in your own words.
          </li>
          <li>
            <b>Add optional context</b> — quick choices about the part of life
            that feels connected and how the dream felt. All optional.
          </li>
          <li>
            <b>Receive your reflection</b> — symbol summary, traditional
            perspective, a personal reflection, and gentle guidance, with links
            to the full knowledge pages.
          </li>
          <li>
            <b>Save or share</b> — keep this moment in your dream space, or
            share a reflection card that never reveals your dream text.
          </li>
        </ol>
        <p style={{ fontSize: 13, color: "var(--ink-faint)" }}>
          Last updated: August 5, 2026
        </p>
      </section>

      <section className="section" aria-labelledby="interp-faq-heading">
        <div className="section__head">
          <h2 id="interp-faq-heading">Frequently asked questions</h2>
          <span className="rule" />
        </div>
        <div className="faq">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq__item">
              <summary>{faq.question}</summary>
              <div className="faq__body">{faq.answer}</div>
            </details>
          ))}
        </div>
      </section>
    </article>
  );
}
