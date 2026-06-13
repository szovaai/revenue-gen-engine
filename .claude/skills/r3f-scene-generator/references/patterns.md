# Pattern snippets

Copy-paste building blocks. All assume the `ClientCanvas` wrapper is in place at
`@/components/three/ClientCanvas`.

## Load a GLTF/GLB model

Put the file in `public/models/` so Vite serves it at `/models/...`.

```tsx
import { useGLTF } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/models/widget.glb");
  return <primitive object={scene} />;
}
useGLTF.preload("/models/widget.glb"); // optional warm-up
```

Wrap the consumer in `<Suspense>` (the `ClientCanvas` already provides one) so the
async load suspends instead of crashing.

### Draco-compressed models

```tsx
useGLTF("/models/widget-draco.glb", "/draco/"); // decoder files served from /public/draco/
```

drei loads the Draco decoder from a CDN by default; self-host under
`public/draco/` (copy from `node_modules/three/examples/jsm/libs/draco/`) for
offline/air-gapped builds.

## Instanced particle field (fast for many objects)

```tsx
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D } from "three";

function Particles({ count = 800 }) {
  const ref = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const seeds = useMemo(
    () => Array.from({ length: count }, () => [Math.random(), Math.random(), Math.random()]),
    [count],
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    seeds.forEach(([x, y, z], i) => {
      dummy.position.set((x - 0.5) * 12, (y - 0.5) * 12 + Math.sin(t + i) * 0.2, (z - 0.5) * 12);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color="#60a5fa" />
    </instancedMesh>
  );
}
```

## Scroll / in-view driven animation

Match the repo's existing `IntersectionObserver` pattern (see `Hero.tsx`). Pass an
`active` flag into the scene and gate `useFrame` work on it, or set the canvas
`frameloop` to `"demand"` and call `invalidate()` on scroll.

## Handy drei helpers

- `<OrbitControls enablePan={false} enableZoom={false} autoRotate />` — drag to spin.
- `<Environment preset="city" />` — image-based lighting + reflections (presets:
  city, sunset, dawn, night, warehouse, studio, …).
- `<Float speed={2} rotationIntensity={1}>…</Float>` — gentle idle bobbing.
- `<Text>` / `<Text3D>` — 3D text.
- `<ContactShadows />` — cheap soft ground shadow without shadow maps.
- `<Html>` — render DOM elements positioned in 3D space.

## Common pitfalls

- **"window is not defined" / WebGL errors on load** → you rendered `<Canvas>`
  directly instead of through `ClientCanvas`.
- **Canvas is invisible / 0px tall** → the wrapper element has no height. Set one
  via `className` (`h-[480px]`, `h-screen`, etc.).
- **`useFrame`/`useThree` "not part of the R3F tree"** → those hooks only work in
  components rendered *inside* `<Canvas>`, not in the parent.
- **Hooks must be unconditional** → compute `prefersReducedMotion()` then branch
  *inside* `useFrame`; never wrap the hook in an `if`.
- **Type errors on intrinsics** (`<mesh>` unknown) → ensure `@react-three/fiber`
  is installed and imported; it augments JSX automatically.
