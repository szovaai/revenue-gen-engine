# Phase 2 — Layout reference

Pages = **routes** (file-based) composed of **section components**.

## Routing rules (from `src/routes/README.md`)

- Every `.tsx` in `src/routes/` is a route. `index.tsx` → `/`, `about.tsx` →
  `/about`, `users/$id.tsx` → `/users/:id` (bare `$`), `_layout.tsx` = layout.
- **Never** create `src/pages/`, `app/layout.tsx`, or Next/Remix-style folders.
- `__root.tsx` is the app shell — preserve its `<Outlet />`.
- `routeTree.gen.ts` is auto-generated — don't hand-edit.

## Route skeleton

Start from `assets/route.tsx.template`. Every public route sets `head` meta:
`title`, `description`, `og:title`/`og:description`/`og:url`, and a canonical
link — mirror `src/routes/index.tsx`. Wrap the component tree in `<PageShell>`
(provides `Navbar` + `Footer` + `<main id="main">`).

```tsx
export const Route = createFileRoute("/services")({
  head: () => ({ meta: [{ title: "…" }, { name: "description", content: "…" }] }),
  component: ServicesPage,
});
function ServicesPage() {
  return (
    <PageShell>
      <ServicesHero />
      <ServicesGrid />
      <FooterCTA />
    </PageShell>
  );
}
```

## House section anatomy

Section components live in `src/components/<feature>/`, are PascalCase, and use
**named exports**. Standard structure (see `Pricing.tsx`, `Hero.tsx`):

```tsx
<section
  className="relative border-t border-border py-20 md:py-28"
  aria-labelledby="services-heading"
  id="services"
>
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    {/* eyebrow */}
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
      …
    </span>
    <h2 id="services-heading" className="mt-5 text-4xl font-semibold md:text-5xl">…</h2>
    {/* content: grid of glass-card tiles, etc. */}
  </div>
</section>
```

Spacing/scale conventions:

- Vertical rhythm: `py-20 md:py-28`; section dividers via `border-t border-border`.
- Container widths: `max-w-6xl` (content), `max-w-7xl` (nav/wide), `max-w-3xl`
  (centered intro copy).
- Headings: `text-4xl md:text-5xl font-semibold`; use `text-gradient-brand` for
  hero headlines.
- Cards/tiles: `glass-card rounded-2xl p-6`.
- Icons: `lucide-react`.

## Composition tips

- Build pages by stacking sections in the route component, in the order a visitor
  reads (hero → proof → offer → FAQ → CTA), like `index.tsx`.
- Reuse shared sections (`FooterCTA`, `AuditForm`) across pages.
- For a 3D hero accent, call the **r3f-scene-generator** skill and place the scene
  inside the hero section, behind/beside the headline.
- Link new public pages from `Navbar.tsx`, `Footer.tsx`, and `sitemap[.]xml.ts`.
