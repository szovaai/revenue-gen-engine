# Build “The Ascent” immersive homepage

## Goal
Transform the current homepage into a single continuous climb through a dark Rocky Mountain world: fog at the base, clear positioning and process on the ascent, cited proof on the ridge, and a glowing chrome-logo summit. Keep the rest of the site and existing routes intact.

## Experience structure

1. **Act I — The Fog**
   - Full-viewport hero with the existing ClickAdMedia logo as an immediate static fallback.
   - Hydrate a procedural 3D chrome “M” and floating violet gem behind it on capable devices.
   - Add drifting fog, subtle particles, cursor-reactive chrome, “Scroll to climb,” and plain-language hero copy for Calgary trades.
   - Primary CTA: **Book a free strategy call**. Secondary CTA scrolls to Proof.

2. **Act II — The Problem**
   - Continue the visual ascent as fog thins.
   - Present three trail-marker messages: invisible on Google, losing work to competitors, and a website that does not generate calls.
   - Keep copy short, direct, and written for tradespeople.

3. **Act III — The Method**
   - Show four faceted “base camp” platforms: Convert-First Design, Local SEO, Lead Capture, and Done-For-You Build.
   - Illuminate each platform violet as its checkpoint becomes active.
   - Include the simple process: Strategy call → We build it → You get leads.

4. **Act IV — Proof Ridge**
   - Use existing real site/example assets as floating glass screens.
   - Animate the current attributed research statistics into view; do not invent client metrics or testimonials.
   - Preserve source attribution visibly and accessibly.

5. **Act V — The Summit**
   - Clear the fog, open the sky, intensify the gem, and assemble/reveal the full mark.
   - Lock in the wide-tracked tagline **WEBSITES THAT CONVERT**.
   - Finish with a dominant strategy-call CTA and grounded Calgary/Alberta trust copy.

## 3D and scroll implementation

- Restore/install the React 19-compatible Three.js stack from Step 1: Three, React Three Fiber, drei, postprocessing, and GSAP.
- Recreate an SSR-safe `ClientCanvas` with a mounted guard and lazy client loading.
- Build the mountain, chrome mark, gem, trail, lighting, and particles as lightweight procedural geometry so no large model download is required.
- Use GSAP ScrollTrigger to normalize page scroll and drive camera altitude, fog density, trail progress, object lighting, and content timing.
- Add restrained Bloom and Vignette; avoid heavy volumetric effects that would undermine conversion performance.
- Add an ice-blue altitude meter showing Base Camp → Summit and the current act.

## Lite mode and accessibility

- Build the complete semantic 2.5D version first, then layer WebGL over it as progressive enhancement.
- Automatically use lite mode for reduced-motion users, touch/mobile low-power conditions, failed WebGL, or constrained hardware.
- Lite mode retains all five acts using CSS mountain silhouettes, gradient fog, parallax, reveal transitions, and count-up stats.
- Keep all content in the DOM and readable without canvas; mark 3D decoration as non-essential.
- Ensure keyboard navigation, visible focus states, contrast, semantic heading order, and a persistent strategy-call CTA.
- Disable count-up/parallax/camera motion under `prefers-reduced-motion`.

## Homepage and conversion cleanup

- Replace the current long collection of disconnected homepage components with the five-act narrative while retaining useful content inside the new acts.
- Update homepage metadata and structured data for Calgary lead-generation web design, removing stale fixed-price/$500 claims.
- Keep `/strategy-call` as the primary conversion destination and leave the quote route available elsewhere.
- Update the persistent header CTA and final summit CTA to use consistent strategy-call wording.
- Keep the existing footer, but visually blend its entrance with the summit ending.

## Validation

- Check desktop and mobile layouts, scroll choreography, lite-mode fallback, reduced motion, keyboard focus, and CTA destinations.
- Verify no SSR/window errors or browser console errors.
- Profile the homepage for excessive canvas resolution, bundle/load regressions, layout shifts, and oversized assets; cap DPR and pause rendering when the canvas is not visible.
- Confirm that cited statistics retain their sources and that no unverified business results are introduced.