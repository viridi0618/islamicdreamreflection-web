"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getContentActionState,
  recordContentShareAction,
  setContentSaved,
  type ContentActionType
} from "@/lib/content-actions";

interface FloatingContentActionsProps {
  contentType: ContentActionType;
  slug: string;
  title: string;
  text?: string;
  href: string;
}

type Feedback = "saved" | "removed" | "copied" | "shared" | "copy-error" | null;

function BookmarkIcon({ saved }: { saved: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="floating-actions__icon">
      <path
        d="M7 4.75A2.25 2.25 0 0 1 9.25 2.5h5.5A2.25 2.25 0 0 1 17 4.75v16l-5-3.05-5 3.05v-16Z"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="floating-actions__icon">
      <path
        d="M8.6 13.3 15.4 17M15.4 7 8.6 10.7M18 8.75a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5ZM6 14.75a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5ZM18 20.75a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatShareCount(count: number): string {
  if (count < 1000) return String(count);
  if (count < 10_000) return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return `${Math.floor(count / 1000)}K+`;
}

async function copyUrl(url: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(url);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = url;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);
  if (!copied) throw new Error("Copy failed");
}

export function FloatingContentActions({
  contentType,
  slug,
  title,
  text,
  href
}: FloatingContentActionsProps) {
  const [saved, setSaved] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isSharing, setIsSharing] = useState(false);

  const contentLabel = contentType === "dream" ? "dream" : "guide";

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return href;
    return new URL(href, window.location.origin).toString();
  }, [href]);

  useEffect(() => {
    const state = getContentActionState(contentType, slug);
    setSaved(state.saved);
    setShareCount(state.shareCount);
  }, [contentType, slug]);

  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => setFeedback(null), 1800);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  function toggleSaved() {
    const nextSaved = !saved;
    const state = setContentSaved(contentType, slug, nextSaved);
    setSaved(state.saved);
    setFeedback(nextSaved ? "saved" : "removed");
  }

  function recordShare() {
    const result = recordContentShareAction(contentType, slug);
    setShareCount(result.state.shareCount);
  }

  async function handleShare() {
    if (isSharing) return;
    setIsSharing(true);
    const shareData = {
      title,
      text: text ?? title,
      url: shareUrl
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        recordShare();
        setFeedback("shared");
        return;
      }

      await copyUrl(shareUrl);
      recordShare();
      setFeedback("copied");
    } catch (error) {
      const name = error instanceof DOMException ? error.name : "";
      if (name === "AbortError") return;

      try {
        await copyUrl(shareUrl);
        recordShare();
        setFeedback("copied");
      } catch {
        setFeedback("copy-error");
      }
    } finally {
      setIsSharing(false);
    }
  }

  const feedbackText =
    feedback === "saved"
      ? "Saved"
      : feedback === "removed"
        ? "Removed"
        : feedback === "copied"
          ? "Copied"
          : feedback === "shared"
            ? "Shared"
            : feedback === "copy-error"
              ? "Unable to copy"
              : "";

  return (
    <aside className="floating-actions" aria-label={`${title} actions`}>
      <button
        type="button"
        className={`floating-actions__button${saved ? " floating-actions__button--saved" : ""}`}
        onClick={toggleSaved}
        aria-pressed={saved}
        aria-label={`${saved ? "Unsave" : "Save"} this ${contentLabel}`}
      >
        <BookmarkIcon saved={saved} />
        <span className="floating-actions__tooltip" role="tooltip">
          {saved ? "Saved" : "Save"}
        </span>
      </button>

      <div className="floating-actions__share">
        <button
          type="button"
          className="floating-actions__button"
          onClick={handleShare}
          disabled={isSharing}
          aria-label={`Share this ${contentLabel}`}
        >
          <ShareIcon />
          <span className="floating-actions__tooltip" role="tooltip">
            Share
          </span>
        </button>
        {shareCount > 0 && (
          <span className="floating-actions__count" aria-label={`${shareCount} share actions`}>
            {formatShareCount(shareCount)}
          </span>
        )}
      </div>

      <span className="floating-actions__status" aria-live="polite">
        {feedbackText}
      </span>
    </aside>
  );
}
