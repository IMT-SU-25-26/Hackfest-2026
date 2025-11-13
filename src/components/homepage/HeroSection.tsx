"use client";
import React from "react";
import FaultyTerminal from "../FaultyTerminal";
import Image from "next/image";

function HeroSection() {
  return (
    <div className="relative min-h-screen w-[100w-dvw] flex flex-col justify-center items-center overflow-hidden">
      <div className="absolute w-full h-full">
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
      <Image src={"/home/title-text.svg"} className="relative z-10 w-[80vw] h-auto" width={1920} height={1080} alt="hackfest title"></Image>
    </div>
  );
}

export default HeroSection;
