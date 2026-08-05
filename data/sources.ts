/**
 * Unified source registry.
 *
 * Only sources with status "reviewed" or "verified" may appear in public
 * Sources areas on dream pages. "draft" records stay internal: they exist
 * for the editorial pipeline but are never surfaced to users.
 *
 * Rule: relevant references only, no decorative scripture. A Qur'an or
 * Hadith citation must support the claim next to which it is shown — it is
 * never used to manufacture a fixed symbol dictionary.
 */

export type SourceType =
  | "quran"
  | "hadith"
  | "classical-work"
  | "modern-reference"
  | "methodology";

export type SourceStatus = "draft" | "reviewed" | "verified";

export interface SourceRecord {
  id: string;
  type: SourceType;
  title: string;
  author?: string;
  collection?: string;
  reference: string;
  url?: string;
  status: SourceStatus;
  /** What this source actually supports (shown to users when public). */
  supports: string;
  attributionNote?: string;
  edition?: string;
  volume?: string;
  page?: string;
}

export const SOURCES: Record<string, SourceRecord> = {
  /* ----------------------------------------------------------------
   * Qur'an — verified text, universally accessible.
   * -------------------------------------------------------------- */
  "quran-yusuf-12-4-6": {
    id: "quran-yusuf-12-4-6",
    type: "quran",
    title: "Surah Yusuf",
    reference: "Qur’an 12:4–6",
    url: "https://quran.com/12/4-6",
    status: "verified",
    supports:
      "The Qur’an records Yusuf’s dream of eleven stars, the sun and the moon prostrating to him, and his father’s interpretation. It shows that dreams can carry meaning and that interpreting them is a recognized concern."
  },
  "quran-yusuf-12-36": {
    id: "quran-yusuf-12-36",
    type: "quran",
    title: "Surah Yusuf",
    reference: "Qur’an 12:36",
    url: "https://quran.com/12/36",
    status: "verified",
    supports:
      "Two companions of Yusuf in prison ask him to interpret their dreams. The passage shows that dream interpretation in the tradition is approached with care and seeks meaning rather than guesswork."
  },
  "quran-yusuf-12-43": {
    id: "quran-yusuf-12-43",
    type: "quran",
    title: "Surah Yusuf",
    reference: "Qur’an 12:43–49",
    url: "https://quran.com/12/43-49",
    status: "verified",
    supports:
      "The king’s dream of seven fat cows, seven lean cows and seven green and dry ears of grain is presented as a dream with real significance, interpreted only after careful consideration. It does not provide fixed meanings for everyday symbols."
  },

  /* ----------------------------------------------------------------
   * Hadith — Sahih al-Bukhari / Sahih Muslim, widely documented.
   * -------------------------------------------------------------- */
  "bukhari-6986": {
    id: "bukhari-6986",
    type: "hadith",
    collection: "Sahih al-Bukhari",
    title: "Good dreams from Allah, bad dreams from Satan",
    reference: "Sahih al-Bukhari, Book of Dreams (Kitab at-Ta’bir), hadith 6986",
    url: "https://sunnah.com/bukhari/6986",
    status: "verified",
    supports:
      "A good dream is from Allah and a disturbing dream is from Satan. It gives guidance on what to do with a bad dream (seeking refuge in Allah) rather than assigning fixed meanings to symbols."
  },
  "bukhari-7018": {
    id: "bukhari-7018",
    type: "hadith",
    collection: "Sahih al-Bukhari",
    title: "The three types of dreams",
    reference:
      "Sahih al-Bukhari, Book of Dreams (Kitab at-Ta’bir), hadith 7018",
    url: "https://sunnah.com/bukhari/7018",
    status: "verified",
    supports:
      "Dreams are described as coming from Allah (good dreams), from Satan (disturbing dreams), or from the self (thoughts and daily concerns). This supports the point that not every dream should be interpreted."
  },
  "muslim-2261": {
    id: "muslim-2261",
    type: "hadith",
    collection: "Sahih Muslim",
    title: "Dreams are of three types",
    reference: "Sahih Muslim, hadith 2261",
    url: "https://sunnah.com/muslim/2261",
    status: "verified",
    supports:
      "A parallel narration of the three types of dreams, reinforcing that dreams may be from Allah, from Satan, or from the dreamer’s own thoughts and concerns."
  },
  "bukhari-6990": {
    id: "bukhari-6990",
    type: "hadith",
    collection: "Sahih al-Bukhari",
    title: "Etiquette for a disturbing dream",
    reference:
      "Sahih al-Bukhari, Book of Dreams (Kitab at-Ta’bir), hadith 6990",
    url: "https://sunnah.com/bukhari/6990",
    status: "verified",
    supports:
      "Guidance for someone who sees a disturbing dream: seek refuge in Allah from its evil, do not speak about it to others, and do not let it control one’s day."
  },

  /* ----------------------------------------------------------------
   * Classical works — attribution is disputed or unverified; kept
   * internal (draft) until a precise, checked edition is available.
   * -------------------------------------------------------------- */
  "ibn-sirin-muntakhab": {
    id: "ibn-sirin-muntakhab",
    type: "classical-work",
    title: "Muntakhab Kalam fi Tafsir al-Ahlam",
    author: "Attributed to Ibn Sirin",
    reference: "Later compiled dream manual traditionally attributed to Ibn Sirin",
    status: "draft",
    supports:
      "A widely circulated medieval dream manual. Its attribution to Ibn Sirin is disputed and the text survives in later compilations, so it is not quoted directly on public pages.",
    attributionNote:
      "Attribution to Ibn Sirin is traditional but historically disputed; the surviving text is a later compilation."
  },

  /* ----------------------------------------------------------------
   * Methodology — internal reference for the methodology page.
   * -------------------------------------------------------------- */
  "methodology-page": {
    id: "methodology-page",
    type: "methodology",
    title: "Sources and Methodology",
    reference: "/sources-methodology",
    status: "reviewed",
    supports:
      "Explains how Qur’an and Hadith are used, how classical attribution is handled, how AI participates, and what content is editorial reflection."
  }
};

/** Only sources eligible for public display. */
export function publicSources(): SourceRecord[] {
  return Object.values(SOURCES).filter(
    (s) => s.status === "reviewed" || s.status === "verified"
  );
}

/** Resolve source records by id, returning only public ones. */
export function resolvePublicSources(ids: string[]): SourceRecord[] {
  return ids
    .map((id) => SOURCES[id])
    .filter((s): s is SourceRecord => Boolean(s))
    .filter((s) => s.status === "reviewed" || s.status === "verified");
}
