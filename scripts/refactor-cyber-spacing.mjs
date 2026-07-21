/**
 * Cybersecurity spacing audit — Option B.
 * Replaces hardcoded spacing px with design tokens from globals.css.
 * Also applies required fixes: .recovery, .hero, .gs-head, .cs-grid head gap,
 * .site-nav-cta Small secondary, structural constants.
 */
import fs from "node:fs";

const FILES = [
  "src/styles/cybersecurity.page.css",
  "src/styles/cybersecurity.css",
];

/** Longer / more specific first where needed */
const REPLACEMENTS = [
  // ── Required: recovery section padding bug ──
  [
    `.recovery   .container { padding-top:64px; padding-bottom:64px; }
@media(min-width:768px){
  .prevention .container,.recovery .container { padding-top:64px; padding-bottom:64px; }
}
@media(min-width:1024px){
  .prevention .container,.recovery .container { padding-top:96px; padding-bottom:96px; }
}`,
    `.prevention .container,
.recovery .container { padding-top:var(--section-pad-sm); padding-bottom:var(--section-pad-sm); }
@media(min-width:768px){
  .prevention .container,
  .recovery .container { padding-top:var(--section-pad-md); padding-bottom:var(--section-pad-md); }
}
@media(min-width:1024px){
  .prevention .container,
  .recovery .container { padding-top:var(--section-pad-lg); padding-bottom:var(--section-pad-lg); }
}`,
  ],
  // If prevention block still separate without recovery fix applied fully:
  [
    `.prevention .container { padding-top:48px; padding-bottom:48px; }
@media(min-width:768px){ .prevention .container{ padding-top:64px; padding-bottom:64px; } }
@media(min-width:1024px){ .prevention .container{ padding-top:96px; padding-bottom:96px; } }
.recovery   .container { padding-top:64px; padding-bottom:64px; }
@media(min-width:768px){
  .prevention .container,.recovery .container { padding-top:64px; padding-bottom:64px; }
}
@media(min-width:1024px){
  .prevention .container,.recovery .container { padding-top:96px; padding-bottom:96px; }
}`,
    `.prevention .container,
.recovery .container { padding-top:var(--section-pad-sm); padding-bottom:var(--section-pad-sm); }
@media(min-width:768px){
  .prevention .container,
  .recovery .container { padding-top:var(--section-pad-md); padding-bottom:var(--section-pad-md); }
}
@media(min-width:1024px){
  .prevention .container,
  .recovery .container { padding-top:var(--section-pad-lg); padding-bottom:var(--section-pad-lg); }
}`,
  ],

  // ── Required: hero asymmetric → symmetric 48/64/96 ──
  [
    `.hero .container{position:relative;z-index:2;padding-top:48px;padding-bottom:64px}
@media(min-width:768px) {.hero .container{padding-top:64px; padding-bottom:80px}}
/* Nav clearance is body padding-top:64px in globals.css — do not add another 64px here */
@media(min-width:1024px){.hero .container{padding-top:96px;padding-bottom:96px}}`,
    `.hero .container{position:relative;z-index:2;padding-top:var(--section-pad-sm);padding-bottom:var(--section-pad-sm)}
@media(min-width:768px){.hero .container{padding-top:var(--section-pad-md);padding-bottom:var(--section-pad-md)}}
/* Nav clearance is body padding-top:var(--uw-nav-height) in globals.css — do not add another here */
@media(min-width:1024px){.hero .container{padding-top:var(--section-pad-lg);padding-bottom:var(--section-pad-lg)}}`,
  ],

  // ── Nav CTA → Small secondary ──
  [
    `/* Primary CTA in nav — white fill, dark text on dark surface; hover: transparent + white text */
.site-nav-cta{
  font-family:var(--font-body); font-weight:var(--font-weight-medium); font-size:var(--text-body-sm); line-height:1;
  padding:9px 18px; border-radius:8px;
  background:var(--uw-white); color:var(--uw-black); border:1px solid var(--uw-white);
  text-decoration:none; white-space:nowrap;
  transition:background-color 150ms ease, color 150ms ease;
}
.site-nav-cta:hover{ background:transparent; color:var(--uw-white); }
.site-nav-cta--secondary{
  background:transparent; color:var(--uw-white); border-color:var(--border-chrome-intense);
}
.site-nav-cta--secondary:hover{
  background:var(--uw-white); color:var(--uw-black); border-color:var(--uw-white);
}`,
    `/* Nav CTA — Small + secondary on dark (DS button table) */
.site-nav-cta{
  font-family:var(--font-body); font-weight:var(--font-weight-medium); font-size:var(--text-button-sm); line-height:1;
  padding:var(--btn-py-sm) var(--btn-px-sm); border-radius:8px;
  background:transparent; color:var(--uw-white); border:1px solid var(--border-chrome-intense);
  text-decoration:none; white-space:nowrap;
  transition:background-color 150ms ease, color 150ms ease, border-color 150ms ease;
}
.site-nav-cta:hover{ background:var(--uw-white); color:var(--uw-black); border-color:var(--uw-white); }
.site-nav-cta--secondary{
  background:transparent; color:var(--uw-white); border-color:var(--border-chrome-intense);
}
.site-nav-cta--secondary:hover{
  background:var(--uw-white); color:var(--uw-black); border-color:var(--uw-white);
}`,
  ],

  // ── Head gap reconcile: gs-head + cs-grid → 28px ──
  [`.gs-head { margin-bottom:40px; }`, `.gs-head { margin-bottom:var(--section-head-gap); }`],
  [
    `.cs-grid { display:grid; grid-template-columns:1fr; gap:24px; margin-top:40px; }`,
    `.cs-grid { display:grid; grid-template-columns:1fr; gap:var(--space-6); margin-top:var(--section-head-gap); }`,
  ],

  // ── Structural tokens ──
  [
    `.site-nav{
  position:fixed; top:0; left:0; right:0; z-index:60;
  /* background: Tailwind bg-linear-90 from-uw-dark-blue to-uw-black on SiteNav */
  border-bottom:1px solid var(--border-chrome);
  height:64px; display:flex; align-items:center;
}`,
    `.site-nav{
  position:fixed; top:0; left:0; right:0; z-index:60;
  /* background: Tailwind bg-linear-90 from-uw-dark-blue to-uw-black on SiteNav */
  border-bottom:1px solid var(--border-chrome);
  height:var(--uw-nav-height); display:flex; align-items:center;
}`,
  ],
  [
    `.subnav{position:sticky;top:64px;z-index:50;background:var(--uw-white);border-bottom:1px solid var(--section-divider)}`,
    `.subnav{position:sticky;top:var(--uw-nav-height);z-index:50;background:var(--uw-white);border-bottom:1px solid var(--section-divider)}`,
  ],
  [
    `.subnav-list{display:flex;align-items:stretch;height:52px;padding:0 16px;width:max-content;min-width:100%;list-style:none}`,
    `.subnav-list{display:flex;align-items:stretch;height:var(--uw-subnav-height);padding:0 var(--space-4);width:max-content;min-width:100%;list-style:none}`,
  ],
  [
    `#our-approach,#prevention,#recovery,#where-to-start,#client-stories{scroll-margin-top:116px}`,
    `#our-approach,#prevention,#recovery,#where-to-start,#client-stories{scroll-margin-top:var(--uw-scroll-offset)}`,
  ],
  [
    `top:132px; /* main nav 64px + subnav 52px + 16px clearance */`,
    `top:var(--uw-sticky-rings-top); /* nav + subnav + 16px clearance */`,
  ],

  // ── Section padding blocks (shared pattern) ──
  ...["wts", "gs", "cs", "stats", "our-approach"].flatMap((sec) => {
    const sel = sec === "our-approach" || sec === "stats" ? `.${sec}` : `.${sec}`;
    // handle both spaced and compact forms
    return [
      [
        `${sel} .container { padding-top:48px; padding-bottom:48px; }
@media(min-width:768px){ ${sel} .container{ padding-top:64px; padding-bottom:64px; } }
@media(min-width:1024px){ ${sel} .container{ padding-top:96px; padding-bottom:96px; } }`,
        `${sel} .container { padding-top:var(--section-pad-sm); padding-bottom:var(--section-pad-sm); }
@media(min-width:768px){ ${sel} .container{ padding-top:var(--section-pad-md); padding-bottom:var(--section-pad-md); } }
@media(min-width:1024px){ ${sel} .container{ padding-top:var(--section-pad-lg); padding-bottom:var(--section-pad-lg); } }`,
      ],
      [
        `${sel} .container{padding-top:48px;padding-bottom:48px}
@media(min-width:768px){${sel} .container{padding-top:64px;padding-bottom:64px}}
@media(min-width:1024px){${sel} .container{padding-top:96px;padding-bottom:96px}}`,
        `${sel} .container{padding-top:var(--section-pad-sm);padding-bottom:var(--section-pad-sm)}
@media(min-width:768px){${sel} .container{padding-top:var(--section-pad-md);padding-bottom:var(--section-pad-md)}}
@media(min-width:1024px){${sel} .container{padding-top:var(--section-pad-lg);padding-bottom:var(--section-pad-lg)}}`,
      ],
    ];
  }),

  // ── Button padding tokens ──
  ["padding:11px 22px", "padding:var(--btn-py-md) var(--btn-px-md)"],
  ["padding:14px 30px", "padding:var(--btn-py-lg) var(--btn-px-lg)"],

  // ── Common spacing scale (word-boundary careful via property patterns) ──
  // Order: larger unique values first where ambiguous
  ["margin-bottom:72px", "margin-bottom:var(--space-72)"],
  ["margin-bottom:56px", "margin-bottom:var(--space-14)"],
  ["margin-bottom:40px", "margin-bottom:var(--space-10)"],
  ["margin-bottom:36px", "margin-bottom:var(--space-9)"],
  ["margin-bottom:32px", "margin-bottom:var(--space-8)"],
  ["margin-bottom:28px", "margin-bottom:var(--space-7)"],
  ["margin-bottom:24px", "margin-bottom:var(--space-6)"],
  ["margin-bottom:22px", "margin-bottom:var(--space-22)"],
  ["margin-bottom:20px", "margin-bottom:var(--space-5)"],
  ["margin-bottom:18px", "margin-bottom:var(--space-18)"],
  ["margin-bottom:16px", "margin-bottom:var(--space-4)"],
  ["margin-bottom:14px", "margin-bottom:var(--space-3_5)"],
  ["margin-bottom:12px", "margin-bottom:var(--space-3)"],
  ["margin-bottom:10px", "margin-bottom:var(--space-2_5)"],
  ["margin-bottom:8px", "margin-bottom:var(--space-2)"],
  ["margin-bottom:6px", "margin-bottom:var(--space-1_5)"],
  ["margin-bottom:4px", "margin-bottom:var(--space-1)"],

  ["margin-top:40px", "margin-top:var(--space-10)"],
  ["margin-top:32px", "margin-top:var(--space-8)"],
  ["margin-top:16px", "margin-top:var(--space-4)"],
  ["margin-top:14px", "margin-top:var(--space-3_5)"],
  ["margin-top:12px", "margin-top:var(--space-3)"],
  ["margin-top:8px", "margin-top:var(--space-2)"],

  ["padding-top:16px", "padding-top:var(--space-4)"],
  ["padding-bottom:8px", "padding-bottom:var(--space-2)"],
  ["padding-bottom:4px", "padding-bottom:var(--space-1)"],
  ["padding:36px", "padding:var(--space-9)"],
  ["padding:32px", "padding:var(--space-8)"],
  ["padding:24px 28px", "padding:var(--space-6) var(--space-7)"],
  ["padding:20px 24px", "padding:var(--space-5) var(--space-6)"],
  ["padding:20px", "padding:var(--space-5)"],
  ["padding:0 28px", "padding:0 var(--space-7)"],
  ["padding:0 20px", "padding:0 var(--space-5)"],
  ["padding:0 16px", "padding:0 var(--space-4)"],
  ["padding:0 24px", "padding:0 var(--space-6)"],
  ["padding:0 40px", "padding:0 var(--space-10)"],
  ["padding:0 12px", "padding:0 var(--space-3)"],
  ["padding:5px 12px", "padding:var(--space-px-5) var(--space-3)"],
  ["padding:3px 8px", "padding:var(--space-px-3) var(--space-2)"],
  ["padding:8px 0", "padding:var(--space-2) 0"],
  ["padding:18px 0", "padding:var(--space-18) 0"],

  ["gap:48px", "gap:var(--space-12)"],
  ["gap:40px", "gap:var(--space-10)"],
  ["gap:28px", "gap:var(--space-7)"],
  ["gap:24px", "gap:var(--space-6)"],
  ["gap:20px", "gap:var(--space-5)"],
  ["gap:12px", "gap:var(--space-3)"],
  ["gap:10px", "gap:var(--space-2_5)"],
  ["gap:8px", "gap:var(--space-2)"],
  ["gap:4px", "gap:var(--space-1)"],

  ["height:80px", "height:var(--space-20)"],
  ["width:48px; height:48px", "width:var(--space-12); height:var(--space-12)"],
  ["width:60px", "width:var(--space-60)"],
  ["min-height:40px", "min-height:var(--space-10)"],
  ["height:36px", "height:var(--space-9)"],
  ["width:36px", "width:var(--space-9)"],
  ["height:48px", "height:var(--space-12)"],

  // wts-head keeps 40→56 (different pattern — ring diagram)
  [
    `.wts-head { margin-bottom:var(--space-10); }
@media(min-width:1024px){ .wts-head{ margin-bottom:56px; } }`,
    `.wts-head { margin-bottom:var(--space-10); }
@media(min-width:1024px){ .wts-head{ margin-bottom:var(--space-14); } }`,
  ],
  [
    `.wts-head { margin-bottom:40px; }
@media(min-width:1024px){ .wts-head{ margin-bottom:56px; } }`,
    `.wts-head { margin-bottom:var(--space-10); }
@media(min-width:1024px){ .wts-head{ margin-bottom:var(--space-14); } }`,
  ],
];

for (const file of FILES) {
  let css = fs.readFileSync(file, "utf8");
  let applied = 0;
  for (const [from, to] of REPLACEMENTS) {
    if (css.includes(from)) {
      css = css.split(from).join(to);
      applied++;
    }
  }
  fs.writeFileSync(file, css);
  console.log(`${file}: ${applied} replacement patterns applied`);
}
