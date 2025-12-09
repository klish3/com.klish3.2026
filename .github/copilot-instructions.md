# Copilot Instructions for com.klish3.2024

## Project Overview
A React + TypeScript + Vite personal portfolio website with a resume/timeline component and coming soon landing page. Deployed to Firebase Hosting with Firestore backend and Storage capabilities.

**Key Stack:**
- React 18 + TypeScript (strict mode)
- Vite for bundling (dev: `npm run dev`, build: `npm run build`)
- TailwindCSS for styling (via Flowbite React components)
- React Router v6 (two main routes: `/` for ComingSoon, `/home` for Resume)
- Firebase (Firestore, Storage, Hosting)

## Architecture & Data Flow

### Page Structure
- **App.tsx**: Root component for `/home` route - currently displays the Resume landing page
- **pages/Resume/**: Main resume portfolio section with sub-components:
  - `Landing.tsx`: Entry point that renders TimeLineKli component
  - `Resume.tsx`: Wrapper for timeline display
  - `Header.tsx`, `Summary.tsx`, `Experience.tsx`, `Education.tsx`, `Certifications.tsx`, `Competencies.tsx`: Resume sections
- **pages/ComingSoon/**: Static coming soon landing page at `/`
- **components/Nav/**: Global navigation bar with dark mode toggle (Flowbite DarkThemeToggle)

### Client-Side Routing
- Configured in `main.tsx` with `react-router-dom` v6
- Nav component wraps all routes (persistent header)
- Uses `RouterProvider` with `createBrowserRouter`

### Styling Approach
- **Tailwind CSS** with Flowbite plugin integration
- Prettier auto-formats Tailwind class order via `prettier-plugin-tailwindcss`
- Flowbite React components provide pre-built UI (Navbar, DarkThemeToggle, etc.)
- ESLint rule: `eslint-plugin-tailwindcss` enforces Tailwind conventions

## Development Workflows

### Scripts
- `npm run dev`: Start Vite dev server with HMR
- `npm run build`: Compile TypeScript, then build with Vite (outputs to `dist/`)
- `npm run lint`: Check ESLint rules (strict, no unused variables/imports)
- `npm run pretty`: Check Prettier formatting
- `npm run lint:fix`: Auto-fix formatting with Prettier

### Build & Deployment
- Production build creates `dist/` folder
- `firebase.json` configured to serve from `dist/` with SPA rewrites (all routes → `/index.html`)
- TypeScript strict mode enabled (`strict: true`, `noUnusedLocals`, `noUnusedParameters`)

### Linting & Type Checking
- **ESLint** with TypeScript support (@typescript-eslint)
- **Prettier** configured with Tailwind class sorting
- **Type Checking**: `tsc -b` runs before Vite build in CI/CD
- Max 0 warnings allowed in lint

## Code Conventions

### Component Structure
- All components in `src/components/` or `src/pages/`
- Each component directory has `index.ts` (barrel exports) and component file (e.g., `Nav.tsx`)
- Use `export const ComponentName: React.FC = () => {...}` pattern (typed functional components)
- Add `"use client"` directive at top of client components (Next.js convention adopted)

### TypeScript Patterns
- Strict mode: always type function returns and props
- Avoid `any`; use generics or `unknown` with type guards
- Destructure props explicitly in function parameters

### Styling
- Use Tailwind utility classes exclusively
- Leverage Flowbite React components for consistent UI (e.g., `<Navbar>`, `<DarkThemeToggle>`)
- Responsive design via Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Apply `prettier-plugin-tailwindcss` auto-sorting to class lists

### File Naming
- Components: PascalCase (e.g., `Nav.tsx`, `Resume.tsx`)
- Exports: index.ts for barrel exports
- No separate CSS files (Tailwind only)

## Integration Points & Dependencies

### Firebase Setup
- `firebase.json` defines:
  - Firestore rules via `firestore.rules`
  - Storage rules via `storage.rules`
  - Hosting config with SPA rewrites to support React Router
- Firestore indexes in `firestore.indexes.json`
- **Note**: Firebase SDK not yet imported; add it via `npm install firebase` when backend integration needed

### External Libraries
- **flowbite-react**: Pre-built React components (navbar, toggles, etc.)
- **apexcharts**: For potential chart/graph rendering (imported but check where used)
- **@million/lint**: Linting for Million.js optimizations (dev dependency)

### CSS Toolchain
- PostCSS + Autoprefixer for vendor prefixes
- Tailwind CSS JIT (Just-in-Time) compilation

## Important Files & Patterns

| File | Purpose |
|------|---------|
| `src/App.tsx` | Root `/home` page component |
| `src/main.tsx` | Router setup & React DOM render |
| `src/index.css` | Tailwind directives import |
| `src/pages/Resume/Landing.tsx` | Resume entry point |
| `src/components/Nav/Nav.tsx` | Global navigation with dark mode |
| `tailwind.config.js` | Tailwind + Flowbite configuration |
| `vite.config.ts` | Vite build configuration |
| `firebase.json` | Firebase hosting & Firestore config |

## Testing & Debugging

- No test framework currently configured (consider adding Vitest for unit tests)
- Use browser DevTools + Vite HMR for debugging
- Check Console tab for TypeScript/ESLint errors in dev server output
- Firebase Rules emulator can be used locally (set up via Firebase CLI)

## Common Patterns to Follow

1. **Creating new components**: Place in `src/components/ComponentName/` with `index.ts` barrel export
2. **Adding pages**: Create in `src/pages/PageName/` and register route in `main.tsx`
3. **Styling**: Only Tailwind classes—no CSS files or inline styles
4. **Type safety**: Export component types explicitly for reusability
5. **Imports**: Use relative paths; consider path aliases if src grows large

## Known Issues & TODOs

- Firebase SDK not yet initialized (auth, Firestore writes, etc. not configured)
- ApexCharts imported but usage not visible (may be unused dependency)
- ComingSoon page might redirect to Resume in future
