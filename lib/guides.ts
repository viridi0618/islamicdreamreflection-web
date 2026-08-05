/**
 * Foundation guide content (Phase D Islamic Foundation layer).
 *
 * Each guide is data-driven and references the unified source registry
 * (data/sources.ts). Only public sources (reviewed/verified) are resolved
 * for display.
 *
 * Accuracy: source IDs below have been checked against sunnah.com (hadith)
 * and the text of the Qur'an. A citation supports only what it actually
 * states; interpretive paraphrase is avoided in "supports" claims.
 */

export interface GuideSection {
  heading: string;
  body: string[];
  sourceIds?: string[];
}

export interface GuideEntry {
  slug: string;
  title: string;
  description: string;
  intro: string[];
  sections: GuideSection[];
}

export const GUIDES: Record<string, GuideEntry> = {
  "three-types-of-dreams-in-islam": {
    slug: "three-types-of-dreams-in-islam",
    title: "The Three Types of Dreams in Islam",
    description:
      "Dreams in the Islamic tradition are generally described as coming from Allah, from Satan, or from the self. Learn how to tell them apart and when to interpret.",
    intro: [
      "The Islamic tradition does not treat every dream as a message. Hadith describe dreams as falling into categories, which helps a person decide whether a dream is worth interpreting at all."
    ],
    sections: [
      {
        heading: "Dreams from Allah",
        body: [
          "Good dreams — those that are truthful, comforting, or carry clear meaning — are described as coming from Allah. In the tradition this is the type of dream a person may share and take encouragement from.",
          "This does not mean every pleasant dream is a prophecy. It means the dream is a positive experience to receive with gratitude."
        ],
        sourceIds: ["muslim-2263a", "bukhari-6984"]
      },
      {
        heading: "Disturbing dreams from Satan",
        body: [
          "Frightening or disturbing dreams are described as coming from Satan. The recommended response is not to interpret them into certainty, but to seek refuge in Allah from their evil.",
          "The hadith give a practical etiquette: do not let a bad dream control the day, and do not go looking for a fixed meaning in it."
        ],
        sourceIds: ["muslim-2263a", "bukhari-6985", "bukhari-7044"]
      },
      {
        heading: "Dreams from the self",
        body: [
          "Many dreams simply reflect the dreamer’s own thoughts, worries, or what they were thinking about during the day. A hadith describes dreams that come from the self as one of the three categories.",
          "These dreams are best understood as personal reflections rather than as events with hidden meanings."
        ],
        sourceIds: ["muslim-2263a"]
      },
      {
        heading: "Why the categories matter",
        body: [
          "The categories matter because they set expectations. Not every dream is a sign, and the tradition is careful not to turn ordinary dreams into certainties.",
          "When a dream is disturbing, the first response is protection and calm, not interpretation."
        ],
        sourceIds: ["muslim-2263a", "bukhari-6986"]
      }
    ]
  },

  "what-to-do-after-a-bad-dream": {
    slug: "what-to-do-after-a-bad-dream",
    title: "What to Do After a Bad Dream in Islam",
    description:
      "A gentle, practical guide to the traditional etiquette for a disturbing dream, grounded in hadith.",
    intro: [
      "A bad dream can stay with a person all day. The Islamic tradition offers a simple, calming response rather than turning the dream into a prediction."
    ],
    sections: [
      {
        heading: "Seek refuge in Allah",
        body: [
          "The hadith teach that a disturbing dream comes from Satan, and the response is to seek refuge in Allah from its evil. Some narrations add spitting lightly to the left three times as part of the etiquette.",
          "This redirects the mind from fear to protection."
        ],
        sourceIds: ["bukhari-6986", "bukhari-7044"]
      },
      {
        heading: "Do not dwell on it",
        body: [
          "The tradition advises not telling others about the bad dream and not letting it influence the day. Dwell less, and the dream loses its grip."
        ],
        sourceIds: ["bukhari-6985", "bukhari-7045"]
      },
      {
        heading: "Do not interpret it into certainty",
        body: [
          "A disturbing dream is not evidence of an enemy, a spell, or a coming disaster. Treating it as a certainty is exactly what the etiquette is meant to prevent."
        ],
        sourceIds: ["bukhari-6986", "bukhari-7044"]
      },
      {
        heading: "Seek support when needed",
        body: [
          "If a dream repeatedly disturbs your sleep or your mood, it may be more about stress or worry than about the dream itself. Talking with someone you trust, or a professional if it affects your wellbeing, is a reasonable step.",
          "For religious questions, consult a qualified scholar rather than a website."
        ]
      }
    ]
  },

  "dreams-in-the-quran": {
    slug: "dreams-in-the-quran",
    title: "Dreams in the Qur’an: Yusuf, Ibrahim, and Meaningful Visions",
    description:
      "What the Qur’an records about dreams and interpretation, from the story of Yusuf to the vision of Ibrahim.",
    intro: [
      "The Qur’an records several dreams and their interpretations, most notably in the story of Yusuf and in the vision of Ibrahim. These passages show that dreams can carry meaning and that interpretation was approached with care."
    ],
    sections: [
      {
        heading: "The dream of Yusuf",
        body: [
          "Yusuf tells his father that he saw eleven stars, the sun and the moon prostrating to him. His father counsels him not to tell his brothers, and says that Allah will choose him and teach him the interpretation of dreams.",
          "The passage places dreams within a careful, guided process of interpretation."
        ],
        sourceIds: ["quran-yusuf-12-4-6"]
      },
      {
        heading: "Interpreting for others in prison",
        body: [
          "Two prisoners ask Yusuf to interpret their dreams — one of pressing wine, one of carrying bread. Yusuf responds by teaching about interpretation before giving the meaning.",
          "The episode shows interpretation as a serious discipline, not a guessing game."
        ],
        sourceIds: ["quran-yusuf-12-36-41"]
      },
      {
        heading: "The king’s dream of the seven cows",
        body: [
          "The king dreams of seven fat cows eaten by seven lean ones, and seven green ears of grain beside seven dry ones. The dream is presented as significant, and Yusuf interprets it as a coming period of abundance followed by famine.",
          "This is a dream with context and consequence — it does not provide a fixed meaning for cows or grain in ordinary dreams."
        ],
        sourceIds: ["quran-yusuf-12-43"]
      },
      {
        heading: "The vision of Ibrahim",
        body: [
          "Ibrahim tells his son of a dream in which he saw himself sacrificing him, and his son responds with patience and submission. Both submit, and the vision is fulfilled.",
          "This is a prophetic vision with a clear command, not an example of ordinary dream symbolism — it is recorded to show how a prophet’s dream was honoured."
        ],
        sourceIds: ["quran-saffat-37-102-105"]
      },
      {
        heading: "What this means for ordinary dreams",
        body: [
          "The Qur’anic examples establish that some dreams are meaningful and that interpretation is a careful discipline. They do not turn every symbol in every dream into a fixed dictionary entry.",
          "Context, honesty about uncertainty, and the guidance of someone who understands the tradition are all part of the approach."
        ],
        sourceIds: ["quran-yusuf-12-4-6", "quran-yusuf-12-43"]
      }
    ]
  }
};

export function loadGuide(slug: string): GuideEntry | undefined {
  return GUIDES[slug];
}

export function allGuides(): GuideEntry[] {
  return Object.values(GUIDES);
}
