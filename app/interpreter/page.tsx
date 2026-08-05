import type { Metadata } from "next";
import { RitualFlow } from "@/components/RitualFlow";
import { SITE_URL } from "@/lib/site";

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
    siteName: "Islamic Dream Knowledge Base",
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Islamic Dream Interpretation AI",
    url: `${SITE_URL}/interpreter`,
    applicationCategory: "LifestyleApplication",
    description:
      "Describe a dream and receive a structured reflection grounded in an Islamic dream knowledge base.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };

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
        <p className="interp-hero__disclaimer">
          Dream interpretations are not predictions or religious rulings. They
          are reflections based on available traditions and symbolic patterns.
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
        <p className="interp-how__note">
          Every reference shown is marked <em>pending verification</em> until a
          human editor confirms the source. Nothing here is generated free-form.
        </p>
      </section>
    </article>
  );
}
