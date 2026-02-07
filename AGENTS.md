# AGENTS.md

This file provides guidelines for agentic coding agents working on this self-hosted dashboard.

## Build Commands

```bash
npm run dev          # Start Vite development server (http://localhost:5173)
npm run build        # Build for production (tsc && vite build)
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

Note: No test framework is configured. Add Vitest or Jest before implementing tests.

## Code Style Guidelines

### TypeScript Configuration
- Strict mode enabled with `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- ES2020 target, ESNext modules
- JSX transform: `react-jsx`

### Imports & Module System
- Use ES modules (import/export)
- Absolute imports with `@/*` alias for src files: `import { X } from '@/components/X'`
- Named exports preferred for components: `export function Component() {}`
- Import React types explicitly: `import type { ReactNode } from 'react'`

### Component Patterns
- Functional components only (no class components)
- Define props interface above component: `interface Props {}`
- Use TypeScript interfaces for types
- Named exports (not default): `export function ComponentName() {}`
- Use `useCallback` for memoized callbacks
- Use `useState` for local state
- No `"use client"` directive needed (Vite, not Next.js)

### Naming Conventions
- Components: PascalCase (e.g., `AppGrid`, `BrandIcon`)
- Variables/Functions: camelCase (e.g., `appCategories`, `getGreeting`)
- Constants: UPPER_SNAKE_CASE (e.g., `CDN_BASE`, `ICON_SIZE`)
- CSS classes: Use Tailwind utilities, kebab-case for custom classes
- File names: PascalCase for components, camelCase for utilities

### Styling
- Use Tailwind CSS for all styling
- CSS custom properties in `styles/index.css` for theming
- Glass morphism pattern: `backdrop-blur`, semi-transparent backgrounds
- Design language: Apple-inspired, clean and minimal
- Responsive classes: use mobile-first approach with Tailwind breakpoints

### Error Handling
- Image error handling with `onError` and fallback states
- Async functions should use try-catch when implemented
- Display fallback content when resources fail to load

### File Organization
```
src/
  components/     # UI components grouped by feature (Layout, Apps, Widgets, Icon)
  data/          # Static configuration (apps, status)
  services/      # Pure logic functions (e.g., greeting)
  styles/        # Global styles (Tailwind directives)
  types/         # TypeScript type definitions
```

### Best Practices
- Single Responsibility Principle: one concern per file/function
- Clean Code principles: descriptive names, no magic numbers
- Comments in Chinese for documentation (this is a Chinese-language project)
- Use JSDoc-style comments for functions: `/** Description */`
- Separate data from logic
- No inline `<script>` tags in components
- Use `loading="lazy"` for images

### Path Aliases
- `@/*` maps to `src/*`
- Assets: `import bg from '@/assets/bg.jpg'`

### ESLint
- Uses `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`
- React hooks rules enforced
- No unused disable directives allowed
- Max warnings: 0

### Deployment
- Build output: `dist/`
- Static site (Cloudflare Pages compatible)
- No server-side rendering

### Data Configuration
- Apps configured in `src/data/apps.ts` with `appCategories` array
- Each app needs: `id`, `name`, `href?`, `icon`, `iconUrl?`, `iconFallback?`
- Icons from Simple Icons CDN (https://simpleicons.org)
- Custom icons via `iconUrl` with fallback to `iconFallback`
