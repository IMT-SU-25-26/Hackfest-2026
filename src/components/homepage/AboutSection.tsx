import Image from "next/image";
import ButtonImg from "../ButtonImg";

export default function AboutSection() {
  return (
    <div className="bg-[#0a0a1f]">
      <div className="m-auto flex w-[98%] flex-col justify-center gap-[3%] p-10 md:w-[79%] md:flex-row">
        {/* <div className="absolute -bottom-[130rem] left-0 z-1 h-full w-full bg-gradient-to-b from-[#090223]/0 to-[#3305C1] sm:-bottom-[90rem] md:-bottom-[110rem] lg:-bottom-[125rem]"></div> */}
        <div className="flex w-full flex-col gap-4">
          <Image
            src="/about/about_title.svg"
            alt="About Hackfest"
            width={2200}
            height={1300}
            className="hidden h-auto w-full md:inline-block"
          />
          <Image
            src="/about/title_mobile.svg"
            alt="About Hackfest"
            width={2200}
            height={1300}
            className="inline-block h-auto w-full md:hidden"
          />
          <div className="mt-5 flex w-full flex-col items-center gap-5 md:flex-row md:gap-10">
            <div className="w-full basis-5/6 h-full">
            <Image
              src="/about/description_panel.svg"
              alt="About Hackfest"
              width={2200}
              height={1300}
              className="hidden h-auto w-full md:inline-block"
            />
            <Image
              src="/about/about_panel_mobile.svg"
              alt="About Hackfest"
              width={2200}
              height={1300}
              className="inline-block h-auto w-full md:hidden"
            />
            </div>
            
            <div className="flex h-full w-auto basis-1/6 flex-row gap-4 md:flex-col">
              <ButtonImg imgUrl="/about/guidebook.svg">GUIDEBOOK</ButtonImg>

              {/* LINK 2: REGISTER */}
              <ButtonImg imgUrl="/about/register.svg">Register</ButtonImg>
            </div>
          </div>
          <Image
            src="/about/battery.svg"
            alt="About Hackfest"
            width={2200}
            height={1300}
            className="inline-block h-auto w-full md:hidden"
          />
          <Image
            src="/about/prizes_mobile.svg"
            alt="About Hackfest"
            width={2200}
            height={1300}
            className="inline-block h-auto w-full md:hidden z-2"
          />
          <Image
            src="/about/prizes_desktop.svg"
            alt="About Hackfest"
            width={2200}
            height={1300}
            className="z-2 hidden h-auto w-full md:inline-block"
          />
        </div>
      </div>
    </div>
  );
}
