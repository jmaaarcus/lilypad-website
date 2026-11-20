import { MotionConfig } from "motion/react";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { ROUTES } from "../../site.config";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

export function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const clean = pathname.replace(/\/+$/, "") || "/";
    document.title = ROUTES.find((r) => r.path === clean)?.title ?? "Page Not Found | Lilypad";
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to Content
      </a>
      <div className="relative flex min-h-[100dvh] flex-col overflow-x-clip">
        <Nav />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
