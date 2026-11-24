# Lilypad website

Marketing + pricing + legal site for the Lilypad iPad app. Read `BRIEF.md` first: it has the
product facts, exact pricing, competitor comparison and the approved design direction. The app itself
lives in `../lilypad-main` (do not edit it from here).

## Stack
- Vite + React + TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), Motion (`motion/react`).
- Icons: `@phosphor-icons/react` only.
- Fonts self-hosted via `@fontsource-variable/*` (no Google Fonts `<link>`).
- Static site, client-side routes for `/`, `/privacy`, `/terms` and `/support`. Pricing is a section on the homepage only; `/pricing` is not a route and must fall through to the 404 page. Do not render a global site header or top navigation. Support stays available from the footer.

## Hosting: GitHub Pages
- Deploy with a GitHub Actions workflow (`actions/deploy-pages`) on push to `main`.
- Vite `base` must match the Pages path (`/<repo-name>/` for a project repo, `/` for a custom
  domain or a `<user>.github.io` repo). Keep it in one constant.
- GitHub Pages has no server rewrites: make deep links work (prerender each route to its own
  `index.html`, or copy `index.html` to `404.html` as SPA fallback).
- The Cloudflare Worker is only the app's account API, not this website.

## Rules
- Pricing and feature claims must match `BRIEF.md` exactly. Never invent features or numbers.
- Legal pages: preserve the meaning of `public/legal/*.html`. Make only owner-approved legal-copy edits and keep jurisdiction, privacy and consumer-rights disclosures accurate.
- Visual lead: Reflect-inspired dark hero with a restrained blue-violet glow, clean product preview and concise feature storytelling. Goodnotes informs app storytelling; Noto informs whitespace and section rhythm. Do not copy another brand.
- Use "iCloud" consistently. Never write "your iCloud" or "iCloud Drive" in public-facing copy.
- Competitor tables: use regular non-promotional prices, display `-` for unavailable/not-yet-implemented features, and highlight only clear advantages in any competitor column. Never highlight Lilypad by default.
- Light + dark mode, `prefers-reduced-motion` respected, WCAG AA contrast, mobile-first.
- No em-dashes in visible text. Title Case for buttons/nav/headings.
- Never commit secrets. No analytics or trackers (the privacy policy promises none).

## Tests
- Run `npm test` for the automated test suite. Do not substitute a production build or start the dev server when the task calls for tests only.
- The test suite uses Node's built-in test runner and native TypeScript type stripping; use Node.js 22.12 or newer. It adds no test-framework dependencies.
- Current baseline tests protect pricing data, feature comparisons, public routes, screenshot slots and the structure of the legal source documents.
- When changing product facts, pricing or route definitions, update the relevant tests and `BRIEF.md` together.
