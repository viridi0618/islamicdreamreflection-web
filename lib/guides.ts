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

export interface GuideSubsection {
  title: string;
  body: string[];
  sourceIds?: string[];
}

export interface GuideSection {
  heading: string;
  body?: string[];
  sourceIds?: string[];
  items?: GuideSubsection[];
}

export interface GuideEntry {
  slug: string;
  title: string;
  description: string;
  metaTitle?: string;
  quickAnswer?: string;
  intro: string[];
  sections: GuideSection[];
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  relatedLinks?: Array<{
    href: string;
    label: string;
    description?: string;
  }>;
}

export const GUIDES: Record<string, GuideEntry> = {
  "three-types-of-dreams-in-islam": {
    slug: "three-types-of-dreams-in-islam",
    title: "The Three Types of Dreams in Islam",
    metaTitle:
      "Three Types of Dreams in Islam - Meaningful, Disturbing & From the Self",
    description:
      "Learn the three types of dreams described in Islamic tradition, how to respond to each type, and why not every dream should be forced into interpretation.",
    quickAnswer:
      "Hadith describes dreams broadly as including a good or meaningful dream associated with Allah, a disturbing dream from Satan, and a dream connected to one's own thoughts or self. These categories guide how a dream is treated, but a person may not always know with certainty which category a specific dream belongs to.",
    intro: [
      "Islamic teaching about dreams is more careful than a simple symbol dictionary. Some dreams may be received as glad tidings, some disturbing dreams should be released rather than pursued, and some dreams may simply reflect what a person has been thinking about.",
      "These categories help set a safer posture toward interpretation. They do not give a person certainty about every dream, and they do not turn every image seen during sleep into a prediction."
    ],
    sections: [
      {
        heading: "The Three Types of Dreams",
        items: [
          {
            title: "A Good or Meaningful Dream",
            body: [
              "A good dream is described in Hadith as being from Allah and as glad tidings. A person may receive such a dream with gratitude and, where appropriate, share it with someone trustworthy.",
              "This does not mean every pleasant dream is prophecy or that a dream gives certain knowledge of future events. The source supports the place of good dreams in the tradition, not a fixed meaning for every symbol."
            ],
            sourceIds: ["muslim-2263a", "bukhari-6984", "bukhari-6990"]
          },
          {
            title: "A Disturbing Dream",
            body: [
              "A frightening or disliked dream is treated differently. Hadith guidance turns the dreamer away from panic and toward seeking refuge in Allah, not toward treating the dream as an omen.",
              "This matters because a disturbing image can feel powerful after waking. Islamic etiquette helps the person avoid dwelling on it or spreading fear through repeated retelling."
            ],
            sourceIds: ["muslim-2263a", "bukhari-6985", "bukhari-7044"]
          },
          {
            title: "A Dream Shaped by Daily Thoughts",
            body: [
              "Hadith also describes dreams connected to one's own mind. This can include worries, conversations, repeated concerns, hopes, responsibilities, or ordinary experiences that continue into sleep.",
              "Not every dream in this category needs symbolic interpretation. Sometimes the most accurate response is simply to notice what has been occupying the heart and mind."
            ],
            sourceIds: ["muslim-2263a"]
          }
        ]
      },
      {
        heading: "How Should You Respond to Each Type?",
        items: [
          {
            title: "Good dream",
            body: [
              "Receive it with gratitude. If sharing it is appropriate, share it with care rather than turning it into public certainty or forcing predictions from it.",
              "A good dream can encourage a person without becoming a claim that a specific future event must happen."
            ],
            sourceIds: ["bukhari-6985", "bukhari-6990"]
          },
          {
            title: "Disturbing dream",
            body: [
              "Seek refuge in Allah from its evil, do not dwell on it, and do not relate it to others as though it must come true. Some narrations also mention spitting lightly to the left as part of the etiquette.",
              "The point of this guidance is calm and protection, not fear-based interpretation."
            ],
            sourceIds: ["bukhari-6985", "bukhari-7044", "bukhari-7045"]
          },
          {
            title: "Daily-thought dream",
            body: [
              "Consider whether the dream resembles recent waking experience. It may be connected to stress, conversations, family concerns, work, health worries, or something repeatedly on the mind.",
              "Often no interpretation is required. Let ordinary dreams remain ordinary when reflection would only create unnecessary anxiety."
            ],
            sourceIds: ["muslim-2263a"]
          }
        ]
      },
      {
        heading: "Can You Tell Which Type Your Dream Is?",
        body: [
          "A person should be cautious about claiming certainty. The categories guide how dreams are treated, but they are not a quiz or scoring system that can classify every dream with confidence.",
          "Helpful clues may include the emotional tone of the dream, whether it was clearly disturbing, whether it resembles recent waking thoughts, whether it repeats, and whether reflection would lead to calm understanding or only to fear. None of these clues should be turned into a rigid formula."
        ]
      },
      {
        heading: "Should Every Dream Be Interpreted?",
        body: [
          "No. Some dreams are received with gratitude, some disturbing dreams are better released, and some dreams are simply connected to daily thought. Islamic guidance does not require a person to extract symbolic meaning from every dream.",
          "Forcing interpretation can make a normal dream feel heavier than it is. A careful approach asks whether interpretation would actually help the person reflect, repent, feel gratitude, seek protection, or understand their own circumstances more honestly."
        ]
      },
      {
        heading: "What This Means for Your Own Dream",
        body: [
          "Before searching for one fixed meaning, ask what emotion stayed with you after waking, whether you had recently been thinking about similar matters, whether the dream was frightening, and whether you are trying to force certainty from something uncertain.",
          "If reflection would be useful, begin privately and gently. If the dream was disliked or frightening, the traditional response may be more important than interpretation."
        ]
      }
    ],
    faq: [
      {
        question: "What are the three types of dreams in Islam?",
        answer:
          "Hadith describes dreams broadly as a good dream associated with Allah, a disturbing dream from Satan, and a dream connected to one's own thoughts or self."
      },
      {
        question: "Does every dream have a meaning in Islam?",
        answer:
          "No. Some dreams may be meaningful, but some are disturbing dreams to be released and some are connected to daily thoughts or ordinary experience."
      },
      {
        question: "Are bad dreams predictions?",
        answer:
          "A bad dream should not automatically be treated as a prediction. Verified Hadith guidance emphasizes seeking refuge in Allah and not dwelling on the dream as an omen."
      },
      {
        question: "Can daily thoughts appear in dreams?",
        answer:
          "Yes. Hadith describes one category of dreams as suggestions of one's own mind, which can include recent concerns, conversations, and experiences."
      },
      {
        question: "Should every dream be interpreted?",
        answer:
          "No. Interpretation should not be forced, especially when a dream is disturbing or appears closely tied to ordinary daily thought."
      }
    ],
    relatedLinks: [
      {
        href: "/guides/dreams-in-the-quran",
        label: "Dreams in the Qur'an",
        description: "Read how Qur'anic dream accounts should and should not be generalized."
      },
      {
        href: "/sources-methodology",
        label: "Sources and Methodology",
        description: "See how Islamic sources, context, and editorial reflection are separated."
      },
      {
        href: "/guides/what-to-do-after-a-bad-dream",
        label: "What to Do After a Bad Dream",
        description: "Review verified Hadith guidance for disliked or frightening dreams."
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
    title: "Dreams in the Qur'an: Yusuf, Ibrahim, and Meaningful Visions",
    metaTitle: "Dreams in the Qur'an - Yusuf, Ibrahim & Meaningful Visions",
    description:
      "Explore Qur'anic dream accounts involving Yusuf and Ibrahim, what they teach about meaningful visions, and what they do not establish for ordinary dream interpretation.",
    quickAnswer:
      "The Qur'an records dreams and visions with real significance. These accounts show that dreams can carry meaning and that interpretation can matter, but they do not establish a universal symbol dictionary for every ordinary dream.",
    intro: [
      "The Qur'an gives dreams a serious place in sacred history, especially in the story of Yusuf and in the prophetic vision of Ibrahim. These passages are not casual dream anecdotes; they are part of revelation and must be read with care.",
      "For ordinary dreamers, the lesson is balanced. The Qur'an gives reasons to take dreams seriously without treating every dream as revelation, a command, or a fixed symbolic code."
    ],
    sections: [
      {
        heading: "Dreams in the Story of Yusuf",
        items: [
          {
            title: "Yusuf's Own Dream",
            body: [
              "The Qur'an records Yusuf telling his father that he saw eleven stars, the sun, and the moon prostrating to him. His father counsels him not to tell his brothers and says that Allah will teach him the interpretation of dreams.",
              "The dream plays a major role in Yusuf's story, but it is not presented as a reusable dictionary where stars, sun, and moon always carry the same meaning in ordinary dreams."
            ],
            sourceIds: ["quran-yusuf-12-4-6"]
          },
          {
            title: "The Dreams of the Prisoners",
            body: [
              "Two prisoners describe their dreams to Yusuf: one sees himself pressing wine, and the other sees himself carrying bread from which birds eat. Yusuf teaches before interpreting, placing interpretation within faith and responsibility rather than guesswork.",
              "The passage shows that interpretation can matter, but it does not invite a reader to make confident claims from isolated symbols without context."
            ],
            sourceIds: ["quran-yusuf-12-36-41"]
          },
          {
            title: "The King's Dream",
            body: [
              "The king sees seven fat cows eaten by seven lean cows, and seven green ears of grain beside dry ones. Yusuf's interpretation connects the dream to years of abundance and hardship, and to practical preparation.",
              "This account does not mean that cows or grain always mean one fixed thing in modern dreams. The Qur'anic account is contextual, consequential, and interpreted through Yusuf's God-given knowledge."
            ],
            sourceIds: ["quran-yusuf-12-43"]
          }
        ]
      },
      {
        heading: "Prophetic Dreams and Visions",
        body: [
          "The vision of Ibrahim is in a special category. The Qur'an records Ibrahim telling his son that he saw himself sacrificing him, and the passage presents the event as a prophetic vision fulfilled through submission to Allah.",
          "This is not evidence that ordinary people's dreams create religious commands. Prophetic visions belong to the lives of prophets and should not be flattened into general dream symbolism."
        ],
        sourceIds: ["quran-saffat-37-102-105"]
      },
      {
        heading: "What Qur'anic Dreams Teach - and What They Do Not",
        items: [
          {
            title: "What they show",
            body: [
              "Qur'anic accounts show that some dreams and visions can carry meaning, that interpretation can have importance, that context matters, and that prophetic visions occupy a special category.",
              "They also show restraint: interpretation is not treated as casual entertainment or as a way to make unsupported claims."
            ],
            sourceIds: [
              "quran-yusuf-12-4-6",
              "quran-yusuf-12-36-41",
              "quran-yusuf-12-43",
              "quran-saffat-37-102-105"
            ]
          },
          {
            title: "What they do not establish",
            body: [
              "They do not establish that every dream carries divine meaning, that every symbol has one fixed interpretation, that ordinary people receive prophetic commands, or that Qur'anic symbols automatically map onto modern dreams.",
              "They also do not give ordinary dreams certain authority over the future, the unseen, another person's character, or religious obligations."
            ]
          }
        ]
      },
      {
        heading: "What This Means for Your Own Dream",
        body: [
          "The Qur'an gives reasons to take dreams seriously without treating every dream as revelation. A careful person starts with the type of dream, considers context, and distinguishes reflection from certainty.",
          "If a dream leaves a strong impression, ask what happened in the dream, what emotion remained after waking, whether recent life circumstances may be involved, and whether the dream should be interpreted at all. If the dream was disturbing, verified bad-dream guidance may be more useful than symbolic analysis."
        ]
      }
    ],
    faq: [
      {
        question: "Are dreams mentioned in the Qur'an?",
        answer:
          "Yes. The Qur'an records several dreams and visions, especially in the story of Yusuf and in the prophetic vision of Ibrahim."
      },
      {
        question: "Which prophet is most associated with dreams in the Qur'an?",
        answer:
          "Yusuf is most closely associated with dream interpretation in the Qur'an, especially through his own dream, the dreams of the prisoners, and the king's dream."
      },
      {
        question: "Does the Qur'an give a dictionary of dream symbols?",
        answer:
          "No. Qur'anic dream accounts show that dreams can carry meaning, but they do not create a universal dictionary where every symbol has one fixed meaning."
      },
      {
        question: "Are ordinary dreams the same as prophetic visions?",
        answer:
          "No. Prophetic visions occupy a special category and should not be used to claim that ordinary dreams create religious commands."
      },
      {
        question: "Does every dream need interpretation?",
        answer:
          "No. The Qur'an shows that some dreams can matter, while Hadith also teaches that some dreams are disturbing or connected to one's own thoughts."
      }
    ],
    relatedLinks: [
      {
        href: "/guides/three-types-of-dreams-in-islam",
        label: "The Three Types of Dreams in Islam",
        description: "Understand the categories Hadith gives for treating dreams carefully."
      },
      {
        href: "/sources-methodology",
        label: "Sources and Methodology",
        description: "See how source-backed guidance is separated from reflection."
      },
      {
        href: "/guides/what-to-do-after-a-bad-dream",
        label: "What to Do After a Bad Dream",
        description: "Read verified Hadith etiquette for disliked dreams."
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
