/**
 * Shared case-study thumbnail icon selection (cards + OG image).
 * Auto-pick uses the same hash salt ("icon") as CaseStudyThumbnail.
 */

/** Default 6 icons when thumbnailIconOverride is empty — must stay in this order. */
export const AUTO_PICK_ICON_NAMES = [
  "Shield",
  "Cloud",
  "Database",
  "LockKey",
  "HardDrives",
  "ArrowClockwise",
] as const;

/**
 * Studio dropdown values (Niki's list). Empty = auto-pick.
 * BuildingsOffice / Server / Router are aliased to icons that exist in
 * @phosphor-icons/react@2.1.10 (BuildingOffice, ComputerTower, Broadcast).
 */
export const THUMBNAIL_ICON_OVERRIDE_OPTIONS = [
  "ShieldCheck",
  "Lock",
  "LockKey",
  "Vault",
  "ShieldWarning",
  "Detective",
  "Eye",
  "Fingerprint",
  "Key",
  "HardDrives",
  "Database",
  "Server",
  "Desktop",
  "Cloud",
  "CloudArrowUp",
  "Network",
  "WifiHigh",
  "Router",
  "ChartBar",
  "ChartLineUp",
  "Graph",
  "BracketsAngle",
  "Code",
  "Brain",
  "Cpu",
  "Robot",
  "MagnifyingGlass",
  "Buildings",
  "Briefcase",
  "Factory",
  "Wrench",
  "Gear",
  "Stack",
  "ArrowsClockwise",
  "Lightning",
  "BuildingsOffice",
  "Blueprint",
] as const;

export type ThumbnailIconOverride =
  (typeof THUMBNAIL_ICON_OVERRIDE_OPTIONS)[number];

/** Map Studio / Niki names → actual Phosphor export names in this package. */
export const THUMBNAIL_ICON_ALIASES: Record<string, string> = {
  BuildingsOffice: "BuildingOffice",
  Server: "ComputerTower",
  Router: "Broadcast",
};

/**
 * Simple stable string hash, salted so the same slug can be hashed
 * multiple times with different (still deterministic) results.
 */
export function hashSlug(slug: string, salt: string): number {
  let hash = 0;
  const input = `${salt}::${slug}`;
  for (let i = 0; i < input.length; i++) {
    hash = hash * 31 + input.charCodeAt(i);
  }
  return Math.abs(hash);
}

/** Resolve to a Phosphor component / SVG path key used by the site. */
export function resolveThumbnailIconName(
  slug: string,
  override?: string | null
): string {
  const trimmed = override?.trim();
  if (trimmed) {
    return THUMBNAIL_ICON_ALIASES[trimmed] ?? trimmed;
  }
  const index = hashSlug(slug, "icon") % AUTO_PICK_ICON_NAMES.length;
  return AUTO_PICK_ICON_NAMES[index];
}
