"use client";

import React from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface OrbitIcon {
  Icon: React.ComponentType<{ className?: string }>;
  name: string;
}

export interface OrbitRotationProps {
  icons: OrbitIcon[];
  orbitCount?: number;
  orbitGap?: number;
  centerIcon?: OrbitIcon;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const centerSizeClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
};

const iconSizeClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "w-5 h-5",
  md: "w-7 h-7",
  lg: "w-9 h-9",
};

export const OrbitRotation: React.FC<OrbitRotationProps> = ({
  icons,
  orbitCount = 3,
  orbitGap = 6,
  centerIcon,
  size = "md",
  className,
}) => {
  const reduce = useReducedMotion();
  const iconsPerOrbit = Math.ceil(icons.length / orbitCount);
  const sizeClass = centerSizeClasses[size];
  const iconSizeClass = iconSizeClasses[size];

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-center">
        {centerIcon && (
          <div
            className={cn(
              "relative z-10 flex items-center justify-center rounded-full border border-border bg-card shadow-[0_0_50px_rgba(255,60,0,0.18)]",
              sizeClass
            )}
          >
            <centerIcon.Icon className={cn("text-foreground", iconSizeClass)} />
          </div>
        )}

        {[...Array(orbitCount)].map((_, orbitIdx) => {
          const orbitSize = `${8 + orbitGap * (orbitIdx + 1)}rem`;
          const angleStep = (2 * Math.PI) / iconsPerOrbit;
          const duration = 12 + orbitIdx * 6;
          return (
            <div
              key={orbitIdx}
              className="absolute rounded-full border border-dotted border-border/50"
              style={{
                width: orbitSize,
                height: orbitSize,
                animation: reduce
                  ? undefined
                  : `orbit-spin ${duration}s linear infinite`,
              }}
            >
              {icons
                .slice(
                  orbitIdx * iconsPerOrbit,
                  orbitIdx * iconsPerOrbit + iconsPerOrbit
                )
                .map((iconConfig, iconIdx) => {
                  const angle = iconIdx * angleStep;
                  const x = 50 + 50 * Math.cos(angle);
                  const y = 50 + 50 * Math.sin(angle);
                  return (
                    <div
                      key={iconIdx}
                      className="absolute"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div
                        className="flex items-center justify-center rounded-full border border-border bg-card p-1.5"
                        style={{
                          animation: reduce
                            ? undefined
                            : `orbit-spin ${duration}s linear infinite reverse`,
                        }}
                      >
                        <iconConfig.Icon
                          className={cn("text-foreground/80", iconSizeClass)}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrbitRotation;
