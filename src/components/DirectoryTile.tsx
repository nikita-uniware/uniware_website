import { ImageSquare, type Icon } from "@phosphor-icons/react";
import "@/styles/directory-tile.css";

/**
 * Shared, self-contained directory-card component: whole card is a
 * single link, footer keeps a "go to page" link, for hub-style pages
 * that link out to other pages. Styles live in directory-tile.css,
 * built from globals.css/cybersecurity.page.css tokens only — this
 * component is fully independent of any page-scoped CSS.
 *
 * Icon slot is one flexible prop: pass `icon` for a normal Phosphor
 * icon (Regular, Fill on hover). Omit it for the AWS-logo placeholder
 * slot instead — used until real AWS Architecture Icons are supplied
 * for the Workloads directory.
 */
type DirectoryTileProps = {
  variant: "light" | "dark";
  icon?: Icon;
  heading: string;
  body: string;
  href: string;
  linkText?: string;
};

const ArrowRight = ({ className }: { className: string }) => (
  <svg
    className={className}
    width="12"
    height="12"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" />
  </svg>
);

const ArrowDiagonal = ({ className }: { className: string }) => (
  <svg
    className={className}
    width="12"
    height="12"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 11L11 3M11 3H5M11 3V9" />
  </svg>
);

export function DirectoryTile({
  variant,
  icon: TileIcon,
  heading,
  body,
  href,
  linkText = "Go to page",
}: DirectoryTileProps) {
  // .link-text-light = var(--uw-amber-light) (#BB6D08, darker amber
  // brown) — correct for links on light/white surfaces. .link-text-dark
  // = var(--uw-amber-dark) (#E9A638, lighter amber yellow) — correct for
  // links on dark surfaces.
  const linkColorClass = variant === "light" ? "link-text-light" : "link-text-dark";

  return (
    <a href={href} className={`directory-tile directory-tile--${variant}`}>
      <div className={`directory-tile-icon directory-tile-icon--${variant}`} aria-hidden="true">
        {TileIcon ? (
          <>
            <span className="directory-tile-icon-stroke">
              <TileIcon size={16} weight="regular" />
            </span>
            <span className="directory-tile-icon-fill">
              <TileIcon size={16} weight="fill" />
            </span>
          </>
        ) : (
          // DEV PLACEHOLDER — AWS logo to be swapped in — source: AWS
          // Architecture Icons. ImageSquare here is a deliberate "logo
          // coming soon" glyph, not meant to read as this product's
          // real icon.
          <ImageSquare size={16} weight="regular" className="directory-tile-logo-placeholder" />
        )}
      </div>
      <p className={`directory-tile-heading directory-tile-heading--${variant}`}>{heading}</p>
      <p className={`directory-tile-body directory-tile-body--${variant}`}>{body}</p>
      <span className={`link-text ${linkColorClass} link-text-md link-text--external`}>
        {linkText}
        <span className="link-text-arrow-wrap">
          <ArrowRight className="link-text-arrow-default" />
          <ArrowDiagonal className="link-text-arrow-hover" />
        </span>
      </span>
    </a>
  );
}
