# Uniware Website — Project Status Update for Niki

**Prepared by:** Srimathi  
**Date:** 2 September 2026  
**Audience:** Niki (Nikita Vergis)  
**Purpose:** Full picture of what is done, what is pending, and what is blocking.

---

## 1. Executive summary

Development continues on the **new Next.js + Sanity site**, tested on **`global.uniware.net`**. A significant amount of work is **complete in code locally** but **not yet pushed** to staging/production.

**Cutover:** Your cutover document described an **incremental** move of `uniware.net` to Vercel (rebuilt pages on Vercel, unbuilt pages via WordPress fallback). **Dhana has since confirmed a different approach** (discussed with you earlier): **do not change `uniware.net` DNS or production** until the **entire site** is developed and validated. All testing stays on **`global.uniware.net`** for now.

**We need from you:** Confirm which cutover approach is the official plan going forward.

---

## 2. What is done (in code — local, not all pushed)

### 2.1 Case study CMS (your request — additive, safe for published studies)

| Item | Status | Notes |
|------|--------|-------|
| Problem body — bullet list, numbered list, sub-heading | Done | Sub-heading: 24px Space Grotesk, `#010512` |
| Solution body — same rich formatting | Done | |
| Solution content-block text — same formatting | Done | |
| Problem body helper text updated | Done | Per your wording on bullet lists |
| Optional **Additional Section** (toggle, after Quote after Problem) | Done | Off by default; heading + rich body |
| Frontend rendering (`CaseStudyRichText`) | Done | Lists, sub-headings, bold |
| CSS for sub-heading and lists | Done | `case-study.page.css` |

**Published case studies:** Schema changes are additive only — existing published content continues to work unchanged.

---

### 2.2 Mux / Video assets (Studio)

| Item | Status | Notes |
|------|--------|-------|
| Video asset list shows **filename** (not "ready") | Done | `sanity.config.ts` |
| Unused dummy Mux asset removed | Done | Kept Schwing/homepage asset |
| Mux pipeline (upload → stream) | Done (earlier) | Already on staging/main |

**Studio deploy needed** for filename fix + case study schema to appear in hosted Studio (`uniware.sanity.studio`).

---

### 2.3 Website cutover infrastructure (your cutover plan + Dhana thread)

| Item | Status | Notes |
|------|--------|-------|
| ~50+ WordPress **301 redirects** | Done | `src/config/cutover-redirects.ts` |
| **WordPress fallback** for unbuilt URLs | Done | `next.config.ts` — needs `WORDPRESS_FALLBACK_ORIGIN` env var |
| **SentinelOne Cloud Security** redirect | Done | `/sentinel-one-cloud-security/` → `/solutions/cloud/security/` |
| **GA4** component | Done | Activates when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set |
| Go-live plan document for Dhana | Done | `Documentations/Uniware_net_Go_Live_Plan.docx` |
| Local testing guide | Done | `.env.local` + `localhost:5000` |

**Redirect examples already wired:**

- `/aws/` → `/solutions/cloud/aws/`
- `/aws-rds/` → `/solutions/cloud/aws/workloads/rds/`
- `/sentinel-one-cloud-security/` → `/solutions/cloud/security/`
- Cybersecurity consolidation URLs → `/solutions/cybersecurity/`
- (Full list in `src/config/cutover-redirects.ts`)

---

### 2.4 Already live on staging/main (from earlier work)

| Item | Status |
|------|--------|
| Homepage, cloud pages, AWS hub, RDS, GenAI | Live |
| Booking panel — 5 categories | Live |
| AI Solutions in nav + footer | Live |
| Customers CMS type | Live |
| Case study still image fix (Mux) | Live |
| Cybersecurity, DCI, contact, case studies | Live |

---

## 3. What is NOT done / pending

### 3.1 Development & deploy (our side)

| Item | Owner | Priority |
|------|-------|----------|
| **Push local changes to staging** | Srimathi | High — all Section 2.1–2.3 work is local only |
| **Test on global.uniware.net** after deploy | Srimathi | High — redirects, fallback, case study Studio |
| **Deploy Sanity Studio** (hosted) | Srimathi | Medium — schema + Mux filename visible to editors |
| **Local testing sign-off** | Srimathi | In progress — redirects + fallback on `localhost:5000` |
| Set **Vercel env vars** on staging | Srimathi | High — `WORDPRESS_FALLBACK_ORIGIN=https://uniware.net` |
| Set **GA4 measurement ID** in Vercel | Srimathi / you | Medium — when ID is available |
| **GA4 baseline** — export old WordPress traffic | Srimathi | Medium — before final cutover |

---

### 3.2 Case study / content (your requests)

| Item | Owner | Notes |
|------|-------|-------|
| **PDF export for AWS Partner Central** | Srimathi | Plan only — **not built**; awaiting your review when back from holiday |
| Set **video filename/title** on remaining Mux asset in Studio | Content / you | Optional polish |
| Test **Additional Section** on a draft case study | Srimathi / you | After Studio deploy |

---

### 3.3 Cutover / go-live (deferred per Dhana)

| Item | Owner | Notes |
|------|-------|-------|
| **DNS change** — `uniware.net` + `www` → Vercel | Dhana | **On hold** until full site ready + your sign-off |
| **AWS WordPress direct IP/hostname** | Dhana | Needed only **after** final DNS cutover (fallback origin) |
| **Final uniware.net cutover** | All | After entire site built + validated on global |

---

### 3.4 Minor open items

| Item | Notes |
|------|-------|
| `/aws-system-manager/` → RDS redirect | Implemented tentatively — confirm old page content is RDS-related |
| Homepage Mux playback ID | Still hardcoded in `HomePage.tsx` — could move to CMS later |
| SentinelOne redirect | Confirmed URL: `/sentinel-one-cloud-security/` |

---

## 4. What is blocking

### Blocker 1 — Decision: cutover approach (needs Niki)

| | Your cutover doc | Dhana’s latest direction |
|--|------------------|-------------------------|
| **When** | Incremental — point `uniware.net` to Vercel section by section | Deferred — only after **full site** complete |
| **Production** | Changes after testing | **No change** to `uniware.net` now |
| **Testing** | `global.uniware.net` | `global.uniware.net` only |

**Block:** Until you confirm which plan we follow, we **pause all DNS / go-live requests** to Dhana.

**Not blocked:** Development, push to staging, testing on global.

---

### Blocker 2 — Push to staging (internal)

All case study + cutover work is **local only** (not committed/pushed). Nothing reaches `global.uniware.net` until pushed and deployed.

**Block:** Global testing of new work.

**Action:** Push when you approve (or Srimathi pushes per your usual process).

---

### Blocker 3 — Sanity Studio deploy (for editors)

Case study schema changes and Mux filename fix require **hosted Studio redeploy** before editors see them at `uniware.sanity.studio`.

**Block:** Content team testing new case study fields in production Studio.

**Not blocked:** Local Studio at `localhost:5000/studio`.

---

### Blocker 4 — Final go-live (expected — not urgent)

| Dependency | Who | Status |
|------------|-----|--------|
| Full site built | Dev + Niki | In progress |
| Validation on global | Srimathi + Niki | Pending push |
| Niki sign-off | Niki | Not yet |
| DNS A + www CNAME | Dhana | **Explicitly deferred** |
| AWS direct IP for fallback | Dhana | Deferred until cutover |

---

### Not blocking

- Email / MX records — clarified with Dhana; website A record change does not affect email when MX is unchanged
- Redirect + fallback **code** — complete; works on global once deployed
- Published case studies — unaffected by schema changes

---

## 5. Cutover — how it works (when we do go live)

```
Visitor → uniware.net (after final cutover)
    │
    ├─ Rebuilt page exists?     → New Next.js page on Vercel
    ├─ Old URL, new path?       → 301 redirect
    └─ Not rebuilt yet?         → Proxy to old WordPress (AWS IP from Dhana)
```

**Current phase (per Dhana):**

```
Visitor → uniware.net           → Old WordPress (unchanged)
Visitor → global.uniware.net    → New Vercel site (testing)
```

---

## 6. How to test (global or local)

**Local:** Add to `.env.local`:

```env
WORDPRESS_FALLBACK_ORIGIN=https://uniware.net
```

Run `npm run dev` → `http://localhost:5000`

| Test | URL | Expected |
|------|-----|----------|
| Redirect | `/aws/` | → `/solutions/cloud/aws/` |
| New page | `/solutions/cybersecurity` | New design |
| Fallback | `/about-us/` | Old WordPress content |
| Studio | `/studio` | Additional Section + rich text fields |

---

## 7. Decisions needed from Niki

1. **Cutover approach:** Incremental (your doc) or deferred until full site (Dhana) — which is official?
2. **Push to staging:** Approve deploy of local case study + cutover work to `global.uniware.net`?
3. **PDF export:** Review proposed approach when back — print route + Save as PDF first?
4. **`/aws-system-manager/`:** Confirm redirect to RDS page is correct?

---

## 8. Recommended next steps (in order)

1. **Niki** — Confirm cutover approach (5 min reply is enough).
2. **Srimathi** — Push local changes to staging; set `WORDPRESS_FALLBACK_ORIGIN` on Vercel.
3. **Srimathi** — Test redirects + fallback on `global.uniware.net`.
4. **Srimathi** — Deploy Sanity Studio (hosted).
5. **Srimathi + Niki** — Validate case study CMS on a draft study.
6. **Later** — GA4 baseline, PDF build, final cutover with Dhana.

---

## 9. Files changed locally (not yet pushed)

| Area | Files |
|------|-------|
| Cutover | `next.config.ts`, `src/config/cutover-redirects.ts`, `.env.example` |
| Case study CMS | `sanity/schemas/index.ts`, `CaseStudyRichText.tsx`, `CaseStudyPage.tsx`, mappers, queries, CSS |
| Mux Studio | `sanity.config.ts` |
| Analytics | `GoogleAnalytics.tsx`, `(site)/layout.tsx` |
| Docs | `Documentations/Uniware_net_Go_Live_Plan.docx`, this file |

---

## 10. Short message you can send Niki

> Hi Niki,
>
> Status update attached. Summary:
>
> **Done (local, ready to push):** Case study rich text + Additional Section; cutover redirects + WordPress fallback; Mux filename in Studio; GA4 ready.
>
> **Blocking:** Need your call on cutover — your incremental plan vs Dhana’s “no production DNS until full site is ready.” We’re following Dhana’s approach for now and testing only on global.
>
> **Next:** Push to staging + test on global once you’re happy. PDF export still plan-only for your review when back.
>
> Srimathi

---

*Document version: 2 September 2026*
