/**
 * Single source of truth for the visible article text.
 *
 * Both the Article schema wordCount and the visible "reading time" use this
 * function so they can never drift apart. It counts only what the pillar
 * template actually renders: quick answer, introduction, before-interpreting,
 * themes, scenarios (including readings), does-not-prove, actions, classical
 * notes, context questions, and contextual link anchors.
 *
 * Legacy fields (interpretation.*, traditional_notes) are NOT included when
 * the page uses the new article template, because the template does not
 * render them.
 */
import type { DreamEntity } from "@/lib/data";

export function extractVisibleArticleText(entity: DreamEntity): string {
  const parts: string[] = [];
  const a = entity.article;

  if (a) {
    parts.push(a.quickAnswer);
    parts.push(...a.introduction);
    a.beforeInterpreting.forEach((b) => parts.push(b.title, b.body));
    a.themes.forEach((t) => parts.push(t.title, t.summary, ...t.body));
    parts.push(...a.contextQuestions);
    a.scenarios.forEach((s) => {
      parts.push(s.title, s.summary, ...s.body);
      if (s.positiveReading) parts.push(s.positiveReading);
      if (s.cautionaryReading) parts.push(s.cautionaryReading);
      if (s.doesNotProve) parts.push(...s.doesNotProve);
      if (s.relatedGuide) parts.push(s.relatedGuide.label);
    });
    parts.push(...a.doesNotProve);
    a.actionsAfterDream.forEach((x) => parts.push(x.title, x.body));
    (a.classicalNotes ?? []).forEach((c) => parts.push(c.title, ...c.body));
    a.contextualLinks.forEach((l) => parts.push(l.anchor));
  } else {
    // Legacy template: it renders interpretation.* and traditional_notes.
    parts.push(...(entity.interpretation.general ?? []));
    parts.push(...(entity.interpretation.positive ?? []));
    parts.push(...(entity.interpretation.negative ?? []));
    parts.push(...(entity.traditional_notes ?? []));
    parts.push(...(entity.related ?? []));
  }

  return parts.filter(Boolean).join(" ");
}

export function visibleWordCount(entity: DreamEntity): number {
  return extractVisibleArticleText(entity).split(/\s+/).filter(Boolean).length;
}

/** Reading time in minutes at ~200 wpm, minimum 1. */
export function readingMinutes(entity: DreamEntity): number {
  return Math.max(1, Math.round(visibleWordCount(entity) / 200));
}
