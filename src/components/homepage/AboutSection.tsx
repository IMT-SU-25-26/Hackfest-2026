import Image from "next/image";
import Link from "next/link";
import ButtonImg from "../ButtonImg";

export default function AboutSection() {
  return (
    <div className="bg-[#0a0a1f]">
      <div className="w-[90%] md:w-[80%] flex flex-col md:flex-row justify-center m-auto gap-[3%] p-10">
        <div className="w-full">
          <Image
            src="/home/about.webp"
            alt="About Hackfest"
            width={2200}
            height={1300}
            className="w-full"
          />
        </div>

        {/* Button Section */}
        <div className="flex flex-row md:flex-col w-auto md:w-[15%] justify-evenly md:justify-between mt-[3%] md:mt-0 items-center">

          {/* LINK 1: GUIDEBOOK */}
          <ButtonImg imgUrl="/about/pc.svg">GUIDEBOOK</ButtonImg>

          {/* LINK 2: REGISTER */}
          <ButtonImg imgUrl="/about/disk.svg">Register</ButtonImg>

        </div>
      </div>
    </div>
  );
}
