export type Tilt = { x: number; y: number };
type Point = { x: number; y: number };
type Bounds = { left: number; top: number; width: number; height: number };

/** The stable, untransformed hit area is the reference plane. */
export function getTilt(point: Point, bounds: Bounds, limit: number): Tilt {
  if (bounds.width <= 0 || bounds.height <= 0) return { x: 0, y: 0 };
  const clamp = (n: number) => Math.max(-1, Math.min(1, n));
  const x = clamp((point.x - bounds.left) / bounds.width * 2 - 1);
  const y = clamp((point.y - bounds.top) / bounds.height * 2 - 1);
  return { x: y * limit, y: -x * limit };
}

/** At most one pending frame; no animation loop when the pointer is still. */
export function createTiltController({ request, cancel, bounds, apply, reset, limit }: {
  request: (callback: () => void) => number;
  cancel: (id: number) => void;
  bounds: () => Bounds | undefined;
  apply: (tilt: Tilt) => void;
  reset: () => void;
  limit: number;
}) {
  let frame: number | null = null;
  let latest: Point = { x: 0, y: 0 };
  return {
    move(point: Point) {
      latest = point;
      if (frame !== null) return;
      frame = request(() => {
        frame = null;
        const rect = bounds();
        if (rect) apply(getTilt(latest, rect, limit));
      });
    },
    clear() {
      if (frame !== null) cancel(frame);
      frame = null;
      reset();
    },
  };
}
