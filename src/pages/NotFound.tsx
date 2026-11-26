import { ArrowLeft } from "@phosphor-icons/react";
import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="page relative isolate flex min-h-[70dvh] flex-col items-start justify-center py-20">
      <div aria-hidden="true" className="paper-grid absolute inset-0 -z-10" />
      <div className="css-cube [--s:64px]" aria-hidden="true">{Array.from({ length: 6 }, (_, i) => <span key={i} />)}</div>
      <h1 className="display title-page mt-12 max-w-[10ch]">This page isn't here.</h1>
      <p className="lede mt-6 max-w-[42ch]">The link may be old, or the address may have a typo. Let's get you back to Lilypad.</p>
      <Link to="/" className="btn btn-primary mt-9 h-12 px-6 text-sm"><ArrowLeft size={16} aria-hidden="true" /> Back to Home</Link>
    </div>
  );
}
