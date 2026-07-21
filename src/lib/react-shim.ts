/**
 * Re-export React with useEffectEvent polyfill for Sanity Studio v6.
 * Next.js 15 bundles an older compiled React without this API.
 */
export * from "react";
export { useEffectEvent } from "use-effect-event";
