import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import projectsData from "@/data/projects.json";
import nextlevelAcademy from "@/data/project-details/nextlevel-academy.json";
import hosekiShops from "@/data/project-details/hoseki-shops.json";
import predictiveMaintenance from "@/data/project-details/predictive-maintenance.json";
import contexure from "@/data/project-details/contexure.json";
import type { Project, ProjectDetail } from "@/lib/types";
import { ProjectHero } from "@/components/project-blocks/project-hero";
import { BlockRenderer } from "@/components/project-blocks/block-renderer";
import { SectionGhostTitle } from "@/components/ui/section-ghost-title";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

const projects = projectsData as Project[];

/**
 * Import statis, bukan baca filesystem: `output: 'export'` tidak punya runtime,
 * dan import membuat JSON ikut type-checked saat build.
 */
const projectDetails: ProjectDetail[] = [
  nextlevelAcademy,
  hosekiShops,
  predictiveMaintenance,
  contexure,
] as ProjectDetail[];

function getProject(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  const detail = projectDetails.find((d) => d.slug === slug);
  if (!project || !detail) return null;
  return { project, detail };
}

/** Wajib di bawah `output: 'export'` — tanpa ini route dinamis gagal build. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = getProject(slug);

  if (!found) {
    return { title: "Project not found — Farid Zahran" };
  }

  const title = `${found.project.title} — Farid Zahran`;
  const description = found.detail.tagline;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: found.detail.thumbnail.src }],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const found = getProject(slug);

  // Slug baru di projects.json tanpa file detail harus gagal terang-terangan.
  if (!found) notFound();

  const { project, detail } = found;
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="relative w-full overflow-hidden bg-background text-foreground">
      <ProjectHero
        title={project.title}
        tagline={detail.tagline}
        role={detail.role}
        timeline={detail.timeline}
        tags={project.tags}
        liveUrl={project.liveUrl}
        githubUrl={project.githubUrl}
        image={detail.thumbnail}
      />

      <div className="py-20 md:py-28">
        <BlockRenderer blocks={detail.blocks} />
      </div>

      <section className="relative w-full border-t border-border/40 py-16 md:py-24">
        <ScrollReveal
          direction="up"
          distance={35}
          amount={0.3}
          className="relative z-10 mx-auto max-w-6xl px-4 text-center"
        >
          <SectionGhostTitle text="Next" />
          <p className="relative z-10 -mt-7 text-base font-semibold tracking-wide text-accent sm:-mt-11 sm:text-xl md:-mt-16 md:text-2xl">
            Keep exploring the work.
          </p>
        </ScrollReveal>

        <div className="relative z-10 mx-auto mt-10 flex max-w-6xl flex-col items-center gap-5 px-6 md:mt-12">
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group inline-flex items-center gap-3 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background transition-all hover:bg-accent-hover active:scale-[0.98]"
          >
            {nextProject.title}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0" />
          </Link>

          <Link
            href="/#projects"
            className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-foreground"
          >
            Back to all projects
          </Link>
        </div>
      </section>
    </main>
  );
}
