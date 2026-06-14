# Full $50K Motion Upgrade

## Goal
Elevate the existing five-act “Ascent” homepage through refined motion, cursor response, proof interactions, and smooth scrolling—without changing the established messaging, information architecture, or conversion path.

## Implementation

1. **Create a unified motion controller**
   - Consolidate homepage GSAP setup into a scoped lifecycle tied to the Ascent root.
   - Add Lenis smooth scrolling on capable desktop devices and synchronize it with GSAP ScrollTrigger.
   - Disable smooth scrolling and nonessential effects for reduced-motion, coarse-pointer, and lite-mode visitors.
   - Ensure all animation cleanup runs correctly during route changes and development remounts.

2. **Choreograph the hero entrance**
   - Split the hero headline into accessible word groups while preserving a clean screen-reader sentence.
   - Reveal the eyebrow, headline words, supporting copy, CTAs, and scroll cue in a deliberate cinematic sequence.
   - Add a restrained scroll-driven video scale/position shift and overlay fade so the hero transitions naturally into Act II.
   - Keep the full-width video, poster fallback, and existing copy intact.

3. **Add cursor-reactive depth**
   - Add a subtle branded cursor glow that follows the pointer only on fine-pointer desktop devices.
   - Let the hero media and nearby light field respond gently to pointer position without moving readable content.
   - Add magnetic micro-movement to the primary homepage CTAs with conservative travel and immediate keyboard-safe behavior.
   - Preserve the existing Three.js pointer response and avoid stacking competing transforms.

4. **Animate each ascent act**
   - Reveal section labels and headings with staggered, clipped motion as they enter.
   - Sequence the pain cards as trail markers, with a traveling edge highlight and subtle depth response.
   - Illuminate the four method platforms one at a time as the user climbs, then stage the three process steps in order.
   - Animate portfolio screens from layered perspective positions and settle them into a clean readable grid.
   - Build the summit reveal around the logo glow, tagline tracking, CTA, and trust points.

5. **Turn proof into an interaction**
   - Retain the existing count-up behavior but coordinate it with the section timeline so each statistic lands intentionally.
   - Add a brief highlight pulse at each final value and stagger labels/source citations afterward.
   - Keep every source visible and static in the DOM; no invented metrics or testimonial content.

6. **Refine premium surfaces and micro-interactions**
   - Strengthen glass depth using the existing semantic palette, blur, subtle inner highlights, and cursor-positioned sheen.
   - Add polished hover/focus states to proof screens, cards, navigation, and CTAs without reducing legibility.
   - Keep all visual values token-driven in the global design system.

7. **Performance and accessibility safeguards**
   - Use transform/opacity animation paths, requestAnimationFrame-backed pointer updates, and passive listeners.
   - Avoid effects on touch/mobile and pause or simplify ambient work when appropriate.
   - Preserve semantic headings, keyboard focus, readable content without JavaScript, and the complete reduced-motion experience.
   - Validate desktop and mobile layout, CTA navigation, console/runtime health, animation cleanup, and homepage responsiveness after implementation.

## Technical details
- Reuse the installed GSAP, ScrollTrigger, React Three Fiber, and existing lite-mode logic.
- Add Lenis as the only new runtime dependency.
- Keep the upgrade primarily inside `AscentExperience`, supported by small focused motion components/hooks and semantic tokens/utilities in the global stylesheet.
- Do not alter backend data, other routes, business copy, or the current video asset.