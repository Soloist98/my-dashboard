# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Self-hosted dashboard for displaying links to self-hosted apps and services. Static site deployed on Cloudflare Pages. Chinese-language project — use Chinese for comments and documentation.

## Build & Dev Commands

```bash
npm install              # Install dependencies
npm run dev              # Vite dev server at http://localhost:5173 (with --host)
npm run build            # TypeScript check + Vite production build (tsc -b && vite build)
npm run preview          # Preview production build
npm run lint             # ESLint, strict mode (--max-warnings 0)
```

No test framework is configured. If tests are needed, add Vitest first.

## Tech Stack

React 18 + TypeScript (strict) + Vite 5 + Tailwind CSS 3. No SSR, no external component libraries.

## Architecture

**Entry flow:** `index.html` → `src/main.tsx` → `src/App.tsx` → `Background` → `AppGrid`

**Source layout:**
- `src/components/` — UI components grouped by feature: `Apps/`, `Layout/`, `Widgets/`, `Icon/`, `Search/`
- `src/data/apps.ts` — App categories and items configuration (the main data source to edit when adding/removing apps)
- `src/services/` — Pure logic functions (e.g., time-based greeting)
- `src/types/index.ts` — Shared TypeScript interfaces (`AppItem`, `AppCategory`, `StatusWidget`)
- `src/styles/index.css` — Tailwind directives + CSS custom properties (`--glass-bg`, `--glass-border`)

**Key component relationships:**
- `AppGrid` manages expand/collapse state for all categories and handles responsive layout (3-column desktop at `min-[900px]`, single column mobile)
- `CollapsibleCategory` renders a toggleable section of `AppIcon` items; supports a `compact` mode for the sidebar
- `BrandIcon` loads SVGs from Simple Icons CDN with fallback chain: CDN → custom `iconUrl` → emoji/text
- `StatusCard`/`StatusPanel` and `SearchBar` exist but are not currently wired into `App.tsx`

## Code Conventions

- **Imports:** Use `@/*` path alias for `src/` (e.g., `import { X } from '@/components/X'`)
- **Components:** Functional only, named exports (`export function Component() {}`), props defined as `interface Props {}`
- **Naming:** PascalCase files/components, camelCase functions/variables, UPPER_SNAKE_CASE constants
- **Styling:** Tailwind CSS only. Glass morphism pattern throughout (`backdrop-blur`, semi-transparent backgrounds). Apple-inspired minimal design
- **Images:** Always use `loading="lazy"` and implement `onError` fallbacks
- **TypeScript:** Strict mode — no unused locals/parameters, no `any` types

## Deployment

Static build to `dist/`. Deploy via Cloudflare Pages Git integration or `npx wrangler pages deploy dist --project-name=self-hosted-dashboard`.

## Adding Apps

Edit `src/data/apps.ts`. Each item needs: `id`, `name`, `icon` (Simple Icons slug), and optionally `href`, `iconUrl`, `iconFallback`. Browse icons at https://simpleicons.org.
