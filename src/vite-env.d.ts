/// <reference types="vite/client" />
declare module "virtual:legal" {
  interface LegalDoc { title: string; meta: string; body: string; sections: { id: string; title: string }[] }
  const docs: Record<"privacy" | "terms", LegalDoc>;
  export default docs;
}
