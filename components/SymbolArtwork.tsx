import Image from "next/image";
import type { DreamEntity } from "@/lib/data";

function artworkAlt(entity: DreamEntity): string {
  const label = entity.name.replace(/\s*Dream\s*/i, "").trim();
  return `${label} dream symbol illustration`;
}

export function SymbolArtwork({
  entity,
  priority = false,
  className = ""
}: {
  entity: DreamEntity;
  priority?: boolean;
  className?: string;
}) {
  if (!entity.image) return null;

  return (
    <div className={`symbol-art${className ? ` ${className}` : ""}`}>
      <Image
        src={entity.image}
        alt={artworkAlt(entity)}
        width={1200}
        height={1200}
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 980px) 46vw, 360px"
      />
    </div>
  );
}
