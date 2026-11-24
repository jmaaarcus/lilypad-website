import { Link } from "react-router";
import { asset } from "../content/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Lilypad home">
      <img src={asset("brand/app-icon-64.png")} alt="" width={26} height={26} className="h-[26px] w-[26px] rounded-[5px]" />
      <span className="text-[1.08rem] font-semibold tracking-[-0.045em]">Lilypad</span>
    </Link>
  );
}
