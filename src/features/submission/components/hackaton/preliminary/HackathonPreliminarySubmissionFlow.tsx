'use client';

import Image from "next/image";
import HackathonPreliminaryForm from "./HackathonPreliminaryForm";

interface HackathonPreliminarySubmissionFlowProps {
  teamId: string;
}

export default function HackathonPreliminarySubmissionFlow({ teamId }: HackathonPreliminarySubmissionFlowProps) {
  return (
    <div className="relative min-h-screen flex justify-center items-center pt-[10%] md:pt-0">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/auth/background.webp"
          alt="Background"
          fill
          className="object-fill"
          priority
        />
      </div>

      {/* Container BG - Using mobile/desktop container switch as per UI/UX flow */}
      <div className="relative z-10 pt-[15%] sm:pt-[12%] md:pt-0 min-w-[340px] md:min-w-[700px] w-[70%] md:max-w-[1000px] aspect-355/472 md:aspect-1187/627 bg-[url('/images/auth/bgContainer-mobile.svg')] md:bg-[url('/images/submission/container.svg')] bg-contain m-auto bg-no-repeat bg-center">
        {/* content */}
        <HackathonPreliminaryForm teamId={teamId} />
      </div>
    </div>
  );
}
