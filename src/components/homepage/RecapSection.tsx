import { Video } from 'lucide-react'
import Image from 'next/image'

function RecapSection() {
  return (
    <div className="bg-[#0a0a1f] overflow-hidden">
      <div className="relative w-full">

        {/* Image 1 (back layer) */}
        <Image
          src="/recap/blockBG.svg"
          alt="Back Layer"
          width={0}
          height={0}
          sizes="70dvw"
          className="hidden md:block w-[70%] mx-auto h-auto relative z-0"
          unoptimized
        />

        {/* Image 2 (front layer + content on top) */}
        <div className="mt-0 md:-mt-[18%] relative z-10">
          <div className="relative">
            <Image
              src="/recap/backgroundContainerMobile.svg"
              alt="Recap Background"
              width={0}
              height={0}
              sizes="100dvw"
              className="block md:hidden w-dvw h-auto drop-shadow-2xl"
              unoptimized
            />
            <Image
              src="/recap/backgroundContainer.svg"
              alt="Recap Background"
              width={0}
              height={0}
              sizes="100dvw"
              className="hidden md:block w-dvw h-auto drop-shadow-2xl"
              unoptimized
            />

            {/* Content on top of Image 2 */}
            <div className="absolute top-0 left-0 w-full z-20 px-[3%]">
              {/* Title */}
              <div className='border-0 md:border-b-2 border-[#05C174] flex justify-center md:justify-between items-center text-center px-10 mt-[15%] md:mt-[4.5%] mb-[1%]'>
                <div className='flex justify-center gap-3 items-center'>
                  <Image
                    className='hidden md:block w-[13%]'
                    src="/recap/eye.svg"
                    alt="Eye Icon"
                    width={100}
                    height={100}
                  />
                  <h1 className='text-[#05C174] text-[170%] sm:text-[290%] md:text-[130%] lg:text-[220%] font-family-audiowide'>
                    Hackfest 2025 Preview
                  </h1>
                </div>
                <Image
                  className='hidden md:block w-[6%]'
                  src="/recap/battery.svg"
                  alt="Battery Icon"
                  width={100}
                  height={100}
                />
              </div>



              {/* Main Content */}
              <div className="flex flex-wrap justify-center items-start gap-8">

                {/* Left: Video */}
                <video
                  className="text-white w-full md:w-[50%] transition-transform duration-300 cursor-pointer"
                  src="/recap/video/recap.webm"
                  autoPlay
                  loop
                  playsInline
                />

                {/* Right: Short Description Box */}
                <div className="relative w-full md:w-[40%]">
                  {/* Background Image (Design Frame) */}
                  <Image
                    src="/recap/frameShortDesc.svg"
                    alt="Device Frame"
                    width={500}
                    height={500}
                    className="hidden md:block w-full h-auto"
                  />

                  {/* Text on top of the Image */}
                  <div className="absolute inset-0 flex flex-col items-start gap-3 text-white font-family-spacemono text-[90%] sm:text-2xl md:text-[60%] px-[5%] pt-[23%] md:pt-[12%]">
                    <p>{`> Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}</p>
                    <p>{`> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`} </p>
                    <p>{`> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}</p>
                  </div>
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