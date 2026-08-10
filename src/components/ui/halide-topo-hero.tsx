"use client";

import React, { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { JobTitleScramble } from "@/components/ui/job-title-scramble";

export interface HalideTopoHeroProps {
  className?: string;
  name?: string;
  role?: string;
  jobTitles?: string[];
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  layers?: (string | StaticImageData)[];
}

export const HalideTopoHero: React.FC<HalideTopoHeroProps> = ({
  className,
  name = "FARID\nZAHRAN",
  role = "FULL-STACK DEVELOPER & AI ENGINEER",
  jobTitles = ["FULL-STACK DEVELOPER", "AI ENGINEER"],
  ctaText = "EXPLORE DEPTH",
  ctaHref = "#about",
  onCtaClick,
  layers = [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1200",
  ],
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);

  const resolveSrc = (layerItem?: string | StaticImageData): string => {
    if (!layerItem) return "";
    return typeof layerItem === "string" ? layerItem : layerItem.src;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Mouse Parallax Logic
    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 25;
      const y = (window.innerHeight / 2 - e.pageY) / 25;

      // Rotate the 3D Canvas
      canvas.style.transform = `rotateX(${55 + y / 2}deg) rotateZ(${-25 + x / 2}deg)`;

      // Apply depth shift to layers
      layersRef.current.forEach((layer, index) => {
        if (!layer) return;
        const depth = (index + 1) * 15;
        const moveX = x * (index + 1) * 0.2;
        const moveY = y * (index + 1) * 0.2;
        layer.style.transform = `translateZ(${depth}px) translate(${moveX}px, ${moveY}px)`;
      });
    };

    // Entrance Animation
    // Initial states are now set via inline styles to prevent FOUC

    const timeout = setTimeout(() => {
      canvas.style.transition = "all 2.5s cubic-bezier(0.16, 1, 0.3, 1)";
      canvas.style.opacity = "1";
      canvas.style.transform = "rotateX(55deg) rotateZ(-25deg) scale(1)";
    }, 300);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  const titleLines = name.split("\n");

  return (
    <div
      className={cn(
        "relative w-full min-h-screen overflow-hidden bg-background text-foreground font-sans flex items-center justify-center",
        className,
      )}
    >

      <div className="interface-grid">
        <div></div>
        <h1 className="hero-title">
          {titleLines.map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx < titleLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>

        <div
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            zIndex: 30,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.85rem",
              letterSpacing: "0.05em",
            }}
          >
            {jobTitles && jobTitles.length > 0 ? (
              <JobTitleScramble titles={jobTitles} interval={4000} />
            ) : (
              <p>{role}</p>
            )}
          </div>
          <a
            href={ctaHref}
            onClick={(e) => {
              if (onCtaClick) {
                e.preventDefault();
                onCtaClick();
              }
            }}
            className="cta-button"
          >
            {ctaText}
          </a>
        </div>
      </div>

      <div className="viewport">
        <div
          className="canvas-3d relative w-[min(800px,85vw)] h-[min(500px,55vh)]"
          ref={canvasRef}
          style={{
            opacity: 0,
            transform: "rotateX(90deg) rotateZ(0deg) scale(0.8)",
          }}
        >
          <div
            className="layer layer-1 absolute inset-0"
            ref={(el) => {
              layersRef.current[0] = el;
            }}
          >
            <Image
              src={resolveSrc(layers[0])}
              alt="Topography Layer 1"
              fill
              priority
              sizes="85vw"
              className="object-cover"
            />
          </div>
          <div
            className="layer layer-2 absolute inset-0"
            ref={(el) => {
              layersRef.current[1] = el;
            }}
          >
            <Image
              src={resolveSrc(layers[1] ?? layers[0])}
              alt="Topography Layer 2"
              fill
              priority
              sizes="85vw"
              className="object-cover"
            />
          </div>
          <div
            className="layer layer-3 absolute inset-0"
            ref={(el) => {
              layersRef.current[2] = el;
            }}
          >
            <Image
              src={resolveSrc(layers[2] ?? layers[0])}
              alt="Topography Layer 3"
              fill
              priority
              sizes="85vw"
              className="object-cover"
            />
          </div>
          <div className="contours"></div>
        </div>
      </div>

      <div className="scroll-hint"></div>
    </div>
  );
};

export default HalideTopoHero;
