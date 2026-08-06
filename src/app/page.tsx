import { HalideTopoHero } from "@/components/ui/halide-topo-hero";
import { AboutSection } from "@/components/sections/about-section";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import heroImage from "@/assets/images/hero-image.webp";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section id="hero">
        <HalideTopoHero
          layers={[heroImage]}
          jobTitles={["FULL-STACK DEVELOPER", "AI ENGINEER"]}
        />
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Tech Stack Section */}
      <TechStackSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Experience Section */}
      <section
        id="experience"
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-card/20 border-t border-border/30"
      >
        <h2 className="text-4xl font-bold tracking-tight mb-4">Experience</h2>
        <p className="text-muted max-w-2xl text-lg">
          Professional career trajectory, engineering milestones, and roles.
        </p>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 border-t border-border/30"
      >
        <h2 className="text-4xl font-bold tracking-tight mb-4">Contact</h2>
        <p className="text-muted max-w-2xl text-lg mb-6">
          Interested in working together or discussing potential projects?
        </p>
        <a
          href="mailto:contact@faridzahran.com"
          className="px-6 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-hover transition-colors"
        >
          Get In Touch
        </a>
      </section>
    </main>
  );
}

