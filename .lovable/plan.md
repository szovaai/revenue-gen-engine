# Pivot to "Revenue Engine" Subscription Model

Rewrite copy + restructure pricing across the site. No business logic / no backend changes — purely content, CTAs, and a few component tweaks.

## Positioning shift

- From: project-based web design, $997 / $2497 starting prices, "Book Strategy Call"
- To: Revenue-as-a-Service for contractor trades (HVAC, Roofing, Plumbing, Landscaping), $0 setup, monthly subscription, "Apply for the Pilot Program"
- Core message: We build your revenue engine for $0 down. You only pay to scale.
- Hook: Most contractors run a "Digital Ghost Town." We turn the site into a 24/7 salesperson via website + GHL CRM automations + (optional) ad management.

## Global CTA + nav changes

- Replace every "Book Strategy Call" / "Book A Strategy Call" CTA with "Apply for the Pilot Program" linking to `/apply` (new route, replaces `/strategy-call` usage in nav and buttons).
- Keep `/strategy-call` route file as a redirect-style page that points users to `/apply` (avoids breaking sitemap / old links). Or repurpose its content — TBD in build.
- Update Navbar + Footer links accordingly.
- "Get a Free Audit" secondary CTA stays, but reframed as "Get a Free Digital Ghost Town Audit."

## Page-by-page changes

### Home (`src/routes/index.tsx` + `src/components/home/*`)

- `Hero`: New headline "We Build Your Revenue Engine For $0 Down." Subhead emphasizes contractors, monthly model, you only pay to scale. Primary CTA → Apply for the Pilot Program. Stats row reframed (e.g. "$0 Setup", "24/7 Sales", "Pilot Cities").
- `WhyWebsitesFail` → reframe around "Digital Ghost Town" concept.
- `Framework` → rewrite to the 3-Step Revenue Framework:
  1. Connect the Scraper (Traffic)
  2. The Site (Conversion)
  3. GHL (Automated Closing — SMS + email follow-up)
     Reduce from 4 steps to 3; update icons/labels.
- `Packages` → replace with two-tier pricing table:
  - Core Engine — $199/mo, $0 setup: lead-gen website, hosting, GHL CRM with auto SMS/email follow-up.
  - Growth Engine — $499/mo + ad spend: everything in Core plus managed ad traffic into the CRM.
    Highlight "$0 Setup Fee" badge and "Apply for Pilot Program" CTA on each tier.
- `Industries` → tighten to HVAC, Roofing, Plumbing, Landscaping (and adjacent trades).
- `Checklist` → reframe items as "what your Revenue Engine does for you."
- `Founder` → light edit to match partnership / pilot framing.
- `AuditForm` heading → "Free Digital Ghost Town Audit."
- `FooterCTA` → "Ready to plug in your Revenue Engine?" with Apply CTA.
- Add a new `FAQ` component answering: Why $0? (We win when you win.) What's the pilot? Do I own the site? What's GHL? What if I already have a site? Cancel anytime?
- Update home `head()` title + description + JSON-LD to reflect subscription positioning.

### Apply page (new `src/routes/apply.tsx`)

- Replaces "Strategy Call" as the primary conversion destination.
- Copy: "Apply for the Pilot Program" — limited cities, $0 setup, qualification-style form (name, business, trade, city, website, monthly lead goal).
- Reuses existing form patterns from `AuditForm` (zod + localStorage submission — no backend work).
- SEO head() set appropriately.

### Strategy Call (`src/routes/strategy-call.tsx`)

- Repoint content to the Pilot Program (or render a short "Now called the Pilot Program" panel with a link to `/apply`). Keeps URL alive for any external links / sitemap entry.

### Free Audit (`src/routes/free-audit.tsx`)

- Rename hero to "Free Digital Ghost Town Audit." Update head() title/description accordingly.

### Website Examples (`src/routes/website-examples.tsx`)

- Light copy tweak only: intro paragraph and bottom CTA reflect "Revenue Engine" framing and Apply CTA. Existing 4 examples untouched.

### Contact (`src/routes/contact.tsx`)

- Update intro + CTA to mention Pilot Program; no structural changes.

### Sitemap (`src/routes/sitemap[.]xml.ts`)

- Add `/apply`. Keep `/strategy-call`.

## Files touched

- New: `src/routes/apply.tsx`, `src/components/home/Pricing.tsx` (replaces `Packages` usage on home), `src/components/home/FAQ.tsx`
- Edited: `src/components/home/Hero.tsx`, `WhyWebsitesFail.tsx`, `Framework.tsx`, `Industries.tsx`, `Checklist.tsx`, `Founder.tsx`, `AuditForm.tsx`, `FooterCTA.tsx`, `Navbar.tsx`, `Footer.tsx`, `src/routes/index.tsx`, `src/routes/strategy-call.tsx`, `src/routes/free-audit.tsx`, `src/routes/website-examples.tsx`, `src/routes/contact.tsx`, `src/routes/sitemap[.]xml.ts`
- `Packages.tsx` either deleted or kept unused (will delete to avoid dead code).

## Out of scope (not in this plan)

- No GoHighLevel integration, no real form submission backend, no Stripe/Paddle billing wiring. Forms stay client-only like the current `AuditForm`.
- No new images / screenshots.
- No analytics or A/B testing setup.

## Open question

Per the user's closing question: do you already have a GoHighLevel account with a Lead Notification + SMS Follow-up automation, or should that be a follow-up task after the copy pivot ships? I'll proceed with copy-only changes now and we can scope the GHL snapshot work separately.
