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
npx vitest tests/components/Navbar.test.tsx
```

## Architecture


### Tech Stack
- **Next.js 16** with App Router
- **React 19** with TypeScript 5
- **Tailwind CSS 4** + CSS Modules for styling
- **Vitest** + React Testing Library for unit tests
 
### Route Organization
 
The app uses Next.js **route groups** to organize related pages without affecting URLs:
 
- `app/(public)/` — Unauthenticated routes (splash, login, signup)
- `app/(dashboard)/` — Authenticated routes (heists management)
  - Has its own `layout.tsx` that includes the Navbar component
 
Routes automatically inherit their parent layout. The `(dashboard)` layout wraps all heist-related pages with the Navbar.
 
### Import Aliases
 
TypeScript path alias `@/*` maps to project root:
```typescript
import Navbar from "@/components/Navbar" // Instead of "../../../components/Navbar"

### Styling Architecture
 
Multi-layered approach:
◇
 
1. **Global Theme** (`app/globals.css`)
  - Tailwind CSS v4 using `@theme` directive
  - Custom color palette (purple/pink accents on dark background)
  - Typography base styles (h1–h4, body)
  - Utility classes (.page-content, .center-content, .form-title)
 
2. **Component Styles** (e.g., `components/Navbar/Navbar.module.css`)
  - CSS Modules for component-scoped styles
  - Use `@reference` to access global theme variables
  - Prevents style conflicts between components
 
3. **Tailwind Utilities** – Use inline for one-off styling needs
 
### Component Structure
 
Components follow barrel export pattern:
```
components/
└── Navbar/
    ├── Navbar.tsx          # Component implementation
    ├── Navbar.module.css   # Scoped styles
    └── index.ts          # Re-exports for clean imports
```

### Testing Setup
 
- Tests in `tests/` directory mirror `components/` structure
- Vitest configured with jsdom environment and React Testing Library
- Globals enabled (no need to import `describe`, `it`, `expect`)
- Setup file: `vitest.setup.ts` imports `@testing-library/jest-dom`
 
## Additional Coding Preferences
 
- Do NOT use semicolons for JavaScript or TypeScript code.
- Do NOT apply tailwind classes directly in component templates unless essential or just 1 at most. If an element needs more than a single tailwind class, combine them into a custom class using the `@apply` directive.
- Use minimal project dependencies where possible.
- Use the `git switch -c` command to switch to new branches, not `git checkout`.
