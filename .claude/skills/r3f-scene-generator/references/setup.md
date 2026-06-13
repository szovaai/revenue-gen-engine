# Setup reference

## Why client-only rendering

TanStack Start server-renders routes. three.js touches `window`, `document`, and
WebGL during construction — none exist on the server. Rendering `<Canvas>` on the
server throws and/or produces a hydration mismatch. The fix used by
`ClientCanvas.tsx.template`: render the canvas only after `useEffect` runs (i.e.
on the client, post-hydration). A server-rendered `fallback` (or `null`) keeps
layout stable.

If you ever need the scene below the fold only, also lazy-load the component:

```tsx
import { lazy, Suspense } from "react";
const ProductShowcase = lazy(() =>
  import("@/components/three/ProductShowcase").then((m) => ({ default: m.ProductShowcase })),
);
// ...
<Suspense fallback={null}>
  <ProductShowcase />
</Suspense>;
```

## Dependency matrix

| Package              | Why                                   | Notes                          |
| -------------------- | ------------------------------------- | ------------------------------ |
| `three`              | core engine                           | peer of fiber + drei           |
| `@react-three/fiber` | React renderer for three.js           | **v9+ required for React 19**  |
| `@react-three/drei`  | helpers: controls, loaders, env, etc. | optional but recommended       |
| `@types/three`       | TS types (dev dep)                    | fiber/drei ship their own      |

Install (bun, this repo's package manager):

```sh
bun add three @react-three/fiber @react-three/drei
bun add -d @types/three
```

No Vite config changes are needed — `@react-three/fiber` works out of the box
with the existing Vite setup. JSX intrinsics (`<mesh>`, `<meshStandardMaterial>`,
…) are typed automatically once `@react-three/fiber` is imported anywhere.

## Common `<Canvas>` options

- `camera={{ position: [x, y, z], fov: 45 }}` — initial camera.
- `dpr={[1, 2]}` — clamp device pixel ratio (perf on retina). Already defaulted
  in `ClientCanvas`.
- `frameloop="demand"` — only re-render on change / `invalidate()`; ideal for
  static or purely interactive (orbit) scenes. Default `"always"` for continuous
  animation.
- `shadows` — enable shadow maps (also set `castShadow`/`receiveShadow` on
  meshes and lights). Costs perf; omit for flat/ambient looks.
- `gl={{ antialias: true, alpha: true }}` — `alpha: true` for a transparent
  canvas over page content (hero backgrounds).
