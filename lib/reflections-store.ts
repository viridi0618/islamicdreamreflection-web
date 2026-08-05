/**
 * Server-side share snapshots (Phase 5, P2).
 *
 * When a user shares a reflection, ONLY the public fields are stored here:
 * symbols, focus areas, and the reflection text. The dream text is never
 * sent to the server, so a share link can never leak the original dream.
 *
 * Storage is a plain JSON file per share under web/.reflections/ (gitignored).
 * No database. Fine for the MVP; swap for a real store when scaling.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export interface SharedReflection {
  id: string;
  createdAt: string;
  symbols: string[];
  focus: string[];
  reflection: string;
}

const DIR = path.join(process.cwd(), ".reflections");

function ensureDir(): void {
  fs.mkdirSync(DIR, { recursive: true });
}

function fileFor(id: string): string {
  return path.join(DIR, `${id}.json`);
}

export function isValidShareId(id: string): boolean {
  return /^[a-z0-9]{8,16}$/.test(id);
}

export function createSharedReflection(input: {
  symbols: string[];
  focus: string[];
  reflection: string;
}): SharedReflection {
  const id = crypto.randomBytes(5).toString("hex"); // 10 chars
  const share: SharedReflection = {
    id,
    createdAt: new Date().toISOString(),
    symbols: input.symbols.slice(0, 6).map((s) => s.slice(0, 60)),
    focus: input.focus.slice(0, 3).map((s) => s.slice(0, 40)),
    reflection: input.reflection.slice(0, 4000)
  };
  ensureDir();
  fs.writeFileSync(fileFor(id), JSON.stringify(share, null, 2), "utf8");
  return share;
}

export function getSharedReflection(id: string): SharedReflection | null {
  if (!isValidShareId(id)) return null;
  const file = fileFor(id);
  if (!fs.existsSync(file)) return null;
  try {
    const parsed = JSON.parse(fs.readFileSync(file, "utf8")) as SharedReflection;
    if (!parsed || typeof parsed.id !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}
