/**
 * Minimal analytics layer (Phase 5, P3).
 *
 * Tracks the retention funnel: open -> submit -> complete -> save -> share ->
 * return. Events go to the console AND to a localStorage queue (with a
 * device id) so they can be collected later without any BI infrastructure.
 */

export type EventName =
  | "interpreter_open"
  | "focus_selected"
  | "dream_submitted"
  | "context_completed"
  | "analysis_completed"
  | "result_viewed"
  | "save_clicked"
  | "history_opened"
  | "share_clicked"
  | "share_page_viewed"
  | "new_reflection_clicked"
  | "save_flow_started"
  | "save_completed"
  | "feeling_selected"
  | "expectation_selected"
  | "memory_limit_hit"
  | "memory_expired"
  /* Phase 5.2 UX Optimization events (P3-10) */
  | "dream_title_added"
  | "emotion_selected"
  | "reflection_started"
  | "reflection_completed"
  | "symbol_viewed"
  | "traditional_viewed"
  | "share_completed"
  /* FAQ page (Phase 2 IA) */
  | "faq_opened"
  | "faq_question_expanded"
  /* Homepage trust experience */
  | "home_privacy_clicked"
  | "home_methodology_clicked"
  | "home_dream_type_clicked"
  | "home_dream_type_source_clicked"
  | "home_guide_clicked"
  | "home_quote_source_clicked"
  | "home_my_dreams_clicked"
  | "home_faq_expanded";

interface StoredEvent {
  name: EventName;
  ts: number;
  data?: Record<string, unknown>;
}

const EVENTS_KEY = "dream_events";
const DEVICE_KEY = "dream_device_id";
const MAX_EVENTS = 300;

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function deviceId(): string {
  if (!canUseStorage()) return "no-storage";
  let id = window.localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = `d-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    try {
      window.localStorage.setItem(DEVICE_KEY, id);
    } catch {
      /* ignore */
    }
  }
  return id;
}

export function track(name: EventName, data?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const event: StoredEvent = { name, ts: Date.now(), data };

  // Console diagnostics (safe, no user content by default).
  console.debug(`[dream-event] ${name}`, data ?? "");

  if (!canUseStorage()) return;
  try {
    const raw = window.localStorage.getItem(EVENTS_KEY);
    const queue: StoredEvent[] = raw ? (JSON.parse(raw) as StoredEvent[]) : [];
    queue.push(event);
    window.localStorage.setItem(EVENTS_KEY, JSON.stringify(queue.slice(-MAX_EVENTS)));
  } catch {
    /* ignore */
  }
}

/** Returns the queued events (for future export / endpoint). */
export function readEvents(): StoredEvent[] {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(EVENTS_KEY);
    return raw ? (JSON.parse(raw) as StoredEvent[]) : [];
  } catch {
    return [];
  }
}
