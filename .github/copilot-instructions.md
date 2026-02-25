# Copilot / AI Agent Instructions — Portfolio Teach

This document gives concise, actionable guidance for AI coding agents working in this repository (Next.js 14 App Router + Tailwind).

- Project type: Next.js (App Router) using `src/app` (server components by default). See `src/app/layout.tsx` and `src/app/page.tsx` for global layout and metadata.
- Start / build commands: use `npm run dev` (Next dev), `npm run build`, `npm run start`. Static export available via `npm run export` (see `package.json`).
- Styling: TailwindCSS with configuration at `tailwind.config.ts` and global styles in `src/app/globals.css`.

- Component conventions:
  - UI primitives and small widgets live under `src/app/components/ui/` (e.g. `navbar-menu.tsx`, `3d-card.tsx`). These are often client components and may use `use client`.
  - Page-level or composed components live in `src/app/components/` and are imported by pages in `src/app/*/page.tsx`.
  - Default: components under `src/app` are server components unless they include the literal string `"use client"` at top — add that when you need state, effects, or browser-only APIs (example: `src/app/components/Navbar.tsx`).

- Data & content:
  - Static JSON used as content lives in `src/app/components/data/` (e.g. `computer_courses.json`, `science_courses.json`). Use these files as canonical data sources for course lists.
  - Static assets belong in `public/` (images, banners). Refer to them with absolute paths like `/images/...`.

- Utilities and patterns:
  - `src/app/utils/cn.ts` exports the `cn` utility used across components to merge classNames — prefer it over ad-hoc string concatenation.
  - UI uses `lucide-react` icons, `framer-motion` animations, and `tailwind-merge` for merging Tailwind classes.

- Metadata and SEO:
  - The app uses Next's Metadata API in `layout.tsx` and pages (`metadata` export). Preserve the shape when editing metadata blocks.

- Client vs Server considerations:
  - Avoid importing browser-only packages in server components. If you need `window`, DOM events, or hooks like `useState`/`useEffect`, convert the file to a client component by adding `"use client"` at the top.
  - Example: `Navbar.tsx` is a client component (it uses `useState` and imports icons).

- Linting & types:
  - Run `npm run lint` to check ESLint (project uses `eslint-config-next`). TypeScript is present (`tsconfig.json`) and `@types/*` packages are in devDependencies.

- Common edits examples:
  - To add a new route, create `src/app/<route>/page.tsx` (or a folder with a `page.tsx` and optional `layout.tsx`).
  - To add a course data item, update the appropriate JSON in `src/app/components/data/` and update the component that maps it (e.g., `FeachuerdCourses.tsx`).
  - To add a small UI primitive, place it in `src/app/components/ui/` and keep it focused and composable.

- External integrations:
  - Email sending uses `@emailjs/browser` (check components that handle contact forms under `src/app/contact` or `src/app/components` if present).

- Testing & runtime notes:
  - No test runner configured. Use the dev server to validate behavior: open `http://localhost:3000` after `npm run dev`.

- When making changes, be conservative with formatting and preserve exported API shapes; follow the existing file and component naming conventions.

If anything in this doc is unclear or you want more examples (e.g., mapping a specific JSON file into a new component), tell me which area to expand and I will update the instructions.
