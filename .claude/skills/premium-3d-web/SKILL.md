---
name: premium-3d-web
description: >-
  Build the "ClickAdMedia — The Ascent" immersive, scroll-driven 3D website: a
  cinematic vertical journey up a Rocky-Mountain landscape (fog → summit) with a
  chrome "M" hero object, a glowing violet gem, and a 5-act scroll narrative that
  guides visitors to book a call. Use when building or extending this immersive
  3D experience, its scroll choreography, the R3F hero, or its zero-WebGL "lite
  mode" fallback. Pairs with the r3f-scene-generator skill for the 3D scene and
  the website-builder-workflow skill for layout/branding.
---

# Premium 3D Web — "The Ascent" (ClickAdMedia)

A repeatable spec for the ClickAdMedia immersive site. The brand metaphor: **the
logo is a summit, scrolling is the climb, the violet gem is the conversion.**
The full creative brief lives in `references/ascent-brief.md` — read it before
building; this file is the operational summary.

## The concept in one line
A single cinematic camera flies **up a mountain** as the user scrolls (progress
0→1), moving through 5 acts: **Fog → Problem → Method → Proof → Summit**, ending
on the violet gem igniting and the lockup **"WEBSITES THAT CONVERT."**

## Build order
1. **Branding tokens first** (see `references/ascent-brief.md` §3). Add to
   `src/styles.css` `:root`: `--void #07060F`, `--deep-navy #0D0B1F`,
   `--chrome-hi #F4F6FF`, `--chrome-lo #8A8FA8`, `--violet #7C3AED`,
   `--electric #8B00FF`, `--ice-blue #00B4FF`, and a `--summit-glow` radial.
   Keep the existing premium utilities (`glass-card`, `text-gradient-brand`).
2. **Lite mode FIRST, WebGL second.** Build the zero-dependency 2.5D version
   (CSS parallax layers, fog as a CSS gradient that clears on scroll, the static
   chrome M, an altitude-meter scroll indicator, IntersectionObserver reveals,
   count-up stats). This is the mobile / `prefers-reduced-motion` / low-power
   fallback AND it ships without any 3D dependency. Reuse the existing
   `Reveal`, `ScrollProgress`, and `useCountUp` patterns in `src/components/home`.
3. **WebGL hero via the `r3f-scene-generator` skill.** The chrome M + violet gem
   as real geometry, cursor-reactive reflections, gentle bob, Bloom + Vignette.
   Mount through `ClientCanvas` (SSR-safe). Lazy-load below-the-fold 3D; only the
   hero scene loads eagerly. Static chrome image paints first, then hydrate 3D.
4. **Scroll choreography** maps one normalized 0→1 value to camera position, fog
   density, and act opacity (drei `ScrollControls` or GSAP ScrollTrigger).

## Dependencies (NOT installable in the Claude Code sandbox — registry is blocked)
The WebGL layer needs: `three`, `@react-three/fiber` (v9+ for React 19),
`@react-three/drei`, `@react-three/postprocessing`, and optionally `gsap`.
`bun add` fails here (403). Run the WebGL build where installs work (e.g. Lovable
or a normal dev machine). **The lite-mode layer needs none of these — build and
ship that first so the site is live and premium even without WebGL.**

## Non-negotiables (this agency sells "websites that convert")
- **Instant first paint** — never block on three.js; static hero image → hydrate.
- **Always-visible booking CTA** (→ `/strategy-call`); a slow/clever site that
  doesn't convert defeats the pitch.
- **Accessibility + `prefers-reduced-motion`**: all content readable without 3D;
  reduced motion serves the lite version. Targets: Lighthouse 85+, LCP < 2.5s,
  3D payload < ~3–4 MB (Draco-compressed `.glb`).
- **Real numbers only** in stats — no fabricated proof.

## Acts → existing sections
Map the 5 acts onto the current homepage content where possible (Hero → Act I;
Before/After + "why websites fail" → Act II; Framework/Growth Packages → Act III;
SocialProof/industry stats + examples → Act IV; FooterCTA + booking → Act V).

→ Full art direction, color, materials, wow-moments, copy tone, perf budget, and
two alternate concept skins ("The Conversion Forge", "The Signal Tower") are in
`references/ascent-brief.md`.
