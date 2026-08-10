/**
 * Independent homepage card summaries for dream symbol pages.
 *
 * These are hand-written, user-facing summaries. They must not be cut from
 * interpretation.general or traditional_notes, which may contain internal
 * review language. One summary per enabled page, no shared template lines.
 */

export const DREAM_CARD_SUMMARIES: Record<string, string> = {
  snake:
    "Snake dreams are common, and readings shift with what the snake did, where it appeared, and how it felt. No single fixed meaning applies to every snake dream.",
  "dead-person":
    "Dreams of someone who has died carry deep emotion and are best approached gently, with attention to what was said, how the person appeared, and your own feelings.",
  teeth:
    "Teeth dreams often arrive during worry or change. The meaning depends on which teeth, what happened, and whether the dream felt painful or simply strange.",
  water:
    "Water dreams change with the water itself: clear, turbulent, rising, or still. The state and action of the water matter more than the water alone.",
  pregnancy:
    "Pregnancy dreams can mirror anticipation, creativity, or a phase of life that is quietly growing. They are read with the dreamer's circumstances in mind.",
  fire:
    "Fire dreams change with the fire itself: controlled, warming, spreading, or destructive. Context and emotion matter more than the symbol alone.",
  death:
    "Death dreams are handled gently and are not treated as evidence that an actual death is coming. The guide separates this intent from dreams of the deceased.",
  baby:
    "Baby dreams can invite reflection on care, responsibility, vulnerability, and new beginnings without automatically predicting pregnancy.",
  cat:
    "Cat dreams are explored through behavior and emotion, without turning black cats into claims about magic, jinn, betrayal, or bad luck.",
  dog:
    "Dog dreams are read through behavior, fear, loyalty, boundaries, and daily experience, not through fixed claims about unseen harm."
};

export function dreamCardSummary(entityId: string): string | undefined {
  return DREAM_CARD_SUMMARIES[entityId];
}
