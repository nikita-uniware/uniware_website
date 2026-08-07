import { ImageResponse } from "next/og";
import { fetchCaseStudyBySlug } from "@/lib/sanity";
import { resolveThumbnailIconName } from "@/lib/caseStudyThumbnail";
import { THUMBNAIL_ICON_SVG_PATHS } from "@/lib/caseStudyThumbnailSvg";

export const alt = "Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Matches card visual band: --thumbnail-tone-3 */
const TONE = "#F5E4C3";
/** Matches --thumbnail-icon-tint / --uw-wts-ring-current */
const INK = "#5C4A12";

/**
 * OG share preview — same amber band + concentric rings + icon as the
 * case study card thumbnail visual zone (hash-picked or Studio override).
 */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await fetchCaseStudyBySlug(slug);
  const iconName = resolveThumbnailIconName(
    slug,
    study?.thumbnailIconOverride
  );
  const paths =
    THUMBNAIL_ICON_SVG_PATHS[iconName] ?? THUMBNAIL_ICON_SVG_PATHS.Shield;

  // Scale of card --xs rings (190 / 128 / 64) and 40px icon for 1200×630.
  const outer = 475;
  const middle = 320;
  const inner = 160;
  const iconSize = 100;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: TONE,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            width: outer,
            height: outer,
            borderRadius: "50%",
            background: INK,
            opacity: 0.02,
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            width: middle,
            height: middle,
            borderRadius: "50%",
            background: INK,
            opacity: 0.03,
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            width: inner,
            height: inner,
            borderRadius: "50%",
            background: INK,
            opacity: 0.04,
          }}
        />
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 256 256"
          fill={INK}
          style={{ display: "flex" }}
        >
          {paths.map((p, i) => (
            <path key={i} d={p.d} opacity={p.opacity ?? "1"} fill={INK} />
          ))}
        </svg>
      </div>
    ),
    { ...size }
  );
}
