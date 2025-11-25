"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FaqItem {
  question: string;
  answer: string[];
}

const faqData: FaqItem[] = [
  {
    question: "Apa itu hackfest ?",
    answer: [
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    question: "Kenapa harus hackfest ?",
    answer: [
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    question: "Hackfest berapa kali?",
    answer: [
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
];

function FaqSection() {
  const router = useRouter()
  const [openIndexes, setOpenIndexes] = useState<number[]>([2]);

  const toggleFaq = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="w-full bg-[url('/images/FAQ/bg-faq.svg')] bg-cover bg-no-repeat bg-[#0a0a1f] py-16 px-4 font-mono">
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

          <h2 className="text-5xl md:text-6xl font-family-audiowide font-bold text-[#00ff88] tracking-wider">
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
          {faqData.map((faq, index) => (
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
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndexes.includes(index)
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 pl-14 space-y-3">
                  {faq.answer.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-[#00ff88] text-base md:text-lg leading-relaxed"
                    >
                      <span className="text-[#00ff88]  mr-2">&gt;</span>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center flex-col items-center mt-[5%]">
          <h1 className="font-family-audiowide glow-pulse text-[#05B0C1] text-3xl md:text-5xl text-center">Still have more questions ?</h1>
          
          <button
              type="button"
              onClick={()=>{router.push("qna")}}
              className={`font-family-spacemono mt-[2%] mb-[5%] w-[80%] max-w-[600px] aspect-6/1 bg-transparent bg-[url('/images/utils/bigButtonBG.svg')] bg-contain bg-no-repeat bg-center px-4 text-black transition-all duration-300 hover:text-black hover:drop-shadow-[0_0_8px_#05C174] text-lg font-bold`}
          >
              <div className="relative">
                  <p className="font-family-audiowide text-center text-sm sm:text-md lg:text-xl">
                      Ask Question
                  </p>
              </div>
          </button>
      </div>

    </section>
  );
}

export default FaqSection;
