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
