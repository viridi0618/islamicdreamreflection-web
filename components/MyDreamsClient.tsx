"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteMemory, loadMemories, type DreamMemory } from "@/lib/dream-memory";
import { track } from "@/lib/events";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export function MyDreamsClient() {
  const [memories, setMemories] = useState<DreamMemory[]>([]);

  useEffect(() => {
    setMemories(loadMemories());
    track("history_opened");
  }, []);

  function remove(id: string) {
    deleteMemory(id);
    setMemories(loadMemories());
  }

  if (memories.length === 0) {
    return (
      <div className="my-dreams__empty">
        <span className="my-dreams__empty-icon" aria-hidden="true">🌙</span>
        <h2>No reflections yet</h2>
        <p>
          Complete a dream reflection and save it — it will appear here on this
          device.
        </p>
        <Link href="/interpreter" className="my-dreams__cta">
          Begin Dream Reflection
        </Link>
      </div>
    );
  }

  return (
    <div className="my-dreams__list">
      {memories.map((m) => {
        const focus = m.focus.length > 0 ? m.focus.join(", ") : null;
        return (
          <article key={m.id} className="memory-card">
            <div className="memory-card__body">
              <h2>🌙 {m.title}</h2>
              {focus && <p className="memory-card__focus">Focus: {focus}</p>}
              <p className="memory-card__meta">Created: {formatDate(m.createdAt)}</p>
            </div>
            <div className="memory-card__actions">
              <Link href={`/my-dreams/${m.id}`} className="memory-card__view">
                View Reflection →
              </Link>
              <button
                type="button"
                className="memory-card__delete"
                onClick={() => remove(m.id)}
                aria-label="Delete this reflection"
              >
                Delete
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
