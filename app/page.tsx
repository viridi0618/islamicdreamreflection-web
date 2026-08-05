import type { Metadata } from "next";
import Link from "next/link";
import { loadEnabledPages } from "@/lib/data";
import { RitualFlow } from "@/components/RitualFlow";
import { HOME_FAQ_PREVIEW } from "@/lib/faq";
import { dreamUrl, SITE_NAME, SITE_URL } from "@/lib/site";
import { dreamCardSummary } from "@/lib/dream-summaries";
import { verifiedSource } from "@/lib/sources";
import {
  PrivacyLink,
  MyDreamsCta,
  MethodologyLink,
  DreamTypesLink,
  QuoteSourceLink,
  HomeFaq
} from "@/components/HomeTracking";
import {
  HERO_TRUST_POINTS,
  HERO_COPY,
  SAVE_CONTROL,
  ISLAMIC_APPROACH,
  DREAM_TYPES,
  HOME_QUOTE,
  QUOTE_SOURCE_ID,
  HOW_IT_WORKS,
  DREAM_GUIDES
} from "@/lib/home";

export const metadata: Metadata = {
  title: "Islamic Dream Interpretation & Reflection",
  description:
    "Explore your dream through Islamic traditions, personal context, and source-transparent reflection. Begin without an account and save only if useful.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Islamic Dream Interpretation & Reflection",
    description:
      "Explore your dream through Islamic traditions, personal context, and source-transparent reflection. Begin without an account and save only if useful.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Islamic Dream Interpretation & Reflection",
    description:
      "Explore your dream through Islamic traditions, personal context, and source-transparent reflection. Begin without an account and save only if useful."
  }
};

export default function HomePage() {
  const pages = loadEnabledPages();
  const quoteSource = verifiedSource(QUOTE_SOURCE_ID);

  return (
    <>
      <section className="hero hero--home" id="reflection">
        <div className="shell">
          <span className="hero__eyebrow">{HERO_COPY.eyebrow}</span>
          <h1>
            {HERO_COPY.h1Top} <em>{HERO_COPY.h1Em}</em>
          </h1>
          <p className="hero__lead">{HERO_COPY.lead}</p>

          <ul className="hero-trust" aria-label="Why you can trust this reflection">
            {HERO_TRUST_POINTS.map((point) => (
              <li key={point}>
                <span className="hero-trust__mark" aria-hidden="true">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="hero__ritual">
            <RitualFlow entryPoint="home" compactHeader />
            <p className="hero-privacy">
              {HERO_COPY.privacyNote}{" "}
              <PrivacyLink
                href={HERO_COPY.privacyHref}
                label={HERO_COPY.privacyLinkLabel}
              />
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="save-and-privacy">
        <div className="shell">
          <div className="section__head">
            <h2>{SAVE_CONTROL.title}</h2>
            <span className="rule" />
          </div>
          <p className="save-control__body">{SAVE_CONTROL.body}</p>
          <div className="save-control__grid">
            {SAVE_CONTROL.steps.map((step) => (
              <div key={step.title} className="save-control__item">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
          <MyDreamsCta
            ctaHref={SAVE_CONTROL.ctaHref}
            ctaLabel={SAVE_CONTROL.ctaLabel}
            secondaryHref={SAVE_CONTROL.secondaryHref}
            secondaryLabel={SAVE_CONTROL.secondaryLabel}
          />
        </div>
      </section>

      <section className="section" id="islamic-approach">
        <div className="shell">
          <div className="section__head">
            <h2>{ISLAMIC_APPROACH.title}</h2>
            <span className="rule" />
          </div>
          <div className="approach-grid">
            {ISLAMIC_APPROACH.points.map((point) => (
              <div key={point.title} className="approach-card">
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </div>
            ))}
          </div>
          <p className="approach-link">
            <MethodologyLink
              href={ISLAMIC_APPROACH.linkHref}
              label={ISLAMIC_APPROACH.linkLabel}
            />
          </p>
        </div>
      </section>

      <section className="section" id="dream-types">
        <div className="shell">
          <div className="section__head">
            <h2>{DREAM_TYPES.title}</h2>
            <span className="rule" />
          </div>
          <p className="dream-types__intro">{DREAM_TYPES.intro}</p>
          <div className="dream-types__grid">
            {DREAM_TYPES.cards.map((card) => (
              <div key={card.title} className="dream-type-card">
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
          <p className="dream-types__link">
            <DreamTypesLink
              href={DREAM_TYPES.linkHref}
              label={DREAM_TYPES.linkLabel}
            />
          </p>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="shell">
          <div className="section__head">
            <h2>How the Reflection Works</h2>
            <span className="rule" />
          </div>
          <div className="how-editorial">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.title} className="how-editorial__step">
                <span className="how-editorial__num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="dreams">
        <div className="shell">
          <div className="section__head">
            <h2>{DREAM_GUIDES.title}</h2>
            <span className="rule" />
          </div>
          <p className="section__sub">{DREAM_GUIDES.subtitle}</p>
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
                  <div className="dream-card__top">
                    <span className="dream-card__cat">{entity.category}</span>
                  </div>
                  <Link href={dreamUrl(page.slug)}>
                    <h3>{page.title}</h3>
                    <p>{summary}</p>
                    <span className="dream-card__link">
                      {DREAM_GUIDES.cardLinkLabel} →
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {quoteSource && (
        <section className="section" id="quote">
          <div className="shell">
            <div className="quote-block">
              <p
                className="quote-block__arabic"
                lang={HOME_QUOTE.arabicLang}
                dir="rtl"
              >
                {HOME_QUOTE.arabic}
              </p>
              <p className="quote-block__translation">
                {HOME_QUOTE.translation}
              </p>
              <p className="quote-block__attribution">
                {HOME_QUOTE.attributionNote} · {quoteSource.reference}{" "}
                {quoteSource.url && (
                  <QuoteSourceLink
                    href={quoteSource.url}
                    label={HOME_QUOTE.sourceLabel}
                  />
                )}
              </p>
              <p className="quote-block__supports">
                <b>{HOME_QUOTE.supportsLabel}:</b> {quoteSource.supports}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="section" id="common-questions">
        <div className="shell">
          <div className="section__head">
            <h2>Common Questions</h2>
            <span className="rule" />
          </div>
          <HomeFaq faqs={HOME_FAQ_PREVIEW} />
          <p className="faq-view-all">
            <Link href="/faq">View all questions →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
