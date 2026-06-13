"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { PageCtaBand } from "@/components/pages/shared/page-cta-band";
import { StatusPill } from "@/components/pages/shared/status-pill";
import { PlatformArchitectureDiagram } from "@/components/platform/platform-architecture-diagram";
import { PlatformExpansionStrip } from "@/components/platform/platform-expansion-strip";
import { CbamProductScreenshot } from "@/components/ui/cbam-product-screenshot";
import { buttonVariants } from "@/components/ui/button";
import { PLATFORM_READY_MODULE } from "@/lib/platform-modules";
import { cn } from "@/lib/utils";

const ARCHITECTURE_LAYER_KEYS = [
  "supplierEvidence",
  "productData",
  "calculationMethodology",
  "documentationReporting",
] as const;

const HERO_CHIP_KEYS = ["item1", "item2", "item3"] as const;

export function PlatformHubPage() {
  const t = useTranslations("platformHub");
  const tStatus = useTranslations("nav.status");

  return (
    <>
      <FullBleedSection ariaLabelledby="platform-heading" className="section-hero-light section-hero-home page-hero-top">
        <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-[0.38]" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-24 top-12 h-80 w-80 rounded-full hero-glow-purple blur-3xl" aria-hidden="true" />
        <OrbitWaveMotif variant="hero" showOrbit showWaves />

        <PageContainer className="section-content min-w-0 page-hero-bottom">
          <div className="grid min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-10 xl:gap-12">
            <div className="min-w-0">
              <FadeIn immediate>
                <SectionHeading
                  id="platform-heading"
                  eyebrow={t("eyebrow")}
                  title={t("title")}
                  description={t("description")}
                />
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t("heroChipsAriaLabel")}>
                  {HERO_CHIP_KEYS.map((key) => (
                    <li key={key}>
                      <span className="chip-dark">
                        <span className="chip-dot" aria-hidden="true" />
                        {t(`heroChips.${key}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>

            <FadeIn immediate direction="none" className="min-w-0 w-full">
              <PlatformArchitectureDiagram />
            </FadeIn>
          </div>
        </PageContainer>
        <SectionWaveEdge className="opacity-50" />
      </FullBleedSection>

      <FullBleedSection className="section-light home-section-compact">
        <OrbitWaveMotif variant="section" orbitAlign="left" />
        <PageContainer className="section-content min-w-0">
          <div
            id="platform-architecture"
            className="platform-architecture-support scroll-mt-28 rounded-[1.25rem] border border-[#7c3aed]/14 bg-gradient-to-br from-[#7c3aed]/[0.04] via-white to-[#2563eb]/[0.03] p-5 sm:rounded-[1.5rem] sm:p-6"
          >
            <h2 className="text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">
              {t("architecture.title")}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
              {t("architecture.supportingBody")}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label={t("architecture.flowAriaLabel")}>
              {ARCHITECTURE_LAYER_KEYS.map((key) => (
                <li key={key}>
                  <span className="platform-flow-chip">{t(`architecture.layers.${key}.title`)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="platform-segment-header mt-8 lg:mt-10">
            <span className="platform-segment-label">{t("sections.ready.label")}</span>
            <h2 className="mt-2 text-[clamp(1.25rem,1.75vw+0.5rem,1.75rem)] font-bold tracking-[-0.02em] text-[#071225]">
              {t("sections.ready.title")}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
              {t("sections.ready.description")}
            </p>
          </div>

          <div className="core-product-showcase relative mt-6 overflow-hidden rounded-[1.25rem] border border-[#2563eb]/22 bg-gradient-to-br from-[#2563eb]/[0.06] via-white to-[#7c3aed]/[0.05] p-5 shadow-card sm:rounded-[1.75rem] sm:p-8 lg:p-10">
            <div className="grid min-w-0 items-center gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
              <div className="min-w-0">
                <div className="flex flex-wrap items-start gap-2.5">
                  <StatusPill variant="coreProduct" label={t("readyModule.badge")} />
                  <StatusPill variant="ready" label={tStatus("ready")} />
                </div>
                <h3 className="mt-5 text-[clamp(1.375rem,2vw+0.5rem,2rem)] font-bold tracking-[-0.03em] text-[#071225]">
                  {t("readyModule.title")}
                </h3>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#64748b] lg:text-lg">
                  {t("readyModule.description")}
                </p>
                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                  <Link
                    href={PLATFORM_READY_MODULE.route}
                    className={cn(
                      buttonVariants({ variant: "default", size: "lg" }),
                      "inline-flex w-full justify-center gap-2 sm:w-auto"
                    )}
                  >
                    {t("readyModule.exploreCta")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/demo"
                    className={cn(buttonVariants({ variant: "accent-outline", size: "lg" }), "w-full justify-center sm:w-auto")}
                  >
                    {t("readyModule.demoCta")}
                  </Link>
                </div>
              </div>
              <div className="hero-product-stage relative min-w-0 w-full max-w-full">
                <div
                  className="pointer-events-none absolute -inset-4 rounded-3xl bg-[radial-gradient(circle,rgba(37,99,235,0.12),transparent_70%)] blur-2xl"
                  aria-hidden="true"
                />
                <CbamProductScreenshot
                  focus="full"
                  alt={t("readyModule.screenshotAlt")}
                  size="large"
                  elevated
                  className="relative w-full max-w-full shadow-dashboard-glow"
                />
              </div>
            </div>
          </div>

          <PlatformExpansionStrip />

          <div className="mt-12 lg:mt-14">
            <PageCtaBand
              title={t("cta.title")}
              primaryLabel={t("cta.primary")}
              primaryHref="/platform/cbam"
              secondaryLabel={t("cta.secondary")}
              secondaryHref="/solutions"
            />
          </div>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>
    </>
  );
}
