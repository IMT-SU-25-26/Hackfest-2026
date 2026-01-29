"use client";

import Image from "next/image";
import FinalTeamRegisterForm, { FinalTeamRegisterFormHandle } from "@/features/teamRegistration/components/FinalTeamRegisterForm";
import { useRef, useState, useEffect } from "react";

interface FinalTeamRegistrationFlowProps {
  teamId: string;
  teamName: string;
}

export default function FinalTeamRegistrationFlow({ teamId, teamName }: FinalTeamRegistrationFlowProps) {
  const formRef = useRef<FinalTeamRegisterFormHandle>(null);
  const [visibleStep, setVisibleStep] = useState<number>(1);

  // Sync initial step if needed
  useEffect(() => {
    const s = formRef.current?.getStep?.();
    if (s) setTimeout(() => setVisibleStep(s), 0);
  }, []);

  const isLastStep = visibleStep === 2;

  return (
    <div className="relative min-h-screen flex justify-center items-center pt-[10%] md:pt-0">

      {/* Container BG */}
      <div className="relative z-10 pt-[15%] sm:pt-[12%] md:pt-0 min-w-[340px] md:min-w-[700px] w-[70%] md:max-w-[1000px] aspect-355/472 md:aspect-1187/627 bg-[url('/images/auth/bgContainer-mobile.svg')] md:bg-[url('/images/auth/bgContainer.svg')] bg-contain m-auto bg-no-repeat bg-center">
        
        {/* Content Wrapper */}
        <div className="absolute hide-scrollbar inset-0 flex flex-col items-center justify-start pt-[5%] md:pt-[0%] px-[8%] md:px-[10%] pb-[20%] md:pb-[0%] h-[70%] mt-[15%] md:h-[70%] md:mt-[10%] overflow-y-auto">
            {/* <h1 className="text-[#05B0C1] font-audiowide text-xl md:text-3xl mb-4 drop-shadow-[0_0_10px_#05B0C1]">
                FINAL REGISTRATION
            </h1> */}
            <FinalTeamRegisterForm 
                ref={formRef} 
                teamId={teamId}
                teamName={teamName}
            />
        </div>

        {/* BUTTONS */}
        <div className={`absolute bottom-[5%] md:-bottom-[8%] w-full flex ${visibleStep === 1 ? 'justify-center' : 'justify-between'} gap-[5%] md:gap-0 px-[9%] md:px-[15%] z-20`}>
          {visibleStep > 1 && (
            <div
              onClick={() => {
                const s = formRef.current?.prevStep?.();
                if (typeof s === "number") setVisibleStep(s);
              }}
              className="
                  bg-[url('/images/utils/buttonBG.svg')] w-[40%] md:w-[40%] bg-no-repeat bg-contain aspect-361/100
                  flex justify-center items-center
                  transition-all duration-300
                  hover:drop-shadow-[0_0_15px_#05B0C1]
                  cursor-pointer
              "
            >
              <p className='font-family-audiowide text-sm sm:text-lg lg:text-xl text-[#090223] pb-1'>previous</p>
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
                  bg-[url('/images/utils/buttonBG.svg')] w-[40%] md:w-[40%] bg-no-repeat bg-contain aspect-361/100
                  flex justify-center items-center
                  transition-all duration-300
                  hover:drop-shadow-[0_0_15px_#05B0C1]
                  cursor-pointer m-auto
              "
            >
              <p className='font-family-audiowide text-sm sm:text-lg lg:text-xl text-[#090223] pb-1'>next</p>
            </div>
          )}
          
          {isLastStep && (
            <div
              className="
                  bg-[url('/images/utils/buttonBG.svg')] w-[40%] md:w-[40%] bg-no-repeat bg-contain aspect-361/100
                  flex justify-center items-center
                  transition-all duration-300
                  hover:drop-shadow-[0_0_15px_#05B0C1]
                  cursor-pointer
              "
              onClick={() => formRef.current?.submit()}
            >
              <p className='font-family-audiowide text-sm sm:text-lg lg:text-xl text-[#090223] pb-1'>submit</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
