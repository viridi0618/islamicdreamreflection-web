import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Islamic Dream Reflection for feedback, questions, or content correction requests.",
  alternates: { canonical: `${SITE_URL}/contact` },
  robots: { index: true, follow: true }
};

export default function ContactPage() {
  return (
    <article className="shell section">
      <div className="reading-container">
        <div className="section__head">
          <h1>Contact</h1>
          <span className="rule" />
        </div>

        <div className="prose">
        <p>
          We welcome feedback, questions, and correction requests. Because the
          site presents historical interpretations, accuracy matters to us —
          if you believe a traditional reference or attribution is wrong,
          please let us know.
        </p>

        <h2>Email</h2>
        <p>
          <a href="mailto:contact@islamicdreamreflection.com">
            contact@islamicdreamreflection.com
          </a>
        </p>

        <h2>What to include</h2>
        <ul>
          <li>
            <b>Feedback</b> — how the site and reflection tool can be improved.
          </li>
          <li>
            <b>Content corrections</b> — the page URL and the source or
            reference you believe needs review.
          </li>
          <li>
            <b>Source suggestions</b> — classical or scholarly works you think
            should be considered in future updates.
          </li>
        </ul>

        <p>
          We review every message as part of our editorial process, but cannot
          guarantee a personal reply to each one.
        </p>
        </div>
      </div>
    </article>
  );
}
