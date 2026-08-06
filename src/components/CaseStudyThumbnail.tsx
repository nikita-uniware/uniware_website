import {
  ArrowClockwise,
  Cloud,
  Database,
  HardDrives,
  LockKey,
  Shield,
} from "@phosphor-icons/react/dist/ssr";

const TONES = [
  "var(--thumbnail-tone-1)",
  "var(--thumbnail-tone-2)",
  "var(--thumbnail-tone-3)",
  "var(--thumbnail-tone-4)",
  "var(--thumbnail-tone-5)",
  "var(--thumbnail-tone-6)",
] as const;

const ICONS = [Shield, Cloud, Database, LockKey, HardDrives, ArrowClockwise] as const;

/**
 * Simple stable string hash, salted so the same slug can be hashed
 * multiple times with different (still deterministic) results — used
 * to pick tone and icon independently below, so a 6-tone x 6-icon
 * thumbnail has 36 possible combinations instead of 6.
 */
function hashSlug(slug: string, salt: string): number {
  let hash = 0;
  const input = `${salt}::${slug}`;
  for (let i = 0; i < input.length; i++) {
    hash = hash * 31 + input.charCodeAt(i);
  }
  return Math.abs(hash);
}

export function CaseStudyThumbnail({ slug }: { slug: string }) {
  const toneIndex = hashSlug(slug, "tone") % TONES.length;
  const iconIndex = hashSlug(slug, "icon") % ICONS.length;
  const tone = TONES[toneIndex];
  const Icon = ICONS[iconIndex];

  return (
    <div
      className="csi-thumbnail"
      style={{ background: tone }}
      aria-hidden="true"
    >
      <div className="circle-group circle-group--xs circle-group--center">
        <div className="circle-ring circle-ring--fill circle-xs-outer circle-fill-outer" />
        <div className="circle-ring circle-ring--fill circle-xs-middle circle-fill-middle" />
        <div className="circle-ring circle-ring--fill circle-xs-inner circle-fill-inner" />
      </div>
      <Icon
        size={40}
        weight="duotone"
        color="var(--amber-icon-tint)"
        className="csi-thumbnail-icon"
      />
    </div>
  );
}
