import type { Metadata } from "next";
import Link from "next/link";
import { FAQ_CATEGORIES } from "@/lib/faq";
import { faqSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { FaqList } from "@/components/FaqList";

export const metadata: Metadata = {
  title: "Islamic Dream Reflection FAQ — Dreams, AI, Sources & Privacy",
  description:
    "Answers about Islamic dream reflection, traditional perspectives, AI use, source review, privacy, saved dreams, and religious boundaries.",
  alternates: { canonical: `${SITE_URL}/faq` },
  robots: { index: true, follow: true }
};

const faqs = FAQ_CATEGORIES.flatMap((c) => c.faqs);

export default function FaqPage() {
  const jsonLd = faqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })));

  return (
    <article className="shell section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="section__head">
        <h1>Frequently Asked Questions</h1>
        <span className="rule" />
      </div>

      <p className="faq-intro">
        Learn how Islamic Dream Reflection works, how traditional perspectives
        are presented, and what happens to your dream information.
      </p>

      <nav className="faq-anchors" aria-label="FAQ categories">
        {FAQ_CATEGORIES.map((cat) => (
          <Link key={cat.id} href={`#${cat.id}`}>
            {cat.title}
          </Link>
        ))}
      </nav>

      <FaqList />
    </article>
  );
}
