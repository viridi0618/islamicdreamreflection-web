import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "About Islamic Dream Reflection" },
  description:
    "Learn about Islamic Dream Reflection, an educational reflection platform grounded in Islamic traditions and classical scholarship. Educational use only.",
  alternates: { canonical: `${SITE_URL}/about` },
  robots: { index: true, follow: true }
};

export default function AboutPage() {
  return (
    <article className="shell section">
      <div className="reading-container">
        <div className="section__head">
          <h1>About Islamic Dream Reflection</h1>
          <span className="rule" />
        </div>

        <div className="prose">
        <h2 id="interpretation-guidance">About Our Interpretations</h2>
        <p>
          Islamic Dream Reflection presents educational perspectives inspired
          by traditional Islamic dream literature.
        </p>
        <p>
          Dream reflections are not predictions of future events, religious
          rulings, or substitutes for guidance from a qualified scholar.
        </p>
        <p>
          Symbols may carry different meanings depending on personal
          circumstances, emotions, and context. The reflections provided here
          are intended to support thoughtful personal reflection rather than
          provide certain conclusions.
        </p>

        <p>
          Islamic Dream Reflection is an educational platform that explores
          dreams through the lens of Islamic traditions and classical writings.
          Our goal is not to provide religious rulings or certainty about
          unseen matters, but to encourage thoughtful personal reflection.
        </p>

        <p>
          Dreams have a long and careful place in Islamic culture. Classical
          scholars compiled observations about dream symbols over centuries,
          and these writings remain a rich source of cultural and spiritual
          insight. This site presents those perspectives as{" "}
          <em>historical and traditional viewpoints</em>, not as authoritative
          verdicts about any individual dream.
        </p>

        <h2>What this site provides</h2>
        <p>
          A dream symbol reference covering themes such as snakes, teeth,
          water, pregnancy and deceased persons; a guided reflection tool that
          helps you consider your dream in personal context; and structured
          pages that organize traditional interpretations alongside their
          source status.
        </p>

        <h2 id="ai-use">How AI is used</h2>
        <p>
          The reflection tool uses AI to help structure your own thinking
          about a dream. It assists in identifying symbols, summarizing
          traditional perspectives, and offering reflective prompts. AI here
          is a study aid, not a religious authority.
        </p>

        <h2>What this site does not do</h2>
        <p>
          We do not issue fatwas or religious rulings. We do not predict
          future events. We do not claim that any interpretation is the single
          correct meaning of a dream. Dream interpretation varies by scholar,
          context and personal circumstances, and we present it that way.
        </p>

        <h2 id="methodology">Methodology</h2>
        <p>
          The knowledge base draws on classical Islamic dream interpretation
          traditions, including those associated with Ibn Sirin and Al-Nabulsi,
          as well as broader classical dream literature. Because many ancient
          sources are disputed or survive only in later compilations, these
          perspectives are presented as historical traditions rather than
          exact quotations.
        </p>

        <p>
          Pages are updated as the knowledge base expands and as corrections
          are received.
        </p>

        <h2>Corrections and feedback</h2>
        <p>
          If you believe a traditional reference or interpretation on this
          site is inaccurate, please{" "}
          <Link href="/contact">contact us</Link>. We welcome corrections and
          review them as part of our editorial process.
        </p>
        </div>
      </div>
    </article>
  );
}
