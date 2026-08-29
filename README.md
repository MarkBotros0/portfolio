# Mark Botros — Portfolio

Single-page portfolio / interactive CV. React 19 + TypeScript + Vite + Tailwind CSS v4, no UI kit.
Built from the v3 "Max effects" design handoff.

## Commands

```bash
npm install     # install dependencies
npm run dev     # dev server on http://localhost:5173
npm run build   # typecheck + production build to dist/
npm run preview # serve the production build
```

## Editing content

All copy lives in [`src/data/portfolio.ts`](src/data/portfolio.ts) — profile, highlights,
featured projects, personal projects, experience, skills, and certifications.
Adding a project is adding one object there; no component changes needed.

To drop in real product screenshots, set the `image` field on a featured project
(e.g. `image: '/shots/snurra.png'` with the file under `public/shots/`). The striped
placeholder frame renders whenever `image` is absent.

## Structure

- `src/data/portfolio.ts` — all content, typed
- `src/components/` — purely presentational sections (Nav, Hero, BentoStats, Marquee,
  ProjectCase, PersonalCard, Timeline, SkillsGrid, Credentials, Contact, CommandPalette, …)
- `src/hooks/` — motion & UI behavior: `usePageFx` (spotlight / tilt / magnet / cursor glow /
  scroll reveal / progress + sticky-stack dim), `useSectionSpy`, `useTypewriter`, `useMedia`
- `src/index.css` — design tokens, keyframes, and all component styles

Every effect is disabled under `prefers-reduced-motion` and on touch (`hover: none`) devices.
The accent color is one CSS variable (`--a`) — swappable via the `accent` prop on `<App/>`
(alternates: cyan `oklch(0.82 0.16 190)`, green `oklch(0.80 0.19 145)`, amber `oklch(0.78 0.17 55)`).
`<App projectDetailsOpen>` opens all six case-study details (useful for print/PDF).
