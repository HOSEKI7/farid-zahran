"use client";

import React, { useEffect, useRef } from "react";
import type { StaticImageData } from "next/image";
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
    canvas.style.opacity = "0";
    canvas.style.transform = "rotateX(90deg) rotateZ(0deg) scale(0.8)";

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
        "relative w-full min-h-screen overflow-hidden bg-[#0a0a0a] text-[#e0e0e0] font-sans flex items-center justify-center",
        className,
      )}
    >
      <style jsx global>{`
        :root {
          --bg: #0a0a0a;
          --silver: #e0e0e0;
          --accent: #ff3c00;
          --grain-opacity: 0.15;
        }

        .halide-grain {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 10;
          opacity: var(--grain-opacity);
        }

        .viewport {
          perspective: 2000px;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .canvas-3d {
          position: relative;
          width: min(800px, 85vw);
          height: min(500px, 55vh);
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .layer {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(224, 224, 224, 0.1);
          background-size: cover;
          background-position: center;
          transition: transform 0.5s ease;
        }

        .layer-1 {
          filter: grayscale(0.6) contrast(1.1) brightness(0.5);
        }
        .layer-2 {
          filter: grayscale(0.6) contrast(1) brightness(0.7);
          opacity: 0.6;
          mix-blend-mode: screen;
        }
        .layer-3 {
          filter: grayscale(0.6) contrast(1.2) brightness(0.8);
          opacity: 0.4;
          mix-blend-mode: overlay;
        }

        .contours {
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          background-image: repeating-radial-gradient(
            circle at 50% 50%,
            transparent 0,
            transparent 40px,
            rgba(255, 255, 255, 0.05) 41px,
            transparent 42px
          );
          transform: translateZ(120px);
          pointer-events: none;
        }

        .interface-grid {
          position: absolute;
          inset: 0;
          padding: 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto 1fr auto;
          z-index: 20;
          pointer-events: none;
        }

        @media (min-width: 768px) {
          .interface-grid {
            padding: 4rem;
          }
        }

        .hero-title {
          grid-column: 1 / -1;
          align-self: center;
          font-size: clamp(2.5rem, 9vw, 9.5rem);
          line-height: 0.85;
          letter-spacing: -0.04em;
          mix-blend-mode: difference;
          font-weight: 800;
          text-transform: uppercase;
        }

        .cta-button {
          pointer-events: auto;
          background: var(--silver);
          color: var(--bg);
          padding: 0.875rem 1.75rem;
          text-decoration: none;
          font-weight: 700;
          clip-path: polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%);
          transition: all 0.3s ease;
          display: inline-block;
          cursor: pointer;
        }

        .cta-button:hover {
          background: var(--accent);
          color: #ffffff;
          transform: translateY(-4px);
        }

        .scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, var(--silver), transparent);
          animation: flow 2s infinite ease-in-out;
          z-index: 20;
        }

        @keyframes flow {
          0%,
          100% {
            transform: scaleY(0);
            transform-origin: top;
          }
          50% {
            transform: scaleY(1);
            transform-origin: top;
          }
          51% {
            transform: scaleY(1);
            transform-origin: bottom;
          }
        }
      `}</style>

      {/* SVG Filter for Grain */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      <div className="halide-grain" style={{ filter: "url(#grain)" }}></div>

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
        <div className="canvas-3d" ref={canvasRef}>
          <div
            className="layer layer-1"
            ref={(el) => {
              layersRef.current[0] = el;
            }}
            style={{ backgroundImage: `url('${resolveSrc(layers[0])}')` }}
          />
          <div
            className="layer layer-2"
            ref={(el) => {
              layersRef.current[1] = el;
            }}
            style={{
              backgroundImage: `url('${resolveSrc(layers[1] ?? layers[0])}')`,
            }}
          />
          <div
            className="layer layer-3"
            ref={(el) => {
              layersRef.current[2] = el;
            }}
            style={{
              backgroundImage: `url('${resolveSrc(layers[2] ?? layers[0])}')`,
            }}
          />
          <div className="contours"></div>
        </div>
      </div>

      <div className="scroll-hint"></div>
    </div>
  );
};

export default HalideTopoHero;
