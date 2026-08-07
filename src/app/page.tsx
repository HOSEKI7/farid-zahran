import { HalideTopoHero } from "@/components/ui/halide-topo-hero";
import { AboutSection } from "@/components/sections/about-section";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ContactSection } from "@/components/sections/contact-section";
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
      <ExperienceSection />

      {/* Contact Section */}
      <ContactSection />
    </main>
  );
}

