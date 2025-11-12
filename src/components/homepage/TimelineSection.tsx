import React from "react";
import Image from "next/image";

function TimelineSection() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-[#0a0a1f] py-16">
      {/* Timeline Section */}
      <div className="w-full max-w-7xl mb-20 px-4">
        <h3 className="text-3xl md:text-5xl font-bold text-center text-[#00ffcc] mb-8 md:mb-12 tracking-wider">
          Timeline
        </h3>

        {/* Desktop Timeline */}
        <div className="hidden md:block w-full">
          <Image
            src="/timeline/timeline-desktop.svg"
            alt="Timeline Desktop"
            width={1200}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* Mobile Timeline */}
        <div className="block md:hidden w-full flex justify-center">
          <div className="w-full max-w-[280px]">
            <Image
              src="/timeline/timeline-mobile.svg"
              alt="Timeline Mobile"
              width={280}
              height={600}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Registration Fee Section - Full Width Background */}
      <div className="w-screen relative">
        {/* Desktop Background */}
        <div
          className="hidden md:block w-full min-h-[700px] relative"
          style={{
            backgroundImage: "url('/timeline/background-fee.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay untuk memastikan readability */}
          <div className="absolute inset-0 bg-[#0a0a1f]/40"></div>

          <div className="relative py-12 px-8 flex flex-col items-center">
            <h1 className="text-5xl font-bold text-center text-[#00ffcc] mb-12 tracking-wider">
              REGISTRATION FEE
            </h1>

            <div className="w-full max-w-6xl">
              <Image
                src="/timeline/fee-desktop.svg"
                alt="Fee Desktop"
                width={1100}
                height={400}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Mobile Background */}
        <div
          className="block md:hidden w-full min-h-[500px] relative"
          style={{
            backgroundImage: "url('/timeline/background-fee-mobile.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay untuk memastikan readability */}
          <div className="absolute inset-0 bg-[#0a0a1f]/40"></div>

          <div className="relative py-8 px-4 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center text-[#00ffcc] mb-8 tracking-wider">
              REGISTRATION FEE
            </h1>

            <div className="w-full max-w-[280px]">
              <Image
                src="/timeline/fee-mobile.svg"
                alt="Fee Mobile"
                width={280}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineSection;
