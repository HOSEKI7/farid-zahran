export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      >
        <h1 className="text-[clamp(2.5rem,8vw,8rem)] font-bold leading-[0.9] tracking-[-0.04em]">
          FARID ZAHRAN
        </h1>
        <p className="mt-4 text-muted text-lg sm:text-xl max-w-xl">
          Full-stack Developer & AI Engineer building modern web experiences.
        </p>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-card/20 border-t border-border/30"
      >
        <h2 className="text-4xl font-bold tracking-tight mb-4">About Me</h2>
        <p className="text-muted max-w-2xl text-lg">
          Crafting clean code, scalable architecture, and intelligent systems.
        </p>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 border-t border-border/30"
      >
        <h2 className="text-4xl font-bold tracking-tight mb-4">Projects</h2>
        <p className="text-muted max-w-2xl text-lg">
          Featured works and open-source software applications.
        </p>
      </section>

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
