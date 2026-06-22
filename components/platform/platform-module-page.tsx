"use client";

import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  BarChart3,
  Check,
  Fingerprint,
  Layers,
  LayoutDashboard,
  Package,
  Sprout,
  TreePine,
  Users,
  Droplets,
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
import {
  isAvailableOnRequestModule,
  isEarlyAccessModule,
  isRoadmapModule,
  moduleStatusNavKey,
  moduleStatusPillVariant,
} from "@/lib/module-status-display";
import { cn } from "@/lib/utils";

const MODULE_ICONS = {
  cbamComplianceConsole: LayoutDashboard,
  ppwr: Package,
  agriClimate: Sprout,
  eudr: TreePine,
  dpp: Fingerprint,
  supplierEvidence: Users,
  esgReporting: BarChart3,
  waterEfficiency: Droplets,
} as const;

const CAPABILITY_KEYS = ["item1", "item2", "item3", "item4", "item5", "item6", "item7"] as const;
const WORKFLOW_KEYS = ["step1", "step2", "step3", "step4", "step5"] as const;
const AUDIENCE_KEYS = ["item1", "item2", "item3", "item4", "item5"] as const;
const OUTPUT_KEYS = ["item1", "item2", "item3", "item4", "item5", "item6"] as const;
const CHIP_KEYS = ["item1", "item2", "item3"] as const;

interface PlatformModulePageProps {
  module: PlatformModuleDefinition;
}

export function PlatformModulePage({ module }: PlatformModulePageProps) {
  const t = useTranslations(`platformModules.${module.i18nKey}`);
  const tShared = useTranslations("platformModules.shared");
  const tStatus = useTranslations("nav.status");
  const Icon = MODULE_ICONS[module.i18nKey as keyof typeof MODULE_ICONS] ?? LayoutDashboard;

  const statusKey = moduleStatusNavKey(module.status);
  const roadmap = isRoadmapModule(module.status);
  const earlyAccess = isEarlyAccessModule(module.status);
  const onRequest = isAvailableOnRequestModule(module.status);

  const primaryCtaLabel = roadmap
    ? tShared("followRoadmap")
    : earlyAccess || onRequest
      ? tShared("requestAccess")
      : tShared("requestDemo");

  const secondaryCtaLabel = roadmap ? tShared("requestDemo") : tShared("viewWorkflow");
  const secondaryHref = roadmap ? "/resources" : "#module-workflow-heading";

  const maturityNotice = roadmap
    ? tShared("roadmapNotice")
    : onRequest
      ? tShared("availableOnRequestNotice")
      : tShared("earlyAccessNotice");

  const whyTitle = t.has("why.title")
    ? t("why.title")
    : t.has("positioning.title")
      ? t("positioning.title")
      : "";
  const whyDescription = t.has("why.description")
    ? t("why.description")
    : t.has("positioning.description")
      ? t("positioning.description")
      : "";
  const audienceTitle = t.has("audience.title")
    ? t("audience.title")
    : t.has("useCases.title")
      ? t("useCases.title")
      : "";
  const layerKeys = {
    supplierEvidence: tShared("architectureLayers.supplierEvidence"),
    productData: tShared("architectureLayers.productData"),
    calculationMethodology: tShared("architectureLayers.calculationMethodology"),
    documentationReporting: tShared("architectureLayers.documentationReporting"),
  };
  const architectureLayerKey = t.has("architecture.layerKey")
    ? (t("architecture.layerKey") as keyof typeof layerKeys)
    : "documentationReporting";
  const showArchitectureSection = module.showArchitectureSection !== false;

  return (
    <div className="platform-module-page">
      <FullBleedSection
        ariaLabelledby="module-hero-heading"
        className="section-hero-light section-hero-home page-hero-top"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-[0.38]" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full hero-glow-purple blur-3xl" aria-hidden="true" />
        <OrbitWaveMotif variant="hero" showOrbit showWaves />

        <PageContainer className="section-content min-w-0 page-hero-bottom">
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
                  <StatusPill
                    variant={moduleStatusPillVariant(module.status)}
                    label={tStatus(statusKey)}
                  />
                </div>
                <p className="eyebrow-pill mt-4">{t("eyebrow")}</p>
                {t.has("category") && (
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#64748b]">
                    {t("category")}
                  </p>
                )}
                <h1 id="module-hero-heading" className="heading-hero-gradient mt-3 text-balance lg:mt-4">
                  {t("title")}
                </h1>
                <p className="body-lead-hero mt-4 lg:mt-5">{t("description")}</p>
              </FadeIn>

              {(roadmap || earlyAccess || onRequest) && (
                <FadeIn immediate>
                  <p className="mt-4 rounded-xl border border-[#7c3aed]/14 bg-[#7c3aed]/[0.04] px-4 py-3 text-sm leading-relaxed text-[#475569]">
                    {maturityNotice}
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
                      href={secondaryHref}
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
                {module.key === "waterEfficiency" && t.has("interfaceLanguageNote") && (
                  <p className="product-interface-language-note mt-3">{t("interfaceLanguageNote")}</p>
                )}
              </div>
            </FadeIn>
          </div>
        </PageContainer>
        <SectionWaveEdge className="opacity-50" />
      </FullBleedSection>

      <FullBleedSection ariaLabelledby="module-why-heading" className="section-light home-section-compact">
        <PageContainer className="section-content">
          <FadeIn>
            <SectionHeading
              id="module-why-heading"
              eyebrow={tShared("whyEyebrow")}
              title={whyTitle}
              description={whyDescription}
              className="mb-0"
            />
          </FadeIn>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>

      <FullBleedSection ariaLabelledby="module-capabilities-heading" className="section-muted home-section-compact">
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
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITY_KEYS.map((key, i) => {
              if (!t.has(`capabilities.items.${key}.title`)) return null;
              return (
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
              );
            })}
          </div>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>

      <FullBleedSection
        id="module-workflow-heading"
        ariaLabelledby="module-workflow-title"
        className="section-light home-section-compact"
      >
        <PageContainer className="section-content">
          <FadeIn>
            <SectionHeading
              id="module-workflow-title"
              eyebrow={tShared("workflowEyebrow")}
              title={t("workflow.title")}
              description={t("workflow.description")}
              className="mb-5 lg:mb-6"
            />
          </FadeIn>
          <ol className="platform-workflow-steps list-none">
            {WORKFLOW_KEYS.map((key, index) => {
              if (!t.has(`workflow.steps.${key}.title`)) return null;
              return (
                <li key={key}>
                  <FadeIn delay={index * 0.04}>
                    <article className="platform-workflow-step journey-step-compact">
                      <div className="flex items-start gap-3">
                        <span className="step-badge">{String(index + 1).padStart(2, "0")}</span>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold leading-snug text-[#071225] lg:text-[15px]">
                            {t(`workflow.steps.${key}.title`)}
                          </h3>
                          {t.has(`workflow.steps.${key}.description`) && (
                            <p className="mt-1.5 text-xs leading-relaxed text-[#64748b] lg:text-sm">
                              {t(`workflow.steps.${key}.description`)}
                            </p>
                          )}
                        </div>
                      </div>
                    </article>
                  </FadeIn>
                </li>
              );
            })}
          </ol>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>

      <FullBleedSection ariaLabelledby="module-audience-heading" className="section-muted home-section-compact">
        <PageContainer className="section-content">
          <FadeIn>
            <SectionHeading
              id="module-audience-heading"
              eyebrow={tShared("audienceEyebrow")}
              title={audienceTitle}
              className="mb-5 lg:mb-6"
            />
          </FadeIn>
          <div className="grid gap-3 lg:grid-cols-3">
            {AUDIENCE_KEYS.map((key, i) => {
              const audienceTitleKey = `audience.items.${key}.title`;
              const useCaseTitleKey = `useCases.items.${key}.title`;
              const hasTitle = t.has(audienceTitleKey) || t.has(useCaseTitleKey);
              if (!hasTitle) return null;

              const title = t.has(audienceTitleKey)
                ? t(audienceTitleKey)
                : t(useCaseTitleKey);
              const audienceDescKey = `audience.items.${key}.description`;
              const useCaseDescKey = `useCases.items.${key}.description`;
              const description = t.has(audienceDescKey)
                ? t(audienceDescKey)
                : t.has(useCaseDescKey)
                  ? t(useCaseDescKey)
                  : null;

              return (
                <FadeIn key={key} delay={i * 0.04}>
                  <article className="card-premium flex h-full flex-col p-4">
                    <h3 className="text-sm font-semibold leading-snug text-[#071225] lg:text-[15px]">
                      {title}
                    </h3>
                    {description && (
                      <p className="mt-2 text-xs leading-relaxed text-[#64748b] lg:text-sm">
                        {description}
                      </p>
                    )}
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>

      {t.has("outputs.title") && (
        <FullBleedSection ariaLabelledby="module-outputs-heading" className="section-light home-section-compact">
          <PageContainer className="section-content">
            <FadeIn>
              <SectionHeading
                id="module-outputs-heading"
                eyebrow={tShared("outputsEyebrow")}
                title={t("outputs.title")}
                description={t.has("outputs.description") ? t("outputs.description") : undefined}
                className="mb-5 lg:mb-6"
              />
            </FadeIn>
            <div className="grid gap-3 lg:grid-cols-3">
              {OUTPUT_KEYS.map((key, i) => {
                if (!t.has(`outputs.items.${key}.title`)) return null;
                return (
                  <FadeIn key={key} delay={i * 0.04}>
                    <article className="card-glass flex h-full flex-col p-4 lg:p-5">
                      <h3 className="text-sm font-semibold leading-snug text-[#071225] lg:text-[15px]">
                        {t(`outputs.items.${key}.title`)}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#64748b] lg:text-sm">
                        {t(`outputs.items.${key}.description`)}
                      </p>
                    </article>
                  </FadeIn>
                );
              })}
            </div>
          </PageContainer>
          <SectionWaveEdge />
        </FullBleedSection>
      )}

      {showArchitectureSection && t.has("architecture.title") && (
        <FullBleedSection ariaLabelledby="module-architecture-heading" className="section-muted home-section-compact">
          <PageContainer className="section-content">
            <FadeIn>
              <div className="platform-architecture-module-panel">
                <div className="flex items-start gap-3">
                  <div className="icon-accent-wrap shrink-0">
                    <Layers className="h-[19px] w-[19px] text-[#7c3aed]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7c3aed]">
                      {tShared("architectureEyebrow")}
                    </p>
                    <h2
                      id="module-architecture-heading"
                      className="mt-2 text-[clamp(1.125rem,1.5vw+0.5rem,1.5rem)] font-bold tracking-[-0.02em] text-[#071225]"
                    >
                      {t("architecture.title")}
                    </h2>
                    {t.has("architecture.description") && (
                      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                        {t("architecture.description")}
                      </p>
                    )}
                  </div>
                </div>
                <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="platform-architecture-fact card-glass p-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#64748b]">
                      {tShared("architectureLayerLabel")}
                    </dt>
                    <dd className="mt-1.5 text-sm font-semibold text-[#071225]">
                      {layerKeys[architectureLayerKey] ?? layerKeys.documentationReporting}
                    </dd>
                  </div>
                  {t.has("architecture.dataStructured") && (
                    <div className="platform-architecture-fact card-glass p-4">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#64748b]">
                        {tShared("architectureDataLabel")}
                      </dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-[#475569]">
                        {t("architecture.dataStructured")}
                      </dd>
                    </div>
                  )}
                  {t.has("architecture.evidenceManaged") && (
                    <div className="platform-architecture-fact card-glass p-4">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#64748b]">
                        {tShared("architectureEvidenceLabel")}
                      </dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-[#475569]">
                        {t("architecture.evidenceManaged")}
                      </dd>
                    </div>
                  )}
                  {t.has("architecture.outputSupported") && (
                    <div className="platform-architecture-fact card-glass p-4">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#64748b]">
                        {tShared("architectureOutputLabel")}
                      </dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-[#475569]">
                        {t("architecture.outputSupported")}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </FadeIn>
          </PageContainer>
          <SectionWaveEdge />
        </FullBleedSection>
      )}

      <FullBleedSection ariaLabelledby="module-cta-heading" className="section-light home-section-compact page-end-cap">
        <PageContainer className="section-content min-w-0">
          <div className="mt-2">
            <PageCtaBand
              title={t("cta.title")}
              primaryLabel={primaryCtaLabel}
              primaryHref="/demo"
              secondaryLabel={tShared("exploreProduct")}
              secondaryHref="/platform"
            />
          </div>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>
    </div>
  );
}
