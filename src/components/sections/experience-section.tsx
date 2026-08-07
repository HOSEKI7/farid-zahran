import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";
import { ExperienceCarousel } from "@/components/ui/experience-carousel";
import { Experience } from "@/lib/types";
import experiencesData from "@/data/experiences.json";

export function ExperienceSection() {
  const experiences: Experience[] = experiencesData;

  const timelineData = experiences.map((exp) => ({
    title: (
      <span>
        {exp.startYear} - {exp.endYear}
      </span>
    ),
    content: (
      <div className="mb-12">
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
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
              {exp.company}
            </h3>
            <p className="text-sm md:text-base font-medium text-neutral-400 leading-snug">
              {exp.title}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-6 text-xs md:text-sm font-mono uppercase tracking-widest text-neutral-400">
          <span className="flex items-center gap-1.5 border border-white/10 px-2.5 py-1 rounded-full bg-white/5">
            {exp.location}
          </span>
          <span className="flex items-center gap-1.5 border border-white/10 px-2.5 py-1 rounded-full bg-white/5">
            {exp.employmentType}
          </span>
        </div>

        <ul className="space-y-3 text-neutral-300 max-w-2xl text-base md:text-lg">
          {exp.description.map((desc, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-[#9ba480] mt-1.5 text-sm">&bull;</span>
              <span>{desc}</span>
            </li>
          ))}
        </ul>

        {exp.photos && exp.photos.length > 0 && (
          <ExperienceCarousel photos={exp.photos} company={exp.company} />
        )}
      </div>
    ),
  }));

  return (
    <section id="experience" className="w-full relative z-10 border-t border-border/30 bg-background py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 mb-8 md:mb-16">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">
          Experience
        </h2>
        <p className="text-neutral-400 max-w-xl text-lg">
          A timeline of my professional journey, highlighting key roles, engineering milestones, and contributions.
        </p>
      </div>
      
      <Timeline data={timelineData} />
    </section>
  );
}
