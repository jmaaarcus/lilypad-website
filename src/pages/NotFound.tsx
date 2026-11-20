import { Link } from "react-router";
import { LiquidHeading } from "../components/LiquidHeading";

export function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-24 text-center sm:px-6">
      <p className="eyebrow">404</p>
      <LiquidHeading as="h1" write text="This Page Doesn't Exist." className="mt-4 text-[clamp(2.6rem,1.4rem+4.2vw,4.6rem)] leading-[1]" />
      <p className="mt-5 text-lg text-ink-2">The link may be old or mistyped.</p>
      <Link to="/" className="btn btn-primary mt-8 h-12 px-6">Back to Home</Link>
    </div>
  );
}
