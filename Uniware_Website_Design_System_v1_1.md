# Uniware Systems — Website Design System v1.0

**Status:** Confirmed and locked. All decisions approved by Niki (Nikita Vergis), July 2026.
**Scope:** Web-specific design system for the Uniware website rebuild at uniware.net.
**Tech stack:** Next.js 15, Tailwind CSS, JSX components.
**Reference:** Equivalent in function to the UniDocs AI Implementation Rules Addendum. Every build session must reference this document.
**Supersedes:** Uniware Brand Guidelines v2 for any web-specific detail. Where they conflict, this document wins.

**Owner:** Niki (Nikita Vergis) — all design decisions and approvals.
**Developer:** Srimathi — implementation. Do not introduce values not listed here without Niki's approval.

---

## 01 — Color System

### Token table

| Token | Value | Description |
|---|---|---|
| `uw-black` | `#010512` | Primary dark background |
| `uw-dark-blue` | `#040C25` | Gradient start for hero backgrounds |
| `uw-white` | `#FFFFFF` | Primary light surface |
| `uw-body-text` | `#1A1F3C` | Body copy on light surfaces |
| `uw-muted` | `#6B7280` | Captions, labels, supporting detail |
| `uw-amber-dark` | `#E9A638` | Accent on dark surfaces only |
| `uw-amber-light` | `#BB6D08` | Accent on light surfaces only |

### Surface-to-element mapping

**On dark backgrounds (#010512 or gradient):**

| Element | Value |
|---|---|
| Heading text | `#FFFFFF` |
| Body text | `rgba(255,255,255,0.55)` |
| Eyebrow labels | `#E9A638` |
| Icons | `#FFFFFF` |
| Card border | `rgba(255,255,255,0.10)` |
| Connected card group background | `rgba(255,255,255,0.10)` |
| Circle arcs | `rgba(255,255,255,0.32)` |
| Logo | Gold version |

**On white backgrounds (#FFFFFF):**

| Element | Value |
|---|---|
| Heading text | `#010512` |
| Body text | `#1A1F3C` |
| Muted text | `#6B7280` |
| Eyebrow labels | `#BB6D08` |
| Icons | `#010512` |
| Card border | `rgba(1,5,18,0.16)` |
| Connected card group background | `rgba(1,5,18,0.16)` |
| Circle arcs | `rgba(1,5,18,0.32)` |
| Logo | Black version |

**On amber backgrounds (#E9A638):**

| Element | Value |
|---|---|
| All text | `#010512` only. White text fails contrast on amber. Never use white text on amber. |
| Icons | `#010512` |
| Buttons | Primary only: dark fill, white text. No secondary buttons. |
| Logo | Black version |
| Circle arcs | `rgba(1,5,18,0.32)` — dark arcs, same as on white sections. Use `surface="light"` on the CircleGroup component. |
| Amber accent elements | Do not use — amber on amber. |

### Amber rule (absolute)

`#E9A638` on dark backgrounds only.
`#BB6D08` on light/white backgrounds only.
Never swapped.

The amber gradient (`#BB6D08 → #E9A638`) is logo mark and wordmark only. Never on any other element.

### Gradient rule

Hero background: `linear-gradient(90deg, #040C25, #010512)`. Digital only, never in print.
Amber section background: solid `#E9A638` only. Never gradient.

### Tailwind config additions

```typescript
// tailwind.config.ts
colors: {
  'uw-black':        '#010512',
  'uw-dark-blue':    '#040C25',
  'uw-white':        '#FFFFFF',
  'uw-body-text':    '#1A1F3C',
  'uw-muted':        '#6B7280',
  'uw-amber-dark':   '#E9A638',
  'uw-amber-light':  '#BB6D08',
  // Borders
  'border-light':    'rgba(1,5,18,0.16)',
  'border-dark':     'rgba(255,255,255,0.10)',
  'section-divider': 'rgba(1,5,18,0.10)',
  // Card group backgrounds (parent-gap technique)
  'group-light':     'rgba(1,5,18,0.16)',
  'group-dark':      'rgba(255,255,255,0.10)',
},
```

---

## 02 — Typography Scale

### Typefaces

- **Space Grotesk** — all display headings H1–H4 and eyebrow labels.
- **DM Sans** — all body copy, button labels, captions.

Load both via `next/font/google`. Never via `<link>` tag in production.

```typescript
// app/fonts.ts
import { Space_Grotesk, DM_Sans } from 'next/font/google';

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});
```

### Space Grotesk scale

| Level | Token | Desktop | Mobile | Line height | Letter spacing | Weight |
|---|---|---|---|---|---|---|
| Hero H1 | `text-display` | 64px | 40px | 1.10 | −0.02em | 700 |
| Section H2 | `text-h2` | 48px | 28px | 1.15 | −0.015em | 700 |
| Sub-section H3 | `text-h3` | 32px | 22px | 1.20 | −0.01em | 700 |
| Card / Component H4 | `text-h4` | 24px | 20px | 1.30 | 0 | 600 |
| Eyebrow / Tag | `text-eyebrow` | 13px | 13px | 1.40 | 0.12em | 500 |
| Stat number | `text-stat` | 72px | 48px | 1.0 | −0.02em | 700 |

Eyebrow labels: always uppercase. DM Sans 500, not Space Grotesk. Never used as button labels.
Stat numbers: Space Grotesk 700. Color: `#E9A638` on dark sections, `#010512` on light.

### DM Sans scale

| Level | Token | Desktop | Mobile | Line height | Weight |
|---|---|---|---|---|---|
| Lead / Body Large | `text-body-lg` | 20px | 18px | 1.55 | 300 |
| Body Regular | `text-body` | 16px | 16px | 1.65 | 300 |
| Caption / Small | `text-body-sm` | 14px | 14px | 1.50 | 400 |
| Button / Interactive | — | 15px | 15px | 1.0 | 500 |

DM Sans 300 (Light) is the default body weight. Use 400 for captions only. Use 500 for button labels and interactive elements.

### Responsive scale pattern

```jsx
<h1 className="font-display font-bold text-[40px] lg:text-[64px] leading-[1.1] tracking-[-0.02em]">
```

### Tailwind config additions

```typescript
// tailwind.config.ts
fontFamily: {
  display: ['var(--font-space-grotesk)', 'sans-serif'],
  body:    ['var(--font-dm-sans)', 'sans-serif'],
},
fontSize: {
  'display': ['64px', { lineHeight: '1.10', letterSpacing: '-0.02em'  }],
  'h2':      ['48px', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
  'h3':      ['32px', { lineHeight: '1.20', letterSpacing: '-0.01em'  }],
  'h4':      ['24px', { lineHeight: '1.30', letterSpacing: '0'        }],
  'eyebrow': ['13px', { lineHeight: '1.40', letterSpacing: '0.12em'   }],
  'stat':    ['72px', { lineHeight: '1.0',  letterSpacing: '-0.02em'  }],
  'body-lg': ['20px', { lineHeight: '1.55' }],
  'body':    ['16px', { lineHeight: '1.65' }],
  'body-sm': ['14px', { lineHeight: '1.50' }],
},
```

---

## 03 — Border and Card System

### Border token

- Cards on light surfaces: `1px solid rgba(1,5,18,0.16)`
- Cards on dark surfaces: `1px solid rgba(255,255,255,0.10)`
- Section divider lines: `1px solid rgba(1,5,18,0.10)` — between consecutive white sections only, not as card borders.
- No drop shadows anywhere. Borders do all the separation work.

### Connected card groups — parent-gap technique

Use this when cards share a visual border (side by side with a shared divider). Do NOT put borders on individual cards.

**Why not card-level borders:** when two bordered cards are placed adjacent, the overlapping borders at 0.16 opacity stack to approximately 0.29 opacity. The join appears darker than the outer edges. This is visually inconsistent and visible.

**The solution:**

```jsx
{/* Light surface — connected card group */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(1,5,18,0.16)] rounded-2xl overflow-hidden">
  <div className="bg-white p-6">Card 1</div>
  <div className="bg-white p-6">Card 2</div>
  <div className="bg-white p-6">Card 3</div>
</div>

{/* Dark surface — connected card group */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(255,255,255,0.10)] rounded-2xl overflow-hidden">
  <div className="bg-[#010512] p-6">Dark card 1</div>
  <div className="bg-[#010512] p-6">Dark card 2</div>
  <div className="bg-[#010512] p-6">Dark card 3</div>
</div>
```

How it works: `gap-px` exposes 1px of the parent background between each pair of adjacent cells. The parent background IS the divider. It appears once between any two cells regardless of layout or breakpoint. `overflow:hidden` clips inner card corners to the parent's `border-radius`. When the grid column count changes (3 → 2 → 1), the gaps adapt automatically with zero conditional logic.

### Standalone cards

Cards not in a connected group use a direct border:

```jsx
<div className="border border-[rgba(1,5,18,0.16)] rounded-xl p-6 bg-white">
  Content
</div>
```

### Corner radius scale

| Token | Value | Usage |
|---|---|---|
| `rounded` | 4px | Pills, tags, badge labels |
| `rounded-lg` | 8px | Buttons |
| `rounded-xl` | 12px | Standalone cards |
| `rounded-2xl` | 16px | Connected card group containers |
| none / 0 | 0px | Full-bleed sections — never rounded |

---

## 04 — Layout System

### Content max width

Content never crosses 1200px. Section backgrounds are always full-bleed (viewport width). Only the content wrapper is constrained.

```jsx
{/* Standard content wrapper — use on every section, never vary the values */}
<div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10">
  {/* section content */}
</div>
```

### Breakpoints and horizontal margins

| Name | Viewport | Tailwind prefix | Side padding | Content width |
|---|---|---|---|---|
| Wide | ≥ 1280px | `xl:` | 40px each side | 1200px, centered |
| Desktop | 1024–1279px | `lg:` | 40px each side | Viewport − 80px |
| Tablet | 768–1023px | `md:` | 24px each side | Viewport − 48px |
| Mobile | < 768px | default | 16px each side | Viewport − 32px |

### Section vertical padding

| Breakpoint | Value | Tailwind class |
|---|---|---|
| Desktop (≥ 1024px) | 96px | `py-24` |
| Tablet (768–1023px) | 64px | `py-16` |
| Mobile (< 768px) | 48px | `py-12` |

Apply padding to the `<section>` element, not to the content wrapper:

```jsx
<section className="py-12 md:py-16 lg:py-24">
  <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10">
    {/* content */}
  </div>
</section>
```

### Column grid reference

| Breakpoint | Columns | Gap |
|---|---|---|
| Desktop (≥ 1024px) | 12 | 24px (`gap-6`) |
| Tablet (768–1023px) | 8 | 16px (`gap-4`) |
| Mobile (< 768px) | 4 | 16px (`gap-4`) |

This is a reference system, not a literal CSS grid on the body. Implement per-component using Tailwind grid utilities.

---

## 05 — Scroll and Responsive Behavior

### 3-column card grids

Desktop: 3 columns, 24px gap. Tablet: 2 columns, 16px gap. Mobile: 1-column stack. No horizontal scroll.

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
```

### Tile carousels

Desktop: 4-column grid. Tablet: 3-column grid. Mobile: horizontal scroll, 80vw card width, snap behavior, bleeds to viewport edge via negative margin.

```jsx
<div className="overflow-x-auto -mx-4 px-4 flex gap-4 snap-x snap-mandatory md:grid md:mx-0 md:px-0 md:grid-cols-3 lg:grid-cols-4">
  <div className="snap-start shrink-0 w-[80vw] md:w-auto">
    {/* card content */}
  </div>
</div>
```

On `md+` breakpoints, flex becomes grid and scroll is not needed.

### Stats strips (5+ items)

Desktop: single row. Tablet: 3-column grid, items wrap. Mobile: 2-column grid. Stats are compact enough to stack without scrolling.

```jsx
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
```

### Partner logo strip

Always a CSS marquee at all viewport sizes. Logos never stack or wrap. Pause on hover. Pure CSS — no JS required.

The track contains two identical copies of the logo list side by side. When the first scrolls out of view, the second is in the correct position to loop seamlessly.

```css
/* globals.css */
@keyframes uw-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.logo-strip-track {
  display: flex;
  width: max-content;
  animation: uw-marquee 30s linear infinite;
}

.logo-strip-track:hover {
  animation-play-state: paused;
}
```

```jsx
<div className="overflow-hidden">
  <div className="logo-strip-track">
    {logos}{logos} {/* two identical copies for seamless loop */}
  </div>
</div>
```

---

## 06 — Section Background Logic

### Surface types

| Surface | Value | Usage | Per-page limit |
|---|---|---|---|
| Dark | `#010512` or gradient | Heroes (always); high-emphasis callouts | No limit — use intentionally |
| White | `#FFFFFF` | Default for all non-hero, non-amber sections | Default |
| Amber | `#E9A638` solid | Maximum visual emphasis | Once per page |

**The light tint (#EEF1FA) is removed from this system.** It is not used anywhere on the Uniware website. If two white sections are adjacent, use a section divider line instead.

### Dark sections

**Hero — every page, always.**
- Background: `linear-gradient(90deg, #040C25, #010512)`
- Logo: gold version
- Amber accent: `#E9A638`
- Circle group: white arcs at 32% opacity

**High-emphasis callouts.** Stats strips, key proof moments, CTA blocks that need to stand out strongly. No per-page limit, but use deliberately. Not every page needs one.

### White sections

Default for all card grids, feature sections, case studies, partner content, and general content.
- Logo: black version
- Amber accent: `#BB6D08`
- Circle group (if used): dark arcs at 32% opacity

### Amber sections

Background: `#E9A638` (solid, no gradient). Maximum once per page. Use for the single most important call to action or proof statement.

- Text: `#010512` only. White text fails contrast on amber. Never use white text on amber.
- Circle arcs: permitted. Use `surface="light"` on the CircleGroup component (`rgba(1,5,18,0.32)`).
- No amber accent elements (amber on amber does not work).
- Buttons: primary only (dark fill, white text). No secondary buttons.
- This is a web-specific exception to the brand guideline that prohibits amber as a background. It is intentional and deliberate. Do not make it a habit.

### Section dividers between consecutive white sections

```jsx
<section className="border-t border-[rgba(1,5,18,0.10)] py-12 md:py-16 lg:py-24">
```

The `border-top` sits at the top of the second section. No additional margin or decorative element needed.

### Section transitions

All section-to-section transitions are hard edges. No gradient bleed. No fade between dark and light. The background color change is the only visual signal.

### Typical page rhythm (example — not prescriptive)

```
Hero                         Dark (gradient)
Services overview            White
Partner logos                White  (border-t divider)
Case studies                 White  (border-t divider)
Stats or proof strip         Dark
Insights / articles          White
Footer                       Dark
```

---

## 07 — Circle Brand Element

Three concentric arcs rendered as CSS circles. Each is a square `div` with `border-radius: 1000px`. Different border widths per side create the incomplete-arc visual. The initial rotation for each circle is baked directly into its CSS animation keyframe, so the start position is correct from frame zero without any JS class toggling.

### Visual specification

### Size tiers

| Size | Outer | Middle | Inner | Usage |
|---|---|---|---|---|
| `xl` | 480px | 320px | 160px | Hero sections — always use xl |
| `lg` | 360px | 240px | 120px | Feature and callout sections |
| `sm` | 240px | 160px | 80px | Compact sections |

Default prop: `size="xl"`. The component default is xl.

### Border weights and starting rotations

| Circle | Rotation start | L border | T border | R border | B border |
|---|---|---|---|---|---|
| Outer | 0° | 2px | 1px | 1px | 0px |
| Middle | 60° | 1px | 2px | 0px | 1px |
| Inner | 120° | 1px | 0px | 0px | 2px |

**Centering formula:** `offset = (outerDimension − thisDimension) / 2`. Applied as `top` and `left` from the group container's origin.

Selected xl offsets: middle `(480 − 320) / 2 = 80px` · inner `(480 − 160) / 2 = 160px` · bleed `480 × 0.25 = 120px`.

### Color by surface

| Surface | Border color |
|---|---|
| Dark (`#010512` or gradient) | `rgba(255,255,255,0.32)` |
| White (`#FFFFFF`) | `rgba(1,5,18,0.32)` |
| Amber (`#E9A638`) | `rgba(1,5,18,0.32)` — same dark arcs as on white sections |

### Animation specification

| Circle | Direction | XL | LG | SM |
|---|---|---|---|---|
| Outer | Clockwise | 14s | 18s | 18s |
| Middle | Counter-clockwise | 20s | 25s | 25s |
| Inner | Clockwise | 9s | 12s | 12s |

The speed differential between rings is intentional and must be preserved — outer slowest, inner fastest. At xl, the inner ring at 9s is the first visitors notice, creating ambient life without distraction. Durations are set via inline styles in the CircleGroup component (size-dependent). Keyframe names and starting angles are unchanged.

### CSS keyframes (add to globals.css)

```css
/* Outer — starts 0°, CW */
@keyframes uw-circle-outer {
  from { transform: rotate(0deg);   }
  to   { transform: rotate(360deg); }
}

/* Middle — starts 60°, CCW */
@keyframes uw-circle-middle {
  from { transform: rotate(60deg);   }
  to   { transform: rotate(-300deg); }
}

/* Inner — starts 120°, CW */
@keyframes uw-circle-inner {
  from { transform: rotate(120deg); }
  to   { transform: rotate(480deg); }
}

/* Reduced motion: circles remain visible but static at their start positions */
@media (prefers-reduced-motion: reduce) {
  [data-circle="outer"]  { animation: none !important; transform: rotate(0deg);   }
  [data-circle="middle"] { animation: none !important; transform: rotate(60deg);  }
  [data-circle="inner"]  { animation: none !important; transform: rotate(120deg); }
}

/* xl responsive scaling — transform only, no layout shift */
.uw-circles-xl {
  transform-origin: bottom right;
  transform: scale(0.6);          /* mobile < 768px — effective 288px outer */
}
.uw-circles-xl.pos-top-right {
  transform-origin: top right;    /* matches anchor corner when top-right */
}

@media (min-width: 768px) {
  .uw-circles-xl { transform: scale(0.65); } /* tablet — effective 312px */
}

@media (min-width: 1024px) {
  .uw-circles-xl { transform: scale(1.0); }  /* desktop — full 480px */
}
```

### Positioning rules

- Default: bottom-right of the section, bleeding off the edge.
- Alternate: top-right, if content occupies the bottom-right.
- Bleed amount: 25% of the group diameter. xl: 120px · lg: 90px · sm: 60px.
- The `uw-circles-xl` CSS class is applied by the component when `size="xl"` and handles responsive scaling automatically.
- Never show two circle groups in the same viewport at the same time. A page may have more than one circle group if they sit in separate sections with enough scroll distance between them that they are never simultaneously visible.
- Never overlap text. Circle group: `position: absolute; z-index: 0`. Content wrapper: `position: relative; z-index: 1`.
- Always add `aria-hidden="true"` to the circle group container.

### JSX component

```tsx
// components/CircleGroup.tsx
// CSS keyframes and responsive scaling must be in globals.css (see above).
// size="xl" is the default. Use xl for all hero sections.

type CircleGroupProps = {
  size?: 'xl' | 'lg' | 'sm';
  surface?: 'dark' | 'light';
  position?: 'bottom-right' | 'top-right';
};

const dims = {
  xl: { outer: 480, middle: 320, inner: 160 },
  lg: { outer: 360, middle: 240, inner: 120 },
  sm: { outer: 240, middle: 160, inner:  80 },
};

const speeds = {
  xl: { outer: 14, middle: 20, inner:  9 },
  lg: { outer: 18, middle: 25, inner: 12 },
  sm: { outer: 18, middle: 25, inner: 12 },
};

export function CircleGroup({
  size = 'xl',
  surface = 'dark',
  position = 'bottom-right',
}: CircleGroupProps) {
  const d = dims[size];
  const sp = speeds[size];
  const color = surface === 'dark'
    ? 'rgba(255,255,255,0.32)'
    : 'rgba(1,5,18,0.32)';
  const center = (outer: number, inner: number) => (outer - inner) / 2;
  const bleed = Math.round(d.outer * 0.25);
  const pos = position === 'bottom-right'
    ? { bottom: -bleed, right: -bleed }
    : { top: -bleed, right: -bleed };

  // CSS classes drive responsive scaling for xl
  const sizeClass = `uw-circles-${size}`;
  const posClass = size === 'xl' && position === 'top-right' ? 'pos-top-right' : '';

  const base: React.CSSProperties = {
    position: 'absolute',
    borderRadius: 1000,
    borderStyle: 'solid',
    borderColor: color,
  };

  return (
    <div
      className={[sizeClass, posClass].filter(Boolean).join(' ')}
      style={{ position: 'absolute', width: d.outer, height: d.outer, pointerEvents: 'none', ...pos }}
      aria-hidden="true"
    >
      <div data-circle="outer" style={{
        ...base, width: d.outer, height: d.outer, top: 0, left: 0,
        borderLeftWidth: 2, borderTopWidth: 1, borderRightWidth: 1, borderBottomWidth: 0,
        animation: `uw-circle-outer ${sp.outer}s linear infinite`,
      }} />
      <div data-circle="middle" style={{
        ...base,
        width: d.middle, height: d.middle,
        top: center(d.outer, d.middle), left: center(d.outer, d.middle),
        borderLeftWidth: 1, borderTopWidth: 2, borderRightWidth: 0, borderBottomWidth: 1,
        animation: `uw-circle-middle ${sp.middle}s linear infinite`,
      }} />
      <div data-circle="inner" style={{
        ...base,
        width: d.inner, height: d.inner,
        top: center(d.outer, d.inner), left: center(d.outer, d.inner),
        borderLeftWidth: 1, borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 2,
        animation: `uw-circle-inner ${sp.inner}s linear infinite`,
      }} />
    </div>
  );
}
```

---

## 08 — Animation System

### Core principle

CSS-first. JavaScript is progressive enhancement only.

Many of Uniware's manufacturing clients have JavaScript disabled as part of their system hardening. All content must be fully visible and all navigation must work without JS. Animations are additive — they enhance visible content, they never gate it.

**Critical rule: never set `opacity: 0` as a default CSS state on any content element.** Without JS, content must be readable immediately.

### Named keyframes (globals.css)

```css
@keyframes uw-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes uw-fade-in-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes uw-fade-in-left {
  from { opacity: 0; transform: translateX(-16px); }
  to   { opacity: 1; transform: translateX(0); }
}
```

Circle and marquee keyframes are defined in Sections 07 and 05.

### Scroll-triggered reveals

Position-based, not `IntersectionObserver`. Every frame, each `[data-reveal]` element's position is measured directly against a fixed trigger line and revealed once it crosses — this can't skip a fast-moving element the way an observer firing between two checks theoretically could. Progressive enhancement only — without JS, `html.is-ready` is never added and elements remain visible in their default state (not animated, but fully accessible).

```css
/* globals.css */
[data-reveal]{ opacity:1; transform:none; }

html.is-ready [data-reveal]{
  opacity:0;
  transform:translateY(14px);
  transition:
    opacity   600ms ease-out var(--reveal-delay,0ms),
    transform 600ms ease-out var(--reveal-delay,0ms);
}
html.is-ready [data-reveal].is-visible{ opacity:1; transform:translateY(0); }
```

```typescript
// hooks/useReveal.ts
import { useEffect } from 'react';

const TRIGGER_LINE = 0.65; // 65% down the viewport — elements finish
                            // animating before reaching the reader's
                            // actual eye line (~50%). Tune this one
                            // number to shift the trigger point.

export function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add('is-ready');

    let revealEls = Array.from(document.querySelectorAll('[data-reveal]'))
      .filter((el) => !el.closest('.hero')); // hero handled separately, see below
    let ticking = false;

    function check() {
      ticking = false;
      const line = window.innerHeight * TRIGGER_LINE;
      revealEls = revealEls.filter((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top > line) return true; // not reached yet, keep tracking
        const delay = parseInt(el.getAttribute('data-reveal'), 10) || 0;
        el.style.setProperty('--reveal-delay', `${delay}ms`);
        el.classList.add('is-visible');
        return false; // revealed, stop tracking
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    check(); // initial pass for any non-hero elements already above the trigger line at load

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
}
```

The `data-reveal` value on each element is its stagger delay in milliseconds (e.g. `data-reveal="80"`, `data-reveal="160"`).

### Framer Motion usage limits


**Permitted:**
- Hover states and micro-interactions (button lift, card hover highlight)
- Layout animations (accordion expand/collapse, tab switching)
- Page route transitions

**Not permitted:**
- Scroll-triggered content visibility — use the CSS `.reveal` pattern above.
- Any `initial={{ opacity: 0 }}` where content would be hidden without client JS.
- Navigation visibility or any interactive state that requires JS to function.

If Framer Motion is used, verify that the Next.js server render produces visible, readable content without client JS.

### Fade-in exception — Hero and Footer

The standard scroll-reveal system (rAF-based position check against a fixed `TRIGGER_LINE` — see live implementation for current constant, currently `0.65` — 600ms ease-out, 14px lift, staggered via a `data-reveal` delay attribute) applies to all sections **between** the hero and the footer.

**Hero.** Never gated by scroll position or the `TRIGGER_LINE` threshold. Its `[data-reveal]` elements fade in automatically the instant the page renders, in their staggered order, using the same 600ms/14px timing as the rest of the system — just triggered on load instead of on scroll. A visitor hasn't scrolled yet and shouldn't have to in order to see the CTA or anything else in the hero.

Implementation note: hero elements are revealed in their own pass on script init and are explicitly excluded from the scroll-tracked element set, so they can never end up waiting on a scroll event that hasn't happened yet.

**Footer.** Not animated at all. It never carries `data-reveal` in the first place and renders fully visible and complete immediately — no fade-in, no stagger, no scroll-trigger dependency.

### Reduced motion

```css
/* globals.css — non-negotiable WCAG requirement */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 09 — Icon System

Phosphor Icons only. Regular weight only.

```bash
npm install @phosphor-icons/react
```

```tsx
import { ShieldCheck, CloudArrowUp, HardDrive } from '@phosphor-icons/react';

// Size via size prop. Color via Tailwind className.
<ShieldCheck size={24} className="text-[#010512]" />
```

**Rules:**
- Regular weight by default. Fill is permitted for active and selected states, or where an icon needs more visual weight. Duotone is permitted for larger illustrative contexts where the icon is a focal point. Bold, Thin, and Light weights are never used.
- White on dark surfaces. `#010512` on light surfaces. `#BB6D08` as accent on light only.
- Every icon must convey meaning. No decorative icons.
- Never mix Phosphor with any other icon library.

---

## 10 — Button System

### Base properties

Font: DM Sans 500. Radius: 8px (`rounded-lg`). Transition: `background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease`.

All buttons carry a `border: 1px solid` so switching between filled and ghost states never causes layout shift.

### Types

Three types across all surfaces:
- **Text only** — standard CTA
- **Text + arrow** — navigational or directional CTA. Arrow is inline SVG with `stroke="currentColor"` so it always matches button text color, including on hover.
- **Icon square** — compact, card-level or supplementary action

Which type to use is a per-context decision, not a per-surface rule.

### Sizes

| Name | Font size | Padding | Icon square |
|---|---|---|---|
| Large | 16px | `py-[14px] px-[30px]` | 52 × 52px |
| Medium (default) | 15px | `py-[11px] px-[22px]` | 44 × 44px |
| Small | 13px | `py-[7px] px-[14px]` | 36 × 36px |

Large: hero CTAs and standalone CTA blocks. Medium: default for most sections. Small: card CTAs and inline actions.

### Arrow SVG (inline, reuse across all button types)

```jsx
<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
  <path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5"
    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

---

### Dark backgrounds

| State | Primary | Secondary |
|---|---|---|
| Default | White fill, dark text, white border | Transparent, white border (35% opacity), white text |
| Hover | Transparent, white border, white text | White fill, dark text, white border |

```jsx
{/* Primary */}
<button className="bg-white text-[#010512] border border-white font-body font-medium
  text-[15px] px-[22px] py-[11px] rounded-lg
  hover:bg-transparent hover:text-white
  transition-[background-color,border-color,color] duration-150 ease-in-out">
  Get in touch
</button>

{/* Secondary */}
<button className="bg-transparent text-white border border-[rgba(255,255,255,0.35)] font-body font-medium
  text-[15px] px-[22px] py-[11px] rounded-lg
  hover:bg-white hover:text-[#010512] hover:border-white
  transition-[background-color,border-color,color] duration-150 ease-in-out">
  Learn more
</button>
```

**Note:** On hover, primary and secondary both render as ghost with white text. This is intentional. In practice, buttons are positioned and sized with enough surrounding context that the hover parity does not create confusion.

---

### White backgrounds

| State | Primary | Secondary |
|---|---|---|
| Default | Dark fill (#010512), white text | Transparent, dark border (28% opacity), dark text |
| Hover | Amber fill (#E9A638), dark text, amber border | Dark fill (#010512), white text |

```jsx
{/* Primary */}
<button className="bg-[#010512] text-white border border-[#010512] font-body font-medium
  text-[15px] px-[22px] py-[11px] rounded-lg
  hover:bg-[#E9A638] hover:border-[#E9A638] hover:text-[#010512]
  transition-[background-color,border-color,color] duration-150 ease-in-out">
  Get in touch
</button>

{/* Secondary */}
<button className="bg-transparent text-[#010512] border border-[rgba(1,5,18,0.28)] font-body font-medium
  text-[15px] px-[22px] py-[11px] rounded-lg
  hover:bg-[#010512] hover:border-[#010512] hover:text-white
  transition-[background-color,border-color,color] duration-150 ease-in-out">
  Learn more
</button>
```

---

### Amber backgrounds

Primary only. No secondary buttons on amber sections.

| State | Primary |
|---|---|
| Default | Dark fill (#010512), white text |
| Hover | White fill, dark text, white border |

```jsx
{/* Primary */}
<button className="bg-[#010512] text-white border border-[#010512] font-body font-medium
  text-[15px] px-[22px] py-[11px] rounded-lg
  hover:bg-white hover:border-white hover:text-[#010512]
  transition-[background-color,border-color,color] duration-150 ease-in-out">
  Get in touch
</button>
```

---

## 11 — Component Index

Detailed per-component specs are produced in individual build sessions. This is a navigation map.

| Component | Default background | Notes |
|---|---|---|
| Hero section | Dark | Gradient bg, circle group (lg), eyebrow, H1, lead copy, CTA buttons, logo strip below |
| Stats strip | Dark or white | Space Grotesk 700, 72px numbers on dark; 64px on white |
| Partner logo strip | White | CSS marquee, pause on hover, never stacks |
| Horizontal tile carousel | Any | 4-col desktop, 3-col tablet, 80vw snap-scroll mobile |
| Two-column card layout | White or dark | Paired content: problem/solution, before/after |
| Levels grid | White | Connected card group technique; cybersecurity insurance levels |
| Case study cards | White | Eyebrow tag, anonymized company descriptor, challenge, outcome, sectors |
| Sticky subnav tabs | White | Sticks at scroll; numbered or labeled; highlights active tab |
| CTA block | Dark or amber | Primary action, optional secondary |
| Footer | Dark | Links, contact, partner badges, legal line, gold logo |

---

## 12 — What Never to Do

### Copy
- Em dash anywhere, in any medium. Use a comma or a short sentence instead.
- Cutting-edge, transformative, best-in-class, synergies, leverage (as jargon).
- MRF referenced as a client.
- Founding year as anything other than 1995.
- Schwing Stetter named in any public-facing content. Use "a leading global manufacturer of construction equipment."

### Color
- `#EEF1FA` as any surface — removed from this system entirely.
- `#E9A638` on light or white backgrounds.
- `#BB6D08` on dark backgrounds.
- Amber `#E9A638` as section background more than once per page.
- White text on amber backgrounds — fails contrast.
- Amber gradient outside the logo mark.
- Dark gradient in print materials.

### Cards and borders
- Drop shadows anywhere. Borders only.
- Card-level borders in connected groups — use the parent-gap technique.
- Stacked or doubled borders — they compound in opacity and create inconsistent joins.

### Circles
- Two circle groups visible in the same viewport at the same time.
- Circles overlapping any text layer.

### Icons
- Phosphor Bold, Thin, or Light variants.
- Any icon library other than Phosphor.

### Animation and JavaScript
- `opacity: 0` as a default state on any content element.
- Framer Motion for scroll-triggered content visibility.
- Navigation or interactive state that requires JS to function.

### Typography
- Courier Prime outside digital code UI elements.
- Syne Bold outside the logo wordmark.
- More than two typefaces in a single layout.
- Lowercase eyebrow labels — always uppercase.

---

## Appendix A — Consolidated Tailwind Config

```typescript
// tailwind.config.ts — complete additions block
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'uw-black':        '#010512',
        'uw-dark-blue':    '#040C25',
        'uw-white':        '#FFFFFF',
        'uw-body-text':    '#1A1F3C',
        'uw-muted':        '#6B7280',
        'uw-amber-dark':   '#E9A638',
        'uw-amber-light':  '#BB6D08',
        'border-light':    'rgba(1,5,18,0.16)',
        'border-dark':     'rgba(255,255,255,0.10)',
        'section-divider': 'rgba(1,5,18,0.10)',
        'group-light':     'rgba(1,5,18,0.16)',
        'group-dark':      'rgba(255,255,255,0.10)',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'sans-serif'],
      },
      fontSize: {
        'display': ['64px', { lineHeight: '1.10', letterSpacing: '-0.02em'  }],
        'h2':      ['48px', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'h3':      ['32px', { lineHeight: '1.20', letterSpacing: '-0.01em'  }],
        'h4':      ['24px', { lineHeight: '1.30', letterSpacing: '0'        }],
        'eyebrow': ['13px', { lineHeight: '1.40', letterSpacing: '0.12em'   }],
        'stat':    ['72px', { lineHeight: '1.0',  letterSpacing: '-0.02em'  }],
        'body-lg': ['20px', { lineHeight: '1.55' }],
        'body':    ['16px', { lineHeight: '1.65' }],
        'body-sm': ['14px', { lineHeight: '1.50' }],
      },
      maxWidth: {
        'content': '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## Appendix B — globals.css Token Block

```css
/* globals.css — root design tokens for Uniware website */
/* Every component must use these variables. Never hardcode values in components. */

:root {
  /* ── Backgrounds ─────────────────────────────── */
  --uw-black:        #010512;
  --uw-dark-blue:    #040C25;
  --uw-white:        #FFFFFF;

  /* ── Text ────────────────────────────────────── */
  --uw-body-text:    #1A1F3C;
  --uw-muted:        #6B7280;

  /* ── Amber (surface-specific — see amber rule) ── */
  --uw-amber-dark:   #E9A638;   /* dark surfaces only */
  --uw-amber-light:  #BB6D08;   /* light surfaces only */

  /* ── Borders ─────────────────────────────────── */
  --border-light:    rgba(1,5,18,0.16);
  --border-dark:     rgba(255,255,255,0.10);
  --section-divider: rgba(1,5,18,0.10);

  /* ── Card group backgrounds (parent-gap) ─────── */
  --group-light:     rgba(1,5,18,0.16);
  --group-dark:      rgba(255,255,255,0.10);

  /* ── Circle arcs ─────────────────────────────── */
  --circle-dark:     rgba(255,255,255,0.32);  /* on dark backgrounds */
  --circle-light:    rgba(1,5,18,0.32);       /* on light backgrounds */

  /* ── Fonts (injected by next/font at <html>) ─── */
  /* --font-space-grotesk and --font-dm-sans */
}

/* ── Reduced motion (non-negotiable WCAG requirement) ── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Appendix C — Hero Section Specification

### Content column widths (site-wide, all heroes)

These max-width constraints apply to heading and subtext elements inside every hero section across the entire Uniware website. They are not page-specific.

| Element | Max-width | Rationale |
|---|---|---|
| Eyebrow | None | Always short, no constraint needed |
| H1 heading | `max-w-[880px]` | At 64px, 880px gives natural 2–3 line wrapping without over-stretching |
| Subtext (body-lg, 20px) | `max-w-[640px]` | At 20px / lh 1.55, gives 55–58 characters per line — the readable sweet spot for lead copy |
| CTA button(s) | None | Buttons wrap naturally |

No forced line breaks (`<br />`) in JSX. The browser wraps naturally within these constraints.

### Hero CTA rule (site-wide)

One CTA per hero. Secondary CTAs — assessments, tools, lower-commitment offers — belong further down the page, positioned at the section where they are most contextually relevant. They must never compete with the primary hero CTA.

### Amber word highlighting in hero headlines

Key words or phrases within an H1 can be highlighted in `#E9A638` (amber-dark) using an inline `<span>`. This is the confirmed technique for drawing the eye to the core argument of the page without adding a graphic element.

```jsx
<h1 className="font-display font-bold text-[40px] lg:text-[64px] leading-[1.1] tracking-[-0.02em] text-white max-w-[880px]">
  Good security blocks attacks.{' '}
  <span className="text-[#E9A638]">A good recovery plan</span>{' '}
  makes them irrelevant.
</h1>
```

**Rules:**
- Applies to dark background heroes only. `#E9A638` is the dark-surface amber token.
- Applied via `<span className="text-[#E9A638]">` wrapping the target words only.
- Never force line breaks to control where the span falls. Let it wrap naturally.
- Screen readers read the headline as one unbroken sentence. No accessibility impact.
- One span per headline maximum. This is emphasis, not decoration.

---

## Appendix D — Sticky Subnav Specification

### Tab font size

`font-body font-medium text-[16px]`. The original 13.5px was too small — subnav tabs are primary navigation and must be legible at a glance.

### Tab height fill pattern

`<li>` elements in the subnav flex container must have `display: flex` applied directly. Without it, the nested `<a>` cannot use `height: 100%` to fill the full 52px bar, causing the amber active underline to float mid-row instead of sitting flush at the bar bottom.

```jsx
<ul className="flex items-stretch h-[52px] ...">
  <li className="flex">                           {/* display:flex required on li */}
    <a className="flex items-center h-full px-5 ...">
      Tab label
    </a>
  </li>
</ul>
```

---

## Appendix E — Case Study Page Type-Scale Deviations

The case study template (see `structure-2-stats-strip-below.html`) intentionally departs from the site-wide type scale in two places. Both are confirmed, not oversights — documented here so Srimathi builds them as specified rather than "fixing" them back to the main scale.

### 1. Compact hero headline

Main design system spec (Section 02, Appendix C): Hero H1 is `text-display`, 40px mobile → 64px desktop.

Case study hero headline instead uses:

| Breakpoint | Case study `.cs-hero-headline` | Main site-wide Hero H1 |
|---|---|---|
| Mobile | 32px | 40px |
| Tablet (768px+) | 40px | 40px |
| Desktop (1024px+) | 46px | 64px |

Reason: a case study headline is a full sentence describing the outcome (e.g. "Ransomware recovery for a five-division manufacturing business, in 72 hours"), not a short marketing line. At 64px that sentence wraps awkwardly across too many lines and overwhelms the compact hero. 46px keeps it legible as a sentence while still reading as a headline.

### 2. Compact stat number

Main design system spec (Section 02): Stat number is `text-stat`, 48px mobile → 72px desktop.

Case study hero stat strip instead uses:

| Breakpoint | Case study `.cs-hero-stat-number` | Main site-wide stat number |
|---|---|---|
| Mobile / Tablet | 30px | 48px |
| Desktop (1024px+) | 36px | 72px |

Reason: the case study stat strip carries four stats side by side inside a compact hero band, directly under the headline. At full 72px scale, four stats crowd the strip and compete with the headline above them for attention. The smaller scale keeps the strip proportionate to the rest of the compact hero.

**Rule going forward:** any other page section that reuses the main site-wide Hero or Stat components should use the full 40/64px and 48/72px scale as normal. These two deviations apply only within the case study template's compact hero, not site-wide.

---

## Appendix F — Section Build Working Method

Confirmed workflow for all remaining page and section builds on the Uniware website.

1. Share copy and any visual references.
2. Propose layout and show wireframe in the Claude visualizer.
3. Discuss and confirm layout — iterate until approved.
4. Move to next section — repeat steps 1–3 for all sections on the page.
5. Once all sections on the page are confirmed, one dedicated build session produces all JSX files, globals additions, and one complete preview HTML.
6. Preview HTML is downloaded and opened in Chrome or Safari. Never previewed inside Claude.

**The preview HTML is the approval gate** before files go to Srimathi. It must load Space Grotesk and DM Sans via Google Fonts `<link>` tag and faithfully mirror the JSX component output.

---

*Confirmed by Niki (Nikita Vergis) · July 2026 · Uniware Systems · uniware.net*
*Add this file to the Uniware project in Claude so every build session references it automatically.*
