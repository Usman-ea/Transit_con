export default function Footer() {
  return (
    <footer className="relative bg-[#1a7cff] overflow-hidden">
      {/* Port image at 10% opacity */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/footer-bg.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none select-none"
      />

      {/* Main CTA content */}
      <div className="relative flex flex-col items-center pt-[72px] md:pt-[126px] pb-[60px] md:pb-[80px] px-6">
        <div className="w-full max-w-[617px] flex flex-col gap-8 md:gap-[51px] items-center">
          {/* Heading + subtext */}
          <div className="flex flex-col gap-[16px] items-center text-center">
            <h2
              data-animate-up
              data-delay="0"
              className="font-['Satoshi'] font-medium text-[32px] md:text-[48px] leading-[40px] md:leading-[56px] tracking-[0.144px] text-[#e2f2ff]"
            >
              Ready for a smarter way to source
            </h2>
            <p className="font-['Satoshi'] font-normal text-[15px] md:text-[18px] leading-[24px] md:leading-[27px] tracking-[0.144px] text-white">
              Access verified suppliers, manage transactions, and track every
              stage of your import process from a single platform.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex items-center justify-center">
            <a href="mailto:elebuteusman@gmail.com" className="bg-[#cfeaff] text-[#000029] px-[24px] py-[16px] rounded-[8px] font-['Satoshi'] font-medium text-[18px] tracking-[0.144px] whitespace-nowrap hover:bg-white hover:shadow-[0_4px_18px_rgba(207,234,255,0.45)] transition-all duration-300">
              Get started
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative mx-4 md:mx-[67px]" style={{ borderTop: "0.5px solid #cfeaff" }}>
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-[128px] px-[10px] pt-[16px] pb-[32px] text-center md:text-left">
          <span className="flex-1 font-['Satoshi'] font-normal text-[14px] md:text-[18px] text-white leading-normal">
            ©TransitCon, 2026
          </span>
          <span className="flex-1 font-['Satoshi'] font-normal text-[14px] md:text-[18px] text-white leading-normal text-center">
            Term and privacy policy
          </span>
          <span className="flex-1 font-['Satoshi'] font-normal text-[14px] md:text-[18px] text-white leading-normal md:text-right">
            +234 907 9682 537
          </span>
        </div>
      </div>
    </footer>
  );
}
