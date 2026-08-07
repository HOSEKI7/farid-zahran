"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export function ExperienceCarousel({ photos, company }: { photos: string[], company: string }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [photos]);

  if (!photos || photos.length === 0) return null;

  return (
    <div className="mt-8 overflow-hidden w-full cursor-grab active:cursor-grabbing">
      <motion.div
        ref={carouselRef}
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        className="flex gap-4"
      >
        {photos.map((photo, idx) => (
          <motion.div
            key={idx}
            className="relative min-w-[280px] md:min-w-[400px] aspect-video rounded-xl overflow-hidden border border-white/10"
          >
            <Image
              src={`/experience-photos/${photo}`}
              alt={`${company} experience photo ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 280px, 400px"
              className="object-cover pointer-events-none"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
