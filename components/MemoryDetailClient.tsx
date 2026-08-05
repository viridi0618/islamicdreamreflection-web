"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getMemory, type DreamMemory } from "@/lib/dream-memory";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

/** Restores a saved reflection (owner's device only). */
export function MemoryDetailClient() {
  const { id } = useParams<{ id: string }>();
  const [memory, setMemory] = useState<DreamMemory | null | undefined>(undefined);

  useEffect(() => {
    if (typeof id === "string") setMemory(getMemory(id));
  }, [id]);

  if (memory === undefined) return null;
  if (memory === null) {
    return (
      <div className="my-dreams__empty">
        <h2>Reflection not found</h2>
        <p>It may have been removed from this device.</p>
        <Link href="/my-dreams" className="my-dreams__cta">
          ← Back to My Dream Reflections
        </Link>
      </div>
    );
  }

  return (
    <div className="memory-detail">
      <Link href="/my-dreams" className="memory-detail__back">
        ← Back to My Dream Reflections
      </Link>

      <div className="memory-detail__head">
        <h2>🌙 {memory.title}</h2>
        <p className="memory-detail__meta">
          Created {formatDate(memory.createdAt)}
          {memory.shareId && " · shared"}
        </p>
      </div>

      {memory.userFeeling && (
        <section className="memory-detail__block">
          <h3>How it made you feel</h3>
          <p>{memory.userFeeling}</p>
        </section>
      )}

      {memory.expectation && (
        <section className="memory-detail__block">
          <h3>Reflecting on</h3>
          <p>{memory.expectation}</p>
        </section>
      )}

      {memory.dreamText && (
        <section className="memory-detail__block">
          <h3>Your dream</h3>
          <p className="memory-detail__private">{memory.dreamText}</p>
        </section>
      )}

      {memory.focus.length > 0 && (
        <section className="memory-detail__block">
          <h3>Focus</h3>
          <p>{memory.focus.join(", ")}</p>
        </section>
      )}

      {memory.reflection && (
        <section className="memory-detail__block">
          <h3>Reflection</h3>
          <div className="memory-detail__reflection">
            {memory.reflection.split("\n").map((line, i) =>
              line.trim() ? <p key={i}>{line}</p> : null
            )}
          </div>
        </section>
      )}

      <p className="memory-detail__note">
        Stored only on this device. Anonymous reflections are kept for 7 days.
        Dream reflections are not predictions or religious rulings.
      </p>

      <div className="memory-detail__cta">
        <Link href="/interpreter" className="my-dreams__cta">
          Begin a new reflection
        </Link>
      </div>
    </div>
  );
}
