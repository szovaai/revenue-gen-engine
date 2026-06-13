---
name: website-builder-workflow
description: >-
  End-to-end workflow for building premium, cinematic client websites in this
  TanStack Start + Tailwind v4 codebase. Use when starting a new client site or
  page, re-theming for a brand, composing a landing page from sections, or making
  a build responsive. Runs three phases — Branding (design tokens, color,
  typography), Layout (routes, sections, page composition), and Mobile
  (responsive, touch, nav, QA) — matching the repo's dark glassmorphic system.
  Pairs with the r3f-scene-generator skill for 3D hero accents.
---

# Website Builder Workflow

A repeatable workflow for shipping **ultra-premium, cinematic** client websites in
this codebase (React 19 + TanStack Start + Vite + Tailwind v4 + shadcn/ui). It
encodes the firm's house style and the conventions already proven in
`src/components/home/*`, so every build feels bespoke and consistent.

Run the phases in order. Each has a dedicated reference; load it when you reach
that phase to keep context lean.

| Phase           | Goal                                           | Reference                |
| --------------- | ---------------------------------------------- | ------------------------ |
| 1. **Branding** | Lock the design language (tokens, color, type) | `references/branding.md` |
| 2. **Layout**   | Compose routes + sections into pages           | `references/layout.md`   |
| 3. **Mobile**   | Make it flawless on phones; QA                 | `references/mobile.md`   |

## Phase 1 — Branding

1. Gather the client's brand: primary/accent colors, logo, font, mood
   (luxury / SaaS / lifestyle / bold). If unknown, default to the house dark
   cinematic system already in `src/styles.css`.
2. Set design tokens in **`src/styles.css`** `:root` — `--primary`, `--accent`,
   `--background`, `--foreground`, `--glow-*`, `--gradient-hero`. Do NOT hard-code
   hex values in components; always reference the tokens (`bg-primary`,
   `text-foreground`, `var(--glow-blue)`).
3. Typography via `--font-sans` / `--font-display`. Keep the existing premium
   utilities: `glass-card`, `glow-blue`, `text-gradient-brand`.
4. The global `prefers-reduced-motion` reset is already in `styles.css` — keep it.

→ details, color guidance, and a client-intake checklist in `references/branding.md`.

## Phase 2 — Layout

1. **Pages are file-based routes** in `src/routes/` (see `src/routes/README.md` —
   never create `src/pages/` or `app/`). Each route exports a `Route` via
   `createFileRoute` with `head` meta (title, description, og, canonical) and a
   component wrapped in `<PageShell>`. Start from `assets/route.tsx.template`.
2. **Pages are composed of section components** under `src/components/<feature>/`,
   PascalCase, named exports. Start each from `assets/Section.tsx.template`.
3. Follow the house section anatomy: full-width `<section>` with
   `border-t border-border py-20 md:py-28`, a centered
   `mx-auto max-w-6xl px-4 sm:px-6 lg:px-8` container, an uppercase tracked
   "eyebrow" badge, heading, then content. Use `aria-labelledby` + an `id`.
4. For a 3D hero accent, invoke the **r3f-scene-generator** skill.

→ section anatomy, routing rules, SEO `head`, and composition in `references/layout.md`.

## Phase 3 — Mobile

1. Build **mobile-first**: base styles target phones, add `sm:`/`md:`/`lg:` to
   scale up. Containers use `px-4 sm:px-6 lg:px-8` and capped `max-w-*`.
2. Desktop nav is `hidden md:flex`; the mobile hamburger + sheet pattern lives in
   `Navbar.tsx` — reuse it, don't reinvent.
3. Touch targets ≥ 44px (`h-11`/`h-12`), readable base text (`text-base` on
   mobile), no fixed widths that overflow small screens.
4. QA at 360px, 390px, 768px, 1280px. Verify no horizontal scroll, legible type,
   tappable controls, and that any 3D/animation respects reduced motion.

→ breakpoint strategy, nav reuse, and the full QA checklist in `references/mobile.md`.

## Finish

- `bun run lint` and `bun run build` must pass — report results honestly.
- Confirm the page is added to `src/routes/` and linked from `Navbar.tsx` /
  `Footer.tsx` and `sitemap[.]xml.ts` if it's a public page.

> Note: a reference video was provided for the target aesthetic; it could not be
> decoded in this environment. This workflow targets the repo's existing dark
> cinematic system, which already matches an "ultra-premium" look. Share specific
> frames/colors if you want the tokens tuned to the video.
