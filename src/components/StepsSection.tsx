"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const steps = [
  {
    number: "Step 1",
    title: "Select Suppliers",
    description: "Browse pre-vetted Chinese suppliers from our verified trade network.",
    image: "/steps/step-1-suppliers.png",
  },
  {
    number: "Step 2",
    title: "Submit Trade Details",
    description: "Enter your order specifics and upload required trade documents.",
    image: "/steps/step-2-trade.png",
  },
  {
    number: "Step 3",
    title: "Secure Payment & Compliance",
    description:
      "Make payments through our protected transaction infrastructure. We verify documents and ensure every transaction meets regulatory requirements.",
    image: "/steps/step-3-payment.png",
  },
  {
    number: "Step 4",
    title: "Track Shipment",
    description: "Monitor your orders in real time from supplier dispatch to final delivery.",
    image: "/steps/step-4-tracking.png",
  },
  {
    number: "Step 5",
    title: "Receive Goods & Close Transaction",
    description:
      "Confirm delivery, inspect received goods, and complete settlement with confidence.",
    image: "/steps/step-5-received.png",
  },
];

const SCROLL_PER_STEP = 700;

export default function StepsSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [inSection, setInSection] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef(0);

  useEffect(() => {
    const recalculate = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrolled = -rect.top;

      setInSection(rect.top < window.innerHeight && rect.bottom > 0);

      if (scrolled < 0 || scrolled > rect.height - window.innerHeight) return;

      const step = Math.min(steps.length - 1, Math.max(0, Math.floor(scrolled / SCROLL_PER_STEP)));
      if (step !== activeStepRef.current) {
        activeStepRef.current = step;
        setActiveStep(step);
      }
    };

    window.addEventListener("scroll", recalculate, { passive: true });
    window.addEventListener("resize", recalculate, { passive: true });
    recalculate();
    return () => {
      window.removeEventListener("scroll", recalculate);
      window.removeEventListener("resize", recalculate);
    };
  }, []);

  const isLast = activeStep === steps.length - 1;

  const handleArrowClick = () => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    if (isLast) {
      window.scrollTo({ top: sectionTop, behavior: "smooth" });
    } else {
      window.scrollTo({
        top: sectionTop + (activeStep + 1) * SCROLL_PER_STEP,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="steps" className="bg-white dark:bg-[#0a0f1e]">
      {/* Static header */}
      <div className="bg-white dark:bg-[#0a0f1e] py-8 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-[1298px] mx-auto px-6 flex flex-col gap-4 items-center text-center">
          <div data-animate-up data-delay="0" className="bg-[#e2f2ff] dark:bg-[#1a2744] px-4 py-2 rounded-2xl">
            <span className="font-['Satoshi'] font-medium text-[18px] md:text-[21px] text-black dark:text-white tracking-[-0.96px]">
              See how TransitCon works
            </span>
          </div>
          <h2 data-animate-up data-delay="150" className="font-['Satoshi'] font-medium text-[28px] md:text-[42px] leading-[36px] md:leading-[52px] tracking-[-0.96px] text-[#000029] dark:text-white max-w-[1005px]">
            Source globally and execute every transaction with visibility, trust, and control.
          </h2>
        </div>
      </div>

      {/* Unified sticky scroll zone — all screen sizes */}
      <div
        ref={sectionRef}
        style={{ height: `calc(${steps.length * SCROLL_PER_STEP}px + 100vh)` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen dot-bg overflow-hidden flex items-center justify-center">
          {steps.map((step, i) => (
            <div
              key={step.number}
              aria-hidden={i !== activeStep}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 1rem",
                opacity: i === activeStep ? 1 : 0,
                transform:
                  i === activeStep
                    ? "translateY(0)"
                    : i < activeStep
                    ? "translateY(-48px)"
                    : "translateY(48px)",
                transition: "opacity 160ms ease-in-out, transform 160ms ease-in-out",
                pointerEvents: i === activeStep ? "auto" : "none",
              }}
            >
              {/* Mobile layout: image top, text below — aligned to top so tall content isn't clipped */}
              <div
                className="flex md:hidden flex-col gap-4 w-full absolute inset-x-6 top-6"
                style={i === activeStep ? {
                  animation: "stepContentUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 100ms both",
                } : undefined}
              >
                <div className="relative rounded-[16px] overflow-hidden w-full aspect-square">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="calc(100vw - 2rem)"
                    style={i === activeStep ? {
                      animation: "stepIllustrationUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) 160ms both",
                    } : { transform: "translateY(100%)" }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="bg-[#1469ee] inline-flex items-center justify-center px-3 py-1.5 rounded-[36px] self-start">
                    <span className="font-['Satoshi'] font-medium text-[13px] text-[#edf7ff] w-[66px] text-center">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-['Satoshi'] font-medium text-[20px] leading-[26px] text-[#000029] dark:text-white">
                    {step.title}
                  </h3>
                  <p className="font-['Satoshi'] font-normal text-[13px] leading-[19px] tracking-[0.1px] text-[#303030] dark:text-[#94a3b8]">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Desktop layout: image left, text right */}
              <div
                className="hidden md:flex max-w-[1298px] w-full items-center gap-[144px] justify-center"
                style={i === activeStep ? {
                  animation: "stepContentUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 100ms both",
                } : undefined}
              >
                <div className="relative rounded-[31px] overflow-hidden shrink-0 w-[560px] h-[537px]">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="560px"
                    style={i === activeStep ? {
                      animation: "stepIllustrationUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) 160ms both",
                    } : { transform: "translateY(100%)" }}
                  />
                </div>
                <div className="flex flex-col gap-6 shrink-0 max-w-[454px]">
                  <div className="flex flex-col gap-4">
                    <div className="bg-[#1469ee] inline-flex items-center justify-center px-[11px] py-[11px] rounded-[36px] self-start">
                      <span className="font-['Satoshi'] font-medium text-[21px] text-[#edf7ff] tracking-[0.486px] capitalize w-[93px] text-center leading-[18px]">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="font-['Satoshi'] font-medium text-[32px] leading-[36px] text-[#000029] dark:text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="font-['Satoshi'] font-normal text-[18px] leading-[27px] tracking-[0.144px] text-[#303030] dark:text-[#94a3b8]">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating arrow — all screen sizes, smaller on mobile */}
      {inSection && (
        <button
          onClick={handleArrowClick}
          aria-label={isLast ? "Back to step 1" : "Next step"}
          className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 size-[44px] md:size-[68px] rounded-full bg-[#0063e8] hover:bg-[#0052c5] transition-colors flex items-center justify-center"
          style={{ boxShadow: "0 12px 32px rgba(0, 35, 138, 0.55)" }}
        >
          {isLast ? (
            <svg className="w-4 h-4 md:w-7 md:h-7" viewBox="0 0 28 28" fill="none">
              <path d="M14 22V6M6 14l8-8 8 8" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg className="w-4 h-4 md:w-7 md:h-7" viewBox="0 0 28 28" fill="none">
              <path d="M14 6v16M6 14l8 8 8-8" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      )}
    </section>
  );
}
