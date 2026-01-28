"use client";

import Image from "next/image";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useRef, useState, useEffect } from "react";
import type { RegisterFormHandle } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  const formRegisRef = useRef<RegisterFormHandle | null>(null);
  const [visibleStep, setVisibleStep] = useState<number>(1);

  useEffect(() => {
    // sync initial step if RegisterForm exposes it
    const s = formRegisRef.current?.getStep?.();
    if (s) setTimeout(() => setVisibleStep(s), 0);
  }, []);


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

    {/* Container BG (on top of background image) */}
    <div className="relative z-10 pt-[15%] sm:pt-[12%] md:pt-0 min-w-[340px] md:min-w-[700px] w-[70%] md:max-w-[1000px] aspect-355/472 md:aspect-1187/627 bg-[url('/images/auth/bgContainer-mobile.svg')] md:bg-[url('/images/auth/bgContainer.svg')] bg-contain m-auto bg-no-repeat bg-center">
      {/* content */}
      <RegisterForm ref={formRegisRef} />

      {/* BUTTON */}
      <div className={`absolute bottom-[5%] md:-bottom-[8%] w-full flex ${visibleStep === 1 ? 'justify-center' : 'justify-between'} gap-[5%] md:gap-0 px-[9%] md:px-[15%] z-20`}>
        {visibleStep > 1 && (
          <div
            onClick={() => {
              const s = formRegisRef.current?.prevStep?.();
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
            <p className='font-family-audiowide text-sm sm:text-lg lg:text-2xl text-[$090223]'>previous</p>
          </div>
        )}

        {visibleStep < 4 && (
          <div
            onClick={async ()=>{
              // console.log("Next button clicked in RegisterPage");
              try {
                const s = await formRegisRef.current?.nextStep?.();
                // console.log("nextStep returned:", s);
                if (s) setVisibleStep(s);
              } catch (e) {
                // console.error("Error calling nextStep:", e);
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
            <p className='font-family-audiowide text-sm sm:text-lg lg:text-2xl text-[$090223]'>next</p>
          </div>
        )}
        
        {visibleStep === 4 && (
          <div

            className="
                bg-[url('/images/utils/buttonBG.svg')] w-[50%] md:w-[40%] bg-no-repeat bg-contain aspect-361/100
                flex justify-center items-center
                transition-all duration-300
                hover:drop-shadow-[0_0_15px_#05B0C1]
                cursor-pointer
            "
          onClick={() => formRegisRef.current?.submit()}
          >
            <p className='font-family-audiowide text-sm sm:text-lg lg:text-2xl text-[$090223]'>submit</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

}
