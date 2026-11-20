export const APP_STORE_URL = "#"; // TODO: App Store link once the listing is live.
export const CONTACT_EMAIL = "quocvo1707@gmail.com";
export const CTA_LABEL = "Download on the App Store";

/** Path helper for files in /public, respecting the Vite base path. */
export const asset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}`;
