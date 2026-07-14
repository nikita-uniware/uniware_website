import Link from "next/link";

/**
 * Footer never uses data-reveal — always fully visible.
 * Final concept from Niki still pending; this matches the cybersecurity HTML footer.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/logo-wordmark.svg"
          alt="Uniware Systems"
          className="footer-logo"
          width={160}
          height={36}
        />
        <p className="footer-tagline">Adaptive Technology Integrators</p>
        <nav className="footer-links" aria-label="Footer">
          <Link href="/solutions/cybersecurity">Cybersecurity</Link>
          <Link href="/resources/case-studies">Case studies</Link>
          <Link href="/company/contact">Contact</Link>
          <a
            href="https://www.linkedin.com/company/uniware-systems/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Uniware Systems. All rights reserved.</p>
      </div>
    </footer>
  );
}
