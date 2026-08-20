"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        const scrollW = carouselRef.current.scrollWidth;
        const parentW = carouselRef.current.parentElement?.offsetWidth || carouselRef.current.offsetWidth;
        setWidth(Math.max(0, scrollW - parentW));
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    const timer = setTimeout(updateWidth, 150);
    return () => {
      window.removeEventListener("resize", updateWidth);
      clearTimeout(timer);
    };
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

  const getPhotoPath = (photo: string) => {
    return photo.startsWith("/") ? `/experience-photos${photo}` : `/experience-photos/${photo}`;
  };

  const handleCardClick = (photo: string) => {
    if (!isDragging) {
      setSelectedImage(photo);
    }
  };

  const isMulti = photos.length > 2;
  const cardWidthClass = isMulti
    ? "w-[82%] min-w-[82%] sm:w-[calc((100%-1.5rem)/2)] sm:min-w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-2rem)/2.25)] md:min-w-[calc((100%-2rem)/2.25)]"
    : "w-[85%] min-w-[85%] sm:w-[calc((100%-1rem)/2)] sm:min-w-[calc((100%-1rem)/2)]";

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
          className="flex gap-4 w-max"
        >
          {photos.map((photo, idx) => (
            <motion.div
              key={idx}
              onClick={() => handleCardClick(photo)}
              className={cn(
                "group relative aspect-video rounded-xl overflow-hidden border border-border cursor-pointer select-none bg-card/50 shrink-0",
                cardWidthClass
              )}
            >
              <Image
                src={getPhotoPath(photo)}
                alt={`${company} experience photo ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 82vw, (max-width: 1024px) 45vw, 360px"
                className="object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
              />

              {/* Darkening overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 pointer-events-none" />

              {/* Open Button for Desktop & Tap indicator for Mobile */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none z-10">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-card/80 border border-border text-foreground text-xs font-mono shadow-lg backdrop-blur-md">
                  <Maximize2 className="w-3.5 h-3.5 text-accent" />
                  <span>Open</span>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal Popup (Rendered via Portal to ensure viewport centering) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md"
                onClick={() => setSelectedImage(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative flex flex-col items-center justify-center max-w-[92vw] max-h-[88vh] w-auto h-auto rounded-2xl overflow-hidden border border-border shadow-2xl bg-card/95 p-3 md:p-5"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-3 right-3 z-30 p-2.5 rounded-full bg-black/80 hover:bg-black border border-white/20 text-white transition-colors cursor-pointer shadow-xl backdrop-blur-md"
                    aria-label="Close image preview"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Image Preview Container */}
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    <img
                      src={getPhotoPath(selectedImage)}
                      alt={`${company} enlarged experience photo`}
                      className="max-h-[80vh] max-w-[88vw] w-auto h-auto object-contain rounded-xl shadow-2xl select-none"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
