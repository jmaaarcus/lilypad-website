import { MotionConfig } from "motion/react";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { ROUTES } from "../../site.config";
import { Footer } from "./Footer";

export function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const clean = pathname.replace(/\/+$/, "") || "/";
    document.title = ROUTES.find((route) => route.path === clean)?.title ?? "Page Not Found | Lilypad";
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const targetId = hash.slice(1);
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only z-[60] rounded-sm bg-ink px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to Content
      </a>
      <div className="relative flex min-h-[100dvh] flex-col overflow-x-clip">
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
