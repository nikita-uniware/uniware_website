"use client";

import { CaretDown, CaretRight, List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

const CLOUD_SOLUTIONS = [
  { href: "/solutions/cloud/infrastructure", label: "Infrastructure" },
  { href: "/solutions/cloud/networking", label: "Networking" },
  { href: "/solutions/cloud/operations", label: "Operations" },
  { href: "/solutions/cloud/security", label: "Security" },
  { href: "/solutions/cloud/aws", label: "AWS" },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const onContact =
    pathname === "/contact" || pathname.startsWith("/contact/");
  const onSolutions = pathname.startsWith("/solutions/");
  const onCloud = pathname.startsWith("/solutions/cloud/");
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [cloudOpen, setCloudOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCloudOpen, setMobileCloudOpen] = useState(false);
  const solutionsMenuId = useId();
  const cloudMenuId = useId();
  const mobileMenuId = useId();
  const mobileCloudMenuId = useId();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSolutionsOpen(false);
    setCloudOpen(false);
    setMobileOpen(false);
    setMobileCloudOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!solutionsOpen && !mobileOpen) return;

    function onPointerDown(event: MouseEvent) {
      if (
        solutionsOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSolutionsOpen(false);
        setCloudOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setSolutionsOpen(false);
      setCloudOpen(false);
      setMobileOpen(false);
      setMobileCloudOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen, solutionsOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <header
      className="site-nav bg-linear-90 from-uw-dark-blue to-uw-black"
      role="banner"
    >
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
        <nav className="site-nav-links site-nav-desktop" aria-label="Main navigation">
          <div
            className={`site-nav-dropdown${solutionsOpen ? " is-open" : ""}`}
            ref={dropdownRef}
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => {
              setSolutionsOpen(false);
              setCloudOpen(false);
            }}
          >
            <button
              type="button"
              className={`site-nav-link site-nav-dropdown-trigger${
                onSolutions ? " is-active" : ""
              }`}
              aria-expanded={solutionsOpen}
              aria-controls={solutionsMenuId}
              aria-haspopup="menu"
              onClick={() => {
                setSolutionsOpen((open) => !open);
                setCloudOpen(false);
              }}
            >
              Solutions
              <CaretDown
                className="site-nav-dropdown-caret"
                size={12}
                weight="regular"
                aria-hidden="true"
              />
            </button>
            <div
              id={solutionsMenuId}
              className="site-nav-dropdown-menu"
              role="menu"
              hidden={!solutionsOpen}
            >
              <Link
                href="/solutions/cybersecurity"
                className={`site-nav-dropdown-item${
                  pathname.startsWith("/solutions/cybersecurity")
                    ? " is-active"
                    : ""
                }`}
                role="menuitem"
              >
                Cybersecurity
              </Link>

              <div
                className={`site-nav-submenu${cloudOpen ? " is-open" : ""}`}
                onMouseEnter={() => setCloudOpen(true)}
                onMouseLeave={() => setCloudOpen(false)}
              >
                <button
                  type="button"
                  className={`site-nav-dropdown-item site-nav-submenu-trigger${
                    onCloud ? " is-active" : ""
                  }`}
                  role="menuitem"
                  aria-haspopup="menu"
                  aria-expanded={cloudOpen}
                  aria-controls={cloudMenuId}
                  onClick={() => setCloudOpen((open) => !open)}
                >
                  Cloud
                  <CaretRight size={12} weight="regular" aria-hidden="true" />
                </button>
                <div
                  id={cloudMenuId}
                  className="site-nav-dropdown-menu site-nav-submenu-menu"
                  role="menu"
                  hidden={!cloudOpen}
                >
                  {CLOUD_SOLUTIONS.map((item) => {
                    const active =
                      pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`site-nav-dropdown-item${
                          active ? " is-active" : ""
                        }`}
                        role="menuitem"
                        aria-current={active ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <Link
                href="/solutions/data-centre-infrastructure"
                className={`site-nav-dropdown-item${
                  pathname.startsWith("/solutions/data-centre-infrastructure")
                    ? " is-active"
                    : ""
                }`}
                role="menuitem"
              >
                Data Centre Infrastructure
              </Link>
            </div>
          </div>
          <Link href="/resources/case-studies" className="site-nav-link">
            Case studies
          </Link>
          <Link
            href="/contact"
            className={
              onContact
                ? "btn-size-sm btn-surface-dark-ghost"
                : "btn-size-sm btn-surface-dark"
            }
            aria-current={onContact ? "page" : undefined}
          >
            Get in touch
          </Link>
        </nav>

        <div className="site-nav-mobile-actions">
          <Link
            href="/contact"
            className={
              onContact
                ? "btn-size-sm btn-surface-dark-ghost"
                : "btn-size-sm btn-surface-dark"
            }
            aria-current={onContact ? "page" : undefined}
          >
            Get in touch
          </Link>
          <button
            type="button"
            className="site-nav-mobile-trigger"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            aria-controls={mobileMenuId}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <X size={24} weight="regular" aria-hidden="true" />
            ) : (
              <List size={24} weight="regular" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <nav
        id={mobileMenuId}
        className={`site-nav-mobile-panel${mobileOpen ? " is-open" : ""}`}
        aria-label="Mobile navigation"
        hidden={!mobileOpen}
      >
        <div className="site-nav-mobile-panel-inner">
          <div className="site-nav-mobile-group">
            <p className="site-nav-mobile-heading">Solutions</p>
            <Link
              href="/solutions/cybersecurity"
              className="site-nav-mobile-link"
            >
              Cybersecurity
            </Link>
            <button
              type="button"
              className={`site-nav-mobile-link site-nav-mobile-cloud-trigger${
                onCloud ? " is-active" : ""
              }`}
              aria-expanded={mobileCloudOpen}
              aria-controls={mobileCloudMenuId}
              onClick={() => setMobileCloudOpen((open) => !open)}
            >
              Cloud
              <CaretDown
                size={16}
                weight="regular"
                className="site-nav-mobile-cloud-caret"
                aria-hidden="true"
              />
            </button>
            <div
              id={mobileCloudMenuId}
              className="site-nav-mobile-cloud-links"
              hidden={!mobileCloudOpen}
            >
              {CLOUD_SOLUTIONS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="site-nav-mobile-sublink"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href="/solutions/data-centre-infrastructure"
              className="site-nav-mobile-link"
            >
              Data Centre Infrastructure
            </Link>
          </div>

          <div className="site-nav-mobile-group">
            <p className="site-nav-mobile-heading">Resources</p>
            <Link
              href="/resources/case-studies"
              className="site-nav-mobile-link"
            >
              Case studies
            </Link>
          </div>

          <Link href="/contact" className="site-nav-mobile-link">
            Contact
          </Link>

          <Link
            href="/contact"
            className="btn-size-md btn-surface-dark site-nav-mobile-cta"
          >
            Get in touch
          </Link>
        </div>
      </nav>
    </header>
  );
}
