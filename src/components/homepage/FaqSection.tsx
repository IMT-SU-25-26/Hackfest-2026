"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Placeholder data - User will update this later
const FAQS = [
  {
    id: "1",
    question: "What is a Hackathon?",
    answer: "A hackathon is a collaborative competition where teams develop a tech solution within a limited time, in this case, 24 hours. Participants brainstorm, build a prototype, and present their project at the end."
  },
  {
    id: "2",
    question: "Are participants allowed to use AI in the development process for this Hackathon?",
    answer: "Yes, participants are allowed to use AI-based tools such as ChatGPT, GitHub Copilot, or other AI APIs as long as the final output remains the team’s original work, and no AI for ideation. Make sure to mention any tools or technologies used in your project documentation."
  },
  {
    id: "3",
    question: "Can participants use website references from the internet when working on their Hackathon project?",
    answer: "Yes, participants are allowed to use website references from the internet."
  },
  {
    id: "4",
    question: "Who can join Hackfest 2026?",
    answer: "Hackfest 2026 has 2 categories, Hackathon that will be held nationally, and UI/UX that will be held internationally. So University Students all around the world will be able to participate."
  },
  {
    id: "5",
    question: "Do I need a team to register?",
    answer: "You are able to register as a team, up to 5 members and minimum 2 members ."
  },
  {
    id: "6",
    question: "Is participation free?",
    answer: "For Hackathon, the participation is completely free, but there will be additional fee to enter the finals, and for UI/UX there will be a fee of 10 dollars or 150.000 rupiah to register."
  },
];

function FaqSection() {
  const router = useRouter();
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="w-full bg-[url('/images/FAQ/bg-faq.svg')] bg-cover bg-no-repeat bg-[#0a0a1f] py-16 px-4 font-mono">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-0 p-6 border-t-2 border-l-2 border-r-2 border-[#00ff88]">
          <div className="flex items-center gap-4">
            <Image
              src="/images/FAQ/brain.svg"
              alt="Brain Icon"
              width={60}
              height={60}
              className="filter brightness-0 saturate-100"
              style={{
                filter:
                  "invert(72%) sepia(98%) saturate(441%) hue-rotate(101deg) brightness(101%) contrast(101%)",
              }}
            />
          </div>

          <h2 className="text-3xl md:text-6xl font-family-audiowide font-bold text-[#00ff88] tracking-wider">
            FAQ
          </h2>

          <div className="flex items-center gap-4">
            <Image
              src="/images/FAQ/danger.svg"
              alt="Danger Icon"
              width={60}
              height={60}
              className="filter brightness-0 saturate-100"
              style={{
                filter:
                  "invert(72%) sepia(98%) saturate(441%) hue-rotate(101deg) brightness(101%) contrast(101%)",
              }}
            />
          </div>
        </div>

        {/* FAQ Items */}
        <div className="border-2 border-[#00ff88]">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className={`bg-[#0a0a1f]/20 overflow-hidden ${index > 0 ? 'border-t-2 border-[#00ff88]' : ''}`}
            >
              {/* Question */}
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#00ff88] text-xl">&gt;</span>
                  <span className="text-[#00ff88] text-xl md:text-2xl font-family-spacemono font-medium">
                    {faq.question}
                  </span>
                </div>
                <div
                  className="text-[#00ff88] text-3xl transition-transform duration-300"
                >
                  {openIndexes.includes(index) ? "∧" : "∨"}
                </div>
              </button>

              {/* Answer */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndexes.includes(index)
                    ? "max-h-96 opacity-100 overflow-visible"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <div className="px-6 pb-6 pl-14 space-y-3">
                    <p
                      className="text-[#00ff88] text-base md:text-lg leading-relaxed"
                    >
                      <span className="text-[#00ff88]  mr-2">&gt;</span>
                      {faq.answer}
                    </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center flex-col items-center mt-[5%]">
          <h1 className="font-family-audiowide glow-pulse text-[#05B0C1] text-center text-3xl md:text-5xl">Still have more questions ?</h1>
          
          <button
              type="button"
              onClick={()=>{router.push("askQuestion")}}
              className={`font-family-spacemono mt-[2%] mb-[5%] w-[80%] max-w-[600px] aspect-6/1 bg-transparent bg-[url('/images/utils/bigButtonBG.svg')] bg-contain bg-no-repeat bg-center px-4 text-black transition-all duration-300 hover:text-black hover:drop-shadow-[0_0_8px_#05C174] text-lg font-bold`}
          >
              <div className="relative">
                  <p className="font-family-audiowide text-center text-sm sm:text-md lg:text-xl">
                      Ask a Question
                  </p>
              </div>
          </button>
      </div>

    </section>
  );
}

export default FaqSection;
