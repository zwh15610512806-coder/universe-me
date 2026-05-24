# Cosmos Atlas Phase 3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add visual polish and content depth to the Chinese Cosmos Atlas site while keeping all data local.

**Architecture:** Extend the local mock data model with slugs and detail fields, then add static App Router detail routes for missions and gallery images. Add small shared UI components for footer, section headers, tags, metadata rows, and animated reveal wrappers so the visual refinement stays reusable.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Three.js, @react-three/fiber, @react-three/drei, lucide-react.

---

### Task 1: Data Model And Mock Data

**Files:**
- Modify: `lib/types.ts`
- Modify: `lib/mock-data.ts`

- [x] Add slug, tags, details, and featured fields to missions and gallery images.
- [x] Add home featured picks, cosmic insight cards, and structure insight cards.
- [x] Keep all visible content Chinese and preserve the English brand name `Cosmos Atlas`.

### Task 2: Shared Visual Components

**Files:**
- Create: `components/common/Footer.tsx`
- Create: `components/common/SectionHeader.tsx`
- Create: `components/common/TagList.tsx`
- Create: `components/common/ContentMeta.tsx`
- Create: `components/common/FadeIn.tsx`
- Modify: `app/layout.tsx`

- [x] Add a global footer.
- [x] Add reusable section, tag, metadata, and reveal primitives.
- [x] Keep styling consistent with the existing glass/deep-space visual system.

### Task 3: Detail Routes

**Files:**
- Create: `app/missions/[slug]/page.tsx`
- Create: `app/gallery/[slug]/page.tsx`
- Modify: `app/missions/page.tsx`
- Modify: `app/gallery/page.tsx`

- [x] Add static mission detail pages using local data.
- [x] Add static gallery detail pages using local data.
- [x] Link list cards to their detail pages.

### Task 4: Home And Content Pages

**Files:**
- Create: `components/home/FeaturedExploration.tsx`
- Modify: `app/page.tsx`
- Modify: `app/cosmic-timeline/page.tsx`
- Modify: `app/structure/page.tsx`

- [x] Add featured exploration previews to the home page.
- [x] Add explanatory insight cards to the cosmic timeline.
- [x] Add scale interpretation cards to the structure page.

### Task 5: Verification

**Files:**
- No source changes expected.

- [x] Run `npm.cmd run typecheck`; expected exit code `0`.
- [x] Run `npm.cmd run build`; expected exit code `0`.
- [x] Start a temporary dev server and request base routes plus representative detail routes; expected every route returns `200`.
