# Sanity schemas for Uniware (content model v3)

These files define the Case Study and Technology documents for Sanity Studio.
They are **not wired** to the Next.js pages yet. Pages currently use hardcoded
content from `src/content/`.

## Seed technologies (set up before first real entry)

CrowdStrike, Fortinet, Veeam, Dell, AWS, Microsoft 365, Commvault, Nutanix,
VMware, Azure, Google Cloud — logos from each vendor's official brand kit.

## When wiring up

1. Create a Sanity project / Studio
2. Import `schemaTypes` from `./schemas`
3. Replace hardcoded case study data with `sanityClient.fetch` queries
4. Keep CTA and footer as global site components (not per-entry fields)
