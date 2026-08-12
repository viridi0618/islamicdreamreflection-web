import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { publicSources } from "@/data/sources";

export const metadata: Metadata = {
  title: "Islamic Dream Interpretation Methodology — Sources, Context & Limits",
  description:
    "How Islamic Dream Reflection approaches dream interpretation through Qur'an and Hadith, context, source verification, personal reflection, and clear limits.",
  alternates: { canonical: `${SITE_URL}/sources-methodology` },
  robots: { index: true, follow: true }
};

export default function SourcesMethodologyPage() {
  // Public registry listing; the methodology page itself is never listed as
  // one of its own sources (type "methodology" is excluded).
  const sources = publicSources().filter((s) => s.type !== "methodology");

  return (
    <article className="shell section">
      <div className="reading-container">
        <div className="section__head">
          <h1>Islamic Dream Interpretation Methodology</h1>
          <span className="rule" />
        </div>

        <div className="quick-answer foundation-guide__quick-answer">
          <p>
            Islamic Dream Reflection does not treat every dream as a prediction
            or every symbol as having one fixed meaning. The method separates
            source-backed Islamic guidance, later interpretive traditions,
            personal context, and editorial reflection, while keeping certainty
            within clear limits.
          </p>
        </div>

        <div className="prose">
          <p>
            A careful Islamic approach to dreams begins with humility. The
            Qur&apos;an records dreams and visions with real significance, and Hadith
            describe different kinds of dreams and how a believer may respond to
            them. At the same time, ordinary dreams are not a private scripture,
            a fatwa, or a guaranteed disclosure of the unseen.
          </p>
          <p>
            This page explains both the Islamic method behind the site and the
            editorial process used before a source appears publicly. It is meant
            to help readers see what is source-backed, what is traditional but
            attribution-sensitive, and what is offered only as personal
            reflection.
          </p>

          <section id="how-we-approach-a-dream">
            <h2>How We Approach a Dream</h2>
            <div className="foundation-guide__items">
              <article className="foundation-guide__item">
                <h3>1. Consider what kind of dream it may be</h3>
                <p>
                  The first question is not, &quot;What does this symbol mean?&quot; It is
                  whether the dream seems good, disturbing, or shaped by the
                  dreamer&apos;s own thoughts. The guide to{" "}
                  <Link href="/guides/three-types-of-dreams-in-islam">
                    the three types of dreams described in Islamic tradition
                  </Link>{" "}
                  explains this starting point in more detail.
                </p>
              </article>

              <article className="foundation-guide__item">
                <h3>2. Separate sources from reflection</h3>
                <p>
                  Qur&apos;an and Hadith references support only the claims they
                  actually state. A Hadith about disliked-dream etiquette, for
                  example, can support seeking refuge in Allah after a frightening
                  dream; it cannot be used to invent a fixed meaning for a cat,
                  fire, water, or any other symbol.
                </p>
              </article>

              <article className="foundation-guide__item">
                <h3>3. Read the whole dream, not one symbol</h3>
                <p>
                  The same symbol can feel different depending on what happened,
                  where it appeared, who was present, and whether the dreamer felt
                  fear, peace, confusion, relief, or responsibility. A page may
                  explore a symbol, but the symbol alone should not overrule the
                  full dream.
                </p>
              </article>

              <article className="foundation-guide__item">
                <h3>4. Consider emotion and personal context</h3>
                <p>
                  A dream can be shaped by recent worries, conversations,
                  responsibilities, grief, hope, or daily experience. This layer
                  is personal reflection, not a religious ruling. It can help a
                  person think more clearly without claiming certainty.
                </p>
              </article>

              <article className="foundation-guide__item">
                <h3>5. Keep certainty within limits</h3>
                <p>
                  The site avoids prophecy claims, unseen claims, and statements
                  that Allah is announcing a specific judgment through an
                  ordinary dream. Where the evidence is general, the language
                  remains general.
                </p>
              </article>
            </div>
          </section>

          <section id="how-islamic-sources-are-used">
            <h2>How Islamic Sources Are Used</h2>
            <div className="foundation-guide__items">
              <article className="foundation-guide__item">
                <h3>Qur&apos;an</h3>
                <p>
                  The Qur&apos;an records meaningful dreams and visions, especially in
                  the story of Yusuf and in the prophetic vision of Ibrahim. Those
                  accounts show that dreams can matter and that interpretation
                  exists within Islamic sources. They do not create a universal
                  symbol dictionary for ordinary dreams. See{" "}
                  <Link href="/guides/dreams-in-the-quran">
                    Dreams in the Qur&apos;an
                  </Link>{" "}
                  for the fuller discussion.
                </p>
              </article>

              <article className="foundation-guide__item">
                <h3>Hadith</h3>
                <p>
                  Hadith are used for dream categories, the response to good and
                  disturbing dreams, and the limits of treating dreams as
                  certainty. A Hadith source is placed near the claim it supports
                  rather than used as decorative authority for unrelated symbolic
                  readings.
                </p>
              </article>

              <article className="foundation-guide__item">
                <h3>Classical traditions</h3>
                <p>
                  Later interpretive traditions exist, but attribution can be
                  disputed. The site does not attribute exact wording to Ibn
                  Sirin unless a specific attribution has been verified. Pending
                  material stays internal and is not surfaced as public
                  authority.
                </p>
              </article>
            </div>
          </section>

          <section id="context-symbols-reflection">
            <h2>Context, Symbols, and Personal Reflection</h2>
            <p>
              A person may search for a snake dream, water dream, fire dream, or
              death dream because one image stayed with them after waking. That
              image matters, but it is only one part of the dream. What happened
              before and after it, the location, the people involved, the
              dreamer&apos;s emotion, and recent life circumstances can all change how
              the dream is reflected upon.
            </p>
            <p>
              This is why the site uses careful phrases such as &quot;may reflect,&quot;
              &quot;can prompt reflection on,&quot; and &quot;consider whether.&quot; Personal
              reflection can be useful, but it is not the same as a fatwa,
              religious obligation, or fixed Islamic meaning.
            </p>
          </section>

          <section id="limits">
            <h2>What Dream Interpretation Cannot Establish</h2>
            <p>
              Dream interpretation has limits. A dream page or private reflection
              should not be used to establish matters that belong to Allah&apos;s
              knowledge, qualified scholarship, or ordinary evidence.
            </p>
            <ul className="not-prove-list">
              <li>Knowledge of the future</li>
              <li>Knowledge of the unseen</li>
              <li>That another person is an enemy</li>
              <li>That jinn or sihr is involved</li>
              <li>Allah&apos;s judgment on the dreamer</li>
              <li>Religious obligations or a fatwa</li>
              <li>A guaranteed meaning for a symbol</li>
            </ul>
          </section>

          <section id="ai-editorial-review">
            <h2>How AI and Editorial Review Are Used</h2>
            <p>
              AI can help identify symbols, organize context, and assist with
              reflective language. It cannot create religious authority,
              fabricate source claims, turn uncertain sources into facts, or
              issue rulings. The source registry and editorial review determine
              whether a reference appears publicly.
            </p>
            <p>
              When a frightening dream is involved, the site keeps verified
              Hadith guidance close to the practical response, such as the guide
              on{" "}
              <Link href="/guides/what-to-do-after-a-bad-dream">
                what to do after a bad dream in Islam
              </Link>
              .
            </p>
          </section>

          <section id="sources-verification">
            <h2>Sources and Verification</h2>
            <p>
              A public source should show its reference, type, and what it
              supports. The goal is not to dump a bibliography at the bottom of a
              page, but to make clear why a source appears and what claim it can
              responsibly support.
            </p>
            <p>
              If you believe a quotation, attribution, or interpretation is
              inaccurate, please <Link href="/contact">contact us</Link>.
              Corrections are reviewed and pages are updated as the source
              registry is checked.
            </p>
          </section>
        </div>
      </div>

      <section className="section" aria-labelledby="public-sources">
        <div className="wide-container">
          <div className="section__head">
            <h2 id="public-sources">Public Source Registry</h2>
            <span className="rule" />
          </div>
          <div className="source-list">
            {sources.map((s) => (
              <article key={s.id} className="source-item">
                <h3>{s.title}</h3>
                <p className="source-item__ref">
                  {s.reference}
                  {s.url && (
                    <>
                      {" | "}
                      <a href={s.url} target="_blank" rel="noopener noreferrer">
                        Read original
                      </a>
                    </>
                  )}
                </p>
                <p className="source-item__supports">
                  <b>Supports:</b> {s.supports}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
