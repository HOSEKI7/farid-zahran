"use client";

import React from "react";
import { ParallaxScrollFeatureSection } from "@/components/ui/parallax-scroll-feature-section";
import { SectionGhostTitle } from "@/components/ui/section-ghost-title";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
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
        "relative w-full min-h-screen flex flex-col justify-center py-16 md:py-24 bg-background text-foreground border-t border-border/40 overflow-hidden",
        className,
      )}
    >
      {/* Section Header Group: Title + Centered Accent Subtitle Overlapping */}
      <ScrollReveal
        direction="up"
        distance={35}
        amount={0.3}
        className="relative z-10 text-center max-w-6xl mx-auto px-4 mb-6 md:mb-8"
      >
        <SectionGhostTitle text="About" />
        <p className="relative z-10 text-accent font-semibold text-base sm:text-xl md:text-2xl text-center max-w-2xl mx-auto -mt-7 sm:-mt-11 md:-mt-16 tracking-wide">
          Crafting fast web apps & smart AI systems.
        </p>
      </ScrollReveal>

      {/* Main Content Div */}
      <div className="relative z-10">
        <ParallaxScrollFeatureSection
          eyebrow=""
          title=""
          paragraph1="I am a Computer Science student and software engineer transitioning into AI/ML engineering, with hands-on experience building and deploying production-grade web applications end-to-end."
          paragraph2="Focus on developing high-performance web applications, scalable system architectures, and intelligent solutions. By combining modern design principles and high-speed AI-driven workflows, I create digital solutions that are precise, scalable, and deliver real impact."
          paragraph3="Actively building applied ML/AI projects to strengthen practical knowledge and experience in the field, combining strong software engineering fundamentals with practical machine learning implementation to ship reliable, deployable AI products."
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
