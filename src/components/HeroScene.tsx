import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { IPadFrame } from "./Screenshot";
import type { Shot } from "../content/screenshots";
import { asset } from "../content/site";

type HeroSceneProps = {
  shot: Shot;
  reduceMotion?: boolean;
};

type SceneErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

class SceneErrorBoundary extends Component<SceneErrorBoundaryProps, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function roundedRectangle(width: number, height: number, radius: number) {
  const left = -width / 2;
  const right = width / 2;
  const bottom = -height / 2;
  const top = height / 2;
  const shape = new THREE.Shape();

  shape.moveTo(left + radius, bottom);
  shape.lineTo(right - radius, bottom);
  shape.quadraticCurveTo(right, bottom, right, bottom + radius);
  shape.lineTo(right, top - radius);
  shape.quadraticCurveTo(right, top, right - radius, top);
  shape.lineTo(left + radius, top);
  shape.quadraticCurveTo(left, top, left, top - radius);
  shape.lineTo(left, bottom + radius);
  shape.quadraticCurveTo(left, bottom, left + radius, bottom);

  return shape;
}

function createExtrudedRectangle(width: number, height: number, radius: number, depth: number, bevel = 0) {
  return new THREE.ExtrudeGeometry(roundedRectangle(width, height, radius), {
    depth,
    bevelEnabled: bevel > 0,
    bevelSegments: 4,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 10,
    steps: 1,
  });
}

/** A quiet paper texture for the device render, not a representation of the app UI. */
function createNotebookTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1400;
  canvas.height = 1050;
  const context = canvas.getContext("2d");

  if (!context) return new THREE.CanvasTexture(canvas);

  context.fillStyle = "#f8f8f4";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = "rgba(83, 111, 145, 0.10)";
  context.lineWidth = 2;
  for (let y = 84; y < canvas.height; y += 70) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
    context.stroke();
  }

  context.strokeStyle = "rgba(196, 112, 112, 0.24)";
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(148, 0);
  context.lineTo(148, canvas.height);
  context.stroke();

  context.lineCap = "round";
  context.lineJoin = "round";
  context.strokeStyle = "#3b78e5";
  context.lineWidth = 9;
  context.beginPath();
  context.moveTo(230, 270);
  context.bezierCurveTo(340, 220, 390, 330, 500, 280);
  context.bezierCurveTo(590, 235, 650, 310, 760, 270);
  context.stroke();

  context.strokeStyle = "rgba(32, 37, 45, 0.62)";
  context.lineWidth = 6;
  context.beginPath();
  context.moveTo(230, 400);
  context.bezierCurveTo(380, 380, 450, 430, 610, 395);
  context.moveTo(230, 470);
  context.bezierCurveTo(370, 450, 500, 495, 700, 465);
  context.moveTo(230, 540);
  context.bezierCurveTo(360, 520, 480, 560, 650, 535);
  context.stroke();

  context.strokeStyle = "rgba(59, 120, 229, 0.72)";
  context.lineWidth = 7;
  context.beginPath();
  context.moveTo(875, 690);
  context.bezierCurveTo(930, 640, 1010, 735, 1090, 675);
  context.bezierCurveTo(1140, 640, 1190, 690, 1240, 650);
  context.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function NotebookPaperScreen({ geometry }: { geometry: THREE.BufferGeometry }) {
  const texture = useMemo(createNotebookTexture, []);

  return (
    <mesh geometry={geometry} position={[0, 0, 0.182]}>
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function ScreenshotTexture({ file, geometry }: { file: string; geometry: THREE.BufferGeometry }) {
  const texture = useLoader(THREE.TextureLoader, asset(`screenshots/${file}`));
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  return (
    <mesh geometry={geometry} position={[0, 0, 0.182]}>
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function DeviceScreen({ shot, geometry }: { shot: Shot; geometry: THREE.BufferGeometry }) {
  if (shot.file) return <ScreenshotTexture file={shot.file} geometry={geometry} />;
  return <NotebookPaperScreen geometry={geometry} />;
}

function WritingTool() {
  return (
    <group position={[1.1, -1.48, 0.31]} rotation={[0.04, 0.08, -0.23]}>
      <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.038, 0.038, 2.18, 32]} />
        <meshPhysicalMaterial color="#edf0f3" metalness={0.32} roughness={0.28} clearcoat={0.85} />
      </mesh>
      <mesh castShadow position={[1.13, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.038, 0.17, 24]} />
        <meshStandardMaterial color="#aab2bc" metalness={0.8} roughness={0.24} />
      </mesh>
      <mesh position={[-1.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.039, 0.039, 0.045, 32]} />
        <meshStandardMaterial color="#c3c9d0" metalness={0.72} roughness={0.3} />
      </mesh>
      <mesh position={[-0.86, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.0395, 0.0395, 0.025, 32]} />
        <meshStandardMaterial color="#a8b0ba" metalness={0.85} roughness={0.22} />
      </mesh>
    </group>
  );
}

function Device({ shot, reduceMotion }: HeroSceneProps) {
  const group = useRef<THREE.Group>(null);
  const { size } = useThree();
  const useShadows = size.width > 680;
  const bodyGeometry = useMemo(() => createExtrudedRectangle(3.82, 2.88, 0.2, 0.15, 0.025), []);
  const paperGeometry = useMemo(() => createExtrudedRectangle(3.9, 2.94, 0.2, 0.025, 0.008), []);
  const screenGeometry = useMemo(() => new THREE.ShapeGeometry(roundedRectangle(3.52, 2.64, 0.12), 12), []);
  const responsiveScale = size.width < 560 ? 0.78 : size.width < 900 ? 0.9 : 1;

  useFrame((state, delta) => {
    if (!group.current || reduceMotion) return;

    const pointerX = size.width > 680 ? state.pointer.x : 0;
    const pointerY = size.width > 680 ? state.pointer.y : 0;
    const targetX = -0.2 + pointerY * 0.075;
    const targetY = -0.14 + pointerX * 0.11;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 3.6, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 3.6, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, -0.025 + pointerX * 0.018, 3.6, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, Math.sin(state.clock.elapsedTime * 0.7) * 0.035, 2.4, delta);
  });

  return (
    <>
      <ambientLight intensity={1.25} />
      <directionalLight
        castShadow={useShadows}
        position={[-4.5, 5.5, 7]}
        intensity={2.7}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <directionalLight position={[4, -2, 5]} intensity={0.85} color="#b9d1ff" />
      <mesh position={[0, -0.12, -0.52]} receiveShadow={useShadows}>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.14} />
      </mesh>

      <group ref={group} scale={responsiveScale} rotation={[-0.2, -0.14, -0.025]}>
        <mesh geometry={paperGeometry} position={[-0.075, 0.055, -0.105]} rotation={[0, 0, -0.012]} castShadow={useShadows}>
          <meshStandardMaterial color="#e9e8e1" roughness={0.86} />
        </mesh>
        <mesh geometry={paperGeometry} position={[-0.035, 0.025, -0.07]} rotation={[0, 0, -0.006]} castShadow={useShadows}>
          <meshStandardMaterial color="#f7f6f0" roughness={0.82} />
        </mesh>
        <mesh geometry={bodyGeometry} castShadow={useShadows} receiveShadow={useShadows}>
          <meshPhysicalMaterial color="#242a31" metalness={0.72} roughness={0.27} clearcoat={0.9} clearcoatRoughness={0.2} />
        </mesh>
        <Suspense fallback={null}>
          <DeviceScreen shot={shot} geometry={screenGeometry} />
        </Suspense>
        <mesh position={[1.79, 1.29, 0.183]}>
          <sphereGeometry args={[0.021, 16, 16]} />
          <meshBasicMaterial color="#080a0d" />
        </mesh>
        <WritingTool />
      </group>
    </>
  );
}

export function HeroScene({ shot, reduceMotion = false }: HeroSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(() => document.visibilityState === "visible");
  const [contextLost, setContextLost] = useState(false);
  const [isConstrained, setIsConstrained] = useState(() => window.matchMedia("(max-width: 640px)").matches);

  const fallback = (
    <div className="hero-scene-fallback">
      <IPadFrame shot={shot} priority />
    </div>
  );

  useEffect(() => {
    const node = sceneRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updatePageVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", updatePageVisibility);
    updatePageVisibility();
    return () => document.removeEventListener("visibilitychange", updatePageVisibility);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const updateConstrainedState = () => setIsConstrained(media.matches);
    media.addEventListener("change", updateConstrainedState);
    return () => media.removeEventListener("change", updateConstrainedState);
  }, []);

  useEffect(() => {
    const canvas = sceneRef.current?.querySelector("canvas");
    if (!canvas) return;

    const onContextLost = (event: Event) => {
      event.preventDefault();
      setContextLost(true);
    };

    canvas.addEventListener("webglcontextlost", onContextLost, false);
    return () => canvas.removeEventListener("webglcontextlost", onContextLost, false);
  }, []);

  if (contextLost) return fallback;
  if (reduceMotion || isConstrained) return fallback;

  return (
    <SceneErrorBoundary fallback={fallback}>
      <div
        ref={sceneRef}
        className="hero-scene"
        role="img"
        aria-label="A three-dimensional iPad with layered notebook paper and a slim writing tool."
      >
        <Canvas
          aria-hidden="true"
          shadows
          dpr={[1, 1.35]}
          frameloop={!reduceMotion && isInView && pageVisible ? "always" : "demand"}
          camera={{ position: [0, 0, 7.5], fov: 32 }}
          gl={{ alpha: true, antialias: true, powerPreference: "default" }}
          onCreated={({ gl }) => {
            gl.outputColorSpace = THREE.SRGBColorSpace;
            gl.toneMapping = THREE.ACESFilmicToneMapping;
          }}
        >
          <Device shot={shot} reduceMotion={reduceMotion} />
        </Canvas>
      </div>
    </SceneErrorBoundary>
  );
}
