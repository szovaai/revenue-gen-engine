# Phase 3 — Mobile reference

Build **mobile-first**: unprefixed Tailwind classes are the phone layout; add
`sm:` (640), `md:` (768), `lg:` (1024), `xl:` (1280) to scale up.

## Layout & spacing

- Containers: `mx-auto max-w-* px-4 sm:px-6 lg:px-8` — never a fixed pixel width.
- Section padding scales: `py-20 md:py-28` (less air on phones).
- Grids collapse: `grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3`.
- Headings scale: `text-4xl md:text-5xl` (and `text-3xl` base for dense sections).
- Avoid `whitespace-nowrap` on long copy; avoid `w-[...px]` that exceeds 360px.

## Navigation (reuse `Navbar.tsx`)

The pattern is already built — don't reinvent it:

- Desktop links + CTA: `hidden md:flex` / `hidden md:block`.
- Mobile: a hamburger `<button class="… md:hidden">` toggling `open` state, with
  `aria-label`, `aria-expanded`, and `Menu`/`X` icons.
- Open state renders a full-width panel (`bg-background/95 backdrop-blur-xl`) with
  stacked links; each link calls `setOpen(false)` on tap.

## Touch & readability

- Tap targets ≥ 44px: buttons/links `h-11` (44px) or `h-12`; icon buttons
  `h-11 w-11`.
- Body text `text-base` on mobile (16px) to avoid iOS zoom-on-focus; don't go
  below `text-sm` for interactive labels.
- Generous tap spacing in stacked nav/menus (`py-3` per item).
- Respect the global `prefers-reduced-motion` reset; 3D/parallax must degrade.

## Sticky/fixed elements

- The header is `fixed inset-x-0 top-0 z-50`; ensure page content clears it
  (the hero accounts for the `h-24` header — keep that in mind for new top sections).
- Avoid stacking multiple fixed bars on mobile (eats the small viewport).

## QA checklist

Test at **360 / 390 / 768 / 1280 px** (DevTools device toolbar):

- [ ] No horizontal scroll / overflow at any width.
- [ ] Mobile menu opens, links work, closes on tap and on navigation.
- [ ] All CTAs are full-width-friendly and ≥ 44px tall.
- [ ] Text legible; no clipped headings; images use `object-cover` not squish.
- [ ] Forms usable: inputs ≥ 16px text, labels visible, keyboard doesn't obscure.
- [ ] Any 3D/animation pauses or simplifies under reduced motion and stays 60fps.
- [ ] `bun run lint` and `bun run build` pass.
