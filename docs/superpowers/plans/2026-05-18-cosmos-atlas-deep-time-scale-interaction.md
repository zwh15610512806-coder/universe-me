# Cosmos Atlas Phase 5 Deep Time And Scale Interaction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade `/cosmic-timeline` and `/structure` into Chinese, local-data-driven interactive exploration pages.

**Architecture:** Keep both route files as server-rendered page shells and move interactive state into page-specific client components. Extend local mock data with UI-oriented fields, then add independent interaction modules for deep time and cosmic scale so the two experiences remain separately testable.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Framer Motion client boundaries, lucide-react, existing Playwright-based visual review using system Chrome/Edge.

---

## File Structure

- Modify: `lib/types.ts`
  - Add shared `AccentTone`, expand `CosmicEvent`, expand `StructureLevel`.
- Modify: `lib/mock-data.ts`
  - Add IDs, relative positions, evidence lists, key points, scale values, observation fields, and accents to existing local data.
- Create: `components/cosmic-timeline/CosmicTimelineExplorer.tsx`
  - Client container for selected cosmic event state.
- Create: `components/cosmic-timeline/TimelineTrack.tsx`
  - Deep-time track and event node buttons.
- Create: `components/cosmic-timeline/CosmicEventDetails.tsx`
  - Selected event explanation, signal, physical state, and evidence list.
- Create: `components/cosmic-timeline/TimelineControls.tsx`
  - Previous/next stage controls.
- Create: `components/structure/StructureExplorer.tsx`
  - Client container for selected structure level state.
- Create: `components/structure/ScaleNavigator.tsx`
  - Scale bar and level selector buttons.
- Create: `components/structure/StructureDetails.tsx`
  - Selected level explanation, examples, dominant force, and observation mode.
- Create: `components/structure/ScaleControls.tsx`
  - Previous/next scale controls.
- Modify: `app/cosmic-timeline/page.tsx`
  - Replace the static timeline list with `CosmicTimelineExplorer`, keep insight cards.
- Modify: `app/structure/page.tsx`
  - Replace the static card grid with `StructureExplorer`, keep insight cards.
- Create: `scripts/visual-review-timeline-structure.mjs`
  - Validate both pages with system Chrome/Edge; generate screenshots and check interactions/mobile overflow.
- Modify: `package.json`
  - Add `visual:timeline-structure` script.
- Modify: `docs/superpowers/plans/2026-05-18-cosmos-atlas-deep-time-scale-interaction.md`
  - Mark steps complete as implementation and verification pass.

This workspace is not a Git repository, so implementation will not include `git commit` steps.

---

### Task 1: Expand Data Types And Mock Data

**Files:**
- Modify: `lib/types.ts`
- Modify: `lib/mock-data.ts`

- [x] **Step 1: Add shared accent and expand types**

In `lib/types.ts`, add this union near the common types:

```ts
export type AccentTone = "cyan" | "violet" | "amber" | "rose";
```

Replace `CosmicEvent` with:

```ts
export type CosmicEvent = {
  id: string;
  epoch: string;
  title: string;
  description: string;
  signal: string;
  temperature: string;
  relativePosition: number;
  accent: AccentTone;
  keyPoint: string;
  evidence: string[];
};
```

Replace `StructureLevel` with:

```ts
export type StructureLevel = {
  id: string;
  order: string;
  name: string;
  scale: string;
  scaleValue: number;
  description: string;
  examples: string[];
  dominantForce: string;
  observation: string;
  accent: AccentTone;
};
```

- [x] **Step 2: Update `cosmicEvents` local data**

In `lib/mock-data.ts`, keep the existing Chinese titles/descriptions and add these fields to the five events:

| id | relativePosition | accent | keyPoint | evidence |
| --- | ---: | --- | --- | --- |
| `hot-early-universe` | `2` | `violet` | `微小密度涨落成为星系和宇宙网的种子。` | `["宇宙微波背景中的温度起伏", "大尺度结构统计", "轻元素丰度"]` |
| `transparent-universe` | `12` | `cyan` | `光子开始自由传播，宇宙留下最古老的可观测背景。` | `["宇宙微波背景辐射", "全天微波温度图", "偏振观测"]` |
| `first-stars` | `28` | `amber` | `第一代恒星把黑暗宇宙重新点亮，并开始制造重元素。` | `["高红移星系候选体", "再电离时期吸收线", "早期恒星形成模型"]` |
| `galaxy-network` | `48` | `rose` | `星系在暗物质骨架上聚集，宇宙网开始显现。` | `["深场巡天", "高红移星系分布", "星系并合痕迹"]` |
| `solar-system-forms` | `86` | `cyan` | `原行星盘中的尘埃和冰粒逐步汇聚成行星系统。` | `["陨石同位素记录", "原行星盘观测", "太阳系小天体成分"]` |

- [x] **Step 3: Update `structureLevels` local data**

In `lib/mock-data.ts`, keep the existing Chinese names/descriptions/examples and add these fields to the six levels:

| id | scaleValue | accent | dominantForce | observation |
| --- | ---: | --- | --- | --- |
| `planetary-worlds` | `1` | `cyan` | `地质、大气和局部引力主导。` | `探测器、光谱、雷达和原位采样。` |
| `stellar-systems` | `3` | `violet` | `恒星引力和辐射塑造局部环境。` | `视差测量、光度变化、红外和可见光观测。` |
| `galactic-structures` | `6` | `amber` | `暗物质晕、恒星盘和气体循环共同主导。` | `多波段巡天、恒星运动、气体谱线。` |
| `galaxy-clusters` | `8` | `rose` | `引力束缚、热气体和暗物质晕主导。` | `X 射线、引力透镜和星系红移巡天。` |
| `cosmic-web` | `10` | `violet` | `暗物质骨架和大尺度引力增长主导。` | `大规模红移巡天、弱引力透镜和数值模拟。` |
| `observable-universe` | `12` | `cyan` | `宇宙膨胀、光速视界和大尺度统计主导。` | `宇宙微波背景、深场观测和星系巡天。` |

- [x] **Step 4: Verify data types**

Run:

```powershell
npm.cmd run typecheck
```

Expected: exit code `0`.

---

### Task 2: Add Cosmic Timeline Components

**Files:**
- Create: `components/cosmic-timeline/TimelineControls.tsx`
- Create: `components/cosmic-timeline/TimelineTrack.tsx`
- Create: `components/cosmic-timeline/CosmicEventDetails.tsx`
- Create: `components/cosmic-timeline/CosmicTimelineExplorer.tsx`

- [x] **Step 1: Create `TimelineControls.tsx`**

Component contract:

```ts
type TimelineControlsProps = {
  currentIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
};
```

Behavior:

- Render two text buttons: `上一阶段` and `下一阶段`.
- Use `ChevronLeft` and `ChevronRight` from `lucide-react`.
- Disable previous at index `0`.
- Disable next at index `total - 1`.
- Render progress text as `第 {currentIndex + 1} / {total} 阶段`.
- Buttons use 8px radius, glass border, and disabled opacity.

- [x] **Step 2: Create `TimelineTrack.tsx`**

Component contract:

```ts
type TimelineTrackProps = {
  events: CosmicEvent[];
  selectedEventId: string | null;
  onSelectEvent: (id: string) => void;
};
```

Behavior:

- Wrap root with `data-visual-target="cosmic-timeline-explorer"`.
- Desktop: render a horizontal track with absolute event node buttons positioned by `relativePosition`, clamped to `6..94`.
- Mobile: render the same buttons inside a horizontal scroll row.
- Each button displays `epoch` and `title`.
- Selected event gets violet/cyan highlighted border and stronger text.
- Non-selected events stay visible with lower opacity.
- Empty `events` renders a `GlassCard` with `暂无可展示时间节点`.

- [x] **Step 3: Create `CosmicEventDetails.tsx`**

Component contract:

```ts
type CosmicEventDetailsProps = {
  event: CosmicEvent | undefined;
};
```

Behavior:

- Empty event renders `暂无可展示内容`.
- Normal state renders:
  - `event.epoch`
  - `event.title`
  - `event.keyPoint`
  - `event.description`
  - metadata grid for `观测线索` and `物理状态`
  - `我们如何知道` list using `event.evidence`
- Root card uses `GlassCard`.

- [x] **Step 4: Create `CosmicTimelineExplorer.tsx`**

Client component contract:

```ts
type CosmicTimelineExplorerProps = {
  events: CosmicEvent[];
};
```

State and behavior:

- `"use client"` at top.
- `selectedEventId` starts as `events[0]?.id ?? null`.
- If selected ID disappears, select the first event.
- Derive `selectedEvent` and `currentIndex`.
- Render layout:
  - top row: `TimelineControls`
  - main grid: `TimelineTrack` and `CosmicEventDetails`
- Root uses `min-w-0` and `data-visual-target="cosmic-timeline-shell"`.

- [x] **Step 5: Verify cosmic components**

Run:

```powershell
npm.cmd run typecheck
```

Expected: exit code `0` or only expected failures from route pages not yet wired. If failures come from the new components, fix before continuing.

---

### Task 3: Add Structure Scale Components

**Files:**
- Create: `components/structure/ScaleControls.tsx`
- Create: `components/structure/ScaleNavigator.tsx`
- Create: `components/structure/StructureDetails.tsx`
- Create: `components/structure/StructureExplorer.tsx`

- [x] **Step 1: Create `ScaleControls.tsx`**

Component contract:

```ts
type ScaleControlsProps = {
  currentIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
};
```

Behavior:

- Render text buttons: `上一层` and `下一层`.
- Use `ChevronLeft` and `ChevronRight`.
- Disable previous at index `0`.
- Disable next at index `total - 1`.
- Render progress as `第 {currentIndex + 1} / {total} 层`.

- [x] **Step 2: Create `ScaleNavigator.tsx`**

Component contract:

```ts
type ScaleNavigatorProps = {
  levels: StructureLevel[];
  selectedLevelId: string | null;
  onSelectLevel: (id: string) => void;
};
```

Behavior:

- Wrap root with `data-visual-target="structure-explorer"`.
- Render a vertical scale stack on desktop and a horizontal scroll selector on mobile.
- Each level button displays `order`, `name`, and `scale`.
- Render a scale bar per level using `width: ${Math.min(100, Math.max(10, level.scaleValue * 8))}%`.
- Selected level uses amber/cyan highlighted border.
- Empty `levels` renders `暂无可展示层级`.

- [x] **Step 3: Create `StructureDetails.tsx`**

Component contract:

```ts
type StructureDetailsProps = {
  level: StructureLevel | undefined;
};
```

Behavior:

- Empty level renders `暂无可展示内容`.
- Normal state renders:
  - `level.order`
  - `level.name`
  - `level.description`
  - metadata for `尺度范围`, `主导问题`, `观测方式`
  - example chips from `level.examples`
- Root card uses `GlassCard`.

- [x] **Step 4: Create `StructureExplorer.tsx`**

Client component contract:

```ts
type StructureExplorerProps = {
  levels: StructureLevel[];
};
```

State and behavior:

- `"use client"` at top.
- `selectedLevelId` starts as `levels[0]?.id ?? null`.
- If selected ID disappears, select the first level.
- Derive `selectedLevel` and `currentIndex`.
- Render layout:
  - top row: `ScaleControls`
  - main grid: `ScaleNavigator` and `StructureDetails`
- Root uses `min-w-0` and `data-visual-target="structure-shell"`.

- [x] **Step 5: Verify structure components**

Run:

```powershell
npm.cmd run typecheck
```

Expected: exit code `0` or only expected failures from route pages not yet wired. If failures come from the new components, fix before continuing.

---

### Task 4: Wire Route Pages

**Files:**
- Modify: `app/cosmic-timeline/page.tsx`
- Modify: `app/structure/page.tsx`

- [x] **Step 1: Wire `/cosmic-timeline`**

Update imports:

```ts
import { CosmicTimelineExplorer } from "@/components/cosmic-timeline/CosmicTimelineExplorer";
```

Replace the old static timeline list with:

```tsx
<CosmicTimelineExplorer events={cosmicEvents} />
```

Keep:

- `PageHero`
- hero summary card
- `SectionHeader`
- `cosmicInsights` cards

Use visible Chinese page copy:

- eyebrow: `宇宙历史时间线`
- title: `沿着光的延迟阅读宇宙历史。`
- description includes `Cosmos Atlas` and explains local mock deep-time data.

- [x] **Step 2: Wire `/structure`**

Update imports:

```ts
import { StructureExplorer } from "@/components/structure/StructureExplorer";
```

Replace the old static structure grid with:

```tsx
<StructureExplorer levels={structureLevels} />
```

Keep:

- `PageHero`
- hero summary card
- `SectionHeader`
- `structureInsights` cards

Use visible Chinese page copy:

- eyebrow: `宇宙结构层级`
- title: `在尺度跳跃中重新理解宇宙。`
- description includes `Cosmos Atlas` and explains local mock scale browser.

- [x] **Step 3: Verify route wiring**

Run:

```powershell
npm.cmd run typecheck
```

Expected: exit code `0`.

---

### Task 5: Add Visual Review Script

**Files:**
- Create: `scripts/visual-review-timeline-structure.mjs`
- Modify: `package.json`

- [x] **Step 1: Add npm script**

In `package.json`, add:

```json
"visual:timeline-structure": "node scripts/visual-review-timeline-structure.mjs"
```

- [x] **Step 2: Create visual review script**

Implement `scripts/visual-review-timeline-structure.mjs` using the same browser executable discovery as `scripts/visual-review-starmap.mjs`:

```js
const browserCandidates = [
  process.env.PLAYWRIGHT_CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
].filter(Boolean);
```

Script checks:

- Open `http://127.0.0.1:3001/cosmic-timeline`.
- Assert body text includes `宇宙历史时间线` and `Cosmos Atlas`.
- Assert `[data-visual-target="cosmic-timeline-explorer"]` exists.
- Click button named `/太阳系形成/`.
- Assert body text includes `陨石同位素记录`.
- Capture desktop screenshot to `artifacts/visual-review/cosmic-timeline-desktop.png`.
- Resize to `390x1000`.
- Assert document horizontal overflow is `0..2px`.
- Capture mobile screenshot to `artifacts/visual-review/cosmic-timeline-mobile.png`.
- Open `http://127.0.0.1:3001/structure`.
- Assert body text includes `宇宙结构层级` and `Cosmos Atlas`.
- Assert `[data-visual-target="structure-explorer"]` exists.
- Click button named `/宇宙网/`.
- Assert body text includes `大规模红移巡天`.
- Capture desktop screenshot to `artifacts/visual-review/structure-desktop.png`.
- Resize to `390x1000`.
- Assert document horizontal overflow is `0..2px`.
- Capture mobile screenshot to `artifacts/visual-review/structure-mobile.png`.
- Print JSON with `failures: []` on success.

- [x] **Step 3: Run visual review script**

Ensure `127.0.0.1:3001` is running current code, then run:

```powershell
npm.cmd run visual:timeline-structure
```

Expected: exit code `0` and output JSON contains `"failures": []`.

---

### Task 6: Final Verification

**Files:**
- Modify: `docs/superpowers/plans/2026-05-18-cosmos-atlas-deep-time-scale-interaction.md`

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

Expected: exit code `0`, with `/cosmic-timeline` and `/structure` listed as static routes.

- [x] **Step 3: Verify HTTP routes on port 3001**

Run:

```powershell
try {
  $timeline = Invoke-WebRequest -Uri 'http://127.0.0.1:3001/cosmic-timeline' -UseBasicParsing -TimeoutSec 20
  $structure = Invoke-WebRequest -Uri 'http://127.0.0.1:3001/structure' -UseBasicParsing -TimeoutSec 20
  [PSCustomObject]@{
    TimelineStatus = $timeline.StatusCode
    TimelineChinese = ($timeline.Content -like '*宇宙历史时间线*' -or $timeline.Content -like '*沿着光*')
    TimelineBrand = ($timeline.Content -like '*Cosmos Atlas*')
    StructureStatus = $structure.StatusCode
    StructureChinese = ($structure.Content -like '*宇宙结构层级*' -or $structure.Content -like '*尺度跳跃*')
    StructureBrand = ($structure.Content -like '*Cosmos Atlas*')
  }
} catch {
  $_.Exception.Message
  exit 1
}
```

Expected: both status values are `200`, both Chinese checks are `True`, both brand checks are `True`.

- [x] **Step 4: Run visual review**

Run:

```powershell
npm.cmd run visual:timeline-structure
```

Expected: exit code `0` and output JSON contains `"failures": []`.

- [x] **Step 5: Mark this plan complete**

Use `apply_patch` to update checkboxes in this file from `[ ]` to `[x]` only after the corresponding steps pass.
