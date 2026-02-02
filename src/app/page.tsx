'use client'
import AboutSection from "@/components/homepage/AboutSection";
import HeroSection from "@/components/homepage/HeroSection";
import RecapSection from "@/components/homepage/RecapSection";
import TimelineSection from "@/components/homepage/TimelineSection";
import PrizesSection from "@/components/homepage/PrizesSection";
import CompetitionCategorySection from "@/components/homepage/CompetitionCategorySection";
import { useState } from "react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<'ui-ux' | 'hackathon'>('hackathon');

  // Image mappings
  // Note: Using hackathon images as placeholders for ui-ux where specific ones aren't available yet
  const images = {
    hackathon: {
      prizes: {
        mobile: "/images/home/hackathon/mobile/prizes.svg",
        desktop: "/images/home/hackathon/prize.svg",
      },
      timeline: {
        timelineDesktop: "/images/home/hackathon/timeline.svg",
        timelineMobile: "/images/home/hackathon/timeline.svg",
        feeDesktop: "/images/home/hackathon/fee.svg",
        feeMobile: "/images/home/hackathon/fee.svg",
      }
    },
    'ui-ux': {
      prizes: {
        // TODO: Update with actual UI/UX images when available
        mobile: "/images/home/uiux/mobile/prizes.svg", 
        desktop: "/images/home/uiux/prizes.svg",
      },
      timeline: {
         // TODO: Update with actual UI/UX images when available
        timelineDesktop: "/images/home/uiux/timeline.svg", // Placeholder
        timelineMobile: "/images/home/uiux/timeline.svg", // Placeholder
        feeDesktop: "/images/home/uiux/fee.svg", // Placeholder
        feeMobile: "/images/home/uiux/fee.svg", // Placeholder
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
      />
    </>
  );
}
