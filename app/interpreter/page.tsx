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
      </section>

      <RitualFlow initialSymbol={initialSymbol} />
    </article>
  );
}
