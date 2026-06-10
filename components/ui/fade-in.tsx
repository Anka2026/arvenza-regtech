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
  /** Large sections: skip scroll reveal entirely */
  staticReveal?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  immediate = false,
  staticReveal = false,
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion || staticReveal) {
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
        opacity: 0.92,
        y: direction === "up" ? 16 : 0,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, margin: "0px 0px -8% 0px", amount: 0.03 }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn("fade-in-safe", className)}
    >
      {children}
    </motion.div>
  );
}
