"use client";

import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  BarChart3,
  Check,
  Fingerprint,
  LayoutDashboard,
  Package,
  Sprout,
  TreePine,
  Users,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { ProductScreenshot } from "@/components/ui/product-screenshot";
import { StatusPill } from "@/components/pages/shared/status-pill";
import { PageCtaBand } from "@/components/pages/shared/page-cta-band";
import { buttonVariants } from "@/components/ui/button";
import type { PlatformModuleDefinition } from "@/lib/platform-modules";
import { cn } from "@/lib/utils";

const MODULE_ICONS = {
  cbamComplianceConsole: LayoutDashboard,
  ppwr: Package,
  agriClimate: Sprout,
  eudr: TreePine,
  dpp: Fingerprint,
  supplierEvidence: Users,
  esgReporting: BarChart3,
} as const;

const CAPABILITY_KEYS = ["item1", "item2", "item3", "item4"] as const;
const WORKFLOW_KEYS = ["step1", "step2", "step3", "step4"] as const;
const USE_CASE_KEYS = ["item1", "item2", "item3"] as const;
const CHIP_KEYS = ["item1", "item2", "item3"] as const;

interface PlatformModulePageProps {
  module: PlatformModuleDefinition;
}

export function PlatformModulePage({ module }: PlatformModulePageProps) {
  const t = useTranslations(`platformModules.${module.i18nKey}`);
  const tShared = useTranslations("platformModules.shared");
  const tStatus = useTranslations("nav.status");
  const Icon = MODULE_ICONS[module.i18nKey as keyof typeof MODULE_ICONS] ?? LayoutDashboard;

  const isPilot = module.status === "pilot";
  const isComingSoon = module.status === "comingSoon";

  const primaryCtaLabel = isComingSoon
    ? tShared("followRoadmap")
    : isPilot
      ? tShared("discussPilot")
      : tShared("requestDemo");

  const secondaryCtaLabel = isComingSoon ? tShared("requestDemo") : tShared("explorePlatform");

  return (
    <>
      <FullBleedSection
        ariaLabelledby="module-hero-heading"
        className="section-hero-light section-hero-home pt-24 lg:pt-28"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-[0.38]" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full hero-glow-purple blur-3xl" aria-hidden="true" />
        <OrbitWaveMotif variant="hero" showOrbit showWaves />

        <PageContainer className="section-content min-w-0 pb-10 lg:pb-12">
          <FadeIn immediate>
            <Link
              href="/platform"
              className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#64748b] transition-colors hover:text-[#7c3aed]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {tShared("backToPlatform")}
            </Link>
          </FadeIn>

          <div className="grid min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,44%)_minmax(0,56%)] lg:gap-10">
            <div className="min-w-0">
              <FadeIn immediate>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c3aed]/10 ring-1 ring-[#7c3aed]/18">
                    <Icon className="h-5 w-5 text-[#7c3aed]" aria-hidden="true" />
                  </div>
                  {isPilot && <StatusPill variant="pilot" label={tStatus("pilot")} />}
                  {isComingSoon && <StatusPill variant="comingSoon" label={tStatus("comingSoon")} />}
                </div>
                <p className="eyebrow-pill mt-4">{t("eyebrow")}</p>
                <h1 id="module-hero-heading" className="heading-hero-gradient mt-4 text-balance lg:mt-5">
                  {t("title")}
                </h1>
                <p className="body-lead-hero mt-4 lg:mt-5">{t("description")}</p>
              </FadeIn>

              {(isPilot || isComingSoon) && (
                <FadeIn immediate>
                  <p className="mt-4 rounded-xl border border-[#7c3aed]/14 bg-[#7c3aed]/[0.04] px-4 py-3 text-sm leading-relaxed text-[#475569]">
                    {isPilot ? tShared("pilotNotice") : tShared("comingSoonNotice")}
                  </p>
                </FadeIn>
              )}

              <FadeIn immediate>
                <div className="hero-cta-panel mt-6">
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                    <Link
                      href="/demo"
                      className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full sm:w-auto")}
                    >
                      {primaryCtaLabel}
                    </Link>
                    <Link
                      href={isComingSoon ? "/resources" : "/platform"}
                      className={cn(
                        buttonVariants({ variant: "accent-outline", size: "lg" }),
                        "w-full sm:w-auto"
                      )}
                    >
                      {secondaryCtaLabel}
                    </Link>
                  </div>
                </div>
              </FadeIn>

              <FadeIn immediate>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t("chipsAriaLabel")}>
                  {CHIP_KEYS.map((key) => (
                    <li key={key}>
                      <span className="chip-dark">
                        <span className="chip-dot" aria-hidden="true" />
                        {t(`chips.${key}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>

            <FadeIn immediate direction="none" className="min-w-0 w-full">
              <div className="platform-module-hero-visual hero-product-stage relative">
                <div
                  className="pointer-events-none absolute -inset-5 rounded-[2rem] bg-[radial-gradient(circle,rgba(124,58,237,0.18),transparent_68%)] blur-2xl"
                  aria-hidden="true"
                />
                <ProductScreenshot
                  moduleKey={module.key}
                  presentation="hero"
                  alt={t("screenshotAlt")}
                  size="hero"
                  elevated
                  priority
                  className="relative w-full max-w-full shadow-dashboard-glow"
                />
              </div>
            </FadeIn>
          </div>
        </PageContainer>
        <SectionWaveEdge className="opacity-50" />
      </FullBleedSection>

      <FullBleedSection ariaLabelledby="module-positioning-heading" className="section-light home-section-compact">
        <OrbitWaveMotif variant="section" orbitAlign="left" />
        <PageContainer className="section-content">
          <FadeIn>
            <div className="platform-positioning-panel">
              <h2 id="module-positioning-heading" className="text-[clamp(1.125rem,1.5vw+0.5rem,1.5rem)] font-bold tracking-[-0.02em] text-[#071225]">
                {t("positioning.title")}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                {t("positioning.description")}
              </p>
            </div>
          </FadeIn>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>

      <FullBleedSection ariaLabelledby="module-capabilities-heading" className="section-muted home-section-compact">
        <OrbitWaveMotif variant="muted" orbitAlign="right" />
        <PageContainer className="section-content">
          <FadeIn>
            <SectionHeading
              id="module-capabilities-heading"
              eyebrow={tShared("capabilitiesEyebrow")}
              title={t("capabilities.title")}
              description={t("capabilities.description")}
              className="mb-5 lg:mb-6"
            />
          </FadeIn>
          <div className="grid gap-3 sm:grid-cols-2">
            {CAPABILITY_KEYS.map((key, i) => (
              <FadeIn key={key} delay={i * 0.04}>
                <article className="platform-capability-card card-glass flex h-full gap-3 p-4 lg:p-5">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#7c3aed]/10 ring-1 ring-[#7c3aed]/18"
                    aria-hidden="true"
                  >
                    <Check className="h-3 w-3 text-[#7c3aed]" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold leading-snug text-[#071225] lg:text-[15px]">
                      {t(`capabilities.items.${key}.title`)}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#64748b] lg:text-sm">
                      {t(`capabilities.items.${key}.description`)}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>

      <FullBleedSection ariaLabelledby="module-workflow-heading" className="section-light home-section-compact">
        <OrbitWaveMotif variant="section" orbitAlign="center" />
        <PageContainer className="section-content">
          <FadeIn>
            <SectionHeading
              id="module-workflow-heading"
              eyebrow={tShared("workflowEyebrow")}
              title={t("workflow.title")}
              description={t("workflow.description")}
              className="mb-5 lg:mb-6"
            />
          </FadeIn>
          <ol className="platform-workflow-steps list-none">
            {WORKFLOW_KEYS.map((key, index) => (
              <li key={key}>
                <FadeIn delay={index * 0.04}>
                  <article className="platform-workflow-step journey-step-compact">
                    <div className="flex items-start gap-3">
                      <span className="step-badge">{String(index + 1).padStart(2, "0")}</span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold leading-snug text-[#071225] lg:text-[15px]">
                          {t(`workflow.steps.${key}.title`)}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-[#64748b] lg:text-sm">
                          {t(`workflow.steps.${key}.description`)}
                        </p>
                      </div>
                    </div>
                  </article>
                </FadeIn>
              </li>
            ))}
          </ol>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>

      <FullBleedSection ariaLabelledby="module-usecases-heading" className="section-muted home-section-compact page-end-cap">
        <PageContainer className="section-content min-w-0">
          <FadeIn>
            <SectionHeading
              id="module-usecases-heading"
              eyebrow={tShared("useCasesEyebrow")}
              title={t("useCases.title")}
              className="mb-5 lg:mb-6"
            />
          </FadeIn>
          <div className="grid gap-3 lg:grid-cols-3">
            {USE_CASE_KEYS.map((key, i) => (
              <FadeIn key={key} delay={i * 0.04}>
                <article className="card-premium flex h-full flex-col p-5">
                  <h3 className="text-sm font-semibold leading-snug text-[#071225] lg:text-[15px]">
                    {t(`useCases.items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#64748b] lg:text-sm">
                    {t(`useCases.items.${key}.description`)}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>

          <div className="mt-10 lg:mt-12">
            <PageCtaBand
              title={t("cta.title")}
              primaryLabel={primaryCtaLabel}
              primaryHref="/demo"
              secondaryLabel={tShared("backToPlatform")}
              secondaryHref="/platform"
            />
          </div>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>
    </>
  );
}
