# Cloud / AWS Section — Build Spec for Srimathi

Niki will design and write these pages herself in Claude Code on staging. This doc covers what needs to exist as scaffolding before she starts: page routes, nav changes, footer change, mobile nav, and the favicon.

---

## 1. Pages to scaffold

Empty route files with the shared layout (SiteNav + SiteFooter) are enough to start. No content needed, Niki's building that herself.

Listed in the order they should appear in the nav, so build order and nav order match:

| Route | Notes |
|---|---|
| `/solutions/cloud/infrastructure/` | |
| `/solutions/cloud/networking/` | |
| `/solutions/cloud/operations/` | |
| `/solutions/cloud/security/` | **Placeholder only, not being built in this batch.** Reserving the route and its position in the order now so nothing has to be reshuffled later. |
| `/solutions/cloud/aws/` | AWS hub. Simple page, no subnav, just three cards linking out to the pages below. |
| `/solutions/cloud/aws/services/migration/` | |
| `/solutions/cloud/aws/services/consulting/` | |
| `/solutions/cloud/aws/services/managed-services/` | |

**Not in this batch, revisit later:** a general `/solutions/cloud/` hub page (not needed, Cloud is handled entirely as a nav flyout, see section 3) and the smaller one-off AWS product pages (WAF, RDS, CloudFront, System Manager, Lightsail, HPC). No routes needed for either yet.

Not building right now, no action needed: AWS Brochures, AWS Events (both were empty shells on the old site, nothing to migrate).

## 2. Redirects — documented for later, NOT to be actioned yet

This list is for reference only. Do not set these up now. We'll come back to this once the pages themselves are live.

| Old URL | New URL |
|---|---|
| `/cloud-infrastructure-service/` | `/solutions/cloud/infrastructure/` |
| `/cloud-networking/` | `/solutions/cloud/networking/` |
| `/cloud-operations/` | `/solutions/cloud/operations/` |
| `/cloud-security-services/` | `/solutions/cloud/security/` |
| `/aws/`, `/aws-cloud-services-chennai/` | `/solutions/cloud/aws/` |
| `/aws-migration-modernization/`, `/aws-migration-modernization-chennai/`, `/aws-cloud-migration-service/`, `/aws-cloud-migration-service-chennai/`, `/aws-migration-modernization-duplicate-2354/` | `/solutions/cloud/aws/services/migration/` |
| `/aws-cloud-consulting-services/`, `/aws-cloud-consulting-services-chennai/` | `/solutions/cloud/aws/services/consulting/` |
| `/aws-cloud-managed-services/`, `/aws-cloud-managed-services-chennai/` | `/solutions/cloud/aws/services/managed-services/` |

WAF, RDS, and other one-off AWS product URLs aren't in this list yet since those pages aren't being rebuilt in this batch. Add them when that work actually happens.

## 3. Top navigation (desktop)

Solutions dropdown gets one more item:

- **Cybersecurity** → `/solutions/cybersecurity` (direct link)
- **Cloud** → *(new, menu trigger only, no page behind it)*
- **Data Centre Infrastructure** → `/solutions/data-centre-infrastructure` (direct link)

**Cloud works differently from the other two.** It's not a link, it's a trigger, exactly like "Solutions" itself already works in the current nav (a button, not a link). Hovering or clicking "Cloud" opens a second flyout to the right, showing, in this order:

- Infrastructure → `/solutions/cloud/infrastructure/`
- Networking → `/solutions/cloud/networking/`
- Operations → `/solutions/cloud/operations/`
- AWS → `/solutions/cloud/aws/`

(Security isn't in the live flyout yet since its page doesn't exist. When it's built, it slots in fourth, between Operations and AWS, matching the route order above.)

These are direct links straight to each page, no hub page in between, and this is intentionally the only place in the whole nav that opens a second level. AWS's own three pages (Migration, Consulting, Managed Services) are **not** shown in this flyout, they're one level deeper still and only reachable from the three cards on the AWS page itself.

**Heads up:** this second-level flyout doesn't exist anywhere in the current nav component, it currently only supports one dropdown level. Treat this as new interaction work, not a tweak.

## 4. Mobile navigation

No mobile nav pattern exists yet either, also new work, flag both of these when you brief Srimathi so neither lands as an unplanned surprise.

**Trigger:** hamburger icon, positioned to the right of the "Get in Touch" button in the mobile header bar.

**Panel:** tapping the icon opens a full-screen (or off-canvas) panel containing everything, including Get in Touch as a button at the bottom of the panel, not just in the header.

**Layout inside the panel**, top to bottom:

- **Solutions** (heading, shown open by default, not collapsed)
  - Cybersecurity (flat link)
  - **Cloud** (this row expands/collapses, tapping it reveals Infrastructure, Networking, Operations, AWS beneath it, same order as the desktop flyout)
  - Data Centre Infrastructure (flat link)
- **Resources** (heading; today this only has Case Studies, but the heading should exist now so adding Blog later doesn't require restructuring)
  - Case studies
  - *(Blog goes here once it exists)*
- Contact
- **Get in Touch** (button, bottom of panel)

Cloud is the only row in this whole panel that expands. Everything else is a flat, already-visible link.

## 5. Footer

Keep the current footer as-is, single row, minimal, no columns. Updated link list:

`Cybersecurity | Data Centre Infrastructure | Case studies | Contact | LinkedIn`

Cloud is **not** in the footer for now since there's no page for it to point to. Add it back if a Cloud hub page ever gets built later.

**One fix needed:** when the footer links wrap to multiple rows on mobile, they currently sit too close together vertically, easy to mis-tap. Please add more vertical gap between wrapped rows so each link has a comfortable thumb target.

## 6. Favicon

Niki will send the **Uniware yin-yang mark** (the icon-only symbol, not the full wordmark logo) as both an **SVG** and a **PNG**.

Please generate the full favicon set from that: favicon.ico, apple-touch-icon (180×180), Android/Chrome icons (192×192, 512×512), and the site.webmanifest. Niki's handing over the source mark, not each individual size.

## 7. Standing reminders

- Push to **staging only**, never main directly.
- Message Niki before starting a session, to avoid file conflicts.
- New nav/mobile components should pull from existing tokens in `globals.css`, no hardcoded values, same as the rest of the site.

---

Once routes, nav, footer, and mobile shell are in place on staging, Niki will build out each page's design and content directly in Claude Code, page by page, starting with `/solutions/cloud/infrastructure/`.
