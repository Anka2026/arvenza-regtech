"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface OrbitWaveMotifProps {
  variant?: "hero" | "section" | "dark" | "cta" | "footer" | "muted" | "legal";
  orbitAlign?: "left" | "right" | "center";
  className?: string;
  showWaves?: boolean;
  showOrbit?: boolean;
  showDots?: boolean;
  showMesh?: boolean;
  showNodes?: boolean;
  intensity?: "normal" | "subtle";
}

const opacityMap = {
  hero: { orbit: 0.75, inner: 0.5, wave: 0.4, dot: 0.35, mesh: 0.55, node: 0.45 },
  section: { orbit: 0.75, inner: 0.5, wave: 0.35, dot: 0.3, mesh: 0.45, node: 0.38 },
  muted: { orbit: 0.75, inner: 0.5, wave: 0.3, dot: 0.26, mesh: 0.38, node: 0.32 },
  dark: { orbit: 0.75, inner: 0.5, wave: 0.38, dot: 0.32, mesh: 0.5, node: 0.42 },
  cta: { orbit: 0.75, inner: 0.5, wave: 0.32, dot: 0.28, mesh: 0.42, node: 0.36 },
  footer: { orbit: 0.75, inner: 0.5, wave: 0.28, dot: 0.24, mesh: 0.35, node: 0.3 },
  legal: { orbit: 0.55, inner: 0.38, wave: 0.22, dot: 0.2, mesh: 0.3, node: 0.25 },
};

/** Decorative orbit + wave — never participates in document flow */
export function OrbitWaveMotif({
  variant = "section",
  orbitAlign = "right",
  className,
  showWaves = true,
  showOrbit = true,
  showDots,
  showMesh = true,
  showNodes = true,
  intensity = "normal",
}: OrbitWaveMotifProps) {
  const gradId = useId();
  const op = opacityMap[variant];
  const subtle = intensity === "subtle" || variant === "legal";
  const resolvedShowDots = showDots ?? (variant === "hero" || variant === "section");
  const scale = subtle ? 0.72 : 1;

  const orbitPosition =
    variant === "hero"
      ? "left-1/2 top-[42%] h-[min(360px,72%)] w-[min(360px,72%)] -translate-x-1/2 -translate-y-1/2"
      : variant === "dark"
        ? "left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2"
        : variant === "cta"
          ? "right-[8%] top-[12%] h-[220px] w-[220px]"
          : variant === "footer"
            ? "left-0 top-0 h-[180px] w-[180px] -translate-y-1/4"
            : variant === "legal"
              ? "right-[6%] top-[18%] h-[180px] w-[180px] max-md:hidden"
              : orbitAlign === "left"
                ? "left-0 top-1/2 h-[260px] w-[260px] -translate-x-1/4 -translate-y-1/2 max-md:h-[200px] max-md:w-[200px]"
                : orbitAlign === "center"
                  ? "left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2"
                  : "right-0 top-1/2 h-[260px] w-[260px] translate-x-1/4 -translate-y-1/2 max-md:h-[200px] max-md:w-[200px]";

  return (
    <div className={cn("decorative-motif", className)} aria-hidden="true">
      {showMesh && (
        <div
          className="decorative-motif-orbit inset-0 bg-grid-dots max-md:opacity-60"
          style={{ opacity: op.mesh * scale }}
        />
      )}

      {showMesh && (
        <div
          className="decorative-motif-orbit inset-0 max-md:opacity-50"
          style={{
            opacity: op.mesh * 0.65 * scale,
            background:
              "radial-gradient(ellipse 55% 45% at 82% 18%, rgba(124, 58, 237, 0.12), transparent 60%), radial-gradient(ellipse 48% 40% at 12% 72%, rgba(37, 99, 235, 0.09), transparent 58%), radial-gradient(ellipse 35% 30% at 68% 88%, rgba(6, 182, 212, 0.07), transparent 55%)",
          }}
        />
      )}

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
              strokeWidth="1.5"
              strokeDasharray="4 12"
              opacity={op.orbit * scale}
            />
            <circle
              cx="200"
              cy="200"
              r="148"
              stroke={`url(#${gradId})`}
              strokeWidth="1"
              strokeDasharray="2 16"
              opacity={op.inner * scale}
            />
            <circle
              cx="200"
              cy="200"
              r="108"
              stroke={`url(#${gradId})`}
              strokeWidth="0.75"
              strokeDasharray="1 14"
              opacity={op.inner * 0.55 * scale}
              className="max-md:hidden"
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

      {showOrbit && orbitAlign === "right" && variant !== "legal" && (
        <div
          className="decorative-motif-orbit right-[18%] top-[28%] h-[120px] w-[120px] orbit-ring-slow motion-reduce:animate-none max-md:hidden"
          style={{ opacity: op.orbit * 0.45 * scale }}
        >
          <svg viewBox="0 0 120 120" className="h-full w-full" fill="none">
            <circle
              cx="60"
              cy="60"
              r="52"
              stroke="#7C3AED"
              strokeWidth="1"
              strokeDasharray="3 10"
              opacity="0.6"
            />
          </svg>
        </div>
      )}

      {showNodes && (
        <>
          <span
            className="decorative-motif-orbit left-[10%] top-[22%] h-1 w-1 rounded-full bg-[#7c3aed] float-dot motion-reduce:animate-none max-md:hidden"
            style={{ opacity: op.node * scale }}
          />
          <span
            className="decorative-motif-orbit right-[14%] top-[32%] h-1 w-1 rounded-full bg-[#6366f1] float-dot motion-reduce:animate-none"
            style={{ opacity: op.node * 0.85 * scale, animationDelay: "1.4s" }}
          />
          <span
            className="decorative-motif-orbit left-[22%] bottom-[28%] h-0.5 w-0.5 rounded-full bg-[#06b6d4] float-dot motion-reduce:animate-none max-md:hidden"
            style={{ opacity: op.node * 0.7 * scale, animationDelay: "2.2s" }}
          />
        </>
      )}

      {showNodes && variant === "hero" && (
        <svg
          className="decorative-motif-orbit inset-0 h-full w-full max-md:hidden"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ opacity: op.node * 0.35 * scale }}
          aria-hidden="true"
        >
          <line x1="12" y1="24" x2="28" y2="38" stroke="#7C3AED" strokeWidth="0.15" strokeDasharray="0.6 1.8" vectorEffect="non-scaling-stroke" />
          <line x1="72" y1="18" x2="88" y2="32" stroke="#2563EB" strokeWidth="0.15" strokeDasharray="0.6 1.8" vectorEffect="non-scaling-stroke" />
          <line x1="58" y1="72" x2="78" y2="58" stroke="#06B6D4" strokeWidth="0.15" strokeDasharray="0.6 1.8" vectorEffect="non-scaling-stroke" />
        </svg>
      )}

      {showWaves && (
        <div
          className={cn(
            "decorative-motif-orbit inset-x-0 bottom-0 bg-wave-lines wave-drift motion-reduce:animate-none",
            variant === "hero" && "h-[36%]",
            (variant === "section" || variant === "muted" || variant === "legal") && "h-[26%]",
            variant === "dark" && "h-[30%]",
            variant === "cta" && "h-[38%]",
            variant === "footer" && "h-[42%]"
          )}
          style={{ opacity: op.wave * scale }}
        />
      )}

      {resolvedShowDots && (
        <>
          <span
            className="decorative-motif-orbit left-[8%] top-[18%] h-0.5 w-0.5 rounded-full bg-[#7c3aed] float-dot motion-reduce:animate-none max-md:hidden"
            style={{ opacity: op.dot * 0.55 * scale }}
          />
          <span
            className="decorative-motif-orbit right-[10%] top-[24%] h-0.5 w-0.5 rounded-full bg-[#6366f1] float-dot motion-reduce:animate-none"
            style={{ opacity: op.dot * 0.45 * scale, animationDelay: "1.4s" }}
          />
          <span
            className="decorative-motif-orbit left-[18%] bottom-[22%] h-0.5 w-0.5 rounded-full bg-[#06b6d4] float-dot motion-reduce:animate-none max-md:hidden"
            style={{ opacity: op.dot * 0.4 * scale, animationDelay: "2.8s" }}
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
        "decorative-motif-orbit inset-x-0 bottom-0 z-[1] h-6 bg-wave-lines wave-drift opacity-30 motion-reduce:animate-none",
        className
      )}
      aria-hidden="true"
    />
  );
}
