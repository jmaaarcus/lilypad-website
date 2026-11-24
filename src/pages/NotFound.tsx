import { ArrowLeft } from "@phosphor-icons/react";
import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="not-found-page mx-auto flex min-h-[62vh] max-w-6xl flex-col items-start justify-center px-5 py-20 sm:px-7 lg:px-10">
      <p className="eyebrow">404</p>
      <h1 className="display mt-5 max-w-[10ch] text-[clamp(3.2rem,1.9rem+5vw,6rem)] leading-[0.95]">This page isn't here.</h1>
      <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-ink-2">The link may be old, or the address may have a typo. Let's get you back to Lilypad.</p>
      <Link to="/" className="btn btn-primary not-found-link mt-8 h-12 px-5"><ArrowLeft size={16} aria-hidden="true" /> Back to Home</Link>
    </div>
  );
}
