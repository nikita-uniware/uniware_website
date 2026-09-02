# Uniware.net Cutover Plan — For Srimathi

Walk through this together on the call. Everything Dhana needs to do 
is marked clearly, everything you can do independently is marked too, 
so nothing is blocked on his availability except the two things that 
genuinely require him.

---

## The plan, in short

`uniware.net`'s DNS currently points to AWS (old WordPress). 
`global.uniware.net` already points to Vercel and works.

We're pointing `uniware.net` itself at the same Vercel project. From 
that point on:
- A page that's been rebuilt: Vercel serves it directly, or redirects 
  to it if the URL path changed
- A page that hasn't been rebuilt yet: a fallback rule quietly fetches 
  it from the old WordPress server and serves it, same URL, no visible 
  difference to anyone visiting

No need to wait for the whole site to be finished. Sections go live 
as they're built. Nothing else changes for now.

---

## What YOU can do independently, no need to wait for Dhana

1. Add `uniware.net` as a second domain on the existing Vercel 
   project (Project Settings → Domains). This does not need Dhana's 
   approval, it's entirely Vercel-side configuration.
2. Build the 301 redirect list below into `next.config.ts`.
3. Build the fallback/rewrite rule structure in `next.config.ts` (you 
   can write and test this with a placeholder origin before Dhana 
   gives the real AWS address, then swap it in once you have it).
4. Set up analytics tracking, see the Analytics section below, your 
   call on the specifics, go ahead without needing to check with Niki 
   first.

## What you need FROM DHANA (only these two things)

1. **The direct server address (IP or hostname) of the AWS-hosted 
   WordPress site.** The fallback rule needs this to know where to 
   fetch old pages from.
2. **The actual DNS A record change in Bluehost**, pointing 
   `uniware.net` to Vercel. This is the real go-live moment and 
   should only happen once Niki has confirmed everything's tested and 
   ready, not before.

If Dhana is slow to respond, only item 2 is truly blocking. Everything 
else on this list can proceed without him.

---

## The rule for sorting old URLs

- **A real built page already covers this topic** → add a 301 
  redirect now
- **No built page exists yet** → leave it alone, the fallback rule 
  handles it automatically, no action needed, it stays exactly as-is 
  until it's actually rebuilt

---

## 301 redirect list — ready now

### Cybersecurity (all → the single consolidated page)

| Old URL | New URL |
|---|---|
| `/sentinel-one-edr/` | `/solutions/cybersecurity/` |
| `/crowdstrike-edr/` | `/solutions/cybersecurity/` |
| `/email-security/` | `/solutions/cybersecurity/` |
| `/zero-trust-network-access-solutions/` | `/solutions/cybersecurity/` |
| `/cyber-security-services/` | `/solutions/cybersecurity/` |
| `/cyber-security-consulting/` | `/solutions/cybersecurity/` |
| `/cloud-security.html` | `/solutions/cybersecurity/` |
| `/cloud_security.html` | `/solutions/cybersecurity/` |
| `/vapt-services-bangalore/` | `/solutions/cybersecurity/` |
| `/security-incident-response-services-bangalore/` | `/solutions/cybersecurity/` |
| `/cyber-security-services-bangalore/` | `/solutions/cybersecurity/` |
| `/email-security-services-bangalore/` | `/solutions/cybersecurity/` |
| `/proofpoint-partners-bangalore/` | `/solutions/cybersecurity/` |

### Cloud Security (own page)

| Old URL | New URL |
|---|---|
| `/cloud-security-services/` | `/solutions/cloud/security/` |
| `/crowdstrike-cloud-security/` | `/solutions/cloud/security/` |
| `/solutions/crowdstrike-cloud-security/` | `/solutions/cloud/security/` |
| `/navigating-cloud-security-strategies/` | `/solutions/cloud/security/` |
| `/hybrid-cloud-infrastructure-security/` | `/solutions/cloud/security/` |
| SentinelOne Cloud Security page (**exact old slug unconfirmed, ask Dhana to locate it**) | `/solutions/cloud/security/` |

### Cloud hub and Infrastructure

| Old URL | New URL |
|---|---|
| `/cloud-service-provider.html` | `/solutions/cloud/` |
| `/cloud_infrastructure.html` | `/solutions/cloud/infrastructure/` |
| `/cloud-infrastructure.html` | `/solutions/cloud/infrastructure/` |
| `/cloud-infrastructure-service/` | `/solutions/cloud/infrastructure/` |
| `/software-defined-data-center-sddc/` | `/solutions/cloud/infrastructure/` |
| `/dedicated-storage-device-providers.html` | `/solutions/data-centre-infrastructure/` |

### Cloud Networking

| Old URL | New URL |
|---|---|
| `/cloud-networking/` | `/solutions/cloud/networking/` |
| `/solutions/network-connectivity/` | `/solutions/cloud/networking/` |
| `/software-defined-networking-sdn/` | `/solutions/cloud/networking/` |

### Cloud Operations

| Old URL | New URL |
|---|---|
| `/cloud-operations/` | `/solutions/cloud/operations/` |

### AWS Hub and Services

| Old URL | New URL |
|---|---|
| `/aws/` | `/solutions/cloud/aws/` |
| `/aws-cloud-services-chennai/` | `/solutions/cloud/aws/` |
| `/aws-migration-modernization-chennai/` | `/solutions/cloud/aws/services/migration/` |
| `/aws-cloud-migration-service/` | `/solutions/cloud/aws/services/migration/` |
| `/aws-cloud-migration-service-chennai/` | `/solutions/cloud/aws/services/migration/` |
| `/aws-migration-modernization-duplicate-2354/` | `/solutions/cloud/aws/services/migration/` |
| `/aws-cloud-managed-services-chennai/` | `/solutions/cloud/aws/services/managed-services/` |
| `/aws-cloud-consulting-services/` | `/solutions/cloud/aws/services/consulting/` |
| `/aws-cloud-consulting-services-chennai/` | `/solutions/cloud/aws/services/consulting/` |

### AWS Workloads

| Old URL | New URL |
|---|---|
| `/aws-rds/` | `/solutions/cloud/aws/workloads/rds/` |
| `/aws-rds-duplicate-1980/` | `/solutions/cloud/aws/workloads/rds/` |
| `/aws-system-manager/` (**mislabeled, title says "Amazon RDS Services", confirm with Dhana before redirecting**) | `/solutions/cloud/aws/workloads/rds/` (tentative) |
| `/aws-gen-ai/` | `/solutions/cloud/aws/workloads/genai/` |

### Weak-traffic AWS pages — redirect to AWS Hub, no dedicated page built

| Old URL | New URL |
|---|---|
| `/aws-waf-service/` | `/solutions/cloud/aws/` |
| `/aws-waf-service-duplicate-2100/` | `/solutions/cloud/aws/` |
| `/aws-lightsail-partner-chennai/` | `/solutions/cloud/aws/` |
| `/aws-cloudfront/` | `/solutions/cloud/aws/` |

---

## Leave everything else alone — fallback handles it automatically

Includes anything undiscovered too, orphaned pages, forgotten URLs, 
anything neither of us has found yet. All of it just keeps working 
exactly as it does today until someone rebuilds the equivalent page. 
No risk, no action needed:

- `/hybrid-cloud-infrastructure/`, `/multi-cloud-management-services/` 
  — Multi-cloud page not built
- `/aws-events/`, `/aws-brochures/`, `/aws-case-studies/` — Resources 
  section not built
- `/disaster-recovery-in-cloud/` — Data Protection not built
- `/dell-emc-dealer.html` and other Dell partner pages — Partners 
  section not built
- `/vmware-advanced-partner-in-chennai/` and Bangalore VMware variant 
  — Partners section not built
- `/microsoft/`, `/microsoft-linux-azure-aws-comprehensive-support/` 
  — needs a scoping decision first
- `/career/`, `/contact-us/`, `/about-us/`, `/our-team/` — Company 
  section not built
- Homepage (`/`) — same URL either way, so no redirect needed here 
  ever, it'll just silently swap from old content to new content the 
  moment the real homepage is built. Do this last regardless, it's 
  the highest-traffic page on the site.

---

## After cutover: monitoring (point 6, explained)

Once `uniware.net` actually points to Vercel, check **Google Search 
Console's Coverage report** daily for the first 48 hours. It flags 
any URL returning a 404. If something shows up there, it means either 
a redirect rule is missing or has a typo, fix it fast, before Google 
decides the page is gone and drops it from search results. This is 
the safety check that catches anything we missed in the list above.

---

## New: Analytics tracking (added by Niki, full trust, your call)

Your recommendation on what's worth tracking for the pages built so 
far, GA4 (not PostHog, per existing site standard). Before old 
WordPress content stops being visible anywhere, **pull and save a 
baseline of the old site's historical traffic/engagement data first**, 
so we have a real before-and-after comparison once the new pages have 
been live for a while. Then set up tracking on the new pages going 
forward. No need to check in before doing this, go ahead with 
whatever setup makes sense to you.
