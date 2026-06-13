"use client";

import { useTranslations } from "next-intl";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { sectionHeadSpacing } from "@/components/home/home-section-shell";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { CbamProductScreenshot } from "@/components/ui/cbam-product-screenshot";
import {
  EvidencePackPanel,
  SupplierWorkflowPanel,
} from "@/components/platform/cbam/product-ui-compositions";
import type { CbamScreenshotFocus } from "@/lib/assets";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type FeatureBlockVariant = "light" | "dark";

type HomeFeatureVisual =
  | { type: "screenshot"; focus?: CbamScreenshotFocus }
  | { type: "supplierWorkflow" }
  | { type: "evidencePack" };

interface CbamFeatureBlockProps {
  id: string;
  namespace: "home.supplierPortal" | "home.calculation" | "home.evidence";
  visual?: HomeFeatureVisual;
  /** @deprecated Use visual={{ type: "screenshot", focus }} */
  focus?: CbamScreenshotFocus;
  variant?: FeatureBlockVariant;
  imageFirst?: boolean;
  bulletCount?: number;
}

const sectionClass: Record<FeatureBlockVariant, string> = {
  light: "section-light",
  dark: "section-dark-band",
};

const motifVariant: Record<FeatureBlockVariant, "section" | "dark"> = {
  light: "section",
  dark: "dark",
};

export function CbamFeatureBlock({
  id,
  namespace,
  visual,
  focus = "full",
  variant = "light",
  imageFirst = false,
  bulletCount = 5,
}: CbamFeatureBlockProps) {
  const t = useTranslations(namespace);
  const dark = variant === "dark";
  const bulletKeys = Array.from({ length: bulletCount }, (_, i) => `item${i + 1}` as const);
  const resolvedVisual: HomeFeatureVisual =
    visual ??
    (namespace === "home.calculation"
      ? { type: "screenshot", focus }
      : namespace === "home.supplierPortal"
        ? { type: "supplierWorkflow" }
        : { type: "evidencePack" });

  return (
    <FullBleedSection id={id} ariaLabelledby={`${id}-heading`} className={cn(sectionClass[variant], "home-section-compact")}>
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
            "grid min-w-0 items-center gap-6 lg:grid-cols-2 lg:gap-8",
            imageFirst && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
          )}
        >
          <FadeIn staticReveal>
            <SectionHeading
              id={`${id}-heading`}
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
              dark={dark}
              className={sectionHeadSpacing}
            />
            <ul className="mt-5 space-y-2.5">
              {bulletKeys.map((key) => (
                <li key={key} className="flex items-start gap-2.5">
                  <span
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md",
                      dark ? "bg-[#7C3AED]/20 text-[#C4B5FD]" : "bg-[#7C3AED]/10 text-[#7C3AED]"
                    )}
                  >
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  <span
                    className={cn(
                      "text-sm leading-relaxed lg:text-[15px]",
                      dark ? "text-slate-300" : "text-[#475569]"
                    )}
                  >
                    {t(`bullets.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn staticReveal className="relative min-w-0 w-full max-w-full">
            <div className="home-feature-visual-panel">
            {resolvedVisual.type === "screenshot" ? (
              <>
                <div
                  className="pointer-events-none absolute -inset-4 rounded-3xl bg-[radial-gradient(circle,rgba(124,58,237,0.16),transparent_70%)] blur-2xl sm:-inset-6"
                  aria-hidden="true"
                />
                <CbamProductScreenshot
                  focus={resolvedVisual.focus ?? focus}
                  alt={t("screenshotAlt")}
                  size="large"
                  elevated
                  priority={namespace === "home.calculation"}
                  className="relative w-full max-w-full shadow-dashboard-glow"
                />
              </>
            ) : resolvedVisual.type === "supplierWorkflow" ? (
              <SupplierWorkflowPanel namespace="home.supplierPortal" variant={dark ? "dark" : "light"} />
            ) : (
              <EvidencePackPanel namespace="home.evidence" variant={dark ? "dark" : "light"} />
            )}
            </div>
          </FadeIn>
        </div>
      </PageContainer>
      <SectionWaveEdge className={dark ? "opacity-25" : undefined} />
    </FullBleedSection>
  );
}
