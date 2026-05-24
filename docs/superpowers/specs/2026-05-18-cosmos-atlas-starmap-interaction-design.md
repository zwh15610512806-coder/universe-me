# Cosmos Atlas Phase 4 Starmap Interaction Design

## Goal

将 `/starmap` 从静态星点示意页升级为可交互的 3D 星图工具页。页面继续使用本地 mock 数据，不接后端；可见文案全部为中文，英文品牌名 `Cosmos Atlas` 保持不变。

## Visual Direction

这一阶段的视觉重点是“可操作的深空仪表盘”，不是宣传型落地页。主画面以深色全屏星域为核心，星点、轨迹线和选中态使用克制的青色、紫色、琥珀色和玫瑰色。信息面板保持玻璃质感、细边框和紧凑排版，让用户能快速扫描天体名称、类型、距离和星等。

3D 星图区域应占据页面主要空间。控件和详情面板围绕星图组织，避免把 Three.js 画布放进过度装饰的卡片中。桌面端采用“左侧筛选 + 中央星图 + 右侧详情”的探索布局；移动端改为“星图优先 + 筛选条 + 详情卡片”的纵向布局。

## Scope

本阶段包含：

- 扩展 `StarmapHighlight` 为更完整的本地星图数据模型。
- 新增 `components/starmap/` 组件目录。
- 用 `@react-three/fiber` 和 `@react-three/drei` 渲染交互星图。
- 支持按天体类型筛选。
- 支持悬停高亮和点击选中。
- 选中天体后显示中文详情。
- 保留一个可读的列表或摘要区域，避免 3D 画布成为唯一信息入口。

本阶段不包含：

- 真实星表数据接入。
- 后端接口。
- 复杂天文坐标换算。
- 用户账户、收藏、分享或持久化状态。
- 对其它页面做大规模重构。

## User Experience

用户进入 `/starmap` 后，应首先看到一个清晰的页面说明和当前可探索天体数量。主星图会以缓慢旋转的星域呈现，用户可以拖拽旋转、滚轮缩放或触控查看。

筛选控件展示全部类型和每类数量。点击筛选项后，星图只强调匹配天体，详情面板重置为推荐目标或保持当前仍可见的选中目标。星点悬停时出现轻量标签，点击后右侧详情面板显示名称、类型、距离、视星等、观测提示和简短说明。

移动端优先保证星图可见，筛选控件使用横向滚动按钮组，详情面板位于画布下方。所有按钮和面板文字必须完整显示，不依赖隐藏说明。

## Architecture

`app/starmap/page.tsx` 继续作为服务端页面，负责组合页面结构并把本地数据传给客户端交互组件。交互状态放在客户端组件内部，避免把整页变成客户端组件。

`lib/types.ts` 定义星图数据类型。`lib/mock-data.ts` 提供扩展后的本地星图数据，包括 3D 坐标、颜色、类型、观测字段和说明文案。

`components/starmap/StarmapExplorer.tsx` 是客户端容器，管理筛选、悬停和选中状态。`components/starmap/StarmapCanvas.tsx` 只负责 Three.js 场景渲染和交互回调。筛选、详情和摘要拆成小组件，保持文件职责清晰。

## Components

- `components/starmap/StarmapExplorer.tsx`
  - 客户端容器。
  - 接收 `stars` 数据。
  - 管理 `activeType`、`hoveredStarId`、`selectedStarId`。
  - 组合筛选、画布和详情面板。

- `components/starmap/StarmapCanvas.tsx`
  - 客户端 3D 画布。
  - 使用 `Canvas`、`Stars` 或自定义 `mesh` 星点。
  - 使用 `OrbitControls` 支持旋转和缩放。
  - 接收筛选结果、悬停 ID、选中 ID 和回调。

- `components/starmap/StarmapFilters.tsx`
  - 展示“全部”和各天体类型按钮。
  - 显示每类数量。
  - 当前选中类型有明确视觉状态。

- `components/starmap/StarmapDetails.tsx`
  - 展示选中天体详情。
  - 未选中时展示默认引导和推荐第一个可见目标。

- `components/starmap/StarmapLegend.tsx`
  - 展示颜色与类型说明。
  - 展示当前筛选后的数量。

## Data Model

`StarmapHighlight` 扩展为：

```ts
export type StarmapHighlight = {
  id: string;
  name: string;
  type: string;
  distance: string;
  magnitude: string;
  coordinates: [number, number, number];
  color: "cyan" | "violet" | "amber" | "rose" | "white";
  region: string;
  observation: string;
  description: string;
};
```

mock 数据数量控制在 10 到 14 个天体之间，足够展示筛选和空间分布，但不让页面变复杂。坐标是界面模拟坐标，不宣称为真实赤经赤纬或银河坐标。

## Interaction Rules

筛选规则：

- `全部` 显示所有天体。
- 选择某一类型后，非匹配天体降低透明度或隐藏，具体实现以画面清晰为准。
- 当前选中天体如果被筛选排除，详情面板切换到筛选结果中的第一个天体。

悬停规则：

- 悬停星点时星点放大并显示名称标签。
- 悬停状态不改变详情面板，只提供临时视觉反馈。

点击规则：

- 点击星点后更新详情面板。
- 点击列表或摘要项也能选中同一个天体。

键盘与可访问性：

- 筛选按钮可通过键盘聚焦和触发。
- 详情列表中的天体选择按钮有清晰的 `aria-label`。
- Canvas 周围提供文本信息，避免关键信息只存在于 WebGL 画面里。

## Error And Empty States

当前数据为本地 mock，正常情况下不会出现网络错误。组件仍应处理空数组：画布显示空星域，详情面板显示“暂无可展示天体”，筛选控件只显示禁用的“全部”。

如果某一筛选类型没有结果，不展示该类型按钮。这样用户不会进入无结果状态。

## Performance

星点数量保持较小，使用普通 mesh 或 instanced mesh 都可接受。画布 DPR 限制在 `[1, 1.5]`，并避免高频 React 状态更新。旋转动画使用 `useFrame`，只更新 Three 对象，不在每帧写 React state。

详情和筛选组件使用普通 React 状态即可，不引入额外状态库。

## Testing And Review

实现完成后必须验证：

- `npm.cmd run typecheck` 通过。
- `npm.cmd run build` 通过。
- 临时 dev server 请求 `/starmap` 返回 `200`。
- `http://127.0.0.1:3001/starmap` 可访问。
- 页面源码或响应内容包含中文星图文案和 `Cosmos Atlas`。

人工评审重点：

- 桌面端星图是否是页面主视觉。
- 移动端文字是否不溢出、不遮挡。
- 筛选、悬停、点击、详情联动是否清楚。
- 页面是否仍符合克制的深空玻璃视觉系统。

## Open Decisions

本规格直接采用“交互星图增强”方案。视觉策略、数据范围和交互边界已经固定为本阶段实现目标，不再拆分其它页面工作。
