"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { techStack } from "@/data/tech-stack";
import { SectionGhostTitle } from "@/components/ui/section-ghost-title";
import { OrbitRotation, type OrbitIcon } from "@/components/ui/orbit-rotation";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaAws,
  FaGit,
  FaGithub,
  FaBrain,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFastapi,
  SiVercel,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiPytorch,
  SiLangchain,
  SiHuggingface,
  SiAnthropic,
} from "react-icons/si";
import { HugeiconsIcon } from "@hugeicons/react";
import { CpuIcon } from "@hugeicons/core-free-icons";

const CpuCenterIcon = (props: { className?: string }) => (
  <HugeiconsIcon icon={CpuIcon} {...props} />
);

const orbitIcons: OrbitIcon[] = [
  { Icon: FaReact, name: "React" },
  { Icon: SiNextdotjs, name: "Next.js" },
  { Icon: SiTypescript, name: "TypeScript" },
  { Icon: SiTailwindcss, name: "Tailwind CSS" },
  { Icon: FaNodeJs, name: "Node.js" },
  { Icon: SiFastapi, name: "FastAPI" },
  { Icon: FaPython, name: "Python" },
  { Icon: SiPytorch, name: "PyTorch" },
  { Icon: SiLangchain, name: "LangChain" },
  { Icon: FaBrain, name: "OpenAI" },
  { Icon: SiAnthropic, name: "Claude" },
  { Icon: SiHuggingface, name: "Hugging Face" },
  { Icon: SiPostgresql, name: "PostgreSQL" },
  { Icon: SiMongodb, name: "MongoDB" },
  { Icon: SiRedis, name: "Redis" },
  { Icon: FaDocker, name: "Docker" },
  { Icon: FaAws, name: "AWS" },
  { Icon: SiVercel, name: "Vercel" },
  { Icon: FaGit, name: "Git" },
  { Icon: FaGithub, name: "GitHub" },
];

const chipClassName =
  "rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-xs text-secondary " +
  "transition-all duration-300 ease-in-out hover:-translate-y-[1px] hover:border-accent/70 " +
  "hover:text-foreground active:translate-y-0";

export interface TechStackSectionProps {
  className?: string;
}

export const TechStackSection: React.FC<TechStackSectionProps> = ({ className }) => {
  return (
    <section
      id="tech-stack"
      className={cn(
        "relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-background text-foreground border-t border-border/40 py-16 md:py-24",
        className
      )}
    >
      {/* Section Header Group: Title + Centered Accent Subtitle Overlapping */}
      <ScrollReveal
        direction="up"
        distance={35}
        amount={0.3}
        className="relative z-10 text-center max-w-6xl mx-auto px-4 mb-6 md:mb-8"
      >
        <SectionGhostTitle text="Tech Stack" />
        <p className="relative z-10 text-accent font-semibold text-base sm:text-xl md:text-2xl text-center max-w-2xl mx-auto -mt-7 sm:-mt-11 md:-mt-16 tracking-wide">
          The tools & technologies behind my work.
        </p>
      </ScrollReveal>

      {/* Main Content Div */}
      <div className="relative z-10 flex w-full items-center">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <StaggerContainer
            staggerChildren={0.15}
            amount={0.2}
            className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-center"
          >
            <StaggerItem direction="up" distance={30} className="lg:col-span-7">
              <article className="rounded-lg border border-border bg-card/40 p-6 md:p-8">
                <StaggerContainer
                  staggerChildren={0.08}
                  amount={0.2}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8"
                >
                  {techStack.map((group, index) => (
                    <StaggerItem
                      key={group.label}
                      direction="up"
                      distance={20}
                      className={
                        techStack.length % 2 !== 0 && index === techStack.length - 1
                          ? "sm:col-span-2"
                          : undefined
                      }
                    >
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                        {group.label}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {group.items.map((tech) => (
                          <span key={tech} className={chipClassName}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </article>
            </StaggerItem>

            <StaggerItem
              direction="left"
              distance={35}
              scale={0.92}
              className="hidden lg:col-span-5 lg:flex items-center justify-center"
            >
              <div className="origin-center scale-[0.72] xl:scale-100">
                <OrbitRotation
                  icons={orbitIcons}
                  orbitCount={3}
                  orbitGap={6}
                  centerIcon={{ Icon: CpuCenterIcon, name: "AI" }}
                  size="md"
                />
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
