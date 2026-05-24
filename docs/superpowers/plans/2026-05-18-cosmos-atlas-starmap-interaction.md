# Cosmos Atlas Phase 4 Starmap Interaction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade `/starmap` into a Chinese, local-data-driven 3D interactive star map for Cosmos Atlas.

**Architecture:** Keep `app/starmap/page.tsx` as a server page and move interactive behavior into `components/starmap/` client components. Extend local mock data with 3D coordinates and observation metadata, then render, filter, hover, select, and describe stars entirely on the client.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Three.js, `@react-three/fiber`, `@react-three/drei`, Framer Motion-compatible client component boundaries, lucide-react.

---

## File Structure

- Modify: `lib/types.ts`
  - Owns the expanded `StarmapHighlight` type and `StarmapColor` union.
- Modify: `lib/mock-data.ts`
  - Replaces the current 2D star-point mock data with 12 local 3D star entries.
- Create: `components/starmap/StarmapFilters.tsx`
  - Owns the type filter buttons and counts.
- Create: `components/starmap/StarmapLegend.tsx`
  - Owns visible count and color/type legend.
- Create: `components/starmap/StarmapDetails.tsx`
  - Owns selected-star details and accessible star selection list.
- Create: `components/starmap/StarmapCanvas.tsx`
  - Owns the Three.js scene, orbit controls, hover labels, and star click callbacks.
- Create: `components/starmap/StarmapExplorer.tsx`
  - Client container for filter, hover, selected-star state, and responsive layout.
- Modify: `app/starmap/page.tsx`
  - Replaces the static 2D star map with `StarmapExplorer`.
- Modify: `docs/superpowers/plans/2026-05-18-cosmos-atlas-starmap-interaction.md`
  - Mark checkboxes as complete during execution.

This workspace is not a Git repository, so implementation will not include `git commit` steps.

---

### Task 1: Expand Starmap Data Model

**Files:**
- Modify: `lib/types.ts`
- Modify: `lib/mock-data.ts`

- [x] **Step 1: Update the starmap type**

In `lib/types.ts`, replace the existing `StarmapHighlight` type with:

```ts
export type StarmapColor = "cyan" | "violet" | "amber" | "rose" | "white";

export type StarmapHighlight = {
  id: string;
  name: string;
  type: string;
  distance: string;
  magnitude: string;
  coordinates: [number, number, number];
  color: StarmapColor;
  region: string;
  observation: string;
  description: string;
};
```

- [x] **Step 2: Replace the local star mock data**

In `lib/mock-data.ts`, replace `starmapHighlights` with this array:

```ts
export const starmapHighlights: StarmapHighlight[] = [
  {
    id: "sirius",
    name: "天狼星",
    type: "主序星",
    distance: "8.6 光年",
    magnitude: "-1.46",
    coordinates: [1.8, -0.2, 0.4],
    color: "cyan",
    region: "大犬座方向",
    observation: "冬季夜空中最明亮的恒星之一，适合作为星图亮度参照。",
    description: "天狼星是近邻双星系统中较亮的成员，在视觉星图中可作为南天区域的高亮锚点。"
  },
  {
    id: "vega",
    name: "织女星",
    type: "主序星",
    distance: "25 光年",
    magnitude: "0.03",
    coordinates: [-1.2, 1.1, -0.3],
    color: "violet",
    region: "天琴座方向",
    observation: "夏季大三角的重要成员，亮度稳定，颜色偏冷。",
    description: "织女星常被用作光度和颜色校准参考，也适合在教学星图中解释恒星颜色。"
  },
  {
    id: "betelgeuse",
    name: "参宿四",
    type: "红超巨星",
    distance: "约 550 光年",
    magnitude: "0.0-1.6",
    coordinates: [0.2, -1.3, 1.2],
    color: "rose",
    region: "猎户座方向",
    observation: "亮度会发生变化，红色外观明显，适合解释恒星晚期演化。",
    description: "参宿四是一颗体积巨大的红超巨星，代表大质量恒星走向生命末期的阶段。"
  },
  {
    id: "polaris",
    name: "北极星",
    type: "造父变星系统",
    distance: "约 448 光年",
    magnitude: "1.98",
    coordinates: [0.1, 1.8, -0.1],
    color: "amber",
    region: "小熊座方向",
    observation: "接近北天极，常用于解释天球转动和方向定位。",
    description: "北极星并非天空中最亮的星，但它的位置让它成为北半球导航中的重要参照。"
  },
  {
    id: "altair",
    name: "牛郎星",
    type: "主序星",
    distance: "16.7 光年",
    magnitude: "0.77",
    coordinates: [1.1, 0.9, -1.2],
    color: "white",
    region: "天鹰座方向",
    observation: "夏季大三角成员之一，自转速度快。",
    description: "牛郎星距离太阳较近，在交互星图中适合展示近邻恒星和季节星空联系。"
  },
  {
    id: "alpha-centauri",
    name: "南门二",
    type: "三合星系统",
    distance: "4.37 光年",
    magnitude: "-0.27",
    coordinates: [-1.6, -0.7, 0.7],
    color: "cyan",
    region: "半人马座方向",
    observation: "太阳最近的恒星系统，适合作为近邻距离尺度参照。",
    description: "南门二系统包含多颗恒星，其中比邻星是距离太阳最近的已知恒星。"
  },
  {
    id: "andromeda",
    name: "仙女座星系",
    type: "星系",
    distance: "约 254 万光年",
    magnitude: "3.44",
    coordinates: [-2.2, 0.4, -1.4],
    color: "violet",
    region: "仙女座方向",
    observation: "肉眼可见的河外星系之一，适合解释银河系外尺度。",
    description: "仙女座星系是本星系群的重要成员，也会在遥远未来与银河系发生并合。"
  },
  {
    id: "pleiades",
    name: "昴星团",
    type: "疏散星团",
    distance: "约 444 光年",
    magnitude: "1.6",
    coordinates: [1.7, 0.6, -0.8],
    color: "cyan",
    region: "金牛座方向",
    observation: "年轻恒星聚集明显，蓝白色成员星适合解释星团形成。",
    description: "昴星团由一批年轻恒星组成，是理解恒星共同诞生和早期演化的经典目标。"
  },
  {
    id: "orion-nebula",
    name: "猎户座大星云",
    type: "星云",
    distance: "约 1344 光年",
    magnitude: "4.0",
    coordinates: [0.6, -1.5, 0.9],
    color: "rose",
    region: "猎户座方向",
    observation: "恒星形成区明亮，适合展示气体云、尘埃和新生恒星。",
    description: "猎户座大星云是距离较近的大质量恒星形成区，能直观展示恒星诞生环境。"
  },
  {
    id: "crab-nebula",
    name: "蟹状星云",
    type: "超新星遗迹",
    distance: "约 6500 光年",
    magnitude: "8.4",
    coordinates: [-0.8, -1.0, -1.5],
    color: "amber",
    region: "金牛座方向",
    observation: "中心脉冲星和扩张遗迹适合解释高能天体过程。",
    description: "蟹状星云来自一次历史超新星爆发，遗迹中包含高速粒子和强辐射结构。"
  },
  {
    id: "deneb",
    name: "天津四",
    type: "蓝白超巨星",
    distance: "约 2600 光年",
    magnitude: "1.25",
    coordinates: [-1.5, 1.3, 0.9],
    color: "white",
    region: "天鹅座方向",
    observation: "距离远但仍然明亮，适合解释恒星本征亮度。",
    description: "天津四是非常明亮的超巨星，说明视亮度同时受距离和真实光度影响。"
  },
  {
    id: "rigel",
    name: "参宿七",
    type: "蓝超巨星",
    distance: "约 860 光年",
    magnitude: "0.13",
    coordinates: [1.0, -1.1, 1.6],
    color: "violet",
    region: "猎户座方向",
    observation: "蓝白色亮星，常与参宿四形成颜色和演化阶段对比。",
    description: "参宿七是一颗高温蓝超巨星，适合与红超巨星参宿四一起解释恒星颜色差异。"
  }
];
```

- [x] **Step 3: Run typecheck after data changes**

Run:

```powershell
npm.cmd run typecheck
```

Expected: exit code `0`.

Execution note: the intermediate check exposed the old static page still reading `x/y`; after wiring the new `/starmap` implementation, `npm.cmd run typecheck` passed with exit code `0`.

---

### Task 2: Add Starmap Panel Components

**Files:**
- Create: `components/starmap/StarmapFilters.tsx`
- Create: `components/starmap/StarmapLegend.tsx`
- Create: `components/starmap/StarmapDetails.tsx`

- [x] **Step 1: Create `StarmapFilters.tsx`**

```tsx
import type { StarmapHighlight } from "@/lib/types";

type StarmapFiltersProps = {
  stars: StarmapHighlight[];
  activeType: string;
  onTypeChange: (type: string) => void;
};

export function StarmapFilters({ stars, activeType, onTypeChange }: StarmapFiltersProps) {
  const counts = stars.reduce<Record<string, number>>((acc, star) => {
    acc[star.type] = (acc[star.type] ?? 0) + 1;
    return acc;
  }, {});
  const types = Object.keys(counts);

  return (
    <div>
      <p className="text-sm font-medium text-slate-400">筛选天体类型</p>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        <button
          type="button"
          onClick={() => onTypeChange("全部")}
          className={[
            "shrink-0 rounded-full border px-4 py-2 text-sm transition",
            activeType === "全部"
              ? "border-nebula-cyan/60 bg-nebula-cyan/15 text-nebula-cyan"
              : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25"
          ].join(" ")}
        >
          全部 · {stars.length}
        </button>
        {types.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onTypeChange(type)}
            className={[
              "shrink-0 rounded-full border px-4 py-2 text-sm transition",
              activeType === type
                ? "border-nebula-cyan/60 bg-nebula-cyan/15 text-nebula-cyan"
                : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25"
            ].join(" ")}
          >
            {type} · {counts[type]}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [x] **Step 2: Create `StarmapLegend.tsx`**

```tsx
import type { StarmapColor, StarmapHighlight } from "@/lib/types";

type StarmapLegendProps = {
  stars: StarmapHighlight[];
  visibleCount: number;
};

const colorClassName: Record<StarmapColor, string> = {
  cyan: "bg-nebula-cyan",
  violet: "bg-nebula-violet",
  amber: "bg-nebula-amber",
  rose: "bg-nebula-rose",
  white: "bg-white"
};

export function StarmapLegend({ stars, visibleCount }: StarmapLegendProps) {
  const legend = stars.reduce<Partial<Record<StarmapColor, string>>>((acc, star) => {
    acc[star.color] = star.type;
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-slate-400">当前可见</p>
        <p className="mt-1 text-3xl font-semibold text-white">{visibleCount}</p>
      </div>
      <div className="space-y-2">
        {Object.entries(legend).map(([color, label]) => (
          <div key={color} className="flex items-center gap-2 text-sm text-slate-300">
            <span
              className={[
                "h-2.5 w-2.5 rounded-full shadow-[0_0_18px_currentColor]",
                colorClassName[color as StarmapColor]
              ].join(" ")}
            />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [x] **Step 3: Create `StarmapDetails.tsx`**

```tsx
import { Telescope } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import type { StarmapHighlight } from "@/lib/types";

type StarmapDetailsProps = {
  stars: StarmapHighlight[];
  selectedStar: StarmapHighlight | undefined;
  onSelectStar: (id: string) => void;
};

export function StarmapDetails({ stars, selectedStar, onSelectStar }: StarmapDetailsProps) {
  if (!selectedStar) {
    return (
      <GlassCard className="p-5">
        <div className="flex items-center gap-2 text-nebula-cyan">
          <Telescope size={18} />
          <p className="text-sm font-medium">暂无可展示天体</p>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          当前筛选结果为空。切换筛选后可继续查看星图详情。
        </p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-nebula-cyan">{selectedStar.type}</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">{selectedStar.name}</h2>
        </div>
        <Telescope className="mt-1 text-nebula-cyan" size={22} />
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{selectedStar.description}</p>
      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-slate-500">距离</dt>
          <dd className="mt-1 text-slate-200">{selectedStar.distance}</dd>
        </div>
        <div>
          <dt className="text-slate-500">视星等</dt>
          <dd className="mt-1 text-slate-200">{selectedStar.magnitude}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-slate-500">观测方向</dt>
          <dd className="mt-1 text-slate-200">{selectedStar.region}</dd>
        </div>
      </dl>
      <div className="mt-5 rounded-lg border border-white/10 bg-space-900/70 p-4">
        <p className="text-sm font-medium text-white">观测提示</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">{selectedStar.observation}</p>
      </div>
      <div className="mt-5">
        <p className="text-sm font-medium text-slate-400">当前列表</p>
        <div className="mt-3 grid gap-2">
          {stars.map((star) => (
            <button
              key={star.id}
              type="button"
              aria-label={`查看${star.name}`}
              onClick={() => onSelectStar(star.id)}
              className={[
                "flex items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition",
                selectedStar.id === star.id
                  ? "border-nebula-cyan/50 bg-nebula-cyan/10 text-white"
                  : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25"
              ].join(" ")}
            >
              <span>{star.name}</span>
              <span className="text-xs text-slate-500">{star.type}</span>
            </button>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
```

- [x] **Step 4: Run typecheck after panel components**

Run:

```powershell
npm.cmd run typecheck
```

Expected: exit code `0`.

Execution note: this verification was covered by the final `npm.cmd run typecheck` after page wiring, because the old static page intentionally remained broken until Task 5 replaced it.

---

### Task 3: Add Three.js Starmap Canvas

**Files:**
- Create: `components/starmap/StarmapCanvas.tsx`

- [x] **Step 1: Create the canvas component**

```tsx
"use client";

import { Html, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
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

function RotatingStarGroup({ children }: { children: React.ReactNode }) {
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
    () => new Set(stars.filter((star) => activeType === "全部" || star.type === activeType).map((star) => star.id)),
    [activeType, stars]
  );

  return (
    <div className="relative h-[520px] min-h-[420px] overflow-hidden rounded-lg border border-white/10 bg-space-950 lg:h-[680px]">
      <Canvas camera={{ position: [0, 0, 5.8], fov: 48 }} dpr={[1, 1.5]}>
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
        <OrbitControls enablePan={false} minDistance={3.4} maxDistance={8} autoRotate autoRotateSpeed={0.25} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-space-950/90 to-transparent p-5">
        <p className="max-w-lg text-sm leading-6 text-slate-300">
          拖拽旋转星域，滚轮缩放视角。点击星点后，右侧面板会同步显示天体档案。
        </p>
      </div>
    </div>
  );
}
```

- [x] **Step 2: Run typecheck after canvas**

Run:

```powershell
npm.cmd run typecheck
```

Expected: exit code `0`.

Execution note: this verification was covered by the final `npm.cmd run typecheck` after the canvas and explorer were wired together.

---

### Task 4: Add Client Explorer Container

**Files:**
- Create: `components/starmap/StarmapExplorer.tsx`

- [x] **Step 1: Create `StarmapExplorer.tsx`**

```tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { GlassCard } from "@/components/common/GlassCard";
import { StarmapCanvas } from "@/components/starmap/StarmapCanvas";
import { StarmapDetails } from "@/components/starmap/StarmapDetails";
import { StarmapFilters } from "@/components/starmap/StarmapFilters";
import { StarmapLegend } from "@/components/starmap/StarmapLegend";
import type { StarmapHighlight } from "@/lib/types";

type StarmapExplorerProps = {
  stars: StarmapHighlight[];
};

export function StarmapExplorer({ stars }: StarmapExplorerProps) {
  const [activeType, setActiveType] = useState("全部");
  const [hoveredStarId, setHoveredStarId] = useState<string | null>(null);
  const [selectedStarId, setSelectedStarId] = useState<string | null>(stars[0]?.id ?? null);

  const visibleStars = useMemo(
    () => stars.filter((star) => activeType === "全部" || star.type === activeType),
    [activeType, stars]
  );

  useEffect(() => {
    if (visibleStars.length === 0) {
      setSelectedStarId(null);
      return;
    }

    if (!selectedStarId || !visibleStars.some((star) => star.id === selectedStarId)) {
      setSelectedStarId(visibleStars[0].id);
    }
  }, [selectedStarId, visibleStars]);

  const selectedStar = visibleStars.find((star) => star.id === selectedStarId);

  return (
    <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)_340px]">
      <GlassCard className="p-5 xl:sticky xl:top-24 xl:self-start">
        <StarmapFilters stars={stars} activeType={activeType} onTypeChange={setActiveType} />
        <div className="mt-6 border-t border-white/10 pt-6">
          <StarmapLegend stars={stars} visibleCount={visibleStars.length} />
        </div>
      </GlassCard>

      <StarmapCanvas
        stars={stars}
        activeType={activeType}
        hoveredStarId={hoveredStarId}
        selectedStarId={selectedStarId}
        onHoverStar={setHoveredStarId}
        onSelectStar={setSelectedStarId}
      />

      <div className="xl:sticky xl:top-24 xl:self-start">
        <StarmapDetails stars={visibleStars} selectedStar={selectedStar} onSelectStar={setSelectedStarId} />
      </div>
    </div>
  );
}
```

- [x] **Step 2: Run typecheck after explorer**

Run:

```powershell
npm.cmd run typecheck
```

Expected: exit code `0`.

Execution note: this verification was covered by the final `npm.cmd run typecheck` after `/starmap` was connected to `StarmapExplorer`.

---

### Task 5: Wire `/starmap` Page

**Files:**
- Modify: `app/starmap/page.tsx`

- [x] **Step 1: Replace the static page body**

Use this implementation:

```tsx
import { Crosshair } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import { PageHero } from "@/components/common/PageHero";
import { StarmapExplorer } from "@/components/starmap/StarmapExplorer";
import { starmapHighlights } from "@/lib/mock-data";

export default function StarmapPage() {
  return (
    <section className="mx-auto w-full max-w-[1500px] px-5 py-16 sm:px-8 lg:px-10">
      <PageHero
        eyebrow="交互星图"
        title="在可旋转的近邻星域中选择目标。"
        description="Cosmos Atlas 先用本地模拟星表搭建交互骨架：筛选天体类型、旋转星域、点击星点，并在详情面板中阅读观测线索。"
        icon={Crosshair}
        tone="cyan"
      >
        <GlassCard className="p-5">
          <p className="text-sm text-slate-400">当前星图样本</p>
          <div className="mt-3 text-3xl font-semibold text-white">{starmapHighlights.length} 个目标</div>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            坐标为界面模拟数据，用来验证筛选、选中和 3D 空间布局，不代表真实天球坐标。
          </p>
        </GlassCard>
      </PageHero>

      <StarmapExplorer stars={starmapHighlights} />
    </section>
  );
}
```

- [x] **Step 2: Run typecheck after page wiring**

Run:

```powershell
npm.cmd run typecheck
```

Expected: exit code `0`.

---

### Task 6: Verify Build And Runtime

**Files:**
- Modify: `docs/superpowers/plans/2026-05-18-cosmos-atlas-starmap-interaction.md`

- [x] **Step 1: Run production build**

Run:

```powershell
npm.cmd run build
```

Expected: exit code `0`, with `/starmap` listed as a static route.

- [x] **Step 2: Request `/starmap` on a temporary dev server**

Run:

```powershell
node -e "const {spawn}=require('child_process'); const port=3016; const route='/starmap'; const child=spawn(process.execPath,['D:\\\\universe\\\\scripts\\\\run-next.mjs','dev','--webpack','--hostname','127.0.0.1','--port',String(port)],{cwd:'D:\\\\universe',stdio:['ignore','pipe','pipe'],windowsHide:true}); let logs=''; let started=false; const done=(code)=>{try{child.kill()}catch{} process.exit(code)}; child.stdout.on('data',d=>{logs+=d; process.stdout.write(d); if(logs.includes('Ready')) run();}); child.stderr.on('data',d=>process.stderr.write(d)); child.on('exit',(code)=>{ if(!started) { console.error('server exited before ready', code); process.exit(1); }}); async function run(){ if(started) return; started=true; try { const res=await fetch('http://127.0.0.1:'+port+route); const text=await res.text(); console.log(route+' '+res.status); console.log(JSON.stringify({hasChinese:text.includes('交互星图') || text.includes('近邻星域'), hasBrand:text.includes('Cosmos Atlas')})); if(!res.ok) throw new Error(route+' returned '+res.status); done(0); } catch (error) { console.error(error); done(1); } } setTimeout(()=>{console.error('Timed out waiting for dev server'); done(1);},30000);"
```

Expected:

```text
/starmap 200
{"hasChinese":true,"hasBrand":true}
```

Execution note: the route request returned `/starmap 200` and `{"hasChinese":true,"hasBrand":true}`. The command process then exited `1` because Windows/Node asserted while terminating the temporary Next dev process, not because the route check failed.

- [x] **Step 3: Verify existing browser port**

Run:

```powershell
try { $response = Invoke-WebRequest -Uri 'http://127.0.0.1:3001/starmap' -UseBasicParsing -TimeoutSec 20; [PSCustomObject]@{ StatusCode = $response.StatusCode; Chinese = ($response.Content -like '*交互星图*' -or $response.Content -like '*近邻星域*'); Brand = ($response.Content -like '*Cosmos Atlas*') } } catch { $_.Exception.Message; exit 1 }
```

Expected: `StatusCode` is `200`, `Chinese` is `True`, and `Brand` is `True`.

- [x] **Step 4: Visual canvas review**

Use the in-app browser to open:

```text
http://127.0.0.1:3001/starmap
```

Review at desktop width and a narrow mobile width. Expected:

- The 3D canvas is nonblank and occupies the main visual area.
- Dragging the star field rotates the view.
- Clicking a visible star updates the detail panel.
- Filter buttons update the visible count and detail panel.
- No panel text overlaps or overflows on the mobile layout.

Execution note: added `npm.cmd run visual:starmap`, which uses the installed system Chrome/Edge executable through `@playwright/test`. The review generated desktop/mobile page screenshots plus canvas crops and passed with `failures: []`.

- [x] **Step 5: Mark this plan complete**

Use `apply_patch` to update all checkboxes in this file from `[ ]` to `[x]` only after the corresponding implementation and verification steps pass.
