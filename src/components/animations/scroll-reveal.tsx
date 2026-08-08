"use client";

import React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

export interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  blur?: boolean;
  scale?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  className?: string;
}

const EASE_OUT_CUBIC = [0.16, 1, 0.3, 1] as const;

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = "up",
  distance = 30,
  duration = 0.6,
  delay = 0,
  blur = true,
  scale = 1,
  once = false,
  amount = 0.2,
  className,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      case "none":
        return {};
      default:
        return { y: distance };
    }
  };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: scale !== 1 ? scale : 1,
        filter: blur ? "blur(6px)" : "blur(0px)",
        ...getInitialPosition(),
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: EASE_OUT_CUBIC,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
