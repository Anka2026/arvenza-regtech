"use client";

import { useTranslations } from "next-intl";
import { ArrowDown, Calculator, Database, FileStack, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const LAYER_KEYS = [
  "supplierEvidence",
  "productData",
  "calculationMethodology",
  "documentationReporting",
] as const;

const LAYER_ICONS = [Users, Database, Calculator, FileStack] as const;

interface PlatformArchitectureDiagramProps {
  className?: string;
  variant?: "hero" | "compact";
}

export function PlatformArchitectureDiagram({
  className,
  variant = "hero",
}: PlatformArchitectureDiagramProps) {
  const tLayers = useTranslations("platformHub.architecture");
  const tLayer = useTranslations("platformHub.architecture.layers");

  return (
    <div
      className={cn(
        "platform-arch-diagram",
        variant === "compact" && "platform-arch-diagram-compact",
        className
      )}
      role="img"
      aria-label={tLayers("diagramAriaLabel")}
    >
      <div
        className="pointer-events-none absolute -inset-4 rounded-[1.75rem] bg-[radial-gradient(circle,rgba(124,58,237,0.14),transparent_68%)] blur-2xl"
        aria-hidden="true"
      />
      <div className="platform-arch-diagram-panel relative rounded-[1.25rem] border border-[#7c3aed]/16 bg-white/90 p-4 shadow-[0_12px_40px_rgba(15,23,42,0.08)] sm:p-5">
        <p className="platform-arch-diagram-kicker">{tLayers("diagramKicker")}</p>
        <div className="platform-arch-flow mt-4">
          {LAYER_KEYS.map((key, index) => {
            const Icon = LAYER_ICONS[index];
            const isLast = index === LAYER_KEYS.length - 1;
            return (
              <div key={key} className="platform-arch-flow-item">
                <div className="platform-arch-node">
                  <div className="platform-arch-node-icon" aria-hidden="true">
                    <Icon className="h-4 w-4 text-[#7c3aed]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="platform-arch-node-title">{tLayer(`${key}.title`)}</p>
                    {variant === "hero" && (
                      <p className="platform-arch-node-desc">{tLayer(`${key}.shortDescription`)}</p>
                    )}
                  </div>
                  <span className="platform-arch-node-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                {!isLast && (
                  <div className="platform-arch-connector" aria-hidden="true">
                    <div className="platform-arch-connector-line" />
                    <ArrowDown className="h-3.5 w-3.5 text-[#2563eb]/80" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
