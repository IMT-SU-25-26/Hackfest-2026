import Image from "next/image";

function TimelineSection() {
  return (
    <div
      id="timeline"
      className="pt-[5%] w-[100w-dvw] min-h-screen flex flex-col items-center justify-center bg-[#0a0a1f] bg-no-repeat bg-[url('/images/timeline/decorative-lines-mobile.svg')] md:bg-[url('/images/timeline/decorative-lines-desktop.svg')] bg-top"
      style={{
        backgroundSize: "100% auto",
      }}
    >
      {/* Timeline Section */}
      <div className="w-full relative pt-16 mb-20">
        <div className="w-full max-w-7xl mx-auto px-4">
          <h3 className="text-3xl md:text-5xl font-bold font-family-audiowide text-center text-[#00ffcc] mb-8 md:mb-12 tracking-wider">
            Timeline
          </h3>

          {/* Desktop Timeline */}
          <div className="hidden md:block w-full">
            <Image
              src="/images/timeline/timeline-desktop.svg"
              alt="Timeline Desktop"
              width={1200}
              height={400}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden w-full flex justify-center">
            <div className="w-full max-w-[280px]">
              <Image
                src="/images/timeline/timeline-mobile.svg"
                alt="Timeline Mobile"
                width={280}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Registration Fee Section - Full Width Background */}
      <div className="w-full relative pt-[5%]" id="regsFee">
        {/* Desktop Background */}
        <div
          className="hidden md:block w-full min-h-[600px] relative"
          style={{
            backgroundImage: "url('/images/timeline/background-fee.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay untuk memastikan readability */}
          {/* <div className="absolute inset-0 bg-[#0a0a1f]/0"></div> */}

          <div className="relative py-10 px-8 flex flex-col items-center">
            <h1 className="text-5xl font-bold font-family-audiowide text-center text-[#00ffcc] mb-10 tracking-wider">
              REGISTRATION FEE
            </h1>

            <div className="w-full max-w-4xl">
              <Image
                src="/images/timeline/fee-desktop.svg"
                alt="Fee Desktop"
                width={900}
                height={350}
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
            backgroundImage: "url('/timeline/background-fee.svg')",
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
                src="/images/timeline/fee-mobile.svg"
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
