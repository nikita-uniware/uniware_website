# Uniware Website

Next.js 15 rebuild of [uniware.net](https://uniware.net), based on Design System v1 and approved reference HTML.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Space Grotesk + DM Sans via `next/font`
- Phosphor Icons
- Sanity schemas in-repo (not wired yet)

## Run locally

```bash
npm install
npm run dev
```

- Home: http://localhost:3000
- Cybersecurity: http://localhost:3000/cybersecurity
- Case study: http://localhost:3000/case-studies/manufacturing-ransomware-recovery

## Project map

| Path | Purpose |
|---|---|
| `src/app/` | Routes + layout |
| `src/components/` | Shared UI (nav, footer, Button, CircleGroup) |
| `src/hooks/useReveal.ts` | Position-based scroll reveal (hero on load; footer never) |
| `src/styles/*.page.css` | Page CSS ported from reference HTML |
| `src/content/` | Hardcoded page content + cyber markup |
| `sanity/schemas/` | Case study + technology schemas (content model v3) |
| `public/brand/` | Uniware logos |
| `public/partners/` | Partner logos extracted from the cyber page |

## Design rules (locked)

See `Uniware_Website_Design_System_v1_3.md`. Case study hero/stat type scales intentionally differ from the main site (Appendix E).

## Next

- Wire Sanity fetch to replace hardcoded case study data
- Final footer concept from Niki
- Remaining solution pages
