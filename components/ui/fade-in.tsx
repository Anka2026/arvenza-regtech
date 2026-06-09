"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "none";
  /** Above-the-fold content: visible on first paint, no whileInView blank flash */
  immediate?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  immediate = false,
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  if (immediate) {
    return (
      <motion.div
        initial={{
          opacity: 1,
          y: direction === "up" ? 4 : 0,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{ duration: 0.28, delay: 0, ease: [0.22, 1, 0.36, 1] }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: direction === "up" ? 16 : 0,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
