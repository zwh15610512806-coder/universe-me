# Cosmos Atlas Project Rules

## Stack

- Use Next.js App Router with TypeScript.
- Use Tailwind CSS for styling and keep design tokens in `tailwind.config.ts` plus CSS variables in `app/globals.css`.
- Use Framer Motion only in client components.
- Use Three.js through `@react-three/fiber` and `@react-three/drei` for immersive canvas elements.
- Use `lucide-react` for interface icons.

## Component Organization

- Global layout components live in `components/layout/`.
- Shared primitives live in `components/common/`.
- Page-specific sections live in `components/home/` or a future feature directory.
- Local mock data and shared types live in `lib/`.
- Components should use PascalCase named exports and explicit TypeScript props.

## Styling

- Keep the visual language restrained: deep space backgrounds, glass panels, fine borders, and limited cyan, violet, amber, and rose accents.
- Prefer Tailwind utilities over inline styles. Inline styles are acceptable for data-driven positioning or complex CSS gradient mock visuals.
- Do not hardcode unrelated one-off colors in components. Extend tokens in `tailwind.config.ts` or `app/globals.css` when a value is reused.
- Cards should use 8px radius unless the element is a deliberate circular control or orbit.

## Figma MCP Integration Rules

These rules apply when implementing from Figma designs:

1. Fetch structured design context for the exact node before coding.
2. Fetch a screenshot for visual reference before coding.
3. Treat generated Figma code as a design description, then translate it into this project's component and Tailwind conventions.
4. Reuse `components/common/GlassCard.tsx` and existing layout primitives before adding new primitives.
5. Use localhost asset sources from Figma directly when provided, and store downloaded static assets under `public/assets/`.
6. Validate the final UI against the screenshot before marking a Figma-driven change complete.
