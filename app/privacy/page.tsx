import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Islamic Dream Reflection.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: { index: true, follow: true }
};

export default function PrivacyPage() {
  return (
    <article className="shell section">
      <div className="reading-container">
        <div className="section__head">
          <h1>Privacy Policy</h1>
          <span className="rule" />
        </div>

        <div className="prose">
        <p>Last updated: August 5, 2026</p>

        <h2>What we collect</h2>
        <p>
          Islamic Dream Reflection is designed to work without accounts. Dream
          reflections you save are stored locally in your own browser (for
          example, in your device&apos;s local storage), not on our servers.
          We do not require personal information such as your name or email to
          use the site.
        </p>

        <h2>Public share snapshots</h2>
        <p>
          When you choose to share a reflection, only a small set of public
          fields — such as symbols, themes and focus areas — is stored to
          generate the share page. Your dream text is not included in the
          shared snapshot. Shared pages expire automatically after a limited
          period.
        </p>

        <h2>AI analysis</h2>
        <p>
          When you describe a dream in the reflection tool, the text is sent
          to an AI service solely to generate your reflection. The dream text
          is not published, stored as a shareable page, or used to identify
          you.
        </p>

        <h2>Analytics and cookies</h2>
        <p>
          We may use basic, privacy-respecting analytics to understand which
          pages are visited. We do not sell personal data, and we do not use
          advertising trackers for cross-site profiling.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy questions, contact us at{" "}
          <a href="mailto:contact@islamicdreamreflection.com">
            contact@islamicdreamreflection.com
          </a>
          .
        </p>
        </div>
      </div>
    </article>
  );
}
