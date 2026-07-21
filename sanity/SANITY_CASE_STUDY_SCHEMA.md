# Uniware Website — Sanity Case Study Schema: Implementation Handoff

Use this to write / update Sanity schema documentation and to brief editors.
**This is not the UniDocs AI case-study model** — Uniware main-site case studies follow **content model v3** (fixed sections + toggles), not the UniDocs flexible Heading/Paragraph/Image block builder.

### Source of truth in repo

| Area | Path |
|------|------|
| Schema | `sanity/schemas/index.ts` (`technology`, `caseStudy`) |
| Content model (product) | `case-study-content-model-v3.md` |
| GROQ | `src/lib/sanity/queries.ts` |
| Mapper | `src/lib/sanity/mappers.ts` |
| Portable text helpers | `src/lib/sanity/portableText.ts` |
| Fetch + local fallback | `src/lib/sanity/index.ts` |
| Website types + fallback content | `src/content/case-studies/chemical-manufacturing.tsx` |
| Page UI | `src/components/pages/CaseStudyPage.tsx` |
| Styles | `src/styles/case-study.page.css` |
| Route | `src/app/resources/case-studies/[slug]/page.tsx` |
| Studio setup | `sanity/README.md`, `sanity.config.ts`, `sanity.cli.ts` |

**Project:** Sanity `ubaw4uif` · Dataset `production`  
**Studio (local):** `npm run sanity:dev` → http://localhost:3333  
**Public URL pattern:** `/resources/case-studies/[slug]`  
**Example slug:** `ransomware-recovery-chemical-manufacturing`

---

## Coverage audit — have we covered everything?

### Covered and live (schema + site)

| Area | Status |
|------|--------|
| Category tags (closed list, 1–3) | Done |
| Headline, subtext (bold-only portable text, max 220) | Done |
| Hero stats (min 3, max 4) + dynamic `--stat-cols` grid | Done |
| Client overview (heading, description max 200, location, timeline optional, delivered by, technologies) | Done |
| Problem (heading + portable text body, 1–3 paras, max 500/para) | Done |
| Solution (heading, body, showSteps + steps[], showTechnologies + tech refs) with conditional required | Done |
| Before & After (heading + reorderable rows, min 2) | Done |
| Results (heading + outcomes[], min 2, max 100 each) | Done |
| Note section (showNote toggle; source/quote/name/designation/company required when on) | Done |
| What's Next (optional; section hidden if blank) | Done |
| SEO title, meta description, slug (+ Studio pattern guidance) | Done |
| **ogImage** → Open Graph / Twitter metadata when set | Done |
| Technology document type + case-study references | Done |
| v3 Technology catalogue stubs (11 names) via `scripts/seed-technology-catalogue.mjs` | Done — upload missing logos in Studio |
| Sanity fetch with local chemical-manufacturing fallback | Done |
| Case study page `revalidate = 60` | Done |
| Array reorder in Studio (stats, steps, techs, before/after rows, outcomes) | Done — site order matches Studio |

### Still optional / product follow-ups

| Item | Detail |
|------|--------|
| Default OG image asset | When `ogImage` is blank, no custom share image is sent (platforms use a generic preview). Add a site-wide default PNG later if desired. |
| Partner-strip logos for full catalogue | Cybersecurity strip only shows technologies **with** a logo. Catalogue stubs without logos appear in Studio refs but not the strip until a logo is uploaded. |
| Listing page fully CMS-driven | `/resources/case-studies` exists; deepen later if needed |
| UniDocs-style body builders | Out of scope for v3 (see below) |

### Intentionally different from UniDocs AI handoff (do not “port” blindly)

| UniDocs AI | Uniware website (this project) |
|------------|--------------------------------|
| Flexible reorderable **Paragraph / Image / Heading** body builders | Fixed sections; body = **portable text (bold only)** — **no** in-body image blocks |
| Hero industry / use case / location **dropdowns** (+ Other) | Category tags dropdown; location is **free text**; no industry/use-case enums |
| Result stats **2–3** | Hero stats **3–4** |
| Customization section builder | **No** customization section — uses Problem / Solution / Before-After / Results |
| URL `/case-studies/...` | URL `/resources/case-studies/...` |

If product later wants UniDocs-style block builders (images mid-story, drag-reorder mixed blocks), that is a **schema + mapper + UI change**, not something already in v3.

---

## Core product decisions (document these)

1. **Fixed narrative layout (v3)**  
   Every published case study uses the same section order on the site: Hero → Overview + Problem → Solution → Before & After → Results → optional Note → optional What’s Next → global CTA/footer.

2. **Optional sections via toggles / blank fields**  
   - Steps: `showSteps` (default on)  
   - Solution technologies: `showTechnologies` (default on)  
   - Note: `showNote` (default off)  
   - What’s Next: leave blank → section omitted  
   - Overview timeline: leave blank → row omitted  

3. **Hero stats**  
   Editors add **3 or 4** stats. Website sets `style={{ '--stat-cols': stats.length }}` so the grid is 3 or 4 columns (not a fixed empty 4th cell).

4. **Technologies are shared references**  
   Create/edit logos once under **Technology**. Case studies pick them via reference + optional Type (e.g. “Falcon EDR”). Same list for overview sidebar and solution stack.

5. **Multiple case studies**  
   Every published Sanity doc with a slug is available at `/resources/case-studies/[slug]`. Local fallback still covers the chemical manufacturing example if Sanity has no usable published doc.

6. **Studio schema changes need restart / deploy**  
   - Local: `npm run sanity:dev` → http://localhost:3333  
   - Hosted: `npm run sanity:deploy`  
   Hosted Studio shows **old** fields until redeployed.

---

## Document type: `technology`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | string | yes | Display name (e.g. CrowdStrike) |
| logo | image | recommended | Official vendor logo |
| slug | slug | yes | Auto from name |

Used by: case study overview/solution references, and cybersecurity partner logo strip (`fetchTechnologies`).

---

## Document type: `caseStudy`

Studio groups: **Content** (default) · **SEO**

### Top-level fields

| Field | Type | Required | Group | Notes |
|-------|------|----------|-------|-------|
| categoryTags | array of string (list) | yes, min 1, max 3 | content | Closed Solutions categories |
| headline | string | yes, max 100 | content | Outcome one-liner |
| subtext | portable text (bold only) | yes | content | Anonymized client blurb |
| stats | array of {number, label} | yes, min 3, max 4 | content | Hero strip |
| overview | object | — | content | Client overview card |
| problem | object | — | content | |
| solution | object | — | content | |
| beforeAfter | object | — | content | |
| results | object | — | content | |
| showNote | boolean | — | content | Default false |
| note | object | if showNote | content | Hidden unless toggle on |
| whatsNext | string | no, max 200 | content | Blank = hide section |
| seoTitle | string | yes, max 60 | seo | |
| metaDescription | text | yes, max 155 | seo | |
| slug | slug | yes | seo | Source: headline |
| ogImage | image | no | seo | Used in Open Graph / Twitter when set |

### Slug guidance (in Studio description)

Pattern: `/resources/case-studies/[descriptive-slug]`  
Rules: lowercase, numbers, hyphens only  
Examples:
- `ransomware-recovery-chemical-manufacturing`
- `cloud-migration-mid-market-retail`

---

## Category tags (closed list)

| Title (stored value) |
|----------------------|
| Cloud |
| Cybersecurity |
| Modern Workplace |
| Data Protection |
| AI & Automation |
| Infrastructure |

Help text: “Choose up to 3. Can't see the right one? Ask Nikita to add it, don't force-fit an existing tag.”

---

## Stats

| Field | Required | Notes |
|-------|----------|-------|
| number | per item | Short text, e.g. `"72 Hrs"`, `"Zero"` — not a number type |
| label | per item | One line, no full stop |

Array: **min 3, max 4**. Reorderable in Studio.  
Website: `.cs-hero-stats` uses `--stat-cols: stats.length`.

---

## Overview (Client overview)

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| heading | yes, max 40 | string | e.g. “Chemical Manufacturing.” |
| description | yes | portable text (bold) | Who they are |
| location | yes | string | Country required; city optional — free text, not a dropdown |
| timeline | no | string | Leave blank if no clean timeframe |
| deliveredBy | yes | string | Default `"Uniware Systems"` |
| technologies | yes, min 1 | array | Reference + optional type |

Each technology item:

| Field | Notes |
|-------|-------|
| technology | Reference → `technology` |
| type | Optional qualifier, e.g. “Falcon EDR”, “Firewall” |

Sidebar render: `**Name** - Type` (type omitted if blank).

---

## Problem

| Field | Required | Notes |
|-------|----------|-------|
| heading | yes, max 100 | Full sentence |
| body | yes | Portable text (bold only). Mapper splits into `string[]` paragraphs |

---

## Solution

| Field | Required | Notes |
|-------|----------|-------|
| heading | yes, max 100 | |
| body | yes | Portable text (bold only) → single markdown string on site |
| showSteps | toggle, default true | |
| steps | if showSteps | Array of { title max 30, body max 300 } — **reorderable** |
| showTechnologies | toggle, default true | |
| technologies | if showTechnologies | Same reference + type shape as overview — **reorderable** |

---

## Before & After

| Field | Required | Notes |
|-------|----------|-------|
| heading | yes, max 100 | |
| rows | yes, min 2 | { metric, before, after } — **reorderable** |

---

## Results

| Field | Required | Notes |
|-------|----------|-------|
| heading | yes, max 100 | |
| outcomes | yes, min 2 | Array of short strings — **reorderable** |

---

## Note (optional)

| Field | Notes |
|-------|-------|
| showNote | Boolean, default **false** |
| source | Select: `client` → “A note from our client” / `team` → “A note from our team” |
| quote | Portable text (bold only) |
| name | string |
| designation | string |
| company | string |

Website only renders note when `showNote` is true **and** mapper finds a usable quote + name.

---

## What's Next

Optional string (max 200). If set, site shows a “What's next.” block under results.

---

## SEO

| Field | Required | Notes |
|-------|----------|-------|
| seoTitle | yes, max 60 | Browser tab / Google title |
| metaDescription | yes, max 155 | Search snippet |
| slug | yes | Public path segment |
| ogImage | no | **Not consumed by Next metadata yet** |

---

## Reorderability — what editors can drag

| Array | Block / item types | Notes |
|-------|--------------------|-------|
| categoryTags | tags | Order shown in hero tag row |
| stats | number + label | Drives hero grid |
| overview.technologies | tech ref + type | Sidebar list order |
| solution.steps | title + body | Numbered/stacked steps order |
| solution.technologies | tech ref + type | Solution stack order |
| beforeAfter.rows | metric / before / after | Table row order |
| results.outcomes | string | Checklist order |

**Not available (unlike UniDocs):** mid-section mixed **Heading | Paragraph | Image** builders. Bodies are portable text only (bold). Diagrams are not a first-class case-study field in v3.

Editor UX for arrays that exist:
1. Click **+ Add item**
2. Fill fields / pick reference
3. Drag ⋮⋮ to reorder
4. **Publish** → site shows same order (after next fetch / rebuild)

---

## Website rendering / mapping

### Types (`chemical-manufacturing.tsx`)

`CaseStudy` matches the page component. Portable text is converted to:
- **Bold markdown** (`**phrase**`) for single-string fields (`subtext`, overview description, solution body, note quote)
- **Paragraph array** for problem body (`portableTextBlocksToParagraphs`)

### Mapper (`mapSanityCaseStudy`)

Returns `null` (and fetch falls back to local) if required mapped fields are missing, including:
- slug, headline
- stats length &lt; 3
- overview heading / description / location / deliveredBy
- problem heading + at least one body paragraph
- solution heading
- beforeAfter heading
- results heading

Technology refs are projected in GROQ as `"name": technology->name` (logo not needed on case study page today — names/types only).

### Fetch (`src/lib/sanity/index.ts`)

1. If Sanity configured → fetch by slug → map  
2. If map fails / empty → local fallback map (`chemicalManufacturingCaseStudy`)  
3. Slugs: merge Sanity slugs + local fallback slugs for `generateStaticParams`

### UI (`CaseStudyPage.tsx`)

- Hero tags, headline, subtext (`renderBoldOnly`), stats grid  
- Overview card  
- Problem paragraphs  
- Solution body + optional steps + optional tech list  
- Before/after table  
- Results outcomes  
- Optional note + what’s next  
- Global CTA (not CMS fields)

---

## Ops / deploy notes

```powershell
# Website
npm run dev

# Studio
npm run sanity:dev

# After schema edits — hosted Studio
npm run sanity:deploy

# Sanity API smoke test
node --env-file=.env.local scripts/test-sanity.mjs

# Partner logos → Technology (images from public/partners)
node --env-file=.env.local scripts/seed-technologies.mjs

# Ensure all 11 v3 catalogue Technology docs exist (no logo overwrite)
node --env-file=.env.local scripts/seed-technology-catalogue.mjs
```

Env (site + scripts):

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_READ_TOKEN` (read)
- `SANITY_API_WRITE_TOKEN` (seed scripts only; never expose to browser)

---

## Recommended follow-ups (optional)

1. Upload official logos in Studio for catalogue entries that have no logo yet (Veeam, Dell, AWS, etc.).  
2. Add a site-wide default OG PNG if share previews without a custom image look too plain.  
3. Only if product asks: UniDocs-style polymorphic body blocks — **out of scope for current v3**.

---

## Quick “is everything covered?” answer

**For content model v3 structure: yes** — sections, validations, SEO (including ogImage when set), reorderable arrays, technology catalogue stubs, and case-study revalidation are in place.

**Still editor work:** upload missing Technology logos from official brand kits.  
**Still product-optional:** UniDocs-style flexible image/heading body builders (different product).
