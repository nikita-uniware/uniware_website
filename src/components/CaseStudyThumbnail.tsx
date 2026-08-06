import {
  ArrowClockwise,
  Cloud,
  Database,
  HardDrives,
  LockKey,
  Shield,
} from "@phosphor-icons/react/dist/ssr";

const ICONS = [Shield, Cloud, Database, LockKey, HardDrives, ArrowClockwise] as const;

/**
 * Simple stable string hash, salted so the same slug can be hashed
 * multiple times with different (still deterministic) results if more
 * hashed properties are ever needed again — icon selection uses it as-is.
 */
function hashSlug(slug: string, salt: string): number {
  let hash = 0;
  const input = `${salt}::${slug}`;
  for (let i = 0; i < input.length; i++) {
    hash = hash * 31 + input.charCodeAt(i);
  }
  return Math.abs(hash);
}

type CaseStudyThumbnailProps = {
  slug: string;
  stat: { number: string; label: string } | null;
};

export function CaseStudyThumbnail({ slug, stat }: CaseStudyThumbnailProps) {
  const iconIndex = hashSlug(slug, "icon") % ICONS.length;
  const Icon = ICONS[iconIndex];

  return (
    <div
      className="csi-thumbnail"
      style={{ background: "var(--thumbnail-tone-3)" }}
      aria-hidden="true"
    >
      <div className="csi-thumbnail-visual">
        <div className="circle-group circle-group--xs circle-group--center">
          <div className="circle-ring circle-ring--fill circle-xs-outer circle-fill-outer" />
          <div className="circle-ring circle-ring--fill circle-xs-middle circle-fill-middle" />
          <div className="circle-ring circle-ring--fill circle-xs-inner circle-fill-inner" />
        </div>
        <Icon
          size={40}
          weight="duotone"
          color="var(--thumbnail-icon-tint)"
          className="csi-thumbnail-icon"
        />
      </div>
      {stat ? (
        <>
          <div className="csi-thumbnail-divider" />
          <div className="csi-thumbnail-stat">
            <div className="csi-thumbnail-stat-number">{stat.number}</div>
            <div className="csi-thumbnail-stat-label">{stat.label}</div>
          </div>
        </>
      ) : null}
    </div>
  );
}
