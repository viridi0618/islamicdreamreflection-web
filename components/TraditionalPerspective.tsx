/**
 * Traditional Perspective — trust layer for dream interpretation results.
 *
 * Phase 5.1 P0-8-1/P0-8-4 + Phase 5.2 P1-1/P1-2.
 *
 * Phase 5.2 changes:
 *  - P1-1 "Explain Status": every status label explains itself with a
 *    description and a "Why?" block, so "Under Source Review" reads as
 *    care, not unreliability.
 *  - P1-2 multi-source: each source carries its own tradition name, status
 *    and editorial notes; the UI renders them side by side.
 *
 * Content rules:
 *  - Uses hedged language only: "may", "can", "is traditionally discussed as"
 *  - Never asserts certainty ("Snake means enemy" is forbidden)
 *  - Never issues religious rulings or predictions
 *  - Source status is always visible to the user
 */
import type { SourceStatus } from "@/lib/source-status";
import { SOURCE_STATUS_INFO } from "@/lib/source-status";

export interface TraditionalSymbolData {
  name: string;
  entityId: string | null;
  traditionalNotes?: string[];
  classicalSources?: Array<{
    name?: string;
    tradition?: string;
    status: string;
    notes?: string;
  }>;
  sourceStatus?: SourceStatus;
}

export interface TraditionalPerspectiveProps {
  symbols: TraditionalSymbolData[];
}

function StatusBadge({ status }: { status: SourceStatus }) {
  const info = SOURCE_STATUS_INFO[status];
  const cls = `tp-status tp-status--${status}`;
  return (
    <span className={cls} title={info.description}>
      {info.label}
    </span>
  );
}

export function TraditionalPerspective({ symbols }: TraditionalPerspectiveProps) {
  const verified = symbols.filter((s) => s.entityId && s.traditionalNotes && s.traditionalNotes.length > 0);

  if (verified.length === 0) return null;

  return (
    <section className="rr-section tp-section" aria-labelledby="rr-traditional">
      <h2 id="rr-traditional">
        Traditional Perspective <span className="tp-star" aria-hidden="true">⭐</span>
      </h2>

      <p className="tp-intro">
        Classical discussions related to this symbol. The notes below describe
        how each symbol is approached in Islamic dream interpretation
        traditions — they are not definitive interpretations.
      </p>

      {verified.map((sym) => {
        const status = sym.sourceStatus ?? "pending";
        const info = SOURCE_STATUS_INFO[status];
        const sources = sym.classicalSources ?? [];
        return (
          <article key={sym.entityId ?? sym.name} className="tp-symbol">
            <div className="tp-symbol__head">
              <h3>{sym.name}</h3>
              <StatusBadge status={status} />
            </div>

            {/* P1-1: Explain Status — why this status, in plain language */}
            <div className="tp-explain" role="note">
              <span className="tp-explain__label">Source status: {info.label}</span>
              <p>{info.description}</p>
              <p className="tp-explain__why">
                <b>Why?</b> {info.why}
              </p>
            </div>

            <div className="tp-symbol__notes">
              {sym.traditionalNotes!.map((note, i) => (
                <p key={i}>{note}</p>
              ))}
            </div>

            {sources.length > 0 && (
              <div className="tp-symbol__sources">
                <span className="tp-symbol__sources-label">Sources:</span>
                <ul>
                  {sources.map((src, i) => (
                    <li key={i} className="tp-source-item">
                      <span className="tp-source-name">{src.tradition ?? src.name}</span>
                      <span className={`tp-source-dot tp-source-dot--${src.status}`}>
                        {src.status === "pending" ? "Classical tradition" : src.status}
                      </span>
                      {src.notes && <span className="tp-source-notes">{src.notes}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        );
      })}

      {/* P0-8-4: Source transparency */}
      <div className="tp-about" aria-labelledby="tp-about-label">
        <h3 id="tp-about-label">About our interpretations</h3>
        <p>
          Our reflections are based on Islamic dream interpretation traditions.
          We do not provide religious rulings or guaranteed predictions.
          Dream interpretation varies by context, personal circumstances and
          understanding.
        </p>
      </div>
    </section>
  );
}
