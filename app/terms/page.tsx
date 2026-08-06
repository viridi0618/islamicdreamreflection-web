import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for Islamic Dream Reflection.",
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: { index: true, follow: true }
};

export default function TermsPage() {
  return (
    <article className="shell section">
      <div className="reading-container">
        <div className="section__head">
          <h1>Terms of Use</h1>
          <span className="rule" />
        </div>

        <div className="prose">
        <p>Last updated: August 5, 2026</p>

        <h2>Educational use only</h2>
        <p>
          Islamic Dream Reflection provides educational content about dream
          interpretation traditions. The site is for reflection, study and
          learning. It is not a substitute for religious, medical, legal or
          psychological advice, and it does not issue religious rulings
          (fatwas) or predict future events.
        </p>

        <h2>Traditional interpretations, not verdicts</h2>
        <p>
          Dream symbol explanations on this site represent historical and
          traditional perspectives. They are not presented as definitive
          meanings for any individual dream.
        </p>

        <h2>No accounts, no warranties</h2>
        <p>
          The site does not require accounts. Content is provided
          &quot;as is&quot; without warranties of any kind. While we work to
          keep the knowledge base accurate, interpretations may contain errors
          or reflect disputed historical attributions.
        </p>

        <h2>Your use of the tool</h2>
        <p>
          You are responsible for how you apply what you read here. The
          reflection tool is a study aid; decisions you make in your life
          remain your own responsibility.
        </p>

        <h2>Contact</h2>
        <p>
          For questions about these terms, contact us at{" "}
          <a href="mailto:contact@islamicdreamreflection.com">
            contact@islamicdreamreflection.com
          </a>
          .
        </p>
        </div>
      </div>
    </article>
  );
}
