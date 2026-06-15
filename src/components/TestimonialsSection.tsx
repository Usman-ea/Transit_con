"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const WAVE_HEIGHTS = [
  3, 7, 11, 5, 13, 8, 4, 14, 6, 10, 3, 9, 12, 5, 7, 14, 4, 11, 6, 8,
  3, 12, 7, 14, 5, 9, 4, 11, 6, 13, 3, 8, 10, 5, 7, 12, 4, 14, 6, 9,
];

// Tracks a callback that stops whichever card is currently playing
let stopActiveCard: (() => void) | null = null;

function AudioBar() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopSelf = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  useEffect(() => {
    const audio = new Audio("/testimonial-audio.mp3");
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
      stopActiveCard = null;
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      stopActiveCard = null;
    } else {
      // Stop whichever other card is playing
      if (stopActiveCard) stopActiveCard();
      // Start this card from the beginning
      audio.currentTime = 0;
      setProgress(0);
      audio.play().catch(() => {});
      setPlaying(true);
      stopActiveCard = stopSelf;
    }
  };

  return (
    <div className="bg-[#cfeaff] dark:bg-[#1e3a5f] group-hover:bg-[rgba(255,255,255,0.15)] rounded-[4px] px-3 py-[6px] flex flex-col gap-[5px] transition-colors duration-300">
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="shrink-0 size-[26px] rounded-[6px] flex items-center justify-center bg-[rgba(20,105,238,0.1)] dark:bg-[rgba(255,255,255,0.08)] group-hover:bg-[rgba(255,255,255,0.18)] text-[#1469ee] dark:text-[#60a5fa] group-hover:text-white transition-colors duration-300"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" aria-hidden>
              <rect x="0.5" y="0.5" width="3.5" height="12" rx="1" fill="currentColor" />
              <rect x="8" y="0.5" width="3.5" height="12" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" aria-hidden>
              <path d="M1.5 1.5L10.5 6.5L1.5 11.5V1.5Z" fill="currentColor" strokeLinejoin="round" />
            </svg>
          )}
        </button>
        <div className="flex-1 flex items-center gap-[2px] h-[17px] overflow-hidden text-[#1469ee] dark:text-[#60a5fa] group-hover:text-white transition-colors duration-300">
          {WAVE_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className="rounded-full shrink-0"
              style={{
                width: 3,
                height: playing ? h : Math.max(3, Math.round(h * 0.35)),
                backgroundColor: "currentColor",
                transformOrigin: "center",
                animation: playing ? `waveBar 0.5s ease-in-out ${(i % 8) * 0.065}s infinite alternate` : "none",
                transition: playing ? "none" : "height 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
      <div className="h-[2px] w-full rounded-full overflow-hidden bg-[rgba(20,105,238,0.15)] group-hover:bg-[rgba(255,255,255,0.2)] transition-colors duration-300">
        <div
          className="h-full rounded-full bg-[#1469ee] group-hover:bg-white transition-colors duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

type CardData = { quote: string; name: string; role: string; avatar: string };

function TestimonialCard({ quote, name, role, avatar }: CardData) {
  return (
    <div className="group rounded-[12px] p-4 w-full md:w-[372px] shrink-0 flex flex-col gap-[10px] overflow-hidden bg-[#e4f3ff] dark:bg-[#1a2744] hover:bg-[#1a7cff] dark:hover:bg-[#1a7cff] transition-all duration-300 cursor-pointer hover:shadow-[0_8px_32px_rgba(20,105,238,0.22)]">
      <div className="flex gap-[10px] items-start">
        <div className="relative size-[100px] rounded-[8px] overflow-hidden shrink-0">
          <Image src={avatar} alt={name} fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-[10px]">
          <p className="font-['Satoshi'] font-light text-[14px] leading-[18px] text-[#000029] dark:text-[#e2e8f0] group-hover:text-white transition-colors duration-300">
            {quote}
          </p>
          <p className="font-['Satoshi'] font-medium text-[14px] tracking-[-0.96px] text-[#000029] dark:text-[#e2e8f0] group-hover:text-white transition-colors duration-300">
            {name},{" "}
            <span className="font-['Satoshi'] font-normal">{role}</span>
          </p>
        </div>
      </div>
      <AudioBar />
    </div>
  );
}

const testimonials: CardData[] = [
  {
    quote: "TransiCon helped us identify reliable suppliers and reduced the time it took to source industrial components by more than 60%.",
    name: "Balogun Savaldor, P.O",
    role: "LAP manufacturing",
    avatar: "/testimonials/avatar-balogun.jpg",
  },
  {
    quote: "Managing international supplier payments used to be stressful. With TransiCon, compliance checks and transaction tracking are handled seamlessly, allowing us to focus on growing our business",
    name: "Bolarinwa Ismail",
    role: "FMCG Distributor",
    avatar: "/testimonials/avatar-bolarinwa.jpg",
  },
  {
    quote: "The platform simplified our entire import process from finding suppliers to tracking shipments. Everything we needed was available in one place",
    name: "Ruqayat Alimi, CEO",
    role: "Ruq Scents",
    avatar: "/testimonials/avatar-ruqayat.jpg",
  },
  {
    quote: "Sourcing from overseas suppliers involved endless emails, paperwork, and uncertainty. The platform brought structure, transparency, and peace of mind to every transaction",
    name: "Tokunbo Bakeel, MD",
    role: "MareLogistic",
    avatar: "/testimonials/avatar-tokunbo.jpg",
  },
  {
    quote: "We could monitor every transaction, communicate with suppliers, and maintain complete visibility from sourcing to delivery",
    name: "Ajibola Snr, CEO",
    role: "Annui Smart",
    avatar: "/testimonials/avatar-ajibola.jpg",
  },
];

// Desktop animation timing constants (ms)
const HEADING_DURATION = 2500;
const TOP_START        = 400;
const TOP_DURATION     = 2000;
const BOTTOM_START     = TOP_START + TOP_DURATION;
const BOTTOM_DURATION  = 2000;
const TOP_STAGGER      = 80;
const BOTTOM_STAGGER   = 100;

export default function TestimonialsSection() {
  const [triggered, setTriggered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  // Desktop heading — slides in from left
  const headingStyle: React.CSSProperties = {
    opacity: triggered ? 1 : 0,
    transform: triggered ? "translateX(0)" : "translateX(-28px)",
    transition: triggered
      ? `opacity ${HEADING_DURATION}ms ease, transform ${HEADING_DURATION}ms ease`
      : "none",
  };

  // Desktop top cards — slide up + fade in, staggered
  const topStyle = (index: number): React.CSSProperties => ({
    opacity: triggered ? 1 : 0,
    transform: triggered ? "translateY(0)" : "translateY(52px)",
    transition: triggered
      ? `opacity ${TOP_DURATION}ms ease-out ${TOP_START + index * TOP_STAGGER}ms,` +
        ` transform ${TOP_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1) ${TOP_START + index * TOP_STAGGER}ms`
      : "none",
  });

  // Desktop bottom cards — slide up + fade in, staggered
  const bottomStyle = (index: number): React.CSSProperties => ({
    opacity: triggered ? 1 : 0,
    transform: triggered ? "translateY(0)" : "translateY(52px)",
    transition: triggered
      ? `opacity ${BOTTOM_DURATION}ms ease-out ${BOTTOM_START + index * BOTTOM_STAGGER}ms,` +
        ` transform ${BOTTOM_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1) ${BOTTOM_START + index * BOTTOM_STAGGER}ms`
      : "none",
  });

  // Mobile cards — simple staggered fade-in, 150 ms apart
  const mobileCardStyle = (index: number): React.CSSProperties => ({
    opacity: triggered ? 1 : 0,
    transition: triggered ? `opacity 600ms ease-out ${index * 150}ms` : "none",
  });

  return (
    <section id="testimonials" ref={sectionRef} className="dot-bg bg-white dark:bg-[#0a0f1e] py-16 overflow-hidden">
      <div className="max-w-[1312px] mx-auto px-6">

        {/* ── Mobile: heading then 5 cards fade in one by one ── */}
        <div className="md:hidden flex flex-col gap-8">
          <div
            className="flex flex-col items-center gap-[10px] text-center"
            style={mobileCardStyle(0)}
          >
            <div className="bg-[#edf7ff] dark:bg-[#1a2744] px-4 py-2 rounded-2xl">
              <span className="font-['Satoshi'] font-medium text-[18px] text-black dark:text-white tracking-[-0.96px]">
                Testimonials
              </span>
            </div>
            <h2 className="font-['Satoshi'] font-medium text-[28px] leading-[36px] text-[#000029] dark:text-white">
              Trusted by importers, manufacturers, and growing businesses worldwide
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {testimonials.map((t, i) => (
              <div key={t.name} style={mobileCardStyle(i + 1)}>
                <TestimonialCard {...t} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Desktop: original staggered layout ── */}
        <div className="hidden md:block">
          {/* Top row — 3 cards, staggered vertical offsets */}
          <div className="flex justify-between items-start">
            <div style={topStyle(0)}>
              <TestimonialCard {...testimonials[0]} />
            </div>
            <div className="mt-[77px]" style={topStyle(1)}>
              <TestimonialCard {...testimonials[1]} />
            </div>
            <div className="mt-[16px]" style={topStyle(2)}>
              <TestimonialCard {...testimonials[2]} />
            </div>
          </div>

          {/* Centre heading */}
          <div
            className="flex flex-col items-center gap-[10px] text-center py-16"
            style={headingStyle}
          >
            <div className="bg-[#edf7ff] dark:bg-[#1a2744] px-4 py-2 rounded-2xl">
              <span className="font-['Satoshi'] font-medium text-[21px] text-black dark:text-white tracking-[-0.96px]">
                Testimonials
              </span>
            </div>
            <h2 className="font-['Satoshi'] font-medium text-[48px] leading-[56px] text-[#000029] dark:text-white">
              Trusted by importers, manufacturers,
              <br />
              and growing businesses worldwide
            </h2>
          </div>

          {/* Bottom row — 2 cards */}
          <div className="flex justify-between items-start px-[42px]">
            <div style={bottomStyle(0)}>
              <TestimonialCard {...testimonials[3]} />
            </div>
            <div className="mt-[43px]" style={bottomStyle(1)}>
              <TestimonialCard {...testimonials[4]} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
