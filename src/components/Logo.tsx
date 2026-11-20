import { Link } from "react-router";
import { asset } from "../content/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Lilypad home">
      <img src={asset("brand/app-icon-64.png")} alt="" width={30} height={30} className="h-[30px] w-[30px] rounded-[8px] shadow-sm" />
      <span className="text-[1.05rem] font-semibold tracking-[-0.02em]">Lilypad</span>
    </Link>
  );
}
