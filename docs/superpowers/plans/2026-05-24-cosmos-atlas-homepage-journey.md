# Cosmos Atlas Homepage Journey Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/` as an immersive `A2-2 Pro` cosmic journey map and align Navbar/Footer visual details without changing other page bodies.

**Architecture:** Keep the home route as a server-rendered shell that composes focused components. Move reusable journey route data into `lib/mock-data.ts`, keep motion inside client components, and add a homepage-specific Playwright visual review script using the existing system-browser pattern.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, lucide-react, existing local mock data, existing Playwright system Chrome/Edge visual review pattern.

---

## File Structure

- Modify: `lib/types.ts`
  - Add `HomeJourneyRoute` and `HomeHeroSpotlight` types.
- Modify: `lib/mock-data.ts`
  - Add `homeJourneyRoutes`.
  - Add `homeHeroSpotlight`.
  - Refresh home-only Chinese copy for `homeStats`, `homeFeatures`, and `featuredExplorations` where needed.
- Create: `components/home/JourneyRouteMap.tsx`
  - Route map component for the hero.
- Modify: `components/home/HeroSection.tsx`
  - Replace split orbit hero with cinematic journey opening.
- Modify: `components/home/FeaturedExploration.tsx`
  - Reframe section as recommended next stops.
- Modify: `components/home/FeatureGrid.tsx`
  - Reframe section as complete route index.
- Modify: `components/layout/Navbar.tsx`
  - Refine visual style and fix Chinese accessibility labels.
- Modify: `components/common/Footer.tsx`
  - Rebuild as compact site map and mock-data status footer.
- Create: `scripts/visual-review-homepage.mjs`
  - Validate `/` desktop and mobile screenshots, Chinese text, six route links, and horizontal overflow.
- Modify: `package.json`
  - Add `visual:home` script.

This workspace uses a temporary Git metadata directory `.codex-git` for GitHub upload. Do not edit `.codex-git`, `.gh-config`, `.superpowers`, or generated artifacts.

---

### Task 1: Add Home Journey Data

**Files:**
- Modify: `lib/types.ts`
- Modify: `lib/mock-data.ts`

- [x] **Step 1: Add home journey types**

In `lib/types.ts`, add these types after `HomeFeature`:

```ts
export type HomeJourneyRoute = {
  label: string;
  eyebrow: string;
  description: string;
  href: string;
  accent: AccentTone;
  icon: LucideIcon;
};

export type HomeHeroSpotlight = {
  label: string;
  title: string;
  description: string;
  href: string;
  metrics: DetailItem[];
};
```

Because `HomeJourneyRoute` references `AccentTone`, keep `AccentTone` declared before `HomeJourneyRoute`. The final order near the top of `lib/types.ts` should be:

```ts
export type AccentTone = "cyan" | "violet" | "amber" | "rose";

export type NavItem = {
  label: string;
  href: string;
};
```

Then keep `HomeJourneyRoute` after `HomeFeature`.

- [x] **Step 2: Update type imports in mock data**

In `lib/mock-data.ts`, update the type import block so it includes the new types:

```ts
import type {
  CosmicEvent,
  FeaturedExploration,
  GalleryImage,
  HomeFeature,
  HomeHeroSpotlight,
  HomeJourneyRoute,
  InsightCard,
  Mission,
  NavItem,
  StarmapHighlight,
  StatItem,
  StructureLevel
} from "@/lib/types";
```

Update the lucide import so it includes the route-map icons:

```ts
import {
  Aperture,
  Clock3,
  GalleryHorizontalEnd,
  Home,
  Milestone,
  Network,
  Radar,
  Rocket,
  Sparkles
} from "lucide-react";
```

- [x] **Step 3: Add `homeJourneyRoutes`**

Add this export near `homeFeatures`:

```ts
export const homeJourneyRoutes: HomeJourneyRoute[] = [
  {
    label: "首页",
    eyebrow: "起点",
    description: "从一条清晰路线进入 Cosmos Atlas。",
    href: "/",
    accent: "cyan",
    icon: Home
  },
  {
    label: "人类探索",
    eyebrow: "任务",
    description: "追踪人类离开地球后的关键节点。",
    href: "/missions",
    accent: "amber",
    icon: Rocket
  },
  {
    label: "宇宙时间线",
    eyebrow: "深时",
    description: "把宇宙历史压缩成可阅读的阶段。",
    href: "/cosmic-timeline",
    accent: "violet",
    icon: Clock3
  },
  {
    label: "结构层级",
    eyebrow: "尺度",
    description: "从行星一路放大到宇宙网。",
    href: "/structure",
    accent: "rose",
    icon: Network
  },
  {
    label: "交互星图",
    eyebrow: "星空",
    description: "在三维星图中定位恒星和深空目标。",
    href: "/starmap",
    accent: "cyan",
    icon: Radar
  },
  {
    label: "图像库",
    eyebrow: "影像",
    description: "用图像理解星云、星系和小天体。",
    href: "/gallery",
    accent: "amber",
    icon: GalleryHorizontalEnd
  }
];
```

- [x] **Step 4: Add `homeHeroSpotlight`**

Add this export near `featuredExplorations`:

```ts
export const homeHeroSpotlight: HomeHeroSpotlight = {
  label: "今日推荐探索",
  title: "从宇宙微波背景开始阅读深时",
  description:
    "先进入宇宙历史时间线，观察第一束自由传播的光如何成为今天理解早期宇宙的关键证据。",
  href: "/cosmic-timeline",
  metrics: [
    { label: "入口", value: "宇宙时间线" },
    { label: "线索", value: "宇宙微波背景" },
    { label: "尺度", value: "约 138 亿年" }
  ]
};
```

- [x] **Step 5: Refresh home-only visible copy**

Keep existing data shape but ensure these home data exports contain readable Chinese:

```ts
export const homeStats: StatItem[] = [
  { label: "探索模块", value: "6", detail: "任务、时间线、结构、星图和图像库" },
  { label: "本地条目", value: "40+", detail: "全部页面先由 mock 数据驱动" },
  { label: "视觉系统", value: "3D", detail: "星场、玻璃面板和深空动效" }
];
```

For `featuredExplorations`, use:

```ts
export const featuredExplorations: FeaturedExploration[] = [
  {
    label: "推荐任务",
    title: "阿波罗 11 号",
    description: "从地月空间的工程协同理解载人深空探索。",
    href: "/missions/apollo-11"
  },
  {
    label: "推荐图像",
    title: "星系团透镜",
    description: "通过引力透镜理解星系团质量和暗物质线索。",
    href: "/gallery/cluster-lens"
  },
  {
    label: "推荐阶段",
    title: "宇宙变得透明",
    description: "宇宙微波背景是读取早期宇宙状态的核心窗口。",
    href: "/cosmic-timeline"
  }
];
```

- [x] **Step 6: Verify data types**

Run:

```powershell
npm.cmd run typecheck
```

Expected: exit code `0`.

---

### Task 2: Create Journey Route Map Component

**Files:**
- Create: `components/home/JourneyRouteMap.tsx`

- [x] **Step 1: Create route map component**

Create `components/home/JourneyRouteMap.tsx`:

```tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { HomeJourneyRoute } from "@/lib/types";

const accentClassMap: Record<HomeJourneyRoute["accent"], string> = {
  cyan: "border-nebula-cyan/35 bg-nebula-cyan/10 text-nebula-cyan",
  violet: "border-nebula-violet/35 bg-nebula-violet/10 text-nebula-violet",
  amber: "border-nebula-amber/35 bg-nebula-amber/10 text-nebula-amber",
  rose: "border-nebula-rose/35 bg-nebula-rose/10 text-nebula-rose"
};

type JourneyRouteMapProps = {
  routes: HomeJourneyRoute[];
};

export function JourneyRouteMap({ routes }: JourneyRouteMapProps) {
  return (
    <div
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
      data-visual-target="home-journey-routes"
    >
      {routes.map((route, index) => {
        const Icon = route.icon;

        return (
          <Link
            key={route.href}
            href={route.href}
            className="group relative min-h-32 overflow-hidden rounded-lg border border-white/10 bg-space-950/45 p-4 shadow-inner-glass outline-none backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.07] focus-visible:border-nebula-cyan focus-visible:ring-2 focus-visible:ring-nebula-cyan/30"
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${accentClassMap[route.accent]}`}
              >
                <Icon size={18} />
              </span>
              <span className="text-xs text-slate-500">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="mt-5">
              <p className="text-xs tracking-[0.22em] text-slate-500">{route.eyebrow}</p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-white">{route.label}</h3>
                <ArrowUpRight
                  size={16}
                  className="text-slate-500 transition group-hover:text-white"
                />
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-300">{route.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
```

- [x] **Step 2: Verify component importability**

Run:

```powershell
npm.cmd run typecheck
```

Expected: exit code `0` or only failures caused by Task 3 not yet wiring the component. Fix any errors from `JourneyRouteMap.tsx` before continuing.

---

### Task 3: Rebuild Home Hero

**Files:**
- Modify: `components/home/HeroSection.tsx`

- [x] **Step 1: Replace hero imports**

Replace the current imports in `components/home/HeroSection.tsx` with:

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Orbit, Sparkles } from "lucide-react";
import { JourneyRouteMap } from "@/components/home/JourneyRouteMap";
import { homeHeroSpotlight, homeJourneyRoutes } from "@/lib/mock-data";
```

- [x] **Step 2: Replace the hero component**

Replace the full `HeroSection` body with:

```tsx
export function HeroSection() {
  return (
    <section
      className="relative isolate -mx-5 min-h-[calc(100vh-4rem)] overflow-hidden px-5 pb-12 pt-16 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10 lg:pb-16 lg:pt-20"
      data-visual-target="home-hero"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,rgba(109,229,255,0.18),transparent_30%),radial-gradient(circle_at_72%_24%,rgba(167,139,250,0.16),transparent_28%),radial-gradient(circle_at_52%_78%,rgba(247,199,107,0.12),transparent_32%),linear-gradient(180deg,rgba(3,4,11,0.28),#03040b_82%)]" />
      <div className="cosmic-grid absolute inset-0 -z-10 opacity-70" />
      <div className="absolute left-1/2 top-20 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full border border-white/10 bg-radial-orbit opacity-70 blur-sm" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-space-950 to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl pt-8 lg:pb-8"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm text-nebula-cyan shadow-inner-glass backdrop-blur-xl">
            <Sparkles size={16} />
            宇宙旅程入口
          </div>
          <p className="text-sm font-semibold tracking-[0.34em] text-slate-400">
            Cosmos Atlas
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
            沿着光、时间和尺度进入可观测宇宙。
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            从人类探索、宇宙历史、结构层级、交互星图到天文图像库，Cosmos Atlas
            把深空知识组织成一条清晰的中文探索路线。
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/starmap"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-nebula-cyan px-5 py-3 text-sm font-semibold text-space-950 outline-none transition hover:bg-white focus-visible:ring-2 focus-visible:ring-nebula-cyan/50"
            >
              打开交互星图
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/cosmic-timeline"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white outline-none transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30"
            >
              浏览宇宙时间线
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: "easeOut" }}
          className="min-w-0"
        >
          <div className="mb-4 flex items-center gap-3 text-sm text-slate-400">
            <Orbit size={17} className="text-nebula-amber" />
            六个探索入口按旅程顺序展开
          </div>
          <JourneyRouteMap routes={homeJourneyRoutes} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
        className="mx-auto mt-8 w-full max-w-7xl"
      >
        <Link
          href={homeHeroSpotlight.href}
          className="group grid gap-4 rounded-lg border border-white/10 bg-space-950/55 p-5 shadow-inner-glass outline-none backdrop-blur-xl transition hover:border-nebula-cyan/40 hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-nebula-cyan/30 lg:grid-cols-[1fr_auto]"
          data-visual-target="home-spotlight"
        >
          <div>
            <p className="text-sm font-medium text-nebula-cyan">{homeHeroSpotlight.label}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{homeHeroSpotlight.title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              {homeHeroSpotlight.description}
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:min-w-[25rem]">
            {homeHeroSpotlight.metrics.map((item) => (
              <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className="mt-1 text-sm font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
```

- [x] **Step 3: Verify hero wiring**

Run:

```powershell
npm.cmd run typecheck
```

Expected: exit code `0`.

---

### Task 4: Align Home Supporting Sections

**Files:**
- Modify: `components/home/FeaturedExploration.tsx`
- Modify: `components/home/FeatureGrid.tsx`
- Modify: `app/page.tsx`

- [x] **Step 1: Update `FeaturedExploration` copy**

In `components/home/FeaturedExploration.tsx`, update the `SectionHeader` props to:

```tsx
<SectionHeader
  eyebrow="推荐下一站"
  title="从一个任务、一张图像和一个时间节点继续深入。"
  description="首页第一屏给出路线，这里给出更具体的起点，让探索可以马上进入一个真实页面。"
/>
```

Keep the card map and links unchanged.

- [x] **Step 2: Update `FeatureGrid` copy and section spacing**

In `components/home/FeatureGrid.tsx`, change the section opening to:

```tsx
<section className="pb-10" data-visual-target="home-route-index">
  <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
    <div>
      <p className="text-sm tracking-[0.28em] text-nebula-cyan">完整路线索引</p>
      <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
        选择一种方式继续进入宇宙。
      </h2>
    </div>
    <p className="max-w-xl text-sm leading-6 text-slate-400">
      每个入口都使用本地 mock 数据支撑，后续可以继续扩展为更完整的天文档案和交互工具。
    </p>
  </div>
```

Keep the existing card map. Change each `GlassCard` class from:

```tsx
<GlassCard className="flex h-full min-h-64 flex-col p-5">
```

to:

```tsx
<GlassCard className="flex h-full min-h-64 flex-col p-5 transition group-hover:border-nebula-cyan/30 group-hover:bg-white/[0.07]">
```

- [x] **Step 3: Adjust home page vertical rhythm**

In `app/page.tsx`, change the wrapper class from:

```tsx
className="mx-auto flex w-full max-w-7xl flex-col px-5 pb-20 pt-10 sm:px-8 lg:px-10"
```

to:

```tsx
className="flex w-full flex-col overflow-hidden"
```

Wrap the supporting sections after `HeroSection` in a constrained container:

```tsx
<div className="mx-auto flex w-full max-w-7xl flex-col px-5 pb-20 sm:px-8 lg:px-10">
  <section className="pb-12 pt-10">
    <MetricGrid items={homeStats} />
  </section>
  <FeaturedExploration />
  <FeatureGrid />
</div>
```

The full return should be:

```tsx
return (
  <div className="flex w-full flex-col overflow-hidden">
    <HeroSection />
    <div className="mx-auto flex w-full max-w-7xl flex-col px-5 pb-20 sm:px-8 lg:px-10">
      <section className="pb-12 pt-10">
        <MetricGrid items={homeStats} />
      </section>
      <FeaturedExploration />
      <FeatureGrid />
    </div>
  </div>
);
```

- [x] **Step 4: Verify home sections**

Run:

```powershell
npm.cmd run typecheck
```

Expected: exit code `0`.

---

### Task 5: Refine Navbar And Footer

**Files:**
- Modify: `components/layout/Navbar.tsx`
- Modify: `components/common/Footer.tsx`

- [x] **Step 1: Update Navbar header visual style**

In `components/layout/Navbar.tsx`, change the header class to:

```tsx
className="sticky top-0 z-50 border-b border-white/10 bg-space-950/65 backdrop-blur-2xl"
```

Change the brand icon span class to:

```tsx
className="flex h-9 w-9 items-center justify-center rounded-lg border border-nebula-cyan/35 bg-nebula-cyan/10 text-nebula-cyan shadow-inner-glass"
```

Change the brand label class to:

```tsx
className="text-base font-semibold tracking-normal text-white"
```

- [x] **Step 2: Update Navbar desktop active state**

Replace the desktop link class expression with:

```tsx
className={[
  "rounded-lg px-3 py-2 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-nebula-cyan/30",
  active
    ? "border border-white/10 bg-white/10 text-white shadow-inner-glass"
    : "border border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
].join(" ")}
```

- [x] **Step 3: Fix Navbar mobile accessibility labels**

Replace the current mojibake `aria-label` expression with:

```tsx
aria-label={isOpen ? "关闭导航" : "打开导航"}
```

Update the mobile menu wrapper class to:

```tsx
className="border-t border-white/10 bg-space-950/95 px-5 py-3 shadow-inner-glass backdrop-blur-2xl lg:hidden"
```

Update mobile link active classes to use `rounded-lg`, visible focus, and matching active state:

```tsx
className={[
  "rounded-lg border px-4 py-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-nebula-cyan/30",
  active
    ? "border-white/10 bg-white/10 text-white"
    : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
].join(" ")}
```

- [x] **Step 4: Replace Footer content**

Replace `components/common/Footer.tsx` with:

```tsx
import Link from "next/link";
import { Database, Telescope } from "lucide-react";
import { navItems } from "@/lib/mock-data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-space-950/75 backdrop-blur-2xl">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_1.25fr] lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-nebula-cyan/35 bg-nebula-cyan/10 text-nebula-cyan shadow-inner-glass">
              <Telescope size={18} />
            </span>
            <span className="text-base font-semibold text-white">Cosmos Atlas</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            一个使用本地 mock 数据构建的中文宇宙探索网站，聚合航天任务、宇宙历史、结构层级、交互星图和天文图像库。
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-400">
            <Database size={14} className="text-nebula-amber" />
            当前阶段：本地数据驱动，无后端连接
          </div>
        </div>

        <div>
          <p className="text-sm tracking-[0.28em] text-nebula-cyan">站点地图</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 outline-none transition hover:border-nebula-cyan/30 hover:bg-white/[0.06] hover:text-white focus-visible:ring-2 focus-visible:ring-nebula-cyan/30"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [x] **Step 5: Verify layout components**

Run:

```powershell
npm.cmd run typecheck
```

Expected: exit code `0`.

---

### Task 6: Add Homepage Visual Review

**Files:**
- Create: `scripts/visual-review-homepage.mjs`
- Modify: `package.json`

- [x] **Step 1: Add npm script**

In `package.json`, add:

```json
"visual:home": "node scripts/visual-review-homepage.mjs"
```

Place it near the existing visual scripts:

```json
"visual:starmap": "node scripts/visual-review-starmap.mjs",
"visual:timeline-structure": "node scripts/visual-review-timeline-structure.mjs",
"visual:home": "node scripts/visual-review-homepage.mjs"
```

- [x] **Step 2: Create visual review script**

Create `scripts/visual-review-homepage.mjs`:

```js
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const baseUrl = process.env.COSMOS_ATLAS_BASE_URL ?? "http://127.0.0.1:3001";
const outputDir = path.join(process.cwd(), "artifacts", "visual-review");

const browserCandidates = [
  process.env.PLAYWRIGHT_CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
].filter(Boolean);

function findBrowserExecutable() {
  return browserCandidates.find((candidate) => fs.existsSync(candidate));
}

function recordFailure(failures, message, details = undefined) {
  failures.push(details ? { message, details } : { message });
}

async function collectPageOverflow(page) {
  return page.evaluate(() => {
    const pageOverflow = Math.max(0, document.documentElement.scrollWidth - window.innerWidth);
    const offenders = [...document.querySelectorAll("body *")]
      .map((node) => {
        const element = node;
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName,
          text: (element.textContent ?? "").trim().slice(0, 80),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width)
        };
      })
      .filter((item) => item.right > window.innerWidth + 2 || item.left < -2)
      .slice(0, 10);

    return { pageOverflow, offenders };
  });
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });

  const executablePath = findBrowserExecutable();
  if (!executablePath) {
    throw new Error("No system Chrome or Edge executable found for visual review.");
  }

  const failures = [];
  const browser = await chromium.launch({ executablePath });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

  const url = `${baseUrl}/`;
  await page.goto(url, { waitUntil: "networkidle" });

  const bodyText = await page.locator("body").innerText();
  for (const requiredText of [
    "Cosmos Atlas",
    "沿着光、时间和尺度进入可观测宇宙。",
    "宇宙旅程入口",
    "今日推荐探索",
    "站点地图"
  ]) {
    if (!bodyText.includes(requiredText)) {
      recordFailure(failures, `Missing required text: ${requiredText}`);
    }
  }

  const routeHrefs = ["/", "/missions", "/cosmic-timeline", "/structure", "/starmap", "/gallery"];
  for (const href of routeHrefs) {
    const count = await page.locator(`[href="${href}"]`).count();
    if (count === 0) {
      recordFailure(failures, `Missing route link: ${href}`);
    }
  }

  if ((await page.locator('[data-visual-target="home-hero"]').count()) === 0) {
    recordFailure(failures, "Missing home hero visual target.");
  }

  if ((await page.locator('[data-visual-target="home-journey-routes"]').count()) === 0) {
    recordFailure(failures, "Missing home journey routes visual target.");
  }

  await page.screenshot({
    path: path.join(outputDir, "home-desktop.png"),
    fullPage: true
  });

  await page.setViewportSize({ width: 390, height: 1000 });
  await page.goto(url, { waitUntil: "networkidle" });
  const mobileOverflow = await collectPageOverflow(page);
  if (mobileOverflow.pageOverflow > 2) {
    recordFailure(failures, "Mobile page has horizontal overflow.", mobileOverflow);
  }

  await page.screenshot({
    path: path.join(outputDir, "home-mobile.png"),
    fullPage: true
  });

  await browser.close();

  const result = {
    baseUrl,
    browser: executablePath,
    url,
    screenshots: [
      path.join(outputDir, "home-desktop.png"),
      path.join(outputDir, "home-mobile.png")
    ],
    mobileOverflow,
    failures
  };

  console.log(JSON.stringify(result, null, 2));
  if (failures.length > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

- [x] **Step 3: Verify visual script syntax**

Run:

```powershell
node --check scripts/visual-review-homepage.mjs
```

Expected: exit code `0`.

---

### Task 7: Final Verification

**Files:**
- Modify: `docs/superpowers/plans/2026-05-24-cosmos-atlas-homepage-journey.md`

- [x] **Step 1: Run typecheck**

Run:

```powershell
npm.cmd run typecheck
```

Expected: exit code `0`.

- [x] **Step 2: Run production build**

Run:

```powershell
npm.cmd run build
```

Expected: exit code `0`, with `/` listed as a static route.

- [x] **Step 3: Start or verify dev server on port 3001**

If the current dev server is not responding, start it with:

```powershell
npm.cmd run dev -- --port 3001
```

Expected: `http://127.0.0.1:3001/` returns `200`.

- [x] **Step 4: Run homepage visual review**

Run:

```powershell
npm.cmd run visual:home
```

Expected: exit code `0` and output JSON contains `"failures": []`.

- [x] **Step 5: Run existing visual reviews**

Run:

```powershell
npm.cmd run visual:starmap
npm.cmd run visual:timeline-structure
```

Expected: both exit code `0` with `"failures": []`.

- [x] **Step 6: Check changed files for encoding problems**

Run:

```powershell
node -e "const fs=require('fs'); const files=['lib/types.ts','lib/mock-data.ts','components/home/HeroSection.tsx','components/home/JourneyRouteMap.tsx','components/home/FeaturedExploration.tsx','components/home/FeatureGrid.tsx','components/layout/Navbar.tsx','components/common/Footer.tsx','app/page.tsx','scripts/visual-review-homepage.mjs']; const bad=files.filter(f=>fs.existsSync(f)&&fs.readFileSync(f,'utf8').includes('\uFFFD')); console.log(JSON.stringify({bad},null,2)); process.exit(bad.length?1:0);"
```

Expected: `{"bad":[]}`.

- [x] **Step 7: Mark plan checkboxes**

Use `apply_patch` to change completed steps in this file from `[ ]` to `[x]` only after the corresponding verification passes.

- [ ] **Step 8: Commit and push implementation**

After verification passes, run:

```powershell
git --git-dir=.codex-git --work-tree=. add .
git --git-dir=.codex-git --work-tree=. commit -m "Redesign homepage journey"
```

Push using the existing GitHub CLI token flow:

```powershell
$env:GH_CONFIG_DIR='D:\universe\.gh-config'
$env:HTTP_PROXY='http://127.0.0.1:7890'
$env:HTTPS_PROXY='http://127.0.0.1:7890'
$token = & 'C:\Program Files\GitHub CLI\gh.exe' auth token
$basic = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes('x-access-token:' + $token))
git --git-dir=.codex-git --work-tree=. -c credential.helper= -c http.https://github.com/.extraheader="AUTHORIZATION: basic $basic" push
```

Expected: branch `codex/import-cosmos-atlas` updates on GitHub and Draft PR #1 includes the implementation commit.
