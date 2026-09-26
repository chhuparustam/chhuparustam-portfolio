# DESIGN_SYSTEM.md — CHHUPARUSTAM://PYTHON

Source of truth for implementation. Vanilla CSS only. Single dark theme.

## 1. Brand identity
- Brand: `CHHUPARUSTAM://PYTHON` — Python Developer, Cybersecurity Enthusiast, Kathmandu, Nepal.
- Feel: personal engineering journal / field notebook + modern portfolio. Technical, professional, minimal, dark, editorial.
- Cyber/security and Python are visual accents (mono metadata, status dots, restrained blue/yellow micro-use), never costume.

## 2. Color tokens (`styles/tokens.css`)
- `--color-bg: #0a0c10` · `--color-surface: #10141b` · `--color-surface-elevated: #161c26`
- `--color-text: #e8ebf0` · `--color-text-muted: #a3adbd` · `--color-text-subtle: #7d8797`
- `--color-border: #1f2733` · `--color-border-strong: #2c3748` · `--color-code-bg: #12161d`
- `--color-accent: #7fb4e6` (links, active nav, focus, hover) · `--color-accent-secondary: #e3c245` (tiny highlights only)
- `--color-success: #3fb950` · `--color-warning: #d29922` · `--color-danger: #f85149`
- Accents are micro-use: links, active nav, small labels, status dots, metadata, hover. Never large fills or neon washes.

## 3. Typography (`styles/typography.css`)
- `--font-sans`: system stack — display, headings, body. `--font-mono`: system mono — code, tech labels, section numbers, nav metadata, status, project metadata only. Never mono body copy.
- Scale: `--text-display: clamp(2.75rem,6vw,4.5rem)` · `--text-h1` · `--text-h2` · `--text-h3: 1.25rem` · `--text-body-lg: 1.125rem` · `--text-body: 1rem` · `--text-body-sm` · `--text-caption` · `--text-tech-label: 0.75rem` (uppercase, `0.08em` tracking) · `--text-code`.
- Generous line-height: 1.05 display → 1.7 body. Classes: `.display .h1 .h2 .h3 .body-lg .body .body-sm .caption .tech-label .code`, `pre.code-block`.

## 4. Spacing (`tokens.css`)
- 4px-base scale: `--space-1,2,3,4,5,6,8,10,12,16,20,24` (`0.25rem→6rem`). `--section-gap: 6rem`, mobile `4rem`. Generous whitespace; no magic values, no cramped layouts.

## 5. Grid (`styles/layout.css`)
- `.container` max `1140px`, gutters `1.5rem` / `1rem` mobile. `.section` (block padding + top rule) > `.section__inner` > `.grid-12` (12 cols desktop → 8 tablet → 1 mobile; `.span-*` helpers). `.stack` (+ `--tight/--loose`) for vertical rhythm, `.cluster` for wrapping rows. No arbitrary margins.

## 6. Components (`styles/components.css`)
- Section header: `.section-header` > `__index` (mono accent, e.g. `01`) + `__title` + optional `__lede` — pattern `01 / ABOUT`.
- Project metadata: `.project-meta` with `STACK / STATUS / YEAR / TYPE` mono pairs (`__key` subtle, `__value` muted).
- Divider: `hr.divider` — 1px border, no margin. Surfaces: flat editorial panels, 1px borders, no shadows/glows.
- Status: `.status` + `.status__dot` + text (dot never alone); `--learning` = warning dot, `--inactive` = subtle dot; optional `.status__dot--live` pulse.
- Badge: `.badge` — mono uppercase micro-label, 1px border, `3px` radius.

## 7. Buttons
- `.btn` base (mono uppercase, `44px` min-height, `3px` radius) + `--primary` (accent fill, dark text) / `--secondary` (border, accent hover) / `--ghost` (borderless, muted) / `--text` (link-like). States: hover/active/disabled/focus-visible (2px accent outline). Small radius only.

## 8. Navigation
- `.nav-brand` (`CHHUPARUSTAM://PYTHON`) + `.nav-link` (mono uppercase, muted → text hover, accent at `aria-current="page"`). Desktop: inline numbered (`01 HOME … 08 CONTACT`); mobile: disclosure button + panel with focus management (built in later phase, not this one).

## 9. Project system
- `.project-entry`: archive row — number + title + description + `.project-meta` + `.tech-badges` + GitHub/demo links. `--featured`: stronger hierarchy via `2px` secondary-accent left rule, not glow/cards. No fake metrics — no stars, users, scores, downloads.

## 10. Tech badges (CSS contract + data, no component yet)
- CSS: `.tech-badges` wrap cluster; `.tech-badge` = `[ Python ]` metadata chip (transparent, 1px border, mono, compact padding, `3px` radius; hover → accent border + text). `--learning` = dashed border + warning dot + subtle text; markup must pair dot with `aria-label` text. No glow, gradients, logos, color-coded proficiency, percentages, or progress bars.
- Data: `src/data/techStack.js` — `techStack { languages, frameworks, databases, tools, cybersecurity }`, entries `{ slug, label, proficiency }` with `PROFICIENCY { USED_IN_PROJECTS, FAMILIAR, LEARNING }` and `PROFICIENCY_LABELS { 'Used in Projects', 'Familiar', 'Currently Learning' }`. All consumers import from here. Current seed is conservative (`used` only with project/GitHub evidence); correct when project data lands.

## 11. Animation rules (`styles/animations.css`)
- Fast/subtle/functional: `120–200ms` ease-out; hover/focus, `.reveal` (opt-in IO `.is-visible`, ≤8px translate), project hover, status pulse `2.4s`. No parallax, glitch, long loaders, scroll spam. `prefers-reduced-motion: reduce` disables all non-essential motion.

## 12. Responsive rules
- Breakpoints: mobile `0–640` · tablet `641–1024` · desktop `1025–1440` · wide `>1440`. Type (clamp), section gap, grid columns, nav, `.project-entry` (2-col → 1-col) adapt intentionally per breakpoint. No horizontal overflow (`overflow-x: clip` on `#root`).

## 13. Accessibility rules
- Contrast-targeted palette; visible `:focus-visible` everywhere; reduced-motion support; semantic HTML order planned; `≥16px` body, `44px` targets; state never color-only (status/badge pair dot + label). External links get `↗` via `[data-external]` + accessible name.

## 14. Things explicitly avoided
Generic AI hero, SaaS landing look, template portfolio, neon/cyberpunk hacker clichés, glassmorphism, heavy gradients, floating rounded cards, pill UI, thick borders, glows, Matrix rain, skulls, fake terminals/hacking, `ACCESS GRANTED`, binary spam, skill % bars, ranked/exaggerated skills, fake project metrics, Tailwind/Bootstrap/component libraries.
