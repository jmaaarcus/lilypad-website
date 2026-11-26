import { Link } from "react-router";
import { Logo } from "./Logo";

const COLUMNS = [
  { title: "Product", links: [{ to: "/#features", label: "Features" }, { to: "/#pricing", label: "Pricing" }] },
  { title: "Help", links: [{ to: "/support", label: "Support" }, { to: "/#good-to-know", label: "Questions" }] },
  { title: "Legal", links: [{ to: "/privacy", label: "Privacy" }, { to: "/terms", label: "Terms" }] },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface-2">
      <div className="page grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-ink-2">A notebook for iPad. Read, write, sketch and record in one place.</p>
        </div>
        {COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="text-sm font-semibold text-ink">{column.title}</p>
            <ul className="mt-4 grid gap-2.5 text-sm">
              {column.links.map((link) => (
                <li key={link.to}><Link to={link.to} className="text-ink-2 transition-colors hover:text-accent">{link.label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="page border-t border-line py-6 text-sm text-ink-3">Made by Anh Quoc Vo. 2026</div>
    </footer>
  );
}
