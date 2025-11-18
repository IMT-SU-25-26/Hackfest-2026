"use client";
import Image from "next/image";

export default function AboutSection() {
  return (
    <div className="bg-black">
      <div className="w-full mt-10 flex justify-center">
        <Image
          src="/home/title.webp"
          alt="Hackfest Title"
          width={1920}
          height={1080}
          className="w-full"
        />
      </div>


      <div className="flex justify-center gap-10 p-10">
        <div className="max-w-[800px]">
          <Image
            src="/home/about.webp"
            alt="About Hackfest"
            width={2200}
            height={1300}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-8">
          <div className="text-center cursor-pointer transition-transform duration-200 hover:scale-105">
            <Image
              src="/home/guidebook.webp"
              alt="Guidebook"
              width={400}
              height={400}
              className="w-[160px] mx-auto"
            />
          </div>

          <div className="text-center cursor-pointer transition-transform duration-200 hover:scale-105">
            <Image
              src="/home/register.webp"
              alt="Register"
              width={400}
              height={400}
              className="w-[160px] mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
