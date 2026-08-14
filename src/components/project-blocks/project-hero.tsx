import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import type { GalleryImage } from "@/lib/types";

export interface ProjectHeroProps {
  title: string;
  tagline: string;
  role: string;
  timeline: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: GalleryImage;
}

const MetaItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div>
    <dt className="font-mono text-xs uppercase tracking-wider text-muted">
      {label}
    </dt>
    <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
  </div>
);

/**
 * Split asimetris: teks kiri (7 kolom), gambar kanan (5 kolom), runtuh ke satu
 * kolom di bawah md. Sengaja tanpa SectionGhostTitle — pola itu identitas
 * homepage, dan di halaman detail dipakai maksimal sekali di penutup.
 */
export const ProjectHero: React.FC<ProjectHeroProps> = ({
  title,
  tagline,
  role,
  timeline,
  tags,
  liveUrl,
  githubUrl,
  image,
}) => {
  return (
    <header className="mx-auto w-full max-w-[1400px] px-6 pb-4 pt-28 md:px-10 md:pt-36">
      <ScrollReveal direction="up" distance={20} amount={0.1} once>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          All projects
        </Link>
      </ScrollReveal>

      <div className="mt-8 grid grid-cols-1 items-start gap-10 md:mt-10 md:grid-cols-12 md:gap-12">
        <ScrollReveal
          direction="up"
          distance={30}
          amount={0.1}
          once
          className="md:col-span-7"
        >
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tighter text-foreground md:text-6xl">
            {title}
          </h1>

          <p className="mt-5 max-w-[45ch] text-lg leading-relaxed text-secondary md:text-xl">
            {tagline}
          </p>

          <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-6">
            <MetaItem label="Role" value={role} />
            <MetaItem label="Timeline" value={timeline} />
          </dl>

          {tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-card px-2.5 py-1 font-mono text-xs text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {(liveUrl || githubUrl) && (
            <div className="mt-9 flex flex-wrap items-center gap-4">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-all hover:bg-accent-hover active:scale-[0.98]"
                >
                  Live site
                  <ExternalLink className="size-3.5" />
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-4 py-2.5 text-sm font-medium text-secondary transition-all hover:border-border/80 hover:text-foreground"
                >
                  <FaGithub className="size-4" />
                  Source
                </a>
              )}
            </div>
          )}
        </ScrollReveal>

        <ScrollReveal
          direction="up"
          distance={30}
          delay={0.1}
          amount={0.1}
          once
          className="md:col-span-5"
        >
          <div className="relative overflow-hidden rounded-xl border border-border bg-card">
            <Image
              src={`/project-details${image.src}`}
              alt={image.alt}
              width={1200}
              height={900}
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="h-auto w-full"
            />
          </div>
        </ScrollReveal>
      </div>
    </header>
  );
};

export default ProjectHero;
