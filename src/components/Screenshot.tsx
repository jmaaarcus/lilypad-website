import { ImageSquare } from "@phosphor-icons/react";
import { asset } from "../content/site";
import type { Shot } from "../content/screenshots";

/** Screenshot slot: the real image when `shot.file` is set, else a clearly labelled placeholder. */
export function Screenshot({ shot, className = "", priority = false, rounded = "rounded-media" }: { shot: Shot; className?: string; priority?: boolean; rounded?: string }) {
  return (
    <figure className={`relative overflow-hidden bg-surface-2 ${rounded} ${className}`} style={{ aspectRatio: shot.ratio }}>
      {shot.file ? (
        <img src={asset(`screenshots/${shot.file}`)} alt={shot.alt} className="h-full w-full object-cover" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />
      ) : (
        <div role="img" aria-label={`Screenshot placeholder: ${shot.label}`} className="dot-grid flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center">
          {/* TODO: real iPad screenshot (see src/content/screenshots.ts) */}
          <ImageSquare size={28} weight="duotone" className="text-ink-3" aria-hidden="true" />
          <span className="text-sm font-medium text-ink-2">{shot.label}</span>
          <span className="text-xs text-ink-3">iPad screenshot, {shot.size}</span>
        </div>
      )}
    </figure>
  );
}

/** iPad device bezel around a screenshot slot (a frame, not a fake UI). */
export function IPadFrame({ shot, priority = false, className = "" }: { shot: Shot; priority?: boolean; className?: string }) {
  return (
    <div className={`rounded-[clamp(18px,3vw,44px)] bg-[#0d0f14] p-[clamp(8px,1.3vw,18px)] shadow-lift ring-1 ring-white/10 ${className}`}>
      <Screenshot shot={shot} priority={priority} rounded="rounded-[clamp(10px,1.8vw,28px)]" />
    </div>
  );
}
