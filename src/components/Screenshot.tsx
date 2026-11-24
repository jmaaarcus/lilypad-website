import { MeshIPad } from "./MeshIPad";
import { ImageSquare } from "@phosphor-icons/react";
import { asset } from "../content/site";
import type { Shot } from "../content/screenshots";

/** Screenshot slot: the real image when `shot.file` is set, else a clearly labelled placeholder. */
export function Screenshot({ shot, className = "", priority = false, rounded = "rounded-media" }: { shot: Shot; className?: string; priority?: boolean; rounded?: string }) {
  return (
    <figure className={`relative overflow-hidden bg-surface-2 ${rounded} ${className}`} style={{ aspectRatio: shot.ratio }}>
      {shot.file ? (
        <img
          src={asset(`screenshots/${shot.file}`)}
          alt={shot.alt}
          className="h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          draggable={false}
        />
      ) : (
        <div
          role="img"
          aria-label={`Screenshot placeholder: ${shot.label}`}
          className="screenshot-placeholder dot-grid flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center"
        >
          {/* TODO: real iPad screenshot (see src/content/screenshots.ts) */}
          <ImageSquare size={28} weight="duotone" className="text-ink-3" aria-hidden="true" />
          <span className="text-sm font-medium text-ink-2">{shot.label}</span>
          <span className="text-xs text-ink-3">iPad screenshot, {shot.size}</span>
        </div>
      )}
    </figure>
  );
}

/** Real WebGL tablet with an accessible, unmodified screenshot fallback. */
export function IPadFrame({ shot, priority = false, className = "" }: { shot: Shot; priority?: boolean; className?: string }) {
  return (
    <div className={`mesh-ipad ${className}`}>
      <div className="mesh-ipad-fallback"><Screenshot shot={shot} priority={priority} rounded="rounded-media" /></div>
      {shot.file && <MeshIPad file={shot.file} />}
    </div>
  );
}
