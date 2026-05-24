# Cosmos Atlas 中文第二阶段 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 Cosmos Atlas 第二阶段升级为全站中文的本地 mock 内容增强版。

**Architecture:** 保持 Next.js App Router 页面结构，继续使用 `lib/mock-data.ts` 作为唯一数据来源。新增少量公共展示组件，让页面标题、指标和信息卡片结构复用，同时不引入后端、搜索、详情页或复杂状态。

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Three.js, @react-three/fiber, @react-three/drei, lucide-react。

---

### Task 1: 中文数据层

**Files:**
- Modify: `lib/types.ts`
- Modify: `lib/mock-data.ts`

- [x] 扩展任务、宇宙事件、结构层级、星图和图库条目的类型字段。
- [x] 将导航、首页入口、任务、宇宙时间线、结构层级、星图和图库 mock 数据改为中文。

### Task 2: 公共展示组件

**Files:**
- Create: `components/common/PageHero.tsx`
- Create: `components/common/MetricGrid.tsx`

- [x] 新增统一页面标题组件，支持图标、眉标题、主标题、说明和右侧摘要卡片。
- [x] 新增首页统计网格组件，用于展示本地模块和数据状态。

### Task 3: 首页与导航中文化

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `components/layout/Navbar.tsx`
- Modify: `components/home/HeroSection.tsx`
- Modify: `components/home/FeatureGrid.tsx`

- [x] 设置 HTML 语言为 `zh-CN`。
- [x] 将 metadata、导航、Hero、按钮和入口说明改为中文。
- [x] 保留英文品牌名 `Cosmos Atlas`。

### Task 4: 六个页面内容增强

**Files:**
- Modify: `app/missions/page.tsx`
- Modify: `app/cosmic-timeline/page.tsx`
- Modify: `app/structure/page.tsx`
- Modify: `app/starmap/page.tsx`
- Modify: `app/gallery/page.tsx`

- [x] 任务页展示年份、阶段、范围、机构和亮点。
- [x] 宇宙时间线展示时期、观测信号和温度状态。
- [x] 结构页展示尺度和代表例子。
- [x] 星图页展示模拟星点详情列表。
- [x] 图库页展示分类、波段和天体类型。

### Task 5: 验证

**Files:**
- No source changes expected.

- [x] Run `npm.cmd run typecheck`; expected exit code `0`。
- [x] Run `npm.cmd run build`; expected exit code `0`。
- [x] Start temporary dev server and request `/`, `/missions`, `/cosmic-timeline`, `/structure`, `/starmap`, `/gallery`; expected each route returns `200`。
