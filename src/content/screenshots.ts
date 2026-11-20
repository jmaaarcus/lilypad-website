/**
 * Screenshot slots. Drop real iPad screenshots into public/screenshots/ and set `file`.
 * Until `file` is set, a labelled placeholder renders instead (no fake UI).
 */
export interface Shot { file?: string; label: string; size: string; alt: string; ratio: string }

export const SHOTS = {
  hero: { label: "Notebook page with Apple Pencil handwriting", size: "2752x2064", ratio: "4 / 3", alt: "A Lilypad notebook page with handwritten notes on iPad" },
  pdf: { label: "PDF with automatic outline open", size: "2752x2064", ratio: "4 / 3", alt: "A PDF in Lilypad with its automatic outline in the sidebar" },
  split: { label: "Split View, two notebooks side by side", size: "2752x2064", ratio: "16 / 10", alt: "Two Lilypad notebooks side by side in Split View" },
  stem: { label: "Graph, geometry and a 3D solid on a page", size: "2064x2752", ratio: "3 / 4", alt: "A Lilypad page with a graph, a geometry figure and a 3D cube" },
  present: { label: "Presentation mode on an external display", size: "2752x2064", ratio: "4 / 3", alt: "Lilypad presentation mode with laser pointer" },
  whiteboard: { label: "Infinite whiteboard with ink layers", size: "2752x2064", ratio: "4 / 3", alt: "A Lilypad whiteboard zoomed out, with layered ink" },
} satisfies Record<string, Shot>;
