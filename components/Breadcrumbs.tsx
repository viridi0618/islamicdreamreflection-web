import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({
  title,
  items
}: {
  title?: string;
  items?: BreadcrumbItem[];
}) {
  const crumbs = items ?? [
    { label: "Home", href: "/" },
    { label: "Dream Guides", href: "/guides" },
    { label: title ?? "" }
  ];

  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {crumbs.map((item, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="crumbs__item">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href && !isLast ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
