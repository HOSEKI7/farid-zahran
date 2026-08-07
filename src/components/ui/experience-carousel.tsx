"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { Maximize2, X } from "lucide-react";

export function ExperienceCarousel({
  photos,
  company,
}: {
  photos: string[];
  company: string;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
      );
    }
  }, [photos]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  if (!photos || photos.length === 0) return null;

  const handleCardClick = (photo: string) => {
    if (!isDragging) {
      setSelectedImage(photo);
    }
  };

  return (
    <>
      <div className="mt-8 overflow-hidden w-full cursor-grab active:cursor-grabbing">
        <motion.div
          ref={carouselRef}
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => {
            setTimeout(() => setIsDragging(false), 50);
          }}
          className="flex gap-4"
        >
          {photos.map((photo, idx) => (
            <motion.div
              key={idx}
              onClick={() => handleCardClick(photo)}
              className="group relative min-w-[280px] md:min-w-[400px] aspect-video rounded-xl overflow-hidden border border-white/10 cursor-pointer select-none bg-neutral-900/50"
            >
              <Image
                src={`/experience-photos/${photo}`}
                alt={`${company} experience photo ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 280px, 400px"
                className="object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
              />

              {/* Darkening overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 pointer-events-none" />

              {/* Open Button for Desktop & Tap indicator for Mobile */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none z-10">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/75 border border-white/20 text-white text-xs font-mono shadow-lg backdrop-blur-md">
                  <Maximize2 className="w-3.5 h-3.5 text-[#9ba480]" />
                  <span>Open</span>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal Popup */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-950 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-white/20 border border-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Preview */}
              <div className="relative w-full h-full min-h-[300px] md:min-h-[500px]">
                <Image
                  src={`/experience-photos/${selectedImage}`}
                  alt={`${company} enlarged experience photo`}
                  fill
                  className="object-contain p-2 md:p-6"
                  sizes="100vw"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
