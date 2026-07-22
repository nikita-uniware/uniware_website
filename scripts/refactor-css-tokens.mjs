/**
 * Replaces hardcoded font-size, font-weight, color, and font-family values
 * with design tokens from globals.css / Design System v1.3 Appendix A.
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve("src/styles");
const GLOBALS = path.resolve("src/app/globals.css");

const FILES = [
  "cybersecurity.page.css",
  "cybersecurity.css",
  "case-study.page.css",
  "case-study.css",
  "contact.page.css",
  "booking-panel.css",
];

/** Longest-first string replacements (colors, gradients, families). */
const STRING_REPLACEMENTS = [
  // Gradients
  // Dark backgrounds use Tailwind: bg-linear-90 from-uw-dark-blue to-uw-black
  // or CSS: linear-gradient(90deg, var(--uw-dark-blue), var(--uw-black))
  // Do NOT introduce --uw-dark-gradient again.
  ["linear-gradient(90deg, #040C25, #010512)", "linear-gradient(90deg, var(--uw-dark-blue), var(--uw-black))"],
  ["linear-gradient(90deg,#040C25,#010512)", "linear-gradient(90deg, var(--uw-dark-blue), var(--uw-black))"],
  ["linear-gradient(90deg, #040c25, #010512)", "linear-gradient(90deg, var(--uw-dark-blue), var(--uw-black))"],
  ["linear-gradient(to right,transparent,#FFFFFF)", "linear-gradient(to right,transparent,var(--uw-white))"],
  ["linear-gradient(to right,transparent,#010512)", "linear-gradient(to right,transparent,var(--uw-black))"],

  // Font families
  ["font-family:'DM Sans',sans-serif", "font-family:var(--font-body)"],
  ["font-family:'Space Grotesk',sans-serif", "font-family:var(--font-display)"],

  // rgba colors — dark surface text
  ["color:rgba(255,255,255,.96)", "color:var(--uw-tooltip-bg-text)"],
  ["color:rgba(255,255,255,.90)", "color:var(--uw-text-on-dark-bright)"],
  ["color:rgba(255,255,255,.85)", "color:var(--uw-text-on-dark-hover)"],
  ["color:rgba(255,255,255,.68)", "color:var(--uw-text-on-dark-pill)"],
  ["color:rgba(255,255,255,.65)", "color:var(--uw-text-on-dark-secondary)"],
  ["color:rgba(255,255,255,.60)", "color:var(--uw-text-on-dark-secondary)"],
  ["color:rgba(255,255,255,.55)", "color:var(--uw-text-on-dark)"],
  ["color:rgba(255,255,255,.52)", "color:var(--uw-text-on-dark-dim)"],
  ["color:rgba(255,255,255,.50)", "color:var(--uw-text-on-dark-dim)"],
  ["color:rgba(255,255,255,.48)", "color:var(--uw-text-on-dark-muted)"],
  ["color:rgba(255,255,255,.45)", "color:var(--uw-text-on-dark-caption)"],
  ["color:rgba(255,255,255,.42)", "color:var(--uw-text-on-dark-subtle)"],
  ["color:rgba(255,255,255,.40)", "color:var(--uw-text-on-dark-faint)"],
  ["color:rgba(255,255,255,.32)", "color:var(--uw-text-on-dark-placeholder)"],
  ["color:rgba(255,255,255,.28)", "color:var(--uw-text-on-dark-placeholder)"],
  ["color:rgba(255,255,255,.25)", "color:var(--uw-text-on-dark-ghost)"],
  ["color:rgba(255,255,255,0.95)", "color:var(--uw-text-on-dark-bright)"],
  ["color:rgba(255,255,255,0.90)", "color:var(--uw-text-on-dark-bright)"],
  ["color:rgba(255,255,255,0.85)", "color:var(--uw-text-on-dark-hover)"],
  ["color:rgba(255,255,255,0.68)", "color:var(--uw-text-on-dark-pill)"],
  ["color:rgba(255,255,255,0.65)", "color:var(--uw-text-on-dark-secondary)"],
  ["color:rgba(255,255,255,0.60)", "color:var(--uw-text-on-dark-secondary)"],
  ["color:rgba(255,255,255,0.55)", "color:var(--uw-text-on-dark)"],
  ["color:rgba(255,255,255,0.52)", "color:var(--uw-text-on-dark-dim)"],
  ["color:rgba(255,255,255,0.50)", "color:var(--uw-text-on-dark-dim)"],
  ["color:rgba(255,255,255,0.48)", "color:var(--uw-text-on-dark-muted)"],
  ["color:rgba(255,255,255,0.45)", "color:var(--uw-text-on-dark-caption)"],
  ["color:rgba(255,255,255,0.42)", "color:var(--uw-text-on-dark-subtle)"],
  ["color:rgba(255,255,255,0.40)", "color:var(--uw-text-on-dark-faint)"],
  ["color:rgba(255,255,255,0.32)", "color:var(--uw-text-on-dark-placeholder)"],
  ["color:rgba(255,255,255,0.28)", "color:var(--uw-text-on-dark-placeholder)"],
  ["color:rgba(255,255,255,0.25)", "color:var(--uw-text-on-dark-ghost)"],

  // rgba — light surface text
  ["color:rgba(1,5,18,.85)", "color:var(--uw-text-on-light-dim)"],
  ["color:rgba(1,5,18,.55)", "color:var(--uw-text-on-light-muted)"],
  ["color:rgba(1,5,18,.50)", "color:var(--uw-text-on-light-ghost)"],
  ["color:rgba(1,5,18,.25)", "color:var(--uw-text-on-light-faint)"],
  ["color:rgba(1,5,18,0.85)", "color:var(--uw-text-on-light-dim)"],
  ["color:rgba(1,5,18,0.55)", "color:var(--uw-text-on-light-muted)"],
  ["color:rgba(1,5,18,0.50)", "color:var(--uw-text-on-light-ghost)"],
  ["color:rgba(1,5,18,0.25)", "color:var(--uw-text-on-light-faint)"],
  ["color:rgba(92,74,18,.55)", "color:var(--uw-amber-icon-tint)"],
  ["color:rgba(92,74,18,0.55)", "color:var(--uw-amber-icon-tint)"],

  // Hex colors — color property
  ["color:#FFFFFF", "color:var(--uw-white)"],
  ["color:#ffffff", "color:var(--uw-white)"],
  ["color:#fff", "color:var(--uw-white)"],
  ["color:#010512", "color:var(--uw-black)"],
  ["color:#1A1F3C", "color:var(--uw-body-text)"],
  ["color:#1a1f3c", "color:var(--uw-body-text)"],
  ["color:#6B7280", "color:var(--uw-muted)"],
  ["color:#6b7280", "color:var(--uw-muted)"],
  ["color:#E9A638", "color:var(--uw-amber-dark)"],
  ["color:#e9a638", "color:var(--uw-amber-dark)"],
  ["color:#BB6D08", "color:var(--uw-amber-light)"],
  ["color:#bb6d08", "color:var(--uw-amber-light)"],
  ["color:#8A5209", "color:var(--uw-amber-accent)"],
  ["color:#F0BD52", "color:var(--uw-amber-border)"],
  ["color:#8A6E1E", "color:var(--uw-wts-ring-label)"],
  ["color:#5C4A12", "color:var(--uw-wts-ring-current)"],
  ["color:#9CA3AF", "color:var(--uw-placeholder)"],

  // background colors
  ["background:#FFFFFF", "background:var(--uw-white)"],
  ["background:#ffffff", "background:var(--uw-white)"],
  ["background:#fff", "background:var(--uw-white)"],
  ["background:#010512", "background:var(--uw-black)"],
  ["background:#FBF0DA", "background:var(--uw-yellow-card)"],
  ["background:#FEF7EC", "background:var(--uw-yellow-card-hover)"],
  ["background:#E9A638", "background:var(--uw-amber-dark)"],
  ["background:#fafaf9", "background:var(--uw-surface-off-white)"],
  ["background:rgba(255,255,255,.96)", "background:var(--uw-tooltip-bg)"],
  ["background:rgba(255,255,255,.09)", "background:var(--surface-dark-input-focus)"],
  ["background:rgba(255,255,255,.07)", "background:var(--surface-dark-card-hover)"],
  ["background:rgba(255,255,255,.06)", "background:var(--surface-dark-subtle)"],
  ["background:rgba(255,255,255,.08)", "background:var(--surface-dark-muted)"],
  ["background:rgba(255,255,255,.14)", "background:var(--surface-dark-light)"],
  ["background:rgba(255,255,255,.04)", "background:var(--surface-dark-card)"],
  ["background:rgba(1,5,18,.03)", "background:var(--surface-light-subtle)"],
  ["background:rgba(1,5,18,.05)", "background:var(--surface-light-pill)"],
  ["background:rgba(1,5,18,.06)", "background:var(--surface-light-muted)"],
  ["background:rgba(187,109,8,.08)", "background:var(--amber-tint-bg)"],
  ["background:rgba(187,109,8,.07)", "background:var(--amber-tint-bg-strong)"],
  ["background:rgba(240,189,82,.15)", "background:var(--amber-fill-selected)"],
  ["background:rgba(240,189,82,.22)", "background:var(--amber-fill-success)"],
  ["background:rgba(240,189,82,.12)", "background:var(--amber-fill-success-icon)"],
  ["background:rgba(240,189,82,.10)", "background:var(--amber-border-highlight)"],
  ["background:rgba(1,5,18,.60)", "background:var(--surface-overlay)"],
  ["background:rgba(1,5,18,0.60)", "background:var(--surface-overlay)"],
  ["background:rgba(1,5,18,0.03)", "background:var(--surface-light-subtle)"],
  ["background:rgba(1,5,18,0.05)", "background:var(--surface-light-pill)"],
  ["background:rgba(1,5,18,0.06)", "background:var(--surface-light-muted)"],
  ["background:rgba(255,255,255,0.06)", "background:var(--surface-dark-subtle)"],
  ["background:rgba(255,255,255,0.08)", "background:var(--surface-dark-muted)"],
  ["background:rgba(255,255,255,0.14)", "background:var(--surface-dark-light)"],
  ["background:rgba(255,255,255,0.04)", "background:var(--surface-dark-card)"],
  ["background:#E9E7E1", "background:var(--uw-wts-ring-4)"],
  ["background:#F0EEE8", "background:var(--uw-wts-ring-3)"],
  ["background:#F7F6F1", "background:var(--uw-wts-ring-2)"],
  ["background:#F0BD52", "background:var(--uw-amber-border)"],

  // border colors
  ["border-color:#F0BD52", "border-color:var(--uw-amber-border)"],
  ["border-color:#E9A638", "border-color:var(--uw-amber-dark)"],
  ["border-color:#BB6D08", "border-color:var(--uw-amber-light)"],
  ["border-color:#010512", "border-color:var(--uw-black)"],
  ["border-color:#fff", "border-color:var(--uw-white)"],
  ["border-color:rgba(58,44,5,.20)", "border-color:var(--amber-card-footer-border)"],
  ["border-color:rgba(58,44,5,0.20)", "border-color:var(--amber-card-footer-border)"],
  ["border-color:rgba(255,255,255,.70)", "border-color:var(--border-chrome-bright)"],
  ["border-color:rgba(255,255,255,.40)", "border-color:var(--border-chrome-max)"],
  ["border-color:rgba(255,255,255,.35)", "border-color:var(--border-chrome-intense)"],
  ["border-color:rgba(255,255,255,.28)", "border-color:var(--border-chrome-panel)"],
  ["border-color:rgba(255,255,255,.24)", "border-color:var(--border-chrome-heavy)"],
  ["border-color:rgba(255,255,255,.25)", "border-color:var(--border-chrome-pill)"],
  ["border-color:rgba(255,255,255,.22)", "border-color:var(--border-chrome-strong)"],
  ["border-color:rgba(255,255,255,.16)", "border-color:var(--border-dark-input)"],
  ["border-color:rgba(255,255,255,.14)", "border-color:var(--border-chrome-pill-idle)"],
  ["border-color:rgba(255,255,255,.12)", "border-color:var(--border-chrome-light)"],
  ["border-color:rgba(255,255,255,.10)", "border-color:var(--border-dark)"],
  ["border-color:rgba(1,5,18,.28)", "border-color:var(--border-light-strong)"],
  ["border-color:rgba(1,5,18,.20)", "border-color:var(--border-light-medium)"],
  ["border-color:rgba(1,5,18,.14)", "border-color:var(--border-light-subtle)"],
  ["border-color:rgba(1,5,18,.12)", "border-color:var(--border-light-muted)"],
  ["border-color:rgba(1,5,18,.10)", "border-color:var(--section-divider)"],
  ["border-color:rgba(1,5,18,.08)", "border-color:var(--surface-light-faint)"],
  ["border-color:rgba(187,109,8,.22)", "border-color:var(--amber-tint-border-strong)"],
  ["border-color:rgba(187,109,8,.20)", "border-color:var(--amber-tint-border)"],
  ["border-color:rgba(240,189,82,.50)", "border-color:var(--amber-border-highlight-ring)"],
  ["border-color:rgba(240,189,82,.30)", "border-color:var(--amber-border-highlight-focus)"],
  ["border-color:rgba(240,189,82,.25)", "border-color:var(--amber-border-highlight-strong)"],
  ["border-color:rgba(1,5,18,0.60)", "border-color:var(--uw-text-on-light-dim)"],
  ["border-color:rgba(1,5,18,0.28)", "border-color:var(--border-light-strong)"],
  ["border-color:rgba(1,5,18,0.20)", "border-color:var(--border-light-medium)"],
  ["border-color:rgba(255,255,255,0.70)", "border-color:var(--border-chrome-bright)"],
  ["border-color:rgba(255,255,255,0.22)", "border-color:var(--border-chrome-strong)"],
  ["border-color:rgba(255,255,255,0.16)", "border-color:var(--border-dark-input)"],
  ["border-color:rgba(255,255,255,0.14)", "border-color:var(--border-chrome-pill-idle)"],
  ["border-color:rgba(255,255,255,0.10)", "border-color:var(--border-dark)"],

  // border shorthand (1px solid ...)
  ["border:1px solid #fff", "border:1px solid var(--uw-white)"],
  ["border:1px solid #010512", "border:1px solid var(--uw-black)"],
  ["border:1px solid #E9A638", "border:1px solid var(--uw-amber-dark)"],
  ["border:1px solid #BB6D08", "border:1px solid var(--uw-amber-light)"],
  ["border:1px solid #F0BD52", "border:1px solid var(--uw-amber-border)"],
  ["border:1px solid rgba(255,255,255,.08)", "border:1px solid var(--border-chrome)"],
  ["border:1px solid rgba(255,255,255,.10)", "border:1px solid var(--border-dark)"],
  ["border:1px solid rgba(255,255,255,.12)", "border:1px solid var(--border-chrome-light)"],
  ["border:1px solid rgba(255,255,255,.14)", "border:1px solid var(--border-chrome-pill-idle)"],
  ["border:1px solid rgba(255,255,255,.16)", "border:1px solid var(--border-dark-input)"],
  ["border:1px solid rgba(255,255,255,.22)", "border:1px solid var(--border-chrome-strong)"],
  ["border:1px solid rgba(255,255,255,.25)", "border:1px solid var(--border-chrome-pill)"],
  ["border:1px solid rgba(255,255,255,.35)", "border:1px solid var(--border-chrome-intense)"],
  ["border:1px solid rgba(1,5,18,.08)", "border:1px solid var(--surface-light-faint)"],
  ["border:1px solid rgba(1,5,18,.10)", "border:1px solid var(--section-divider)"],
  ["border:1px solid rgba(1,5,18,.12)", "border:1px solid var(--border-light-muted)"],
  ["border:1px solid rgba(1,5,18,.14)", "border:1px solid var(--border-light-subtle)"],
  ["border:1px solid rgba(1,5,18,.16)", "border:1px solid var(--border-light)"],
  ["border:1px solid rgba(1,5,18,.20)", "border:1px solid var(--border-light-medium)"],
  ["border:1px solid rgba(1,5,18,.28)", "border:1px solid var(--border-light-strong)"],
  ["border:1px solid rgba(1,5,18,0.20)", "border:1px solid var(--border-light-medium)"],
  ["border:1px solid rgba(187,109,8,.20)", "border:1px solid var(--amber-tint-border)"],
  ["border:1px solid rgba(187,109,8,.22)", "border:1px solid var(--amber-tint-border-strong)"],
  ["border:1px solid rgba(240,189,82,.25)", "border:1px solid var(--amber-border-highlight-strong)"],
  ["border:1px solid rgba(240,189,82,.30)", "border:1px solid var(--amber-border-highlight-focus)"],
  ["border:1px solid rgba(240,189,82,.50)", "border:1px solid var(--amber-border-highlight-ring)"],
  ["border-left:3px solid #BB6D08", "border-left:3px solid var(--uw-amber-light)"],
  ["border-left:1px solid rgba(1,5,18,.10)", "border-left:1px solid var(--section-divider)"],
  ["border-bottom:1px solid rgba(255,255,255,.08)", "border-bottom:1px solid var(--border-chrome)"],
  ["border-bottom:1px solid rgba(255,255,255,.06)", "border-bottom:1px solid var(--border-chrome-muted)"],
  ["border-bottom:1px solid rgba(255,255,255,.12)", "border-bottom:1px solid var(--border-chrome-light)"],
  ["border-bottom:1px solid rgba(1,5,18,.10)", "border-bottom:1px solid var(--section-divider)"],
  ["border-bottom:1px solid rgba(1,5,18,.06)", "border-bottom:1px solid var(--surface-light-muted)"],
  ["border-bottom:1px solid rgba(1,5,18,.12)", "border-bottom:1px solid var(--border-light-muted)"],
  ["border-bottom:2px solid transparent", "border-bottom:2px solid transparent"], // keep
  ["border-top:1px solid rgba(255,255,255,.08)", "border-top:1px solid var(--border-chrome)"],
  ["border-top:1px solid rgba(1,5,18,.10)", "border-top:1px solid var(--section-divider)"],
  ["border-top:    1px solid rgba(1,5,18,0.10)", "border-top:    1px solid var(--section-divider)"],
  ["border-bottom: 1px solid rgba(1,5,18,0.10)", "border-bottom: 1px solid var(--section-divider)"],
  ["border-bottom: 1px solid rgba(255,255,255,0.06)", "border-bottom: 1px solid var(--border-chrome-muted)"],
  ["border-top:0.5px solid rgba(255,255,255,.08)", "border-top:0.5px solid var(--border-chrome)"],

  // border-color on circle etc
  ["border-color:rgba(255,255,255,.32)", "border-color:var(--circle-dark)"],
  ["border-color:rgba(1,5,18,.06)", "border-color:var(--uw-wts-ring-inner-border)"],

  // misc color usages
  ["scrollbar-color:rgba(255,255,255,.15)", "scrollbar-color:var(--border-chrome-scrollbar)"],
  ["background:rgba(255,255,255,.18)", "background:var(--border-chrome-medium)"],
  ["background:rgba(255,255,255,.15)", "background:var(--border-chrome-scrollbar)"],
  ["background:rgba(255,255,255,.10)", "background:var(--group-dark)"],
  ["background:rgba(1,5,18,.12)", "background:var(--border-light-muted)"],
  ["background:rgba(1,5,18,.20)", "background:var(--border-light-medium)"],
  ["background:rgba(1,5,18,0.20)", "background:var(--border-light-medium)"],
  ["background:rgba(255,255,255,0.10)", "background:var(--group-dark)"],
  ["background:rgba(255,255,255,0.15)", "background:var(--border-chrome-scrollbar)"],
  ["background:rgba(255,255,255,0.18)", "background:var(--border-chrome-medium)"],
  ["border-top:6px solid #6B7280", "border-top:6px solid var(--uw-muted)"],
  ["border-top:6px solid rgba(255,255,255,.45)", "border-top:6px solid var(--uw-text-on-dark-caption)"],
  ["outline:2px solid #E9A638", "outline:2px solid var(--uw-amber-dark)"],
  ["outline:2px solid #F0BD52", "outline:2px solid var(--uw-amber-border)"],
  ["font-size:46px", "font-size:var(--text-cs-hero-lg)"],
  ["font-size:36px", "font-size:var(--text-cs-stat-lg)"],
  ["color:rgba(1,5,18,.75)", "color:var(--uw-text-on-light-strong)"],
  ["color:rgba(1,5,18,0.75)", "color:var(--uw-text-on-light-strong)"],
  ["border:1px solid rgba(233,166,56,.4)", "border:1px solid var(--border-amber-tag)"],
  ["border-left:3px solid #E9A638", "border-left:3px solid var(--uw-amber-dark)"],
  ["background:#FAFAF9", "background:var(--uw-surface-off-white)"],
  ["background: #FFFFFF", "background: var(--uw-white)"],
  ["border: 1px solid rgba(1,5,18,0.20)", "border: 1px solid var(--border-light-medium)"],
  ["color: rgba(1,5,18,0.50)", "color: var(--uw-text-on-light-ghost)"],
  ["border-color: rgba(1,5,18,0.60)", "border-color: var(--uw-text-on-light-dim)"],
  ["color: rgba(1,5,18,0.85)", "color: var(--uw-text-on-light-dim)"],
  ["border-color: rgba(255,255,255,0.22)", "border-color: var(--border-chrome-strong)"],
  ["color: rgba(255,255,255,0.45)", "color: var(--uw-text-on-dark-caption)"],
  ["border-color: rgba(255,255,255,0.70)", "border-color: var(--border-chrome-bright)"],
  ["color: rgba(255,255,255,0.90)", "color: var(--uw-text-on-dark-bright)"],
  ["color: #5C4A12", "color: var(--uw-wts-ring-current)"],
  ["color: rgba(255,255,255,0.95)", "color: var(--uw-text-on-dark-bright)"],
  ["border:1px solid rgba(1,5,18,.06)", "border:1px solid var(--uw-wts-ring-inner-border)"],
  ["border-top:1px solid rgba(1,5,18,.12)", "border-top:1px solid var(--border-light-muted)"],
  ["border-top:1px solid rgba(255,255,255,.12)", "border-top:1px solid var(--border-chrome-light)"],
  ["border-right:1px solid rgba(1,5,18,.10)", "border-right:1px solid var(--section-divider)"],
  ["border-bottom:1px solid rgba(1,5,18,.08)", "border-bottom:1px solid var(--surface-light-faint)"],
  ["border-bottom:1px solid rgba(1,5,18,.14)", "border-bottom:1px solid var(--border-light-subtle)"],
  ["border-left:1px solid rgba(1,5,18,.12)", "border-left:1px solid var(--border-light-muted)"],
  ["border-left:1px solid rgba(255,255,255,.08)", "border-left:1px solid var(--border-chrome)"],
  ["background:rgba(1,5,18,.10)", "background:var(--section-divider)"],
  ["background:rgba(1,5,18,.14)", "background:var(--border-light-subtle)"],
];

const FONT_SIZE_MAP = {
  "64px": "var(--text-display)",
  "56px": "var(--text-stat-lg)",
  "52px": "var(--text-display-md)",
  "48px": "var(--text-h2)",
  "40px": "var(--text-display-sm)",
  "38px": "var(--text-hiw-stat-md)",
  "32px": "var(--text-h3)",
  "30px": "var(--text-h3-md)",
  "28px": "var(--text-h2-sm)",
  "26px": "var(--text-panel-heading)",
  "24px": "var(--text-h4)",
  "22px": "var(--text-h3-sm)",
  "20px": "var(--text-h4-sm)",
  "18px": "var(--text-body-lg-sm)",
  "17px": "var(--text-loc-city)",
  "16px": "var(--text-body)",
  "15px": "var(--text-button)",
  "14px": "var(--text-body-sm)",
  "13px": "var(--text-eyebrow)",
  "12px": "var(--text-caption)",
  "11px": "var(--text-caption-xs)",
  "10.5px": "var(--text-caption-xxs)",
  "36px": "var(--text-cs-stat-lg)",
  "46px": "var(--text-cs-hero-lg)",
};

const FONT_WEIGHT_MAP = {
  "300": "var(--font-weight-light)",
  "400": "var(--font-weight-regular)",
  "500": "var(--font-weight-medium)",
  "600": "var(--font-weight-semibold)",
  "700": "var(--font-weight-bold)",
};

function refactorCss(content) {
  let out = content;

  for (const [from, to] of STRING_REPLACEMENTS) {
    out = out.split(from).join(to);
  }

  out = out.replace(/font-size:\s*([\d.]+px)/g, (match, size) => {
    const token = FONT_SIZE_MAP[size];
    return token ? `font-size:${token}` : match;
  });

  out = out.replace(/font-weight:\s*(\d{3})\b/g, (match, weight) => {
    const token = FONT_WEIGHT_MAP[weight];
    return token ? `font-weight:${token}` : match;
  });

  return out;
}

function refactorGlobalsNavFooter(content) {
  return refactorCss(content);
}

let total = 0;
for (const file of FILES) {
  const filePath = path.join(ROOT, file);
  if (!fs.existsSync(filePath)) {
    console.warn("Skip (missing):", file);
    continue;
  }
  const before = fs.readFileSync(filePath, "utf8");
  const after = refactorCss(before);
  if (before !== after) {
    fs.writeFileSync(filePath, after);
    total++;
    console.log("Refactored:", file);
  } else {
    console.log("No changes:", file);
  }
}

const globalsBefore = fs.readFileSync(GLOBALS, "utf8");
const globalsAfter = refactorGlobalsNavFooter(globalsBefore);
if (globalsBefore !== globalsAfter) {
  fs.writeFileSync(GLOBALS, globalsAfter);
  total++;
  console.log("Refactored: globals.css");
}

console.log(`Done. ${total} file(s) updated.`);
