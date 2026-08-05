/**
 * Product FAQ data for the standalone /faq page and the homepage preview.
 *
 * The visible FAQ list and the FAQPage JSON-LD must both be generated from
 * this single source of truth so they can never drift apart.
 */

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  faqs: FaqEntry[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "about-the-reflection",
    title: "About the Reflection",
    faqs: [
      {
        id: "what-is-islamic-dream-reflection",
        question: "What is Islamic Dream Reflection?",
        answer:
          "Islamic Dream Reflection is an educational tool for personal reflection. It brings together dream symbols, traditional background, and your own context to help you think about a dream. It is not a definitive ruling about what a dream means."
      },
      {
        id: "how-does-the-tool-work",
        question: "How does the dream reflection tool work?",
        answer:
          "You give your dream a title, describe what you remember, and optionally add context about your life and feelings. The tool identifies known symbols, then presents traditional background, a personal reflection, and gentle guidance. You can save the reflection or share a summary card."
      },
      {
        id: "why-ask-about-emotions-and-context",
        question: "Why do you ask about emotions and life context?",
        answer:
          "Emotion and life context are optional. They are only used to shape the personal reflection and guidance, never to turn optional background into a fixed religious interpretation. If you leave them empty, the reflection simply focuses on the dream itself."
      },
      {
        id: "dream-does-not-match-known-symbol",
        question: "What happens if my dream does not match a known symbol?",
        answer:
          "The tool does not invent a source for symbols it cannot identify. It offers a general personal reflection and clearly lets you know the dream did not match a symbol in the knowledge base."
      }
    ]
  },
  {
    id: "islamic-boundaries",
    title: "Islamic Boundaries",
    faqs: [
      {
        id: "is-it-fortune-telling",
        question: "Is dream reflection the same as fortune telling?",
        answer:
          "No. Dream reflection here is an educational exercise. It does not predict future events and does not claim to know what will happen."
      },
      {
        id: "fatwas-or-religious-rulings",
        question: "Does this website provide fatwas or religious rulings?",
        answer:
          "No. This website does not provide fatwas and does not claim religious authority. For questions that involve religious rulings, please consult a qualified scholar."
      },
      {
        id: "can-a-dream-predict-the-future",
        question: "Can a dream predict the future?",
        answer:
          "This website does not use dreams to predict future events. The reflections are designed for learning and personal thought, not certainty about what will happen."
      },
      {
        id: "important-decisions-based-on-a-dream",
        question: "Should I make important decisions based on a dream?",
        answer:
          "We recommend against making major life decisions based only on a reflection from this site. Consider real-world evidence, careful reasoning, and the advice of trusted people. For religious matters, consult a qualified scholar."
      },
      {
        id: "recurring-or-disturbing-dreams",
        question: "What should I do about recurring or disturbing dreams?",
        answer:
          "You may find it helpful to write down the dream and how it made you feel, and to talk with someone you trust or a qualified scholar. If a dream is consistently affecting your sleep or wellbeing, consider seeking professional support. We do not provide medical diagnoses."
      }
    ]
  },
  {
    id: "sources-and-ai",
    title: "Sources and AI",
    faqs: [
      {
        id: "where-do-traditions-come-from",
        question: "Where do the traditional perspectives come from?",
        answer:
          "Traditional perspectives are drawn from Islamic dream interpretation traditions and classical literature. Not everything is attributed to a single scholar, and specific sources are shown per page according to the data. We do not claim that every reference has been directly checked against original manuscripts."
      },
      {
        id: "how-is-ai-used",
        question: "How is AI used in the reflection?",
        answer:
          "AI is used to identify symbols, organize content, and help write reflective expressions. AI is not a religious scholar, does not provide fatwas, and should not create classical sources that do not exist."
      },
      {
        id: "what-does-under-source-review-mean",
        question: "What does \u201cUnder Source Review\u201d mean?",
        answer:
          "It means the source tradition is recorded in the knowledge base, but the specific citation is still being organized or cross-checked. It does not mean the symbol has a verified, exact quotation from an original text."
      },
      {
        id: "all-interpretations-attributed-to-ibn-sirin",
        question: "Are all interpretations attributed directly to Ibn Sirin?",
        answer:
          "No. Many later texts have disputed attributions. A tradition name is shown only when the data supports it, and we do not present general traditional readings as exact words from Ibn Sirin."
      }
    ]
  },
  {
    id: "privacy-and-saved-dreams",
    title: "Privacy and Saved Dreams",
    faqs: [
      {
        id: "is-my-dream-text-public",
        question: "Is my dream text public?",
        answer:
          "Your dream text is not public by default. Describing a dream does not automatically publish it anywhere. Share cards do not include your full dream text."
      },
      {
        id: "where-are-saved-dreams-stored",
        question: "Where are saved dreams stored?",
        answer:
          "Saved dreams are currently stored on this device in your browser."
      },
      {
        id: "can-i-delete-a-saved-dream",
        question: "Can I delete a saved dream?",
        answer:
          "Yes. You can delete saved records from My Dreams, and the record is removed from the saved area on your current device."
      }
    ]
  }
];

/** Flat list of all FAQ entries, used by the homepage preview. */
export const ALL_FAQS: FaqEntry[] = FAQ_CATEGORIES.flatMap((c) => c.faqs);

/** Homepage preview: exactly the three questions shown on the homepage. */
export const HOME_FAQ_PREVIEW: FaqEntry[] = [
  ALL_FAQS.find((f) => f.id === "is-it-fortune-telling")!,
  ALL_FAQS.find((f) => f.id === "where-do-traditions-come-from")!,
  ALL_FAQS.find((f) => f.id === "is-my-dream-text-public")!
];
