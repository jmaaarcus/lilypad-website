// Single source of truth for the GitHub Pages path.
// Project repo  -> "/lilypad-website/"
// Custom domain or <user>.github.io repo -> "/"
export const REPO_NAME = "lilypad-website";
export const BASE_PATH = `/${REPO_NAME}/`;

// Client routes. scripts/postbuild.mjs writes one index.html per route so deep links work on Pages.
export const ROUTES = [
  { path: "/", title: "Lilypad: Handwritten Notes for iPad" },
  { path: "/pricing", title: "Pricing | Lilypad" },
  { path: "/support", title: "Support | Lilypad" },
  { path: "/privacy", title: "Privacy Policy | Lilypad" },
  { path: "/terms", title: "Terms of Service | Lilypad" },
] as const;
