"use client";

import { Html, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { ReactNode } from "react";
import type { Group } from "three";
import type { StarmapColor, StarmapHighlight } from "@/lib/types";

type StarmapCanvasProps = {
  stars: StarmapHighlight[];
  activeType: string;
  hoveredStarId: string | null;
  selectedStarId: string | null;
  onHoverStar: (id: string | null) => void;
  onSelectStar: (id: string) => void;
};

const starColor: Record<StarmapColor, string> = {
  cyan: "#6de5ff",
  violet: "#a78bfa",
  amber: "#f7c76b",
  rose: "#fb7185",
  white: "#ffffff"
};

function RotatingStarGroup({ children }: { children: ReactNode }) {
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!ref.current) {
      return;
    }

    ref.current.rotation.y += delta * 0.035;
  });

  return <group ref={ref}>{children}</group>;
}

export function StarmapCanvas({
  stars,
  activeType,
  hoveredStarId,
  selectedStarId,
  onHoverStar,
  onSelectStar
}: StarmapCanvasProps) {
  const visibleStarIds = useMemo(
    () =>
      new Set(
        stars
          .filter((star) => activeType === "全部" || star.type === activeType)
          .map((star) => star.id)
      ),
    [activeType, stars]
  );

  return (
    <div
      data-visual-target="starmap-canvas"
      className="relative h-[520px] min-h-[420px] overflow-hidden rounded-lg border border-white/10 bg-space-950 lg:h-[680px]"
    >
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 48 }}
        dpr={[1, 1.5]}
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#03040b"]} />
        <fog attach="fog" args={["#03040b", 5, 9]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 4, 5]} intensity={1.2} color="#6de5ff" />
        <Stars radius={7} depth={4} count={900} factor={3.2} fade speed={0.25} />
        <RotatingStarGroup>
          {stars.map((star) => {
            const visible = visibleStarIds.has(star.id);
            const hovered = hoveredStarId === star.id;
            const selected = selectedStarId === star.id;
            const scale = selected ? 1.75 : hovered ? 1.45 : 1;
            const opacity = visible ? 1 : 0.16;

            return (
              <group key={star.id} position={star.coordinates}>
                <mesh
                  scale={scale}
                  onPointerOver={(event) => {
                    if (!visible) {
                      return;
                    }

                    event.stopPropagation();
                    onHoverStar(star.id);
                  }}
                  onPointerOut={() => onHoverStar(null)}
                  onClick={(event) => {
                    if (!visible) {
                      return;
                    }

                    event.stopPropagation();
                    onSelectStar(star.id);
                  }}
                >
                  <sphereGeometry args={[0.055, 24, 24]} />
                  <meshStandardMaterial
                    color={starColor[star.color]}
                    emissive={starColor[star.color]}
                    emissiveIntensity={selected ? 1.9 : hovered ? 1.35 : 0.85}
                    transparent
                    opacity={opacity}
                  />
                </mesh>
                {(hovered || selected) && visible ? (
                  <Html distanceFactor={7} center>
                    <div className="pointer-events-none whitespace-nowrap rounded-full border border-white/15 bg-space-950/85 px-3 py-1 text-xs text-white shadow-glow backdrop-blur">
                      {star.name}
                    </div>
                  </Html>
                ) : null}
              </group>
            );
          })}
        </RotatingStarGroup>
        <OrbitControls
          enablePan={false}
          minDistance={3.4}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.25}
        />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-space-950/90 to-transparent p-5">
        <p className="max-w-lg text-sm leading-6 text-slate-300">
          拖拽旋转星域，滚轮缩放视角。点击星点后，右侧面板会同步显示天体档案。
        </p>
      </div>
    </div>
  );
}
