import type { Metadata } from "next";
import Link from "next/link";
import { loadEnabledPages } from "@/lib/data";
import { dreamCardSummary } from "@/lib/dream-summaries";
import { dreamUrl, SITE_NAME, SITE_URL } from "@/lib/site";
import { DreamReflectionCta } from "@/components/DreamReflectionCta";
import { SymbolArtwork } from "@/components/SymbolArtwork";

export const metadata: Metadata = {
  title: "Explore Islamic Dream Meanings",
  description:
    "Explore common dream symbols through Islamic traditions and personal reflection. Begin with a symbol, then consider the actions, emotions, and context that made the dream personal.",
  alternates: { canonical: `${SITE_URL}/dreams` },
  openGraph: {
    title: "Explore Islamic Dream Meanings",
    description:
      "Explore common dream symbols through Islamic traditions and personal reflection.",
    url: `${SITE_URL}/dreams`,
    siteName: SITE_NAME,
    type: "website"
  }
};

export default async function DreamsPage() {
  const pages = loadEnabledPages();

  return (
    <article className="shell section">
      <div className="reading-container">
        <div className="section__head">
          <h1>Explore Islamic Dream Meanings</h1>
          <span className="rule" />
        </div>
        <p className="section__sub">
          Explore common dream symbols through Islamic traditions and personal
          reflection. Dream meanings can vary depending on context, emotions,
          and personal experiences.
        </p>
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
                    <span className="dream-card__cat">{entity.category}</span>
                  </div>
                  <h3>{page.title}</h3>
                  <p>{summary}</p>
                  <span className="dream-card__link">Explore this dream →</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <section className="section" id="guides">
        <div className="wide-container">
          <div className="section__head">
            <h2>Continue Exploring</h2>
            <span className="rule" />
          </div>
          <div className="prose">
            <p>
              Beyond individual symbols, the Dream Guides explore broader
              questions — the three types of dreams in Islam, what to do after
              a bad dream, and how dreams appear in the Qur’an.
            </p>
          </div>
          <p className="section__link">
            <Link href="/guides">Browse Dream Guides →</Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wide-container">
          <DreamReflectionCta entityId="snake" />
        </div>
      </section>
    </article>
  );
}
