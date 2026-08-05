import type { DreamEntity } from "@/lib/data";

const VERIFICATION_NOTE =
  "Traditional readings for this scenario are pending verification. Nothing on this page is asserted as Islamic doctrine until a human editor reviews the cited source.";

export function Scenarios({ entity }: { entity: DreamEntity }) {
  const scenarios = entity.related.slice(0, 5);
  return (
    <div className="prose">
      {scenarios.map((scenario, i) => (
        <article key={scenario} className="scenario">
          <h3>
            <span className="scenario__index" aria-hidden="true">
              {i + 1}
            </span>
            {scenario.charAt(0).toUpperCase() + scenario.slice(1)}
          </h3>
          <p>
            A common dream variation. How the symbol appears, what happens in
            the dream, and how you feel afterwards all shape the reading.
          </p>
          <span className="pending-tag">▲ needs verification</span>
        </article>
      ))}
      <div className="notice" style={{ marginTop: 22 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        </svg>
        <span>{VERIFICATION_NOTE}</span>
      </div>
    </div>
  );
}
