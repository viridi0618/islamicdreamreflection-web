import Link from "next/link";
import type { DreamEntity } from "@/lib/data";

const PUBLIC_STATUSES = new Set(["reviewed", "verified"]);

/**
 * Public classical sources table.
 *
 * Only sources whose status is "reviewed" or "verified" are shown. Pending
 * or draft sources stay internal (editorial tooling) and are never surfaced
 * on the public page. When no public source exists, a brief methodology note
 * is shown instead of an empty table.
 */
export function ClassicalReferences({ entity }: { entity: DreamEntity }) {
  const sources = (entity.classical_sources ?? []).filter((s) =>
    PUBLIC_STATUSES.has(s.status ?? "")
  );

  if (sources.length === 0) {
    return (
      <div className="prose">
        <p>
          <strong>About the sources</strong>
        </p>
        <p>
          This page separates directly referenced Qur’an and Hadith material
          from later interpretive traditions and personal reflection.{" "}
          <Link href="/sources-methodology">
            Learn how sources are reviewed.
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="prose">
      <p>
        Classical sources associated with this dream symbol in Islamic dream
        interpretation traditions. These are historical perspectives, not
        religious rulings.
      </p>
      <table className="ref-table">
        <thead>
          <tr>
            <th scope="col">Source</th>
            <th scope="col">Reference</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((s) => (
            <tr key={s.name}>
              <td>{s.name}</td>
              <td>{s.reference}</td>
              <td className="status">
                {s.status === "verified" ? "Verified reference" : "Reviewed reference"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
