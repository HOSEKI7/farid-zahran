"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.webp";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ComputerTerminal01Icon,
  QuillWrite01Icon,
  CpuIcon,
  BlocksIcon,
  Briefcase08Icon,
  Mail02Icon,
} from "@hugeicons/core-free-icons";
import { LimelightNav, NavItem } from "@/components/ui/limelight-nav";

const GithubSocialIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinSocialIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const atTop = currentScrollY <= 15;

      // Always show navbar immediately when scrolling occurs
      setIsVisible(true);

      // Clear any existing inactivity timer
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }

      // If not scrolled to top, start 2s timer to fade out on scroll inactivity
      if (!atTop) {
        hideTimerRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 2000);
      }
    };

    // Initial check on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  const navItems: NavItem[] = [
    {
      id: "hero",
      label: "Hero",
      icon: <HugeiconsIcon icon={ComputerTerminal01Icon} />,
      onClick: () => {
        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "about",
      label: "About",
      icon: <HugeiconsIcon icon={QuillWrite01Icon} />,
      onClick: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "tech-stack",
      label: "Tech Stack",
      icon: <HugeiconsIcon icon={CpuIcon} />,
      onClick: () => {
        document.getElementById("tech-stack")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "projects",
      label: "Projects",
      icon: <HugeiconsIcon icon={BlocksIcon} />,
      onClick: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "experience",
      label: "Experience",
      icon: <HugeiconsIcon icon={Briefcase08Icon} />,
      onClick: () => {
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "contact",
      label: "Contact",
      icon: <HugeiconsIcon icon={Mail02Icon} />,
      onClick: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      },
    },
  ];

  return (
    <>
      {/* Top Header Bar (Desktop & Mobile) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-transparent transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-full px-4 sm:px-10 py-4 sm:py-5 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <div className="flex items-center">
            <a
              href="#hero"
              className="flex items-center group hover:opacity-80 transition-opacity"
              aria-label="Farid Zahran"
            >
              <Image
                src={logo}
                alt="Farid Zahran Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
                priority
                unoptimized
              />
            </a>
          </div>

          {/* Center: Navigation Menu (Desktop Only) */}
          <div className="hidden md:flex items-center justify-center">
            <LimelightNav items={navItems} />
          </div>

          {/* Right: Social Link Icons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border/50 bg-card/60 backdrop-blur-md flex items-center justify-center text-foreground/70 hover:text-foreground hover:border-foreground/30 hover:scale-105 transition-all"
            >
              <GithubSocialIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-10 h-10 rounded-full border border-border/50 bg-card/60 backdrop-blur-md flex items-center justify-center text-foreground/70 hover:text-foreground hover:border-foreground/30 hover:scale-105 transition-all"
            >
              <LinkedinSocialIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Bottom Floating Limelight Dock (Mobile Only) */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden transition-all duration-300 ease-in-out ${
          isVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-card/80 backdrop-blur-xl border border-border/60 rounded-full shadow-2xl px-2 py-1 flex items-center">
          <LimelightNav items={navItems} iconContainerClassName="p-3.5" />
        </div>
      </div>
    </>
  );
};
