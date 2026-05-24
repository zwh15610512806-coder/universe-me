"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import type { Points as ThreePoints } from "three";

function createStarPositions(count: number) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const radius = 3.2 + ((i * 37) % 100) / 24;
    const theta = i * 2.399963229728653;
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }

  return positions;
}

function StarField() {
  const ref = useRef<ThreePoints>(null);
  const positions = useMemo(() => createStarPositions(1100), []);

  useFrame((_, delta) => {
    if (!ref.current) {
      return;
    }

    ref.current.rotation.y += delta * 0.015;
    ref.current.rotation.x += delta * 0.004;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#dff8ff"
        size={0.014}
        sizeAttenuation
        depthWrite={false}
        opacity={0.72}
      />
    </Points>
  );
}

export function StarBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-space-950">
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 58 }}
        dpr={[1, 1.5]}
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#03040b"]} />
        <fog attach="fog" args={["#03040b", 4.2, 7.4]} />
        <StarField />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(109,229,255,0.16),transparent_28%),linear-gradient(180deg,transparent,rgba(3,4,11,0.92)_76%)]" />
    </div>
  );
}
