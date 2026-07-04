"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * NeuralBackground — a living 3D neural network behind the whole site.
 * Gold + royal-blue particles drift in space; nearby nodes connect with
 * glowing links. The whole field tilts with the mouse for 3D parallax.
 */

const COUNT = 110; // particle count — lower on mobile via DPR clamp
const LINK_DIST = 2.3;

function NeuralField() {
  const group = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouse = useRef({ x: 0, y: 0 });

  /* particle positions + velocities + per-particle color (gold / blue mix) */
  const { positions, velocities, colors, linePositions } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const gold = new THREE.Color("#D9B85C");
    const blue = new THREE.Color("#3E5FC4");
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      velocities[i * 3] = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
      const c = Math.random() > 0.6 ? gold : blue;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    // worst-case buffer for connection lines
    const linePositions = new Float32Array(COUNT * COUNT * 3);
    return { positions, velocities, colors, linePositions };
  }, []);

  useFrame(({ pointer, clock }) => {
    mouse.current.x += (pointer.x - mouse.current.x) * 0.04;
    mouse.current.y += (pointer.y - mouse.current.y) * 0.04;

    if (group.current) {
      // mouse parallax + slow breathing rotation
      group.current.rotation.y = mouse.current.x * 0.22 + Math.sin(clock.elapsedTime * 0.05) * 0.08;
      group.current.rotation.x = -mouse.current.y * 0.14;
    }

    const pts = pointsRef.current;
    const lines = linesRef.current;
    if (!pts || !lines) return;

    const posAttr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    // drift particles, bounce at bounds
    for (let i = 0; i < COUNT; i++) {
      for (let a = 0; a < 3; a++) {
        const idx = i * 3 + a;
        arr[idx] += velocities[idx];
        const bound = a === 0 ? 8 : a === 1 ? 5 : 3;
        if (Math.abs(arr[idx]) > bound) velocities[idx] *= -1;
      }
    }
    posAttr.needsUpdate = true;

    // rebuild proximity links
    let ptr = 0;
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = arr[i * 3] - arr[j * 3];
        const dy = arr[i * 3 + 1] - arr[j * 3 + 1];
        const dz = arr[i * 3 + 2] - arr[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < LINK_DIST * LINK_DIST) {
          linePositions.set(
            [arr[i * 3], arr[i * 3 + 1], arr[i * 3 + 2], arr[j * 3], arr[j * 3 + 1], arr[j * 3 + 2]],
            ptr
          );
          ptr += 6;
        }
      }
    }
    const lineAttr = lines.geometry.attributes.position as THREE.BufferAttribute;
    lineAttr.array.set(linePositions.subarray(0, ptr));
    lines.geometry.setDrawRange(0, ptr / 3);
    lineAttr.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#D9B85C" transparent opacity={0.12} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

/* Slow-orbiting golden wireframe artefacts for extra 3D depth */
function FloatingArtefacts() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (a.current) {
      a.current.rotation.x = t * 0.12;
      a.current.rotation.y = t * 0.18;
      a.current.position.y = Math.sin(t * 0.4) * 0.5 + 1.5;
    }
    if (b.current) {
      b.current.rotation.x = -t * 0.09;
      b.current.rotation.z = t * 0.14;
      b.current.position.y = Math.cos(t * 0.3) * 0.6 - 1.8;
    }
  });
  return (
    <>
      <mesh ref={a} position={[5.2, 1.5, -2]}>
        <icosahedronGeometry args={[1.1, 0]} />
        <meshBasicMaterial color="#D9B85C" wireframe transparent opacity={0.16} />
      </mesh>
      <mesh ref={b} position={[-5.5, -1.8, -2.5]}>
        <torusGeometry args={[0.9, 0.28, 8, 24]} />
        <meshBasicMaterial color="#3E5FC4" wireframe transparent opacity={0.18} />
      </mesh>
    </>
  );
}

export default function NeuralBackground() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        dpr={[1, 1.6]} // clamp DPR for performance
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <NeuralField />
        <FloatingArtefacts />
      </Canvas>

      {/* soft aurora gradient lights layered over the 3D scene */}
      <div className="aurora-blob left-[-10%] top-[-15%] h-[45rem] w-[45rem] bg-royal-600/25" />
      <div
        className="aurora-blob right-[-12%] top-[30%] h-[38rem] w-[38rem] bg-gold-600/10"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="aurora-blob bottom-[-20%] left-[25%] h-[40rem] w-[40rem] bg-royal-500/15"
        style={{ animationDelay: "-11s" }}
      />
      {/* vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,11,31,0.75)_100%)]" />
    </div>
  );
}
