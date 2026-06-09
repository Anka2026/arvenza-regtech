import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface HomeSectionShellProps {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabelledby?: string;
  /** Orbit placement for recurring brand motif */
  orbitAlign?: "left" | "right" | "center";
  motifVariant?: "section" | "muted" | "dark";
  showWaveEdge?: boolean;
}

/** Homepage section wrapper with consistent orbit/wave brand language */
export function HomeSectionShell({
  children,
  className,
  id,
  ariaLabelledby,
  orbitAlign = "right",
  motifVariant = "section",
  showWaveEdge = true,
}: HomeSectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn("relative w-full overflow-hidden", className)}
    >
      {/* Motif is injected by client sections — shell is structural only */}
      {children}
    </section>
  );
}

export const sectionHeadSpacing = "mb-7 lg:mb-9";
