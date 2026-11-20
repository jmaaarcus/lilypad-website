// GitHub Pages has no server rewrites. Write dist/<route>/index.html for each client route
// (with its own <title>), plus 404.html as a fallback for anything else.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const dist = new URL("../dist/", import.meta.url).pathname;
const src = readFileSync(join(dist, "index.html"), "utf8");
const config = readFileSync(new URL("../site.config.ts", import.meta.url), "utf8");
const routes = [...config.matchAll(/\{ path: "([^"]+)", title: "([^"]+)" \}/g)].map((m) => ({ path: m[1], title: m[2] }));

const withTitle = (title) => src.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
for (const { path, title } of routes) {
  if (path === "/") continue;
  const dir = join(dist, path);
  mkdirSync(dir, { recursive: true });
  // Relative asset URLs are absolute (base path), so the same HTML works one level deep.
  writeFileSync(join(dir, "index.html"), withTitle(title));
}
writeFileSync(join(dist, "404.html"), withTitle("Page Not Found | Lilypad"));
writeFileSync(join(dist, ".nojekyll"), "");
console.log(`postbuild: wrote ${routes.length - 1} route pages + 404.html`);
