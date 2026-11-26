import { Link } from "react-router";
import { AppStoreButton } from "./AppStoreButton";
import { Logo } from "./Logo";

const LINKS = [
  { to: "/#features", label: "Features" },
  { to: "/#pricing", label: "Pricing" },
  { to: "/support", label: "Support" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/85 backdrop-blur-md">
      <div className="page flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main">
          <ul className="flex items-center gap-1 text-sm font-medium">
            {LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="rounded-[10px] px-3 py-2 text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <AppStoreButton className="hidden h-10! px-4! lg:inline-flex" />
      </div>
    </header>
  );
}
