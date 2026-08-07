import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";
import { ExperienceCarousel } from "@/components/ui/experience-carousel";
import { SectionGhostTitle } from "@/components/ui/section-ghost-title";
import { Experience } from "@/lib/types";
import experiencesData from "@/data/experiences.json";
import { Globe, ArrowUpRight } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

export function ExperienceSection() {
  const experiences: Experience[] = experiencesData;

  const timelineData = experiences.map((exp) => ({
    id: exp.id,
    title: `${exp.startYear} - ${exp.endYear}`,
    content: (
      <div key={exp.id} className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          {exp.companyLogo && (
            <div className="relative shrink-0 h-12 w-12 md:h-14 md:w-14">
              <Image
                src={`/company-logo/${exp.companyLogo}`}
                alt={`${exp.company} logo`}
                width={56}
                height={56}
                className="h-full w-full object-contain"
              />
            </div>
          )}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-snug">
              {exp.company}
            </h3>
            <p className="text-sm md:text-base font-medium text-secondary leading-snug">
              {exp.title}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6 text-xs md:text-sm font-mono uppercase tracking-widest text-secondary">
          <span className="flex items-center gap-1.5 border border-white/10 px-2.5 py-1 rounded-full bg-white/5">
            {exp.location}
          </span>
          <span className="flex items-center gap-1.5 border border-white/10 px-2.5 py-1 rounded-full bg-white/5">
            {exp.employmentType}
          </span>
        </div>

        <ul className="space-y-3 text-secondary max-w-2xl text-base md:text-lg">
          {exp.description.map((desc, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-accent mt-1.5 text-sm">&bull;</span>
              <span>{desc}</span>
            </li>
          ))}
        </ul>

        {exp.photos && exp.photos.length > 0 && (
          <ExperienceCarousel photos={exp.photos} company={exp.company} />
        )}

        {(exp.company_website || exp.company_linkedin) && (
          <div className="mt-6 flex flex-wrap gap-3 items-center">
            {exp.company_website && (
              <a
                href={exp.company_website}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-secondary hover:text-foreground bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-accent" />
                <span>Visit Website</span>
                <ArrowUpRight className="w-3 h-3 text-muted group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}
            {exp.company_linkedin && (
              <a
                href={exp.company_linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-secondary hover:text-foreground bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 transition-all"
              >
                <FaLinkedin className="w-3.5 h-3.5 text-accent" />
                <span>Company LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-muted group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </div>
        )}
      </div>
    ),
  }));

  return (
    <section id="experience" className="relative w-full min-h-screen flex flex-col justify-center py-20 md:py-24 bg-background text-foreground border-t border-border/40 overflow-hidden">
      {/* Decorative Background Ghost Title */}
      <SectionGhostTitle text="Experience" />
      {/* Halide Grain Noise SVG Background */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <filter id="experience-grain">
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
        style={{ filter: "url(#experience-grain)" }}
      />

      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 mb-8 md:mb-16">
          <p className="text-secondary max-w-xl text-lg">
            A timeline of my professional journey, highlighting key roles, engineering milestones, and contributions.
          </p>
        </div>
        
        <Timeline data={timelineData} />
      </div>
    </section>
  );
}
