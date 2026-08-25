import type { Icon } from "@phosphor-icons/react";

/**
 * Shared icon-box unit for the .tile-prev card pattern
 * (cybersecurity.page.css). Renders a Phosphor icon at Fill weight,
 * permanently — no Regular weight, no hover-triggered swap. Replaces
 * the identical inline icon markup previously duplicated across
 * CloudNetworkingPage, AwsManagedServicesPage, AwsConsultingPage,
 * AwsRdsPage, AwsGenAiPage, CloudSecurityPage, and CloudOperationsPage.
 *
 * Light-surface only (.tile-icon-w) — every current caller sits on a
 * white/.prevention section. Extend with a dark variant if a caller
 * ever needs .tile-icon-d.
 */
type IconTileProps = {
  icon: Icon;
};

export function IconTile({ icon: TileIcon }: IconTileProps) {
  return (
    <div className="tile-icon-w" aria-hidden="true">
      <TileIcon size={16} weight="fill" />
    </div>
  );
}
