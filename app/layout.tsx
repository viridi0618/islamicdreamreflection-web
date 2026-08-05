import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { organizationSchema, webSiteSchema } from "@/lib/schema";

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

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <header className="site-header">
          <div className="shell site-header__inner">
            <Link href="/" className="brand">
              <span className="brand__mark" aria-hidden="true">
                ٩
              </span>
              <span>{SITE_NAME}</span>
            </Link>
            <nav className="site-nav" aria-label="Main">
              <Link href="/">Home</Link>
              <Link href="/#dreams">Dreams</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/my-dreams">My Dreams</Link>
              <Link href="/#reflection" className="site-nav__cta">
                Start a Reflection
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="shell site-footer__inner">
            <span>{SITE_NAME}</span>
            <nav className="site-footer__nav" aria-label="Footer">
              <Link href="/about">About</Link>
              <Link href="/about#interpretation-guidance">
                About our interpretations
              </Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
