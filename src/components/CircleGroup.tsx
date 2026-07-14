import type { CSSProperties } from "react";

type CircleGroupProps = {
  size?: "xl" | "lg" | "sm";
  surface?: "dark" | "light";
  position?: "bottom-right" | "top-right";
  className?: string;
};

const dims = {
  xl: { outer: 480, middle: 320, inner: 160 },
  lg: { outer: 360, middle: 240, inner: 120 },
  sm: { outer: 240, middle: 160, inner: 80 },
};

const speeds = {
  xl: { outer: 14, middle: 20, inner: 9 },
  lg: { outer: 18, middle: 25, inner: 12 },
  sm: { outer: 18, middle: 25, inner: 12 },
};

export function CircleGroup({
  size = "xl",
  surface = "dark",
  position = "bottom-right",
  className = "",
}: CircleGroupProps) {
  const d = dims[size];
  const sp = speeds[size];
  const color =
    surface === "dark" ? "rgba(255,255,255,0.32)" : "rgba(1,5,18,0.32)";
  const center = (outer: number, inner: number) => (outer - inner) / 2;
  const bleed = Math.round(d.outer * 0.25);
  const pos =
    position === "bottom-right"
      ? { bottom: -bleed, right: -bleed }
      : { top: -bleed, right: -bleed };

  const sizeClass = `uw-circles-${size}`;
  const posClass =
    size === "xl" && position === "top-right" ? "pos-top-right" : "";

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
        ...pos,
      }}
      aria-hidden="true"
    >
      <div
        data-circle="outer"
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
      />
      <div
        data-circle="middle"
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
      />
      <div
        data-circle="inner"
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
      />
    </div>
  );
}
