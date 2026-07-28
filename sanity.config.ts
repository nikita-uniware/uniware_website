import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ubaw4uif";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "uniware-website",
  title: "Uniware Website",
  projectId,
  dataset,
  basePath: process.env.SANITY_STUDIO_BASE_PATH || "/studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  // Next.js postcss.config.mjs (Tailwind) breaks Sanity's Vite — ignore it here.
  vite: {
    css: {
      postcss: {
        plugins: [],
      },
    },
  },
});
