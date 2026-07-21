import type { Metadata, Viewport } from "next";
import {
  metadata as studioMetadata,
  viewport as studioViewport,
} from "next-sanity/studio";
import { Studio } from "./Studio";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Uniware Studio",
};

export const viewport: Viewport = {
  ...studioViewport,
  interactiveWidget: "resizes-content",
};

export default function StudioPage() {
  return <Studio />;
}
