# Portfolio Review Report

Review date: 2026-11-17. Scope: full codebase read-only audit (data, components, config, CI/CD, tooling). No source files were changed by the review.

---

## Part 1 — Bugs & non-trivial improvements

### A. Broken build, CI & deployment

1. **CI typecheck fails — undeclared `canvas` dependency.** `scripts/convert-badge.ts:11` imports `canvas`, but it's in neither `package.json` nor `package-lock.json`. `tsconfig.json:31` includes `**/*.ts`, so `npm run typecheck` in `ci.yml:28` reports `TS2307: Cannot find module 'canvas'`. `canvas` and `playwright-core` are both absent from the lockfile despite being imported by scripts.

2. **Deploy workflow is broken three ways.** `npm-publish-github-packages.yml:15,21,26`: Node 16 can't run `next@16.0.10` (needs ≥20.9); it runs `ls -R ./build` and deploys `publish_dir: ./build`, but Next outputs `.next`; and it uses `npm install` instead of `npm ci` with deprecated `@v2` actions. The workflow also publishes to GitHub Pages despite its npm/GPR filename.

3. **Stray duplicate workflow in source.** `src/components/deploy.yml` is an ignored copy of the same broken deploy config, misleading maintainers about the real deploy setup.

4. **Netlify routing serves a broken CRA shell.** `public/_redirects:1` (`/* /index.html 200`) rewrites every Next route to `public/index.html`, which still has unsubstituted `%PUBLIC_URL%` placeholders and an empty `#root`.

5. **PWA metadata is stale and unused.** `public/manifest.json` still says "React App / Create React App Sample" and references nonexistent `favicon.ico`, `logo192.png`, `logo512.png`; it's never linked from `layout.tsx`.

6. **Music toggle is dead.** `SoundProvider.tsx:24` loads `/sounds/bgm.mp3`, but there is no `public/sounds/` directory and no audio files at all. The navbar's play/pause button does nothing (the `.play()` rejection is silently swallowed).

### B. Functional & UI bugs

7. **Parallax layers are permanently frozen.** `ParallaxLayers.tsx:24` computes scroll progress from `getBoundingClientRect().top` on an element that is `position: fixed` (line 42) — `rect.top` is always `0`, so progress never changes and the whole effect is static.

8. **Broken "Repository" links in the Pokédex.** `Pokedex.tsx:131-139,257-265` renders GitHub buttons unconditionally, but `repoUrl` is optional. The "Extensions Security Scanner" entry (`pokedex.ts:69-89`) has none, producing dead links.

9. **Mangled prize amounts shown to users.** `pokedex.ts:111,137,162,210` display `Prize: ,000 USDC`, `Prize: ,000`, `Prize: 50` — the currency symbol and leading digit were stripped. Correct values exist in `badges.ts`, `resume.ts`, and `journey.ts` ($7,000 / $3,000 / $1,000 / $250).

10. **Contradictory status in one entry.** `pokedex.ts:351-352` lists both "Open for review in nsnam/ns-3-dev" and "Accepted by the ns-3 development community" for the same contribution.

11. **Visible unicode escape.** `Pokedex.tsx:293` contains `Pok\u00E9dex` in plain JSX text, where JS escapes aren't decoded — users literally see "Pok\u00E9dex".

12. **CSS animations that never run.** `hk-breathe` (`KnightFigure3D.tsx:19`) and `hk-sway` (`Lantern.tsx:12`) aren't defined in any stylesheet. Related: `KnightFigure3D.tsx:20-22` sets `style.transform: scale(...)` while Motion animates `y`, so the `scale` prop is silently overwritten and ignored.

13. **Multiple animation correctness/perf issues.** `SoulMotes3D.tsx` has no `start()` re-entry guard and leaks concurrent rAF loops; its mouse/touch handlers are attached to a `pointer-events-none` canvas so they can never fire. `WorldBackdrop.tsx` creates a stacking context that traps the "foreground" layer. `CameraBreath.tsx` runs a 60fps loop unconditionally with no visibility/reduced-motion guard. Several scroll handlers write React state on every unthrottled mousemove with heavy `blur()`.

14. **Reduced-motion is largely ignored in JS.** `globals.css` only covers CSS animations; several scroll/mouse-driven components still animate for users who requested reduced motion.

15. **Mirroring bug on vines.** `HangingVines.tsx` uses `-scale-x-100` to mirror right-side vines, but the inline `transform` passed from `ForegroundParallax` overrides it.

16. **Wasted deep-link data.** `Inventory.tsx` links every "Related Project" to the generic `/Projects` route, so clicking "RupeeRail" lands on a Pokédex with nothing selected — even though the data stores the project names for exactly this purpose.

### C. Accessibility (substantive)

17. **Keyboard users can't open achievement details.** `Achievements.tsx` uses `<article onClick>` with no `tabIndex`, `role="button"`, or `onKeyDown`.

18. **Modals have no focus management.** `Achievements.tsx` declares `aria-modal="true"` but never moves focus in, traps it, or restores it on close. `Pokedex.tsx` has the same issue and its backdrop isn't clickable to dismiss.

19. **Tab widgets don't follow the ARIA tab pattern.** `Journey.tsx`, `BadgeCase.tsx`, `Inventory.tsx` use `role="tab"`/`aria-selected` but have no `role="tabpanel"`, `aria-controls`, or arrow-key/roving-tabindex handling.

### D. Data credibility

20. **Contradictory IRIS dates.** `resume.ts:62` says "Head of Maintenance — November 2024 – Present", while `journey.ts:77`, `badges.ts:103`, and `pokedex.ts:61` all say **April 2026** for that role (with Web Lead Dec 2025 – Apr 2026 and developer from Nov 2024).

21. **Inconsistent Microsoft job title.** "Software Engineering Intern" (`trainer.ts:20`, `badges.ts:41`) vs "Software Development Engineer Intern" (`resume.ts:47`, `journey.ts:44`).

22. **Prize formatting inconsistency.** `resume.ts:96,101` use `$3000` / `$1000` without thousands separators while every other file uses `$3,000` / `$1,000`.

### E. Dependency bloat & hygiene

23. **~18 unused runtime dependencies.** All `@radix-ui/*`, all `@supabase/*`, `googleapis`, `@types/gapi.client.youtube-v3`, `class-variance-authority`, `date-fns`, `next-themes`, `react-hook-form`, `sonner`, `zod` have zero imports. `framer-motion` duplicates `motion` (only `motion/react` is used).

24. **Tailwind v3/v4 mismatch.** `globals.css:5` loads `@plugin "tailwindcss-animate"` (v3 plugin) under Tailwind v4, while the installed v4-compatible `tw-animate-css` is never imported.

25. **Large volumes of dead/duplicate code.** Dead CRA tree (`src/App.js`, `src/index.js`, `src/App.test.js`, `src/App.css`, `src/index.css`), a full duplicate `src/components/LetterGlitch.js`, orphaned `Marquee.jsx`/`bento-grid.jsx`/`style.css`, duplicated `src/lib/utils.js`, and top-level duplicates `src/app/Navbar.tsx`, `src/app/SoundProvider.tsx`, `src/app/Pokedex.tsx`, `src/app/PixelIcon.tsx`.

26. **Minor but real.** `next.config.mjs:4-6` disables image optimization site-wide with no static export; `.gitignore:25-28` doesn't ignore plain `.env*` files; no security headers; `layout.tsx:8-11` has only title/description — no OpenGraph, canonical, or per-page metadata, and `robots.txt` has no `Sitemap:` directive.

---

## Part 2 — New features you could add

Ranked by value-to-effort for a portfolio aimed at engineering roles:

**High value**

1. **Working contact form with a real endpoint.** The current Contact section deliberately omits a form. Add a server action (validation with the already-installed `zod`, honeypot + rate limiting, email via Resend/Formspree).

2. **Deep-linkable project detail pages + shareable state.** Move project/badge/inventory details from modals into real routes (e.g. `/Projects/RupeeRail`) with URL-synced selection and browser back/forward. Fixes finding #16, improves SEO, and makes links shareable.

3. **Command palette / "Pokédex search" (⌘K).** Fuzzy search across projects, skills, badges, and journey entries, keyboard-first. Fits the game theme.

4. **OG images + full SEO metadata.** Dynamic social-share cards per project using `next/og` `ImageResponse`, plus OpenGraph/Twitter tags, canonical URLs, JSON-LD, and a sitemap.

**Medium value**

5. **"Field Notes" / engineering blog (MDX).** Short posts on systems, security, networking, and AI — your actual strengths. Include tags, reading time, and RSS.

6. **Theme switcher.** `next-themes` is already installed but unused. Add a light/dark (or "Kanto/Joho" palette) toggle with system detection and persistence.

7. **Functional, persistent audio.** Ship an actual audio asset (or synthesize a chiptune loop with the Web Audio API already in `SoundProvider`), add a volume control, and remember the user's preference in `localStorage`.

8. **Tailored resume variants.** Generate print-ready PDF variants from the structured resume data via query params (e.g. `?role=backend`, `?role=security`).

9. **Privacy-friendly visitor counter / "game stats".** A pixel-art styled counter using a lightweight endpoint or Plausible.

**Nice-to-have**

10. **Guestbook / "sign the Trainer Card".** Lightweight, moderated messages from visitors.
11. **Testimonials / recommendations** section from mentors and teammates.
12. **"Now" / status page.** A single page showing what you're currently building, learning, and open to.

---

## Recommended priority

Fix in this order: **(1)** CI/dependency and deploy blockers, **(2)** the broken music toggle and visible data bugs (prizes, `Pok\u00E9dex`, dates), **(3)** accessibility (keyboard cards, modals, tabs), then **(4)** pick two high-value features — I'd suggest deep-linkable detail pages and OG/SEO metadata.
