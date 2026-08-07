"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { techStack } from "@/data/tech-stack";
import { SectionGhostTitle } from "@/components/ui/section-ghost-title";
import { OrbitRotation, type OrbitIcon } from "@/components/ui/orbit-rotation";
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
} from "react-icons/si";
import { HugeiconsIcon } from "@hugeicons/react";
import { CpuIcon } from "@hugeicons/core-free-icons";

const EASE_SPRING = [0.16, 1, 0.3, 1] as const;

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

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SPRING },
  },
};

const chipClassName =
  "rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-xs text-secondary " +
  "transition-all duration-300 ease-in-out hover:-translate-y-[1px] hover:border-accent/70 " +
  "hover:text-foreground active:translate-y-0";

export interface TechStackSectionProps {
  className?: string;
}

export const TechStackSection: React.FC<TechStackSectionProps> = ({ className }) => {
  const reduce = useReducedMotion();

  return (
    <section
      id="tech-stack"
      className={cn(
        "relative w-full min-h-screen overflow-hidden bg-background text-foreground border-t border-border/40",
        className
      )}
    >
      {/* Decorative Background Ghost Title */}
      <SectionGhostTitle text="Tech Stack" />
      {/* Halide Grain Noise SVG Background */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <filter id="tech-stack-grain">
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
        style={{ filter: "url(#tech-stack-grain)" }}
      />

      <div className="relative z-10 flex min-h-screen w-full items-center">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 py-20">
          <motion.div
            variants={containerVariants}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-16 lg:grid-cols-12 lg:gap-4"
          >
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <p className="text-muted max-w-md text-base md:text-lg leading-relaxed">
                Technologies I use to design, build, and deploy full-stack platforms
                and AI systems.
              </p>

              <article className="mt-14 rounded-lg border border-border bg-card/40 p-6 md:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                  {techStack.map((group, index) => (
                    <div
                      key={group.label}
                      className={
                        index === techStack.length - 1 ? "sm:col-span-2" : undefined
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
                    </div>
                  ))}
                </div>
              </article>
            </motion.div>

            <motion.div
              variants={itemVariants}
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
