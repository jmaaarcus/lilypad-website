# Lilypad website — design & content brief

## What Lilypad is
Lilypad is a handwritten-notes app for **iPad only** (iPadOS 26+).
Made by **Anh Quoc Vo**. Contact: quocvo1707@gmail.com.
Sign in with Apple is required; each Apple ID has its own notebooks, stored on the
iPad and synced through **iCloud** when enabled. Notebooks are never merged
between accounts and the developer never sees them. No ads, no analytics, no tracking.

## Pages
1. **Home** (`/`) — the only product and pricing page. It contains the hero, feature stories, pricing plans, Free vs Pro comparison, competitor comparison, pricing FAQ and privacy summary. The App Store CTA lives in the hero. Pricing is a section at `/#pricing`; there is no `/pricing` route.
2. **Privacy** (`/privacy`) and **Terms** (`/terms`) — content already written:
   `public/legal/privacy.html` and `public/legal/terms.html`. Re-render their text in the site's
   design (same wording; do not change legal meaning).
3. **Support** (`/support`) — contact email + FAQ (where notebooks live, moving notebooks between
   accounts via .llpd export/import, cancelling Pro, deleting the account). Keep Support out of the
   header; link to it from the footer.

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
- Infinite whiteboard; ink layers; shape recognition.
- Private by design: on-device processing, iCloud sync, no tracking.
Not available yet (do not claim): handwriting search, handwriting-to-text, AI, transcription,
real-time collaboration, iPhone/Mac/Android/web apps.

## Competitor comparison (iPad, yearly-equivalent plans; facts as of Nov 2026)
| | Lilypad Pro | Goodnotes Essential | Notability Plus | CollaNote Premium |
|---|---|---|---|---|
| Regular price | $9.99/yr | $11.99/yr | $19.99/yr | $13.90 one-time |
| Shorter plans | monthly, 3-month | — | — | — |
| Free tier | 3 notebooks + 1 whiteboard | 3 files | 5 notes | 10 pages/note |
| Sync | iCloud | iCloud | Notability Cloud | iCloud |
| Account needed | Sign in with Apple | for cloud features | for cloud | for collaboration |
| Automatic PDF headings | ✓ | — | — | — |
| Regex Find | ✓ | — | — | — |
| Split View | ✓ | ✓ | multi-note | — |
| Audio synced to ink | ✓ | — | ✓ | ✓ |
| Graphs / geometry / 3D | ✓ | — | — | — |
| Handwriting search | - | ✓ | ✓ | — |
| AI features | — | basic | limited | AI pen/chat |
Use a plain "-" for unavailable features. Highlight only clear advantages in any column, not Lilypad by default. Use regular, non-promotional subscription prices. Add a small note: "Competitor details from their public pricing pages, November 2026."

## Design direction: Lilypad editorial product studio
- Build a complete, cohesive visual identity rather than making isolated spacing or typography adjustments.
- Use a split, deep-indigo hero with restrained blue-violet light, a strong short headline, the real Split View iPad presentation and one clear App Store action.
- Use warm paper reading surfaces, ink-colored type, Lilypad blue and a small blue-violet accent range. Keep the product screenshots central and unaltered.
- Use deliberate editorial hierarchy, strong line lengths, numbered feature stories and consistent image framing. Avoid generic SaaS cards, oversized pill shapes and decorative filler.
- Give pricing its own clear visual chapter, then show **Private by design**, then place **Good to know** (the pricing FAQ) near the footer. This order is intentional and must not be changed.
- Redesign support, legal, footer and not-found pages to use the same typography, color, spacing and interaction language while preserving legal copy and product facts.
- **Lilypad's own identity:** premium, thoughtful, calm and creative. The site should feel like an extension of a well-made iPad notebook, not a generic SaaS template or a childish stationery brand.
- **Geometry:** mostly sharp, restrained corners. Buttons generally 4px; small controls and panels 4–8px. Avoid oversized rounded cards, pill buttons and deeply nested card layouts. Use thin borders, considered spacing and restrained shadows.
- **Palette:** keep the reading sections in warm paper/off-white (~#F8F8F5), with ink/charcoal text (~#20252D) and Lilypad blue (~#3B78E5). Give the hero a deep near-black/indigo canvas with a restrained blue-violet glow, inspired by Reflect's luminous dark hero. Light and dark modes are both first-class.
- **Typography:** retain the self-hosted Geist family initially. Build a stronger editorial hierarchy through scale, weight, line length and intentional line breaks. Avoid adding fonts unless a real design need emerges.
- **3D direction:** full interactive WebGL is approved for the product experience. Use Three.js with React Three Fiber (and Drei only where useful) for a premium, realistic iPad scene and selected feature objects. The device must display real Lilypad screenshots supplied by the owner; never fabricate app UI. Use dimensional lighting, materials, perspective and believable shadows rather than cartoon-like objects.
- **WebGL performance and fallback:** lazy-load the WebGL scene, keep the main scene focused, and provide a high-quality static image fallback when WebGL is unavailable, the device is constrained, or reduced motion is requested. Avoid making every section/card 3D. Pointer response should be subtle; touch layouts must not depend on hover.
- **Motion:** purposeful and restrained. Use Motion for page transitions and interface animation, and WebGL for the hero/product scene. Respect `prefers-reduced-motion` everywhere and provide a stable non-animated presentation.
- **Imagery:** use the owner-provided iPad screenshots in `public/screenshots/`: `pdf-reader.webp`, `split-view.webp` and `geometry-tools.webp`. The homepage hero reuses the Split View image. Keep `src/content/screenshots.ts` aligned with these real files; do not restore presentation or whiteboard placeholder sections, create fake div-built app screenshots, or present generated interface art as an actual Lilypad screen.
- **Page structure:** homepage is product-first and story-led; pricing is clear and comparison-focused; support is personal and practical; privacy and terms are calm, readable editorial documents. Keep responsive layouts intentional on desktop, iPad and mobile.
- **Homepage rhythm:** hero → feature index → three real product stories → pricing and comparisons → Private by design → Good to know FAQ → footer. The hero uses the same real Split View screenshot as the “Two notebooks side by side. Your recordings stay close.” feature. Feature stories use a consistent two-column desktop layout, compact numbered capability lists and a shared screenshot frame; collapse these deliberately on smaller screens without changing the story order.

## Copy rules
- Do not name or promote a specific stylus in public-facing marketing copy. Describe the writing and drawing experience without naming a stylus.
- Creator attribution should read exactly: "Made by Anh Quoc Vo." Do not add a country or location to the name.
- Rewrite all marketing copy in a human, warm, natural and confident voice.
- Use the product name **iCloud** consistently. Do not write "your iCloud" or "iCloud Drive" in public-facing copy or comparison cells. Keep the voice human and straightforward, like a thoughtful person explaining a useful notebook.
- Use plain English, short sentences and concrete benefits. Explain what a feature actually does and how it helps in a real workflow.
- Use contractions naturally where they sound right ("you're", "it's", "don't"). Be friendly without becoming childish, overly casual or salesy.
- Avoid generic marketing filler and inflated claims, including "elevate", "seamless", "unlock your potential", "unleash", "revolutionary" and "ultimate productivity solution".
- Avoid repeating the same benefit in multiple sections. Every heading and paragraph should have a clear job.
- UI casing: Title Case for buttons, navigation and headings; sentence case for normal sentences.
- No em-dashes in visible copy.
- Keep every feature claim, platform statement, privacy statement, pricing figure and limitation accurate to this brief. Never invent capabilities, integrations, testimonials, awards, trials or promises.
- Legal copy is not marketing copy. Preserve its legal meaning. Make only owner-approved corrections to creator identity, personal location references and product naming; do not otherwise rewrite legal clauses.
- Primary CTA label everywhere: "Download on the App Store" (App Store link TBD → placeholder `#`).


## Navigation rule

Do not render a global site header or top navigation. The homepage begins directly with the hero. Keep the Support link in the footer. Pricing is part of the homepage only; do not add a `/pricing` route or redirect.
