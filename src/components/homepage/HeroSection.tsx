"use client";
import { useRef, useState, useEffect } from "react";
import FaultyTerminal from "../FaultyTerminal";
import Image from "next/image";

function HeroSection() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0); // store the rAF id
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!terminalRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(terminalRef.current);
    return () => observer.disconnect();
  }, []);

  // Stop/Resume rAF loop in FaultyTerminal
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative min-h-screen w-[100w-dvw] flex flex-col justify-center items-center overflow-hidden">
      <div ref={terminalRef} className="absolute w-full h-full">
        {mounted && isVisible && (
          <FaultyTerminal
            scale={1.5}
            gridMul={[2, 1]}
            digitSize={1.2}
            timeScale={1}
            pause={false} // no need to pause inside, we're stopping the component
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
        )}
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
