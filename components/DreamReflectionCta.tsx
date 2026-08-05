import Link from "next/link";

/**
 * Dream page reflection CTA. Routes the reader into the live reflection tool
 * with the page's symbol pre-selected (/interpreter?symbol=<entityId>).
 */
export function DreamReflectionCta({ entityId }: { entityId: string }) {
  return (
    <section className="dream-cta" aria-labelledby="dream-cta-heading">
      <h2 id="dream-cta-heading">Reflect on your complete dream</h2>
      <p>
        A single symbol is only part of the story. Add what happened, how the
        dream felt, and what part of life feels connected.
      </p>
      <Link className="dream-cta__btn" href={`/interpreter?symbol=${entityId}`}>
        Begin a Private Reflection
      </Link>
      <p className="dream-cta__note">
        Saved reflections stay in this browser on this device.
      </p>
    </section>
  );
}
