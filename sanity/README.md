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

## Shareable Studio link (for your team)

**Target URL:** **https://uniware.sanity.studio/** (note trailing slash)  
If you see 404 at the root, try **https://uniware.sanity.studio/studio** until the next deploy (basePath fix).

`localhost:3333` and `localhost:5000/studio` are **only on your machine** — not shareable.

### Deploy hosted Studio (shareable)

1. **Create a deploy token** (one-time)  
   https://www.sanity.io/manage/project/ubaw4uif/api → **Tokens** → **Add API token**  
   - Permissions: **Deploy Studio** (or Admin)  
   - Copy the token

2. **Add to `.env.local`** (never commit):
   ```
   SANITY_AUTH_TOKEN=your-deploy-token-here
   ```

3. **Deploy** (in PowerShell, from project folder):
   ```powershell
   npm run sanity:deploy:hosted
   ```
   If the CLI hangs with no output: reboot, close extra Node processes, retry in a fresh terminal.

4. **Share with your lead / editors**
   - Studio: **https://uniware.sanity.studio**
   - Invite: https://www.sanity.io/manage/project/ubaw4uif → **Project members** → add email as **Editor**

### Alternative: embedded `/studio` on your live website

After the site is on Vercel, you can share `https://your-domain.com/studio` — but document editing needs a **Next.js 16** upgrade first (Sanity v6 + Next 15 React mismatch). Use hosted `uniware.sanity.studio` until then.

## Deploy hosted Studio (optional)

**Option A — `*.sanity.studio` (Sanity-hosted)**

```powershell
# 1. Stop any stuck deploy (Ctrl+C), then log in once:
npx sanity login

# 2. Deploy (hostname `uniware` is already in sanity.cli.ts):
npm run sanity:deploy
```

Shareable URL: **https://uniware.sanity.studio**

If the command prints `sanity deploy` and then hangs with no output:

1. Close extra terminals running `sanity deploy` / `sanity dev`
2. In Task Manager, end stray **Node.js** processes (or reboot)
3. Retry in a **new** PowerShell window from the project folder
4. Use `npx sanity@latest deploy --verbose` if it still stalls

**Login loop at `/studio`?** Embedded Studio needs your dev URL in CORS with **Allow credentials** ON:

1. Open https://www.sanity.io/manage/project/ubaw4uif/api
2. **CORS origins** → **Add CORS origin**
3. Origin: `http://localhost:5000` (and `http://localhost:3000` if you use that port)
4. Enable **Allow credentials** → Save
5. Hard-refresh `/studio` (or clear site cookies for localhost)

Without credentials, Google login succeeds but the session cookie is stripped → infinite login screen.

Studio is available at **`/studio`** when the website is running:

```powershell
npm run dev
# → http://localhost:5000/studio
```

After you deploy the site to Vercel, share **`https://your-domain.com/studio`** with editors.  
Add your production URL under [API → CORS origins](https://www.sanity.io/manage/project/ubaw4uif/api) (**Allow credentials** must be ON).

Or run locally (uses `SANITY_API_WRITE_TOKEN` from `.env.local`):

```powershell
node --env-file=.env.local scripts/add-cors-origin.mjs http://localhost:5000
```

## Invite editors

https://www.sanity.io/manage/project/ubaw4uif → **Project members** → add email (Editor role).

## Website vs Studio

| Command | What it starts |
|---------|----------------|
| `npm run dev` | Next.js website (port **5000**) |
| `npm run sanity:dev` | Sanity Studio (port 3333) |
| `node --env-file=.env.local scripts/test-sanity.mjs` | API connection test |
