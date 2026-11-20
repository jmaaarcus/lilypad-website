import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useMotionValueEvent } from "motion/react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { AppStoreButton } from "./AppStoreButton";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { to: "/", label: "Overview" },
  { to: "/pricing", label: "Pricing" },
  { to: "/support", label: "Support" },
];

/** Floating glass pill nav; gains a surface once the page scrolls. */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));
  useEffect(() => setOpen(false), [pathname]);

  // Only one Download button on screen at a time: hide the nav copy while the page's own is visible.
  const [pageCtaVisible, setPageCtaVisible] = useState(false);
  useEffect(() => {
    const targets = document.querySelectorAll("[data-primary-cta]");
    setPageCtaVisible(false);
    if (!targets.length) return;
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setPageCtaVisible(seen.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <nav
        aria-label="Main"
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pl-4 pr-2 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled || open ? "glass" : ""
        }`}
      >
        <Logo />
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-2 transition-colors hover:text-ink aria-[current=page]:bg-surface-2 aria-[current=page]:text-ink">
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <AnimatePresence initial={false}>
            {!pageCtaVisible && (
              <motion.span
                key="nav-cta"
                className="hidden lg:inline-flex"
                initial={reduce ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.2 }}
              >
                <AppStoreButton size="sm" />
              </motion.span>
            )}
          </AnimatePresence>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full text-ink md:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close Menu" : "Open Menu"} onClick={() => setOpen((o) => !o)}>
            {open ? <X size={20} weight="bold" aria-hidden="true" /> : <List size={20} weight="bold" aria-hidden="true" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="card absolute inset-x-3 top-[4.6rem] z-50 p-3 md:hidden"
          >
            <ul className="grid">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} end className="block rounded-2xl px-4 py-3 text-lg font-medium text-ink-2 aria-[current=page]:bg-surface-2 aria-[current=page]:text-ink">
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <AppStoreButton className="mt-2 w-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
