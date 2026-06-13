---
name: r3f-scene-generator
description: >-
  Generate Three.js / React Three Fiber (R3F) 3D scenes as React components for
  this TanStack Start app. Use whenever the user wants to add a 3D asset, model
  viewer, animated hero background, product showcase, rotating logo/object,
  particle field, or any WebGL / three.js visual. Handles SSR-safe canvas setup,
  dependency installation, performance tuning, and accessibility.
---

# R3F Scene Generator

Generate production-ready **React Three Fiber** 3D scene components that drop
into this codebase (React 19 + TanStack Start + Vite + Tailwind v4).

This is built for a **website-design firm doing premium client builds** — the
goal is high-end, agency-grade 3D visuals (animated hero backgrounds, floating
device/product mockups, glass/gradient hero objects) that make a site feel
bespoke and expensive. When the request is vague ("make the hero feel premium",
"add a 3D concept"), reach for a ready-made look in
`references/premium-presets.md` and tailor it to the client's brand colors.

The single most important constraint: **TanStack Start renders on the server**,
where `window` and WebGL do not exist. Every scene MUST mount its `<Canvas>`
client-side only. This skill ships a `ClientCanvas` wrapper that handles it —
always render scenes through it, never `<Canvas>` directly.

## Workflow

1. **Clarify the asset** (only if ambiguous). Typical kinds:
   - **Object showcase** — a rotating product / logo / shape with orbit controls.
   - **Hero background** — ambient animated geometry / particles behind text.
   - **Model viewer** — load and display a `.glb`/`.gltf` file.
   - **Particle / instanced field** — many copies of a primitive (stars, dots).

2. **Ensure dependencies.** Check `package.json` for `three`,
   `@react-three/fiber`, `@react-three/drei`, `@types/three`. If any are missing,
   install with the project's package manager (this repo uses **bun** — see
   `bunfig.toml`/`bun.lock`):

   ```sh
   bun add three @react-three/fiber @react-three/drei
   bun add -d @types/three
   ```

   Version note: with **React 19** you need **`@react-three/fiber` v9+** (v8 only
   supports React 18). `bun add` resolves the latest, which is correct here.

3. **Create the SSR-safe canvas wrapper** (once per project). If
   `src/components/three/ClientCanvas.tsx` does not exist, copy it from
   `assets/ClientCanvas.tsx.template` in this skill. It is a thin wrapper that
   only renders `<Canvas>` after hydration.

4. **Generate the scene component.** Copy `assets/Scene.tsx.template`, rename the
   file and the exported component (PascalCase, named export — this repo uses
   named exports everywhere), and replace the geometry/material/lighting to match
   the request. Place feature components under `src/components/three/` (e.g.
   `src/components/three/ProductShowcase.tsx`).

5. **Wire it in.** Import the named export where requested (a route in
   `src/routes/` or a section component in `src/components/<feature>/`). The
   wrapper sets its own height via Tailwind (`className`), so give it a sized
   container.

6. **Verify.** Run `bun run lint` and a typecheck/build (`bun run build`) — do
   NOT skip this; R3F's JSX intrinsics and three.js types are a common source of
   errors. Report results honestly.

## Conventions to match (this repo)

- **Named exports**, PascalCase component names, function components.
- Import alias `@/` → `src/` (e.g. `import { ClientCanvas } from "@/components/three/ClientCanvas"`).
- Tailwind v4 with CSS-variable tokens: prefer `bg-background`, `text-foreground`,
  and existing `--glow-*` vars over hard-coded colors where it fits the design.
- **Respect `prefers-reduced-motion`** — gate every continuous animation behind it
  (the existing `Hero.tsx` does this; stay consistent).
- Pause work off-screen: use `frameloop="demand"` for static/interactive scenes,
  or an `IntersectionObserver` to stop animating when scrolled out of view.

## Performance & quality checklist

- Set `dpr={[1, 2]}` on the canvas to cap pixel ratio on retina displays.
- Use `<instancedMesh>` (or drei `<Instances>`) for >100 repeated objects.
- Lazy-load heavy scenes with `React.lazy` + `<Suspense>` so they don't block
  first paint; wrap async asset loads (`useGLTF`, `useTexture`) in `<Suspense>`.
- Dispose is automatic in R3F when components unmount — don't manually dispose
  geometries/materials created via JSX.
- Keep light counts low (1 ambient + 1–2 directional is plenty); prefer a drei
  `<Environment>` preset for realistic reflections instead of many lights.

## Reference material

- `references/premium-presets.md` — curated agency-grade looks (glass hero
  object, gradient blob, floating device mockup, particle aurora) with
  brand-color theming notes. Start here for "make it look premium" requests.
- `references/setup.md` — SSR rationale, dependency matrix, Canvas options.
- `references/patterns.md` — copy-paste snippets: GLTF loading (with Draco),
  instanced particles, scroll-driven animation, drei helpers, common pitfalls.

Load these only when the relevant step needs them — keep the main context lean.
