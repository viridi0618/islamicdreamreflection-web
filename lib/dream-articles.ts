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
