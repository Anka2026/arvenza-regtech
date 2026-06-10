"use client";

import { useTranslations } from "next-intl";
import { Calculator, Database, FileStack, Users } from "lucide-react";
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
  compact?: boolean;
}

export function PlatformArchitectureDiagram({
  className,
  compact = false,
}: PlatformArchitectureDiagramProps) {
  const tLayers = useTranslations("platformHub.architecture");
  const tLayer = useTranslations("platformHub.architecture.layers");

  return (
    <div
      className={cn("platform-arch-diagram", compact && "platform-arch-diagram-compact", className)}
      role="img"
      aria-label={tLayers("diagramAriaLabel")}
    >
      <div
        className="pointer-events-none absolute -inset-4 rounded-[1.75rem] bg-[radial-gradient(circle,rgba(124,58,237,0.14),transparent_68%)] blur-2xl"
        aria-hidden="true"
      />
      <div className="platform-arch-diagram-inner relative">
        {LAYER_KEYS.map((key, index) => {
          const Icon = LAYER_ICONS[index];
          return (
            <div
              key={key}
              className="platform-arch-layer"
              style={{ zIndex: LAYER_KEYS.length - index }}
            >
              <div className="platform-arch-layer-icon" aria-hidden="true">
                <Icon className="h-4 w-4 text-[#7c3aed]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="platform-arch-layer-title">{tLayer(`${key}.title`)}</p>
                {!compact && (
                  <p className="platform-arch-layer-desc">{tLayer(`${key}.description`)}</p>
                )}
              </div>
              <span className="platform-arch-layer-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
