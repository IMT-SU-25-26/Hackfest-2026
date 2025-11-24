"use client";
import { useRef, useState, useEffect } from "react";
import FaultyTerminal from "../FaultyTerminal";
import Image from "next/image";

function HeroSection() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!terminalRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.01 },
    );

    observer.observe(terminalRef.current);
    return () => observer.disconnect();
  }, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative min-h-screen pt-[7vh] w-[100w-dvw] flex flex-col justify-center items-center overflow-hidden">
      <div ref={terminalRef} className="absolute w-full h-full">
        <div className="absolute w-full h-full bg-gradient-to-t pointer-events-none from-[#090223] to-transparent z-10">
        </div>

        {mounted && isVisible && (
          <FaultyTerminal
            scale={1.5}
            gridMul={[2, 1]}
            digitSize={1.2}
            timeScale={1}
            pause={false}
            scanlineIntensity={1}
            glitchAmount={1}
            flickerAmount={1}
            noiseAmp={1}
            chromaticAberration={1}
            dither={0}
            curvature={0.125}
            tint="#037985"
            mouseReact={true}
            mouseStrength={0.5}
            pageLoadAnimation={true}
            brightness={1}
          />
        )}
      </div>
      <Image
        src={"home/title-text.svg"}
        className="relative z-10 w-[80vw] h-auto pointer-events-none"
        width={1920}
        height={1080}
        alt="hackfest title"
      />
    </div>
  );
}

export default HeroSection;
