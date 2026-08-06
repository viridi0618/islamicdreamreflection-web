"use client";

import Link from "next/link";
import { track } from "@/lib/events";

/**
 * Client-side interactive elements on the homepage.
 *
 * The homepage itself is a server component; event handlers (tracking)
 * cannot be passed to client components from it, so all clickable elements
 * that emit analytics live here.
 */
export function MyDreamsCta({
  ctaHref,
  ctaLabel,
  secondaryHref,
  secondaryLabel
}: {
  ctaHref: string;
  ctaLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  return (
    <div className="save-control__cta">
      <Link
        href={ctaHref}
        className="btn"
        onClick={() => track("home_my_dreams_clicked")}
      >
        {ctaLabel} →
      </Link>
      <Link
        href={secondaryHref}
        className="link-subtle save-control__privacy"
        onClick={() => track("home_privacy_clicked")}
      >
        {secondaryLabel}
      </Link>
    </div>
  );
}

export function MethodologyLink({
  href,
  label
}: {
  href: string;
  label: string;
}) {
  return (
    <Link href={href} onClick={() => track("home_methodology_clicked")}>
      {label} →
    </Link>
  );
}

export function DreamTypesLink({
  href,
  label
}: {
  href: string;
  label: string;
}) {
  return (
    <Link href={href} onClick={() => track("home_dream_type_clicked")}>
      {label} →
    </Link>
  );
}

/** Dream symbol card link — emits home_guide_clicked with the page slug. */
export function GuideCardLink({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  const slug = href.split("/").filter(Boolean).pop() ?? "";
  return (
    <Link
      href={href}
      onClick={() => track("home_guide_clicked", { slug })}
    >
      {children}
    </Link>
  );
}

/** External "Source" link under the three dream types section. */
export function DreamTypeSourceLink({
  href,
  label
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("home_dream_type_source_clicked")}
    >
      {label} →
    </a>
  );
}

export function HomeFaq({
  faqs
}: {
  faqs: Array<{ id: string; question: string; answer: string }>;
}) {
  return (
    <div className="faq">
      {faqs.map((faq) => (
        <details
          key={faq.id}
          className="faq__item"
          onToggle={(e) => {
            if ((e.target as HTMLDetailsElement).open) {
              track("home_faq_expanded", { question: faq.id });
            }
          }}
        >
          <summary>{faq.question}</summary>
          <div className="faq__body">{faq.answer}</div>
        </details>
      ))}
    </div>
  );
}
