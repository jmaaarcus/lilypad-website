import { EnvelopeSimple } from "@phosphor-icons/react";
import { Link } from "react-router";
import { CONTACT_EMAIL } from "../content/site";
import { Logo } from "./Logo";

const LINKS = [
  { to: "/pricing", label: "Pricing" },
  { to: "/support", label: "Support" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-ink-3">Handwritten notes for iPad and Apple Pencil. No ads, no analytics, no tracking.</p>
        </div>
        <div className="flex flex-wrap gap-x-16 gap-y-8">
          <nav aria-label="Footer">
            <p className="text-sm font-medium text-ink">Lilypad</p>
            <ul className="mt-3 grid gap-2.5 text-sm">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-ink-3 transition-colors hover:text-ink">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-sm font-medium text-ink">Contact</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 inline-flex items-center gap-2 text-sm text-ink-3 transition-colors hover:text-ink">
              <EnvelopeSimple size={16} weight="bold" aria-hidden="true" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl border-t border-line px-5 py-6 text-xs text-ink-3 sm:px-6">Made by Anh Quoc Vo in Vietnam. © 2026</div>
    </footer>
  );
}
