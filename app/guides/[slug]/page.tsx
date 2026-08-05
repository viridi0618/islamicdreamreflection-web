import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allGuides, loadGuide } from "@/lib/guides";
import { resolvePublicSources } from "@/data/sources";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return allGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = loadGuide(slug);
  if (!guide) return {};
  return {
    title: `${guide.title} — Islamic Dream Reflection`,
    description: guide.description,
    alternates: { canonical: `${SITE_URL}/guides/${slug}` },
    robots: { index: true, follow: true }
  };
}

function renderSources(sourceIds: string[]) {
  const sources = resolvePublicSources(sourceIds);
  if (sources.length === 0) return null;
  return (
    <ul className="guide-sources">
      {sources.map((s) => (
        <li key={s.id}>
          {s.reference}
          {s.url && (
            <>
              {" · "}
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                view source
              </a>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default async function GuidePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = loadGuide(slug);
  if (!guide) notFound();

  return (
    <article className="shell section">
      <div className="section__head">
        <h1>{guide.title}</h1>
        <span className="rule" />
      </div>

      <div className="prose">
        {guide.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}

        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {section.sourceIds && renderSources(section.sourceIds)}
          </section>
        ))}

        <p className="guide-meta">
          Prepared by {SITE_NAME}. Traditional perspectives are not predictions
          or religious rulings.
        </p>
      </div>
    </article>
  );
}
