"use client";

import React from "react";
import { ParallaxScrollFeatureSection } from "@/components/ui/parallax-scroll-feature-section";
import { SectionGhostTitle } from "@/components/ui/section-ghost-title";
import aboutImage from "@/assets/images/about.gif";
import { cn } from "@/lib/utils";

export interface AboutSectionProps {
  className?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ className }) => {
  return (
    <section
      id="about"
      className={cn(
        "relative w-full min-h-screen flex flex-col justify-center py-20 md:py-28 bg-background text-foreground border-t border-border/40 overflow-hidden",
        className
      )}
    >
      {/* Decorative Background Ghost Title */}
      <SectionGhostTitle text="About" />
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
          eyebrow=""
          title="Building Modern Systems & Artificial Intelligence"
          paragraph1="I am a Full-Stack Engineer & AI Specialist focusing on developing high-performance web applications, flexible system architectures, and intuitive user interfaces."
          paragraph2="By combining modern design principles and high-speed AI-driven workflows, I create digital solutions that are precise, scalable, and deliver real impact for users."
          imageUrl={aboutImage}
          statNumber="04+"
          statLabel="EXPERIENCE & MILESTONES"
          ctaText="CONTACT ME"
          ctaHref="#contact"
        />
      </div>
    </section>
  );
};

export default AboutSection;
