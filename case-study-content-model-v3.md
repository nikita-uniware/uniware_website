# Case Study Content Model — v3

For Nikita and Srimathi. This document defines the data structure for the Sanity schema. Use it alongside the reference HTML file, that file shows exactly how each field renders on the page, this document says what each field is, what type it is, and what's required.

**Field type legend:**

| Type | What it means |
|---|---|
| Short text | Single line, plain text, no formatting |
| Rich text | Multi-line, bold only |
| Select | Dropdown, fixed list |
| Reference | Pick from existing entries in another content type |
| Toggle | On/off switch |
| Array | Repeatable group |
| Image | Upload |

**On character limits**: only Heading and Description/Body fields have a max character count below. Fields like Location, Timeline, or Name aren't prose, there's no meaningful "too long" for a country name or a person's title, so no limit is set on those.

**On help text asking to add something new**: wherever a field has a closed list (categories, for example) and someone filling in a case study can't find the option they need, the help text always says the same thing: **"Ask Nikita to add it."** Nobody else adds new options to a closed list.

---

## 1. Header / Hero

| Field | Type | Required | Max chars | Help text |
|---|---|---|---|---|
| Category tags | Array of Select | Yes, min 1, max 3 | — | "Choose up to 3. Can't see the right one? Ask Nikita to add it, don't force-fit an existing tag." |
| Headline | Short text | Yes | 100 | "One sentence, the outcome of the story. e.g. 'Ransomware recovery for a five-division manufacturing business, in 72 hours.'" |
| Subtext | Rich text (bold only) | Yes | 220 | "1–2 sentences. This is the anonymized description of the client, confirmed with them, never their real name." |

### Category tags — the actual list

This is a closed list, matching the six Solutions categories already confirmed in the site's navigation, so a case study filed under "Cybersecurity" lines up with the Cybersecurity solutions page a visitor might land on:

- Cloud
- Cybersecurity
- Modern Workplace
- Data Protection
- AI & Automation
- Infrastructure

Srimathi can set this up as the full list now. Nobody else adds to it without asking Nikita first.

---

## 2. Stats

| Field | Type | Required | Notes |
|---|---|---|---|
| Stats | Array of {Number, Label} | **Yes, min 3, max 4** | Number = short text (e.g. "72 Hrs", "5", "Zero"), not a numeric field, since some values are words. Label = short text, one line, no full stop. |

> **Build note for Srimathi**: the number of grid columns in the stats strip must be set by however many stats exist in the array, not hardcoded to 4. Three stats render in a 3-column grid, four in a 4-column grid. A 3-stat entry rendered into a fixed 4-column grid leaves a visibly empty cell and looks like a mistake, not a choice.

---

## 3. Client Overview (sidebar)

One heading and one description, not two separate fields.

| Field | Type | Required | Max chars | Help text |
|---|---|---|---|---|
| Heading | Short text | Yes | 40 | "Short label for the client, e.g. 'Chemical Manufacturing.' This is a category, not a sentence." |
| Description | Rich text (bold only) | Yes | 200 | "1 sentence describing who they are, can repeat the hero subtext if that already says it well." |
| Location | Short text | Country required, city optional | — | "Country is required. Add a city if you have one: 'Chennai, India.' Just the country is fine if a city isn't relevant to the story." |
| Timeline | Short text | Optional | — | "How long this took, if that's a meaningful number for this project. Examples: '72 hours, emergency response' / '3 days, full deployment' / '6 months, phased rollout.' Leave blank if there isn't a clean timeframe, for example an ongoing retainer with no single delivery moment." |
| Delivered by | Short text | Yes | — | Pre-filled default: **"Uniware Systems."** Only change this for a genuinely co-delivered project. |
| Technologies used | See section 5 | Yes, min 1 | — | Same list and same setup as the Solution section below, just shown as a shorter bulleted list here instead of the fuller version. |

**On Location — country required, city optional**: this is deliberately asymmetric. Country always matters (it tells a reader where in the world this happened), a specific city sometimes doesn't add anything the story needs. Making city optional avoids forcing someone to guess or invent a location detail just to fill a required field.

**On Timeline being optional, not required**: "Duration" only cleanly fits a story with a clear start and end, an incident response, a migration with a go-live date. A managed-services retainer might not have a single timeframe worth naming. Optional means nobody's stuck inventing a number that doesn't really describe their project.

---

## 4. Problem

| Field | Type | Required | Max chars | Help text |
|---|---|---|---|---|
| Heading | Short text | Yes | 100 | "Full sentence. Should make someone want to read the paragraph under it, not just label the section." |
| Body | Rich text (bold only) | Yes, 1–3 paragraphs | 500 per paragraph | "Bold the one detail per paragraph that matters most, don't bold more than one phrase per paragraph or nothing stands out." |

---

## 5. Solution

| Field | Type | Required | Max chars | Help text |
|---|---|---|---|---|
| Heading | Short text | Yes | 100 | Same guidance as Problem heading |
| Body | Rich text (bold only) | Yes | 500 | Intro paragraph, before the steps |
| **Show steps** | Toggle | — | — | Default **ON**. Turn off only if this project genuinely has no distinct stages to walk through. |
| Steps | Array of {Title, Body} | Required if steps are on | Title: 30 / Body: 300 | "Every step has just two parts: a Title, one or two words like a label ('Identify', 'Migrate'), and a Body, one or two sentences on what actually happened at that stage. That's it, no other fields per step." |
| **Show technologies used** | Toggle | — | — | Default **ON**. Turn off for a case study where naming specific products isn't relevant or hasn't been cleared. |
| Technologies used | Array, see below | Required if toggle is on, min 1 | — | See explanation below |

### Technologies used — how this actually works

Two simple steps for whoever is filling this in:

1. **Select the Technology** from the list (a dropdown of every product Uniware works with, see the full list below).
2. **Add the Type**, only if it's needed. This is a short text field. If the logo alone already says enough, leave it blank. If it needs a word to clarify which product or use, add it, "Falcon EDR" for CrowdStrike, "Firewall" for Fortinet, "Backup" for Veeam.

That's the whole thing, one dropdown and one optional text field per technology added. This is stored once as a reference list so the same product always shows the same logo everywhere it's used, rather than every case study author choosing or uploading their own icon.

**The reference list to set up in Sanity now** (name + logo, one entry each):

- CrowdStrike
- Fortinet
- Veeam
- Dell (Dell Technologies)
- AWS
- Microsoft 365
- Commvault
- Nutanix
- VMware
- Azure
- Google Cloud

This covers everything Uniware currently works with. New products get added to this one list going forward, by Nikita or Srimathi, not invented per case study.

**Sourcing the logos**: pull these directly from each partner's official brand or media kit page, not redrawn or approximated. Each vendor has its own logo usage rules, the same principle as Uniware's own brand guidelines.

**On the sidebar's technology chips**: same reference list as here, but styled as a plain bulleted line in the sidebar, bold product name, then a dash, then the type if there is one, e.g. "**CrowdStrike** - Falcon EDR." No boxes or divider lines there, this keeps that narrow column from feeling busy with borders.

---

## 6. Before & After

| Field | Type | Required | Max chars | Help text |
|---|---|---|---|---|
| Heading | Short text | Yes | 100 | Same full-sentence guidance |
| Rows | Array of {Metric, Before, After} | Yes, min 2 | — | "Metric is the category being compared (e.g. 'Firewall'). Keep Before and After to a phrase each, this is a scanning table, not sentences." |

---

## 7. Results

| Field | Type | Required | Max chars | Help text |
|---|---|---|---|---|
| Heading | Short text | Yes | 100 | Same guidance |
| Outcomes | Array of short text | Yes, min 2 | 100 each | "One outcome per line, start with the result, not the process. 'Zero repeat incidents' rather than 'We ensured there were zero repeat incidents.'" |

---

## 8. Note (client quote or team comment)

| Field | Type | Required | Max chars | Help text |
|---|---|---|---|---|
| **Show this section** | Toggle | — | — | Default **off**. Only switch on if you actually have a quote or comment, don't write one to fill space. |
| Source | Select: "A note from our client" / "A note from our team" | Required if on | — | "Choose which this is, it changes the heading automatically." |
| Quote text | Rich text (bold only) | Required if on | 300 | "Keep it to 2–3 sentences. This should sound like something a person actually said, not a marketing line." |
| Name | Short text | Required if on | — | |
| Designation | Short text | Required if on | — | e.g. "Chief Technology Officer" |
| Company | Short text | Required if on | — | e.g. "Uniware Systems," or the client's company only if they've approved being named |

Both types are allowed, one toggle turns the whole section on or off, one Select chooses which of the two it is. Designation and Company stay as two separate fields so the template controls the formatting consistently.

---

## 9. What's Next

| Field | Type | Required | Max chars | Help text |
|---|---|---|---|---|
| Description | Short text | No | 200 | "One or two sentences on what happens after this case study ends, if anything. Leave blank if there's no next phase, the section just won't show." |

---

## 10. CTA

Locked, global, not a per-entry field. Same on every case study page.

---

## 11. Footer

Also locked and global, not a per-entry field, same footer on every page of the site. One thing worth knowing for the build: the footer never uses the fade-in scroll effect that the rest of the page uses, it renders immediately and stays visible the whole time. That's a site-wide rule, not specific to case studies, it's already noted directly in the reference HTML's CSS comments above the footer styles.

---

## 12. SEO / Metadata

These live in the same Sanity document as everything above, in their own separate section so they're visually distinct from the page content (Sanity supports this as its own tab or fieldset). Worth a short intro note at the top of this section in Sanity itself: *"These fields control how this page appears in search results and when shared, they are separate from the page content above and won't be seen by someone reading the case study directly."*

| Field | Type | Required | Max chars | Help text |
|---|---|---|---|---|
| SEO title | Short text | Yes | 60 | See below |
| Meta description | Short text | Yes | 155 | See below |
| URL slug | Short text, auto-generated from Headline, editable | Yes | — | "Usually fine as-is. Only edit if the auto-generated version is awkward or too long." |
| Social share image | Image | No | — | "What shows up when this page is shared on LinkedIn or WhatsApp. If left blank, a default Uniware image is used instead." |

### How to actually write the SEO title and meta description

Most people filling this in won't know SEO writing conventions, and guessing usually produces something either too generic or too long. Here's the practical way to do it, written as help text directly in Sanity under each field:

**SEO title help text:**
> "This is what shows in Google search results and the browser tab, not on the page itself. If you're not sure how to write one, open any AI chat tool you have access to and paste this, filling in the brackets:
>
> *'Write an SEO title for a case study page, under 60 characters. The case study is about: [one sentence describing what happened, e.g. "a 72-hour ransomware recovery for a manufacturing company"]. Make it clear and factual, not clickbait, and put the most important word near the front.'*
>
> Paste the result in here."

**Meta description help text:**
> "This is the 1–2 sentence preview that shows under the title in Google. If you're not sure how to write one, open any AI chat tool and paste this, filling in the brackets:
>
> *'Write a meta description for a case study page, under 155 characters. The case study is about: [same one-sentence summary as above]. It should read naturally, include the key result, and make someone want to click.'*
>
> Paste the result in here, then just check it reads naturally before saving."

---

## What's confirmed, ready to build

- Category tags: closed list, the six Solutions categories above, ready to set up now
- Stats: min 3, max 4, dynamic grid columns
- Client Overview: merged Heading + Description
- Location: country required, city optional
- Timeline: renamed, optional
- Delivered by: pre-filled "Uniware Systems"
- Steps: Title + Body only, toggle to show/hide
- Technologies used: reference list (11 products listed above) + optional Type field, toggle to show/hide, same list used in both the sidebar and Solution section, styled differently in each place
- Note section: toggle + Select (client / team), Designation and Company as separate fields
- SEO fields: confirmed part of the same document, with AI-prompt-based help text so a non-technical person can actually produce a good title and description
- Footer: confirmed global, no fade-in, already reflected in the reference HTML

**Nothing left open.** Next step is Srimathi setting up the Technology reference list with the 11 products above (logos sourced from each vendor's official kit) before the first real case study entry goes in.
