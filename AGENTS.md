# AGENTS.md — chhuparustam.com.np Portfolio

## Project
Production-quality personal developer portfolio for `chhuparustam.com.np`. Do not write implementation code until a phase is explicitly approved.

## Current State (verified 2026-09-24)
- Only `client/` exists: stock Vite + React 19 + JS template (`src/App.jsx`, `src/main.jsx`, `src/index.css`, `src/App.css`).
- No `server/`, no root `package.json`, no `AGENTS.md`, no CI, no tests, no `opencode.json`.
- Executable truth: `client/package.json` scripts are `dev` / `build` / `lint` / `preview`. `client/vite.config.js` is stock `plugin-react` only.

## Stack — Hard Constraints
- Frontend: React + Vite + JavaScript only (no TypeScript conversion).
- Backend: Node.js + Express (to be created in `server/`).
- Styling: Vanilla CSS only. No Tailwind, no Bootstrap, no component library, no CSS-in-JS.
- Keep deps minimal: `react`, `react-dom` only on frontend unless explicitly approved.

## Commands
- All frontend commands run in `client/`, not repo root:
  - `npm run dev` — Vite dev server with HMR
  - `npm run build` — production build (verifies before any phase is done)
  - `npm run preview` — serve `dist/` locally
  - `npm run lint` — ESLint flat config (`client/eslint.config.js`, ignores `dist`)
- Backend (once `server/` exists): `npm run dev` / `npm start` inside `server/`. Never add backend deps to `client/`.

## Target Architecture
- `client/` — static portfolio SPA. Entrypoints: `index.html` -> `src/main.jsx` -> `src/App.jsx`. Assets in `public/` (favicons, icons) and `src/assets/`.
- `server/` (missing — scaffold when Phase 4 approved): minimal Express API only for what static hosting cannot do (contact form, rate-limiting, mail send). Otherwise site must work fully static from `client/dist`.
- Prod: Express serves `client/dist` + `/api/*`; dev: Vite dev server proxies `/api` to Express to avoid CORS drift. Do not introduce monorepo tooling.

## Component / CSS Structure (target, not yet built)
- `src/components/` — one folder per section: `Navbar/`, `Hero/`, `About/`, `Projects/`, `Experience/`, `Contact/`, `Footer/`, plus `common/` (SectionHeading, Grid, TerminalLine).
- Co-locate: `Component.jsx` + `Component.css` per component. Global tokens only in `src/styles/tokens.css` (colors, type scale, spacing, grid) imported by `src/index.css`.
- Data: static content in `src/data/*.js` (projects, experience). No backend fetch for portfolio content.

## Design System — Do Not Violate
- Direction: editorial, technical, minimal, dark, sophisticated; subtle cyber/terminal influence; strong typography; generous whitespace; grid-based layout; restrained motion.
- Banned: excessive gradients, glassmorphism, random glows, generic "AI portfolio" hero (gradient blobs, purple-blue washes, floating cards).
- Typography-led hierarchy; CSS custom properties for theme; `prefers-reduced-motion` must disable non-essential animation.

## Phases — Build In Order
1. Foundation: tokens, grid, typography, layout shell + Navbar/Footer (verify: `npm run build`, `npm run lint` in `client/`).
2. Core sections: Hero, About, Projects, Experience (static `src/data/*.js`).
3. Polish: Contact, SEO/meta, accessibility, responsive, performance.
4. Backend: scaffold `server/` Express + `/api/contact` only if needed; wire Vite proxy + prod static serve.
5. Deploy: `chhuparustam.com.np` release checklist.

## Agent Gotchas
- Trust `client/package.json` and `client/vite.config.js` over `README.md` (README is still Vite boilerplate).
- Existing `src/App.css` / `src/index.css` are Vite demo styles — replace during Phase 1, do not extend.
- Windows PowerShell host: use `workdir` param, chain with `; if ($?) { ... }`; never `cd` inside commands.
