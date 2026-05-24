# Cosmos Atlas Phase 5 Deep Time And Scale Interaction Design

## Goal

同时升级 `/cosmic-timeline` 和 `/structure`，让 Cosmos Atlas 的“宇宙历史”和“宇宙结构层级”从静态卡片页变成两个可操作的探索工具。全部内容继续使用本地 mock 数据，不接后端；可见文案全部为中文，英文品牌名 `Cosmos Atlas` 保持不变。

## Scope

本阶段包含两个子模块：

- `/cosmic-timeline`：交互宇宙历史时间线。
- `/structure`：宇宙尺度层级浏览器。

本阶段不包含：

- 真实宇宙学计算器。
- 后端接口或远程数据。
- 复杂物理模拟。
- 3D 大场景重写。
- 对 `/missions`、`/gallery`、`/starmap` 做功能改动。

两个页面可以共享小型展示组件和视觉规则，但交互状态、页面容器、数据解释逻辑必须分开，避免为了“统一”把两个不同体验耦合到一个大组件里。

## Visual Direction

整体继续沿用深空、玻璃面板、细边框和克制高亮色。`/cosmic-timeline` 使用紫色和青色作为主强调，表现“深时、观测证据、光传播”。`/structure` 使用琥珀色和青色作为主强调，表现“尺度、层级、结构放大”。

页面不做营销式 hero，不做装饰性大卡片堆叠。桌面端应像科学探索仪表盘：左侧或顶部为控制区，中间为主交互视图，右侧或下方为当前选中详情。移动端优先保证主交互控件和当前详情可读，长内容按纵向堆叠。

## Cosmic Timeline Experience

`/cosmic-timeline` 的核心体验是“选择一个宇宙阶段，理解时间、观测证据和物理状态之间的关系”。

用户进入页面后看到：

- 页面说明和时间跨度概览。
- 一条横向或纵向的深时刻度。
- 当前选中事件的详情面板。
- 事件所关联的观测线索、物理状态和解释卡片。

交互规则：

- 默认选中第一个事件“炽热早期宇宙”。
- 点击时间节点会更新详情面板。
- 点击“上一阶段 / 下一阶段”按钮可以顺序浏览。
- 桌面端时间轴应横向展示深时压缩感；移动端可以改成横向滚动节点条加详情卡片。
- 当前选中节点有明确高亮。
- 非选中节点保持可见但弱化。

数据模型扩展：

```ts
export type CosmicEvent = {
  id: string;
  epoch: string;
  title: string;
  description: string;
  signal: string;
  temperature: string;
  relativePosition: number;
  accent: "cyan" | "violet" | "amber" | "rose";
  keyPoint: string;
  evidence: string[];
};
```

`relativePosition` 是界面刻度位置，范围为 `0` 到 `100`，不声明为精确宇宙学比例。`evidence` 用于详情面板展示“我们如何知道”。

组件边界：

- `components/cosmic-timeline/CosmicTimelineExplorer.tsx`
  - 客户端容器，管理选中事件。
- `components/cosmic-timeline/TimelineTrack.tsx`
  - 渲染时间刻度和节点按钮。
- `components/cosmic-timeline/CosmicEventDetails.tsx`
  - 渲染当前事件详情、观测证据和物理状态。
- `components/cosmic-timeline/TimelineControls.tsx`
  - 渲染上一阶段、下一阶段和当前进度。

## Structure Experience

`/structure` 的核心体验是“在不同尺度之间切换，理解每一层的对象、尺度和主导问题”。

用户进入页面后看到：

- 页面说明和尺度跨度概览。
- 一个尺度浏览器，展示 6 个层级。
- 当前选中层级的详情面板。
- 一组视觉尺度条或同心层级示意，用于表达从行星到可观测宇宙的放大关系。

交互规则：

- 默认选中“行星世界”。
- 点击任意层级按钮更新详情。
- 上一层 / 下一层按钮可以线性浏览。
- 桌面端使用“尺度条 + 层级详情 + 示例对象”的布局。
- 移动端层级按钮使用横向滚动，详情面板纵向展示。
- 每一层都展示“尺度范围”、“代表对象”、“主导问题”和“观测方式”。

数据模型扩展：

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
  accent: "cyan" | "violet" | "amber" | "rose";
};
```

`scaleValue` 是界面展示用的相对尺度，不做精确换算。它只用于决定尺度条宽度或节点位置。

组件边界：

- `components/structure/StructureExplorer.tsx`
  - 客户端容器，管理选中层级。
- `components/structure/ScaleNavigator.tsx`
  - 渲染层级按钮和尺度条。
- `components/structure/StructureDetails.tsx`
  - 渲染当前层级详情、示例对象和观测方式。
- `components/structure/ScaleControls.tsx`
  - 渲染上一层、下一层和当前层级进度。

## Shared Rules

两个页面都应：

- 保持服务端页面作为外壳，把交互状态放进客户端组件。
- 复用 `GlassCard`、`PageHero`、`SectionHeader`、`FadeIn`。
- 使用 Tailwind utility，不引入新的 UI 库。
- 不新增全局状态库。
- 不把交互文本只放在 canvas 或纯视觉层里。
- 移动端不出现横向页面溢出。
- 保留静态 HTML 中的核心中文文案，便于无 JS 和搜索预览。

## Data Flow

`app/cosmic-timeline/page.tsx` 从 `lib/mock-data.ts` 读取 `cosmicEvents` 和 `cosmicInsights`，把 `cosmicEvents` 传入 `CosmicTimelineExplorer`。页面保留 hero 和理解框架区。

`app/structure/page.tsx` 从 `lib/mock-data.ts` 读取 `structureLevels` 和 `structureInsights`，把 `structureLevels` 传入 `StructureExplorer`。页面保留 hero 和尺度解释区。

客户端容器只管理当前选中 ID。所有派生值通过 `useMemo` 或简单数组查找计算，不引入复杂状态层。

## Empty And Edge States

如果事件或层级数组为空：

- 控制按钮禁用。
- 详情面板显示“暂无可展示内容”。
- 主交互区显示空状态说明。

如果当前选中 ID 不存在：

- 自动选中数组第一个项目。
- 不抛出运行时错误。

## Testing And Review

实现完成后必须验证：

- `npm.cmd run typecheck` 通过。
- `npm.cmd run build` 通过。
- `/cosmic-timeline` 和 `/structure` 返回 `200`。
- 响应内容包含中文页面文案和 `Cosmos Atlas`。
- 新增或扩展视觉评审脚本，至少验证：
  - 桌面端主交互区存在。
  - 移动端没有横向页面溢出。
  - 点击节点或层级按钮会更新详情文本。

建议新增脚本：

```text
npm.cmd run visual:timeline-structure
```

脚本复用当前 `visual:starmap` 的系统 Chrome/Edge 检测方式，不下载 Playwright 浏览器二进制。

## Review Criteria

人工评审重点：

- `/cosmic-timeline` 是否能清楚表达“时间节点、观测证据、物理状态”的关系。
- `/structure` 是否能清楚表达“层级、尺度、代表对象、观测方式”的关系。
- 两个页面是否各自有明确主交互，而不是普通卡片列表。
- 中文文案是否完整、无乱码。
- 移动端文字和按钮不溢出、不遮挡。

## Open Decisions

本阶段直接采用“双子模块”方案：`/cosmic-timeline` 和 `/structure` 同一阶段推进，但实现计划必须拆成可单独验证的任务。若执行中发现范围过大，优先保持两个页面的交互骨架完整，而不是增加更多装饰或内容数量。
