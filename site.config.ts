// Single source of truth for the GitHub Pages path.
// Project repo  -> "/lilypad-website/"
// Custom domain or <user>.github.io repo -> "/"
export const REPO_NAME = "lilypad-website";
export const BASE_PATH = `/${REPO_NAME}/`;

// Client routes. Pricing is a section on the homepage, not a separate route. scripts/postbuild.mjs writes one index.html per route.
export const ROUTES = [
  { path: "/", title: "Lilypad | A Place for Every Idea" },
  { path: "/support", title: "Support | Lilypad" },
  { path: "/privacy", title: "Privacy Policy | Lilypad" },
  { path: "/terms", title: "Terms of Service | Lilypad" },
] as const;
