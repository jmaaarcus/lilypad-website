import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router";

const LINKS = [
  { to: "/support", label: "Support" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
];

export function Footer() {
  const reduce = useReducedMotion();

  return (
    <motion.footer
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="site-footer neo-site-footer mt-10"
    >
      <div className="footer-bottom neo-footer-bottom mx-auto flex max-w-7xl flex-col gap-3 border-t px-5 py-4 text-xs sm:px-7 md:flex-row md:items-center md:justify-between lg:px-10">
        <nav aria-label="Footer links" className="footer-link-column">
          <ul className="flex flex-wrap justify-start gap-x-5 gap-y-2 text-xs">
            {LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="footer-link">{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-wrap justify-start gap-x-2 md:justify-end">
          <span>Made by Anh Quoc Vo.</span>
          <span>2026</span>
        </div>
      </div>
    </motion.footer>
  );
}
