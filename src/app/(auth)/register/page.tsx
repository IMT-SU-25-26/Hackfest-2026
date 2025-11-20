"use client";

import Image from "next/image";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
  <div className="relative h-[93vh]">
    {/* Background Image */}
    <div className="absolute inset-0 z-0">
      <Image
        src="/auth/background.webp"
        alt="Background"
        fill
        className="object-fill"
        priority
      />
    </div>

    {/* Container BG (on top of background image) */}
    <div className="relative z-10 min-w-[340px] md:min-w-[700px] w-[70%] md:max-w-[1000px] bg-[url('/auth/bgContainer-mobile.svg')] md:bg-[url('/auth/bgContainer.svg')] bg-contain m-auto bg-no-repeat bg-center h-screen">
      {/* content */}
      <RegisterForm />
    </div>
  </div>
);

}
