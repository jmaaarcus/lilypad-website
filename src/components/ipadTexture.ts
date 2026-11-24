import * as THREE from "three";

/** Letterbox the supplied screenshot to the display ratio without cropping or stretching. */
export function fitScreenshot(original: THREE.Texture, aspect: number): THREE.Texture {
  const image = original.image as HTMLImageElement;
  const canvas = document.createElement("canvas");
  canvas.width = Math.min(2048, image.naturalWidth || image.width);
  canvas.height = Math.round(canvas.width / aspect);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Screenshot canvas unavailable");
  const width = image.naturalWidth || image.width;
  const height = image.naturalHeight || image.height;
  const scale = Math.min(canvas.width / width, canvas.height / height);
  const w = width * scale, h = height * scale;
  ctx.fillStyle = "#101114";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
  return new THREE.CanvasTexture(canvas);
}
