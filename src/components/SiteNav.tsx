import Link from "next/link";

export function SiteNav() {
  return (
    <header className="site-nav" role="banner">
      <div className="site-nav-inner">
        <Link href="/" className="site-nav-logo" aria-label="Uniware Systems — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-mark.svg"
            alt="Uniware Systems"
            className="site-nav-logo-mark"
            height={32}
            width={32}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-wordmark.svg"
            alt="Uniware Systems"
            className="site-nav-logo-word"
            height={28}
            width={140}
          />
        </Link>
        <nav className="site-nav-links" aria-label="Main navigation">
          <Link href="/resources/case-studies" className="site-nav-link">
            Case studies
          </Link>
          <Link href="/company/contact" className="site-nav-cta">
            Get in touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
