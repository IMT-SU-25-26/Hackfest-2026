'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

// Data Configuration Section
const TAB_DATA = {
  preview: {
    videoSrc: "https://s3.felitech.site/hackfest/recap.webm",
    mobileBg: "/images/recap/backgroundContainerMobile.svg",
    shortDescImg: "/images/recap/frameShortDesc.svg",
  },
  guidelines: {
    videoSrc: "https://s3.felitech.site/hackfest/recap.webm", 
    mobileBg: "/images/qna/frameShortDesc-mobile.svg",
    shortDescImg: "/images/qna/frameShortDesc.svg",
  }
};

type TabType = keyof typeof TAB_DATA;

function RecapSection() {
  const [activeTab, setActiveTab] = useState<TabType>('preview');

  // Auto Pause Video
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {}) 
        } else {
          video.pause() 
        }
      },
      {
        threshold: 0.5,
      }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-[#0a0a1f] overflow-hidden">
      <div className="relative w-full">


        {/* Image 2 (front layer + content on top) */}
        <div className="mt-0 relative z-10">
          <div className="relative">
            <Image
              src={TAB_DATA[activeTab].mobileBg}
              alt="Background Mobile"
              width={0}
              height={0}
              sizes="100dvw"
              className="block md:hidden w-dvw h-auto drop-shadow-2xl pointer-events-none select-none"
              unoptimized
            />
            <Image
              src="/images/recap/backgroundContainer.svg"
              alt="Recap Background"
              width={0}
              height={0}
              sizes="100dvw"
              className="hidden md:block w-dvw h-auto drop-shadow-2xl pointer-events-none select-none"
              unoptimized
            />

            {/* Content on top of Image 2 */}
            <div className="absolute top-0 left-0 w-full z-20 px-[3%]">
              {/* Title */}
              <div className='border-0 md:border-b-2 border-[#05C174] pb-[1%] flex justify-center gap-1 md:gap-auto flex-col md:flex-row md:justify-between items-center text-center px-5 mt-[15%] md:mt-[4.5%] mb-[1%]'>
                <div 
                  className={`flex justify-center gap-5 items-center cursor-pointer p-1 transition-all duration-300 ${
                    activeTab === 'preview' ? 'border-2 border-[#05C174] bg-[#05C174]/10' : ''
                  }`}
                  onClick={() => setActiveTab('preview')}
                >
                  <Image
                    className='hidden md:block w-[13%] pointer-events-none select-none'
                    src="/images/recap/eye.svg"
                    alt="Eye Icon"
                    width={100}
                    height={100}
                  />
                  <h1 className='text-[#05C174] text-[160%] sm:text-[290%] md:text-[130%] lg:text-[220%] font-family-audiowide'>
                    2025 Preview
                  </h1>
                </div>
                <div 
                  className={`flex justify-end gap-6 items-center cursor-pointer py-1 px-3 transition-all duration-300 ${
                    activeTab === 'guidelines' ? 'border-2 border-[#05C174] bg-[#05C174]/10' : ''
                  }`}
                  onClick={() => setActiveTab('guidelines')}
                >
                  <h1 className='text-[#05C174] text-[160%] sm:text-[290%] md:text-[130%] lg:text-[220%] font-family-audiowide'>
                    Technical Guidelines
                  </h1>
                  <Image
                    className='hidden md:block w-[10%] pointer-events-none select-none'
                    src="/images/recap/battery.svg"
                    alt="Battery Icon"
                    width={100}
                    height={100}
                  />
                </div>
              </div>



              {/* Main Content */}
              <div className="flex flex-wrap justify-center items-start gap-8">

                {/* Left: Video */}
                <video
                  key={TAB_DATA[activeTab].videoSrc} // Add key to force re-render on src change
                  ref={videoRef}
                  className="text-white w-full md:w-[50%] transition-transform duration-300 cursor-pointer"
                  src={TAB_DATA[activeTab].videoSrc}
                  onClick={() => {
                    if (videoRef.current) videoRef.current.muted = false
                  }}
                  autoPlay
                  loop
                  muted
                  playsInline
                />

                {/* Right: Short Description Box */}
                <div className="relative w-full md:w-[40%]">
                  {/* Background Image (Design Frame) */}
                  <Image
                    src={TAB_DATA[activeTab].shortDescImg}
                    alt="Short Description"
                    width={500}
                    height={500}
                    className="hidden md:block w-full h-auto pointer-events-none select-none"
                  />

                  {/* Text on top of the Image */}
                  {/* <div className="absolute inset-0 flex flex-col items-start gap-3 text-white font-family-spacemono text-[90%] sm:text-2xl md:text-[60%] xl:text-[85%] px-[5%] xl:px-[6%] pt-[23%] md:pr-[15%] md:pt-[12%]">
                    <p>{`> In these past 3 years, Hackfest has grown into a nationwide platform that empowers students to build impactful and innovative tech solutions. Organized by the Student Union Informatics Universitas Ciputra Surabaya, Hackfest: Build to Billion 2025 calls on university students across Indonesia to craft software with the potential to reach a billion rupiah in value. Over 20 hours of coding, teams will brainstorm, prototype, and refine their ideas into market-ready concepts. This year’s theme, Code for Humanity, invites participants to create solutions that uplift communities and bring meaningful change to everyday lives.`}</p>
                  </div> */}
                </div>

            </div>


            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default RecapSection