"use client";

import React from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.webp";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Mail, ArrowUp } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full border-t border-border/40 bg-background text-foreground py-6 md:py-8 relative z-10">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <StaggerContainer
          staggerChildren={0.1}
          amount={0.2}
          className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4"
        >
          {/* Left Column: Logo, Brand Name & Availability Status */}
          <StaggerItem direction="up" distance={20} className="flex items-center gap-3.5">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="flex items-center gap-3 group"
              aria-label="Farid Zahran Home"
            >
              <Image
                src={logo}
                alt="Farid Zahran Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain group-hover:scale-105 transition-transform"
                unoptimized
              />
              <span className="font-bold text-base tracking-tight text-foreground group-hover:text-accent transition-colors">
                Farid Zahran
              </span>
            </a>

            <span className="hidden sm:inline-block text-border/60">|</span>

            {/* Live Availability Status Indicator */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-card/60 border border-border/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="font-mono text-[11px] text-muted tracking-wide">
                Available for work
              </span>
            </div>
          </StaggerItem>

          {/* Center Column: Copyright Notice */}
          <StaggerItem direction="up" distance={20} className="text-center">
            <p className="font-mono text-xs text-muted">
              © {currentYear}{" "}
              <span className="text-secondary font-medium">Farid Zahran</span>. All rights reserved.
            </p>
          </StaggerItem>

          {/* Right Column: Social Media Icons & Back to Top */}
          <StaggerItem direction="up" distance={20} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/faridzahran"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-8 h-8 rounded-lg border border-border/50 bg-card/50 flex items-center justify-center text-muted hover:text-foreground hover:border-accent/40 hover:bg-accent/10 transition-all group"
              >
                <FaGithub className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="https://linkedin.com/in/faridzahran"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-8 h-8 rounded-lg border border-border/50 bg-card/50 flex items-center justify-center text-muted hover:text-foreground hover:border-accent/40 hover:bg-accent/10 transition-all group"
              >
                <FaLinkedin className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="https://x.com/faridzahran"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter) Profile"
                className="w-8 h-8 rounded-lg border border-border/50 bg-card/50 flex items-center justify-center text-muted hover:text-foreground hover:border-accent/40 hover:bg-accent/10 transition-all group"
              >
                <FaXTwitter className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="mailto:contact@faridzahran.com"
                aria-label="Send Email"
                className="w-8 h-8 rounded-lg border border-border/50 bg-card/50 flex items-center justify-center text-muted hover:text-foreground hover:border-accent/40 hover:bg-accent/10 transition-all group"
              >
                <Mail className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </a>
            </div>

            <div className="h-4 w-[1px] bg-border/40 mx-0.5" />

            {/* Back To Top Scroll Button */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              title="Back to top"
              className="w-8 h-8 rounded-lg border border-border/50 bg-card/50 flex items-center justify-center text-muted hover:text-accent hover:border-accent/50 hover:bg-accent/10 transition-all group cursor-pointer"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </StaggerItem>

        </StaggerContainer>
      </div>
    </footer>
  );
}
