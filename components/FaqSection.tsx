import type { DreamEntity } from "@/lib/data";

export function buildFaqs(entity: DreamEntity): Array<{ question: string; answer: string }> {
  const symbol = entity.name.replace(/\s*Dream\s*/i, "").toLowerCase();
  return [
    {
      question: `Is ${symbol} in a dream good or bad in Islam?`,
      answer:
        "A dream is not judged good or bad from the symbol alone. This page treats the symbol through context, emotion, and careful reflection, while keeping religious guidance separate from fixed predictions."
    },
    {
      question: `Does ${symbol} in a dream have one fixed Islamic interpretation?`,
      answer:
        `This page does not present one fixed Islamic interpretation for "${entity.name}". When a verified source is used, it is cited for what it directly supports; otherwise the discussion is framed as personal reflection.`
    },
    {
      question: "Are dreams predictions of the future in Islam?",
      answer:
        "In Islamic sources, dreams are not all treated the same way, and a dream should not automatically be treated as a fixed prediction. This page separates verified religious guidance from personal reflection."
    },
    {
      question: "What should I do after a disturbing dream?",
      answer:
        "For a disliked dream, verified Hadith guidance includes seeking refuge in Allah, spitting lightly to the left, and not relating the dream to others. If recurring dreams are affecting your sleep or wellbeing, seek appropriate support without treating the dream as a prediction."
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
