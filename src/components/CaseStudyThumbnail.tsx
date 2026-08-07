import {
  resolveThumbnailIconName,
} from "@/lib/caseStudyThumbnail";
import { THUMBNAIL_ICON_COMPONENTS } from "@/lib/caseStudyThumbnailIcons";
import { Shield } from "@phosphor-icons/react/dist/ssr";

type CaseStudyThumbnailProps = {
  slug: string;
  stat: { number: string; label: string } | null;
  /** When set, used instead of hash-based auto-pick. */
  thumbnailIconOverride?: string | null;
};

export function CaseStudyThumbnail({
  slug,
  stat,
  thumbnailIconOverride,
}: CaseStudyThumbnailProps) {
  const iconName = resolveThumbnailIconName(slug, thumbnailIconOverride);
  const Icon = THUMBNAIL_ICON_COMPONENTS[iconName] ?? Shield;

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
