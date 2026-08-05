import Link from "next/link";

/**
 * AI entry banner shown at the top of SEO dream pages.
 * Routes the reader into the guided reflection with the page's symbol
 * pre-selected (/interpreter?symbol=<entityId>) — the SEO page captures
 * search demand, the reflection flow carries it.
 */
function symbolLabel(entityId: string): string {
  return entityId
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function AiEntryBanner({ entityId }: { entityId: string }) {
  return (
    <div className="ai-entry" role="complementary" aria-label="Dream reflection entry">
      <div className="ai-entry__text">
        <strong>Explore Your {symbolLabel(entityId)} Dream</strong>
        <span>Begin a guided reflection — you only need to add a few details.</span>
      </div>
      <Link className="ai-entry__btn" href={`/interpreter?symbol=${entityId}`}>
        Begin Reflection
      </Link>
    </div>
  );
}
