import type { CSSProperties } from "react";

type CircleGroupProps = {
  size?: "xl" | "lg" | "md" | "sm";
  surface?: "dark" | "light";
  position?: "bottom-right" | "bottom-left" | "top-right" | "middle-left";
  className?: string;
  /** Staggered scale-in on mount, matching the cybersecurity hero's raw
   * .circle-enter treatment (same 900ms curve, same 0/150/300ms stagger).
   * Off by default — only the hero uses this. */
  enterAnimation?: boolean;
  /** Rotation-speed tier, independent of `size`. Defaults to `size`, which
   * reproduces every existing usage's current behaviour unchanged (lg/md/sm
   * all rotate slower than xl). Pass `speed="xl"` to get a smaller ring
   * at the hero's faster rotation speed instead of the size's own default. */
  speed?: "xl" | "lg" | "md" | "sm";
  /** Fraction of the outer ring's diameter used as bleed past the anchor
   * corner/edge. Default 0.25 matches the cybersecurity hero's raw circle
   * exactly (120px / 480px) — keep the default wherever matching that
   * hero matters. Raise it per-instance to expose more of the inner
   * rings instead of changing this for every usage. */
  bleedMultiplier?: number;
  /** Overall group opacity, applied on top of the surface's own baked-in
   * stroke alpha (0.32). Undefined by default — every existing usage
   * renders unchanged. Pass a value below 1 to dial a group back to
   * subtle background texture instead of a competing graphic element. */
  opacity?: number;
  /** Escape hatch: merged over the computed position/z-index last, so a
   * caller can override e.g. `top` (when the anchor isn't a simple corner/
   * edge of the immediate parent) or `zIndex` (to force behind everything
   * in a specific stacking context). */
  style?: CSSProperties;
};

const dims = {
  xl: { outer: 480, middle: 320, inner: 160 },
  lg: { outer: 360, middle: 240, inner: 120 },
  md: { outer: 300, middle: 200, inner: 100 },
  sm: { outer: 240, middle: 160, inner: 80 },
};

const speeds = {
  xl: { outer: 14, middle: 20, inner: 9 },
  lg: { outer: 18, middle: 25, inner: 12 },
  md: { outer: 18, middle: 25, inner: 12 },
  sm: { outer: 18, middle: 25, inner: 12 },
};

export function CircleGroup({
  size = "xl",
  surface = "dark",
  position = "bottom-right",
  className = "",
  enterAnimation = false,
  bleedMultiplier = 0.25,
  speed,
  opacity,
  style: styleOverride,
}: CircleGroupProps) {
  const d = dims[size];
  const sp = speeds[speed ?? size];
  const color =
    surface === "dark" ? "rgba(255,255,255,0.32)" : "rgba(1,5,18,0.32)";
  const center = (outer: number, inner: number) => (outer - inner) / 2;
  const bleed = Math.round(d.outer * bleedMultiplier);
  const pos =
    position === "bottom-right"
      ? { bottom: -bleed, right: -bleed }
      : position === "bottom-left"
      ? { bottom: -bleed, left: -bleed }
      : position === "top-right"
      ? { top: -bleed, right: -bleed }
      : { top: `calc(50% - ${d.outer / 2}px)`, left: -bleed };

  const sizeClass = `uw-circles-${size}`;
  const posClass =
    position === "middle-left"
      ? "pos-middle-left"
      : position === "bottom-left"
      ? "pos-bottom-left"
      : size === "xl" && position === "top-right"
      ? "pos-top-right"
      : "";

  const base: CSSProperties = {
    position: "absolute",
    borderRadius: 1000,
    borderStyle: "solid",
    borderColor: color,
  };

  return (
    <div
      className={[sizeClass, posClass, className].filter(Boolean).join(" ")}
      style={{
        position: "absolute",
        width: d.outer,
        height: d.outer,
        pointerEvents: "none",
        zIndex: 0,
        opacity,
        ...pos,
        ...styleOverride,
      }}
      aria-hidden="true"
    >
      <Ring
        enterAnimation={enterAnimation}
        enterDelay={0}
        style={{
          ...base,
          width: d.outer,
          height: d.outer,
          top: 0,
          left: 0,
          borderLeftWidth: 2,
          borderTopWidth: 1,
          borderRightWidth: 1,
          borderBottomWidth: 0,
          animation: `uw-circle-outer ${sp.outer}s linear infinite`,
        }}
        dataCircle="outer"
      />
      <Ring
        enterAnimation={enterAnimation}
        enterDelay={150}
        style={{
          ...base,
          width: d.middle,
          height: d.middle,
          top: center(d.outer, d.middle),
          left: center(d.outer, d.middle),
          borderLeftWidth: 1,
          borderTopWidth: 2,
          borderRightWidth: 0,
          borderBottomWidth: 1,
          animation: `uw-circle-middle ${sp.middle}s linear infinite`,
        }}
        dataCircle="middle"
      />
      <Ring
        enterAnimation={enterAnimation}
        enterDelay={300}
        style={{
          ...base,
          width: d.inner,
          height: d.inner,
          top: center(d.outer, d.inner),
          left: center(d.outer, d.inner),
          borderLeftWidth: 1,
          borderTopWidth: 0,
          borderRightWidth: 0,
          borderBottomWidth: 2,
          animation: `uw-circle-inner ${sp.inner}s linear infinite`,
        }}
        dataCircle="inner"
      />
    </div>
  );
}

/** Renders a ring directly, or wrapped in the same .circle-enter treatment
 * the cybersecurity hero's raw circles use, when enterAnimation is on. */
function Ring({
  enterAnimation,
  enterDelay,
  style,
  dataCircle,
}: {
  enterAnimation: boolean;
  enterDelay: number;
  style: CSSProperties;
  dataCircle: string;
}) {
  const ring = <div data-circle={dataCircle} style={style} />;
  if (!enterAnimation) return ring;
  return (
    <div
      className="circle-enter"
      style={{ "--enter-delay": `${enterDelay}ms` } as CSSProperties}
    >
      {ring}
    </div>
  );
}
