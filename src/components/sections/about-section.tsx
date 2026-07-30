"use client";

import React from "react";
import { ParallaxScrollFeatureSection } from "@/components/ui/parallax-scroll-feature-section";
import { cn } from "@/lib/utils";
import aboutImage from "@/assets/images/about-1x1-image.webp";

export interface AboutSectionProps {
  className?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ className }) => {
  return (
    <section
      id="about"
      className={cn(
        "relative w-full min-h-screen overflow-hidden bg-[#0a0a0a] text-[#e0e0e0] border-t border-[#2a2a2a]/40",
        className
      )}
    >
      {/* Halide Grain Noise SVG Background */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <filter id="about-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-15"
        style={{ filter: "url(#about-grain)" }}
      />

      {/* Main Parallax Component */}
      <div className="relative z-10">
        <ParallaxScrollFeatureSection
          title="About Me"
          description="I specialize in architecting resilient full-stack platforms and crafting intelligent AI solutions. Focused on seamless user experiences, precise motion design, and scalable systems."
          imageUrl={aboutImage}
          reverse={true}
        />
      </div>
    </section>
  );
};

export default AboutSection;
