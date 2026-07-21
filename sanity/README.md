# Uniware Sanity Studio

## Docs

| Doc | Purpose |
|-----|---------|
| [SANITY_CASE_STUDY_SCHEMA.md](./SANITY_CASE_STUDY_SCHEMA.md) | **← Schema documentation** — fields, dropdowns, reorder, website mapping |
| [../case-study-content-model-v3.md](../case-study-content-model-v3.md) | Product content model (source of truth for what editors should enter) |

## Why `npx sanity dev` failed before

`ProjectRootNotFoundError` means Sanity CLI could not find `sanity.cli.ts` /
`sanity.config.ts`. Those files are now in the repo root.

## Run Studio locally

```powershell
cd d:\Desktop\Projects\Uniware_website
npm install
npm run sanity:dev
```

Opens **http://localhost:3333** (login with your Sanity account).

You should see:
- **Technology**
- **Case Study**

Project: `ubaw4uif` · Dataset: `production`

## Deploy hosted Studio (optional)

```powershell
npm run sanity:deploy
```

Creates something like `https://uniware.sanity.studio` (hostname set in `sanity.cli.ts`).

## Website vs Studio

| Command | What it starts |
|---------|----------------|
| `npm run dev` | Next.js website (port 3000) |
| `npm run sanity:dev` | Sanity Studio (port 3333) |
| `node --env-file=.env.local scripts/test-sanity.mjs` | API connection test |
