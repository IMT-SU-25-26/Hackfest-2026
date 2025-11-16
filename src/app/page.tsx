import AboutSection from "@/components/homepage/AboutSection";
import FaqSection from "@/components/homepage/FaqSection";
import HeroSection from "@/components/homepage/HeroSection";
import RecapSection from "@/components/homepage/RecapSection";
import TimelineSection from "@/components/homepage/TimelineSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <RecapSection />
      <TimelineSection />
      <FaqSection />
    </>
  );
}
