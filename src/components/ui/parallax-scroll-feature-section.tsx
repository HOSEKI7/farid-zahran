'use client'

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

import type { StaticImageData } from "next/image";

export interface ParallaxScrollFeatureSectionProps {
    title?: string;
    description?: string;
    imageUrl?: string | StaticImageData;
    reverse?: boolean;
    className?: string;
}

export const ParallaxScrollFeatureSection = ({
    title = "About Me",
    description = "Full-stack engineer and AI specialist passionate about building high-performance web applications, modern interactive UIs, and intelligent automated workflows.",
    imageUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    reverse = true,
    className
}: ParallaxScrollFeatureSectionProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center start"]
    });

    // Scroll Animations
    const opacityContent = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
    const clipProgress = useTransform(scrollYProgress, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
    const translateContent = useTransform(scrollYProgress, [0, 1], [-50, 0]);

    const resolvedSrc = typeof imageUrl === "string" ? imageUrl : imageUrl?.src;

    return (
        <div className={cn("flex flex-col md:px-0 px-6", className)}>
            <div 
                ref={sectionRef} 
                className={`min-h-screen flex items-center justify-center gap-12 md:gap-32 ${
                    reverse ? 'flex-col-reverse md:flex-row-reverse' : 'flex-col md:flex-row'
                }`}
            >
                <motion.div style={{ y: translateContent }} className="z-10">
                    <div className="text-4xl md:text-6xl font-bold tracking-tight max-w-md text-[#e0e0e0]">
                        {title}
                    </div>
                    <motion.p 
                        style={{ y: translateContent }} 
                        className="text-[#e0e0e0]/70 max-w-md mt-6 md:mt-8 text-base md:text-lg leading-relaxed"
                    >
                        {description}
                    </motion.p>
                </motion.div>

                <motion.div 
                    style={{ 
                        opacity: opacityContent,
                        clipPath: clipProgress,
                    }}
                    className="relative z-10"
                >
                    <img 
                        src={resolvedSrc} 
                        className="w-72 h-72 md:w-96 md:h-96 object-cover shadow-2xl" 
                        alt={title}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export const Component = ParallaxScrollFeatureSection;
