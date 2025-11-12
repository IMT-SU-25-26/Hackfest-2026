"use client";

import React, { useState } from "react";
import Image from "next/image";

interface FaqItem {
  question: string;
  answer: string[];
}

const faqData: FaqItem[] = [
  {
    question: "Apakah Felix Gay ?",
    answer: [
      "Itu adalah privasi tiap orang jadi saya tidak tahu,",
      "Tapi dari gerak geriknya sih kayaknya iya.",
    ],
  },
  {
    question: "Apakah Obie Gay ?",
    answer: [
      "Sebagai Roomatenya saya merasa khawatir karena sepertinya dia gay sama Bryan",
    ],
  },
  {
    question: "Apakah Bryan Gay ?",
    answer: [
      "Jujur orang ini agak Unik karena memiliki 2 selera yang berbeda.",
      "Pertama dia suka Obie, tapi di sisi lain dia juga suka CZ",
    ],
  },
];

function FaqSection() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([2]);

  const toggleFaq = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="bg-[#0a0a1f] h-80vh py-16 px-4 font-mono">
      <div className="max-w-7xl mx-auto ">
        {/* Header */}
        <div className="flex items-center justify-between mb-0 p-6 border-t-2 border-l-2 border-r-2 border-[#00ff88]">
          <div className="flex items-center gap-4">
            <Image
              src="/FAQ/brain.svg"
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

          <h2 className="text-5xl md:text-6xl font-bold text-[#00ff88] tracking-wider">
            FAQ
          </h2>

          <div className="flex items-center gap-4">
            <Image
              src="/FAQ/danger.svg"
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
              className={`bg-[#0a0a1f] overflow-hidden ${index > 0 ? 'border-t-2 border-[#00ff88]' : ''}`}
            >
              {/* Question */}
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#0f0f2a] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#00ff88] text-xl">&gt;</span>
                  <span className="text-[#00ff88] text-xl md:text-2xl font-medium">
                    {faq.question}
                  </span>
                </div>
                <div
                  className="text-[#00ff88] text-3xl transition-transform duration-300"
                  style={{
                    transform:
                      openIndexes.includes(index) ? "rotate(180deg)" : "rotate(0deg)",
                  }}
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
                      <span className="text-[#00ff88] mr-2">&gt;</span>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
