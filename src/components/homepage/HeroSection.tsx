"use client";
import React, { useRef, useState, useEffect } from "react";
import FaultyTerminal from "../FaultyTerminal";
import Image from "next/image";

function HeroSection() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pause animation when off-screen
  useEffect(() => {
    if (!terminalRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1, // 10% visible triggers
      }
    );
    observer.observe(terminalRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen w-[100w-dvw] flex flex-col justify-center items-center overflow-hidden">
      <div ref={terminalRef} className="absolute w-full h-full">
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={1}
          pause={!isVisible} // pause when off-screen
          scanlineIntensity={1}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0}
          tint="#037985"
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation={false}
          brightness={1}
        />
      </div>
      <Image
        src={"/home/title-text.svg"}
        className="relative z-10 w-[80vw] h-auto pointer-events-none"
        width={1920}
        height={1080}
        alt="hackfest title"
      />
    </div>
  );
}

export default HeroSection;
