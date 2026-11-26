import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import { Suspense, useEffect, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { asset } from "../content/site";
import { fitScreenshot } from "./ipadTexture";

type SceneProps = {
  file: string;
  /** 0 while the hero is in view, 1 once it has scrolled away. */
  progress: MotionValue<number>;
  animate: boolean;
  active: boolean;
  onReady: () => void;
};

const damp = THREE.MathUtils.damp;

function Environment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const target = pmrem.fromScene(room, 0.04);
    scene.environment = target.texture;
    room.dispose();
    pmrem.dispose();
    return () => {
      scene.environment = null;
      target.dispose();
    };
  }, [gl, scene]);
  return null;
}

function Tablet({ file, onReady }: { file: string; onReady: () => void }) {
  const gltf = useLoader(GLTFLoader, asset("models/ipad-pro.glb"));
  const raw = useLoader(THREE.TextureLoader, asset(`screenshots/${file}`));

  const { model, texture } = useMemo(() => {
    const root = gltf.scene.clone(true);
    const screen = root.getObjectByName("Display");
    if (!(screen instanceof THREE.Mesh)) throw new Error("The tablet model has no Display mesh");
    screen.geometry.computeBoundingBox();
    const box = screen.geometry.boundingBox!;
    const fitted = fitScreenshot(raw, (box.max.x - box.min.x) / (box.max.y - box.min.y));
    fitted.flipY = false; // glTF UV origin.
    fitted.colorSpace = THREE.SRGBColorSpace;
    fitted.anisotropy = 8;
    fitted.needsUpdate = true;
    screen.material = new THREE.MeshBasicMaterial({ map: fitted, toneMapped: false });
    return { model: root, texture: fitted };
  }, [gltf, raw]);

  useEffect(() => {
    onReady();
    return () => texture.dispose();
  }, [texture, onReady]);

  return <primitive object={model} />;
}

type SolidKind = "box" | "cylinder" | "cone" | "octahedron";
const SOLIDS: { kind: SolidKind; position: [number, number, number]; color: string; scale: number; speed: number; phase: number }[] = [
  { kind: "box", position: [-1.42, 0.92, 0.7], color: "#3b78e5", scale: 0.36, speed: 0.55, phase: 0 },
  { kind: "cylinder", position: [1.45, 0.98, 0.45], color: "#f4f7fc", scale: 0.34, speed: 0.45, phase: 1.7 },
  { kind: "cone", position: [1.38, -0.9, 0.9], color: "#7aa6f0", scale: 0.36, speed: 0.6, phase: 3.1 },
  { kind: "octahedron", position: [-1.36, -0.88, 1.0], color: "#d9e5f8", scale: 0.34, speed: 0.5, phase: 4.4 },
];

function Solid({ kind, position, color, scale, speed, phase, animate }: (typeof SOLIDS)[number] & { animate: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh || !animate) return;
    const t = state.clock.elapsedTime * speed + phase;
    mesh.position.y = position[1] + Math.sin(t) * 0.1;
    mesh.rotation.x = 0.5 + t * 0.35;
    mesh.rotation.y = 0.6 + t * 0.5;
  });
  return (
    <mesh ref={ref} position={position} scale={scale} rotation={[0.5, 0.6, 0]}>
      {kind === "box" && <boxGeometry args={[1, 1, 1]} />}
      {kind === "cylinder" && <cylinderGeometry args={[0.5, 0.5, 1, 48]} />}
      {kind === "cone" && <coneGeometry args={[0.6, 1.05, 48]} />}
      {kind === "octahedron" && <octahedronGeometry args={[0.68]} />}
      <meshPhysicalMaterial color={color} roughness={0.28} metalness={0.05} clearcoat={1} clearcoatRoughness={0.18} />
    </mesh>
  );
}

function GroundShadow() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, "rgba(28, 52, 104, 0.42)");
    gradient.addColorStop(1, "rgba(28, 52, 104, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(canvas);
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.32, 0]} scale={[4.4, 1.5, 1]}>
      <planeGeometry />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  );
}

/** Pointer parallax and scroll turn; the solids move more than the tablet for depth. */
function Rig({ progress, animate, children, depth = 1 }: { progress: MotionValue<number>; animate: boolean; children: ReactNode; depth?: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = animate ? progress.get() : 0;
    const px = animate ? state.pointer.x : 0;
    const py = animate ? state.pointer.y : 0;
    g.rotation.x = damp(g.rotation.x, -0.34 - py * 0.1 * depth + p * 0.4, 4, delta);
    g.rotation.y = damp(g.rotation.y, -0.1 + px * 0.2 * depth + p * 0.35, 4, delta);
    g.position.x = damp(g.position.x, px * 0.08 * depth, 4, delta);
    g.position.y = damp(g.position.y, p * 0.5, 4, delta);
  });
  return <group ref={group}>{children}</group>;
}

export default function HeroScene({ file, progress, animate, active, onReady }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.4], fov: 31 }}
      dpr={[1, 2]}
      frameloop={active ? (animate ? "always" : "demand") : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <Environment />
      <hemisphereLight args={["#ffffff", "#b6c3d6", 1.05]} />
      <directionalLight position={[-3, 4, 5]} intensity={2.1} />
      <Suspense fallback={null}>
        <Rig progress={progress} animate={animate}>
          <Tablet file={file} onReady={onReady} />
        </Rig>
        <Rig progress={progress} animate={animate} depth={1.8}>
          {SOLIDS.map((solid) => <Solid key={solid.kind} {...solid} animate={animate} />)}
        </Rig>
        <GroundShadow />
      </Suspense>
    </Canvas>
  );
}
