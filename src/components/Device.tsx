import type { ReactNode } from "react";
import { asset } from "../content/site";
import type { Shot } from "../content/screenshots";

/** A real Lilypad screenshot inside an iPad bezel. Parents rotate it in 3D. */
export function Device({ shot, priority = false, className = "", children }: { shot: Shot; priority?: boolean; className?: string; children?: ReactNode }) {
  return (
    <div className={`device ${className}`}>
      <div className="device-screen">
        {children ?? <ShotImage shot={shot} priority={priority} />}
        <div className="device-glare" aria-hidden="true" />
      </div>
    </div>
  );
}

export function ShotImage({ shot, priority = false, className = "" }: { shot: Shot; priority?: boolean; className?: string }) {
  return (
    <img
      src={asset(`screenshots/${shot.file}`)}
      alt={shot.alt}
      width={2048}
      height={1423}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      draggable={false}
    />
  );
}
