import React from "react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

export interface NarrativeBlockProps {
  heading?: string;
  paragraphs: string[];
}

/**
 * Kolom teks tunggal, tanpa card. Pemisah antar block adalah ruang kosong,
 * bukan border — sesuai VISUAL_DENSITY 3.
 */
export const NarrativeBlock: React.FC<NarrativeBlockProps> = ({
  heading,
  paragraphs,
}) => {
  return (
    <ScrollReveal
      direction="up"
      distance={28}
      amount={0.25}
      className="mx-auto w-full max-w-[1400px] px-6 md:px-10"
    >
      <div className="max-w-[65ch]">
        {heading && (
          <h2 className="mb-5 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {heading}
          </h2>
        )}
        <div className="space-y-5">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base leading-relaxed text-secondary md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default NarrativeBlock;
