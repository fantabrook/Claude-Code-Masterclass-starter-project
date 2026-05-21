# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Pocket Heist — a Next.js 16 + React 19 + Tailwind CSS 4 starter project for the Claude Code Masterclass. It's a mock "mission board" app where users accept and assign office heists.

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build
npm run lint       # ESLint (Next.js + TypeScript rules)
npm run test       # Run Vitest suite (watch mode)
```

To run a single test file:
```bash
npx vitest run tests/components/Navbar.test.tsx
```

## Architecture

### Tech Stack
- **Next.js 16** with App Router
- **React 19** with TypeScript 5
- **Tailwind CSS 4** + CSS Modules for styling
- **Vitest** + React Testing Library for unit tests
- **lucide-react** — the only icon library in use; import icons from here

### Route Organization

The app uses Next.js **route groups** to organize related pages without affecting URLs:

- `app/(public)/` — Unauthenticated routes (splash, login, signup); layout wraps content in `<main className="public">` which applies `text-4xl` to h1
- `app/(dashboard)/` — Authenticated routes (heists management); layout includes the Navbar component

Routes automatically inherit their parent layout.

### Import Aliases

TypeScript path alias `@/*` maps to project root:
```typescript
import Navbar from "@/components/Navbar" // Instead of "../../../components/Navbar"
```

### Styling Architecture

Multi-layered approach:

1. **Global Theme** (`app/globals.css`)
   - Tailwind CSS v4 using `@theme` directive
   - Color palette: `--color-primary` (#C27AFF purple), `--color-secondary` (#FB64B6 pink), `--color-dark` (#030712), `--color-light` (#0A101D), `--color-lighter` (#101828), `--color-success` (#05DF72), `--color-error` (#FF6467), `--color-heading` (white), `--color-body` (#99A1AF)
   - Utility classes: `.page-content`, `.center-content`, `.btn`, `.form-title`, `.preview-grid`

2. **Component Styles** (e.g., `components/Navbar/Navbar.module.css`)
   - CSS Modules for component-scoped styles
   - Use `@reference "../../app/globals.css"` at the top to access theme variables
   - Combine multiple Tailwind utilities into named classes with `@apply`

3. **Tailwind Utilities** — use inline only for a single class at most; anything requiring 2+ classes goes in a CSS Module

### Component Structure

Components follow the barrel export pattern:
```
components/
└── AuthForm/
    ├── AuthForm.tsx          # Component implementation
    ├── AuthForm.module.css   # Scoped styles
    └── index.ts              # export { default } from './AuthForm'
```

Interactive components (useState, event handlers) require `"use client"` at the top of the file.

### Testing Setup

- Tests in `tests/` directory mirror `components/` structure
- Vitest configured with jsdom environment and React Testing Library
- Globals enabled (`describe`, `it`, `expect` available without imports — but `vi` must be imported)
- Setup file: `vitest.setup.ts` imports `@testing-library/jest-dom/vitest`
- Path aliases resolve in tests via `vite-tsconfig-paths` plugin

## Coding Preferences

- No semicolons in JavaScript or TypeScript
- No more than 1 inline Tailwind class per element — use `@apply` in CSS Modules for anything more
- Minimal dependencies — prefer the libraries already in use over adding new ones
- Use `git switch -c` to create new branches
