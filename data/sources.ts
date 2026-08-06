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
 *
 * Accuracy: every hadith number and citation below has been checked against
 * sunnah.com; every Qur'an range against the text of the Qur'an. If a claim
 * cannot be supported by a verified reference it is written as editorial
 * reflection, never padded with an unchecked citation.
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
      "The Qur’an records Yusuf’s dream of eleven stars, the sun and the moon prostrating to him, and his father Ya‘qub counselling him not to tell his brothers. Ya‘qub says Allah will teach Yusuf the interpretation of dreams. The passage shows that dreams can carry meaning and that interpretation is a recognized concern."
  },
  "quran-yusuf-12-36-41": {
    id: "quran-yusuf-12-36-41",
    type: "quran",
    title: "Surah Yusuf",
    reference: "Qur’an 12:36–41",
    url: "https://quran.com/12/36-41",
    status: "verified",
    supports:
      "Two companions of Yusuf in prison describe their dreams — one pressing wine, one carrying bread — and ask for interpretation. Yusuf teaches them about interpretation before explaining their dreams. The passage shows that dream interpretation in the tradition is approached with care and seeks meaning rather than guesswork."
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
  "quran-saffat-37-102-105": {
    id: "quran-saffat-37-102-105",
    type: "quran",
    title: "Surah As-Saffat",
    reference: "Qur’an 37:102–105",
    url: "https://quran.com/37/102-105",
    status: "verified",
    supports:
      "Ibrahim tells his son of a dream in which he saw himself sacrificing him; his son responds with patience and submission. The passage presents a dream as a serious command experienced by a prophet, fulfilled through both of them submitting. It concerns a prophetic vision, not ordinary dream symbolism."
  },

  /* ----------------------------------------------------------------
   * Hadith — Sahih al-Bukhari / Sahih Muslim, checked against sunnah.com.
   * -------------------------------------------------------------- */
  "bukhari-6984": {
    id: "bukhari-6984",
    type: "hadith",
    collection: "Sahih al-Bukhari",
    title: "A true good dream is from Allah, a bad dream is from Satan",
    reference: "Sahih al-Bukhari, Book of Dreams (Kitab at-Ta’bir), hadith 6984",
    url: "https://sunnah.com/bukhari:6984",
    status: "verified",
    supports:
      "The hadith states that a true good dream is from Allah and a bad dream is from Satan, distinguishing two kinds of dream experience without assigning fixed meanings to symbols."
  },
  "bukhari-6985": {
    id: "bukhari-6985",
    type: "hadith",
    collection: "Sahih al-Bukhari",
    title: "Good dreams: thank Allah and share; bad dreams: seek refuge and stay quiet",
    reference: "Sahih al-Bukhari, Book of Dreams (Kitab at-Ta’bir), hadith 6985",
    url: "https://sunnah.com/bukhari:6985",
    status: "verified",
    supports:
      "The hadith gives the traditional response to a good dream (thank Allah and tell others about it) and to a bad dream (seek refuge in Allah from its evil and do not mention it to anyone)."
  },
  "bukhari-6986": {
    id: "bukhari-6986",
    type: "hadith",
    collection: "Sahih al-Bukhari",
    title: "A good dream that comes true is from Allah, a bad dream is from Satan",
    reference: "Sahih al-Bukhari, Book of Dreams (Kitab at-Ta’bir), hadith 6986",
    url: "https://sunnah.com/bukhari:6986",
    status: "verified",
    supports:
      "The hadith teaches that a bad dream will not harm the one who seeks refuge in Allah from Satan, and includes the etiquette of spitting lightly to the left."
  },
  "bukhari-7044": {
    id: "bukhari-7044",
    type: "hadith",
    collection: "Sahih al-Bukhari",
    title: "Etiquette for a disliked dream",
    reference:
      "Sahih al-Bukhari, Book of Dreams (Kitab at-Ta’bir), hadith 7044",
    url: "https://sunnah.com/bukhari:7044",
    status: "verified",
    supports:
      "The hadith teaches that a disliked dream should be met by seeking refuge in Allah from its evil and from the evil of Satan, spitting lightly to the left three times, and not telling anyone about it."
  },
  "bukhari-7045": {
    id: "bukhari-7045",
    type: "hadith",
    collection: "Sahih al-Bukhari",
    title: "A bad dream should not be told to anybody",
    reference:
      "Sahih al-Bukhari, Book of Dreams (Kitab at-Ta’bir), hadith 7045",
    url: "https://sunnah.com/bukhari:7045",
    status: "verified",
    supports:
      "The hadith repeats the guidance that a bad dream comes from Satan, the dreamer should seek refuge in Allah from it, and should not tell it to anybody, for it will not harm him."
  },
  "bukhari-6990": {
    id: "bukhari-6990",
    type: "hadith",
    collection: "Sahih al-Bukhari",
    title: "Al-Mubashshirat: true good dreams remain as glad tidings",
    reference:
      "Sahih al-Bukhari, Book of Dreams (Kitab at-Ta’bir), hadith 6990",
    url: "https://sunnah.com/bukhari:6990",
    status: "verified",
    supports:
      "The hadith describes the true good dream (ru'ya saliha) as al-Mubashshirat — glad tidings — and as what remains of prophecy. It supports the place of good dreams in the tradition, not the meaning of any particular symbol."
  },
  "muslim-2263a": {
    id: "muslim-2263a",
    type: "hadith",
    collection: "Sahih Muslim",
    title: "Dreams are of three types",
    reference: "Sahih Muslim, Book of Dreams (Kitab al-Ru’ya), hadith 2263a",
    url: "https://sunnah.com/muslim:2263a",
    status: "verified",
    supports:
      "The hadith explicitly describes three types of dreams: a good dream which is good tidings from Allah, an evil dream which causes pain and is from the satan, and a dream which is a suggestion of one's own mind. It also teaches that a disliked dream should not be related to people and one may pray instead."
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
  }
};

/** Only sources eligible for public display (methodology never self-lists). */
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
