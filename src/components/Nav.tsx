import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useMotionValueEvent } from "motion/react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { Logo } from "./Logo";

const LINKS = [
  { to: "/", label: "Overview" },
  { to: "/pricing", label: "Pricing" },
  { to: "/support", label: "Support" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 8));
  useEffect(() => setOpen(false), [pathname]);

  const linkClass = "relative px-2.5 py-2 text-sm font-medium text-ink-2 transition-colors hover:text-ink aria-[current=page]:font-semibold aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[1.35rem]";

  return (
    <header className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-200 ${scrolled || open ? "border-line bg-bg shadow-[0_1px_0_var(--line)]" : "border-transparent bg-bg"}`}>
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <Logo />

        <ul className="hidden items-center gap-5 md:flex">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-sm border border-line text-ink transition-colors hover:bg-surface-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={19} weight="bold" aria-hidden="true" /> : <List size={19} weight="bold" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="absolute inset-x-0 top-full z-50 border-b border-line bg-surface px-5 py-4 shadow-card md:hidden"
          >
            <ul className="grid">
              {LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} end className="block border-b border-line py-3 text-base font-medium text-ink-2 transition-colors hover:text-ink aria-[current=page]:text-ink">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
