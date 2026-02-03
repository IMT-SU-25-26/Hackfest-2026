'use client'
import AboutSection from "@/components/homepage/AboutSection";
import HeroSection from "@/components/homepage/HeroSection";
import RecapSection from "@/components/homepage/RecapSection";
import TimelineSection from "@/components/homepage/TimelineSection";
import PrizesSection from "@/components/homepage/PrizesSection";
import CompetitionCategorySection from "@/components/homepage/CompetitionCategorySection";
import { useState } from "react";
import JudgeSection from "@/components/faq/JudgeSection";
import FaqSection from "@/components/homepage/FaqSection";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<'ui-ux' | 'hackathon'>('hackathon');

  // Image mappings
  const images = {
    hackathon: {
      prizes: {
        mobile: "/images/home/hackathon/mobile/prizes.svg",
        desktop: "/images/home/hackathon/prize.svg",
      },
      timeline: {
        timelineDesktop: "/images/home/hackathon/timeline.svg",
        timelineMobile: "/images/home/hackathon/mobile/timeline.svg",
        feeDesktop: "/images/home/hackathon/fee.svg",
        feeMobile: "/images/home/hackathon/fee.svg",
        finalFeeDesktop: "/images/home/hackathon/finalFee.svg",
        finalFeeMobile: "/images/home/hackathon/finalFee.svg",
      }
    },
    'ui-ux': {
      prizes: {
        mobile: "/images/home/uiux/mobile/prizes.svg", 
        desktop: "/images/home/uiux/prizes.svg",
      },
      timeline: {
        timelineDesktop: "/images/home/uiux/timeline.svg",
        timelineMobile: "/images/home/uiux/mobile/timeline.svg",
        feeDesktop: "/images/home/uiux/fee.svg",
        feeMobile: "/images/home/uiux/fee.svg",
        finalFeeDesktop: "/images/home/uiux/finalFee.svg",
        finalFeeMobile: "/images/home/uiux/finalFee.svg",
      }
    }
  };

  const currentImages = images[activeCategory];

  return (
    <>
      <HeroSection />
      <AboutSection />
      <RecapSection />
      <CompetitionCategorySection 
        activeCategory={activeCategory} 
        onCategorySelect={setActiveCategory} 
      />
      <PrizesSection 
        imgMobile={currentImages.prizes.mobile}
        imgDesktop={currentImages.prizes.desktop}
      />
      <TimelineSection 
        timelineImageDesktop={currentImages.timeline.timelineDesktop}
        timelineImageMobile={currentImages.timeline.timelineMobile}
        feeImageDesktop={currentImages.timeline.feeDesktop}
        feeImageMobile={currentImages.timeline.feeMobile}
        finalFeeImageDesktop={currentImages.timeline.finalFeeDesktop}
        finalFeeImageMobile={currentImages.timeline.finalFeeMobile}
      />

      <JudgeSection />
      <FaqSection />

    </>
  );
}
