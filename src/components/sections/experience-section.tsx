import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";
import { ExperienceCarousel } from "@/components/ui/experience-carousel";
import { SectionGhostTitle } from "@/components/ui/section-ghost-title";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
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
      <ScrollReveal key={exp.id} direction="up" distance={25} amount={0.15} className="mb-12">
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
      </ScrollReveal>
    ),
  }));

  return (
    <section id="experience" className="relative w-full min-h-screen flex flex-col justify-center py-20 md:py-24 bg-background text-foreground border-t border-border/40 overflow-hidden">
      {/* Section Header Group: Title + Centered Accent Subtitle Overlapping */}
      <ScrollReveal
        direction="up"
        distance={35}
        amount={0.3}
        className="relative z-10 text-center max-w-6xl mx-auto px-4 mb-8 md:mb-12"
      >
        <SectionGhostTitle text="Experience" />
        <p className="relative z-10 text-accent font-semibold text-base sm:text-xl md:text-2xl text-center max-w-2xl mx-auto -mt-7 sm:-mt-11 md:-mt-16 tracking-wide">
          Where I&apos;ve worked & key milestones.
        </p>
      </ScrollReveal>

      {/* Main Content Div */}
      <div className="relative z-10 w-full">
        <Timeline data={timelineData} />
      </div>
    </section>
  );
}
