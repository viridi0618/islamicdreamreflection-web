"use client";

import { useEffect } from "react";
import { FAQ_CATEGORIES } from "@/lib/faq";
import { track } from "@/lib/events";

/**
 * Client-side FAQ accordion list. Renders from the same FAQ_CATEGORIES data
 * used by the server-side FAQPage JSON-LD, so the visible questions and the
 * structured data can never drift apart.
 */
export function FaqList() {
  useEffect(() => {
    track("faq_opened");
  }, []);

  function handleToggle(open: boolean, faqId: string, categoryId: string) {
    if (open) {
      track("faq_question_expanded", { question: faqId, category: categoryId });
    }
  }

  return (
    <>
      {FAQ_CATEGORIES.map((cat) => (
        <section key={cat.id} id={cat.id} className="faq-category">
          <h2>{cat.title}</h2>
          <div className="faq">
            {cat.faqs.map((faq) => (
              <details
                key={faq.id}
                className="faq__item"
                onToggle={(e) =>
                  handleToggle((e.target as HTMLDetailsElement).open, faq.id, cat.id)
                }
              >
                <summary>{faq.question}</summary>
                <div className="faq__body">{faq.answer}</div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
