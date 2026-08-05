import Link from "next/link";
import { categoryLabel } from "@/lib/data";
import { dreamUrl, type PageConfig } from "@/lib/site";

export function RelatedDreams({
  pages,
  currentSlug
}: {
  pages: Array<{ page: PageConfig; entity: { category: string } }>;
  currentSlug: string;
}) {
  const others = pages.filter((p) => p.page.slug !== currentSlug);
  if (others.length === 0) return null;
  return (
    <div className="related-grid">
      {others.map(({ page, entity }) => (
        <Link key={page.slug} href={dreamUrl(page.slug)} className="related-item">
          <span className="related-item__cat">{categoryLabel(entity.category)}</span>
          <h3>{page.title}</h3>
        </Link>
      ))}
    </div>
  );
}
