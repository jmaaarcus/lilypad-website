import { AppleLogo } from "@phosphor-icons/react";
import { APP_STORE_URL, CTA_LABEL } from "../content/site";

/** `primary` marks the page's main download button; the nav hides its copy while one is visible. */
export function AppStoreButton({ className = "", size = "md", variant = "primary", primary = false }: { className?: string; size?: "sm" | "md"; variant?: "primary" | "accent"; primary?: boolean }) {
  const sizeClass = size === "sm" ? "h-9 px-3.5 text-[0.8125rem]" : "h-11 px-4 text-sm sm:px-5";

  return (
    <a href={APP_STORE_URL} data-primary-cta={primary || undefined} className={`btn btn-${variant} ${sizeClass} ${className}`}>
      <AppleLogo size={size === "sm" ? 15 : 17} weight="fill" aria-hidden="true" />
      {CTA_LABEL}
    </a>
  );
}
