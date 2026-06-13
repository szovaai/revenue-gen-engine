# Premium presets (agency builds)

Curated, high-end looks for client websites. Each is a starting point — always
theme it to the client's brand. **Brand theming knobs:** material `color`,
`<Environment preset>` (reflections), background/`gl={{ alpha: true }}`, and the
Tailwind glow tokens already in this repo (`--glow-blue`, etc.) on the wrapper.

All snippets render inside `<ClientCanvas>` (see `assets/ClientCanvas.tsx.template`)
and respect `prefers-reduced-motion`.

---

## 1. Glass hero object (refractive showpiece)

A slowly turning frosted-glass shape over the hero. Feels expensive, reads as
"custom build". Pair with bold headline text in front.

```tsx
import { Float, Environment, MeshTransmissionMaterial } from "@react-three/drei";

function GlassShape() {
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh>
        <torusKnotGeometry args={[1, 0.32, 220, 32]} />
        <MeshTransmissionMaterial
          thickness={0.6}
          roughness={0.05}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.04}
          backside
        />
      </mesh>
    </Float>
  );
}
// Scene body: <ambientLight intensity={0.6}/> <Environment preset="city"/> <GlassShape/>
```

Theming: swap `torusKnotGeometry` for the client's logo mesh; tint via a faint
`color` on the material; pick an `Environment` preset that matches brand mood
(`studio` = clean/SaaS, `sunset` = warm/lifestyle, `night` = luxury/dark).

## 2. Animated gradient blob (organic, soft-premium)

Morphing rounded blob with a brand-gradient material. Great behind testimonials
or pricing. Use `gl={{ alpha: true }}` so it floats on the page background.

```tsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";

function Blob() {
  const ref = useRef<Mesh>(null);
  const reduce =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  useFrame((_, d) => {
    if (ref.current && !reduce) ref.current.rotation.y += d * 0.15;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.4, 64]} />
      {/* brand colors here */}
      <MeshDistortMaterial color="#6366f1" distort={0.35} speed={1.5} roughness={0.2} />
    </mesh>
  );
}
```

## 3. Floating device mockup (show the actual build)

Most persuasive for a web-design firm: float the client's site screenshot on a
device/plane so prospects see the real deliverable in 3D.

```tsx
import { Float, useTexture } from "@react-three/drei";

function DeviceScreen() {
  const tex = useTexture("/mockups/client-home.png"); // put screenshot in public/mockups/
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh rotation={[0, -0.4, 0]}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial map={tex} />
      </mesh>
    </Float>
  );
}
```

Upgrade: load a real laptop/phone `.glb` (see `patterns.md` → GLTF) and apply the
screenshot as the screen material for a fully 3D mockup.

## 4. Particle aurora (ambient hero background)

Subtle drifting particles for a premium, techy backdrop. Keep it behind content
with low opacity; transparent canvas. Use the instanced-particles snippet in
`patterns.md` (handles hundreds of points efficiently) and:

- low-saturation brand color, `meshBasicMaterial` with small spheres;
- slow `useFrame` drift, gated on reduced-motion;
- `frameloop="always"` only if visible; otherwise `"demand"`.

---

## Premium-feel checklist

- **Restraint** — one strong 3D element per page, not five. Negative space sells.
- **Lighting over geometry** — a good `<Environment>` + soft key light reads more
  expensive than a complex mesh under flat light.
- **Motion is slow and continuous**, never bouncy; always honor reduced-motion.
- **Match brand palette exactly** — pull hex values from the client's brand, not
  the defaults above.
- **Performance is part of "premium"** — cap `dpr`, lazy-load below-the-fold
  scenes, keep it 60fps on a mid laptop. A janky 3D hero feels cheap.
