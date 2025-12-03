'use client'
import FormAskQuestion, { type AskQuestionHandle } from "@/components/faq/FormAskQuestion"
import Image from "next/image"
import { useRef } from "react";

function Qna() {
  const formRef = useRef<AskQuestionHandle>(null);
  return (
    <div className="relative min-h-screen flex justify-center items-center md:pt-[5vh]">
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
        <div className="relative z-10 pt-[12%] sm:pt-[12%] md:pt-[7%]  min-w-[400px] md:min-w-[800px] w-[75%] md:w-[60%] md:max-w-[1200px] aspect-355/472 md:aspect-1187/677 bg-[url('/images/auth/bgContainer-mobile.svg')] md:bg-[url('/images/FAQ/bgAsk.svg')] bg-contain m-auto bg-no-repeat bg-center">
          
          {/* Form sizer */}
          <div className="w-[80%] md:w-[65%] m-auto">
            <p className="block md:hidden text-3xl mb-[2%] font-family-audiowide text-[#05B0C1] glow-glitch text-center">Ask a Question</p>
            <FormAskQuestion ref={formRef} />
          </div>
          {/* Button Login */}
          <div
              onClick={() => formRef.current?.submit()}
              className="
                  relative md:absolute -bottom-[3%] md:-bottom-[8%] left-1/2 -translate-x-1/2
                  bg-[url('/images/utils/buttonBG.svg')]
                  w-[45%] md:w-[30%] bg-no-repeat bg-contain aspect-361/100
                  flex justify-center items-center
                  transition-all duration-300
                  hover:drop-shadow-[0_0_15px_#05B0C1]
                  cursor-pointer
              "
              >
              <p className='font-family-audiowide text-md lg:text-xl xl:text- 2xl text-[$090223]'>submit</p>
          </div>
        </div>
    </div>
  )
}

export default Qna