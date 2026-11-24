import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import { createTiltController } from "./tilt";

const MOTION_QUERY = "(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)";

/** Non-interactive product artwork: the hit area never rotates with the card. */
export function TiltCard({ children, className = "", limit = 9 }: {
  children: ReactNode;
  className?: string;
  limit?: number;
}) {
  const hitArea = useRef<HTMLDivElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const controller = useRef<ReturnType<typeof createTiltController> | null>(null);
  const allowed = useRef(false);

  useEffect(() => {
    const media = window.matchMedia(MOTION_QUERY);
    const motion = createTiltController({
      request: (callback) => window.requestAnimationFrame(callback),
      cancel: (id) => window.cancelAnimationFrame(id),
      bounds: () => hitArea.current?.getBoundingClientRect(),
      apply: ({ x, y }) => {
        const card = surface.current;
        if (!card) return;
        card.style.setProperty("--tilt-x", `${x.toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${y.toFixed(2)}deg`);
        card.dataset.tilting = "true";
        card.dispatchEvent(new CustomEvent("lilypad:tilt", { detail: { x, y } }));
      },
      reset: () => {
        const card = surface.current;
        if (!card) return;
        delete card.dataset.tilting;
        card.style.removeProperty("--tilt-x");
        card.style.removeProperty("--tilt-y");
        card.dispatchEvent(new CustomEvent("lilypad:tilt", { detail: { x: 0, y: 0 } }));
      },
      limit,
    });
    controller.current = motion;
    const sync = () => {
      allowed.current = media.matches && !document.hidden;
      motion.clear();
    };
    const clear = () => motion.clear();
    sync();
    media.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("blur", clear);
    return () => {
      media.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("blur", clear);
      motion.clear();
      controller.current = null;
      allowed.current = false;
    };
  }, [limit]);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (!allowed.current || event.pointerType !== "mouse") return;
    controller.current?.move({ x: event.clientX, y: event.clientY });
  };
  const clear = () => controller.current?.clear();

  return (
    <div ref={hitArea} className="tilt-hit-area" onPointerEnter={move} onPointerMove={move}
      onPointerLeave={clear} onPointerCancel={clear}>
      <div ref={surface} className={`tilt-surface ${className}`}>
        {children}
      </div>
    </div>
  );
}
