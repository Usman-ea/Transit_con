import HeroSection from "@/components/HeroSection";
import LogoMarquee from "@/components/LogoMarquee";
import IndustriesSection from "@/components/IndustriesSection";
import StepsSection from "@/components/StepsSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <LogoMarquee />
      <IndustriesSection />
      <StepsSection />
      <TestimonialsSection />
    </main>
  );
}
