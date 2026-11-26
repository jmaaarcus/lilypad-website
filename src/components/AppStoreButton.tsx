import { AppleLogo } from "@phosphor-icons/react";
import { APP_STORE_URL, CTA_LABEL } from "../content/site";

export function AppStoreButton({ className = "" }: { className?: string }) {
  return (
    <a href={APP_STORE_URL} className={`btn btn-primary h-12 px-6 text-sm ${className}`}>
      <AppleLogo size={18} weight="fill" aria-hidden="true" />
      {CTA_LABEL}
    </a>
  );
}
