"use client";

import { useEffect, useRef } from "react";

/**
 * CustomCursor — glowing outer ring + gold inner dot.
 * The ring lags behind the dot with lerp smoothing; both grow and the
 * ring "magnetises" toward interactive elements (a, button, [data-cursor]).
 * Automatically disabled on touch devices.
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate for fine pointers (mouse / trackpad)
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.body.classList.add("custom-cursor-active");

    const ring = ringRef.current!;
    const dot = dotRef.current!;
    let mx = innerWidth / 2, my = innerHeight / 2; // mouse
    let rx = mx, ry = my; // ring (lerped)
    let hovering = false;
    let magnetTarget: DOMRect | null = null;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const el = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      hovering = !!el;
      magnetTarget = el ? el.getBoundingClientRect() : null;
    };

    let raf = 0;
    const loop = () => {
      // magnetic pull: ring drifts toward the hovered element's centre
      let tx = mx, ty = my;
      if (magnetTarget) {
        const cx = magnetTarget.left + magnetTarget.width / 2;
        const cy = magnetTarget.top + magnetTarget.height / 2;
        tx = mx + (cx - mx) * 0.28;
        ty = my + (cy - my) * 0.28;
      }
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;

      const ringScale = hovering ? 1.9 : 1;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%,-50%) scale(${ringScale})`;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%,-50%) scale(${hovering ? 0.5 : 1})`;
      ring.style.borderColor = hovering ? "rgba(246,228,181,0.9)" : "rgba(217,184,92,0.6)";
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", move);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block" aria-hidden>
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-10 w-10 rounded-full border transition-[border-color] duration-300"
        style={{ boxShadow: "0 0 18px rgba(217,184,92,0.35)" }}
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-gold-400"
        style={{ boxShadow: "0 0 10px rgba(246,228,181,0.9)" }}
      />
    </div>
  );
}
