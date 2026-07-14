import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type Surface = "dark" | "light" | "amber";
type Variant = "primary" | "secondary";
type Size = "lg" | "md" | "sm";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  surface?: Surface;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "children">;

const sizeClasses: Record<Size, string> = {
  lg: "text-[16px] py-[14px] px-[30px]",
  md: "text-[15px] py-[11px] px-[22px]",
  sm: "text-[13px] py-[7px] px-[14px]",
};

function surfaceClasses(surface: Surface, variant: Variant): string {
  if (surface === "dark") {
    return variant === "primary"
      ? "bg-white text-[#010512] border-white hover:bg-transparent hover:text-white"
      : "bg-transparent text-white border-[rgba(255,255,255,0.35)] hover:bg-white hover:text-[#010512] hover:border-white";
  }
  if (surface === "amber") {
    return "bg-[#010512] text-white border-[#010512] hover:bg-white hover:border-white hover:text-[#010512]";
  }
  return variant === "primary"
    ? "bg-[#010512] text-white border-[#010512] hover:bg-[#E9A638] hover:border-[#E9A638] hover:text-[#010512]"
    : "bg-transparent text-[#010512] border-[rgba(1,5,18,0.28)] hover:bg-[#010512] hover:border-[#010512] hover:text-white";
}

export function Button({
  children,
  href,
  surface = "light",
  variant = "primary",
  size = "md",
  withArrow = false,
  className = "",
  ...rest
}: ButtonProps) {
  if (surface === "amber" && variant === "secondary") {
    variant = "primary";
  }

  const classes = [
    "inline-flex items-center justify-center gap-2 font-body font-medium rounded-lg border",
    "transition-[background-color,border-color,color] duration-150 ease-in-out",
    sizeClasses[size],
    surfaceClasses(surface, variant),
    className,
  ].join(" ");

  const content = (
    <>
      {children}
      {withArrow ? <Arrow /> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
