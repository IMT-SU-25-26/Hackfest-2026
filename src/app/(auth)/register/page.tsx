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
  <div className="relative min-h-screen flex justify-center items-center">
    {/* Background Image */}
    <div className="absolute inset-0 z-0">
      <Image
        src="/auth/background.webp"
        alt="Background"
        fill
        className="object-fill"
        priority
      />
    </div>

    {/* Container BG (on top of background image) */}
    <div className="relative z-10 min-w-[340px] md:min-w-[700px] w-[70%] md:max-w-[1000px] aspect-1187/627 bg-[url('/auth/bgContainer-mobile.svg')] md:bg-[url('/auth/bgContainer.svg')] bg-contain m-auto bg-no-repeat bg-center">
      {/* content */}
      <RegisterForm ref={formRegisRef} />

      {/* BUTTON */}
      <div className="absolute -bottom-[8%] w-full flex justify-between px-[15%]">
        {visibleStep > 1 && (
          <div
            onClick={() => {
              const s = formRegisRef.current?.prevStep?.();
              if (typeof s === "number") setVisibleStep(s);
            }}
            className="
                bg-[url('/utils/buttonBG.svg')] w-[45%] md:w-[40%] bg-no-repeat bg-contain aspect-361/100
                flex justify-center items-center
                transition-all duration-300
                hover:drop-shadow-[0_0_15px_#05B0C1]
                cursor-pointer
            "
          >
            <p className='font-family-audiowide text-lg text-[$090223]'>previous</p>
          </div>
        )}

        {visibleStep < 4 && (
          <div
            onClick={async ()=>{
              const s = await formRegisRef.current?.nextStep?.();
              if (s) setVisibleStep(s);
            }}
            className="
                bg-[url('/utils/buttonBG.svg')] w-[45%] md:w-[40%] bg-no-repeat bg-contain aspect-361/100
                flex justify-center items-center
                transition-all duration-300
                hover:drop-shadow-[0_0_15px_#05B0C1]
                cursor-pointer
            "
          >
            <p className='font-family-audiowide text-lg text-[$090223]'>next</p>
          </div>
        )}
        
        {visibleStep === 4 && (
          <div

            className="
                bg-[url('/utils/buttonBG.svg')] w-[45%] md:w-[40%] bg-no-repeat bg-contain aspect-361/100
                flex justify-center items-center
                transition-all duration-300
                hover:drop-shadow-[0_0_15px_#05B0C1]
                cursor-pointer
            "
          onClick={() => formRegisRef.current?.submit()}
          >
            <p className='font-family-audiowide text-lg text-[$090223]'>submit</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

}
