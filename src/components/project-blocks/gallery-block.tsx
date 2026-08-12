"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import type { GalleryImage } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface GalleryBlockProps {
  layout: "grid" | "masonry" | "full-bleed";
  images: GalleryImage[];
}

interface GalleryFigureProps {
  image: GalleryImage;
  /** Masonry memakai CSS columns, jadi figure-nya butuh break-inside guard. */
  inColumns?: boolean;
  sizes: string;
}

const GalleryFigure: React.FC<GalleryFigureProps> = ({
  image,
  inColumns = false,
  sizes,
}) => (
  <figure className={cn("group", inColumns && "mb-4 break-inside-avoid md:mb-6")}>
    <div className="relative overflow-hidden rounded-lg border border-border bg-card">
      <Image
        src={image.src}
        alt={image.alt}
        width={1600}
        height={1000}
        sizes={sizes}
        className="h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
    </div>
    {image.caption && (
      <figcaption className="mt-3 font-mono text-xs text-muted">
        {image.caption}
      </figcaption>
    )}
  </figure>
);

/**
 * Full-bleed menembus container jadi selebar viewport, dengan parallax ringan.
 * Parallax memakai useScroll dari motion/react — bukan scroll listener manual —
 * dan runtuh jadi statis saat prefers-reduced-motion aktif.
 */
const FullBleedFigure: React.FC<{ image: GalleryImage }> = ({ image }) => {
  const ref = React.useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  /**
   * Overscan 12% ditaruh seluruhnya di bawah (`top-0 h-[112%]`) dan gambar
   * bergeser naik. Persen di `y` relatif tinggi elemen, jadi 10.7% dari 112%
   * ≈ 12% tinggi container: di ujung rentang frame masih tertutup penuh.
   * Nilai awalnya 0%, sama dengan render server, jadi tidak ada mismatch.
   */
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10.7%"]);
  const yStatic = useMotionValue("0%");

  /**
   * Yang ditukar hanya motion value-nya, bukan markup-nya. Mencabang elemen di
   * sini bikin hydration mismatch — useReducedMotion() selalu false saat SSR —
   * dan React menolak menambalnya, jadi transform hasil render server tersangkut
   * dan parallax justru tetap terlihat.
   */
  const offset = shouldReduceMotion ? yStatic : y;

  return (
    <figure ref={ref} className="relative w-full">
      <div className="relative h-[45vh] overflow-hidden bg-card md:h-[70vh]">
        <motion.div
          style={{ y: offset }}
          className="absolute inset-x-0 top-0 h-[112%]"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </div>
      {image.caption && (
        <figcaption className="mx-auto mt-3 w-full max-w-[1400px] px-6 font-mono text-xs text-muted md:px-10">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
};

export const GalleryBlock: React.FC<GalleryBlockProps> = ({
  layout,
  images,
}) => {
  if (layout === "full-bleed") {
    return (
      <ScrollReveal direction="up" distance={24} amount={0.15} className="w-full">
        <div className="space-y-10">
          {images.map((image) => (
            <FullBleedFigure key={image.src} image={image} />
          ))}
        </div>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal
      direction="up"
      distance={28}
      amount={0.15}
      className="mx-auto w-full max-w-[1400px] px-6 md:px-10"
    >
      {layout === "masonry" ? (
        <div className="columns-1 gap-4 md:columns-2 md:gap-6">
          {images.map((image) => (
            <GalleryFigure
              key={image.src}
              image={image}
              inColumns
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {images.map((image) => (
            <GalleryFigure
              key={image.src}
              image={image}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ))}
        </div>
      )}
    </ScrollReveal>
  );
};

export default GalleryBlock;
