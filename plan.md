# Implementation Plan: gfmc Portfolio Site Refactor

Status: Approved
Approved: 2026-11-20

## Context

The gfmc repository is a personal portfolio site for Felipe Mariño (geduma.com). The site is built with vanilla HTML, CSS, and JavaScript using Vite as the build tool and Biome for linting/formatting. The project was deployed to Azure Static Web Apps via a GitHub Actions workflow.

The original codebase had several issues:

- Inline critical CSS in index.html (68 lines duplicated from style.css)
- Monolithic main.js (~209 lines) handling i18n, skeleton loading, and UI logic
- i18n translations embedded in JavaScript object (not externalizable)
- No critical CSS automation (manual maintenance required)
- Basic SEO (missing JSON-LD, sitemap.xml, robots.txt, LLMS.txt, proper OG tags)
- CI/CD using deprecated GitHub Actions v3
- No lint/build gates before deployment

## Phase Summary

### Phase 1: Cleanup & Structure

- Removed inline critical CSS from index.html (68 lines)
- Modularized main.js into three focused modules:
  - `src/i18n.js` — Internationalization logic
  - `src/skeleton.js` — Loading skeleton logic (later removed in Phase 2 refinement)
  - `src/ui.js` — UI logic (language toggle, scroll position)
- Updated .gitignore to include dist-ssr/
- Created src/ directory structure

### Phase 2: Robust i18n (Single Source of Truth)

- Created `locales/en.json` and `locales/es.json` with all 58 translation keys
- Added Vite plugin (`i18n-injector`) that injects translations as a virtual module at build time
- Refactored `src/i18n.js` to import from virtual module instead of inline object
- Removed `src/skeleton.js` and all skeleton-related code (over-engineering for static portfolio)
- Updated `src/i18n.js` to read `?lang=` query parameter and honor hreflang

### Phase 3: Critical CSS Automation

- Created `src/critical.css` with minimal critical styles (CSS variables, html/body background, focus states, visually-hidden)
- Added Vite plugin (`critical-css-auto`) that reads `src/critical.css`, minifies it, and injects into `<head>` of built HTML
- No hardcoded asset hashes; no full CSS duplication

### Phase 4: SEO / Technical

- Added JSON-LD Person schema to index.html
- Enhanced Open Graph tags (image, site name, type, locale)
- Added Twitter Card meta tags
- Added alternate language links (hreflang en/es)
- Added sitemap link
- Created `public/robots.txt` with sitemap reference
- Created `public/sitemap.xml` with homepage + lastmod
- Created `public/LLMS.txt` for AI discoverability (accurate project names: Relio, Vertida, GNotes, etc.)
- Updated meta keywords to reflect actual tech stack (no TypeScript/React)
- Fixed duplicate meta tags in index.html
- Fixed indentation issues in index.html

### Phase 5: CI/CD Modernization

- Updated Azure Static Web Apps workflow from actions@v3 to v4
- Split into two jobs: `lint-and-build` (gate) and `build_and_deploy` (deploy)
- `lint-and-build` runs lint and build, uploads `dist` as artifact
- `build_and_deploy` downloads artifact, uses `skip_app_build: true` to deploy same build
- Created dedicated `.github/workflows/ci.yml` for lint/build verification on all PRs

## Files Changed

### Created

- `src/i18n.js`
- `src/ui.js`
- `src/critical.css`
- `locales/en.json`
- `locales/es.json`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/LLMS.txt`
- `.github/workflows/ci.yml`
- `plan.md` (this file)

### Modified

- `index.html` (removed inline CSS, skeleton div, duplicate meta tags, added SEO tags, fixed indentation)
- `main.js` (simplified entry point)
- `.gitignore` (added dist-ssr/)
- `vite.config.js` (i18n injector, critical CSS auto-injection)
- `.github/workflows/azure-static-web-apps-gentle-tree-038b3d110.yml` (v4 actions, artifact sharing)

### Deleted

- `src/skeleton.js`

## Verification Gates

All gates pass:

- `npm run lint` — Passes (8 pre-existing CSS specificity warnings acceptable)
- `npm run build` — Passes (critical CSS injected, no skeleton, correct artifacts in dist/)
- `npm run format` — Passes

## Remaining Technical Debt

- CSS descending specificity warnings (8 instances in style.css) — cosmetic only, does not affect functionality
- No TypeScript migration (out of scope per requirements)
- No unit tests (static portfolio, low ROI for testing i18n/UI logic)
