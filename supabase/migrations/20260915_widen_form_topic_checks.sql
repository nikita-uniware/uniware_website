-- Widen lead-form topic/about checks so cloud/AWS/AI multi-select values can save.
-- Run in Supabase → SQL Editor on the production project.

-- Booking panel: topics are multi-select and stored as comma-separated text
-- (e.g. "cloud-infrastructure,cloud-networking"). The original check only
-- allowed cybersecurity / backup / enquiry, which made every non-cyber
-- "Book my call" submit fail and fall through to /contact.
alter table public.booking_requests
  drop constraint if exists booking_requests_topic_check;

-- Contact page: "What's this about" includes cloud / aws / dci / ai-solutions,
-- and may be comma-joined when multi-select is enabled. App validates values.
alter table public.contact_submissions
  drop constraint if exists contact_submissions_about_check;
