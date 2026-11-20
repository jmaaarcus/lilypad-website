import { Moon, Sun } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const KEY = "lilypad-theme";

function systemTheme(): Theme {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.dataset.theme as Theme) || systemTheme());

  // Follow the system until the visitor picks a theme.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => { if (!document.documentElement.dataset.theme) setTheme(systemTheme()); };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(KEY, next); } catch { /* storage unavailable */ }
    setTheme(next);
  };

  const label = theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme";
  return (
    <button type="button" onClick={toggle} aria-label={label} title={label} className="grid h-10 w-10 place-items-center rounded-full text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink">
      {theme === "dark" ? <Sun size={18} weight="bold" aria-hidden="true" /> : <Moon size={18} weight="bold" aria-hidden="true" />}
    </button>
  );
}
