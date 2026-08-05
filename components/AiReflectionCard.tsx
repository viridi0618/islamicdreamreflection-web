import Link from "next/link";
import { dreamUrl } from "@/lib/site";

export interface ApiVerifiedSymbol {
  raw: string;
  entityId: string | null;
  entityName?: string | null;
  slug?: string;
  /** Trust Layer: traditional discussion notes from the knowledge base. */
  traditionalNotes?: string[];
  /** Trust Layer: classical sources with verification status (multi-source since Phase 5.2 P1-2). */
  classicalSources?: Array<{
    name?: string;
    tradition?: string;
    status: string;
    notes?: string;
  }>;
  /** Trust Layer: aggregated source verification status. */
  sourceStatus?: "verified" | "reviewed" | "pending";
}

export interface FocusReading {
  focus: string;
  points: string[];
}

export interface AnalyzeResponse {
  mode: "ai" | "fallback";
  reflection: string;
  verifiedSymbols: ApiVerifiedSymbol[];
  emotions: string[];
  scenario: string[];
  context?: {
    focus: string[];
    emotion: string[];
    memoryLevel: "full" | "partial" | "symbol";
    characters: string[];
  };
  focusReadings?: FocusReading[];
  aiMode: boolean;
}

/** Splits an AI reflection (## sections) into ordered cards. */
function splitSections(markdown: string): Array<{ title: string; body: string }> {
  const lines = markdown.split("\n");
  const sections: Array<{ title: string; body: string }> = [];
  let current: { title: string; body: string[] } | null = null;

  for (const line of lines) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      if (current) sections.push({ title: current.title, body: current.body.join("\n").trim() });
      current = { title: heading[1]!.trim(), body: [] };
    } else if (current) {
      current.body.push(line);
    }
  }
  if (current) sections.push({ title: current.title, body: current.body.join("\n").trim() });
  return sections.filter((s) => s.body.length > 0);
}

/** Minimal markdown-to-JSX for the reflection body (bold, italics, lists). */
function renderBody(text: string) {
  const blocks = text.split(/\n{2,}/);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.length === 0) return null;

    const listItems = trimmed.split("\n").filter((l) => /^[-*]\s+/.test(l));
    if (listItems.length > 0) {
      return (
        <ul key={i}>
          {listItems.map((item, j) => (
            <li
              key={j}
              dangerouslySetInnerHTML={{
                __html: inlineHtml(item.replace(/^[-*]\s+/, ""))
              }}
            />
          ))}
        </ul>
      );
    }

    return (
      <p
        key={i}
        dangerouslySetInnerHTML={{ __html: inlineHtml(trimmed) }}
      />
    );
  });
}

function inlineHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

export function AiReflectionCard({
  response,
  onRetry
}: {
  response: AnalyzeResponse;
  onRetry?: () => void;
}) {
  const sections = splitSections(response.reflection);
  const hasFallback = response.mode === "fallback";

  return (
    <div className="chat-ai">
      <div className="chat-ai__head">
        <span className="chat-ai__avatar" aria-hidden="true">
          ✦
        </span>
        <span>
          <b>AI Reflection</b>
          {hasFallback && (
            <span className="chat-ai__mode" title="No DEEPSEEK_API_KEY configured; using offline rules.">
              offline mode
            </span>
          )}
        </span>
      </div>

      {response.verifiedSymbols.length > 0 && (
        <div className="chat-ai__symbols" aria-label="Detected symbols">
          {response.verifiedSymbols.map((s) =>
            s.slug ? (
              <Link key={s.raw} href={dreamUrl(s.slug)} className="chat-ai__sym chat-ai__sym--link">
                {s.entityName ?? s.raw}
              </Link>
            ) : (
              <span key={s.raw} className="chat-ai__sym">
                {s.entityName ?? s.raw}
              </span>
            )
          )}
        </div>
      )}

      {sections.length > 0 ? (
        sections.map((s) => (
          <section key={s.title} className="chat-ai__sec">
            <h3>{s.title}</h3>
            <div className="chat-ai__body">{renderBody(s.body)}</div>
          </section>
        ))
      ) : (
        <p className="chat-ai__body">{response.reflection}</p>
      )}

      <p className="chat-ai__foot">
        Dream interpretations are not predictions or religious rulings. They are
        reflections based on available traditions and symbolic patterns.
      </p>

      {hasFallback && onRetry && (
        <button type="button" className="chat-ai__retry" onClick={onRetry}>
          Enable AI mode (add DEEPSEEK_API_KEY) and retry
        </button>
      )}
    </div>
  );
}
