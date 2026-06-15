"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function LoadingOverlay() {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 2800;

    function easeOut(t: number) {
      return 1 - Math.pow(1 - t, 2.8);
    }

    function tick(now: number) {
      const t = Math.min((now - startTime) / duration, 1);
      setProgress(easeOut(t) * 100);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Brief pause at 100%, then fade out
        setTimeout(() => setFading(true), 180);
        setTimeout(() => setGone(true), 700);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#cfeaff] dark:bg-[#0a0f1e]"
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity 0.5s ease",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-[6px]">
          <div className="flex items-center justify-center size-9">
            <div className="rotate-45 flex items-center justify-center">
              <Image src="/logo-icon.svg" alt="" width={24} height={27} priority />
            </div>
          </div>
          <span className="text-[#000029] dark:text-white text-[26px] tracking-[0.046px] font-['Satoshi'] font-normal">
            TransitCon
          </span>
        </div>

        {/* Loading bar */}
        <div className="relative w-[220px] h-[3px] rounded-full bg-[#9dd0f7] dark:bg-[#1e3a5f]">
          {/* Fill */}
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-[#0063e8]"
            style={{ width: `${progress}%`, transition: "none" }}
          />
          {/* Glowing leading circle */}
          <div
            className="absolute size-[11px] rounded-full bg-[#0063e8]"
            style={{
              left: `${progress}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow:
                "0 0 6px 3px rgba(0, 99, 232, 0.75), 0 0 18px 8px rgba(0, 99, 232, 0.35)",
              transition: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}
