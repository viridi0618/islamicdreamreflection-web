/**
 * Homepage content (trust experience, integrated).
 *
 * All final homepage copy lives here so app/page.tsx stays structural.
 *
 * Source display on the homepage reads from the SINGLE unified registry
 * (data/sources.ts) — the same registry used by dream pages, guides and the
 * methodology page. There is exactly one source system on this site.
 */

/** Hero trust points (shown between the hero copy and the tool). */
export const HERO_TRUST_POINTS = [
  "Begin without an account",
  "One free reflection",
  "Saved reflections stay on this device"
];

export const HERO_COPY = {
  eyebrow: "Private Islamic Dream Reflection",
  h1Top: "Islamic Dream Interpretation",
  h1Em: "with Personal Reflection",
  lead:
    "Describe what you remember and explore its symbols, emotions, and personal context through carefully separated Islamic traditions and personal reflection."
};

/** Save & control section. */
export const SAVE_CONTROL = {
  title: "Reflect First. Save Only If It Feels Useful.",
  body: "A reflection is not automatically saved. After reading it, you can choose whether to keep it in this browser, share a summary card, or leave without saving anything.",
  steps: [
    {
      title: "Optional saving",
      body: "Save a reflection only after you have read it."
    },
    {
      title: "Local control",
      body: "Saved dreams remain in this browser on this device."
    },
    {
      title: "Delete whenever you choose",
      body: "Manage or remove saved reflections from My Dreams."
    }
  ],
  ctaLabel: "View My Dreams",
  ctaHref: "/my-dreams",
  secondaryLabel: "Privacy policy",
  secondaryHref: "/privacy"
};

/** Islamic Approach section. Links to the unified methodology page. */
export const ISLAMIC_APPROACH = {
  title: "A Careful Islamic Approach to Dreams",
  points: [
    {
      title: "Dreams have a place in Islamic sources",
      body: "Dreams are discussed in the Qur’an and authentic Hadith, but not every dream carries the same kind of meaning."
    },
    {
      title: "Different dreams require different responses",
      body: "Islamic tradition distinguishes comforting dreams, disturbing dreams, and dreams shaped by daily thoughts and experiences."
    },
    {
      title: "Context matters",
      body: "A symbol cannot be understood responsibly without considering what happened, how the dream felt, and the dreamer’s circumstances."
    },
    {
      title: "Certainty has limits",
      body: "A reflection should not be treated as knowledge of the unseen, a prediction, or a substitute for qualified religious guidance."
    }
  ],
  linkLabel: "Read our sources and methodology",
  linkHref: "/sources-methodology"
};

/**
 * Three types of dreams section.
 *
 * sourceIds reference the unified registry (data/sources.ts). The homepage
 * renders the resolved sources ("Based on … · Source →") so the three
 * categories are visibly grounded in Sahih Muslim 2263a rather than
 * presented as the site's own invention.
 */
export const DREAM_TYPES = {
  title: "Not Every Dream Is the Same",
  intro:
    "In the Islamic tradition, dreams are generally described as falling into categories. The distinction shapes how a dream is treated — and whether it should be interpreted at all.",
  cards: [
    {
      title: "A good or meaningful dream",
      body: "A dream that is comforting or carries clear meaning may be received with gratitude and shared. In the tradition this kind of dream is associated with Allah."
    },
    {
      title: "A disturbing dream",
      body: "A frightening dream is not treated as a sign of harm. The tradition teaches seeking refuge in Allah from its evil and not dwelling on it."
    },
    {
      title: "A dream shaped by daily thoughts",
      body: "Many dreams simply reflect what occupied the mind during the day — worries, conversations, and experiences — without any hidden meaning."
    }
  ],
  sourceIds: ["muslim-2263a"],
  sourcePrefix: "Based on",
  linkLabel: "Read the full guide: The Three Types of Dreams in Islam",
  linkHref: "/guides/three-types-of-dreams-in-islam"
};

/** Quote block (verified source only, read from the unified registry). */
export const QUOTE_SOURCE_ID = "bukhari-6985";

/**
 * Quote display copy. The Arabic is the COMPLETE hadith text (Sahih al-Bukhari
 * 6985) and the English translation covers exactly the same range — both parts
 * (good dream and bad dream) are present in both languages.
 */
export const HOME_QUOTE = {
  arabic:
    "إِذَا رَأَى أَحَدُكُمْ رُؤْيَا يُحِبُّهَا فَإِنَّمَا هِيَ مِنَ اللَّهِ، فَلْيَحْمَدِ اللَّهَ عَلَيْهَا، وَلْيُحَدِّثْ بِهَا، وَإِذَا رَأَى غَيْرَ ذَلِكَ مِمَّا يَكْرَهُ، فَإِنَّمَا هِيَ مِنَ الشَّيْطَانِ، فَلْيَسْتَعِذْ مِنْ شَرِّهَا، وَلاَ يَذْكُرْهَا لأَحَدٍ، فَإِنَّهَا لاَ تَضُرُّهُ",
  arabicLang: "ar",
  translation:
    "If anyone of you sees a dream that he likes, then it is from Allah: let him thank Allah for it and narrate it to others. And if he sees a dream that he dislikes, then it is from Satan: let him seek refuge in Allah from its evil and not mention it to anyone, for it will not harm him.",
  attributionNote: "Narrated by Abu Sa’id al-Khudri",
  supportsLabel: "What this supports"
};

/** How the Reflection Works (editorial-style steps). */
export const HOW_IT_WORKS = [
  {
    title: "Describe what you remember",
    body: "Give the dream a name, describe what happened, and add any life context or emotion that feels relevant."
  },
  {
    title: "Explore symbols and context",
    body: "Known symbols are connected with relevant traditional perspectives, while your personal context shapes the reflective part of the response."
  },
  {
    title: "Reflect, save, or leave",
    body: "Read the result as a reflection rather than a prediction, then decide whether to save it, share a summary, or keep nothing."
  }
];

/** Dream guides / symbol articles section. */
export const DREAM_GUIDES = {
  title: "Explore Common Dream Symbols",
  subtitle:
    "Start with a symbol, then consider the actions, emotions, and context that made the dream personal.",
  cardLinkLabel: "Explore this dream"
};
