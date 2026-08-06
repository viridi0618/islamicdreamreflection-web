/**
 * Long-tail dream article layer (Dream Content Architecture Upgrade).
 *
 * Each DreamArticle answers exactly ONE search intent (one keyword) and is
 * rendered by components/DreamArticlePage.tsx at /guides/<slug>.
 *
 * Relationship to DreamEntity:
 *   - DreamEntity (data/dreams/*.json) = Symbol Hub page (/dreams/<slug>)
 *   - DreamArticle (this file)        = long-tail search-intent page (/guides/<slug>)
 *
 * Content rules (Phase 6):
 *   - Each article answers one clear question.
 *   - No template filler such as "Dream meanings depend on context...".
 *   - No strong assertions ("This dream means your enemy..."). Use
 *     "Some traditional interpretations associate..." instead.
 *   - No fabricated authority. No "Ibn Sirin said" without a reliable source.
 *   - Sources come only from the unified registry (data/sources.ts).
 */

export interface DreamArticleScenario {
  id: string;
  title: string;
  body: string[];
}

export interface DreamArticleInterpretation {
  title: string;
  body: string[];
  sourceIds?: string[];
}

export interface DreamArticle {
  slug: string;
  /** Primary search keyword this page ranks for. */
  keyword: string;
  /** What the searcher is actually looking for. */
  searchIntent: string;
  title: string;
  description: string;
  quickAnswer: string;
  introduction: string[];
  islamicPerspective: DreamArticleInterpretation[];
  interpretations: DreamArticleInterpretation[];
  scenarios: DreamArticleScenario[];
  reflectionQuestions: string[];
  whatItDoesNotProve: string[];
  faq: Array<{ question: string; answer: string }>;
  relatedArticles: Array<{ href: string; label: string }>;
  relatedSymbols: Array<{ href: string; label: string }>;
  /** Link back to the Symbol Hub page. */
  hubSymbol: { href: string; label: string };
  /** Entity id used by DreamReflectionCta to pre-select a symbol. */
  hubEntityId: string;
}

export const DREAM_ARTICLES: Record<string, DreamArticle> = {
  /* ================================================================
   * Snake Cluster (Phase 3 template validation)
   * ============================================================== */

  "snake-bite-dream-islam": {
    slug: "snake-bite-dream-islam",
    keyword: "snake bite dream meaning islam",
    searchIntent:
      "The searcher was bitten by a snake in a dream and wants to know what it means from an Islamic perspective, and whether it is a bad sign.",
    title: "Snake Bite Dream Meaning in Islam",
    description:
      "A snake biting you in a dream is often a vivid experience. Explore what Islamic tradition and careful reflection say about snake bite dreams. Not predictions.",
    quickAnswer:
      "A snake bite dream is usually a very vivid experience, and it is best read through the feelings and events around it rather than as one fixed sign. In Islamic dream interpretation traditions, a snake is not given a single automatic meaning: what matters is what the snake was doing, where the bite happened, how you felt, and what is happening in your life. A bite may be explored as an image of something that felt harmful or wounding — a remark, a setback, or a situation that left you feeling hurt or exposed. It does not prove that a specific person will harm you or that harm is about to occur. The Islamic tradition is careful not to turn dreams into accusations or predictions, and it teaches calm and seeking refuge in Allah after a disturbing dream.",
    introduction: [
      "Being bitten by a snake in a dream often stays with a person for a long time. It is one of the most emotionally charged snake scenarios, so it deserves a careful reading rather than a hasty one.",
      "This article separates three things: what the Islamic tradition actually says about disturbing dreams, later interpretive traditions that mention snakes, and the personal reflection that only you can add from your own life."
    ],
    islamicPerspective: [
      {
        title: "Disturbing dreams and the traditional response",
        body: [
          "The hadith describe a frightening dream as coming from Satan and teach that the response is to seek refuge in Allah from its evil, not to treat the dream as a fixed sign of harm. The traditional etiquette also includes not dwelling on the dream and not telling it to others as a way of letting it control the day.",
          "This does not mean the dream is meaningless — it means the first response is protection and calm, not interpretation into certainty."
        ],
        sourceIds: ["bukhari-6986", "bukhari-7044", "bukhari-7045"]
      },
      {
        title: "Dreams are not treated as fixed forecasts",
        body: [
          "In the Islamic tradition, a dream is not generally treated as a prediction of what will happen. The hadith describe dreams as falling into categories — from Allah, from Satan, and from the self — and only some dreams carry the weight of meaning.",
          "A bite in a dream is therefore not evidence that a real injury or harm is coming."
        ],
        sourceIds: ["muslim-2263a"]
      }
    ],
    interpretations: [
      {
        title: "An image of being hurt or exposed",
        body: [
          "In personal reflection, a snake bite may be explored as a picture of something that felt wounding in your life — a harsh remark, a betrayal of trust, a setback at work, or a situation that left you feeling vulnerable.",
          "This reading is offered as a reflective tool. It is not a fixed Islamic meaning assigned to every snake bite dream."
        ]
      },
      {
        title: "A warning your body or mind is sending",
        body: [
          "Stress, fear, and recent experiences can shape dream content. A bite dream during a demanding period may simply be your mind's way of picturing pressure or a conflict you are carrying.",
          "Rest, routine, and talking about the pressure may change your dreams more than any interpretation would."
        ]
      },
      {
        title: "A sign of conflict you need to address",
        body: [
          "If the dream involved being cornered or bitten, it may reflect a real conflict or danger you feel in daily life — at work, in family, or with yourself.",
          "The value of this reading is practical: it can help you name what is pressing on you and decide to address it directly."
        ]
      }
    ],
    scenarios: [
      {
        id: "bitten-and-recovered",
        title: "Bitten but recovered",
        body: [
          "If you survived or recovered in the dream, it may reflect resilience and the process of healing from something that hurt you. The dream can be read as a picture of moving through a wound rather than being defined by it."
        ]
      },
      {
        id: "bitten-and-bleeding",
        title: "Bitten and bleeding",
        body: [
          "Blood often intensifies the feeling of loss or harm. In reflection, it may point to something that cost you — energy, trust, or time. What was drained, and from where, may be worth naming."
        ]
      },
      {
        id: "chased-and-bitten",
        title: "Chased, then bitten",
        body: [
          "When a snake chases before biting, the dream may picture something you have been avoiding catching up with you. The bite may be the moment it finally demands attention."
        ]
      }
    ],
    reflectionQuestions: [
      "What was happening in your life in the days before the dream — was there pressure, a conflict, or a recent hurt?",
      "Who or what, if anything, did the snake remind you of?",
      "How did you respond after the bite in the dream — did you fight, flee, freeze, or recover?",
      "If the dream were a picture of something that felt wounding lately, what would it be?"
    ],
    whatItDoesNotProve: [
      "That a specific person will harm you. A dream is not evidence against any real individual.",
      "That harm or injury is about to occur in reality.",
      "That magic or the unseen is at work. The traditional response to a disturbing dream is seeking refuge in Allah, not concluding that magic is involved.",
      "That the dream is a prophecy. The tradition is explicit that dreams are not generally treated as forecasts."
    ],
    faq: [
      {
        question: "Is a snake bite dream a bad omen in Islam?",
        answer:
          "A frightening dream is not treated as a fixed sign of harm in the Islamic tradition. The hadith teach that a disturbing dream comes from Satan and the response is to seek refuge in Allah from its evil, not to read it as a prediction. A snake bite dream is best explored through the feelings and events around it."
      },
      {
        question: "Does a snake bite dream mean an enemy will hurt me?",
        answer:
          "No. A dream is not evidence against any real person, and the tradition explicitly guards against turning dreams into accusations. If a relationship concern surfaces, it is better addressed directly and honestly rather than through the dream."
      },
      {
        question: "What should I do after a snake bite dream?",
        answer:
          "If the dream frightened you, follow the traditional etiquette: seek refuge in Allah from its evil and do not dwell on it. It can also help to write the dream down, note how you felt, and consider whether stress or a recent event shaped it."
      }
    ],
    relatedArticles: [
      { href: "/guides/black-snake-dream-islam", label: "Black Snake Dream Meaning in Islam" },
      { href: "/guides/snake-in-house-dream-islam", label: "Snake in the House Dream Meaning in Islam" },
      { href: "/guides/killing-snake-dream-islam", label: "Killing a Snake in a Dream in Islam" }
    ],
    relatedSymbols: [
      { href: "/dreams/teeth-falling-out-islam", label: "Teeth Falling Out Dream Meaning in Islam" },
      { href: "/dreams/dead-person-dream-islam", label: "Dead Person Dream Meaning in Islam" }
    ],
    hubSymbol: { href: "/dreams/snake-dream-islam", label: "Snake Dream Meaning in Islam" },
    hubEntityId: "snake"
  },

  "black-snake-dream-islam": {
    slug: "black-snake-dream-islam",
    keyword: "black snake dream meaning islam",
    searchIntent:
      "The searcher dreamed of a black snake and wants to know whether the colour changes the meaning from an Islamic perspective.",
    title: "Black Snake Dream Meaning in Islam",
    description:
      "A black snake in a dream often feels more ominous. Explore what the colour changes, what it does not change, and how to reflect on it. Not predictions.",
    quickAnswer:
      "A black snake often feels more ominous than other colours, and colour does shape the emotional tone of a dream — but it does not fix the meaning. In Islamic dream interpretation traditions, context matters more than colour alone: a calm black snake seen from a distance feels very different from an aggressive one. Rather than concluding that a black snake means one specific thing, reflect on what felt dark, unknown, or avoided in your life at the time of the dream. A black snake dream does not prove the presence of magic or hidden harm, and the tradition teaches calm and seeking refuge in Allah after a disturbing dream rather than treating it as evidence of the unseen.",
    introduction: [
      "Colour is often the first detail a person remembers about a snake dream, and black tends to carry the heaviest feeling. It is worth taking that feeling seriously — and worth not letting it decide the whole meaning.",
      "This article looks at what the colour black may add to a snake dream, what it does not change, and how to reflect on the dream calmly."
    ],
    islamicPerspective: [
      {
        title: "Colour is context, not a verdict",
        body: [
          "Islamic dream interpretation traditions read symbols through context: the colour, the action, the place, and the dreamer's circumstances all matter. A colour alone is not assigned one automatic meaning.",
          "A black snake may therefore feel darker, but the tradition does not teach that a black snake in a dream proves something evil is attached to you."
        ]
      },
      {
        title: "Disturbing dreams and the traditional response",
        body: [
          "If the black snake frightened you, the hadith guidance applies: a disturbing dream is not treated as a fixed sign of harm, and the response is to seek refuge in Allah from its evil and not to dwell on it.",
          "The tradition is careful not to turn ordinary dreams into certainties, and it warns against using dreams to conclude that magic or the unseen is at work."
        ],
        sourceIds: ["bukhari-6986", "bukhari-7044"]
      }
    ],
    interpretations: [
      {
        title: "Something dark or unknown in your life",
        body: [
          "In personal reflection, a black snake may point to an area of your life you are avoiding or do not fully understand — a fear, a worry, or a situation you have not looked at directly.",
          "This reading is a reflective tool, not a fixed Islamic meaning."
        ]
      },
      {
        title: "Facing what once felt frightening",
        body: [
          "A black snake seen calmly from a distance can reflect facing something that once felt frightening without being harmed. The dream may be a picture of growing steadiness rather than danger."
        ]
      },
      {
        title: "Intensity of feeling, not a prophecy",
        body: [
          "Dark colours often intensify how a dream feels. A black snake may simply make an ordinary worry feel larger and more serious than it is in daylight."
        ]
      }
    ],
    scenarios: [
      {
        id: "black-snake-calm",
        title: "A calm black snake at a distance",
        body: [
          "If the snake was still and you felt only mild unease, the dream may picture something you are watching cautiously — present in your life but not attacking."
        ]
      },
      {
        id: "black-snake-aggressive",
        title: "An aggressive black snake",
        body: [
          "If the snake lunged, chased, or bit, the dream carries more fear. It may reflect a real pressure or conflict you feel, and the traditional response to a disturbing dream applies: calm, protection, and not dwelling on it."
        ]
      },
      {
        id: "black-snake-in-water",
        title: "A black snake in water",
        body: [
          "Water adds its own emotional layer. In reflection, the combination may picture something deep — emotions or concerns below the surface — that the dark colour makes harder to see clearly."
        ]
      }
    ],
    reflectionQuestions: [
      "What felt dark, unknown, or avoided in your life around the time of the dream?",
      "Was the snake threatening, still, or indifferent — and how did each detail change how you felt?",
      "If the dream were naming something you have been putting off looking at, what would it be?",
      "What would change if you faced that thing directly, the way you watched the snake?"
    ],
    whatItDoesNotProve: [
      "The presence of magic or hidden harm. Worrying about magic based on a dream can itself become a source of fear.",
      "That something evil is attached to you.",
      "That a specific person is an enemy or intends you harm.",
      "That the dream is a prediction. A black snake is not a forecast."
    ],
    faq: [
      {
        question: "Does a black snake dream mean something evil in Islam?",
        answer:
          "No. The colour black may make a dream feel heavier, but the Islamic tradition reads symbols through context and does not teach that a black snake proves evil is at work. The traditional response to a frightening dream is seeking refuge in Allah, not concluding that magic or harm is present."
      },
      {
        question: "Is a black snake dream worse than a normal snake dream?",
        answer:
          "Colour changes the emotional tone, but it does not fix the meaning. A calm black snake can feel very different from an aggressive one, and context — action, place, and the dreamer's life — matters more than colour alone."
      },
      {
        question: "What should I do after a black snake dream?",
        answer:
          "If it frightened you, follow the traditional etiquette: seek refuge in Allah from its evil and do not dwell on it. It can also help to name what feels dark or unknown in your life and consider addressing it directly."
      }
    ],
    relatedArticles: [
      { href: "/guides/snake-bite-dream-islam", label: "Snake Bite Dream Meaning in Islam" },
      { href: "/guides/green-snake-dream-islam", label: "Green Snake Dream Meaning in Islam" },
      { href: "/guides/snake-in-house-dream-islam", label: "Snake in the House Dream Meaning in Islam" }
    ],
    relatedSymbols: [
      { href: "/dreams/dead-person-dream-islam", label: "Dead Person Dream Meaning in Islam" },
      { href: "/dreams/water-dream-islam", label: "Water Dream Meaning in Islam" }
    ],
    hubSymbol: { href: "/dreams/snake-dream-islam", label: "Snake Dream Meaning in Islam" },
    hubEntityId: "snake"
  },

  "killing-snake-dream-islam": {
    slug: "killing-snake-dream-islam",
    keyword: "killing snake in dream islam",
    searchIntent:
      "The searcher killed a snake in a dream and wants to know what it means from an Islamic perspective, and whether it is a good or bad sign.",
    title: "Killing a Snake in a Dream in Islam",
    description:
      "Dreams in which you kill a snake often carry a feeling of relief or victory. Explore what this may reflect and what it does not prove. Not predictions.",
    quickAnswer:
      "A dream in which you kill a snake commonly carries a feeling of relief or victory. In personal reflection, this may mirror ending something that was troubling you — leaving a stressful situation, resolving a conflict, or finally addressing a problem. Some interpretive traditions associate overcoming a snake with facing a fear or difficulty with resolve. The dream does not prove that you have a real enemy who is now defeated, and it does not praise violence. The Islamic tradition reads dreams through context and is careful not to turn them into accusations or predictions. If the dream felt disturbing rather than relieving, it may reflect aggression you are carrying or a conflict that is not truly finished.",
    introduction: [
      "Killing a snake in a dream is often remembered with a strong feeling — relief, power, or sometimes unease. The feeling you carried into the day is part of the meaning.",
      "This article explores what the dream may reflect, what the Islamic tradition teaches about such dreams, and what it does not prove."
    ],
    islamicPerspective: [
      {
        title: "Dreams are read through context and feelings",
        body: [
          "Islamic dream interpretation traditions read symbols through the details of the dream and the circumstances of the dreamer. An action such as killing a snake is understood together with how it felt and what happened afterwards.",
          "There is no single automatic meaning for killing a snake, and the tradition warns against treating dreams as accusations against real people."
        ]
      },
      {
        title: "Disturbing dreams and the traditional response",
        body: [
          "If the dream left you disturbed rather than relieved, the hadith guidance applies: a frightening dream is not treated as a fixed sign, and the response is to seek refuge in Allah from its evil and not to dwell on it.",
          "The tradition does not present dreams as grounds for concluding that a specific person is an enemy."
        ],
        sourceIds: ["bukhari-6986", "bukhari-7044"]
      }
    ],
    interpretations: [
      {
        title: "Ending something that troubled you",
        body: [
          "In personal reflection, killing a snake may picture ending something that was troubling you — leaving a stressful situation, resolving a long argument, or finally addressing a problem you had avoided.",
          "This reading is a reflective tool, not a fixed Islamic meaning."
        ]
      },
      {
        title: "A sense of agency and resolve",
        body: [
          "The dream may be a picture of your own sense of agency — of standing up to something rather than being controlled by it. The value is practical: it can help you name what you are ready to face."
        ]
      },
      {
        title: "Aggression or unfinished conflict",
        body: [
          "If the dream felt violent or disturbing rather than relieving, it may reflect aggression you are carrying, or a conflict that is not truly finished. The dream may be inviting you to notice that weight rather than to celebrate it."
        ]
      }
    ],
    scenarios: [
      {
        id: "killed-with-relief",
        title: "Killed the snake and felt relief",
        body: [
          "Relief after killing the snake often reflects resolution — a conflict ended, a fear faced, or a burden set down. The dream may mark the close of something in your life."
        ]
      },
      {
        id: "killed-with-regret",
        title: "Killed the snake and felt uneasy",
        body: [
          "If you felt uneasy or guilty, the dream may reflect discomfort with how something was handled — an argument, a decision, or a situation where you acted forcefully."
        ]
      },
      {
        id: "tried-to-kill",
        title: "Tried to kill the snake but failed",
        body: [
          "A failed attempt may picture a problem that keeps returning despite your efforts. It may be worth changing approach rather than repeating the same one."
        ]
      }
    ],
    reflectionQuestions: [
      "How did you feel after killing the snake — relieved, powerful, uneasy, or something else?",
      "What in your life have you recently ended, resolved, or confronted?",
      "Was there a conflict you wish were truly finished?",
      "If the dream were a picture of your own strength, what would it be saying you are ready to face?"
    ],
    whatItDoesNotProve: [
      "That you have a real enemy who is now defeated. A dream is not evidence against any real person.",
      "That violence or confrontation is being praised. The dream is a picture of the mind, not a religious endorsement of aggression.",
      "That the dream is a prediction of victory or success in a real conflict.",
      "That magic or the unseen is at work."
    ],
    faq: [
      {
        question: "Is killing a snake in a dream good in Islam?",
        answer:
          "It depends on the feeling and the context. If the dream brought relief, it may reflect ending something troubling in your life. The Islamic tradition reads dreams through context and does not assign one fixed meaning to the action."
      },
      {
        question: "Does killing a snake in a dream mean I defeated an enemy?",
        answer:
          "No. A dream is not evidence that a specific person is an enemy or that you have defeated one. The tradition explicitly guards against turning dreams into accusations."
      },
      {
        question: "What if the dream felt violent and disturbing?",
        answer:
          "If the dream disturbed you rather than relieved you, it may reflect aggression you are carrying or a conflict that is not finished. The traditional response to a disturbing dream is seeking refuge in Allah and not dwelling on it."
      }
    ],
    relatedArticles: [
      { href: "/guides/snake-bite-dream-islam", label: "Snake Bite Dream Meaning in Islam" },
      { href: "/guides/snake-in-house-dream-islam", label: "Snake in the House Dream Meaning in Islam" },
      { href: "/guides/black-snake-dream-islam", label: "Black Snake Dream Meaning in Islam" }
    ],
    relatedSymbols: [
      { href: "/dreams/water-dream-islam", label: "Water Dream Meaning in Islam" },
      { href: "/dreams/pregnancy-dream-islam", label: "Pregnancy Dream Meaning in Islam" }
    ],
    hubSymbol: { href: "/dreams/snake-dream-islam", label: "Snake Dream Meaning in Islam" },
    hubEntityId: "snake"
  },

  "snake-in-house-dream-islam": {
    slug: "snake-in-house-dream-islam",
    keyword: "snake in house dream islam",
    searchIntent:
      "The searcher found a snake inside their home in a dream and wants to know what it means from an Islamic perspective, especially for family or private life.",
    title: "Snake in the House Dream Meaning in Islam",
    description:
      "A snake inside your home in a dream brings the symbol into family and private life. Explore what it may reflect and what it does not prove. Not predictions.",
    quickAnswer:
      "When a snake appears inside your house in a dream, the dream is often read in relation to your home life — family, privacy, or a situation inside your personal world. Where in the house the snake was, and whether it was aggressive, matters more than the snake itself. In personal reflection, this may point to tension within the household, or to something at home that feels invasive, unresolved, or hard to ignore. If you calmly removed or avoided the snake, the dream may reflect handling a domestic concern with composure. A snake in the home does not prove that a family member is an enemy or that your home is under spiritual threat. The tradition reads dreams through context and is careful not to turn them into accusations.",
    introduction: [
      "A snake inside the house feels different from one in a field or forest — the home is the space of family, privacy, and rest. Where the dream places the snake matters.",
      "This article explores what a snake in the house may reflect, what the Islamic tradition teaches, and what the dream does not prove."
    ],
    islamicPerspective: [
      {
        title: "Place shapes the reading",
        body: [
          "Islamic dream interpretation traditions read symbols through their context, and the place where a symbol appears is part of that context. A snake inside the home is understood in relation to family and private life rather than as a general symbol.",
          "The tradition does not teach that a snake in the house proves a family member is an enemy or that the home is under spiritual threat."
        ]
      },
      {
        title: "Disturbing dreams and the traditional response",
        body: [
          "If the dream frightened you, the hadith guidance applies: a disturbing dream is not treated as a fixed sign of harm, and the response is to seek refuge in Allah from its evil and not to dwell on it.",
          "The tradition warns against using dreams to accuse real people, including family members."
        ],
        sourceIds: ["bukhari-6986", "bukhari-7044"]
      }
    ],
    interpretations: [
      {
        title: "Tension within the household",
        body: [
          "In personal reflection, a snake in the house may point to tension within the household — an unresolved argument, a strained relationship, or a situation at home that feels hard to ignore.",
          "This reading is a reflective tool, not a fixed Islamic meaning."
        ]
      },
      {
        title: "Something invasive in your private world",
        body: [
          "The dream may picture something that feels invasive in your private life — a boundary crossed, a secret pressing on you, or a worry that has followed you home."
        ]
      },
      {
        title: "Handling a domestic concern with composure",
        body: [
          "If you calmly removed or avoided the snake, the dream may reflect your ability to handle a domestic concern with steadiness. The value of the reflection is practical: it can help you name what at home needs honest attention."
        ]
      }
    ],
    scenarios: [
      {
        id: "snake-in-living-room",
        title: "Snake in the living room",
        body: [
          "The living room is where family gathers. A snake there may picture something affecting the household as a whole — an argument, a shared worry, or a change everyone is navigating."
        ]
      },
      {
        id: "snake-in-bedroom",
        title: "Snake in the bedroom",
        body: [
          "The bedroom is the most private space. A snake there may point to something close and personal — a relationship concern, a worry about sleep and rest, or something you carry alone."
        ]
      },
      {
        id: "snake-in-kitchen",
        title: "Snake in the kitchen",
        body: [
          "The kitchen is tied to nourishment and daily care. A snake there may picture something about how the household is being cared for, or a daily routine that feels disrupted."
        ]
      }
    ],
    reflectionQuestions: [
      "Which room was the snake in, and what does that room mean to you?",
      "Was there tension or a difficult conversation at home in the days before the dream?",
      "If the snake were a picture of something inside your private world, what would it be?",
      "Did you handle the snake calmly, or did it control the situation?"
    ],
    whatItDoesNotProve: [
      "That a family member is an enemy or intends harm.",
      "That your home is under spiritual threat or affected by magic.",
      "That something hidden is happening inside your home.",
      "That the dream is a prediction about your family."
    ],
    faq: [
      {
        question: "Does a snake in the house dream mean a family member is an enemy?",
        answer:
          "No. A dream is not evidence against any real person, including family. The tradition explicitly guards against turning dreams into accusations. If a relationship concern surfaces, it is better addressed directly and honestly."
      },
      {
        question: "Does a snake in the house dream mean my home is cursed?",
        answer:
          "No. The Islamic tradition does not teach that a snake in a dream proves magic or spiritual harm. The response to a frightening dream is seeking refuge in Allah, not concluding that the unseen is at work."
      },
      {
        question: "What should I do after dreaming of a snake in the house?",
        answer:
          "If it frightened you, follow the traditional etiquette: seek refuge in Allah from its evil and do not dwell on it. It can also help to reflect on what at home feels tense or unresolved and to address it honestly."
      }
    ],
    relatedArticles: [
      { href: "/guides/snake-bite-dream-islam", label: "Snake Bite Dream Meaning in Islam" },
      { href: "/guides/black-snake-dream-islam", label: "Black Snake Dream Meaning in Islam" },
      { href: "/guides/killing-snake-dream-islam", label: "Killing a Snake in a Dream in Islam" }
    ],
    relatedSymbols: [
      { href: "/dreams/dead-person-dream-islam", label: "Dead Person Dream Meaning in Islam" },
      { href: "/dreams/teeth-falling-out-islam", label: "Teeth Falling Out Dream Meaning in Islam" }
    ],
    hubSymbol: { href: "/dreams/snake-dream-islam", label: "Snake Dream Meaning in Islam" },
    hubEntityId: "snake"
  },

  "green-snake-dream-islam": {
    slug: "green-snake-dream-islam",
    keyword: "green snake dream meaning islam",
    searchIntent:
      "The searcher dreamed of a green snake and wants to know whether the colour changes the meaning from an Islamic perspective.",
    title: "Green Snake Dream Meaning in Islam",
    description:
      "A green snake in a dream often feels calmer and can be explored as an image of renewal or growth. Explore what the colour adds and what it does not fix. Not predictions.",
    quickAnswer:
      "A green snake often feels calmer than a dark one, and the colour can shape the emotional tone of the dream. In personal reflection, a green snake may be explored as an image of renewal, growth, or a healing period in your life — particularly if the colour felt life-giving to you. This does not mean a green snake has one fixed meaning: it is an invitation to notice how the colour changed your response, and what growth or quietness might be appearing in your life. Even a calm green snake may still point to something you are watching cautiously — growth can be welcome and uncomfortable at the same time. A green snake dream does not prove the dream is a guaranteed sign of good fortune, and the Islamic tradition reads dreams through context rather than assigning automatic meanings.",
    introduction: [
      "Green is often associated with calm, growth, and renewal, so a green snake can feel very different from a black one. The colour is worth noticing — and worth not turning into a fixed verdict.",
      "This article looks at what green may add to a snake dream, how to reflect on it, and what the dream does not prove."
    ],
    islamicPerspective: [
      {
        title: "Colour shapes the tone, not the verdict",
        body: [
          "Islamic dream interpretation traditions read symbols through context, and colour is part of that context. Green may change how a snake dream feels, but the tradition does not assign one automatic meaning to a green snake.",
          "Context — what the snake was doing, where it was, how you felt — matters more than colour alone."
        ]
      },
      {
        title: "Dreams are read with care, not as guarantees",
        body: [
          "The Qur'an records dreams that carried real significance for prophets, interpreted with care. The tradition is careful not to treat ordinary dreams as guaranteed signs.",
          "A pleasant or calm dream can be received with gratitude without being read as a promise of fortune."
        ],
        sourceIds: ["quran-yusuf-12-4-6", "quran-yusuf-12-43"]
      }
    ],
    interpretations: [
      {
        title: "Renewal and growth",
        body: [
          "In personal reflection, a green snake may be explored as a symbol of renewal, growth, or a healing period in your life — especially if green felt calm or life-giving to you.",
          "This reading is a reflective tool, not a fixed Islamic meaning."
        ]
      },
      {
        title: "Quietness and watching",
        body: [
          "A green snake may picture something you are watching quietly — a situation developing slowly, a relationship growing, or a change you are not yet sure about."
        ]
      },
      {
        title: "Growth that is also uncomfortable",
        body: [
          "Growth can be welcome and uncomfortable at the same time. A calm green snake may still point to a transition that asks something of you."
        ]
      }
    ],
    scenarios: [
      {
        id: "green-snake-calm",
        title: "A calm green snake",
        body: [
          "If the snake was still and you felt curious or peaceful, the dream may picture something quietly growing or healing in your life."
        ]
      },
      {
        id: "green-snake-moving",
        title: "A moving green snake",
        body: [
          "If the snake was moving but not threatening, it may picture a change in motion — something developing that you are watching rather than controlling."
        ]
      },
      {
        id: "green-snake-in-garden",
        title: "A green snake in a garden",
        body: [
          "A garden adds its own layer of growth and care. The combination may picture something you are cultivating — a project, a relationship, or your own wellbeing."
        ]
      }
    ],
    reflectionQuestions: [
      "How did the colour green change how you felt about the snake?",
      "What is quietly growing or healing in your life right now?",
      "If the snake were a picture of something developing slowly, what would it be?",
      "Is there growth you are welcoming, and growth you are still cautious about?"
    ],
    whatItDoesNotProve: [
      "That the dream is a guaranteed sign of good fortune.",
      "That every green snake dream carries the same meaning.",
      "That the dream is a promise of wealth, health, or success.",
      "That the unseen or supernatural is at work in a positive or negative way."
    ],
    faq: [
      {
        question: "Is a green snake dream a good sign in Islam?",
        answer:
          "Green often feels calmer and may be explored as an image of renewal or growth, but the Islamic tradition does not assign one fixed meaning to a green snake. Context matters more than colour alone, and a dream is not a guaranteed sign of good fortune."
      },
      {
        question: "Does the colour of a snake change its meaning?",
        answer:
          "Colour shapes the emotional tone of the dream, but it does not fix the meaning. A calm green snake feels very different from an aggressive dark one, and action, place, and the dreamer's life matter more than colour alone."
      },
      {
        question: "What should I do after a green snake dream?",
        answer:
          "If the dream felt pleasant, you may receive it with gratitude and notice what is growing or healing in your life. If any part of it unsettled you, the traditional response to a disturbing dream — seeking refuge in Allah and not dwelling on it — applies."
      }
    ],
    relatedArticles: [
      { href: "/guides/black-snake-dream-islam", label: "Black Snake Dream Meaning in Islam" },
      { href: "/guides/snake-bite-dream-islam", label: "Snake Bite Dream Meaning in Islam" },
      { href: "/guides/snake-in-house-dream-islam", label: "Snake in the House Dream Meaning in Islam" }
    ],
    relatedSymbols: [
      { href: "/dreams/water-dream-islam", label: "Water Dream Meaning in Islam" },
      { href: "/dreams/pregnancy-dream-islam", label: "Pregnancy Dream Meaning in Islam" }
    ],
    hubSymbol: { href: "/dreams/snake-dream-islam", label: "Snake Dream Meaning in Islam" },
    hubEntityId: "snake"
  },

  /* ================================================================
   * Dead Person Cluster (Phase 7 — Core Dream Symbols Migration)
   * ============================================================== */

  "dead-person-talking-in-dream-islam": {
    slug: "dead-person-talking-in-dream-islam",
    keyword: "talking to dead person in dream islam",
    searchIntent:
      "The searcher talked with someone who has passed away in a dream and wants to know what the conversation means from an Islamic perspective, and whether it is a real message.",
    title: "Talking to a Dead Person in a Dream in Islam",
    description:
      "A conversation with someone who has passed away is deeply meaningful. Explore what the tradition teaches, what it does not prove, and how to reflect on it. Not predictions.",
    quickAnswer:
      "Talking with someone who has passed away in a dream is a common and emotionally powerful experience. In personal reflection, it may picture something you wish you had said, a question that never got an answer, or a reassurance you are seeking. The Islamic tradition is careful here: the hadith describe dreams as coming from Allah, from Satan, or from the self, and no dream — however vivid — is treated as certain proof that the deceased is communicating from beyond. A conversation in a dream does not prove that the person is delivering a real message, that their state in the afterlife is being revealed, or that you are being commanded to do something. The tradition reads such dreams with care and gentleness, and the meaning is found through the dreamer's own circumstances and feelings.",
    introduction: [
      "A conversation with someone who has died can feel more real than the dream itself. It is a deeply human experience, and it deserves a gentle and careful reading.",
      "This article looks at what the Islamic tradition teaches about such dreams, what they may reflect in your own life, and the careful limits on claiming that the deceased 'spoke'."
    ],
    islamicPerspective: [
      {
        title: "Dreams are of different kinds",
        body: [
          "The hadith describe dreams as coming from three sources: a good dream from Allah, a disturbing dream from Satan, and a dream from the self — one's own thoughts and experiences. A dream of talking with the deceased is not automatically any one of these.",
          "The tradition is careful not to turn dreams into certainties, and this applies especially to dreams about those who have passed."
        ],
        sourceIds: ["muslim-2263a"]
      },
      {
        title: "The careful limits on claiming a message",
        body: [
          "No dream — however vivid — is treated in the tradition as certain evidence that a deceased person is communicating from beyond. A conversation in a dream is read with care, through the dreamer's own circumstances.",
          "If the dream disturbs you, the traditional response is to seek refuge in Allah from its evil and not to dwell on it."
        ],
        sourceIds: ["bukhari-6986", "bukhari-7044"]
      }
    ],
    interpretations: [
      {
        title: "Words you wished you had said",
        body: [
          "In personal reflection, a conversation with the deceased often pictures something you never got to say — a thank-you, an apology, a question, or a goodbye. The dream gives you the conversation in the only place it can still happen.",
          "This reading is a reflective tool, not a fixed Islamic meaning."
        ]
      },
      {
        title: "Reassurance you are seeking",
        body: [
          "If the person said something comforting, the dream may reflect a reassurance you are looking for — about them, about yourself, or about how you are handling the loss."
        ]
      },
      {
        title: "Unfinished emotion, pictured as conversation",
        body: [
          "Grief often holds unfinished emotion. A dream of talking with the deceased may be your mind's way of picturing something that still needs to be named or held."
        ]
      }
    ],
    scenarios: [
      {
        id: "they-comforted-you",
        title: "The deceased comforted you",
        body: [
          "If the person said something kind or settling, the dream may reflect a wish for peace — for them and for yourself. It may be received as comfort without needing to be proven."
        ]
      },
      {
        id: "they-warned-you",
        title: "The deceased warned you",
        body: [
          "A warning from the deceased in a dream can feel heavy. In reflection, it may picture a concern that is already your own — about a situation, a choice, or a habit — voiced through the person you trust. It is not treated as a command from beyond."
        ]
      },
      {
        id: "you-could-not-hear",
        title: "You could not hear them",
        body: [
          "If you tried to speak but could not, or could not hear the answer, the dream may picture something still unresolved — a conversation that cannot finish because the loss has not finished being processed."
        ]
      }
    ],
    reflectionQuestions: [
      "What did you want to say to this person that you never got to say?",
      "Was the conversation comforting, unsettling, or unfinished — and what does that feeling tell you?",
      "If the words they spoke were your own wish, what would they be asking you to hear?",
      "Is there a grief or a goodbye you have not fully carried?"
    ],
    whatItDoesNotProve: [
      "That the deceased is literally communicating with you from beyond.",
      "That their state in the afterlife is being revealed.",
      "That you are being commanded or warned by the deceased. No dream overrides your own judgement.",
      "That death or harm is coming."
    ],
    faq: [
      {
        question: "Is talking to a dead person in a dream a real message in Islam?",
        answer:
          "The Islamic tradition is careful not to treat any dream as certain proof of communication from beyond. The hadith describe dreams as coming from Allah, from Satan, or from the self. A conversation with the deceased is read with care, through the dreamer's own circumstances, not as a literal message."
      },
      {
        question: "Can the dead speak to you in a dream?",
        answer:
          "People experience such dreams vividly, but the tradition does not treat them as certain evidence of communication from the deceased. A conversation in a dream is most often explored as a reflection of memory, grief, and the words left unsaid."
      },
      {
        question: "What should I do after talking to a dead person in a dream?",
        answer:
          "Let the feeling be what it is. If the dream comforted you, you may receive it gently. If it unsettled you, the traditional response to a disturbing dream — seeking refuge in Allah and not dwelling on it — applies. If it brings up grief, talking with someone you trust is a healthy step."
      }
    ],
    relatedArticles: [
      { href: "/guides/dead-person-smiling-in-dream-islam", label: "A Dead Person Smiling in a Dream" },
      { href: "/guides/dead-person-giving-something-dream-islam", label: "A Dead Person Giving You Something in a Dream" },
      { href: "/guides/dead-person-alive-again-dream-islam", label: "Seeing a Dead Person Alive in a Dream" }
    ],
    relatedSymbols: [
      { href: "/dreams/dead-person-dream-islam", label: "Dead Person Dream Meaning in Islam" },
      { href: "/dreams/teeth-falling-out-islam", label: "Teeth Falling Out Dream Meaning in Islam" }
    ],
    hubSymbol: { href: "/dreams/dead-person-dream-islam", label: "Dead Person Dream Meaning in Islam" },
    hubEntityId: "dead-person"
  },

  "dead-person-giving-something-dream-islam": {
    slug: "dead-person-giving-something-dream-islam",
    keyword: "dead person giving something in dream islam",
    searchIntent:
      "The searcher received something from a deceased person in a dream and wants to know what it means from an Islamic perspective.",
    title: "A Dead Person Giving You Something in a Dream in Islam",
    description:
      "Receiving something from the deceased in a dream is often read through memory and what the person left behind. Explore what it may reflect and what it does not prove. Not predictions.",
    quickAnswer:
      "If someone who has passed away gave you something in a dream — an object, food, words, or a gift — it may picture what they left behind in your life: a value, a lesson, a responsibility, or a memory. In personal reflection, a gift from the deceased is most often explored through memory and inheritance of character rather than as a literal event. The Islamic tradition is careful here: the hadith describe dreams as coming from Allah, from Satan, or from the self, and no dream is treated as certain evidence of the unseen. A gift in a dream does not prove that the deceased is commanding you from beyond, that a material inheritance is being promised, or that their state in the afterlife is being revealed. It is read through the dreamer's own circumstances and the person's place in their life.",
    introduction: [
      "Receiving something from someone who has died in a dream can feel startlingly real — a gift that arrives from a hand you thought you would never hold again.",
      "This article looks at what such a gift may reflect, what the Islamic tradition teaches, and what the dream does not prove."
    ],
    islamicPerspective: [
      {
        title: "Dreams are of different kinds",
        body: [
          "The hadith describe dreams as coming from three sources: a good dream from Allah, a disturbing dream from Satan, and a dream from the self — one's own thoughts and experiences. A gift from the deceased is not automatically any one of these.",
          "The tradition is careful not to turn dreams into certainties about the unseen."
        ],
        sourceIds: ["muslim-2263a"]
      },
      {
        title: "No command comes from beyond",
        body: [
          "No dream — however vivid — is treated in the tradition as a command from the deceased or as evidence about their state.",
          "A gift in a dream is read with care, through the dreamer's own life and the person's place in it."
        ],
        sourceIds: ["bukhari-6986", "bukhari-7044"]
      }
    ],
    interpretations: [
      {
        title: "What they left behind in you",
        body: [
          "In personal reflection, a gift from the deceased often pictures what the person left in you — a value, a lesson, a way of caring, or a responsibility you now carry in their place.",
          "This reading is a reflective tool, not a fixed Islamic meaning."
        ]
      },
      {
        title: "A memory made tangible",
        body: [
          "The object given in the dream may be something the person actually valued or gave in life. The dream may be making a memory tangible again."
        ]
      },
      {
        title: "Something you are being asked to carry",
        body: [
          "If the gift felt like a responsibility, it may reflect something you are already carrying — a role, a trust, or a duty — now pictured as something handed to you."
        ]
      }
    ],
    scenarios: [
      {
        id: "gave-food",
        title: "The deceased gave you food",
        body: [
          "Food in a dream often pictures nourishment. A gift of food from the deceased may reflect care and provision — the ways they nourished you in life, continuing in memory."
        ]
      },
      {
        id: "gave-an-object",
        title: "The deceased gave you an object",
        body: [
          "If the object was something they valued or gave in life, the dream may be connecting you with that memory. If it was unfamiliar, notice what it felt like to receive it."
        ]
      },
      {
        id: "gave-words",
        title: "The deceased gave you words",
        body: [
          "Words from the deceased are a kind of gift. They may reflect guidance, comfort, or a message your own heart needs to hear — voiced through the person you trust."
        ]
      }
    ],
    reflectionQuestions: [
      "What did the gift represent to you — care, a lesson, a responsibility, a memory?",
      "What did this person give you in life that you still carry?",
      "If the gift were something you need to receive right now, what would it be?",
      "Is there a responsibility or role you carry because of this person?"
    ],
    whatItDoesNotProve: [
      "That the deceased is commanding you or sending you a literal gift from beyond.",
      "That a material inheritance or wealth is being promised.",
      "That the deceased's state in the afterlife is being revealed.",
      "That the dream is a sign about your own future."
    ],
    faq: [
      {
        question: "What does it mean if a dead person gives me something in a dream in Islam?",
        answer:
          "In personal reflection, a gift from the deceased is most often explored through memory and what the person left behind in your life — a value, a lesson, or a responsibility. The tradition is careful not to treat it as a literal event or a command from beyond."
      },
      {
        question: "If a dead person gives me money in a dream, is it a sign of wealth?",
        answer:
          "Money in a dream is not treated in the tradition as a promise of material wealth. It is read through the dreamer's circumstances — and a gift from the deceased is most often a picture of what they left in you, not a forecast of finances."
      },
      {
        question: "Should I act on something a dead person told me in a dream?",
        answer:
          "No dream overrides your own judgement or religious obligations. A dream of the deceased is read with care and is not treated as a command. If it raises a real concern, weigh it with your own judgement and, for religious questions, a qualified scholar."
      }
    ],
    relatedArticles: [
      { href: "/guides/dead-person-talking-in-dream-islam", label: "Talking to a Dead Person in a Dream" },
      { href: "/guides/dead-person-smiling-in-dream-islam", label: "A Dead Person Smiling in a Dream" },
      { href: "/guides/dead-person-alive-again-dream-islam", label: "Seeing a Dead Person Alive in a Dream" }
    ],
    relatedSymbols: [
      { href: "/dreams/dead-person-dream-islam", label: "Dead Person Dream Meaning in Islam" },
      { href: "/dreams/water-dream-islam", label: "Water Dream Meaning in Islam" }
    ],
    hubSymbol: { href: "/dreams/dead-person-dream-islam", label: "Dead Person Dream Meaning in Islam" },
    hubEntityId: "dead-person"
  },

  "dead-person-alive-again-dream-islam": {
    slug: "dead-person-alive-again-dream-islam",
    keyword: "dead person alive again in dream islam",
    searchIntent:
      "The searcher saw a deceased person alive again in a dream and wants to know what it means from an Islamic perspective.",
    title: "Seeing a Dead Person Alive in a Dream in Islam",
    description:
      "Seeing someone who has passed away alive and well in a dream is common and often carries longing. Explore what it may reflect and what it does not prove. Not predictions.",
    quickAnswer:
      "Seeing someone who has died alive and well in a dream is a very common experience, and it usually carries longing. In personal reflection, it may picture the wish that the loss had not happened, or a part of that person still living in your memory and values. The Islamic tradition reads dreams through context: the hadith describe dreams as coming from Allah, from Satan, or from the self, and no dream is treated as proof of the unseen. Seeing the deceased alive does not prove that the person is literally alive, that a miracle or supernatural event is occurring, or that death itself is being reversed. It is most often a picture of memory, love, and the continuing presence of the person in your life and heart.",
    introduction: [
      "Seeing someone who has passed away alive again in a dream can bring a rush of joy — and then the ache of waking. It is one of the most common and most human dream experiences.",
      "This article looks at what this dream may reflect, what the Islamic tradition teaches, and what it does not prove."
    ],
    islamicPerspective: [
      {
        title: "Dreams are read through the self and circumstance",
        body: [
          "The hadith describe dreams as coming from Allah, from Satan, or from the self — one's own thoughts, wishes, and experiences. A dream of the deceased alive again most often belongs to the self: the longing of a heart that misses someone.",
          "The tradition is careful not to treat such dreams as evidence of the unseen."
        ],
        sourceIds: ["muslim-2263a"]
      },
      {
        title: "The tradition's gentle limits",
        body: [
          "The Islamic tradition does not teach that seeing the deceased alive in a dream means death is undone or that a supernatural event has occurred.",
          "If the dream disturbs you, the response is calm and seeking refuge in Allah, not searching for a hidden sign."
        ],
        sourceIds: ["bukhari-6986", "bukhari-7044"]
      }
    ],
    interpretations: [
      {
        title: "The wish that the loss had not happened",
        body: [
          "In personal reflection, seeing the deceased alive again often pictures the most human of wishes — that the loss had not happened. The dream gives that wish a body for a few hours.",
          "This reading is a reflective tool, not a fixed Islamic meaning."
        ]
      },
      {
        title: "Their life continuing in you",
        body: [
          "The person may be alive in the dream because they are alive in you — in your memory, your values, the stories you carry, and the ways you live differently because of them."
        ]
      },
      {
        title: "A heart still adjusting to loss",
        body: [
          "After a loss, the mind takes time to adjust. A dream of the person alive may be part of that adjustment — the heart returning to the fact, gently and gradually."
        ]
      }
    ],
    scenarios: [
      {
        id: "alive-and-well",
        title: "Alive and well",
        body: [
          "If the person appeared healthy and at ease, the dream may picture your wish for them and the good you remember. It may be received as a comforting image of the person as you want to remember them."
        ]
      },
      {
        id: "alive-and-you-rejoiced",
        title: "Alive, and you rejoiced",
        body: [
          "If the dream brought joy and then sorrow on waking, it may reflect the depth of the loss and the love behind it. The dream is a measure of how much the person matters to you."
        ]
      },
      {
        id: "alive-but-distant",
        title: "Alive but distant",
        body: [
          "If the person was alive but unreachable, the dream may picture the contradiction of loss — someone present in memory but absent in life."
        ]
      }
    ],
    reflectionQuestions: [
      "What did it feel like to see them alive — joy, relief, confusion, grief?",
      "What part of this person still lives in you — a value, a habit, a story?",
      "If the dream were a picture of your longing, what would it be asking you to hold gently?",
      "How is your grief changing, and is this dream part of that process?"
    ],
    whatItDoesNotProve: [
      "That the person is literally alive.",
      "That a miracle or supernatural event is occurring.",
      "That death has been reversed or that the unseen is at work.",
      "That the dream is a sign about your own future."
    ],
    faq: [
      {
        question: "What does it mean if I see a dead person alive in my dream in Islam?",
        answer:
          "It is a common and human experience, most often read through longing and memory. The tradition describes dreams as coming from Allah, from Satan, or from the self, and seeing the deceased alive usually reflects the self — the wish that the loss had not happened and the person's continuing place in your heart."
      },
      {
        question: "Does seeing a dead person alive mean they have come back?",
        answer:
          "No. The dream is not treated in the tradition as evidence that death is undone or that a supernatural event has occurred. It is a picture of memory, love, and longing."
      },
      {
        question: "Why do I keep dreaming of the person alive?",
        answer:
          "Repeating dreams of the deceased often accompany grief that is still being processed. It may help to write the dreams down, talk with someone you trust, and give the grief the time and care it needs."
      }
    ],
    relatedArticles: [
      { href: "/guides/dead-person-talking-in-dream-islam", label: "Talking to a Dead Person in a Dream" },
      { href: "/guides/dead-person-smiling-in-dream-islam", label: "A Dead Person Smiling in a Dream" },
      { href: "/guides/dead-person-giving-something-dream-islam", label: "A Dead Person Giving You Something in a Dream" }
    ],
    relatedSymbols: [
      { href: "/dreams/dead-person-dream-islam", label: "Dead Person Dream Meaning in Islam" },
      { href: "/dreams/pregnancy-dream-islam", label: "Pregnancy Dream Meaning in Islam" }
    ],
    hubSymbol: { href: "/dreams/dead-person-dream-islam", label: "Dead Person Dream Meaning in Islam" },
    hubEntityId: "dead-person"
  },

  "dead-person-smiling-in-dream-islam": {
    slug: "dead-person-smiling-in-dream-islam",
    keyword: "dead person smiling in dream islam",
    searchIntent:
      "The searcher saw a deceased person smiling in a dream and wants to know what it means from an Islamic perspective, and whether it is a good sign about the deceased.",
    title: "A Dead Person Smiling in a Dream in Islam",
    description:
      "A smiling deceased person often brings comfort. Explore what the tradition teaches, what the smile may reflect, and what it does not prove. Not predictions.",
    quickAnswer:
      "A smile from someone who has passed away in a dream is often experienced as reassurance and comfort. In personal reflection, it may picture the good you remember about them, a sense of being forgiven or at peace, or your own hope for their peace. The Islamic tradition is gentle here: a comforting dream may be received with gratitude without being turned into a claim about the person's state. A smile in a dream does not prove that the deceased is at peace in the afterlife, that they are approving or disapproving of your life, or that a specific outcome will occur. The tradition reads dreams with care, and the meaning is found through the dreamer's own feelings and circumstances.",
    introduction: [
      "A smile from someone who has died can feel like a gift — a moment of peace in the middle of grief. It is a common and often treasured experience.",
      "This article looks at what the smile may reflect, what the Islamic tradition teaches, and the careful limits on reading it as a verdict about the deceased."
    ],
    islamicPerspective: [
      {
        title: "Comforting dreams may be received gently",
        body: [
          "The hadith describe a good dream as a kind of glad tidings, and the tradition is gentle with dreams that bring comfort. A peaceful dream of a loved one may be received with gratitude.",
          "This gentleness does not require turning the dream into a claim about the afterlife."
        ],
        sourceIds: ["muslim-2263a", "bukhari-6985"]
      },
      {
        title: "Dreams are not verdicts about the unseen",
        body: [
          "The tradition is careful not to treat dreams as certain evidence about the unseen. A smile in a dream is not proof of the deceased's eternal state.",
          "It is a comfort to you, not a report about them."
        ],
        sourceIds: ["muslim-2263a"]
      }
    ],
    interpretations: [
      {
        title: "The good you remember",
        body: [
          "In personal reflection, a smile from the deceased often pictures the good you carry — the warmth, the kindness, or the joy you remember. The dream gives that goodness a face again.",
          "This reading is a reflective tool, not a fixed Islamic meaning."
        ]
      },
      {
        title: "A wish for their peace",
        body: [
          "The smile may reflect your own hope that the person is at peace. It is a picture of your care for them, continuing after loss."
        ]
      },
      {
        title: "Reassurance in grief",
        body: [
          "During grief, the mind often seeks reassurance. A smiling deceased person in a dream may be that reassurance arriving in the form your heart can receive."
        ]
      }
    ],
    scenarios: [
      {
        id: "smiling-peacefully",
        title: "Smiling peacefully",
        body: [
          "A peaceful smile is most often received as comfort. It may picture the calm you wish for them and for yourself, and it may be held gently without needing proof."
        ]
      },
      {
        id: "smiling-and-speaking",
        title: "Smiling and speaking",
        body: [
          "If they smiled and spoke, notice what they said. The words may reflect a reassurance you are seeking, or something you wish they had said."
        ]
      },
      {
        id: "smiling-at-a-distance",
        title: "Smiling at a distance",
        body: [
          "If they smiled from a distance or did not come close, the dream may picture the loss itself — someone you can see and remember, but can no longer reach."
        ]
      }
    ],
    reflectionQuestions: [
      "What do you remember most about this person's smile in life?",
      "What would you most want them to be at peace about?",
      "If the smile were your own wish for them, what would it be asking you to let go of?",
      "Is the dream comforting you, or stirring grief — and can both be true?"
    ],
    whatItDoesNotProve: [
      "That the deceased's eternal state is known. A dream is not a verdict about the afterlife.",
      "That the deceased approves or disapproves of your life or choices.",
      "That a specific outcome or blessing will occur.",
      "That the dream is a sign of good fortune to come."
    ],
    faq: [
      {
        question: "Is a dead person smiling in a dream a good sign in Islam?",
        answer:
          "A smile from the deceased is often experienced as comfort, and a comforting dream may be received with gratitude in the tradition. But it is not treated as proof about the deceased's state in the afterlife. It is a comfort to the dreamer, not a verdict."
      },
      {
        question: "Does a smiling dead person mean they are at peace?",
        answer:
          "People often hope this, and the dream may reflect that hope. The Islamic tradition is careful not to treat dreams as certain evidence about the unseen, so the smile is best received as a comfort rather than as a report about the afterlife."
      },
      {
        question: "What should I do after dreaming of a smiling deceased person?",
        answer:
          "If the dream comforted you, you may receive it gently and let it sit with you. If it also stirred grief, that is natural — loss and comfort often arrive together. Talking with someone you trust is a healthy step."
      }
    ],
    relatedArticles: [
      { href: "/guides/dead-person-talking-in-dream-islam", label: "Talking to a Dead Person in a Dream" },
      { href: "/guides/dead-person-alive-again-dream-islam", label: "Seeing a Dead Person Alive in a Dream" },
      { href: "/guides/dead-person-giving-something-dream-islam", label: "A Dead Person Giving You Something in a Dream" }
    ],
    relatedSymbols: [
      { href: "/dreams/dead-person-dream-islam", label: "Dead Person Dream Meaning in Islam" },
      { href: "/dreams/water-dream-islam", label: "Water Dream Meaning in Islam" }
    ],
    hubSymbol: { href: "/dreams/dead-person-dream-islam", label: "Dead Person Dream Meaning in Islam" },
    hubEntityId: "dead-person"
  },

  /* ================================================================
   * Teeth Cluster (Phase 7 — Core Dream Symbols Migration)
   * ============================================================== */

  "teeth-falling-out-dream-islam": {
    slug: "teeth-falling-out-dream-islam",
    keyword: "teeth falling out dream meaning islam",
    searchIntent:
      "The searcher's teeth fell out in a dream and they want to know what it means from an Islamic perspective, and whether popular claims like death or money are true.",
    title: "Teeth Falling Out Dream Meaning in Islam",
    description:
      "Teeth falling out is one of the most searched dreams. Explore what the Islamic tradition teaches, what the dream may reflect, and what it does not prove. Not predictions.",
    quickAnswer:
      "Teeth falling out is among the most common dream reports, and in the Islamic tradition it is not given one fixed meaning. In personal reflection, it is most often explored as an image of loss or change: something in your life that is ending, being taken away, or slipping beyond your control — a role, a relationship, a sense of confidence, or a fear of ageing. Popular claims that a falling tooth means someone will die or that money is coming are not supported by the tradition. The hadith describe dreams as coming from Allah, from Satan, or from the self, and the tradition is careful not to turn ordinary dreams into forecasts. The meaning is found through the details of the dream and the dreamer's own circumstances.",
    introduction: [
      "Teeth falling out is one of the most commonly searched dreams, and it is often vivid enough to stay with a person all day. Because it is so common, it has collected many popular claims — and the Islamic tradition is more careful than that.",
      "This article looks at what the dream may reflect, what the tradition teaches, and what popular claims should be set aside."
    ],
    islamicPerspective: [
      {
        title: "The tradition does not assign fixed meanings",
        body: [
          "The hadith describe dreams as coming from three sources: a good dream from Allah, a disturbing dream from Satan, and a dream from the self — one's own thoughts and experiences. A teeth dream is not automatically any one of these.",
          "The tradition reads dreams through context and is careful not to turn ordinary dreams into certainties."
        ],
        sourceIds: ["muslim-2263a"]
      },
      {
        title: "Popular claims are not supported",
        body: [
          "Popular culture often says a tooth falling out means a death in the family or a windfall of money. The Islamic tradition does not support treating dreams as fixed forecasts of death, wealth, or harm.",
          "If such a claim disturbs you, the traditional response to a disturbing dream is calm and seeking refuge in Allah, not searching for an omen."
        ],
        sourceIds: ["bukhari-6986", "bukhari-7044"]
      }
    ],
    interpretations: [
      {
        title: "An image of loss or change",
        body: [
          "In personal reflection, teeth falling out is most often explored as a picture of loss or change — something ending, being taken away, or slipping beyond your control.",
          "This reading is a reflective tool, not a fixed Islamic meaning."
        ]
      },
      {
        title: "Anxiety about appearance and confidence",
        body: [
          "Teeth shape the smile and speech, so losing them in a dream may picture worry about how you appear to others — a presentation, a first impression, or a fear of being judged."
        ]
      },
      {
        title: "A worry your mind is processing",
        body: [
          "During stressful periods, the mind can picture worry as something being pulled away. A falling tooth may simply be a vivid image of a worry you are carrying."
        ]
      }
    ],
    scenarios: [
      {
        id: "all-teeth-fell-out",
        title: "All teeth fell out",
        body: [
          "Losing all your teeth at once feels total. In reflection, it may picture a fear of losing everything at once — control, identity, or a whole way of life — rather than one specific thing."
        ]
      },
      {
        id: "one-tooth-fell-out",
        title: "One tooth fell out",
        body: [
          "A single tooth may point to one specific loss or worry — one relationship, one task, one part of your life that feels threatened."
        ]
      },
      {
        id: "teeth-fell-and-regrew",
        title: "Teeth fell out, then grew back",
        body: [
          "If the teeth grew back, the dream may carry a hopeful note: loss followed by renewal, or a change that ends in growth."
        ]
      }
    ],
    reflectionQuestions: [
      "What in your life feels like it is being lost, changed, or pulled away right now?",
      "Was the dream about one tooth or many — and does that match one worry or many?",
      "Is there anxiety about how you appear or are judged that the dream might be picturing?",
      "If the dream were a picture of a worry, what would it be naming?"
    ],
    whatItDoesNotProve: [
      "That a specific person will die. Popular claims about teeth dreams and death are not supported by the tradition.",
      "That you will lose money or wealth.",
      "That your health is failing.",
      "That the dream is a forecast of harm or disaster."
    ],
    faq: [
      {
        question: "Does teeth falling out in a dream mean someone will die in Islam?",
        answer:
          "No. The popular claim that a falling tooth means a death is not supported by the Islamic tradition. The hadith describe dreams as coming from Allah, from Satan, or from the self, and dreams are not treated as fixed forecasts of death."
      },
      {
        question: "Does a tooth falling out in a dream mean money is coming?",
        answer:
          "Popular culture sometimes links teeth dreams to money, but the tradition does not support treating dreams as forecasts of wealth. A falling tooth is most often explored through loss, change, and the dreamer's own circumstances."
      },
      {
        question: "What should I do after dreaming of teeth falling out?",
        answer:
          "Write the dream down and note which teeth were involved and how you felt. Name what feels like it is being lost or changed in your life. If the dream frightened you, the traditional response is seeking refuge in Allah and not dwelling on it."
      }
    ],
    relatedArticles: [
      { href: "/guides/broken-teeth-dream-islam", label: "Broken Teeth Dream Meaning in Islam" },
      { href: "/guides/losing-front-teeth-dream-islam", label: "Losing Front Teeth Dream Meaning in Islam" },
      { href: "/guides/bleeding-teeth-dream-islam", label: "Bleeding Teeth Dream Meaning in Islam" }
    ],
    relatedSymbols: [
      { href: "/dreams/teeth-falling-out-islam", label: "Teeth Falling Out Dream Meaning in Islam" },
      { href: "/dreams/dead-person-dream-islam", label: "Dead Person Dream Meaning in Islam" }
    ],
    hubSymbol: { href: "/dreams/teeth-falling-out-islam", label: "Teeth Falling Out Dream Meaning in Islam" },
    hubEntityId: "teeth"
  },

  "broken-teeth-dream-islam": {
    slug: "broken-teeth-dream-islam",
    keyword: "broken teeth dream meaning islam",
    searchIntent:
      "The searcher's teeth broke or cracked in a dream and they want to know what it means from an Islamic perspective.",
    title: "Broken Teeth Dream Meaning in Islam",
    description:
      "A broken tooth in a dream feels like damage rather than loss. Explore what it may reflect, what the tradition teaches, and what it does not prove. Not predictions.",
    quickAnswer:
      "A broken or cracked tooth in a dream feels like damage rather than loss — something has been harmed or weakened, not just taken away. In personal reflection, it may picture a relationship, a reputation, a plan, or your own sense of strength that feels damaged or compromised. The Islamic tradition does not assign one fixed meaning to broken teeth: the hadith describe dreams as coming from Allah, from Satan, or from the self, and dreams are read through the dreamer's circumstances. A broken tooth does not prove that a specific person has been harmed, that your health is failing, or that harm is coming. The dream is best read through what felt damaged and how you responded to it.",
    introduction: [
      "A broken tooth in a dream feels different from one that falls out — it is damage, not loss. It can leave a feeling of something being weakened that should have been strong.",
      "This article looks at what a broken tooth may reflect, what the tradition teaches, and what the dream does not prove."
    ],
    islamicPerspective: [
      {
        title: "Dreams are read through context",
        body: [
          "The hadith describe dreams as coming from three sources: a good dream from Allah, a disturbing dream from Satan, and a dream from the self. A broken tooth is not automatically any one of these.",
          "The tradition is careful not to turn dreams into certainties, and a break in a dream is read through the dreamer's own circumstances."
        ],
        sourceIds: ["muslim-2263a"]
      },
      {
        title: "No claim of real damage",
        body: [
          "A broken tooth in a dream does not prove that something in your real life is damaged, that a person has been harmed, or that your health is failing.",
          "It is an image to reflect on, not a report of an actual event."
        ],
        sourceIds: ["bukhari-6986"]
      }
    ],
    interpretations: [
      {
        title: "Something feels weakened",
        body: [
          "In personal reflection, a broken tooth may picture something in your life that feels weakened or compromised — a relationship under strain, a reputation you worry about, a plan that cracked, or your own sense of strength.",
          "This reading is a reflective tool, not a fixed Islamic meaning."
        ]
      },
      {
        title: "Damage you are carrying",
        body: [
          "The dream may name a hurt or setback you are still carrying — something that broke and has not fully been repaired or accepted."
        ]
      },
      {
        title: "Resilience after the break",
        body: [
          "If you repaired the tooth, carried on, or accepted the break in the dream, it may reflect your capacity to continue with what has been damaged — and that is a strength, not a verdict."
        ]
      }
    ],
    scenarios: [
      {
        id: "tooth-cracked",
        title: "A tooth cracked",
        body: [
          "A crack may picture something that is not fully broken but is weakened — a strain that has not yet given way. It may be worth naming what is under strain before it breaks."
        ]
      },
      {
        id: "tooth-chipped",
        title: "A tooth chipped",
        body: [
          "A small chip may reflect a small but noticeable damage — a remark, a setback, or a flaw you feel is showing. It may matter less than it feels."
        ]
      },
      {
        id: "tooth-shattered",
        title: "A tooth shattered",
        body: [
          "A shattered tooth carries the strongest sense of damage. In reflection, it may picture something that felt completely broken — a trust, a plan, or a sense of safety — that is still being picked up."
        ]
      }
    ],
    reflectionQuestions: [
      "What in your life feels weakened, cracked, or under strain right now?",
      "Was there a recent setback or hurt that the break might be picturing?",
      "How did you respond to the break in the dream — repair, ignore, or carry on?",
      "What would it mean to accept something that has been damaged and keep going?"
    ],
    whatItDoesNotProve: [
      "That a specific person has been harmed or damaged.",
      "That your health is failing.",
      "That a plan or relationship is actually destroyed.",
      "That harm or disaster is coming."
    ],
    faq: [
      {
        question: "What does a broken tooth in a dream mean in Islam?",
        answer:
          "In personal reflection, a broken tooth is most often explored as an image of damage or weakness — a relationship, reputation, plan, or sense of strength that feels compromised. The tradition reads dreams through context and does not assign one fixed meaning."
      },
      {
        question: "Does a broken tooth in a dream mean bad health?",
        answer:
          "No. A broken tooth in a dream is not a medical sign and does not prove that your health is failing. It is an image to reflect on through your own circumstances."
      },
      {
        question: "What should I do after a broken teeth dream?",
        answer:
          "Name what feels weakened or under strain in your life. If the dream pointed to a real relationship or plan, consider whether it needs honest attention. If it frightened you, the traditional response is seeking refuge in Allah and not dwelling on it."
      }
    ],
    relatedArticles: [
      { href: "/guides/teeth-falling-out-dream-islam", label: "Teeth Falling Out Dream Meaning in Islam" },
      { href: "/guides/losing-front-teeth-dream-islam", label: "Losing Front Teeth Dream Meaning in Islam" },
      { href: "/guides/bleeding-teeth-dream-islam", label: "Bleeding Teeth Dream Meaning in Islam" }
    ],
    relatedSymbols: [
      { href: "/dreams/teeth-falling-out-islam", label: "Teeth Falling Out Dream Meaning in Islam" },
      { href: "/dreams/water-dream-islam", label: "Water Dream Meaning in Islam" }
    ],
    hubSymbol: { href: "/dreams/teeth-falling-out-islam", label: "Teeth Falling Out Dream Meaning in Islam" },
    hubEntityId: "teeth"
  },

  "losing-front-teeth-dream-islam": {
    slug: "losing-front-teeth-dream-islam",
    keyword: "losing front teeth in dream islam",
    searchIntent:
      "The searcher lost their front teeth in a dream and wants to know what it means from an Islamic perspective, especially about appearance and confidence.",
    title: "Losing Front Teeth Dream Meaning in Islam",
    description:
      "Front teeth are the most visible, so losing them in a dream often carries a feeling of exposure. Explore what it may reflect and what it does not prove. Not predictions.",
    quickAnswer:
      "Front teeth are the ones people see when you smile and speak, so losing them in a dream often carries a strong feeling of exposure. In personal reflection, it may picture a fear of being seen, judged, or embarrassed — a presentation, a new situation, or an area where you feel less confident than you would like. The Islamic tradition does not assign one fixed meaning: the hadith describe dreams as coming from Allah, from Satan, or from the self, and dreams are read through the dreamer's circumstances. Losing front teeth does not prove that you will be publicly humiliated, that your reputation is actually damaged, or that harm is coming. The dream is most often a picture of anxiety about how you appear to others, and the honest reflection is about that anxiety, not about a verdict.",
    introduction: [
      "Front teeth are the most visible part of a smile, so losing them in a dream can feel intensely public — even if no one else saw it.",
      "This article looks at what losing front teeth may reflect, what the tradition teaches, and what the dream does not prove."
    ],
    islamicPerspective: [
      {
        title: "Dreams are read through the dreamer",
        body: [
          "The hadith describe dreams as coming from Allah, from Satan, or from the self. A dream of losing front teeth is read through the dreamer's own circumstances, not through one fixed symbol meaning.",
          "The tradition is careful not to turn dreams into forecasts about reputation or events."
        ],
        sourceIds: ["muslim-2263a"]
      },
      {
        title: "No forecast of humiliation",
        body: [
          "Losing front teeth in a dream does not prove that you will be embarrassed, judged, or publicly exposed in waking life.",
          "It is an image of anxiety to reflect on, not a prediction."
        ],
        sourceIds: ["bukhari-6986", "bukhari-7044"]
      }
    ],
    interpretations: [
      {
        title: "A fear of being seen",
        body: [
          "In personal reflection, losing front teeth often pictures a fear of being seen — of a flaw showing, a mistake being noticed, or a moment when all eyes are on you.",
          "This reading is a reflective tool, not a fixed Islamic meaning."
        ]
      },
      {
        title: "Confidence under pressure",
        body: [
          "The dream may come before a moment that matters to you — a speech, an interview, a first meeting — when confidence feels thin."
        ]
      },
      {
        title: "Exposure you are dreading",
        body: [
          "If the dream felt like everyone could see the gap, it may picture a situation where you feel exposed — a truth coming out, a vulnerability showing, or a role you feel unprepared for."
        ]
      }
    ],
    scenarios: [
      {
        id: "both-front-teeth",
        title: "Both front teeth fell out",
        body: [
          "Losing the two most visible teeth may picture a fear at its strongest — a moment where you feel completely exposed and unable to hide."
        ]
      },
      {
        id: "one-front-tooth",
        title: "One front tooth fell out",
        body: [
          "A single front tooth may point to one specific worry about how you are seen — one situation, one person, one moment that matters."
        ]
      },
      {
        id: "front-teeth-in-mouth",
        title: "Front teeth crumbled in your mouth",
        body: [
          "If the teeth crumbled rather than fell, the dream may picture something that felt solid breaking down under pressure — confidence, a plan, or a sense of readiness."
        ]
      }
    ],
    reflectionQuestions: [
      "Is there a situation coming where you feel seen, judged, or exposed?",
      "What would it feel like to be seen with a flaw showing — and is that fear bigger than the reality?",
      "Where in your life does confidence feel thinnest right now?",
      "If the dream were picturing a fear of exposure, what would it be naming?"
    ],
    whatItDoesNotProve: [
      "That you will be publicly humiliated or embarrassed.",
      "That your reputation is actually damaged.",
      "That people are judging you more than usual.",
      "That harm or disaster is coming."
    ],
    faq: [
      {
        question: "What does losing front teeth in a dream mean in Islam?",
        answer:
          "Front teeth are the most visible, so losing them in a dream is most often explored as a picture of anxiety about appearance and exposure — a fear of being seen, judged, or embarrassed. The tradition reads dreams through context and does not assign one fixed meaning."
      },
      {
        question: "Does losing front teeth mean I will be embarrassed in public?",
        answer:
          "No. The dream is not a forecast of humiliation. It is most often a picture of anxiety you are carrying about how you appear to others, and the honest reflection is about that anxiety."
      },
      {
        question: "What should I do after dreaming of losing front teeth?",
        answer:
          "Name the situation where you feel seen or judged. Prepare for it if it is real and coming, and notice whether the fear is bigger than the reality. If the dream frightened you, the traditional response is seeking refuge in Allah and not dwelling on it."
      }
    ],
    relatedArticles: [
      { href: "/guides/teeth-falling-out-dream-islam", label: "Teeth Falling Out Dream Meaning in Islam" },
      { href: "/guides/broken-teeth-dream-islam", label: "Broken Teeth Dream Meaning in Islam" },
      { href: "/guides/bleeding-teeth-dream-islam", label: "Bleeding Teeth Dream Meaning in Islam" }
    ],
    relatedSymbols: [
      { href: "/dreams/teeth-falling-out-islam", label: "Teeth Falling Out Dream Meaning in Islam" },
      { href: "/dreams/dead-person-dream-islam", label: "Dead Person Dream Meaning in Islam" }
    ],
    hubSymbol: { href: "/dreams/teeth-falling-out-islam", label: "Teeth Falling Out Dream Meaning in Islam" },
    hubEntityId: "teeth"
  },

  "bleeding-teeth-dream-islam": {
    slug: "bleeding-teeth-dream-islam",
    keyword: "teeth falling out with blood dream islam",
    searchIntent:
      "The searcher's teeth fell out with blood in a dream and wants to know what it means from an Islamic perspective.",
    title: "Bleeding Teeth Dream Meaning in Islam",
    description:
      "Teeth falling out with blood feels more serious and painful. Explore what it may reflect, what the tradition teaches, and what it does not prove. Not predictions.",
    quickAnswer:
      "Blood with a falling tooth makes the dream feel more serious and more painful, and it often points to a loss that cost you — emotionally, physically, or in effort. In personal reflection, a bleeding tooth may picture a hurt that is still open, a loss that felt wounding rather than merely disappearing, or something that drained you. The Islamic tradition does not assign one fixed meaning: the hadith describe dreams as coming from Allah, from Satan, or from the self, and dreams are read through the dreamer's circumstances. Bleeding teeth do not prove that you are seriously ill, that a real injury is coming, or that harm is on its way. The dream is best read through what the pain is connected to in your waking life.",
    introduction: [
      "A tooth falling out is vivid enough — with blood, it can feel like an injury rather than a loss. It often stays with a person all day.",
      "This article looks at what a bleeding tooth may reflect, what the tradition teaches, and what the dream does not prove."
    ],
    islamicPerspective: [
      {
        title: "Dreams are read through the dreamer",
        body: [
          "The hadith describe dreams as coming from Allah, from Satan, or from the self. A bleeding tooth is not automatically any one of these; it is read through the dreamer's own circumstances.",
          "The tradition is careful not to turn dreams into forecasts of illness or injury."
        ],
        sourceIds: ["muslim-2263a"]
      },
      {
        title: "No claim of real injury",
        body: [
          "Blood in a dream does not prove that your health is failing or that a real injury is coming.",
          "It is an image of pain and cost to reflect on, not a medical sign."
        ],
        sourceIds: ["bukhari-6986", "bukhari-7044"]
      }
    ],
    interpretations: [
      {
        title: "A loss that cost you",
        body: [
          "In personal reflection, a bleeding tooth may picture a loss that cost you — emotionally, physically, or in effort. It was not a clean goodbye; it took something from you.",
          "This reading is a reflective tool, not a fixed Islamic meaning."
        ]
      },
      {
        title: "A hurt still open",
        body: [
          "Blood suggests the wound is recent or still open. The dream may be naming a hurt that has not fully healed and may need care or honesty."
        ]
      },
      {
        title: "The beginning of healing",
        body: [
          "If the bleeding stopped, or someone helped you, the dream may carry the beginning of healing — the hurt being tended rather than ignored."
        ]
      }
    ],
    scenarios: [
      {
        id: "bleeding-stopped",
        title: "The bleeding stopped",
        body: [
          "If the bleeding stopped or you were helped, the dream may reflect the beginning of healing after a painful loss — the wound being tended."
        ]
      },
      {
        id: "bleeding-continued",
        title: "The bleeding would not stop",
        body: [
          "If the bleeding continued, the dream may picture a hurt that feels unstoppable — something draining you that has not been tended."
        ]
      },
      {
        id: "blood-in-mouth",
        title: "Your mouth filled with blood",
        body: [
          "A mouth full of blood may picture a loss or hurt that feels overwhelming — too much at once, or something you cannot swallow or speak past."
        ]
      }
    ],
    reflectionQuestions: [
      "What loss or hurt in your life has cost you something recently?",
      "Is there a wound that is still open and may need care or honesty?",
      "What has been draining you — energy, trust, or effort?",
      "If the dream were picturing a hurt being tended, who or what would tend it?"
    ],
    whatItDoesNotProve: [
      "That you are seriously ill.",
      "That a real injury or harm is coming to you or someone else.",
      "That a specific person is bleeding or suffering because of the dream.",
      "That the dream is a forecast of disaster."
    ],
    faq: [
      {
        question: "What does a bleeding tooth in a dream mean in Islam?",
        answer:
          "Blood with a falling tooth is most often explored as an image of a loss that cost you, or a hurt that is still open. The tradition reads dreams through context and does not treat blood in a dream as a medical sign or a forecast of injury."
      },
      {
        question: "Does blood in a teeth dream mean someone will get hurt?",
        answer:
          "No. Blood in a dream is not a prediction of injury to you or anyone else. It is an image of pain and cost to reflect on through your own circumstances."
      },
      {
        question: "What should I do after a bleeding teeth dream?",
        answer:
          "Name the loss or hurt that cost you. If the dream points to a wound that is still open — a relationship, a grief, a stress — consider what honest care it needs. If it frightened you, the traditional response is seeking refuge in Allah and not dwelling on it."
      }
    ],
    relatedArticles: [
      { href: "/guides/teeth-falling-out-dream-islam", label: "Teeth Falling Out Dream Meaning in Islam" },
      { href: "/guides/broken-teeth-dream-islam", label: "Broken Teeth Dream Meaning in Islam" },
      { href: "/guides/losing-front-teeth-dream-islam", label: "Losing Front Teeth Dream Meaning in Islam" }
    ],
    relatedSymbols: [
      { href: "/dreams/teeth-falling-out-islam", label: "Teeth Falling Out Dream Meaning in Islam" },
      { href: "/dreams/dead-person-dream-islam", label: "Dead Person Dream Meaning in Islam" }
    ],
    hubSymbol: { href: "/dreams/teeth-falling-out-islam", label: "Teeth Falling Out Dream Meaning in Islam" },
    hubEntityId: "teeth"
  },

  /* ================================================================
   * Water Cluster (Phase 7 — Core Dream Symbols Migration)
   * ============================================================== */

  "clear-water-dream-islam": {
    slug: "clear-water-dream-islam",
    keyword: "clear water dream meaning islam",
    searchIntent:
      "The searcher dreamt of clear or clean water and wants to know what it means from an Islamic perspective.",
    title: "Clear Water Dream Meaning in Islam",
    description:
      "Clear water in a dream is usually received positively, associated with purity and clarity. Explore what it may reflect and what it does not prove. Not predictions.",
    quickAnswer:
      "Clear, clean water in a dream is usually received positively. In the Qur'an, water is described as the origin of every living thing and as a sign of life and mercy, and this shapes how clear water is often read: as an image of purity, clarity, peace, or emotional refreshment. In the Islamic tradition, dreams are read through context — the hadith describe dreams as coming from Allah, from Satan, or from the self — and a clear-water dream is not a guarantee of wealth or good fortune. It may picture a period of clarity in your life, a sense of things being clean and visible again, or a refreshment you have been needing. The meaning is found through what you did with the water and how it felt.",
    introduction: [
      "Clear water is one of the most positive images a water dream can hold. It is often remembered as calm and refreshing, and it carries the Qur'anic associations of life and purity.",
      "This article looks at what clear water may reflect, what the tradition teaches, and what the dream does not prove."
    ],
    islamicPerspective: [
      {
        title: "Water as a sign of life and mercy",
        body: [
          "The Qur'an states that Allah created every living thing from water (Qur'an 21:30) and speaks of rain sent down to give life to the earth. Water is therefore carried into the tradition with associations of life, purity, and mercy.",
          "This shapes how clear water dreams are received — gently and positively — while each dream is still read through its own details."
        ],
        sourceIds: ["quran-anbiya-21-30"]
      },
      {
        title: "Dreams are read through context",
        body: [
          "The hadith describe dreams as coming from Allah, from Satan, or from the self. A clear-water dream is not automatically a message; it is read through the dreamer's circumstances.",
          "The tradition is careful not to turn a pleasant dream into a promise of fortune."
        ],
        sourceIds: ["muslim-2263a"]
      }
    ],
    interpretations: [
      {
        title: "Clarity and peace",
        body: [
          "In personal reflection, clear water often pictures clarity and peace — a period when things feel visible and settled, or the hope of such a period.",
          "This reading is a reflective tool, not a fixed Islamic meaning."
        ]
      },
      {
        title: "Emotional refreshment",
        body: [
          "Clear water may picture refreshment — a need for rest, restoration, or emotional cleansing that is beginning to be met."
        ]
      },
      {
        title: "Purification",
        body: [
          "In the tradition, water is tied to purification (wudu, ghusl). A clear-water dream may carry a gentle sense of being washed clean of something heavy."
        ]
      }
    ],
    scenarios: [
      {
        id: "clear-still-water",
        title: "Clear, still water",
        body: [
          "Clear and still water may picture a settled season — calm, quiet, and clear. If it felt restful, the dream may be inviting you to receive the calm."
        ]
      },
      {
        id: "clear-flowing-water",
        title: "Clear, flowing water",
        body: [
          "Clear water that flows may picture clarity in motion — things moving clearly and in order, or a change that feels healthy rather than disruptive."
        ]
      },
      {
        id: "clear-water-you-drank",
        title: "Drinking clear water",
        body: [
          "Drinking clear water carries the strongest sense of refreshment. It may picture a need being met — for rest, understanding, or comfort."
        ]
      }
    ],
    reflectionQuestions: [
      "What in your life feels clear, settled, or newly visible?",
      "What refreshment have you been needing — rest, understanding, or emotional space?",
      "If the dream were a picture of peace, what would it be inviting you to receive?",
      "Was the water something you entered, drank, or simply saw — and what does that action say?"
    ],
    whatItDoesNotProve: [
      "That wealth or provision is guaranteed. Clear water is not a promise of fortune.",
      "That a specific blessing or outcome will occur.",
      "That every clear-water dream carries the same meaning.",
      "That the dream is a sign of purity in a moral sense."
    ],
    faq: [
      {
        question: "Is clear water in a dream good in Islam?",
        answer:
          "Clear, clean water is usually received positively. The Qur'an describes water as the origin of every living thing, so clear water carries associations of life, purity, and clarity. But the tradition reads dreams through context and does not treat it as a guarantee of good fortune."
      },
      {
        question: "What does drinking clear water in a dream mean?",
        answer:
          "Drinking clear water often pictures a need being met — for rest, understanding, or comfort. It is read through the dreamer's circumstances rather than as a promise of wealth or health."
      },
      {
        question: "What should I do after a clear water dream?",
        answer:
          "If the dream felt restful, you may receive it gently and notice what in your life feels clear or newly settled. If any part of it unsettled you, reflect on what the water and your action with it might be picturing."
      }
    ],
    relatedArticles: [
      { href: "/guides/dirty-water-dream-islam", label: "Dirty Water Dream Meaning in Islam" },
      { href: "/guides/drinking-water-dream-islam", label: "Drinking Water Dream Meaning in Islam" },
      { href: "/guides/flood-dream-islam", label: "Flood Dream Meaning in Islam" }
    ],
    relatedSymbols: [
      { href: "/dreams/water-dream-islam", label: "Water Dream Meaning in Islam" },
      { href: "/dreams/pregnancy-dream-islam", label: "Pregnancy Dream Meaning in Islam" }
    ],
    hubSymbol: { href: "/dreams/water-dream-islam", label: "Water Dream Meaning in Islam" },
    hubEntityId: "water"
  },

  "dirty-water-dream-islam": {
    slug: "dirty-water-dream-islam",
    keyword: "dirty water dream meaning islam",
    searchIntent:
      "The searcher dreamt of dirty or muddy water and wants to know what it means from an Islamic perspective.",
    title: "Dirty Water Dream Meaning in Islam",
    description:
      "Dirty or muddy water in a dream carries a heavier feeling, often explored through confusion. Explore what it may reflect and what it does not prove. Not predictions.",
    quickAnswer:
      "Dirty or muddy water in a dream often feels heavier than clear water, and it is most often explored as an image of confusion, contamination, or a situation you cannot see clearly. In personal reflection, it may picture something in your life that feels clouded, unclear, or compromised — a relationship, a decision, or a period of uncertainty. The Islamic tradition does not treat dirty water as a verdict on your character: the hadith describe dreams as coming from Allah, from Satan, or from the self, and dreams are read through the dreamer's circumstances. Dirty water does not prove that you are morally compromised, that scandal or harm is coming, or that something is cursed. It is an invitation to name what feels murky in your life and seek clarity.",
    introduction: [
      "Dirty or muddy water in a dream can leave a lingering unease. Unlike clear water, it feels heavy — and that heaviness is the meaning to explore.",
      "This article looks at what dirty water may reflect, what the tradition teaches, and what the dream does not prove."
    ],
    islamicPerspective: [
      {
        title: "Dreams are read through the dreamer",
        body: [
          "The hadith describe dreams as coming from Allah, from Satan, or from the self. Dirty water is not treated as a fixed omen; it is read through the dreamer's own circumstances.",
          "The tradition is careful not to use dreams to accuse a person's character."
        ],
        sourceIds: ["muslim-2263a"]
      },
      {
        title: "No verdict on character",
        body: [
          "Dirty water in a dream does not prove that you are morally compromised, that something about you is contaminated, or that harm or scandal is coming.",
          "It is an image of something feeling unclear — not a judgement."
        ],
        sourceIds: ["bukhari-6986", "bukhari-7044"]
      }
    ],
    interpretations: [
      {
        title: "Confusion and unclear situations",
        body: [
          "In personal reflection, muddy water often pictures confusion — a situation you cannot see clearly, a decision without enough information, or a relationship where motives are unclear.",
          "This reading is a reflective tool, not a fixed Islamic meaning."
        ]
      },
      {
        title: "Something feeling contaminated",
        body: [
          "If the water felt dirty rather than just unclear, the dream may picture something that feels compromised or contaminated — a trust that was broken, a situation that feels wrong, or an environment that drains you."
        ]
      },
      {
        title: "The first step of naming it",
        body: [
          "Recognising the water as dirty is itself a step — it is naming that something feels off. The dream may be the beginning of seeking clarity."
        ]
      }
    ],
    scenarios: [
      {
        id: "muddy-water",
        title: "Muddy or cloudy water",
        body: [
          "Cloudy water may picture a situation you cannot see through clearly — something is there, but its shape is unclear."
        ]
      },
      {
        id: "dirty-water-drinking",
        title: "Trying to drink dirty water",
        body: [
          "If you tried to drink dirty water, the dream may picture taking something in that feels wrong or unhealthy — a situation, a relationship, or a habit you are unsure about."
        ]
      },
      {
        id: "dirty-water-wading",
        title: "Wading through dirty water",
        body: [
          "Wading through dirty water may picture moving through a difficult or unclear period — making progress, but through murky conditions."
        ]
      }
    ],
    reflectionQuestions: [
      "What in your life feels unclear, clouded, or hard to see through right now?",
      "Is there a situation that feels compromised, contaminated, or simply wrong?",
      "What information or honesty would make the water clearer?",
      "If the dream were naming something murky in your life, what would it be?"
    ],
    whatItDoesNotProve: [
      "That you are morally compromised or contaminated.",
      "That scandal or harm is coming to you.",
      "That something in your life is cursed or under spiritual attack.",
      "That a specific person is deceiving you."
    ],
    faq: [
      {
        question: "What does dirty water in a dream mean in Islam?",
        answer:
          "Dirty or muddy water is most often explored as an image of confusion or something feeling unclear or compromised in your life. The tradition reads dreams through context and does not treat it as a judgement on your character."
      },
      {
        question: "Does dirty water in a dream mean something bad will happen?",
        answer:
          "No. Dirty water is not a forecast of harm or scandal. It is an image of something feeling murky in your life, and the honest reflection is about seeking clarity in that situation."
      },
      {
        question: "What should I do after a dirty water dream?",
        answer:
          "Name what feels unclear or compromised in your life. Consider what information or honesty would make it clearer. If the dream frightened you, the traditional response is seeking refuge in Allah and not dwelling on it."
      }
    ],
    relatedArticles: [
      { href: "/guides/clear-water-dream-islam", label: "Clear Water Dream Meaning in Islam" },
      { href: "/guides/flood-dream-islam", label: "Flood Dream Meaning in Islam" },
      { href: "/guides/drinking-water-dream-islam", label: "Drinking Water Dream Meaning in Islam" }
    ],
    relatedSymbols: [
      { href: "/dreams/water-dream-islam", label: "Water Dream Meaning in Islam" },
      { href: "/dreams/dead-person-dream-islam", label: "Dead Person Dream Meaning in Islam" }
    ],
    hubSymbol: { href: "/dreams/water-dream-islam", label: "Water Dream Meaning in Islam" },
    hubEntityId: "water"
  },

  "flood-dream-islam": {
    slug: "flood-dream-islam",
    keyword: "flood dream meaning islam",
    searchIntent:
      "The searcher dreamt of a flood and wants to know what it means from an Islamic perspective, and whether it predicts disaster.",
    title: "Flood Dream Meaning in Islam",
    description:
      "A flood in a dream is intense and often explored through pressure or emotion that feels beyond control. Explore what it may reflect and what it does not prove. Not predictions.",
    quickAnswer:
      "A flood in a dream is intense, and it is most often explored as an image of pressure, emotion, or change that feels beyond control — something rising that you cannot stop. In personal reflection, it may picture stress at work, a difficult change, grief, or a responsibility that feels overwhelming. The Islamic tradition is careful here: the hadith describe dreams as coming from Allah, from Satan, or from the self, and a flood is not treated as a forecast of a real disaster. A flood dream does not prove that your life is about to be swept away, that harm is coming, or that a specific catastrophe is near. It is an image of being overwhelmed, and the honest reflection is about what is rising in your life and where you can find higher ground.",
    introduction: [
      "A flood in a dream is one of the most overwhelming water experiences — water everywhere, rising, beyond control. It often leaves a person shaken.",
      "This article looks at what a flood may reflect, what the tradition teaches, and why it is not a forecast of disaster."
    ],
    islamicPerspective: [
      {
        title: "A disturbing dream is not a forecast",
        body: [
          "The hadith describe a disturbing dream as something to seek refuge in Allah from, not to read as a fixed sign of harm. A flood is an intense dream, and the tradition's first response is calm and protection.",
          "The tradition is explicit that bad dreams are not used to predict events."
        ],
        sourceIds: ["bukhari-6986", "bukhari-7044"]
      },
      {
        title: "Dreams are read through the dreamer",
        body: [
          "The hadith describe dreams as coming from Allah, from Satan, or from the self. A flood dream is most often read as a picture of the self — of feeling overwhelmed by what is in your own life.",
          "It is an image to reflect on, not a warning about the weather or fate."
        ],
        sourceIds: ["muslim-2263a"]
      }
    ],
    interpretations: [
      {
        title: "Feeling overwhelmed",
        body: [
          "In personal reflection, a flood most often pictures overwhelm — pressure, grief, responsibility, or change rising faster than you can manage.",
          "This reading is a reflective tool, not a fixed Islamic meaning."
        ]
      },
      {
        title: "Emotion that feels beyond control",
        body: [
          "Water is often explored as an image of emotion. A flood may picture feelings that feel too big to hold — anger, grief, fear, or uncertainty."
        ]
      },
      {
        title: "Change arriving all at once",
        body: [
          "A flood may picture a change that arrived suddenly and all at once — a job ending, a move, a loss — leaving you feeling carried rather than in control."
        ]
      }
    ],
    scenarios: [
      {
        id: "flood-survived",
        title: "Survived the flood",
        body: [
          "Surviving a flood, or reaching higher ground, may reflect resilience — the capacity to keep your head above what overwhelms you."
        ]
      },
      {
        id: "flood-carried-you",
        title: "The flood carried you away",
        body: [
          "If the flood carried you, the dream may picture a feeling of being swept along by events — not in control of the current. Naming what is carrying you is the first step."
        ]
      },
      {
        id: "flood-rescued",
        title: "Someone rescued you from the flood",
        body: [
          "Being rescued may picture the support that exists around you — people who would help if you reached out. It may also be an invitation to reach out."
        ]
      }
    ],
    reflectionQuestions: [
      "What in your life feels like it is rising beyond your control right now?",
      "What pressure, grief, or change arrived faster than you could manage?",
      "Where is your higher ground — what calms you, supports you, or gives you perspective?",
      "Who could help you if you asked?"
    ],
    whatItDoesNotProve: [
      "That a real flood or disaster is coming.",
      "That your life is about to be swept away.",
      "That you have failed or lost control permanently.",
      "That the dream is a prophecy of harm."
    ],
    faq: [
      {
        question: "Does a flood dream mean disaster in Islam?",
        answer:
          "No. The Islamic tradition is explicit that dreams are not used to predict events. A flood in a dream is an image of feeling overwhelmed — pressure, emotion, or change beyond control — not a forecast of a real disaster."
      },
      {
        question: "What should I do after a flood dream?",
        answer:
          "Name what feels like it is rising beyond your control, and where your higher ground is — what calms or supports you. If the dream frightened you, the traditional response is seeking refuge in Allah and not dwelling on it. If overwhelm is real, talking with someone you trust is a healthy step."
      },
      {
        question: "Can a flood dream be a good sign?",
        answer:
          "Surviving a flood, or reaching higher ground, can reflect resilience. Some readings see cleansing in moving water. But the tradition reads dreams through context and does not promise fortune from a flood."
      }
    ],
    relatedArticles: [
      { href: "/guides/clear-water-dream-islam", label: "Clear Water Dream Meaning in Islam" },
      { href: "/guides/dirty-water-dream-islam", label: "Dirty Water Dream Meaning in Islam" },
      { href: "/guides/drinking-water-dream-islam", label: "Drinking Water Dream Meaning in Islam" }
    ],
    relatedSymbols: [
      { href: "/dreams/water-dream-islam", label: "Water Dream Meaning in Islam" },
      { href: "/dreams/teeth-falling-out-islam", label: "Teeth Falling Out Dream Meaning in Islam" }
    ],
    hubSymbol: { href: "/dreams/water-dream-islam", label: "Water Dream Meaning in Islam" },
    hubEntityId: "water"
  },

  "drinking-water-dream-islam": {
    slug: "drinking-water-dream-islam",
    keyword: "drinking water in dream islam",
    searchIntent:
      "The searcher drank water in a dream and wants to know what it means from an Islamic perspective.",
    title: "Drinking Water Dream Meaning in Islam",
    description:
      "Drinking water in a dream often carries a feeling of need being met. Explore what it may reflect, what the tradition teaches, and what it does not prove. Not predictions.",
    quickAnswer:
      "Drinking water in a dream often carries a feeling of need being met. In personal reflection, it may picture a thirst being satisfied — for rest, for understanding, for comfort, or for something you have been lacking. In the Qur'an, water is described as the origin of every living thing and as a sign of life and mercy, which gives drinking water a gentle, nourishing association in the tradition. The hadith describe dreams as coming from Allah, from Satan, or from the self, and dreams are read through the dreamer's circumstances. Drinking water does not prove that a specific provision is guaranteed or that wealth or health is promised. The thirst, the water, and its satisfaction are read through your own life.",
    introduction: [
      "Drinking water in a dream is one of the most direct and satisfying water experiences — a need met, a thirst answered. It often leaves a feeling of refreshment.",
      "This article looks at what drinking water may reflect, what the tradition teaches, and what the dream does not prove."
    ],
    islamicPerspective: [
      {
        title: "Water as life and mercy",
        body: [
          "The Qur'an states that Allah created every living thing from water (Qur'an 21:30), and water is carried through the tradition with associations of life, purity, and mercy.",
          "Drinking water in a dream therefore sits in a gentle, nourishing frame — while each dream is still read through its own details."
        ],
        sourceIds: ["quran-anbiya-21-30"]
      },
      {
        title: "No promise of specific provision",
        body: [
          "The hadith describe dreams as coming from Allah, from Satan, or from the self. Drinking water is read through the dreamer's circumstances, not as a guaranteed promise of wealth, health, or a specific outcome.",
          "The tradition is careful not to turn dreams into forecasts."
        ],
        sourceIds: ["muslim-2263a"]
      }
    ],
    interpretations: [
      {
        title: "A need being met",
        body: [
          "In personal reflection, drinking water often pictures a need being met — rest after exhaustion, understanding after confusion, or comfort after grief.",
          "This reading is a reflective tool, not a fixed Islamic meaning."
        ]
      },
      {
        title: "A thirst you have been carrying",
        body: [
          "The dream may name a thirst you have been carrying — for connection, for peace, for meaning, or simply for a pause. The water in the dream is the picture of that thirst being answered."
        ]
      },
      {
        title: "Refreshment and restoration",
        body: [
          "Drinking clean water may picture the beginning of restoration — of energy, clarity, or spirit returning after a dry period."
        ]
      }
    ],
    scenarios: [
      {
        id: "drank-clean-water",
        title: "Drank clean, cool water",
        body: [
          "Clean, cool water that satisfied you may picture a genuine refreshment — a need met, a thirst answered, a season of restoration beginning."
        ]
      },
      {
        id: "could-not-drink",
        title: "Could not drink the water",
        body: [
          "If you could not reach the water, or could not swallow, the dream may picture a need that is still unmet — something you are reaching for that has not yet come."
        ]
      },
      {
        id: "drank-dirty-water",
        title: "Drank dirty water",
        body: [
          "Drinking dirty water may picture taking something in that feels wrong or unhealthy — a situation, a habit, or a relationship you are unsure about."
        ]
      }
    ],
    reflectionQuestions: [
      "What have you been thirsty for — rest, understanding, comfort, or connection?",
      "Is there a need in your life that is being met, or one that is still waiting?",
      "If the water were a picture of something you are reaching for, what would it be?",
      "What would refresh you most right now?"
    ],
    whatItDoesNotProve: [
      "That a specific provision, wealth, or health is guaranteed.",
      "That every drinking-water dream carries the same meaning.",
      "That the dream is a promise of a particular blessing.",
      "That the dream is a sign about the unseen."
    ],
    faq: [
      {
        question: "What does drinking water in a dream mean in Islam?",
        answer:
          "Drinking water in a dream often pictures a need being met — for rest, understanding, comfort, or something you have been lacking. The Qur'an describes water as a sign of life and mercy, which gives the dream a gentle, nourishing frame. It is not a promise of wealth or health."
      },
      {
        question: "Is drinking water in a dream a good sign?",
        answer:
          "Drinking clean, satisfying water is usually received positively — it may picture refreshment and a need being met. But the tradition reads dreams through context and does not treat it as a guarantee of fortune."
      },
      {
        question: "What should I do after a drinking water dream?",
        answer:
          "Notice what you have been thirsty for — rest, understanding, comfort, or connection — and consider whether that need is being met. If the dream was pleasant, you may receive it gently as a picture of refreshment."
      }
    ],
    relatedArticles: [
      { href: "/guides/clear-water-dream-islam", label: "Clear Water Dream Meaning in Islam" },
      { href: "/guides/dirty-water-dream-islam", label: "Dirty Water Dream Meaning in Islam" },
      { href: "/guides/flood-dream-islam", label: "Flood Dream Meaning in Islam" }
    ],
    relatedSymbols: [
      { href: "/dreams/water-dream-islam", label: "Water Dream Meaning in Islam" },
      { href: "/dreams/pregnancy-dream-islam", label: "Pregnancy Dream Meaning in Islam" }
    ],
    hubSymbol: { href: "/dreams/water-dream-islam", label: "Water Dream Meaning in Islam" },
    hubEntityId: "water"
  },

  /* ================================================================
   * Pregnancy Cluster (Phase 7 — Core Dream Symbols Migration)
   * ============================================================== */

  "being-pregnant-in-dream-islam": {
    slug: "being-pregnant-in-dream-islam",
    keyword: "being pregnant in dream islam",
    searchIntent:
      "The searcher dreamt that they themselves were pregnant and wants to know what it means from an Islamic perspective, and whether it predicts pregnancy.",
    title: "Being Pregnant in a Dream in Islam",
    description:
      "Dreaming that you are pregnant is most often read symbolically. Explore what it may reflect and why it does not predict pregnancy. Not predictions.",
    quickAnswer:
      "Dreaming that you are pregnant — whether or not pregnancy is possible, expected, or desired — is most often read as symbolic reflection rather than as a sign about actual pregnancy. In personal reflection, being pregnant in a dream may picture something new growing in your life that you are carrying and not yet ready to bring into the world: a project, an idea, a relationship, a responsibility, or a new phase of yourself. The Islamic tradition reads dreams through context: the hadith describe dreams as coming from Allah, from Satan, or from the self, and the tradition does not use dreams to predict real events. Being pregnant in a dream does not prove that you are pregnant, that you will become pregnant, or that parenthood is being promised — for anyone, regardless of gender or circumstance. The meaning is found through what is developing in your own life.",
    introduction: [
      "A dream in which you are pregnant can be surprising, joyful, or unsettling — and the feeling depends heavily on your real circumstances. It is worth saying clearly: the dream is not a prediction of pregnancy.",
      "This article looks at what being pregnant in a dream may reflect symbolically, what the tradition teaches, and why the dream should not be read as a sign about parenthood."
    ],
    islamicPerspective: [
      {
        title: "Dreams are read through the dreamer",
        body: [
          "The hadith describe dreams as coming from Allah, from Satan, or from the self — one's own thoughts, wishes, and experiences. A pregnancy dream is most often read through the dreamer's own life.",
          "The tradition is careful not to turn dreams into predictions of real events."
        ],
        sourceIds: ["muslim-2263a"]
      },
      {
        title: "Not a prediction of pregnancy",
        body: [
          "The Islamic tradition does not support using dreams to predict pregnancy, the gender of a child, or parenthood.",
          "If pregnancy is a real hope or worry, the honest response is to attend to your actual circumstances — not to read the dream as a verdict."
        ],
        sourceIds: ["bukhari-6986", "bukhari-7044"]
      }
    ],
    interpretations: [
      {
        title: "Something new growing in you",
        body: [
          "In personal reflection, being pregnant may picture something new developing in your life that is not yet visible or ready — a project, an idea, a relationship, or a new phase of yourself.",
          "This reading is a reflective tool, not a claim about pregnancy."
        ]
      },
      {
        title: "Carrying something not yet ready",
        body: [
          "If the dream felt heavy, it may picture a responsibility or change you feel you are carrying before it is ready to come into the open."
        ]
      },
      {
        title: "Creation and anticipation",
        body: [
          "Pregnancy is the clearest image of creation. The dream may reflect something creative and alive in you that is still growing toward its time."
        ]
      }
    ],
    scenarios: [
      {
        id: "pregnant-and-happy",
        title: "Pregnant and happy",
        body: [
          "If the dream felt joyful, it may reflect something positive growing in your life — or a genuine hope you are carrying. Either way, it is read symbolically, not as a prediction."
        ]
      },
      {
        id: "pregnant-and-anxious",
        title: "Pregnant and anxious",
        body: [
          "If the dream felt anxious, it may picture a responsibility or change you feel you are carrying that is not yet ready — a burden in the shape of a pregnancy."
        ]
      },
      {
        id: "pregnant-and-surprised",
        title: "Pregnant and surprised",
        body: [
          "Surprise in the dream may reflect something developing in your life that you did not plan or expect — a change arriving without your choosing."
        ]
      }
    ],
    reflectionQuestions: [
      "What new thing is developing in your life that you are carrying and not yet ready to bring into the world?",
      "How did the dream feel — joyful, anxious, or surprising — and what does that feeling tell you?",
      "If the dream were not about a baby at all, what would it be about?",
      "Is there a responsibility or change you feel you are carrying before its time?"
    ],
    whatItDoesNotProve: [
      "That you are pregnant or will become pregnant.",
      "The gender of any child.",
      "That parenthood is being promised to you.",
      "That a specific event in your life is coming."
    ],
    faq: [
      {
        question: "Does dreaming you are pregnant mean you are pregnant in Islam?",
        answer:
          "No. A pregnancy dream is most often read symbolically — as a picture of something new developing in your life — not as a sign of actual pregnancy. The tradition reads dreams through context and does not use them to predict real events."
      },
      {
        question: "What if I am not expecting a child — why did I dream I was pregnant?",
        answer:
          "Pregnancy in a dream often pictures growth in any area of life: a project, an idea, a relationship, or a new phase of yourself. It is an image of creation and anticipation, not a claim about parenthood."
      },
      {
        question: "Does a pregnancy dream tell the gender of a baby?",
        answer:
          "No. The tradition does not support using dreams to determine the gender of a child. A pregnancy dream is symbolic reflection, not a sign about a real or future child."
      }
    ],
    relatedArticles: [
      { href: "/guides/pregnancy-belly-dream-islam", label: "Pregnant Belly Dream Meaning in Islam" },
      { href: "/guides/pregnancy-test-dream-islam", label: "Pregnancy Test Dream Meaning in Islam" },
      { href: "/guides/pregnant-woman-dream-islam", label: "Pregnant Woman Dream Meaning in Islam" }
    ],
    relatedSymbols: [
      { href: "/dreams/pregnancy-dream-islam", label: "Pregnancy Dream Meaning in Islam" },
      { href: "/dreams/water-dream-islam", label: "Water Dream Meaning in Islam" }
    ],
    hubSymbol: { href: "/dreams/pregnancy-dream-islam", label: "Pregnancy Dream Meaning in Islam" },
    hubEntityId: "pregnancy"
  },

  "pregnant-woman-dream-islam": {
    slug: "pregnant-woman-dream-islam",
    keyword: "pregnant woman dream meaning islam",
    searchIntent:
      "The searcher saw a pregnant woman in a dream and wants to know what it means from an Islamic perspective.",
    title: "Pregnant Woman Dream Meaning in Islam",
    description:
      "Seeing a pregnant woman in a dream is often explored through what she represents to you. Explore what it may reflect and what it does not prove. Not predictions.",
    quickAnswer:
      "Seeing a pregnant woman in a dream — known or unknown — is most often explored through what she represents to you. In personal reflection, she may picture growth and new beginning: a project taking shape, a relationship developing, or something new starting in your life or in your circle. If she was someone you know, the dream may be read through your relationship to her and to the idea of new life. The Islamic tradition reads dreams through context: the hadith describe dreams as coming from Allah, from Satan, or from the self, and dreams are not used to predict real events. Seeing a pregnant woman does not prove that the woman in your life is actually pregnant, that a birth is coming, or that a specific event will occur.",
    introduction: [
      "A pregnant woman in a dream can carry a gentle, hopeful feeling — or a complicated one, depending on who she is and what she means to you.",
      "This article looks at what seeing a pregnant woman may reflect, what the tradition teaches, and what the dream does not prove."
    ],
    islamicPerspective: [
      {
        title: "Dreams are read through the dreamer",
        body: [
          "The hadith describe dreams as coming from Allah, from Satan, or from the self. A pregnant woman in a dream is read through the dreamer's own circumstances and relationships.",
          "The tradition is careful not to use dreams to predict births or real events."
        ],
        sourceIds: ["muslim-2263a"]
      },
      {
        title: "No prediction about a real person",
        body: [
          "Seeing a pregnant woman in a dream does not prove that she is actually pregnant or that a birth is coming.",
          "It is an image to reflect on through your own life, not a sign about someone else's."
        ],
        sourceIds: ["bukhari-6986"]
      }
    ],
    interpretations: [
      {
        title: "Growth and new beginning",
        body: [
          "In personal reflection, a pregnant woman may picture growth and new beginning — something taking shape in your life or in your circle.",
          "This reading is a reflective tool, not a fixed Islamic meaning."
        ]
      },
      {
        title: "Someone in your life",
        body: [
          "If the woman was someone you know, the dream may be read through your relationship to her — care, concern, admiration, or a hope you carry about her life."
        ]
      },
      {
        title: "What new life means to you",
        body: [
          "The dream may be exploring the idea of new life itself — what beginnings, hope, or responsibility mean to you at this time."
        ]
      }
    ],
    scenarios: [
      {
        id: "woman-you-know",
        title: "A pregnant woman you know",
        body: [
          "If you recognised her, reflect on your relationship to her and to the idea of her having a child. The dream is read through that connection, not as a sign about her."
        ]
      },
      {
        id: "unknown-woman",
        title: "An unfamiliar pregnant woman",
        body: [
          "An unknown woman may picture new beginning as an idea rather than a person — growth, hope, or a fresh start appearing in your life."
        ]
      },
      {
        id: "woman-happy",
        title: "A pregnant woman, happy",
        body: [
          "If she appeared happy, the dream may carry a hopeful tone — new beginnings received with joy, whether in your life or in your outlook."
        ]
      }
    ],
    reflectionQuestions: [
      "Who was the pregnant woman, and what does she mean to you?",
      "What new beginning is taking shape in your life or in your circle?",
      "What does the idea of new life — growth, hope, responsibility — stir in you right now?",
      "If the dream were not about pregnancy at all, what would it be picturing?"
    ],
    whatItDoesNotProve: [
      "That the woman in your life is actually pregnant.",
      "That a birth is coming to you or to someone you know.",
      "That a specific relationship is changing in a particular way.",
      "That the dream is a sign about the unseen."
    ],
    faq: [
      {
        question: "What does seeing a pregnant woman in a dream mean in Islam?",
        answer:
          "Seeing a pregnant woman is most often explored through what she represents to you — growth, new beginning, or a person in your life. The tradition reads dreams through context and does not use them to predict births."
      },
      {
        question: "If I dream of a specific pregnant woman, does it mean she is pregnant?",
        answer:
          "No. A dream is not a sign about another person's real life. If the woman is someone you know, the dream is best read through your relationship to her and what she means to you."
      },
      {
        question: "Is seeing a pregnant woman in a dream a good sign?",
        answer:
          "It often carries a hopeful, gentle tone — pregnancy is a natural image of growth and new beginning. But the tradition reads dreams through context and does not promise fortune or specific events."
      }
    ],
    relatedArticles: [
      { href: "/guides/being-pregnant-in-dream-islam", label: "Being Pregnant in a Dream in Islam" },
      { href: "/guides/pregnancy-belly-dream-islam", label: "Pregnant Belly Dream Meaning in Islam" },
      { href: "/guides/pregnancy-test-dream-islam", label: "Pregnancy Test Dream Meaning in Islam" }
    ],
    relatedSymbols: [
      { href: "/dreams/pregnancy-dream-islam", label: "Pregnancy Dream Meaning in Islam" },
      { href: "/dreams/dead-person-dream-islam", label: "Dead Person Dream Meaning in Islam" }
    ],
    hubSymbol: { href: "/dreams/pregnancy-dream-islam", label: "Pregnancy Dream Meaning in Islam" },
    hubEntityId: "pregnancy"
  },

  "pregnancy-belly-dream-islam": {
    slug: "pregnancy-belly-dream-islam",
    keyword: "pregnant belly dream meaning islam",
    searchIntent:
      "The searcher saw a pregnant belly in a dream and wants to know what it means from an Islamic perspective.",
    title: "Pregnant Belly Dream Meaning in Islam",
    description:
      "A pregnant belly in a dream often pictures something growing and becoming more visible. Explore what it may reflect and what it does not prove. Not predictions.",
    quickAnswer:
      "A pregnant belly in a dream often pictures something that is growing and becoming more visible in your life — a project moving toward its due time, a truth becoming obvious, or a change that can no longer be hidden. The belly makes growth public, and the dream may be about that visibility. The Islamic tradition reads dreams through context: the hadith describe dreams as coming from Allah, from Satan, or from the self, and dreams are not used to predict real events. A pregnant belly does not prove that a real pregnancy is indicated or that an event is about to be revealed. It is an image of something you are carrying that is nearing its time to be seen.",
    introduction: [
      "A pregnant belly in a dream is pregnancy made visible — growth that can no longer be hidden. It may belong to you or to someone else, and the feeling of the dream matters.",
      "This article looks at what a pregnant belly may reflect, what the tradition teaches, and what the dream does not prove."
    ],
    islamicPerspective: [
      {
        title: "Dreams are read through the dreamer",
        body: [
          "The hadith describe dreams as coming from Allah, from Satan, or from the self. A pregnant belly is read through the dreamer's own circumstances, not through one fixed symbol meaning.",
          "The tradition is careful not to use dreams to predict real events."
        ],
        sourceIds: ["muslim-2263a"]
      },
      {
        title: "Not a sign of a real pregnancy",
        body: [
          "A pregnant belly in a dream does not prove that a real pregnancy is indicated, for you or anyone else.",
          "It is an image of growth becoming visible, not a report of an actual event."
        ],
        sourceIds: ["bukhari-6986"]
      }
    ],
    interpretations: [
      {
        title: "Growth becoming visible",
        body: [
          "In personal reflection, a pregnant belly may picture something growing in your life that is nearing the point of being seen — a project, a truth, or a change.",
          "This reading is a reflective tool, not a fixed Islamic meaning."
        ]
      },
      {
        title: "Something nearing its time",
        body: [
          "The belly is growth near its end — something you have been carrying is approaching the moment it comes into the open."
        ]
      },
      {
        title: "A responsibility that feels heavy",
        body: [
          "If the belly felt burdensome, the dream may picture a growing responsibility that feels heavy — something you are carrying that has become harder to hide."
        ]
      }
    ],
    scenarios: [
      {
        id: "your-own-belly",
        title: "Your own pregnant belly",
        body: [
          "A belly of your own may picture something you personally are carrying toward its time — a project, a decision, or a truth within you that is close to being seen."
        ]
      },
      {
        id: "belly-of-another",
        title: "Another person's belly",
        body: [
          "If the belly belonged to someone else, the dream may picture growth you are watching from outside — something developing in your circle or in a person close to you."
        ]
      },
      {
        id: "belly-visible-in-public",
        title: "A belly visible in public",
        body: [
          "If the belly was noticed by others, the dream may be about exposure — something you have been carrying becoming visible to others whether you are ready or not."
        ]
      }
    ],
    reflectionQuestions: [
      "What in your life is growing and becoming more visible, whether you are ready or not?",
      "What are you carrying that is nearing its time to be seen?",
      "If the belly felt heavy, what responsibility is weighing on you?",
      "What would it mean to let something you are carrying come into the open?"
    ],
    whatItDoesNotProve: [
      "That a real pregnancy is indicated.",
      "That an event or truth is about to be revealed in reality.",
      "That a specific outcome will occur.",
      "That the dream is a sign about the unseen."
    ],
    faq: [
      {
        question: "What does a pregnant belly in a dream mean in Islam?",
        answer:
          "A pregnant belly often pictures something growing and becoming more visible in your life — a project nearing its time, a truth becoming obvious, or a change that can no longer be hidden. It is not a sign of a real pregnancy."
      },
      {
        question: "Does a pregnant belly dream mean I will have a baby?",
        answer:
          "No. The tradition does not use dreams to predict pregnancy or parenthood. The belly is an image of growth becoming visible, read through the dreamer's own life."
      },
      {
        question: "What should I do after a pregnant belly dream?",
        answer:
          "Ask what in your life is growing and nearing the point of being seen. If something is ready to come into the open, consider what honest step it needs. If the dream felt heavy, name the responsibility weighing on you."
      }
    ],
    relatedArticles: [
      { href: "/guides/being-pregnant-in-dream-islam", label: "Being Pregnant in a Dream in Islam" },
      { href: "/guides/pregnancy-test-dream-islam", label: "Pregnancy Test Dream Meaning in Islam" },
      { href: "/guides/pregnant-woman-dream-islam", label: "Pregnant Woman Dream Meaning in Islam" }
    ],
    relatedSymbols: [
      { href: "/dreams/pregnancy-dream-islam", label: "Pregnancy Dream Meaning in Islam" },
      { href: "/dreams/water-dream-islam", label: "Water Dream Meaning in Islam" }
    ],
    hubSymbol: { href: "/dreams/pregnancy-dream-islam", label: "Pregnancy Dream Meaning in Islam" },
    hubEntityId: "pregnancy"
  },

  "pregnancy-test-dream-islam": {
    slug: "pregnancy-test-dream-islam",
    keyword: "pregnancy test dream meaning islam",
    searchIntent:
      "The searcher dreamt of a pregnancy test and wants to know what it means from an Islamic perspective, and whether it predicts the result.",
    title: "Pregnancy Test Dream Meaning in Islam",
    description:
      "A pregnancy test in a dream most often pictures waiting for a result — in any area of life. Explore what it may reflect and what it does not prove. Not predictions.",
    quickAnswer:
      "A pregnancy test in a dream is most often about waiting for a result — a test, an interview, medical news, or a decision whose outcome you cannot control. The dream pictures the moment of not yet knowing, and the feeling of that moment is the meaning to explore. In personal reflection, it may name a hope or an anxiety you are carrying about an outcome in your life. The Islamic tradition reads dreams through context: the hadith describe dreams as coming from Allah, from Satan, or from the self, and dreams are not used to predict real events. A pregnancy test in a dream does not prove what the real result is or will be, and it does not indicate whether pregnancy is happening or not happening. It is a picture of waiting.",
    introduction: [
      "A pregnancy test in a dream is rarely about the test itself — it is about the moment of not yet knowing. That moment, and the feeling in it, is the real content of the dream.",
      "This article looks at what a pregnancy test dream may reflect, what the tradition teaches, and why it does not predict any real result."
    ],
    islamicPerspective: [
      {
        title: "Dreams are read through the dreamer",
        body: [
          "The hadith describe dreams as coming from Allah, from Satan, or from the self. A pregnancy test is read through the dreamer's own circumstances — what they are waiting to find out.",
          "The tradition is careful not to use dreams to predict real events or results."
        ],
        sourceIds: ["muslim-2263a"]
      },
      {
        title: "No prediction of results",
        body: [
          "A pregnancy test in a dream does not prove what the real result is or will be.",
          "It is an image of waiting and uncertainty, not a report about an actual test."
        ],
        sourceIds: ["bukhari-6986", "bukhari-7044"]
      }
    ],
    interpretations: [
      {
        title: "Waiting for a result",
        body: [
          "In personal reflection, a pregnancy test may picture any result you are waiting for — news, a decision, an answer. The dream is about the waiting itself.",
          "This reading is a reflective tool, not a fixed Islamic meaning."
        ]
      },
      {
        title: "A hope you are carrying",
        body: [
          "If the dream felt hopeful, it may be naming a hope you are carrying about an outcome — and the hope is worth holding gently, whatever the result."
        ]
      },
      {
        title: "An anxiety you are carrying",
        body: [
          "If the dream felt tense, it may picture real anxiety about an outcome you are waiting for — and naming that anxiety is part of the honest reflection."
        ]
      }
    ],
    scenarios: [
      {
        id: "test-positive",
        title: "The test showed positive",
        body: [
          "A positive result in a dream does not predict a real result. It may picture a hope you are carrying, or the weight of an outcome you are bracing for."
        ]
      },
      {
        id: "test-negative",
        title: "The test showed negative",
        body: [
          "A negative result in a dream does not predict a real result either. It may picture a fear or a relief you are carrying about an outcome."
        ]
      },
      {
        id: "test-unclear",
        title: "The result was unclear",
        body: [
          "An unclear result may be the most honest picture of all — the moment of not yet knowing, with the answer still out of reach."
        ]
      }
    ],
    reflectionQuestions: [
      "What result in your life are you waiting for right now — news, a decision, an answer?",
      "Is the waiting about pregnancy, or about something else wearing its shape?",
      "What hope or anxiety are you carrying about the outcome?",
      "How would you hold yourself gently while you wait?"
    ],
    whatItDoesNotProve: [
      "What a real pregnancy test result is or will be.",
      "That pregnancy is happening or not happening.",
      "That a specific outcome will occur in any area of your life.",
      "That the dream is a sign about the unseen."
    ],
    faq: [
      {
        question: "Does a pregnancy test dream predict the result in Islam?",
        answer:
          "No. The tradition does not use dreams to predict real events or results. A pregnancy test in a dream is most often a picture of waiting — of not yet knowing — and is read through what you are waiting to find out in your life."
      },
      {
        question: "What if I dreamt the test was positive?",
        answer:
          "A positive result in a dream does not predict a real result. It may picture a hope you are carrying, or the weight of an outcome you are bracing for. The honest reading is about the hope or anxiety, not the result."
      },
      {
        question: "Why do I keep dreaming of pregnancy tests?",
        answer:
          "Repeating test dreams often accompany real waiting — for news, a decision, or an answer that matters to you. If the waiting is about something real, attending to it directly, and seeking support if it is heavy, is the healthy step."
      }
    ],
    relatedArticles: [
      { href: "/guides/being-pregnant-in-dream-islam", label: "Being Pregnant in a Dream in Islam" },
      { href: "/guides/pregnancy-belly-dream-islam", label: "Pregnant Belly Dream Meaning in Islam" },
      { href: "/guides/pregnant-woman-dream-islam", label: "Pregnant Woman Dream Meaning in Islam" }
    ],
    relatedSymbols: [
      { href: "/dreams/pregnancy-dream-islam", label: "Pregnancy Dream Meaning in Islam" },
      { href: "/dreams/dead-person-dream-islam", label: "Dead Person Dream Meaning in Islam" }
    ],
    hubSymbol: { href: "/dreams/pregnancy-dream-islam", label: "Pregnancy Dream Meaning in Islam" },
    hubEntityId: "pregnancy"
  }
};

export function loadDreamArticle(slug: string): DreamArticle | undefined {
  return DREAM_ARTICLES[slug];
}

export function allDreamArticles(): DreamArticle[] {
  return Object.values(DREAM_ARTICLES);
}

export function collectArticleSourceIds(article: DreamArticle): string[] {
  const ids: string[] = [];
  article.islamicPerspective.forEach((b) => b.sourceIds?.forEach((id) => ids.push(id)));
  article.interpretations.forEach((b) => b.sourceIds?.forEach((id) => ids.push(id)));
  return [...new Set(ids)];
}
