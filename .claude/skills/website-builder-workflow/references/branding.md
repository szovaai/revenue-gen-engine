# Phase 1 — Branding reference

The design language lives entirely in **`src/styles.css`** as CSS custom
properties, surfaced to Tailwind v4 via the `@theme inline` block. Theme a client
by editing tokens — components reference the tokens, so a re-skin is a one-file
change.

## Client intake checklist

- [ ] Primary brand color (CTAs, links, focus rings) → `--primary` / `--ring`
- [ ] Accent / secondary color (gradients, highlights) → `--accent`
- [ ] Light or dark base? (house default is dark `#050505`) → `--background` / `--foreground`
- [ ] Logo asset (stored as `src/assets/*.asset.json`, referenced by `.url`)
- [ ] Display + body font → `--font-display` / `--font-sans`
- [ ] Mood: luxury / SaaS / lifestyle / bold (drives glow intensity + gradient)

## Token map (edit these)

```css
:root {
  --background: #050505;     /* page base */
  --foreground: #ffffff;     /* body text */
  --primary: #0066ff;        /* CTAs, links, ring */
  --accent: #8050ff;         /* gradient end, highlights */
  --glow-blue: rgba(0,102,255,0.45);
  --glow-purple: rgba(128,80,255,0.35);
  --gradient-hero: radial-gradient(...);  /* ambient hero light */
}
```

Derive `--glow-*` from the brand colors (same hue, ~0.35–0.45 alpha) and rebuild
`--gradient-hero` from primary+accent so the cinematic lighting stays on-brand.

## House premium utilities (reuse, don't recreate)

- `glass-card` — frosted translucent panel (`backdrop-filter: blur(12px)` + subtle
  gradient border). Use for pricing cards, feature tiles, testimonials.
- `glow-blue` — focal ring + glow for the primary CTA / hero object.
- `text-gradient-brand` — white→accent→primary text gradient for headlines.
- `--shadow-card`, `--shadow-glow` — consistent elevation.

## Rules

- **Never hard-code hex in components.** Use `bg-primary`, `text-muted-foreground`,
  `border-border`, `var(--glow-blue)`, etc. This keeps re-theming trivial.
- Keep contrast accessible (WCAG AA): muted text uses `--muted-foreground`
  (`#a6a6a6`) on dark — verify against any new background.
- Keep the global `@media (prefers-reduced-motion: reduce)` reset.
- Premium = restraint: one accent gradient, generous spacing, few font weights.
