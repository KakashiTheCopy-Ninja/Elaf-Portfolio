"use client";

import { Component, useEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { pointer, sceneState } from "@/lib/state";

// One camera-facing key per page section: where the automation core sits, its size, and the orbit radius.
const KEYS = [
  { x: 2.7, y: 0, z: 0, s: 1, r: 3.5 }, // hero
  { x: 4.9, y: 1.7, z: -3, s: 0.7, r: 2.6 }, // services
  { x: 0, y: 2.8, z: -6, s: 0.5, r: 2.2 }, // workflow
  { x: 3.8, y: -0.3, z: -3, s: 0.65, r: 2.6 }, // process + cases
  { x: -3.8, y: 0.4, z: -2.5, s: 0.7, r: 2.7 }, // about + faq
  { x: 0, y: 0, z: -0.5, s: 1.3, r: 3.9 }, // contact
];

const APPS = ["Gmail", "Sheets", "HubSpot", "WhatsApp", "n8n", "Supabase", "OpenAI", "Calendar"];
const TONES = ["#c8f23a", "#ffffff", "#0d0e10"];
const INK = "#0d0e10";
const LIME = "#c8f23a";

function labelTexture(text: string) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 72;
  const g = c.getContext("2d")!;
  g.fillStyle = "#ffffff";
  g.strokeStyle = INK;
  g.lineWidth = 3;
  g.beginPath();
  g.roundRect(4, 8, 248, 56, 12);
  g.fill();
  g.stroke();
  g.fillStyle = INK;
  g.font = "500 28px ui-monospace, Menlo, monospace";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(text, 128, 37);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function damp(cur: number, target: number, rate: number, dt: number) {
  return cur + (target - cur) * (1 - Math.exp(-rate * dt));
}

function Rig() {
  const { camera, size } = useThree();
  const core = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const rings = useRef<(THREE.Mesh | null)[]>([]);
  const chips = useRef<(THREE.Group | null)[]>([]);
  const boxes = useRef<(THREE.Mesh | null)[]>([]);
  const labels = useMemo(() => APPS.map(labelTexture), []);
  const dust = useRef<THREE.Points>(null);
  const packets = useRef<(THREE.Mesh | null)[]>([]);
  const state = useRef({ s: 1, r: 3.5, ox: 0, oy: 0 });
  const reduce = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const chipData = useMemo(
    () =>
      APPS.map((_, i) => ({
        ph: (i / APPS.length) * Math.PI * 2,
        sp: (0.16 + (i % 3) * 0.03) * (i % 2 ? -1 : 1),
        k: 1 + (i % 2) * 0.34,
        tilt: i % 2 ? -0.38 : 0.32,
        off: new THREE.Vector3(),
        spin: 0,
      })),
    [],
  );

  const lines = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(APPS.length * 6), 3));
    const mat = new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.2 });
    const obj = new THREE.LineSegments(geo, mat);
    obj.frustumCulled = false;
    return obj;
  }, []);

  const dustGeo = useMemo(() => {
    const n = 320;
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      a[i * 3] = (Math.random() - 0.5) * 22;
      a[i * 3 + 1] = (Math.random() - 0.5) * 13;
      a[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(a, 3));
    return g;
  }, []);

  const tmp = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const pt = useMemo(() => new THREE.Vector3(), []);
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((st, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05);
    const t = st.clock.elapsedTime * (reduce ? 0.15 : 1);
    const mobile = size.width < 820;
    const base = KEYS[Math.min(sceneState.section, KEYS.length - 1)];
    const k = mobile
      ? { x: base.x * 0.2, y: base.y * 0.4 + 2.1, z: base.z - 1.5, s: base.s * 0.62, r: base.r * 0.8 }
      : base;
    const c = core.current;
    if (!c) return;

    target.set(k.x, k.y, k.z);
    c.position.x = damp(c.position.x, target.x, 2.6, dt);
    c.position.y = damp(c.position.y, target.y, 2.6, dt);
    c.position.z = damp(c.position.z, target.z, 2.6, dt);
    const S = state.current;
    S.s = damp(S.s, k.s, 2.6, dt);
    S.r = damp(S.r, k.r, 2.6, dt);
    c.scale.setScalar(S.s * (1 + 0.035 * Math.sin(t * 2.4)));

    // core follows the cursor and the scroll
    c.rotation.y = damp(c.rotation.y, pointer.x * 0.7 + sceneState.scrollY * 0.0012, 3, dt);
    c.rotation.x = damp(c.rotation.x, -pointer.y * 0.45, 3, dt);
    if (inner.current) {
      inner.current.rotation.y = t * 0.5;
      inner.current.rotation.x = t * 0.3;
    }
    rings.current.forEach((m, i) => {
      if (!m) return;
      m.rotation.x = t * (0.35 + i * 0.12) * (i % 2 ? -1 : 1) + i;
      m.rotation.y = t * (0.22 + i * 0.1) + i * 1.3;
    });

    // cursor position on the z=0 plane
    dir.set(pointer.x, pointer.y, 0.5).unproject(camera).sub(camera.position).normalize();
    pt.copy(camera.position).addScaledVector(dir, -camera.position.z / dir.z);

    const pos = lines.geometry.attributes.position as THREE.BufferAttribute;
    chipData.forEach((d, i) => {
      const g = chips.current[i];
      if (!g) return;
      const a = d.ph + t * d.sp;
      const r = S.r * d.k;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r * 0.34;
      const ct = Math.cos(d.tilt);
      const stl = Math.sin(d.tilt);
      const wx = c.position.x + x * ct - y * stl;
      const wy = c.position.y + x * stl + y * ct;
      const wz = c.position.z + Math.sin(a) * r * 0.7;

      // push chips away from the cursor
      let tx = 0;
      let ty = 0;
      if (pointer.active && !mobile) {
        const dx = wx - pt.x;
        const dy = wy - pt.y;
        const dd = Math.hypot(dx, dy) || 1;
        if (dd < 2.8) {
          const f = (2.8 - dd) / 2.8;
          tx = (dx / dd) * f * 2.2;
          ty = (dy / dd) * f * 2.2;
        }
      }
      d.off.x = damp(d.off.x, tx, 6, dt);
      d.off.y = damp(d.off.y, ty, 6, dt);
      g.position.set(wx + d.off.x, wy + d.off.y, wz);
      const energy = Math.hypot(d.off.x, d.off.y);
      d.spin += dt * (0.5 + energy * 3);
      boxes.current[i]?.rotation.set(d.spin * 0.8 + i, d.spin, 0);
      g.scale.setScalar(S.s * 0.55 + 0.45);

      pos.setXYZ(i * 2, c.position.x, c.position.y, c.position.z);
      pos.setXYZ(i * 2 + 1, g.position.x, g.position.y, g.position.z);
    });
    pos.needsUpdate = true;

    // data packets travelling between chips and the core
    packets.current.forEach((m, i) => {
      const g = chips.current[i % APPS.length];
      if (!m || !g) return;
      let p = (t * 0.32 + i * 0.37) % 1;
      if (i >= APPS.length) p = 1 - p;
      tmp.copy(g.position).lerp(c.position, p);
      m.position.copy(tmp);
      m.scale.setScalar(0.6 + Math.sin(p * Math.PI) * 0.7);
    });

    if (dust.current) {
      dust.current.rotation.y = t * 0.012 + pointer.x * 0.12;
      dust.current.rotation.x = pointer.y * 0.06;
    }
    camera.position.x = damp(camera.position.x, pointer.x * 0.7, 2, dt);
    camera.position.y = damp(camera.position.y, pointer.y * 0.45, 2, dt);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 7]} intensity={2.2} />
      <directionalLight position={[-6, -2, 3]} intensity={0.8} color="#dfe8ff" />

      <group ref={core}>
        <pointLight position={[0, 0, 3]} intensity={18} color={LIME} distance={9} />
        <mesh ref={inner}>
          <icosahedronGeometry args={[0.95, 1]} />
          <meshStandardMaterial color={LIME} roughness={0.28} metalness={0.25} flatShading />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshBasicMaterial color={INK} wireframe transparent opacity={0.55} />
        </mesh>
        {[1.75, 2.05, 2.35].map((r, i) => (
          <mesh key={r} ref={(el) => void (rings.current[i] = el)}>
            <torusGeometry args={[r, 0.012, 8, 160]} />
            <meshBasicMaterial color={INK} />
          </mesh>
        ))}
      </group>

      {APPS.map((name, i) => (
        <group key={name} ref={(el) => void (chips.current[i] = el)}>
          <RoundedBox ref={(el) => void (boxes.current[i] = el)} args={[0.78, 0.78, 0.78]} radius={0.14} smoothness={4}>
            <meshStandardMaterial color={TONES[i % 3]} roughness={0.34} metalness={0.08} />
          </RoundedBox>
          <sprite position={[0, -0.78, 0]} scale={[1.28, 0.36, 1]}>
            <spriteMaterial map={labels[i]} transparent depthWrite={false} />
          </sprite>
        </group>
      ))}

      {Array.from({ length: APPS.length * 2 }).map((_, i) => (
        <mesh key={i} ref={(el) => void (packets.current[i] = el)}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshBasicMaterial color={i % 3 === 0 ? LIME : INK} />
        </mesh>
      ))}

      <primitive object={lines} />
      <points ref={dust} geometry={dustGeo}>
        <pointsMaterial color={INK} size={0.035} transparent opacity={0.5} sizeAttenuation />
      </points>
    </>
  );
}

class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function Scene() {
  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
      pointer.active = true;
    };
    const leave = () => {
      pointer.active = false;
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className="scene" aria-hidden="true">
      <Boundary>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 40 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance", toneMapping: THREE.NoToneMapping }}
        >
          <Rig />
        </Canvas>
      </Boundary>
    </div>
  );
}
