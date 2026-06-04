## ClickAdMedia Homepage Build Plan

A premium dark-mode, conversion-focused homepage matching the brief, with brand tokens, logo asset, and stub routes for the secondary CTAs.

### Design System (src/styles.css)
Replace default tokens with the ClickAdMedia palette (converted to oklch where needed, hex preserved as CSS vars):
- `--background` #050505, `--foreground` #FFFFFF
- `--primary` #0066FF, `--primary-foreground` #FFFFFF
- `--secondary` #C0C0C0, `--muted-foreground` #A6A6A6
- `--card` #0B0B0F, `--border` rgba(255,255,255,0.12)
- Custom: `--glow-blue`, `--glow-purple`, `--gradient-hero`, `--shadow-glow`
- Force dark class on `<html>` in `__root.tsx`
- Inter font via Google Fonts link in root head

### Assets
- Upload `Logo.jpeg` via `lovable-assets` → `src/assets/logo.asset.json` for navbar + footer
- OG meta uses logo URL

### Routes (src/routes/)
- `index.tsx` — full homepage (replaces placeholder)
- `website-examples.tsx` — "Coming soon" stub with nav + footer
- `free-audit.tsx` — standalone audit form page
- `strategy-call.tsx` — calendar booking placeholder + contact info
- `contact.tsx` — simple contact page
- Each route gets unique `head()` with title, description, og:title, og:description; canonical on leaves only

### Homepage Sections (componentized under `src/components/home/`)
1. **PremiumNavbar** — fixed glass nav, logo left, links (Examples, Audit, Contact), "Book Strategy Call" CTA right; mobile sheet menu
2. **Hero** — H1 "Websites That Turn Clicks Into Customers", subhead, two CTAs; right-side animated funnel mockup (Traffic→Leads→Calls→Jobs→Revenue) with count-up numbers using IntersectionObserver, pulsing arrows, blue glow background
3. **WhyWebsitesFail** — two-column split (❌ failures / ✅ ClickAdMedia difference) with glass cards
4. **RevenueFramework** — 4-step diagram (Traffic / Conversion Website / Lead Capture / Revenue) connected with glowing lines
5. **Packages** — 3 glass pricing cards (Essential $997, Growth $2,497 featured, Authority $4,997+) with feature lists
6. **BeforeAfter** — two comparison cards side-by-side
7. **Industries** — 8-item icon grid (Roofing, Electrical, HVAC, Plumbing, Landscaping, Dental, Medical, Professional)
8. **ConversionChecklist** — interactive 10-item checklist (click to toggle, keyboard accessible, aria-pressed)
9. **Founder** — Jason R. Szova card with quote, generated portrait placeholder
10. **AuditForm** — Zod-validated form (name, email, website), success state, stored to localStorage for now (no backend requested)
11. **FooterCTA + Footer** — final CTA band + footer with logo, links, copyright

### Motion & Accessibility
- Tailwind `motion-safe:` for fades/lifts; all animations wrapped to respect `prefers-reduced-motion`
- Count-up disabled under reduced motion
- Focus-visible rings using `--ring`, semantic `<main>`, `<section>` with aria-labelledby, alt text, form labels + error messages, aria-live on form success
- Tap targets ≥44px

### SEO
- Per-route `head()` with title/description/og tags
- JSON-LD Organization on root, Service schema on home
- Canonical on each leaf

### Technical
- Brand color tokens added once in `src/styles.css` — components consume `bg-primary`, `text-primary`, `bg-card`, `border-border`, etc. No hardcoded hex in components
- Generate one funnel illustration / abstract glow background via imagegen if needed for hero ambiance
- Founder photo: ask user to upload later; placeholder silhouette or initials avatar with note

### Out of Scope (this pass)
- Real booking integration (Calendly/Cal.com) — stub link
- Backend audit submissions (no Lovable Cloud requested) — client-side validation + success message only
- Real testimonials/case studies content
- CMS implementation (model documented in brief, not built yet)

Let me know if you want booking integration (Cal.com link?) or Lovable Cloud enabled to actually store audit form submissions — otherwise I'll ship form with client-side success state.