"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import projectsData from "@/data/projects.json";
import { Project } from "@/lib/types";
import { CoverflowCarousel, CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { SectionGhostTitle } from "@/components/ui/section-ghost-title";
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
    <section
      id="projects"
      className="relative w-full min-h-screen flex flex-col justify-center py-20 md:py-24 bg-background text-foreground border-t border-border/40 overflow-hidden"
    >
      {/* Section Header Group: Title + Centered Accent Subtitle Overlapping */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 mb-8 md:mb-12">
        <SectionGhostTitle text="Projects" />
        <p className="relative z-10 text-accent font-semibold text-base sm:text-xl md:text-2xl text-center max-w-2xl mx-auto -mt-10 sm:-mt-14 md:-mt-20 tracking-wide">
          Featured full-stack & AI projects.
        </p>
      </div>

      {/* Main Content Div */}
      <div className="relative z-10 w-full flex flex-col justify-center">

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
        <div className="max-w-3xl mx-auto px-6 mt-8 md:mt-10">
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
              <span className="px-3 py-1 text-xs font-mono uppercase rounded-full bg-accent/10 border border-accent/30 text-accent">
                {activeProject.bidang}
              </span>
              <span className="text-xs font-mono text-muted">
                {activeProject.year}
              </span>
            </div>

            {/* Project Title */}
            <h3 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
              {activeProject.title}
            </h3>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl">
              {activeProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-mono rounded-md bg-card border border-border text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-secondary text-sm md:text-base max-w-2xl leading-relaxed">
              {activeProject.description}
            </p>

            {/* Action Buttons / CTAs */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href={`/projects/${activeProject.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-accent-hover transition-all transform active:scale-[0.98]"
              >
                View Project
                <ArrowUpRight className="size-4" />
              </a>

              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card/60 text-secondary font-medium text-sm hover:border-border/80 hover:text-foreground transition-all"
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
                  className="p-2.5 rounded-lg border border-border bg-card/60 text-muted hover:text-foreground hover:border-border/80 transition-all"
                >
                  <FaGithub className="size-4" />
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      </div>
    </section>
  );
}
