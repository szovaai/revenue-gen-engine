import { Float, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import { ClientCanvas } from "./ClientCanvas";

function ChromeMark() {
  const mark = useRef<Group>(null);
  const gem = useRef<Mesh>(null);
  const { pointer } = useThree();

  useFrame(({ clock }, delta) => {
    const group = mark.current;
    const jewel = gem.current;
    if (!group || !jewel) return;
    group.rotation.y += delta * 0.08;
    group.rotation.x += (pointer.y * 0.08 - group.rotation.x) * 0.04;
    group.rotation.z += (-pointer.x * 0.08 - group.rotation.z) * 0.04;
    jewel.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2.2) * 0.04);
  });

  return (
    <group ref={mark} position={[0, 0.65, 0]} scale={0.82}>
      <mesh position={[-0.68, 0, 0]} rotation={[0, 0, -0.58]}>
        <boxGeometry args={[0.32, 2.65, 0.35]} />
        <meshStandardMaterial color="#f4f6ff" metalness={1} roughness={0.12} />
      </mesh>
      <mesh position={[0.68, 0, 0]} rotation={[0, 0, 0.58]}>
        <boxGeometry args={[0.32, 2.65, 0.35]} />
        <meshStandardMaterial color="#c8cce0" metalness={1} roughness={0.14} />
      </mesh>
      <mesh position={[-0.28, -0.35, 0.02]} rotation={[0, 0, 0.46]}>
        <boxGeometry args={[0.24, 1.55, 0.3]} />
        <meshStandardMaterial color="#8a8fa8" metalness={1} roughness={0.16} />
      </mesh>
      <mesh position={[0.28, -0.35, 0.02]} rotation={[0, 0, -0.46]}>
        <boxGeometry args={[0.24, 1.55, 0.3]} />
        <meshStandardMaterial color="#f4f6ff" metalness={1} roughness={0.12} />
      </mesh>
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.35}>
        <mesh ref={gem} position={[0, 1.82, 0]} rotation={[0.2, 0.45, 0]}>
          <octahedronGeometry args={[0.3, 0]} />
          <MeshTransmissionMaterial
            color="#8b00ff"
            emissive="#7c3aed"
            emissiveIntensity={4}
            transmission={0.75}
            thickness={0.5}
            roughness={0.05}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Mountain() {
  const peaks = useMemo(
    () => [
      [-3.6, -3.3, -2.2, 2.4, 5.8],
      [-1.9, -3.45, -1.1, 2.7, 6.6],
      [0.1, -3.6, -2.5, 3.4, 7.5],
      [2.4, -3.5, -1.7, 2.9, 6.4],
      [4.2, -3.6, -3, 2.5, 5.5],
    ],
    [],
  );

  return (
    <group>
      {peaks.map(([x, y, z, radius, height], index) => (
        <mesh key={index} position={[x, y, z]} rotation={[0, index * 0.42, 0]}>
          <coneGeometry args={[radius, height, 7, 2]} />
          <meshStandardMaterial
            color={index === 2 ? "#131128" : "#0d0b1f"}
            roughness={0.82}
            metalness={0.18}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  const { camera } = useThree();

  useFrame(() => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = window.scrollY / max;
    camera.position.y += (0.2 + progress * 2.2 - camera.position.y) * 0.035;
    camera.position.z += (7.2 - progress * 1.2 - camera.position.z) * 0.035;
    camera.lookAt(0, 0.3 + progress, 0);
  });

  return (
    <>
      <fog attach="fog" args={["#07060f", 5.5, 13]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[-4, 6, 5]} color="#dcecff" intensity={4} />
      <pointLight position={[0, 3, 1]} color="#7c3aed" intensity={28} distance={9} />
      <pointLight position={[4, -1, 2]} color="#00b4ff" intensity={12} distance={10} />
      <Mountain />
      <ChromeMark />
      <Sparkles count={55} scale={[10, 7, 6]} size={1.1} speed={0.18} color="#8a8fa8" opacity={0.42} />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.75} luminanceThreshold={0.85} mipmapBlur />
        <Vignette eskil={false} offset={0.18} darkness={0.72} />
      </EffectComposer>
    </>
  );
}

export function AscentScene() {
  return (
    <ClientCanvas
      camera={{ position: [0, 0.2, 7.2], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      fallback={null}
    >
      <Scene />
    </ClientCanvas>
  );
}