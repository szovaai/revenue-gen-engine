# Lovable Build Script — "The Ascent" (paste one prompt at a time, in order)

Build incrementally. After each step, check the preview, then paste the next.
Brand: ClickAdMedia.co — chrome "M" summit logo + glowing violet gem, tagline
"WEBSITES THAT CONVERT", Calgary agency building lead-gen sites for tradespeople.

---

## PROMPT 1 — Role + install the 3D stack (do this first)

You are a senior creative technologist building an Awwwards-caliber, scroll-driven 3D website for ClickAdMedia.co — a Calgary agency that builds lead-generation websites for tradespeople (electricians, contractors, builders). The brand mark is a polished chrome "M" shaped like a mountain peak topped with a glowing violet gem; the tagline is "WEBSITES THAT CONVERT"; the mood is a dark night-mountain. We will build this in small steps — do ONLY this step now, then stop.

STEP 1: Add the 3D + animation stack and wire it up SSR-safely. Install `three`, `@react-three/fiber` (v9+, React 19 compatible), `@react-three/drei`, `@react-three/postprocessing`, and `gsap`. Create a reusable `ClientCanvas` component that renders the React Three Fiber `<Canvas>` only on the client (guard against SSR/`window` errors with a mounted check). Add a tiny placeholder 3D scene (a rotating cube with one light) inside it on the homepage to prove it renders. Keep everything else unchanged. Confirm the build passes.

---

## PROMPT 2 — Branding tokens

STEP 2: Set the brand design tokens (do not restyle pages yet). In the global CSS `:root`, add:
`--void:#07060F; --deep-navy:#0D0B1F; --chrome-hi:#F4F6FF; --chrome-lo:#8A8FA8; --violet:#7C3AED; --electric:#8B00FF; --ice-blue:#00B4FF;`
and a `--summit-glow` radial gradient from `--violet` to transparent. Make `--void` the page background everywhere. Headlines use a heavy geometric grotesk (Space Grotesk or Satoshi); body uses Inter; the "WEBSITES THAT CONVERT" lockup uses wide letter-spacing in caps. Light comes mostly from chrome reflections and the violet gem — keep the palette restrained so the violet glow stands out.

---

## PROMPT 3 — Lite mode FIRST (the fast, always-works baseline)

STEP 3: Build a zero-WebGL "lite" version of the full-page experience FIRST, so the site is fast and works on every device. It's a single vertical scroll page with 5 acts: (I) Fog hero, (II) Problem, (III) Method, (IV) Proof, (V) Summit. Use CSS only: layered parallax, a fog overlay (CSS gradient) that fades out as you scroll down, the chrome-M logo as a static image in the hero, an "altitude meter" scroll-progress indicator down the side ("Base Camp → Summit"), section content that rises + fades in on scroll (IntersectionObserver), and stat numbers that count up when in view. A booking CTA ("Book a free strategy call") must be visible at all times. Mobile-first and fully responsive. This lite version is also the `prefers-reduced-motion` / low-power fallback.

---

## PROMPT 4 — The 3D hero object (chrome M + violet gem)

STEP 4: Replace the hero's static logo with a real 3D scene inside `ClientCanvas`. Model the chrome "M" as reflective liquid-metal PBR geometry with an environment map and a slow-moving specular highlight; it auto-rotates ~5° and tilts toward the cursor on desktop (max ±8°). Above it floats an emissive violet gem (drei `MeshTransmissionMaterial`) that gently bobs and pulses like a slow heartbeat. Add `@react-three/postprocessing` Bloom (emissive-only), a subtle Vignette, and light film grain. IMPORTANT: paint a static high-res chrome-M image instantly, then hydrate the 3D scene behind it once loaded — never block first paint on Three.js.

---

## PROMPT 5 — Scroll choreography + the 5 acts

STEP 5: Turn the page into one continuous cinematic camera move (not stacked sections). Map normalized scroll progress 0→1 (drei `ScrollControls` or GSAP ScrollTrigger) to a single camera flying UP a low-poly faceted dark mountain with an ice-blue rim light. As the user scrolls: ACT I fog parts and thins; ACT II floating "trail-marker" cards reveal pain points in a tradesperson's voice ("You're the best in town — but you're invisible online."); ACT III three or four faceted crystal "base-camp" platforms light violet as the camera passes (Convert-First Design, Local SEO, Lead Capture, Done-For-You Build), plus a plain 1-2-3 process (Strategy call → We build it → You get leads); ACT IV a ridge plateau with floating glass screens of past client sites and 2–3 testimonials and big count-up stats; ACT V the fog clears, the sky opens, the violet gem ignites with a bloom burst, the chrome logo assembles, and the tagline "WEBSITES THAT CONVERT" locks in over the primary booking CTA. Draw a glowing ice-blue trail line up the mountain as you scroll, connecting the acts.

---

## PROMPT 6 — Performance, accessibility, polish (non-negotiable)

STEP 6: Harden it. Lazy-load all below-the-fold 3D; only the hero scene loads eagerly. Detect low-power devices and `prefers-reduced-motion` and serve the lite 2.5D version (no WebGL) on those. Targets: Lighthouse performance 85+, LCP under 2.5s on 4G, total 3D payload under 3–4 MB (compress `.glb` with Draco). All content must be readable and navigable without the 3D; keyboard-accessible CTAs with visible focus states; sufficient contrast; alt text and semantic headings. Add an always-visible "Book a free strategy call" button. Add an optional, off-by-default mute toggle for faint wind ambience that builds with altitude and a soft chime at the gem ignition — never autoplay audio.

---

### Notes
- Use REAL numbers in stats — leave placeholders for the user to fill, don't invent results.
- If "shatter and reform" for the logo is too heavy, fall back to a smooth chrome-liquid morph + light burst.
- Keep copy plain and confident for a busy tradesperson — no buzzwords. Calgary/Alberta pride is a light trust signal.
- Full art-direction detail is in `ascent-brief.md` (same folder).
