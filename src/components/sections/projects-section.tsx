"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import projectsData from "@/data/projects.json";
import { Project } from "@/lib/types";
import { CoverflowCarousel, CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export function ProjectsSection() {
  const projects = projectsData as Project[];
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const slides: CoverflowSlide[] = projects.map((p) => ({
    src: `/projects-thumbnail/${p.slug}.webp`,
    alt: p.title,
    title: p.title,
    subtitle: p.bidang,
  }));

  const activeProject = projects[selectedIndex] || projects[0];

  return (
    <section id="projects" className="relative w-full py-24 bg-black overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9ba480]">
          Selected Portfolio
        </span>
        <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-white">
          Featured Projects
        </h2>
      </div>

      {/* Full-width 3D Coverflow Carousel */}
      <div className="w-full">
        <CoverflowCarousel
          slides={slides}
          onSelectChange={setSelectedIndex}
          showPagination={true}
          showNavigation={true}
        />
      </div>

      {/* Active Project Details Panel */}
      <div className="max-w-3xl mx-auto px-6 mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.slug}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col items-center text-center space-y-6"
          >
            {/* Meta badges: Bidang & Year */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-xs font-mono uppercase rounded-full bg-[#9ba480]/10 border border-[#9ba480]/30 text-[#9ba480]">
                {activeProject.bidang}
              </span>
              <span className="text-xs font-mono text-zinc-500">
                {activeProject.year}
              </span>
            </div>

            {/* Project Title */}
            <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
              {activeProject.title}
            </h3>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl">
              {activeProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-mono rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
              {activeProject.description}
            </p>

            {/* Action Buttons / CTAs */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href={`/projects/${activeProject.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#9ba480] text-black font-semibold text-sm hover:bg-[#aab38d] transition-all transform active:scale-[0.98]"
              >
                View Project
                <ArrowUpRight className="size-4" />
              </a>

              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-300 font-medium text-sm hover:border-zinc-600 hover:text-white transition-all"
                >
                  Live URL
                  <ExternalLink className="size-3.5" />
                </a>
              )}

              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Repository"
                  className="p-2.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
                >
                  <FaGithub className="size-4" />
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
