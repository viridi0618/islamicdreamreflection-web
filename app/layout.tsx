import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ENABLED_PAGES, SITE_NAME, SITE_URL } from "@/lib/site";
import { organizationSchema, webSiteSchema } from "@/lib/schema";
import { allDreamArticles } from "@/lib/dream-articles";
import { allGuides } from "@/lib/guides";
import Analytics from "@/components/analytics";
import { FloatingContentActions } from "@/components/FloatingContentActions";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} — Traditional Islamic Dream Interpretation`,
  description:
    "Recorded interpretations of dream symbols in the Islamic tradition, organized from classical Islamic dream sources. Traditional interpretations, not predictions.",
  openGraph: {
    siteName: SITE_NAME,
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

const jsonLd = [organizationSchema(), webSiteSchema()];

const PUBLIC_FLOATING_ACTION_PATHS = [
  "/",
  "/about",
  "/contact",
  "/faq",
  "/guides",
  "/interpreter",
  "/my-dreams",
  "/privacy",
  "/sources-methodology",
  "/terms",
  ...ENABLED_PAGES.map((page) => `/dreams/${page.slug}`),
  ...allGuides().map((guide) => `/guides/${guide.slug}`),
  ...allDreamArticles().map((article) => `/guides/${article.slug}`)
];

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Analytics />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <header className="site-header">
          <div className="shell site-header__inner">
            <Link href="/" className="brand" aria-label={`${SITE_NAME} home`}>
              <span className="brand__mark" aria-hidden="true">
                ٩
              </span>
              <span>{SITE_NAME}</span>
            </Link>
            <nav className="site-nav" aria-label="Main">
              <Link href="/guides">Dream Guides</Link>
              <Link href="/my-dreams">My Dreams</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/#reflection" className="site-nav__cta">
                Start <span className="site-nav__cta-full">a Reflection</span>
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <FloatingContentActions publicPaths={PUBLIC_FLOATING_ACTION_PATHS} />
        <footer className="site-footer">
          <div className="shell">
            <div className="site-footer__grid">
              <nav className="site-footer__group" aria-label="Explore">
                <h3>Explore</h3>
                <Link href="/">Home</Link>
                <Link href="/guides">Dream Guides</Link>
                <Link href="/faq">FAQ</Link>
                <Link href="/my-dreams">My Dreams</Link>
              </nav>
              <nav className="site-footer__group" aria-label="Sources and guides">
                <h3>Sources and guides</h3>
                <Link href="/sources-methodology">Sources &amp; Methodology</Link>
                <Link href="/guides/three-types-of-dreams-in-islam">
                  Three Types of Dreams
                </Link>
                <Link href="/guides/what-to-do-after-a-bad-dream">
                  After a Bad Dream
                </Link>
                <Link href="/guides/dreams-in-the-quran">
                  Dreams in the Qur’an
                </Link>
              </nav>
              <nav className="site-footer__group" aria-label="Privacy and terms">
                <h3>Privacy and terms</h3>
                <Link href="/privacy">Privacy</Link>
                <Link href="/terms">Terms</Link>
                <Link href="/contact">Contact</Link>
              </nav>
              <div className="site-footer__brand">
                <span className="site-footer__brand-name">{SITE_NAME}</span>
                <p className="footer-legal">
                  Islamic Dream Reflection offers private, source-transparent
                  reflection through Islamic traditions and personal context.
                  It does not provide predictions, fatwas, or knowledge of the
                  unseen.
                </p>
                <a
                  href="https://findly.tools/islamicdreamreflection?utm_source=islamicdreamreflection"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__badge"
                >
                  {/* Third-party SVG badge: keep plain <img> (fixed size, no
                      next/image optimization, avoids dangerouslyAllowSVG). */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://findly.tools/badges/findly-tools-badge-light.svg"
                    alt="Featured on Findly.tools"
                    width="175"
                    height="55"
                  />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
