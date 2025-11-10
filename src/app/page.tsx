import AboutSection from "@/components/homepage/AboutSection";
import FaqSection from "@/components/homepage/FaqSection";
import HeroSection from "@/components/homepage/HeroSection";
import RecapSection from "@/components/homepage/RecapSection";
import TimelineSection from "@/components/homepage/TimelineSection";
import Image from "next/image";

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
