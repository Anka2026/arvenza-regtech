"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface OrbitWaveMotifProps {
  variant?: "hero" | "section" | "dark" | "cta" | "footer" | "muted";
  orbitAlign?: "left" | "right" | "center";
  className?: string;
  showWaves?: boolean;
  showOrbit?: boolean;
  showDots?: boolean;
}

const opacityMap = {
  hero: { orbit: 0.28, wave: 0.4, dot: 0.35 },
  section: { orbit: 0.2, wave: 0.35, dot: 0.3 },
  muted: { orbit: 0.16, wave: 0.3, dot: 0.26 },
  dark: { orbit: 0.24, wave: 0.38, dot: 0.32 },
  cta: { orbit: 0.2, wave: 0.32, dot: 0.28 },
  footer: { orbit: 0.14, wave: 0.28, dot: 0.24 },
};

/** Decorative orbit + wave — never participates in document flow */
export function OrbitWaveMotif({
  variant = "section",
  orbitAlign = "right",
  className,
  showWaves = true,
  showOrbit = true,
  showDots = false,
}: OrbitWaveMotifProps) {
  const gradId = useId();
  const op = opacityMap[variant];

  const orbitPosition =
    variant === "hero"
      ? "left-1/2 top-1/2 h-[min(340px,70%)] w-[min(340px,70%)] -translate-x-1/2 -translate-y-1/2"
      : variant === "dark"
        ? "left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2"
        : variant === "cta"
          ? "right-0 top-0 h-[200px] w-[200px]"
          : variant === "footer"
            ? "left-0 top-0 h-[180px] w-[180px] -translate-y-1/4"
            : orbitAlign === "left"
              ? "left-0 top-1/2 h-[240px] w-[240px] -translate-x-1/4 -translate-y-1/2"
              : orbitAlign === "center"
                ? "left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2"
                : "right-0 top-1/2 h-[240px] w-[240px] translate-x-1/4 -translate-y-1/2";

  return (
    <div
      className={cn("decorative-motif", className)}
      aria-hidden="true"
    >
      {showOrbit && (
        <div
          className={cn(
            "decorative-motif-orbit orbit-ring motion-reduce:animate-none",
            orbitPosition
          )}
        >
          <svg viewBox="0 0 400 400" className="h-full w-full" fill="none" aria-hidden="true">
            <circle
              cx="200"
              cy="200"
              r="188"
              stroke={`url(#${gradId})`}
              strokeWidth="1"
              strokeDasharray="4 12"
              opacity={op.orbit}
            />
            <circle
              cx="200"
              cy="200"
              r="148"
              stroke={`url(#${gradId})`}
              strokeWidth="0.75"
              strokeDasharray="2 16"
              opacity={op.orbit * 0.55}
            />
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="400" y2="400">
                <stop stopColor="#7C3AED" />
                <stop offset="0.58" stopColor="#2563EB" />
                <stop offset="1" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      {showWaves && (
        <div
          className={cn(
            "decorative-motif-orbit inset-x-0 bottom-0 bg-wave-lines wave-drift motion-reduce:animate-none",
            variant === "hero" && "h-[36%]",
            (variant === "section" || variant === "muted") && "h-[26%]",
            variant === "dark" && "h-[30%]",
            variant === "cta" && "h-[38%]",
            variant === "footer" && "h-[42%]"
          )}
          style={{ opacity: op.wave }}
        />
      )}

      {showDots && (
        <>
          <span
            className="decorative-motif-orbit left-[10%] top-[20%] h-0.5 w-0.5 rounded-full bg-[#7c3aed] float-dot motion-reduce:animate-none"
            style={{ opacity: op.dot * 0.45 }}
          />
          <span
            className="decorative-motif-orbit right-[12%] top-[28%] h-0.5 w-0.5 rounded-full bg-[#6366f1] float-dot motion-reduce:animate-none"
            style={{ opacity: op.dot * 0.35, animationDelay: "1.4s" }}
          />
        </>
      )}
    </div>
  );
}

/** Bottom edge wave accent between homepage sections */
export function SectionWaveEdge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "decorative-motif-orbit inset-x-0 bottom-0 z-[1] h-10 bg-wave-lines wave-drift opacity-30 motion-reduce:animate-none",
        className
      )}
      aria-hidden="true"
    />
  );
}
