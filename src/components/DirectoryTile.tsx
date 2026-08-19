import { ImageSquare, type Icon } from "@phosphor-icons/react";
import "@/styles/directory-tile.css";

/**
 * Shared, self-contained directory-card component: whole card is a
 * single link, footer keeps a "go to page" link, for hub-style pages
 * that link out to other pages. Fully independent of any page-scoped
 * CSS — styles live in directory-tile.css, built from globals.css
 * tokens only.
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
          // DEV PLACEHOLDER — real AWS product logo not supplied yet.
          // Swap for the official AWS Architecture Icon once Niki provides
          // it. ImageSquare here is a deliberate "logo coming soon" glyph,
          // not meant to read as this product's real icon.
          <ImageSquare size={16} weight="regular" className="directory-tile-logo-placeholder" />
        )}
      </div>
      <p className={`directory-tile-heading directory-tile-heading--${variant}`}>{heading}</p>
      <p className={`directory-tile-body directory-tile-body--${variant}`}>{body}</p>
      <span className={`directory-tile-link directory-tile-link--${variant}`}>
        {linkText}
        <span className="directory-tile-link-arrow-wrap">
          <ArrowRight className="directory-tile-link-arrow-default" />
          <ArrowDiagonal className="directory-tile-link-arrow-hover" />
        </span>
      </span>
    </a>
  );
}
