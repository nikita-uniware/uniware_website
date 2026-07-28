/**
 * Re-export React with useEffectEvent polyfill for Sanity Studio v6.
 * Next.js 15 bundles an older compiled React without this API.
 */
// @ts-expect-error React's type package uses export=, but runtime re-export works.
export * from "react";
export { useEffectEvent } from "use-effect-event";
