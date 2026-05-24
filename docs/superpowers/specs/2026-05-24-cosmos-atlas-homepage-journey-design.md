# Cosmos Atlas Homepage Journey Design

## Decision

The next phase will use the approved `A2-2 Pro` direction: rebuild the home page as an immersive cosmic journey map while also aligning Navbar and Footer visual details.

The home page should feel like the opening sequence of a space documentary, but it must still work as a fast navigation surface. `Cosmos Atlas` remains the English brand name. All visible explanatory copy, labels, buttons, and navigation text remain Chinese.

## Goals

- Make `/` the strongest visual entry point for the site.
- Present the six exploration routes in the first viewport or immediately below it.
- Keep the experience immersive without making the page slow or hard to scan.
- Unify Navbar and Footer so they feel like part of the same deep-space instrument system.
- Continue using local mock data only.

## Non-Goals

- Do not change the main body design of `/missions`, `/cosmic-timeline`, `/structure`, `/starmap`, or `/gallery`.
- Do not add backend integration, external data loading, authentication, or persistence.
- Do not add new package dependencies.
- Do not replace the existing page routing structure.

## Visual Direction

The first screen should use a cinematic deep-space background with layered star fields, a soft nebula atmosphere, and a clear title block. The style should avoid a plain card-heavy landing page. The hero content should sit directly on the scene, not inside a large floating card.

The design should feel like a guided journey:

- Brand signal: `Cosmos Atlas` appears as the primary identity in the hero.
- Narrative hook: a Chinese headline frames the site as a route through missions, time, structure, stars, and astronomical images.
- Journey rail: six route entries expose the site's main sections as a visible path.
- Current recommendation: one featured exploration gives the user a concrete place to start.

The palette stays close to the existing project tokens: deep space black, restrained cyan, violet, amber, and rose accents. The implementation should improve contrast and depth, not turn the page into a one-color blue or purple composition.

## Home Page Structure

### Hero Journey Section

Replace the current split text/orbit hero with a full-width journey opening.

Required content:

- Brand and short eyebrow.
- Large Chinese headline.
- Supporting Chinese description.
- Primary CTA to `/starmap`.
- Secondary CTA to `/cosmic-timeline`.
- A visible route map with six entries:
  - 首页
  - 人类探索
  - 宇宙时间线
  - 结构层级
  - 交互星图
  - 图像库
- A compact featured exploration card that links to an existing local route.

Interaction:

- Hero route entries should be links.
- Hover and focus states should clearly identify the target route.
- Motion should be meaningful and restrained: staggered entry for text and route nodes, plus subtle background movement.

Responsive behavior:

- Desktop: hero can use a two-layer composition with title content and route map visible together.
- Mobile: route entries become a compact horizontal or two-column grid, with no text overlap.
- The first viewport should show the brand, headline, at least one CTA, and a hint of the route map.

### Metrics And Featured Content

The existing `MetricGrid`, `FeaturedExploration`, and `FeatureGrid` concepts remain, but their hierarchy should support the new hero.

Expected adjustment:

- Metrics become a concise mission-status band.
- Featured exploration should read as "recommended next stops" instead of generic cards.
- Feature grid should remain the complete site route index, but visually align with the new journey motif.

## Navbar Design

Navbar remains a client component using `usePathname`.

Changes:

- Keep the brand mark and label compact.
- Make the sticky header feel lighter and more precise, with a fine border and glass background.
- Improve active state so the current page is obvious without heavy pill styling.
- Mobile menu should feel like a continuation of the space instrument panel, not a separate block.

Behavior:

- Existing links and active route detection remain.
- Mobile open/close behavior remains.
- Chinese accessibility labels must be readable and not mojibake.

## Footer Design

Footer should become a quiet site map and project status close.

Required content:

- Brand block with `Cosmos Atlas`.
- Chinese description of the local mock-data astronomy site.
- Navigation links for the main routes.
- A small status line that communicates the current project is based on local mock data.

Visual:

- Use the same glass, border, and accent language as the Navbar.
- Avoid large card nesting.
- Keep it compact enough that it does not feel like a second landing page.

## Data And Types

Prefer reusing existing mock data:

- `navItems` for route entries.
- `homeStats` for status metrics.
- `featuredExplorations` for recommended next stops.
- `homeFeatures` for route index cards.

If the hero needs UI-specific copy, add local mock data fields only when they make the component cleaner. Keep TypeScript types explicit.

## Component Boundaries

Expected component changes:

- `components/home/HeroSection.tsx`
  - Rebuild as the cinematic journey opening.
- `components/home/FeatureGrid.tsx`
  - Adjust copy and visual treatment to match the new route index role.
- `components/home/FeaturedExploration.tsx`
  - Adjust section language and card presentation.
- `components/layout/Navbar.tsx`
  - Visual refinement only; preserve behavior.
- `components/common/Footer.tsx`
  - Visual and content refinement; preserve simple route links.

Optional helper components are acceptable if they reduce complexity, but this phase should avoid creating a large new abstraction layer.

## Accessibility

- All interactive elements must be keyboard reachable.
- Focus states must be visible on dark backgrounds.
- Text contrast should stay readable over the cinematic background.
- Motion should not be required to understand the page.
- Buttons and route cards must have stable dimensions on mobile and desktop.

## Verification

Run these checks before completion:

- `npm.cmd run typecheck`
- `npm.cmd run build`
- A browser or Playwright visual review of `/` on desktop and mobile.
- Confirm no visible mojibake in changed source files.
- Confirm `/` still links to all six routes.

## Review Gate

Implementation should not start until this spec is reviewed and approved. After approval, write a separate implementation plan with task-level checkboxes, then execute the plan.
