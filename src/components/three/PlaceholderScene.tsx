import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
import { ClientCanvas } from "./ClientCanvas";

function RotatingCube() {
  const cubeRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    const cube = cubeRef.current;
    if (!cube) return;
    cube.rotation.x += delta * 0.35;
    cube.rotation.y += delta * 0.55;
  });

  return (
    <mesh ref={cubeRef} rotation={[0.35, 0.35, 0]}>
      <boxGeometry args={[1.35, 1.35, 1.35]} />
      <meshStandardMaterial color="#8050ff" metalness={0.65} roughness={0.2} />
    </mesh>
  );
}

export function PlaceholderScene() {
  return (
    <div
      className="mx-auto mt-10 h-52 w-full max-w-md overflow-hidden rounded-2xl border border-border bg-secondary/20"
      aria-label="Rotating 3D cube preview"
      role="img"
    >
      <ClientCanvas
        camera={{ position: [0, 0, 4], fov: 42 }}
        dpr={[1, 1.5]}
        fallback={<div className="h-full w-full animate-pulse bg-secondary/30" aria-hidden />}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 5]} intensity={3} />
        <RotatingCube />
      </ClientCanvas>
    </div>
  );
}