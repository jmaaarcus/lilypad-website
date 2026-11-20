# Lilypad website

Marketing + pricing + legal site for the Lilypad iPad app. Read `BRIEF.md` first: it has the
product facts, exact pricing, competitor comparison and the design direction. The app itself
lives in `../lilypad-main` (do not edit it from here).

## Stack
- Vite + React + TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), Motion (`motion/react`).
- Icons: `@phosphor-icons/react` only.
- Fonts self-hosted via `@fontsource-variable/*` (no Google Fonts `<link>`).
- Static site, client-side routes for `/`, `/pricing`, `/privacy`, `/terms`, `/support`.

## Hosting: GitHub Pages
- Deploy with a GitHub Actions workflow (`actions/deploy-pages`) on push to `main`.
- Vite `base` must match the Pages path (`/<repo-name>/` for a project repo, `/` for a custom
  domain or a `<user>.github.io` repo). Keep it in one constant.
- GitHub Pages has no server rewrites: make deep links work (prerender each route to its own
  `index.html`, or copy `index.html` to `404.html` as SPA fallback).
- The Cloudflare Worker is only the app's account API, not this website.

## Rules
- Pricing and feature claims must match `BRIEF.md` exactly. Never invent features or numbers.
- Legal pages: same wording as `public/legal/*.html`, restyled.
- Light + dark mode, `prefers-reduced-motion` respected, WCAG AA contrast, mobile-first.
- No em-dashes in visible text. Title Case for buttons/nav/headings.
- Never commit secrets. No analytics or trackers (the privacy policy promises none).
