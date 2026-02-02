import AboutSection from "@/components/homepage/AboutSection";
import FaqSection from "@/components/faq/FaqSection";
import HeroSection from "@/components/homepage/HeroSection";
import RecapSection from "@/components/homepage/RecapSection";
import TimelineSection from "@/components/homepage/TimelineSection";
import PrizesSection from "@/components/homepage/PrizesSection";
import CompetitionCategorySection from "@/components/homepage/CompetitionCategorySection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <RecapSection />
      <CompetitionCategorySection />
      <PrizesSection 
        imgMobile="/images/about/prizes_mobile.svg"
        imgDesktop="/images/about/prizes_desktop.svg"
      />
      <TimelineSection />
    </>
  );
}
