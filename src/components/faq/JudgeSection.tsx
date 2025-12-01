"use client";

import { useState } from "react";
import JudgeCard from "./JudgeCard"
import FaqSection from "./FaqSection"
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Judge {
    imgUrl: string;
    classImage: string;
    name: string;
    title: string;
}

const judges: Judge[] = [
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
    {
        imgUrl: "/images/FAQ/judges/rudi.png",
        classImage: "scale-[1.5] translate-x-[-5%] translate-y-[20%]",
        name: "Felix Richardo",
        title: "S. Kom., M.Kom."
    },
    {
        imgUrl: "/images/FAQ/judges/elizabeth.png",
        classImage: "scale-[1.5] translate-x-[-5%] translate-y-[20%]",
        name: "Jermy Eklesia",
        title: "S. Kom., M.Kom."
    },
    {
        imgUrl: "/images/FAQ/judges/evan.png",
        classImage: "scale-[1] translate-x-[0%]",
        name: "Doctor Strange",
        title: "S. Kom., M.Kom."
    },
];

function JudgeSection() {
    const [currentPage, setCurrentPage] = useState(0);
    const cardsPerPage = 3;
    const totalPages = Math.ceil(judges.length / cardsPerPage);
    
    const currentCards = judges.slice(
        currentPage * cardsPerPage,
        (currentPage + 1) * cardsPerPage
    );

    const handleNext = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const handlePrev = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    return (
        <>
            <h2 className="text-[#05B0C1] font-family-audiowide text-center text-[330%] glow-pulse">Introduce Our Judges</h2>
            <div className="w-full mt-[2%] aspect-1440/547 bg-[url('/images/faq/bgJudge.svg')] bg-contain bg-no-repeat relative">
                
                {/* Images of judges */}
                <div className="w-full h-full flex flex-col md:flex-row flex-wrap gap-4 justify-evenly items-center overflow-hidden">
                    {currentCards.map((judge, index) => (
                        <JudgeCard
                            imgUrl={judge.imgUrl}
                            classImage={judge.classImage}
                            name={judge.name}
                            title={judge.title}
                            key={index}
                        />
                    ))}
                </div>

                {/* Navigation Buttons */}
                {currentPage > 0 && (
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-[#05B0C1] hover:bg-[#05B0C1]/80 text-white p-2 rounded-full transition-all duration-300 animate-fadeIn"
                        aria-label="Previous judges"
                    >
                        <ChevronLeft size={24} />
                    </button>
                )}
                {currentPage < totalPages - 1 && (
                    <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-[#05B0C1] hover:bg-[#05B0C1]/80 text-white p-2 rounded-full transition-all duration-300 animate-fadeIn"
                        aria-label="Next judges"
                    >
                        <ChevronRight size={24} />
                    </button>
                )}

                {/* Pagination Dots */}
                {totalPages > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    i === currentPage ? "bg-[#05B0C1]" : "bg-[#05B0C1]/40"
                                }`}
                                aria-label={`Go to page ${i + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>


        </>
    )
}

export default JudgeSection