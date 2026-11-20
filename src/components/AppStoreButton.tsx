import { AppleLogo } from "@phosphor-icons/react";
import { APP_STORE_URL, CTA_LABEL } from "../content/site";

/** `primary` marks the page's main download button; the nav hides its own copy while one is on screen. */
export function AppStoreButton({ className = "", size = "md", variant = "primary", primary = false }: { className?: string; size?: "sm" | "md"; variant?: "primary" | "accent"; primary?: boolean }) {
  const pad = size === "sm" ? "h-9 px-4 text-sm" : "h-12 px-6 text-[0.95rem]";
  return (
    <a href={APP_STORE_URL} data-primary-cta={primary || undefined} className={`btn btn-${variant} ${pad} ${className}`}>
      <AppleLogo size={size === "sm" ? 16 : 19} weight="fill" aria-hidden="true" />
      {CTA_LABEL}
    </a>
  );
}
