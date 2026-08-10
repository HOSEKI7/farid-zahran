'use client'

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { StaticImageData } from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ComputerTerminal01Icon,
  CpuIcon,
  Layers01Icon,
  ArrowRight01Icon
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";

export interface FeatureItem {
  icon: typeof ComputerTerminal01Icon;
  title: string;
  description: string;
}

export interface ParallaxScrollFeatureSectionProps {
  eyebrow?: string;
  title?: string;
  paragraph1?: string;
  paragraph2?: string;
  imageUrl?: string | StaticImageData;
  statNumber?: string;
  statLabel?: string;
  features?: FeatureItem[];
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export const ParallaxScrollFeatureSection = ({
  eyebrow = "ABOUT ME",
  title = "Membangun Sistem Modern & Kecerdasan Artifisial",
  paragraph1 = "Saya seorang Full-Stack Engineer & AI Specialist yang berfokus pada pengembangan aplikasi web berkinerja tinggi, arsitektur sistem yang fleksibel, dan antarmuka pengguna yang intuitif.",
  paragraph2 = "Dengan menggabungkan prinsip desain modern dan alur kerja berkecepatan tinggi berbasis AI, saya menciptakan solusi digital yang presisi, scalable, dan memberikan dampak nyata bagi penggunanya.",
  imageUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
  statNumber = "04+",
  statLabel = "PENGALAMAN & MILESTONE",
  features = [
    {
      icon: ComputerTerminal01Icon,
      title: "Full-Stack Dev",
      description: "Arsitektur Next.js, Node.js & sistem scalable.",
    },
    {
      icon: CpuIcon,
      title: "AI Engineering",
      description: "Integrasi LLM, AI Agent, & alur otomatisasi.",
    },
    {
      icon: Layers01Icon,
      title: "Motion & UI",
      description: "Interaksi presisi dengan GSAP & Framer Motion.",
    },
  ],
  ctaText = "HUBUNGI SAYA",
  ctaHref = "#contact",
  className,
}: ParallaxScrollFeatureSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: isMobile
      ? ["start 95%", "center 85%"]
      : ["start 85%", "center 68%"],
  });

  const opacityContent = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const clipProgress = useTransform(scrollYProgress, [0, 1], [
    "inset(0 100% 0 0)",
    "inset(0 0% 0 0)",
  ]);
  const translateContent = useTransform(scrollYProgress, [0, 1], [-40, 0]);

  const resolvedSrc = typeof imageUrl === "string" ? imageUrl : imageUrl?.src;

  return (
    <div className={cn("max-w-7xl mx-auto px-6 md:px-12 w-full", className)}>
      <div
        ref={sectionRef}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
      >
        {/* Left Column: Enlarged Profile Image with Parallax & Badge Overlay */}
        <motion.div
          style={{
            opacity: opacityContent,
            clipPath: clipProgress,
            y: translateContent,
          }}
          className="lg:col-span-5 relative w-full"
        >
          <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-border bg-card shadow-2xl">
            <img
              src={resolvedSrc}
              className="w-full h-full object-cover"
              alt={title}
            />
          </div>

          {/* Floating Badge Overlay */}
          <div className="absolute -bottom-6 -right-4 md:-right-6 bg-card/95 backdrop-blur-md border border-border p-4 md:p-5 rounded-xl shadow-2xl flex flex-col items-center z-20 min-w-[150px]">
            <span className="text-3xl md:text-4xl font-extrabold text-accent font-mono tracking-tight">
              {statNumber}
            </span>
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-muted mt-1 text-center font-semibold">
              {statLabel}
            </span>
          </div>
        </motion.div>

        {/* Right Column: Text Content, Eyebrow, Split Paragraphs, Feature Row & CTA */}
        <div className="lg:col-span-7 flex flex-col justify-start">
          {/* Eyebrow Label */}
          {eyebrow && (
            <div className="flex items-center gap-2.5 font-mono text-xs font-semibold text-accent tracking-widest uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>{"// "}{eyebrow}</span>
            </div>
          )}

          {/* Heading */}
          {title && (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight mb-6">
              {title}
            </h2>
          )}

          {/* Split Paragraphs */}
          <ScrollReveal direction="up" distance={20} duration={0.6} amount={0.3}>
            <div className="space-y-4 text-secondary leading-relaxed font-sans text-base md:text-lg">
              <p>{paragraph1}</p>
              <p className="text-secondary text-sm md:text-base">{paragraph2}</p>
            </div>
          </ScrollReveal>

          {/* Horizontal Divider */}
          <div className="w-full h-px bg-border/80 my-8 md:my-10" />

          {/* Feature Row (3 Columns) */}
          <StaggerContainer
            staggerChildren={0.12}
            amount={0.25}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
          >
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <StaggerItem
                  key={idx}
                  direction="up"
                  distance={25}
                  duration={0.5}
                  className="flex flex-col p-4 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm hover:border-accent/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center text-accent mb-3 shadow-inner">
                    <HugeiconsIcon icon={IconComponent} className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-foreground text-sm tracking-wide mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* CTA Button */}
          <ScrollReveal direction="up" distance={20} delay={0.15} amount={0.3}>
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-border hover:border-accent hover:text-accent hover:bg-accent/10 rounded-xl text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 group"
            >
              <span>{ctaText}</span>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
              />
            </a>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export const Component = ParallaxScrollFeatureSection;
