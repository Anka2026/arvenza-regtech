"use client";

import { useTranslations } from "next-intl";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { CbamProductShowcase } from "@/components/platform/cbam/cbam-product-showcase";
import {
  EvidencePackPanel,
  MonitoringKpiPanel,
  SupplierWorkflowPanel,
} from "@/components/platform/cbam/product-ui-compositions";
import type { CbamScreenshotFocus } from "@/lib/assets";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type FeatureKey = "supplier" | "calculation" | "evidence" | "monitoring";
type FeatureBlockVariant = "light" | "dark";

type FeatureVisual =
  | { type: "screenshot"; focus?: CbamScreenshotFocus }
  | { type: "supplierWorkflow" }
  | { type: "evidencePack" }
  | { type: "monitoringKpi" };

type VisualScale = "compact" | "featured";

interface ProductFeatureSectionProps {
  id: string;
  featureKey: FeatureKey;
  visual?: FeatureVisual;
  /** @deprecated Use visual={{ type: "screenshot", focus }} */
  focus?: CbamScreenshotFocus;
  variant?: FeatureBlockVariant;
  imageFirst?: boolean;
  bulletCount?: number;
  visualScale?: VisualScale;
}

const sectionClass: Record<FeatureBlockVariant, string> = {
  light: "section-light cbam-section",
  dark: "section-dark-band cbam-section",
};

const motifVariant: Record<FeatureBlockVariant, "section" | "dark"> = {
  light: "section",
  dark: "dark",
};

const cbamHeadSpacing = "mb-4 lg:mb-5";

function FeatureVisualColumn({
  visual,
  legacyFocus,
  alt,
  dark,
  visualScale,
}: {
  visual: FeatureVisual;
  legacyFocus: CbamScreenshotFocus;
  alt: string;
  dark: boolean;
  visualScale: VisualScale;
}) {
  const compact = visualScale === "compact";
  const density = compact ? "compact" : "default";

  if (visual.type === "screenshot") {
    return (
      <div className={cn(compact ? "max-w-sm" : "mx-auto w-full max-w-xl lg:max-w-none")}>
        <CbamProductShowcase
          variant="feature"
          focus={visual.focus ?? legacyFocus}
          alt={alt}
        />
      </div>
    );
  }
  if (visual.type === "supplierWorkflow") {
    return (
      <div className={cn("w-full", compact && "max-w-sm lg:ml-auto")}>
        <SupplierWorkflowPanel namespace="cbamPlatform.supplier" variant={dark ? "dark" : "light"} density={density} />
      </div>
    );
  }
  if (visual.type === "evidencePack") {
    return (
      <div className={cn("w-full", compact && "max-w-sm lg:ml-auto")}>
        <EvidencePackPanel namespace="cbamPlatform.evidence" variant={dark ? "dark" : "light"} density={density} />
      </div>
    );
  }
  return (
    <div className={cn("w-full", compact && "max-w-sm")}>
      <MonitoringKpiPanel variant={dark ? "dark" : "light"} density={density} />
    </div>
  );
}

export function ProductFeatureSection({
  id,
  featureKey,
  visual,
  focus = "full",
  variant = "light",
  imageFirst = false,
  bulletCount = 5,
  visualScale = "compact",
}: ProductFeatureSectionProps) {
  const t = useTranslations(`cbamPlatform.${featureKey}`);
  const dark = variant === "dark";
  const isFeatured = visualScale === "featured";
  const bulletKeys = Array.from({ length: bulletCount }, (_, i) => `item${i + 1}` as const);
  const resolvedVisual: FeatureVisual =
    visual ??
    (featureKey === "calculation"
      ? { type: "screenshot", focus }
      : featureKey === "supplier"
        ? { type: "supplierWorkflow" }
        : featureKey === "evidence"
          ? { type: "evidencePack" }
          : { type: "monitoringKpi" });

  return (
    <FullBleedSection id={id} ariaLabelledby={`${id}-heading`} className={sectionClass[variant]}>
      <OrbitWaveMotif variant={motifVariant[variant]} orbitAlign={imageFirst ? "right" : "left"} />
      {dark ? (
        <div className="pointer-events-none absolute inset-0 dark-section-glow" aria-hidden="true" />
      ) : (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-brand-soft opacity-80"
          aria-hidden="true"
        />
      )}
      <PageContainer className="section-content">
        <div
          className={cn(
            "grid items-center",
            isFeatured ? "gap-6 lg:grid-cols-2 lg:gap-10" : "gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8",
            imageFirst && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
          )}
        >
          <FadeIn>
            <SectionHeading
              id={`${id}-heading`}
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
              dark={dark}
              className={cbamHeadSpacing}
            />
            <ul className={cn(isFeatured ? "mt-3 space-y-2" : "mt-3 space-y-1.5")}>
              {bulletKeys.map((key) => (
                <li key={key} className="flex items-start gap-2">
                  <span
                    className={cn(
                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded",
                      dark ? "bg-[#7C3AED]/20 text-[#C4B5FD]" : "bg-[#7C3AED]/10 text-[#7C3AED]"
                    )}
                  >
                    <Check className="h-2.5 w-2.5" aria-hidden="true" />
                  </span>
                  <span
                    className={cn(
                      "text-[13px] leading-snug lg:text-sm",
                      dark ? "text-slate-300" : "text-[#475569]"
                    )}
                  >
                    {t(`bullets.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.06} className="relative min-w-0">
            <FeatureVisualColumn
              visual={resolvedVisual}
              legacyFocus={focus}
              alt={t("screenshotAlt")}
              dark={dark}
              visualScale={visualScale}
            />
          </FadeIn>
        </div>
      </PageContainer>
      <SectionWaveEdge className={dark ? "opacity-20" : "opacity-30"} />
    </FullBleedSection>
  );
}
