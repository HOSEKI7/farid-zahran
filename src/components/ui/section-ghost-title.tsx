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
        "relative z-0 pointer-events-none select-none w-full text-center overflow-visible px-2",
        className
      )}
    >
      <span
        className={cn(
          "inline-block font-extrabold uppercase tracking-tighter whitespace-nowrap leading-none text-center",
          "text-[clamp(2.8rem,11vw,9.2rem)]",
          "bg-gradient-to-b from-foreground/45 via-foreground/18 to-transparent bg-clip-text text-transparent",
          "[mask-image:linear-gradient(to_bottom,black_35%,transparent_95%)]",
          "[-webkit-mask-image:linear-gradient(to_bottom,black_35%,transparent_95%)]"
        )}
      >
        {text}
      </span>
    </div>
  );
};

export default SectionGhostTitle;
