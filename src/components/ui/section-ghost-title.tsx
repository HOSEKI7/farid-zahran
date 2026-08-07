import React from "react";
import { cn } from "@/lib/utils";

export interface SectionGhostTitleProps {
  text: string;
  className?: string;
}

export const SectionGhostTitle: React.FC<SectionGhostTitleProps> = ({
  text,
  className,
}) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute left-1/2 -translate-x-1/2 top-2 sm:top-4 md:top-6 lg:top-8 z-0 pointer-events-none select-none w-full text-center overflow-hidden px-4",
        className
      )}
    >
      <span
        className={cn(
          "inline-block font-extrabold uppercase tracking-tighter whitespace-nowrap leading-none",
          "text-[clamp(3.2rem,13vw,11rem)]",
          "bg-gradient-to-b from-foreground/15 via-foreground/5 to-transparent bg-clip-text text-transparent",
          "[mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)]",
          "[-webkit-mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)]"
        )}
      >
        {text}
      </span>
    </div>
  );
};

export default SectionGhostTitle;
