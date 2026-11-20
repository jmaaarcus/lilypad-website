# Lilypad website — design & content brief

## What Lilypad is
Lilypad is a handwritten-notes app for **iPad only** (iPadOS 26+, Apple Pencil first).
Made by **Anh Quoc Vo** (Vietnam). Contact: quocvo1707@gmail.com.
Sign in with Apple is required; each Apple ID has its own notebooks, stored on the
iPad and synced through the user's **own private iCloud**. Notebooks are never merged
between accounts and the developer never sees them. No ads, no analytics, no tracking.

## Pages
1. **Home** (`/`) — what Lilypad is, who it's for, the 4–5 strongest features, CTA to the App Store.
2. **Pricing** (`/pricing`) — plans, billing-period toggle, feature comparison, competitor comparison, FAQ.
   Structure loosely inspired by goodnotes.com/pricing (plan cards → full feature table → FAQ),
   but with Lilypad's own visual language. Do NOT copy Goodnotes' layout, wording, colors or assets.
3. **Privacy** (`/privacy`) and **Terms** (`/terms`) — content already written:
   `public/legal/privacy.html` and `public/legal/terms.html`. Re-render their text in the site's
   design (same wording; do not change legal meaning).
4. **Support** (`/support`) — contact email + FAQ (where notebooks live, moving notebooks between
   accounts via .llpd export/import, cancelling Pro, deleting the account).

## Pricing (exact — must match the app)
Free plan: 3 notebooks + 1 whiteboard, all writing tools and 2D shapes, PDF import & annotation, Find, PDF search & automatic outlines, presentation mode, export. No free trial for Pro. Pro: unlimited notebooks & whiteboards, Split View, audio recording, graphs/geometry/3D.

Lilypad Pro, auto-renewing (USD, App Store):
| Plan | Price | Per month | Saving vs monthly | Trial |
|---|---|---|---|---|
| Monthly | $1.29 | $1.29 | — | — |
| Quarterly | $3.29 | $1.10 | 15% | — |
| **Yearly** (highlight) | **$9.99** | $0.83 | 35% | — |

Pro unlocks: unlimited notebooks & whiteboards · Split View (two notebooks side by side) ·
audio recording linked to handwriting · graphs, geometry & 3D shapes.
If Pro ends, notebooks stay viewable and exportable. Cancel anytime in Apple ID settings.

## Feature highlights (real, ship today)
- PDF study: automatic outlines (from the PDF's table of contents, or detected headings),
  ranked search inside PDFs with jump-to-line highlight, on-device OCR for scanned PDFs.
- Split View: two notebooks side by side in one tab, draggable divider.
- Audio recording synced to handwriting; recordings placed as playable chips on pages.
- STEM tools: graphing, geometry, 3D solids (cube, cylinder, cone…), presentation mode
  with external display, laser pointer and privacy mask.
- Infinite whiteboard; ink layers; shape recognition; Apple Pencil Pro squeeze.
- Private by design: on-device processing, your own iCloud, no tracking.
Not available yet (do not claim): handwriting search, handwriting-to-text, AI, transcription,
real-time collaboration, iPhone/Mac/Android/web apps.

## Competitor comparison (iPad, yearly-equivalent plans; facts as of Nov 2026)
| | Lilypad Pro | Goodnotes Essential | Notability Plus | CollaNote Premium |
|---|---|---|---|---|
| Price | $9.99/yr | $11.99/yr | $15.99/yr (sale; reg. $19.99) | $13.90 one-time |
| Shorter plans | monthly, 3-month | — | — | — |
| Free tier | 3 notebooks + 1 whiteboard | 3 files | 5 notes | 10 pages/note |
| Sync | your iCloud | iCloud | Notability Cloud | iCloud Drive |
| Account needed | Sign in with Apple | for cloud features | for cloud | for collaboration |
| Automatic PDF headings | ✓ | — | — | — |
| Regex Find | ✓ | — | — | — |
| Split View | ✓ | ✓ | multi-note | — |
| Audio synced to ink | ✓ | — | ✓ | ✓ |
| Graphs / geometry / 3D | ✓ | — | — | — |
| Handwriting search | not yet | ✓ | ✓ | — |
| AI features | — | basic | limited | AI pen/chat |
Show Lilypad's gaps honestly ("not yet"). Add a small note: "Competitor details from their
public pricing pages, November 2026."

## Design direction: Anti-Polish + Liquid Typography
- **Anti-polish:** deliberately handmade, imperfect, like a real notebook. Hand-drawn strokes,
  slightly uneven underlines and circles (SVG strokes with rough edges / `feTurbulence`
  displacement), ruled/grid paper textures, pencil-annotation callouts, tape/sticker accents,
  raw borders. NOT messy UX: layout, spacing and contrast stay rigorous; the imperfection lives
  in the marks, not in the structure.
- **Liquid typography:** variable fonts whose axes move — weight/width/casual/slant flowing on
  scroll and hover, fluid `clamp()` sizes, headlines that "write themselves" or morph.
  Suggested: **Recursive** variable (its `CASL` casual axis reads like handwriting, `MONO` and
  `wght` axes animate smoothly), self-hosted via `@fontsource-variable/recursive`.
  Pair with one clean text face for body (Recursive Sans Linear, or Geist).
- **Palette:** off-white paper + off-black ink + ONE accent (a fountain-pen blue, e.g. ~#2f5fd0,
  or a highlighter yellow used sparingly). No AI-purple, no beige+brass. Light + dark mode
  (dark = "blackboard": near-black slate with chalk-white ink).
- **Motion (dial ~7):** strokes drawing on scroll (SVG `pathLength`), variable-font axis
  animation, gentle paper-lift hovers. Honor `prefers-reduced-motion` everywhere.
- **Imagery:** real iPad screenshots of Lilypad (owner will provide; leave clearly labeled
  placeholder slots like `<!-- TODO: screenshot: PDF with outline, 2064x2752 -->`). No fake
  div-built app screenshots.
- Dials: DESIGN_VARIANCE 8 · MOTION_INTENSITY 7 · VISUAL_DENSITY 4.

## Copy rules
- UI casing: Title Case for buttons, nav, headings; sentence case for sentences.
- No em-dashes in visible copy. No filler ("elevate", "seamless", "unleash").
- Primary CTA label everywhere: "Download on the App Store" (App Store link TBD → placeholder `#`).
