import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} — Traditional Islamic Dream Interpretation`,
  description:
    "Recorded interpretations of dream symbols in the Islamic tradition, organized from classical Islamic dream sources. Traditional interpretations, not predictions.",
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="shell site-header__inner">
            <Link href="/" className="brand">
              <span className="brand__mark" aria-hidden="true">
                ٩
              </span>
              <span>Islamic Dream Knowledge</span>
            </Link>
            <nav className="site-nav" aria-label="Main">
              <Link href="/">Home</Link>
              <Link href="/interpreter">Interpreter</Link>
              <Link href="/#dreams">Dreams</Link>
              <Link href="/my-dreams">My Dreams</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="shell site-footer__inner">
            <span>
              {SITE_NAME} · Traditional interpretations, not predictions.
            </span>
            <span>
              Classical references are marked{" "}
              <em>pending verification</em> until reviewed.
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
