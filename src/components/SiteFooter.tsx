import Link from "next/link";

/**
 * Footer never uses data-reveal — always fully visible.
 * Final concept from Niki still pending; spacing matches the cyber HTML footer.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/logo-wordmark.svg"
          alt="Uniware Systems"
          className="footer-logo"
          width={160}
          height={40}
        />
        <p className="footer-tagline">Adaptive Technology Integrators</p>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/solutions/cybersecurity" className="footer-link">
            Cybersecurity
          </Link>
          <span className="footer-sep" aria-hidden="true" />
          <Link href="/resources/case-studies" className="footer-link">
            Case studies
          </Link>
          <span className="footer-sep" aria-hidden="true" />
          <Link href="/contact" className="footer-link">
            Contact
          </Link>
          <span className="footer-sep" aria-hidden="true" />
          <a
            href="https://www.linkedin.com/company/uniware-systems/"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </nav>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">© 2026 Uniware Systems. All rights reserved.</p>
      </div>
    </footer>
  );
}
