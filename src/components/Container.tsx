import { ReactNode } from "react";
import Image from "next/image";

interface ContainerProps {
  children: ReactNode;
  title: string;
  className?: string;
}

export const Container = ({ children, title, className = "" }: ContainerProps) => {
  return (

    <div className={`relative min-h-screen flex justify-center items-center pt-[10%] md:pt-0 ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/login/Background.svg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Container BG */}
      <div className="relative z-10 pt-[15%] sm:pt-[12%] md:pt-0 min-w-[340px] md:min-w-[700px] w-[70%] md:max-w-[1000px] aspect-[355/472] md:aspect-[1187/711] bg-[url('/images/auth/bgContainer-mobile.svg')] md:bg-[url('/images/utils/container.svg')] bg-contain m-auto bg-no-repeat bg-center flex flex-col">
        
        {/* Title */}
        <div className="md:hidden absolute top-[8%] w-full text-center">
          <h1 className="font-family-audiowide text-2xl md:text-4xl text-[#05C174] drop-shadow-[0_0_10px_rgba(5,193,116,0.5)] uppercase tracking-wider">
            {title}
          </h1>
        </div>

        {/* Content Area - Adjusted padding to account for title and background borders */}
        <div className="flex-1 w-full px-[10%] pt-[20%] pb-[10%] md:pt-[15%] flex flex-col items-center">
          {children}
        </div>
      </div>
    </div>
  );
};
