/** A quarter-round chassis is tessellated into six narrow side faces.
 * Coordinates are normalized to the corner radius, so the model scales with CSS.
 */
export const CORNER_STEPS = 6;
export const CORNER_FACES = Array.from({ length: 4 * CORNER_STEPS }, (_, index) => {
  const corner = Math.floor(index / CORNER_STEPS);
  const angle = -90 + corner * 90 + (index % CORNER_STEPS + 0.5) * 90 / CORNER_STEPS;
  const radians = angle * Math.PI / 180;
  const halfStep = Math.PI / (4 * CORNER_STEPS);
  return {
    corner,
    angle: angle + 90,
    x: Math.cos(radians) * Math.cos(halfStep),
    y: Math.sin(radians) * Math.cos(halfStep),
    width: 2 * Math.sin(halfStep),
  };
});
