/**
 * POST /api/reflections
 *
 * Creates a public share snapshot from the PUBLIC fields of a reflection.
 * The dream text must never be sent here — the server rejects it defensively.
 */
import { NextResponse } from "next/server";
import { createSharedReflection } from "@/lib/reflections-store";

export const runtime = "nodejs";
export const maxDuration = 30;

interface ShareBody {
  symbols?: unknown;
  focus?: unknown;
  reflection?: unknown;
}

const FORBIDDEN_FIELDS = ["dream", "dreamText", "dream_text", "text"];

export async function POST(req: Request): Promise<NextResponse> {
  let body: ShareBody;
  try {
    body = (await req.json()) as ShareBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Defensive: never store the dream text, even if a client sends it.
  const hasDreamField = FORBIDDEN_FIELDS.some((f) =>
    Object.prototype.hasOwnProperty.call(body, f)
  );
  if (hasDreamField) {
    return NextResponse.json(
      { error: "The dream text cannot be shared." },
      { status: 400 }
    );
  }

  const asStrings = (v: unknown): string[] =>
    Array.isArray(v)
      ? v.filter((x): x is string => typeof x === "string" && x.length > 0)
      : [];

  const symbols = asStrings(body.symbols).slice(0, 6);
  const focus = asStrings(body.focus).slice(0, 3);
  const reflection =
    typeof body.reflection === "string" && body.reflection.trim().length > 0
      ? body.reflection.trim().slice(0, 4000)
      : "";

  if (symbols.length === 0 && reflection.length === 0) {
    return NextResponse.json(
      { error: "Nothing to share." },
      { status: 400 }
    );
  }

  const share = createSharedReflection({ symbols, focus, reflection });
  return NextResponse.json({ shareId: share.id });
}
