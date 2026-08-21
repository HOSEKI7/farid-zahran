"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useRef, useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

export function ExperienceCarousel({
  photos,
  company,
}: {
  photos: string[];
  company: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState<number | null>(null);
  const [dragLimit, setDragLimit] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    if (!containerRef.current || !photos || photos.length === 0) return;

    const calculateDimensions = () => {
      if (!containerRef.current) return;
      const parentWidth = containerRef.current.offsetWidth;
      if (parentWidth <= 0) return;

      const gap = 16; // 1rem (gap-4)
      const count = photos.length;
      let widthPerCard = parentWidth;

      if (parentWidth < 640) {
        // Mobile: 1 card + peek preview of 2nd card
        widthPerCard = count > 1 ? Math.round(parentWidth * 0.82) : parentWidth;
      } else {
        // Tablet / Desktop:
        if (count > 2) {
          // Exactly 2 full cards + ~25% peek preview of 3rd card
          widthPerCard = Math.round((parentWidth - gap * 2) / 2.25);
        } else if (count === 2) {
          // Exactly 2 full cards filling container
          widthPerCard = Math.round((parentWidth - gap) / 2);
        } else {
          widthPerCard = parentWidth;
        }
      }

      setCardWidth(widthPerCard);

      const totalTrackWidth = count * widthPerCard + (count - 1) * gap;
      const maxScroll = Math.max(0, totalTrackWidth - parentWidth);
      setDragLimit(maxScroll);
    };

    calculateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      calculateDimensions();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
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

  return (
    <>
      <div
        ref={containerRef}
        className="mt-8 overflow-hidden w-full cursor-grab active:cursor-grabbing"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -dragLimit }}
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
              style={{
                width: cardWidth ? `${cardWidth}px` : "280px",
              }}
              className={cn(
                "group relative aspect-video rounded-xl overflow-hidden border border-border cursor-pointer select-none bg-card/50 shrink-0"
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
