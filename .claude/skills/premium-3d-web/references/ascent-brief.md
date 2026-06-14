# THE ASCENT — ClickAdMedia.co 3D Immersive Website MegaPrompt

> A copy-paste design brief for Lovable / Claude Code / any AI builder.
> Built around one idea: **your logo is a summit, your city is the gateway to the Rockies, and your promise is the climb to conversion.** Everything below serves that metaphor.

---

## HOW TO USE THIS

Paste the whole thing into your builder, or feed it section by section if you want to build incrementally (recommended for a solo build). The `[BUILDER ROLE]` block at the top frames the AI. Everything after it is the spec.

---

## [BUILDER ROLE]

You are a senior creative technologist and award-winning web designer (think Awwwards "Site of the Day" caliber). You build immersive, performant, scroll-driven 3D websites using React, React Three Fiber (Three.js), and GSAP/ScrollTrigger. You care equally about jaw-dropping aesthetics AND conversion — because this site is for an agency whose entire pitch is "websites that convert," so a slow or confusing site would be self-defeating. Every WOW moment must load fast and guide the visitor toward booking a call. Build the following.

---

## 1. THE BIG IDEA — "THE ASCENT"

ClickAdMedia builds websites for tradespeople (electricians, contractors, builders, fabricators) in the Calgary area. The brand mark is a chrome **M** shaped like an ascending mountain peak crowned with a glowing purple gem.

**The site is a vertical journey up a mountain.** As the visitor scrolls down the page, they actually *climb upward* through a stylized 3D Rocky Mountain landscape. At the bottom they're a stranger in the fog (an invisible business). At the summit, they reach the **glowing purple gem** — the conversion, the booked job, the customer. The site literally walks the prospect through the transformation ClickAdMedia sells.

The emotional arc: **fog → footing → momentum → summit → glow.**

Tagline locks in at the peak: **"WEBSITES THAT CONVERT."**

---

## 2. THE SCROLL JOURNEY (5 acts)

Treat the page as a continuous cinematic camera move, not stacked sections. Scroll progress (0→1) drives a single camera flying up the mountain. Content panels fade in at altitude checkpoints.

- **ACT I — THE FOG (Hero, 0–15% scroll).** Visitor lands at the mountain base in drifting volumetric fog. The chrome M mark hovers, slowly rotating, catching light. Headline + a single glowing CTA. Subtle particle drift. A faint "scroll to climb" cue.
- **ACT II — THE PROBLEM (15–35%).** Camera rises; fog thins. Floating "trail markers" reveal the pain points tradespeople feel — invisible on Google, losing jobs to competitors, a dead website that does nothing. Markers feel like trail signs on a switchback path.
- **ACT III — THE METHOD (35–60%).** The slope steepens into the agency's process. Three or four "base camps" (service pillars) appear as faceted crystal platforms jutting from the rock: e.g. *Convert-First Design → Local SEO → Lead Capture → Done-For-You Build*. Each lights up violet as the camera passes.
- **ACT IV — PROOF (60–80%).** A high ridge plateau. Results, testimonials, before/after site mockups displayed as floating screens that the camera banks past. Numbers count up as they enter frame.
- **ACT V — THE SUMMIT (80–100%).** Fog gone, sky opens, the **purple gem ignites**. The full logo assembles from chrome shards. Final pitch + the primary booking CTA dominates. A calm, triumphant beat. This is the screenshot moment.

---

## 3. VISUAL SYSTEM

### Color tokens (pulled from the logo)
```
--void:        #07060F   /* near-black navy, primary background */
--deep-navy:   #0D0B1F   /* gradient base */
--chrome-hi:   #F4F6FF   /* polished silver highlight */
--chrome-lo:   #8A8FA8   /* cool grey shadow on the metal */
--violet:      #7C3AED   /* the gem / accent */
--electric:    #8B00FF   /* deepest purple, glow core */
--ice-blue:    #00B4FF   /* secondary accent for energy/lines */
--summit-glow: radial gradient from --violet → transparent
```
Background is dark throughout (a night-mountain mood). Light comes almost entirely from the chrome reflections and the purple gem. Restraint on color = the violet glow hits harder.

### Materials & lighting
- The **M mark and logo** = real polished chrome / liquid-metal PBR material with high reflectivity, an environment map, and a slow-moving spec highlight so it always looks "alive."
- The **gem** = emissive purple with bloom; pulses very subtly like a heartbeat.
- The **mountain** = low-poly faceted dark rock with a thin rim-light edge in ice-blue so geometry reads in the dark.
- Lighting: one cool key light, a violet rim light from the summit, soft ambient. Add a `Bloom` post-processing pass (subtle — glow on emissives only), light film grain, slight vignette.

### Typography
- Display/headlines: a confident geometric or grotesk sans (e.g. Clash Display, Satoshi, or Space Grotesk) — heavy weight, tight tracking for headlines, wide letter-spacing for the small "WEBSITES THAT CONVERT" lockup (match the logo's spaced caps).
- Body: clean neutral sans (Inter / General Sans).
- Numbers/stats: tabular, oversized, animated count-up.

---

## 4. THE 3D HERO OBJECT

The centerpiece is the **chrome M mark as a hero object**:
- Renders as real 3D geometry, not a flat PNG. Slowly auto-rotates ~5°, and tilts toward the cursor on desktop (subtle, max ±8°).
- The purple gem above it floats with a gentle bob and emits the bloom glow.
- On scroll into Act V, the M "shatters and reforms" — chrome shards fly apart and snap back into the full logo as the summit reveals. (If shatter is too heavy to build, fall back to a smooth chrome-liquid morph + a light burst.)
- A faint reflection/contact shadow grounds it.

---

## 5. SIGNATURE WOW MOMENTS (the screenshot-able set pieces)

Build at least 3 of these:
1. **Fog parting on scroll** — volumetric fog literally clears as you climb, revealing the landscape. Visceral "I'm rising" feeling.
2. **The gem ignition at the summit** — the screen darkens for a half-beat, then the purple gem flares with a bloom burst and the tagline locks in. Earn this beat with a tiny pause.
3. **Cursor-reactive chrome** — the M mark's reflections shift as the cursor moves, like real polished metal under a moving light.
4. **Floating site mockups in Act IV** — your past client sites rendered as glass screens that the camera banks past, parallaxing in 3D space.
5. **Trail-line draw-on** — a glowing ice-blue route line draws itself up the mountain as you scroll, visually connecting each section like a climbing path / GPS route.

---

## 6. SECTION-BY-SECTION CONTENT MAP

1. **Hero (Act I):** Logo + headline ("Your website should be working as hard as you do." or similar) + primary CTA: **"Book a free strategy call."** Secondary: "See the work" (scrolls to proof).
2. **Pain points (Act II):** 3 trail-marker cards. Short, punchy, in the contractor's voice ("You're the best in town — but you're invisible online.").
3. **Services (Act III):** 4 crystal-platform pillars, each one line of benefit + one line of plain-English what-it-is.
4. **Process (within Act III/IV):** A simple 1-2-3 ("Strategy call → We build it → You get leads"). Tradespeople want clarity, not jargon.
5. **Proof (Act IV):** Floating mockups, 2-3 testimonials, and 3 big animated stats (leads generated, sites launched, avg. conversion lift — use real numbers, no fabrication).
6. **Summit CTA (Act V):** Final offer, the booking widget/Calendly embed, and contact. Make this dead simple.
7. **Footer:** Logo, nav, Calgary/local trust signals, social, copyright. Keep it grounded and fast.

---

## 7. MICRO-INTERACTIONS & MOTION

- Buttons: violet glow that intensifies on hover; a soft magnetic pull toward the cursor.
- Links: ice-blue underline that draws left-to-right.
- Section entrances: content rises + fades with slight blur-to-sharp, easing `power3.out`.
- Stats: count up only when in view.
- A thin progress indicator styled as an **altitude meter** on the side ("Base Camp → Summit"), doubling as scroll progress + nav.
- Respect `prefers-reduced-motion`: disable parallax/camera fly, keep simple fades.

---

## 8. SOUND (optional, off by default)

A small mute/unmute toggle. If on: faint wind ambience that builds with altitude, and a soft resonant "chime" at the gem ignition. Never autoplay audio. Many tradespeople browse from a job site — keep it optional and quiet.

---

## 9. TECH STACK & IMPLEMENTATION

- **Framework:** React + Vite (or your Lovable default).
- **3D:** React Three Fiber + drei (`useGLTF`, `Environment`, `Float`, `MeshTransmissionMaterial` for the gem, `meshStandardMaterial`/env map for chrome). `@react-three/postprocessing` for Bloom + Vignette.
- **Scroll choreography:** GSAP + ScrollTrigger driving a single normalized scroll value (0→1) that you map to camera position, fog density, and section opacity. Or drei `ScrollControls`.
- **Models:** Keep them light — the mountain is low-poly; the M and gem are the only "premium" assets. Use compressed `.glb` (Draco). Don't over-model.
- **Booking:** Calendly inline embed or a simple form → your existing pipeline.

---

## 10. PERFORMANCE & PROGRESSIVE ENHANCEMENT (non-negotiable)

This is the part most "immersive" sites get wrong, and for an agency selling conversion it's the whole ballgame: **a slow site doesn't convert, no matter how pretty.** So bake this in:
- **First paint must be instant.** Show the hero with a static high-res chrome image first, then hydrate the 3D scene behind it once loaded. Never block the page on Three.js.
- **Lazy-load** the 3D for sections below the fold; only the hero scene loads eagerly.
- **Lite mode / mobile fallback:** detect low-power devices and `prefers-reduced-motion`. On those, serve a beautiful *2.5D* version — parallax layers, the static chrome M, fog as a CSS gradient, real scroll sections — no WebGL. It should still feel premium, just not GPU-heavy.
- **Target:** Lighthouse performance 85+, largest contentful paint under ~2.5s on 4G, total 3D payload under ~3–4 MB.
- **Always-visible CTA** so a visitor can book without scrolling the whole journey.

---

## 11. ACCESSIBILITY

- All content readable and navigable without the 3D (the journey is enhancement, not the only path to information).
- Keyboard-navigable CTAs and nav; visible focus states.
- Sufficient contrast on all text over the dark background.
- Alt text, semantic headings, ARIA where needed.
- `prefers-reduced-motion` fully honored.

---

## 12. COPY / MESSAGING TONE

Write for a busy, skeptical tradesperson — not a marketer. Plain, confident, benefit-first. No buzzwords ("synergy," "leverage," "solutions"). Talk about leads, calls, booked jobs, getting found on Google, looking legit. The 3D is the spectacle; the words stay grounded and human. Local pride (Calgary / Alberta) is a quiet trust signal — use it lightly.

---

## 13. DELIVERABLE / OUTPUT SPEC

Produce a single-page responsive site with:
1. Working scroll-driven 3D hero with the chrome M + glowing gem.
2. The 5-act scroll journey with content panels.
3. The lite-mode fallback for mobile/low-power.
4. A clear, always-accessible booking CTA.
5. Clean, commented, component-based code I can extend.

---

---

# ALTERNATE CONCEPT SKINS

If "The Ascent" isn't the vibe, swap the metaphor — the tech and structure above stay the same:

**B) "THE CONVERSION FORGE."** The M is an anvil/forge mark. Raw clicks (sparks) fly into a glowing chrome forge and come out as customers. Heavy, industrial, made-of-metal energy — speaks directly to trades. Orange-violet sparks against chrome.

**C) "THE SIGNAL TOWER."** The mountain becomes a beacon. The gem is a pulse that radiates ice-blue signal rings out across a dark map of Calgary, "lighting up" leads. Tech/network aesthetic, very "we put you on the map" — literally.

---

*Built for ClickAdMedia.co — chrome M / violet gem / "Websites That Convert."*
