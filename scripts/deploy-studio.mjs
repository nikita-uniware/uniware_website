/**
 * Deploy hosted Sanity Studio → https://uniware.sanity.studio
 *
 * If this hangs on Windows (no output after "Deploying..."), use GitHub Actions instead:
 *   .github/workflows/deploy-sanity-studio.yml
 *
 * Requires SANITY_AUTH_TOKEN in .env.local (Deploy Studio permission).
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const token =
  process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error(
    "Missing SANITY_AUTH_TOKEN in .env.local\n" +
      "Create a deploy token at https://www.sanity.io/manage/project/ubaw4uif/api"
  );
  process.exit(1);
}

const localSanity =
  process.platform === "win32"
    ? path.join(root, "node_modules", ".bin", "sanity.cmd")
    : path.join(root, "node_modules", ".bin", "sanity");

const useLocal = existsSync(localSanity);
const command = useLocal ? localSanity : "npx";
const args = useLocal
  ? ["deploy", "--yes", "--verbose"]
  : ["sanity@latest", "deploy", "--yes", "--verbose"];

console.log("Deploying Studio to https://uniware.sanity.studio ...");
console.log(
  useLocal
    ? "Using local sanity CLI.\n"
    : "Using npx sanity@latest (first run may download).\n"
);
console.log(
  "If nothing prints for 60+ seconds, press Ctrl+C — the CLI is hung on this machine."
);
console.log("Use GitHub Actions instead: push code, add SANITY_AUTH_TOKEN secret, run workflow.\n");

const child = spawn(command, args, {
  stdio: "inherit",
  cwd: root,
  env: {
    ...process.env,
    SANITY_AUTH_TOKEN: token,
    SANITY_TELEMETRY_DISABLED: "1",
    CI: "true",
  },
  shell: process.platform === "win32",
});

const hangTimer = setTimeout(() => {
  console.error(
    "\n⚠ Still no output after 90s — Sanity CLI is likely hung (known Windows issue)."
  );
  console.error("Stop with Ctrl+C, then deploy via GitHub Actions:");
  console.error("  1. Push this repo to GitHub");
  console.error("  2. Settings → Secrets → SANITY_AUTH_TOKEN");
  console.error("  3. Actions → Deploy Sanity Studio → Run workflow\n");
}, 90_000);

child.on("exit", (code) => {
  clearTimeout(hangTimer);
  if (code === 0) {
    console.log("\n✓ Studio live at: https://uniware.sanity.studio");
    console.log(
      "Invite editors: https://www.sanity.io/manage/project/ubaw4uif → Project members"
    );
  }
  process.exit(code ?? 1);
});
