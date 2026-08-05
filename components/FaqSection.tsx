import type { DreamEntity } from "@/lib/data";

export function buildFaqs(entity: DreamEntity): Array<{ question: string; answer: string }> {
  const symbol = entity.name.replace(/\s*Dream\s*/i, "").toLowerCase();
  return [
    {
      question: `Is ${symbol} in a dream good or bad in Islam?`,
      answer:
        "Traditional scholars have recorded both positive and negative readings for this symbol depending on the context of the dream. Specific readings are pending verification in this knowledge base."
    },
    {
      question: `What do classical scholars say about ${symbol} dreams?`,
      answer:
        `Classical references for "${entity.name}" are listed on this page and are marked pending verification until a human editor confirms the source citation.`
    },
    {
      question: "Are dreams predictions of the future in Islam?",
      answer:
        "In the Islamic tradition, dreams are generally not treated as fixed predictions. Interpretations recorded by scholars describe possible meanings within context. This page presents traditional interpretations, not predictions."
    },
    {
      question: "What should I do after a disturbing dream?",
      answer:
        "Common advice in the tradition includes seeking refuge in Allah from a disturbing dream, avoiding dwelling on it, and consulting a trustworthy scholar for serious recurring dreams. Specific guidance is pending verification."
    }
  ];
}

export function FaqSection({ entity }: { entity: DreamEntity }) {
  const faqs = buildFaqs(entity);
  return (
    <div className="faq">
      {faqs.map((faq) => (
        <details key={faq.question} className="faq__item">
          <summary>{faq.question}</summary>
          <div className="faq__body">{faq.answer}</div>
        </details>
      ))}
    </div>
  );
}
