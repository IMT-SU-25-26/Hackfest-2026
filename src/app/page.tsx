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

  // Content mappings
  const categoryData = {
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
      },
      judges: {
        bgUrls: [
            "/images/judges/judges-1.webp",
            "/images/judges/judges-2.webp",
            "/images/judges/judges-3.webp",
        ],
        list: [
            {
                imgUrl: "/images/FAQ/judges/rudi.png",
                classImage: "scale-[1.5] translate-x-[-5%] translate-y-[20%]",
                name: "Rudi Limantoro",
                title: "S. Kom., M.Kom."
            },
            {
                imgUrl: "/images/FAQ/judges/elizabeth.png",
                classImage: "scale-[1.5] translate-x-[-5%] translate-y-[20%]",
                name: "Elizabeth Nathania Witanto",
                title: "S. Kom., M.Kom."
            },
            {
                imgUrl: "/images/FAQ/judges/evan.png",
                classImage: "scale-[1] translate-x-[0%]",
                name: "Evan Tanuwijaya",
                title: "S. Kom., M.Kom."
            },
        ]
      },
      judgesFinal: {
        bgUrls: [
            "/images/judges/judges-unknown.svg",
            "/images/judges/judges-unknown.svg",
            "/images/judges/judges-unknown.svg",
        ],
        list: [
            {
                imgUrl: "/images/FAQ/judges/rudi.png",
                classImage: "scale-[1.5] translate-x-[-5%] translate-y-[20%]",
                name: "Rudi Limantoro",
                title: "S. Kom., M.Kom."
            },
            {
                imgUrl: "/images/FAQ/judges/elizabeth.png",
                classImage: "scale-[1.5] translate-x-[-5%] translate-y-[20%]",
                name: "Elizabeth Nathania Witanto",
                title: "S. Kom., M.Kom."
            },
            {
                imgUrl: "/images/FAQ/judges/evan.png",
                classImage: "scale-[1] translate-x-[0%]",
                name: "Evan Tanuwijaya",
                title: "S. Kom., M.Kom."
            },
        ]
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
      },
      judges: {
        bgUrls: [
            "/images/judges/judges-1.webp",
            "/images/judges/judges-2.webp",
            "/images/judges/judges-3.webp",
        ],
        list: [
            {
                imgUrl: "/images/FAQ/judges/rudi.png",
                classImage: "scale-[1.5] translate-x-[-5%] translate-y-[20%]",
                name: "Rudi Limantoro",
                title: "S. Kom., M.Kom."
            },
            {
                imgUrl: "/images/FAQ/judges/elizabeth.png",
                classImage: "scale-[1.5] translate-x-[-5%] translate-y-[20%]",
                name: "Elizabeth Nathania Witanto",
                title: "S. Kom., M.Kom."
            },
            {
                imgUrl: "/images/FAQ/judges/evan.png",
                classImage: "scale-[1] translate-x-[0%]",
                name: "Evan Tanuwijaya",
                title: "S. Kom., M.Kom."
            },
        ]
      },
      judgesFinal: {
        bgUrls: [
            "/images/judges/judges-unknown.svg",
            "/images/judges/judges-unknown.svg",
            "/images/judges/judges-unknown.svg",
        ],
        list: [
            {
                imgUrl: "/images/FAQ/judges/rudi.png",
                classImage: "scale-[1.5] translate-x-[-5%] translate-y-[20%]",
                name: "Rudi Limantoro",
                title: "S. Kom., M.Kom."
            },
            {
                imgUrl: "/images/FAQ/judges/elizabeth.png",
                classImage: "scale-[1.5] translate-x-[-5%] translate-y-[20%]",
                name: "Elizabeth Nathania Witanto",
                title: "S. Kom., M.Kom."
            },
            {
                imgUrl: "/images/FAQ/judges/evan.png",
                classImage: "scale-[1] translate-x-[0%]",
                name: "Evan Tanuwijaya",
                title: "S. Kom., M.Kom."
            },
        ]
      }
    }
  };

  const currentData = categoryData[activeCategory];

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
        imgMobile={currentData.prizes.mobile}
        imgDesktop={currentData.prizes.desktop}
      />
      <TimelineSection 
        timelineImageDesktop={currentData.timeline.timelineDesktop}
        timelineImageMobile={currentData.timeline.timelineMobile}
        feeImageDesktop={currentData.timeline.feeDesktop}
        feeImageMobile={currentData.timeline.feeMobile}
        finalFeeImageDesktop={currentData.timeline.finalFeeDesktop}
        finalFeeImageMobile={currentData.timeline.finalFeeMobile}
      />

      <JudgeSection 
        title="Meet Our Preliminary Hackathon Judges"
        judges={currentData.judges.list}
        bgUrls={currentData.judges.bgUrls}
      />
      <JudgeSection 
        title="Meet Our Final Hackathon Judges"
        judges={currentData.judgesFinal.list}
        bgUrls={currentData.judgesFinal.bgUrls}
      />
      <FaqSection />

    </>
  );
}
