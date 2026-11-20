import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { BASE_PATH } from "./site.config";

/**
 * Exposes public/legal/*.html as `virtual:legal`, so the legal pages render the exact
 * same wording in the site's design. Only the <main> body is used; nav/style are dropped.
 */
function legalPages(): Plugin {
  const id = "virtual:legal";
  const resolved = "\0" + id;
  const files = ["privacy", "terms"];
  const parse = (name: string) => {
    const html = readFileSync(resolve(__dirname, `public/legal/${name}.html`), "utf8");
    const main = html.match(/<main>([\s\S]*?)<\/main>/)?.[1] ?? "";
    const title = main.match(/<h1>([\s\S]*?)<\/h1>/)?.[1].trim() ?? "";
    const meta = main.match(/<p class="meta">([\s\S]*?)<\/p>/)?.[1].trim() ?? "";
    const sections: { id: string; title: string }[] = [];
    const body = main
      .replace(/<h1>[\s\S]*?<\/h1>/, "")
      .replace(/<p class="meta">[\s\S]*?<\/p>/, "")
      .replace(/<h2>([\s\S]*?)<\/h2>/g, (_m, t: string) => {
        const slug = t.toLowerCase().replace(/&amp;/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        sections.push({ id: slug, title: t });
        return `<h2 id="${slug}">${t}</h2>`;
      })
      .replace(/<a href="http/g, '<a rel="noopener noreferrer" target="_blank" href="http')
      .trim();
    return { title, meta, body, sections };
  };
  return {
    name: "lilypad-legal",
    resolveId: (s) => (s === id ? resolved : undefined),
    load(s) {
      if (s !== resolved) return;
      files.forEach((f) => this.addWatchFile(resolve(__dirname, `public/legal/${f}.html`)));
      return `export default ${JSON.stringify(Object.fromEntries(files.map((f) => [f, parse(f)])))};`;
    },
  };
}

export default defineConfig({
  base: BASE_PATH,
  plugins: [react(), tailwindcss(), legalPages()],
});
