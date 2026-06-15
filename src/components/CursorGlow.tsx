"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const updateBlend = () => {
      el.style.mixBlendMode = document.documentElement.classList.contains("dark")
        ? "screen"
        : "multiply";
    };

    const classObserver = new MutationObserver(updateBlend);
    classObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    updateBlend();

    let raf = 0;
    let tx = -999, ty = -999;
    let cx = -999, cy = -999;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      cx += (tx - cx) * 0.10;
      cy += (ty - cy) * 0.10;
      el.style.transform = `translate(${cx - 110}px, ${cy - 110}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      classObserver.disconnect();
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 220,
        height: 220,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(20,105,238,0.09) 0%, rgba(20,105,238,0.04) 50%, transparent 72%)",
        pointerEvents: "none",
        zIndex: 9998,
      }}
    />
  );
}
