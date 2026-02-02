import Image from "next/image";
import ButtonImg from "../ButtonImg";

export default function AboutSection() {
  return (
    <div className="bg-[#0a0a1f]">
      <div className="m-auto flex w-[98%] flex-col justify-center gap-[3%] p-10 md:w-full max-w-[1440px] md:flex-row">
        <div className="flex w-full flex-col gap-4">
          <Image
            src="images/about/about_title.svg"
            alt="About Hackfest"
            width={2200}
            height={1300}
            className="hidden h-auto w-full md:inline-block"
          />
          <Image
            src="/images/about/title_mobile.svg"
            alt="About Hackfest"
            width={2200}
            height={1300}
            className="inline-block h-auto w-full md:hidden"
          />

          {/* About Hackfest */}
          <div className="mt-5 flex w-full flex-col gap-5 md:gap-0 md:flex-row md:gap-5">
            <div className="w-[100%]">
              <Image
                src="/images/about/description_panel.svg"
                alt="About Hackfest"
                width={2200}
                height={1300}
                className="hidden h-auto w-full md:inline-block"
              />
              <Image
                src="/images/about/about_panel_mobile.svg"
                alt="About Hackfest"
                width={2200}
                height={1300}
                className="inline-block h-auto w-full md:hidden"
              />
            </div>
            
            <div className="md:aspect-[143/258] w-full gap-5 md:w-[19%] flex md:flex-col md:justify-between self-start">
              <div className="w-full">
                <ButtonImg imgUrl="/images/about/guidebook.svg" href="/guidebook">
                  GUIDEBOOK
                </ButtonImg>
              </div>

              {/* LINK 2: REGISTER */}
              <div className="w-full">
                <ButtonImg className="" imgUrl="/images/about/register.svg" href="/teamRegistration">Register</ButtonImg>
              </div>
            </div>
          </div>
          <Image
            src="/images/about/battery.svg"
            alt="About Hackfest"
            width={2200}
            height={1300}
            className="inline-block h-auto w-full md:hidden"
          />
        </div>
      </div>
    </div>
    
  );
}
