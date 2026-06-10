"use client";

import { useTranslations } from "next-intl";
import { CbamProductScreenshot } from "@/components/ui/cbam-product-screenshot";
import { cn } from "@/lib/utils";

const FLOAT_KEYS = ["supplier", "calculation", "evidence"] as const;

interface HeroProductStageProps {
  className?: string;
}

export function HeroProductStage({ className }: HeroProductStageProps) {
  const t = useTranslations("home.hero");

  return (
    <div className={cn("hero-product-stage hero-product-stage-home min-w-0 overflow-hidden", className)}>
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle,rgba(124,58,237,0.2),transparent_68%)] blur-2xl"
        aria-hidden="true"
      />
      <div className="hero-product-frame-wrap relative">
        <div className="hero-product-badge-row">
          <span className="badge-core-product">{t("productBadge")}</span>
          <span className="badge-ready">{t("productStatus")}</span>
        </div>
        <CbamProductScreenshot
          focus="full"
          alt={t("screenshotAlt")}
          size="hero"
          elevated
          priority
          className="relative w-full max-w-full shadow-dashboard-glow"
        />
        {FLOAT_KEYS.map((key, index) => (
          <div
            key={key}
            className={cn(
              "hero-evidence-float premium-float-card pointer-events-none hidden sm:block",
              index === 0 && "hero-evidence-float-supplier",
              index === 1 && "hero-evidence-float-calculation",
              index === 2 && "hero-evidence-float-evidence"
            )}
            aria-hidden="true"
          >
            <p className="hero-evidence-float-label">{t(`floatCards.${key}.label`)}</p>
            <p className="hero-evidence-float-value">{t(`floatCards.${key}.hint`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
