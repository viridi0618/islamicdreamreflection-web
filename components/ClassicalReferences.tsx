import type { DreamEntity } from "@/lib/data";

export function ClassicalReferences({ entity }: { entity: DreamEntity }) {
  const sources = entity.classical_sources ?? [];
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
              <td className="status">historical perspective</td>
            </tr>
          ))}
          {sources.length === 0 && (
            <tr>
              <td colSpan={3}>No classical source recorded yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
