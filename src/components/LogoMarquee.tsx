import Image from "next/image";

const logos = [
  { src: "/fidelity-bank.png", alt: "Fidelity Bank", width: 121, height: 30 },
  { src: "/uba.png", alt: "UBA", width: 64, height: 30 },
  { src: "/access-bank.png", alt: "Access Bank", width: 122, height: 30 },
  { src: "/heirs-holdings.png", alt: "Heirs Holdings", width: 175, height: 30 },
];

export default function LogoMarquee() {
  return (
    <section className="bg-white dark:bg-[#0a0f1e] pt-8 pb-16 overflow-hidden">
      <div
        className="flex items-center gap-[216px]"
        style={{ animation: "marquee 12s linear infinite", width: "max-content" }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="shrink-0 h-[30px] flex items-center" style={{ width: logo.width }}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="object-contain h-[30px] w-auto dark:opacity-70 dark:brightness-[1.3]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
