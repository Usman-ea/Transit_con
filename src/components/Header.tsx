"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";

function easeInOut(t: number) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

function smoothScrollTo(id: string, cb?: () => void) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    cb?.();
    const el = document.getElementById(id);
    if (!el) return;
    const target = el.getBoundingClientRect().top + window.scrollY - 64;
    const start = window.scrollY;
    const diff = target - start;
    const duration = 600;
    let startTime: number | null = null;
    function step(ts: number) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + diff * easeInOut(progress));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };
}

function scrollToTop() {
  const start = window.scrollY;
  const duration = 600;
  let startTime: number | null = null;
  function step(ts: number) {
    if (!startTime) startTime = ts;
    const elapsed = ts - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start - start * easeInOut(progress));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="size-9 rounded-full flex items-center justify-center text-[#171717] dark:text-[#e2e8f0] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {theme === "dark" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "bg-white/70 dark:bg-[rgba(10,15,30,0.8)] backdrop-blur-md border-white/20 dark:border-gray-700/30"
            : "bg-white dark:bg-[#0a0f1e] border-gray-100 dark:border-gray-800"
        }`}
      >
        <div className="max-w-[1430px] mx-auto flex items-center justify-between px-6 py-2">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); close(); scrollToTop(); }}
            className="flex items-center gap-[5px]"
          >
            <div className="flex items-center justify-center size-7">
              <div className="rotate-45 flex items-center justify-center">
                <Image src="/logo-icon.svg" alt="" width={19} height={21} />
              </div>
            </div>
            <span className="text-[#000029] dark:text-white text-[20px] tracking-[0.046px] font-['Satoshi'] font-normal">
              TransitCon
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-[96px]">
            <a href="#industries" onClick={smoothScrollTo("industries")}
              className="p-[4px] rounded-full text-[#171717] dark:text-[#e2e8f0] text-[13px] tracking-[0.144px] font-['Satoshi'] font-medium whitespace-nowrap hover:text-[#0063e8] dark:hover:text-[#60a5fa] transition-colors">
              Who we serve
            </a>
            <a href="#steps" onClick={smoothScrollTo("steps")}
              className="p-[4px] rounded-full text-[#171717] dark:text-[#e2e8f0] text-[13px] tracking-[0.144px] font-['Satoshi'] font-medium whitespace-nowrap hover:text-[#0063e8] dark:hover:text-[#60a5fa] transition-colors">
              How it works
            </a>
            <a href="#testimonials" onClick={smoothScrollTo("testimonials")}
              className="p-[4px] text-[#171717] dark:text-[#e2e8f0] text-[13px] tracking-[0.144px] font-['Satoshi'] font-medium whitespace-nowrap hover:text-[#0063e8] dark:hover:text-[#60a5fa] transition-colors">
              Testimonial
            </a>
          </nav>

          {/* Desktop CTA + theme toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a href="mailto:elebuteusman@gmail.com"
              className="bg-[#0063e8] text-white px-6 py-3 rounded-lg text-[13px] font-medium tracking-[0.144px] whitespace-nowrap font-['Satoshi'] hover:bg-[#0052c5] hover:shadow-[0_4px_14px_rgba(0,99,232,0.3)] transition-all duration-300">
              Get started
            </a>
          </div>

          {/* Mobile: theme toggle + menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2 bg-[#0063e8] text-white text-[14px] font-['Satoshi'] font-medium px-3 py-2 rounded-[4px]"
              aria-label="Open menu"
            >
              Menu
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                <path d="M1 9L9 1M9 1H3M9 1V7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-white dark:bg-[#0a0f1e] md:hidden flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between px-[10px] py-[16px] shrink-0">
            <a href="/" onClick={(e) => { e.preventDefault(); close(); scrollToTop(); }}
              className="flex items-center gap-[5px]">
              <div className="flex items-center justify-center size-7">
                <div className="rotate-45 flex items-center justify-center">
                  <Image src="/logo-icon.svg" alt="" width={19} height={21} />
                </div>
              </div>
              <span className="text-[#000029] dark:text-white text-[20px] tracking-[0.046px] font-['Satoshi'] font-normal">
                TransitCon
              </span>
            </a>
            <button
              onClick={close}
              className="flex items-center gap-2 bg-[#0063e8] text-white text-[14px] font-['Satoshi'] font-medium px-3 py-2 rounded-[4px]"
              aria-label="Close menu"
            >
              Close
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                <path d="M1 1L9 9M9 1L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Nav items */}
          <div className="flex flex-col gap-8 px-[30px] pt-8">
            <div className="bg-[#e2f2ff] dark:bg-[#1a2744] rounded-[17px] p-[17px] flex flex-col">
              <a
                href="#industries"
                onClick={smoothScrollTo("industries", close)}
                className="font-['Satoshi'] font-normal text-[27px] text-[#000029] dark:text-[#e2e8f0] py-[16px] border-b border-[#000029]/20 dark:border-white/20"
              >
                Who we serve
              </a>
              <a
                href="#steps"
                onClick={smoothScrollTo("steps", close)}
                className="font-['Satoshi'] font-normal text-[27px] text-[#000029] dark:text-[#e2e8f0] py-[16px] border-b border-[#000029]/20 dark:border-white/20"
              >
                How it works
              </a>
              <a
                href="#testimonials"
                onClick={smoothScrollTo("testimonials", close)}
                className="font-['Satoshi'] font-normal text-[27px] text-[#000029] dark:text-[#e2e8f0] py-[16px] active:bg-[#0063e8] active:text-white active:px-2 active:-mx-2 active:-mb-2 active:rounded-b-[12px] transition-colors"
              >
                Testimonials
              </a>
            </div>

            <a
              href="mailto:elebuteusman@gmail.com"
              onClick={close}
              className="bg-[#0063e8] text-white text-[18px] font-['Satoshi'] font-normal text-center px-6 py-3 rounded-[4px] w-[145px]"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </>
  );
}
