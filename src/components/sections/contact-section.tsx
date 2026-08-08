"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Mail, Phone, MapPin, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { SectionGhostTitle } from "@/components/ui/section-ghost-title";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-20 md:py-28 bg-background text-foreground border-t border-border/40 overflow-hidden"
    >
      {/* Section Header Group: Title + Centered Accent Subtitle Overlapping */}
      <ScrollReveal
        direction="up"
        distance={35}
        amount={0.3}
        className="relative z-10 text-center max-w-6xl mx-auto px-4 mb-12 md:mb-16"
      >
        <SectionGhostTitle text="Contact" />
        <p className="relative z-10 text-accent font-semibold text-base sm:text-xl md:text-2xl text-center max-w-2xl mx-auto -mt-7 sm:-mt-11 md:-mt-16 tracking-wide">
          Got an idea? Let&apos;s build something awesome.
        </p>
      </ScrollReveal>

      {/* Main Content Div */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        {/* TOP SECTION: Two-column layout (Left ~40%, Right ~60%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16 md:mb-24">
          {/* Left Column (col-span-5 / ~40%) */}
          <ScrollReveal
            direction="right"
            distance={30}
            amount={0.2}
            className="lg:col-span-5 flex flex-col space-y-6 md:space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground flex items-center gap-3">
              Let&apos;s Talk
              <ArrowUpRight className="w-7 h-7 md:w-8 md:h-8 text-accent shrink-0" />
            </h2>

            <p className="text-secondary text-base md:text-lg leading-relaxed max-w-lg">
              Have a project in mind, looking for potential collaboration, or want to discuss engineering ideas? Send a message and let&apos;s create something exceptional together.
            </p>

            {/* Vertical checklist of 3 short benefit items */}
            <StaggerContainer staggerChildren={0.1} amount={0.2} className="space-y-4 pt-2">
              <StaggerItem direction="up" distance={15} className="flex items-center gap-3.5">
                <div className="w-7 h-7 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-foreground text-sm md:text-base font-medium">
                  Fast Turnaround & Clear Updates
                </span>
              </StaggerItem>

              <StaggerItem direction="up" distance={15} className="flex items-center gap-3.5">
                <div className="w-7 h-7 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-foreground text-sm md:text-base font-medium">
                  End-to-End Full-Stack & AI Solutions
                </span>
              </StaggerItem>

              <StaggerItem direction="up" distance={15} className="flex items-center gap-3.5">
                <div className="w-7 h-7 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-foreground text-sm md:text-base font-medium">
                  Clean Architecture & High Performance
                </span>
              </StaggerItem>
            </StaggerContainer>

            {/* Row of 3 circular social media icon buttons */}
            <div className="pt-4 flex items-center gap-3">
              <a
                href="https://github.com/faridzahran"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/50 text-secondary hover:text-foreground transition-all flex items-center justify-center group"
              >
                <FaGithub className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://linkedin.com/in/faridzahran"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/50 text-secondary hover:text-foreground transition-all flex items-center justify-center group"
              >
                <FaLinkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://x.com/faridzahran"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter) Profile"
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/50 text-secondary hover:text-foreground transition-all flex items-center justify-center group"
              >
                <FaXTwitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </ScrollReveal>

          {/* Right Column (col-span-7 / ~60%) */}
          <ScrollReveal
            direction="left"
            distance={30}
            amount={0.2}
            className="lg:col-span-7"
          >
            <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl bg-card border border-border/60 shadow-2xl overflow-hidden">
              {/* Ambient accent glow inside card */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 relative z-10">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                {/* Row 1: Side-by-side Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-muted">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-background/80 border border-border/80 focus:border-accent focus:ring-1 focus:ring-accent outline-none text-foreground placeholder:text-muted/50 transition-all font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-muted">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-background/80 border border-border/80 focus:border-accent focus:ring-1 focus:ring-accent outline-none text-foreground placeholder:text-muted/50 transition-all font-mono text-sm"
                    />
                  </div>
                </div>

                {/* Row 2: Full-width Message textarea */}
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-muted">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Tell me about your project or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-background/80 border border-border/80 focus:border-accent focus:ring-1 focus:ring-accent outline-none text-foreground placeholder:text-muted/50 transition-all font-mono text-sm resize-none"
                  />
                </div>

                {/* Row 3: Full-width Submit button */}
                <div>
                  <button
                    type="submit"
                    disabled={submitted}
                    className="w-full py-4 px-6 rounded-xl bg-accent text-background font-bold text-base hover:bg-accent-hover active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-accent/10 disabled:opacity-75"
                  >
                    {submitted ? (
                      <span className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-background" />
                        Message Sent!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>Send Message</span>
                        <Send className="w-4 h-4 text-background group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>

        {/* BOTTOM SECTION: Horizontal Row of 3 Info Cards with Divider Lines */}
        <div className="pt-8 md:pt-12 border-t border-border/40">
          <StaggerContainer
            staggerChildren={0.12}
            amount={0.2}
            className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/40"
          >
            {/* Card 1: Email */}
            <StaggerItem
              direction="up"
              distance={20}
              className="p-6 md:p-8 flex items-center gap-4 group hover:bg-white/[0.02] transition-colors rounded-xl md:rounded-none"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 text-accent flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1 overflow-hidden">
                <p className="text-xs font-mono uppercase tracking-wider text-muted">
                  Email Contact
                </p>
                <a
                  href="mailto:contact@faridzahran.com"
                  className="block text-foreground font-bold text-base hover:text-accent transition-colors truncate"
                >
                  contact@faridzahran.com
                </a>
              </div>
            </StaggerItem>

            {/* Card 2: Phone */}
            <StaggerItem
              direction="up"
              distance={20}
              className="p-6 md:p-8 flex items-center gap-4 group hover:bg-white/[0.02] transition-colors rounded-xl md:rounded-none"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 text-accent flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-mono uppercase tracking-wider text-muted">
                  Phone Contact
                </p>
                <p className="text-foreground font-bold text-base">
                  Available on request
                </p>
              </div>
            </StaggerItem>

            {/* Card 3: Location */}
            <StaggerItem
              direction="up"
              distance={20}
              className="p-6 md:p-8 flex items-center gap-4 group hover:bg-white/[0.02] transition-colors rounded-xl md:rounded-none"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 text-accent flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-mono uppercase tracking-wider text-muted">
                  Physical Location
                </p>
                <p className="text-foreground font-bold text-base">
                  Jakarta, Indonesia (UTC+7)
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
