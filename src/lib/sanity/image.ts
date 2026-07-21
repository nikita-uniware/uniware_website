import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

const builder =
  projectId != null
    ? createImageUrlBuilder({ projectId, dataset })
    : null;

/** Build a Sanity CDN URL for an image field (or return null if unavailable). */
export function urlForImage(source: SanityImageSource | null | undefined) {
  if (!builder || !source) return null;
  return builder.image(source);
}
