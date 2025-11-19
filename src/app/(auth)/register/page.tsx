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
      {/* Main Content */}
      <RegisterForm />
    </div>
  );
}
