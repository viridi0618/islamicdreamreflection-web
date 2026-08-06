import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { publicSources } from "@/data/sources";

export const metadata: Metadata = {
  title: "Sources and Methodology — Islamic Dream Reflection",
  description:
    "How Islamic Dream Reflection uses Qur’an and Hadith, handles classical attribution, uses AI, and decides which sources appear on public pages.",
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
          <h1>Sources and Methodology</h1>
          <span className="rule" />
        </div>

        <div className="prose">
          <h2 id="quran-hadith">How Qur&apos;an and Hadith are used</h2>
          <p>
            Qur&apos;an and Hadith references on this site support general points
            about dreams: that dreams can carry meaning, that dreams are of
            different types, and that disturbing dreams have a recommended
            etiquette. They are not used to manufacture a fixed meaning for
            every dream symbol. A verse or hadith is shown only next to the
            point it actually supports.
          </p>

          <h2 id="classical-attribution">How classical attribution is handled</h2>
          <p>
            Many medieval dream manuals are attributed to classical figures such
            as Ibn Sirin, but those attributions are often disputed and the
            surviving texts are later compilations. This site does not present
            general traditional readings as the exact words of a specific
            scholar unless the attribution is supported by the source data and
            the source has been checked. When a tradition name is shown, it is
            shown as a tradition, not as a verified personal quotation.
          </p>

          <h2 id="ai-participation">How AI participates</h2>
          <p>
            AI is used to identify symbols in a dream description, organize
            content, and help draft reflective expressions. AI is not a
            religious scholar, does not provide religious rulings, and is
            instructed not to invent classical sources. Editorial review and the
            source registry are what determine whether a reference appears on a
            page.
          </p>

          <h2 id="editorial-reflection">What counts as editorial reflection</h2>
          <p>
            Sections marked as personal reflection or practical guidance are the
            site&apos;s own educational content. They are clearly separated from
            directly referenced Qur&apos;an and Hadith material and from later
            interpretive traditions. Nothing in these sections is presented as a
            religious ruling or a prediction.
          </p>

          <h2 id="when-sources-are-not-shown">When sources are not shown publicly</h2>
          <p>
            A source appears on a public page only after it has been reviewed or
            verified. Pending material stays internal to the editorial process.
            If a page has no public source for a point, the point is written as
            editorial reflection rather than padded with unverified references.
          </p>

          <h2 id="corrections">How to report an error</h2>
          <p>
            If you believe a quotation, attribution or interpretation on this
            site is inaccurate, please{" "}
            <Link href="/contact">contact us</Link>. Corrections are reviewed
            and pages are updated as the source registry is checked.
          </p>

          <h2 id="why-not-all-ibn-sirin">Why not everything is attributed to Ibn Sirin</h2>
          <p>
            A large share of popular dream content is routinely attributed to
            Ibn Sirin without evidence. Because the historical record is more
            complicated, this site attributes a statement to a classical figure
            only when the source registry supports it. Where the tradition is
            real but the specific attribution is unclear, the site says so
            instead of guessing.
          </p>
        </div>
      </div>

      <section className="section" aria-labelledby="public-sources">
        <div className="wide-container">
          <div className="section__head">
            <h2 id="public-sources">Public source registry</h2>
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
                      {" · "}
                      <a href={s.url} target="_blank" rel="noopener noreferrer">
                        Read original →
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
