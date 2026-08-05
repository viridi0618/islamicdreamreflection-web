"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Share Card MVP — draws a PNG on canvas.
 *
 * Content rules (enforced by construction):
 *  - Only symbols, themes and focus areas; NEVER the dream text.
 *  - No religious assertions, no predictions.
 *  - Plain, warm visual: crescent, geometric frame, brand palette.
 */

export interface ShareCardProps {
  symbols: string[];
  themes: string[];
  focus: string[];
}

const W = 720;
const H = 800;

const COLORS = {
  paper: "#faf6ec",
  ink: "#201c14",
  soft: "#4c4538",
  faint: "#7a7161",
  green: "#0d3b2e",
  greenMid: "#16543f",
  gold: "#b8923f",
  goldBright: "#d3ac5e"
};

const ICONS: Record<string, string> = {
  snake: "🐍",
  water: "🌊",
  "dead person": "🕊️",
  teeth: "🦷",
  pregnancy: "🌙"
};

function iconFor(name: string): string {
  const key = name.toLowerCase();
  return ICONS[key] ?? "🌙";
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export function ShareCard({ symbols, themes, focus }: ShareCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = COLORS.paper;
    ctx.fillRect(0, 0, W, H);

    // Border frame
    ctx.strokeStyle = COLORS.gold;
    ctx.lineWidth = 2;
    ctx.strokeRect(26, 26, W - 52, H - 52);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(184,146,63,0.45)";
    ctx.strokeRect(42, 42, W - 84, H - 84);

    // Crescent (top center)
    ctx.save();
    ctx.translate(W / 2, 120);
    ctx.fillStyle = COLORS.green;
    ctx.beginPath();
    ctx.arc(-28, 0, 46, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLORS.paper;
    ctx.beginPath();
    ctx.arc(6, -10, 38, 0, Math.PI * 2);
    ctx.fill();
    // small star
    ctx.fillStyle = COLORS.gold;
    ctx.font = "30px serif";
    ctx.textAlign = "center";
    ctx.fillText("✦", 40, 12);
    ctx.restore();

    // Title — Moon Reflection Card
    ctx.fillStyle = COLORS.ink;
    ctx.font = "600 26px Georgia, 'Times New Roman', serif";
    ctx.textAlign = "center";
    ctx.fillText("Moon Reflection Card 🌙", W / 2, 196);

    ctx.fillStyle = COLORS.faint;
    ctx.font = "15px 'Segoe UI', Arial, sans-serif";
    ctx.fillText(
      new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      W / 2,
      226
    );

    // Symbols
    const symbolNames = symbols.slice(0, 3);
    const symbolEmojis = symbolNames.map(iconFor);
    ctx.font = "64px serif";
    symbolEmojis.forEach((emoji, i) => {
      ctx.fillText(emoji, W / 2 - ((symbolEmojis.length - 1) * 90) / 2 + i * 90, 318);
    });

    ctx.fillStyle = COLORS.soft;
    ctx.font = "600 22px Georgia, 'Times New Roman', serif";
    ctx.fillText(
      `Symbol${symbolNames.length === 1 ? "" : "s"}: ${symbolNames.join(", ") || "Unmatched"}`,
      W / 2,
      368
    );

    // Themes
    if (themes.length > 0) {
      ctx.font = "20px 'Segoe UI', Arial, sans-serif";
      ctx.fillStyle = COLORS.greenMid;
      ctx.fillText(`Theme: ${themes.join(" · ")}`, W / 2, 424);
    }

    // Focus
    if (focus.length > 0) {
      ctx.font = "20px 'Segoe UI', Arial, sans-serif";
      ctx.fillStyle = COLORS.gold;
      ctx.fillText(`Focus: ${focus.join(" · ")}`, W / 2, 460);
    }

    // Divider
    ctx.strokeStyle = "rgba(32,28,20,0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 140, 500);
    ctx.lineTo(W / 2 + 140, 500);
    ctx.stroke();

    // Domain / CTA
    ctx.fillStyle = COLORS.ink;
    ctx.font = "600 24px Georgia, 'Times New Roman', serif";
    ctx.fillText("Explore your dream", W / 2, 556);

    const domain = typeof window !== "undefined" ? window.location.origin.replace(/^https?:\/\//, "") : "your-domain.com";
    ctx.fillStyle = COLORS.greenMid;
    ctx.font = "18px 'Segoe UI', Arial, sans-serif";
    ctx.fillText(domain, W / 2, 594);

    // Trust label (Phase 5.1 P0-8-6)
    ctx.fillStyle = COLORS.gold;
    ctx.font = "600 16px 'Segoe UI', Arial, sans-serif";
    ctx.fillText("Inspired by Islamic Dream Traditions 🌙", W / 2, 636);

    // Disclaimer line
    ctx.fillStyle = COLORS.faint;
    ctx.font = "15px 'Segoe UI', Arial, sans-serif";
    const disclaimer = "Dream reflections are not predictions or religious rulings.";
    wrapText(ctx, disclaimer, W - 200).forEach((line, i) => {
      ctx.fillText(line, W / 2, 700 + i * 22);
    });

    setDownloaded(false);
  }, [symbols, themes, focus]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "dream-reflection.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    setDownloaded(true);
  }

  return (
    <section className="share-card" aria-labelledby="share-heading">
      <h2 id="share-heading">Moon Reflection Card 🌙</h2>
      <p className="share-card__hint">
        A shareable card with the focus, symbols and date of your reflection —
        your dream text is never included.
      </p>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="share-card__canvas"
        aria-label="Dream reflection share card preview"
      />
      <div className="share-card__actions">
        <button type="button" className="share-card__btn" onClick={download}>
          {downloaded ? "Saved ✓" : "Download PNG"}
        </button>
      </div>
    </section>
  );
}
