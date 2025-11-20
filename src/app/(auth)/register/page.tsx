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
    <div className="relative z-10 min-w-[500px] w-[70%] bg-[url('/register/bg.svg')] bg-contain m-auto bg-no-repeat bg-center h-screen">
      {/* content */}
      <RegisterForm />
    </div>
  </div>
);

}
