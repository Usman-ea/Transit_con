"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const BASE = 3200;
const H_STEP = 240;

const HERO_IMAGES = ["/hero-port.jpg", "/hero-port-2.png"];
const DISPLAY_MS = 2000;
const TRANSITION_MS = 450;

function WordFade({ text, from }: { text: string; from: number }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          style={{
            animationName: "wordReveal",
            animationDuration: "0.65s",
            animationTimingFunction: "ease",
            animationDelay: `${from + i * H_STEP}ms`,
            animationFillMode: "both",
          }}
        >
          {word}{" "}
        </span>
      ))}
    </>
  );
}

function wordDelay(globalIndex: number) {
  return BASE + globalIndex * H_STEP;
}

export default function HeroSection() {
  const lineDelays = [
    { text: "Source from trusted",        start: wordDelay(0) },
    { text: "suppliers. Pay compliantly.", start: wordDelay(3) },
    { text: "Settle seamlessly.",          start: wordDelay(6) },
  ];

  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setActive((a) => 1 - a);
        setTransitioning(false);
      }, TRANSITION_MS);
    }, DISPLAY_MS + TRANSITION_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="dot-bg bg-white dark:bg-[#0a0f1e] pt-6 pb-16 px-6 md:px-32">
      <div className="max-w-[1430px] mx-auto">
        <div className="bg-[#e2f2ff] dark:bg-[#1a2744] rounded-[20px] md:rounded-[32px] p-4 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">

            {/* Text + CTAs */}
            <div className="flex flex-col gap-6 md:gap-8 flex-1 w-full">
              <div className="flex flex-col gap-4 md:gap-6">
                <h1 className="font-['Satoshi'] font-bold text-[#000029] dark:text-white text-[32px] md:text-[48px] leading-[38px] md:leading-[56px] tracking-[-0.5px] md:tracking-[-0.96px]">
                  {lineDelays.map((line, i) => (
                    <span key={i} style={{ display: "block" }}>
                      <WordFade text={line.text} from={line.start} />
                    </span>
                  ))}
                </h1>
                <p
                  data-animate
                  data-delay="120"
                  className="font-['Satoshi'] font-normal text-[#303030] dark:text-[#94a3b8] text-[12px] md:text-[18px] leading-[18px] md:leading-[27px] tracking-[0.077px] md:tracking-[0.144px] max-w-[532px]"
                >
                  Source from verified international suppliers, manage structured cross-border payments, and track every transaction from initiation to settlement.
                </p>
              </div>
              <div data-animate data-delay="240" className="flex items-center gap-3 md:gap-6 flex-wrap">
                <a
                  href="mailto:elebuteusman@gmail.com"
                  className="bg-[#0063e8] text-white font-['Satoshi'] font-medium text-[13px] md:text-[18px] tracking-[0.077px] md:tracking-[0.144px] px-4 md:px-6 py-2 md:py-4 rounded-[4px] md:rounded-lg whitespace-nowrap hover:shadow-[0_4px_14px_rgba(0,99,232,0.3)] transition-all"
                >
                  Get Started
                </a>
                <a
                  href="mailto:elebuteusman@gmail.com"
                  className="bg-white dark:bg-[#1e3a5f] text-[#0063e8] dark:text-[#60a5fa] font-['Satoshi'] font-medium text-[13px] md:text-[18px] tracking-[0.077px] md:tracking-[0.144px] px-4 md:px-6 py-2 md:py-4 rounded-[4px] md:rounded-lg whitespace-nowrap hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-all"
                >
                  Explore Verified Suppliers
                </a>
              </div>
            </div>

            {/* Image carousel */}
            <div className="bg-[#000029] rounded-[17px] md:rounded-[32px] overflow-hidden shrink-0 w-full md:w-[562px] h-[300px] md:h-[578px] relative">
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  ...(transitioning && {
                    animation: `heroSlideOut ${TRANSITION_MS}ms ease-in-out forwards`,
                  }),
                }}
              >
                <Image
                  src={HERO_IMAGES[active]}
                  alt="Shipping port"
                  fill
                  sizes="(max-width: 768px) calc(100vw - 3rem), 562px"
                  className="object-cover"
                  priority={active === 0}
                />
              </div>
              {transitioning && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    animation: `heroSlideIn ${TRANSITION_MS}ms ease-out forwards`,
                  }}
                >
                  <Image
                    src={HERO_IMAGES[1 - active]}
                    alt="Shipping port"
                    fill
                    sizes="(max-width: 768px) calc(100vw - 3rem), 562px"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
