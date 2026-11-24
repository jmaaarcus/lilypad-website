import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { asset } from "../content/site";
import type { Tilt } from "./tilt";
import { fitScreenshot } from "./ipadTexture";

/** Real GLB mesh, locally hosted. Render only on resize, pointer input or finite settling. */
export function MeshIPad({ file }: { file: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const mount = host;
    setReady(false);
    const surface = host.closest(".tilt-surface");
    let stopped = false, started = false, failed = false, visible = false;
    let renderer: THREE.WebGLRenderer | undefined;
    let environment: THREE.WebGLRenderTarget | undefined;
    let model: THREE.Group | undefined;
    let screenshot: THREE.Texture | undefined;
    let frame = 0;
    let hasDrawn = false;
    let targetX = 0, targetY = 0;
    let previous = 0;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1.55, 1.55, 1.09, -1.09, .1, 30);
    camera.position.set(0, 0, 7);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const disposeModel = (group: THREE.Group) => {
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      group.traverse(object => {
        if (!(object instanceof THREE.Mesh)) return;
        geometries.add(object.geometry);
        for (const material of Array.isArray(object.material) ? object.material : [object.material]) materials.add(material);
      });
      geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose());
    };
    const cancel = () => { if (frame) cancelAnimationFrame(frame); frame = 0; previous = 0; };
    const canDraw = () => !stopped && !failed && visible && !document.hidden && !!renderer && !!model && !!screenshot;
    function requestDraw() { if (canDraw() && !frame) frame = requestAnimationFrame(draw); }
    function draw(now: number) {
      frame = 0;
      if (!canDraw() || !renderer || !model) { previous = 0; return; }
      const dt = previous ? Math.min(.05, (now - previous) / 1000) : 1 / 60;
      previous = now;
      const x = motion.matches ? 0 : targetX, y = motion.matches ? 0 : targetY;
      model.rotation.x = motion.matches ? 0 : THREE.MathUtils.damp(model.rotation.x, x, 19, dt);
      model.rotation.y = motion.matches ? 0 : THREE.MathUtils.damp(model.rotation.y, y, 19, dt);
      const settling = Math.abs(model.rotation.x - x) + Math.abs(model.rotation.y - y) > .0005;
      if (!settling) { model.rotation.set(x, y, 0); previous = 0; }
      renderer.render(scene, camera);
      if (!hasDrawn) { hasDrawn = true; setReady(true); }
      if (settling) requestDraw();
    }
    const resize = () => {
      if (!renderer) return;
      const w = Math.max(1, host.clientWidth), h = Math.max(1, host.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h, false);
      const aspect = w / h;
      const halfHeight = Math.max(1.09, 1.55 / aspect);
      camera.top = halfHeight; camera.bottom = -halfHeight;
      camera.left = -halfHeight * aspect; camera.right = halfHeight * aspect;
      camera.updateProjectionMatrix(); requestDraw();
    };
    const fallback = () => { failed = true; cancel(); if (!stopped) setReady(false); };
    const contextLost = (event: Event) => { event.preventDefault(); fallback(); };
    async function start() {
      if (started || stopped) return;
      started = true;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "default" });
        renderer.setClearColor(0xffffff, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.setAttribute("aria-hidden", "true");
        renderer.domElement.addEventListener("webglcontextlost", contextLost);
        mount.appendChild(renderer.domElement);
        const room = new RoomEnvironment();
        const pmrem = new THREE.PMREMGenerator(renderer);
        try { environment = pmrem.fromScene(room, .04); scene.environment = environment.texture; }
        finally { pmrem.dispose(); room.dispose(); }
        scene.add(new THREE.HemisphereLight(0xffffff, 0x98a5b5, 1.0));
        const key = new THREE.DirectionalLight(0xffffff, 2.1); key.position.set(-3, 4, 5); scene.add(key);
        resize();
        const loaded = await new GLTFLoader().loadAsync(asset("models/ipad-pro.glb"));
        if (stopped || failed) { disposeModel(loaded.scene); return; }
        model = loaded.scene;
        const screen = model.getObjectByName("Display");
        if (!(screen instanceof THREE.Mesh)) throw new Error("The tablet model has no Display mesh");
        screen.geometry.computeBoundingBox();
        const bounds = screen.geometry.boundingBox;
        if (!bounds) throw new Error("The tablet display has no geometry bounds");
        const screenAspect = (bounds.max.x - bounds.min.x) / (bounds.max.y - bounds.min.y);
        if (!Number.isFinite(screenAspect) || screenAspect <= 0) throw new Error("The tablet display has invalid dimensions");
        const originalTexture = await new THREE.TextureLoader().loadAsync(asset(`screenshots/${file}`));
        if (stopped || failed) { originalTexture.dispose(); return; }
        let texture: THREE.Texture;
        try { texture = fitScreenshot(originalTexture, screenAspect); }
        finally { originalTexture.dispose(); }
        screenshot = texture;
        texture.flipY = false; // glTF UV origin, not Three's default image convention.
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(16, renderer.capabilities.getMaxAnisotropy());
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.needsUpdate = true;
        if (screen.material instanceof THREE.Material) screen.material.dispose();
        screen.material = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
        scene.add(model); resize();
        requestDraw();
      } catch (error) {
        console.error("Failed to render iPad model", error);
        fallback();
      }
    }
    const updateTilt = (event: Event) => {
      const tilt = (event as CustomEvent<Tilt>).detail;
      targetX = -THREE.MathUtils.degToRad(tilt.x);
      targetY = THREE.MathUtils.degToRad(tilt.y);
      requestDraw();
    };
    const visibility = () => {
      if (document.hidden) cancel();
      else { targetX = targetY = 0; requestDraw(); }
    };
    const motionChange = () => { targetX = targetY = 0; requestDraw(); };
    surface?.addEventListener("lilypad:tilt", updateTilt);
    document.addEventListener("visibilitychange", visibility);
    motion.addEventListener("change", motionChange);
    const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(host);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        void start();
        if (model && screenshot && renderer && !failed) requestDraw();
      } else { cancel(); targetX = targetY = 0; }
    }, { rootMargin: "120px" });
    observer.observe(host);
    return () => {
      stopped = true; cancel(); observer.disconnect(); resizeObserver.disconnect();
      surface?.removeEventListener("lilypad:tilt", updateTilt);
      document.removeEventListener("visibilitychange", visibility);
      motion.removeEventListener("change", motionChange);
      if (model) disposeModel(model);
      screenshot?.dispose(); environment?.dispose();
      if (renderer) {
        renderer.domElement.removeEventListener("webglcontextlost", contextLost);
        renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
      }
    };
  }, [file]);
  return <div ref={hostRef} className="mesh-ipad-canvas" data-ready={ready ? "true" : "false"} aria-hidden="true" />;
}
