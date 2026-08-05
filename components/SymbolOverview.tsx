import type { DreamEntity } from "@/lib/data";
import { categoryLabel } from "@/lib/data";

export function SymbolOverview({ entity }: { entity: DreamEntity }) {
  return (
    <div className="symbol-card" role="list" aria-label="Dream symbol overview">
      <div className="symbol-card__cell" role="listitem">
        <div className="symbol-card__label">Dream symbol</div>
        <div className="symbol-card__value">{entity.name}</div>
      </div>
      <div className="symbol-card__cell" role="listitem">
        <div className="symbol-card__label">Category</div>
        <div className="symbol-card__value">{categoryLabel(entity.category)}</div>
      </div>
      <div className="symbol-card__cell" role="listitem">
        <div className="symbol-card__label">Related</div>
        <div className="related-chips">
          {entity.related.slice(0, 4).map((r) => (
            <span key={r} className="chip">
              {r}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
