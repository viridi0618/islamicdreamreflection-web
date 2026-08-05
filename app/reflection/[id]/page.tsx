import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getSharedReflection } from "@/lib/reflections-store";
import { SharePageTracker } from "@/components/SharePageTracker";

interface PageProps {
  params: Promise<{ id: string }>;
}

/** Share pages carry user content — always noindex. */
export const metadata: Metadata = {
  title: "Dream Reflection",
  robots: { index: false, follow: false }
};

export default async function ReflectionPage({ params }: PageProps) {
  const { id } = await params;
  const share = getSharedReflection(id);
  if (!share) notFound();

  const created = new Date(share.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  return (
    <article className="shell share-page">
      <SharePageTracker />

      <div className="share-page__card">
        <div className="share-page__kicker">Dream Reflection</div>
        <h1>Someone reflected on a dream</h1>

        {share.symbols.length > 0 && (
          <section className="share-page__block" aria-labelledby="sp-symbols">
            <h2 id="sp-symbols">Symbols</h2>
            <div className="share-page__symbols">
              {share.symbols.map((s) => (
                <span key={s} className="share-page__symbol">
                  🌙 {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {share.focus.length > 0 && (
          <section className="share-page__block" aria-labelledby="sp-focus">
            <h2 id="sp-focus">Focus</h2>
            <p className="share-page__focus">{share.focus.join(" & ")}</p>
          </section>
        )}

        {share.reflection && (
          <section className="share-page__block" aria-labelledby="sp-reflection">
            <h2 id="sp-reflection">Reflection</h2>
            <div className="share-page__reflection">
              {share.reflection.split("\n").map((line, i) =>
                line.trim() ? <p key={i}>{line}</p> : null
              )}
            </div>
          </section>
        )}

        <p className="share-page__meta">Shared {created} · via islamicdream.app</p>

        <div className="share-page__cta">
          <p className="share-page__trust-label">Inspired by Islamic Dream Traditions 🌙</p>
          <p>Create your own dream reflection 🌙</p>
          <Link href="/interpreter" className="share-page__cta-btn">
            Start Your Journey
          </Link>
        </div>

        <p className="share-page__note">
          Dream reflections are not predictions or religious rulings. The dream
          itself is never shared.
        </p>
      </div>
    </article>
  );
}
