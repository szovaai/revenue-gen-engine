# ClickAdMedia Waitlist Landing — Full Homepage Replace

Replace the current `src/routes/index.tsx` with a single-page, dark "Coming Soon" experience that captures waitlist signups into Lovable Cloud (Supabase).

## Scope

- **Replace** `/` (home) with the new waitlist page. Existing routes (`/blog`, `/contact`, `/apply`, etc.) stay intact but are unlinked from the new page (nav is intentionally minimal — logo + status badge only, per brief).
- New page is a single route, all sections stacked.

## Database (Lovable Cloud)

New `public.waitlist` table:

- `id uuid pk default gen_random_uuid()`
- `first_name text not null`
- `email text not null unique`
- `business_type text not null`
- `created_at timestamptz default now()`

RLS: enabled. One policy — `anon` + `authenticated` may `INSERT` only. No `SELECT` policy (admin reads via service role later if needed). GRANTs: `INSERT` to `anon, authenticated`; `ALL` to `service_role`.

## Files

- **New** `src/routes/index.tsx` — full waitlist page (replaces current home).
- **New** `src/components/waitlist/WaitlistForm.tsx` — form with loading/success/error states, submits via `supabase.from('waitlist').insert(...)` using the browser client at `@/integrations/supabase/client`.
- **New** `src/components/waitlist/*` — small presentational pieces: `TopBar`, `Hero`, `HowItWorks`, `WhoItsFor`, `SecondCTA`, `Footer`.
- **Edit** `src/routes/__root.tsx` — add Google Fonts `<link>` tags (Space Grotesk, Inter, Space Mono) in `head().links`, and update root `meta` (title, description, OG) to the ClickAdMedia waitlist copy.
- **Edit** `src/styles.css` — add brand color tokens under `@theme` (`--color-ink:#080A12`, `--color-surface:#0F1320`, `--color-border:#1E2438`, `--color-brand:#00B4FF`, `--color-brand-2:#8B00FF`, `--color-success:#00E5A0`, `--color-muted:#8A94B0`) and font tokens (`--font-display`, `--font-sans`, `--font-mono`). Add `@keyframes` for the pulsing dot and a `.bg-gradient-brand` / `.text-gradient-brand` utility via `@utility`.

No new dependencies — Supabase client is already wired in the project.

## Page sections (per brief, exact copy)

1. **Top bar** (sticky, 64px) — "ClickAdMedia" wordmark ("Media" in gradient) + `[ REPOSITIONING IN PROGRESS ]` pill with pulsing dot.
2. **Hero** (min-h-screen, centered) — COMING SOON pill → H1 "Marketing isn't guesswork anymore. It's genetic." ("genetic." in gradient) → subheadline → **WaitlistForm card** → social proof line with 4 gradient avatars.
3. **Ambient background** — three blurred CSS radial gradients (blue TL, purple BR, faint teal center), 15–20% opacity, no JS.
4. **How It Works** — eyebrow + H2 "Your marketing has a DNA…" + 3 feature cards (Decode / Replicate / Evolve) with inline SVG icons.
5. **Who It's For** — 2-col: left text, right checklist with green `#00E5A0` checks.
6. **Second CTA** — gradient top border, headline ("Early advantage." in gradient), body, button anchors back to `#waitlist`.
7. **Footer** — minimal, two-column with copyright + Privacy/Contact links (link to existing `/contact`; Privacy is `#` for now).

## Form behavior

- Fields: First Name (text), Email (email), Business Type (select with the 7 brief options).
- Client-side validation via zod (length caps, valid email).
- Submit → insert into `waitlist`. On unique-violation (`23505`), show friendly "You're already on the list." success variant.
- States: idle → loading ("Securing your spot…" + spinner) → success (checkmark + personalized message) / error (inline red text).
- Form container: `bg-surface`, gradient glow shadow, focus rings in `--color-brand`.

## Motion & a11y

- Stagger-in for hero (badge → H1 → sub → form), implemented with CSS `animation-delay` only — no JS lib.
- Scroll-reveal for cards via a tiny `IntersectionObserver` hook (`useInView`) toggling an `is-visible` class.
- Wrap all keyframes in `@media (prefers-reduced-motion: no-preference)` so reduced-motion users get static layout.
- All inputs labeled (visually hidden labels); button has aria-busy during submit; pulsing dot is decorative (`aria-hidden`).

## SEO (root + index head)

- Title: `ClickAdMedia — AI Genetic Marketing for Small Businesses (Coming Soon)`
- Description: brief sub-positioning sentence.
- `og:title`, `og:description`, `og:type=website`, `og:url=https://clickadmedia.co/`.
- Canonical: `https://clickadmedia.co/`.
- JSON-LD Organization on root.

## Technical notes

- TanStack Start route — keep existing `createFileRoute("/")` shape. No loader needed; form does its own client mutation.
- Browser-only `supabase` import is fine here (form submits on user click).
- No edge function required — direct insert under RLS.

## Out of scope (this turn)

- Admin view of signups (read happens via DB later).
- Email confirmation / double opt-in.
- Editing other routes' designs.
- Removing or redirecting existing routes.
