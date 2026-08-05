import type { Metadata } from "next";
import { MemoryDetailClient } from "@/components/MemoryDetailClient";

/** Personal detail page — never index. */
export const metadata: Metadata = {
  title: "Dream Reflection",
  robots: { index: false, follow: false }
};

export default function MemoryDetailPage() {
  return (
    <article className="shell my-dreams-page">
      <MemoryDetailClient />
    </article>
  );
}
