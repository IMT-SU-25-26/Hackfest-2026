"use client";

import Image from "next/image";
import { TeamRegisterForm, TeamRegisterFormHandle } from "@/features/teamRegistration/components/TeamRegisterForm";
import { useRef, useState, useEffect } from "react";
import { TeamCategory } from "@/generated/prisma";

export default function TeamRegistrationPage() {
  const formRef = useRef<TeamRegisterFormHandle | null>(null);
  const [visibleStep, setVisibleStep] = useState<number>(1);
  const [category, setCategory] = useState<TeamCategory>("UIUX");

  useEffect(() => {
    // sync initial step
    const s = formRef.current?.getStep?.();
    if (s) setTimeout(() => setVisibleStep(s), 0);
  }, []);

  const isLastStep = (category === "HACKATON" && visibleStep === 3) || (category === "UIUX" && visibleStep === 4);

  return (
    <div className="relative min-h-screen flex justify-center items-center pt-[10%] md:pt-0">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/auth/background.webp"
          alt="Background"
          fill
          className="object-fill"
          priority
        />
      </div>

      {/* Container BG */}
      <div className="relative z-10 pt-[15%] sm:pt-[12%] md:pt-0 min-w-[340px] md:min-w-[700px] w-[70%] md:max-w-[1000px] aspect-355/472 md:aspect-1187/627 bg-[url('/images/auth/bgContainer-mobile.svg')] md:bg-[url('/images/auth/bgContainer.svg')] bg-contain m-auto bg-no-repeat bg-center">
        {/* content */}
        <TeamRegisterForm 
            ref={formRef} 
            onCategoryChange={setCategory} 
        />

        {/* BUTTONS */}
        <div className={`absolute bottom-[5%] md:-bottom-[8%] w-full flex ${visibleStep === 1 ? 'justify-center' : 'justify-between'} gap-[5%] md:gap-0 px-[9%] md:px-[15%] z-20`}>
          {visibleStep > 1 && (
            <div
              onClick={() => {
                const s = formRef.current?.prevStep?.();
                if (typeof s === "number") setVisibleStep(s);
              }}
              className="
                  bg-[url('/images/utils/buttonBG.svg')] w-[50%] md:w-[40%] bg-no-repeat bg-contain aspect-361/100
                  flex justify-center items-center
                  transition-all duration-300
                  hover:drop-shadow-[0_0_15px_#05B0C1]
                  cursor-pointer
              "
            >
              <p className='font-family-audiowide text-sm sm:text-lg lg:text-2xl text-[#090223]'>previous</p>
            </div>
          )}

          {!isLastStep && (
            <div
              onClick={async ()=>{
                try {
                  const s = await formRef.current?.nextStep?.();
                  if (s) setVisibleStep(s);
                } catch (e) {
                   console.error(e);
                }
              }}
              className="
                  bg-[url('/images/utils/buttonBG.svg')] w-[50%] md:w-[40%] bg-no-repeat bg-contain aspect-361/100
                  flex justify-center items-center
                  transition-all duration-300
                  hover:drop-shadow-[0_0_15px_#05B0C1]
                  cursor-pointer
              "
            >
              <p className='font-family-audiowide text-sm sm:text-lg lg:text-2xl text-[#090223]'>next</p>
            </div>
          )}
          
          {isLastStep && (
            <div
              className="
                  bg-[url('/images/utils/buttonBG.svg')] w-[50%] md:w-[40%] bg-no-repeat bg-contain aspect-361/100
                  flex justify-center items-center
                  transition-all duration-300
                  hover:drop-shadow-[0_0_15px_#05B0C1]
                  cursor-pointer
              "
              onClick={() => formRef.current?.submit()}
            >
              <p className='font-family-audiowide text-sm sm:text-lg lg:text-2xl text-[#090223]'>register</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
