"use client";

import { useEffect } from "react";

export default function AnimateObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-animate], [data-animate-up]");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay ?? "0";
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add("in-view");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
