"use client";

import React from "react";
import { ParallaxScrollFeatureSection } from "@/components/ui/parallax-scroll-feature-section";
import aboutImage from "@/assets/images/about-1x1-image.webp";
import { cn } from "@/lib/utils";

export interface AboutSectionProps {
  className?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ className }) => {
  return (
    <section
      id="about"
      className={cn(
        "relative w-full min-h-screen flex flex-col justify-center py-20 md:py-28 bg-[#0a0a0a] text-[#e0e0e0] border-t border-[#2a2a2a]/40 overflow-hidden",
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
          eyebrow="ABOUT ME"
          title="Membangun Sistem Modern & Kecerdasan Artifisial"
          paragraph1="Saya seorang Full-Stack Engineer & AI Specialist yang berfokus pada pengembangan aplikasi web berkinerja tinggi, arsitektur sistem yang fleksibel, dan antarmuka pengguna yang intuitif."
          paragraph2="Dengan menggabungkan prinsip desain modern dan alur kerja berkecepatan tinggi berbasis AI, saya menciptakan solusi digital yang presisi, scalable, dan memberikan dampak nyata bagi penggunanya."
          imageUrl={aboutImage}
          statNumber="04+"
          statLabel="PENGALAMAN & MILESTONE"
          ctaText="HUBUNGI SAYA"
          ctaHref="#contact"
        />
      </div>
    </section>
  );
};

export default AboutSection;
