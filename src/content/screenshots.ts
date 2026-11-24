/**
 * The three owner-provided iPad screenshots used by the homepage.
 * The homepage hero uses the same Split View shot as its feature story.
 */
export interface Shot { file?: string; label: string; size: string; alt: string; ratio: string }

const SCREEN_RATIO = "2048 / 1423";
const SCREEN_SIZE = "2048 × 1423";

export const SHOTS = {
  pdf: {
    file: "pdf-reader.webp",
    label: "PDF reader with chapter outline and search",
    size: SCREEN_SIZE,
    ratio: SCREEN_RATIO,
    alt: "Lilypad PDF reader showing a mathematics book page and chapter outline",
  },
  split: {
    file: "split-view.webp",
    label: "Textbook PDF and handwritten notes in Split View",
    size: SCREEN_SIZE,
    ratio: SCREEN_RATIO,
    alt: "Lilypad Split View with a textbook PDF on the left and handwritten notes on the right",
  },
  stem: {
    file: "geometry-tools.webp",
    label: "3D geometry shapes and a graph on one page",
    size: SCREEN_SIZE,
    ratio: SCREEN_RATIO,
    alt: "Lilypad showing 3D geometry solids, shape tools and a graphing canvas",
  },
} satisfies Record<string, Shot>;
