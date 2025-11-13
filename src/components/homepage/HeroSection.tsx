"use client";
import React from "react";
import FaultyTerminal from "../FaultyTerminal";

function HeroSection() {
  return (
    <div className="relative min-h-screen w-screen flex flex-col justify-center items-center overflow-hidden">
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
      <div className="relative z-10 text-white font-bold flex flex-col gap-4 items-center justify-center">
        <h1 className="text-9xl">HACKFEST</h1>
        <h1 className="text-7xl"><span className="text-green-500">2026</span>CODE FOR GREENER FUTURE</h1>
      </div>
    </div>
  );
}

export default HeroSection;
