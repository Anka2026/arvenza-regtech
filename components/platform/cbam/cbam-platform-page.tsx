"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { FadeIn } from "@/components/ui/fade-in";
import { CbamProductShowcase } from "@/components/platform/cbam/cbam-product-showcase";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/home/section-heading";
import { ProductFeatureSection } from "@/components/platform/cbam/product-feature-section";
import { ComplianceControlPanel } from "@/components/platform/cbam/product-ui-compositions";
import { CBAM_JOURNEY_STEP_KEYS } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { Mail, Calculator, FileCheck, Factory, Users, Building2, Truck, ShieldCheck, Check } from "lucide-react";

const chipKeys = ["item1", "item2", "item3", "item4"] as const;
const trustBulletKeys = ["item1", "item2", "item3", "item4"] as const;
const challengeKeys = ["item1", "item2", "item3"] as const;
const challengeIcons = [Mail, Calculator, FileCheck];
const complianceToolKeys = ["item1", "item2", "item3", "item4"] as const;
const audienceKeys = ["item1", "item2", "item3", "item4"] as const;
const audienceIcons = [Factory, Users, Building2, Truck];
const faqKeys = ["item1", "item2", "item3", "item4"] as const;

export function CbamPlatformPage() {
  const t = useTranslations("cbamPlatform");

  return (
    <div className="cbam-platform-page">
      <section aria-labelledby="cbam-hero-heading" className="section-hero-light">
        <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-[0.35]" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full hero-glow-purple blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-16 bottom-8 h-64 w-64 rounded-full hero-glow-cyan blur-3xl" aria-hidden="true" />
        <OrbitWaveMotif variant="hero" showOrbit showWaves />

        <PageContainer className="section-content min-w-0 page-hero-bottom page-hero-top">
          <div className="grid w-full min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="min-w-0 max-w-[540px]">
              <FadeIn immediate>
                <p className="eyebrow-pill">{t("hero.eyebrow")}</p>
              </FadeIn>
              <FadeIn immediate>
                <h1 id="cbam-hero-heading" className="heading-hero-gradient mt-4 text-balance lg:mt-5">
                  {t("hero.title")}
                </h1>
              </FadeIn>
              <FadeIn immediate>
                <p className="body-lead-hero mt-4 lg:mt-5">{t("hero.description")}</p>
              </FadeIn>
              <FadeIn immediate>
                <ul className="mt-5 space-y-2" aria-label={t("hero.trustBulletsAriaLabel")}>
                  {trustBulletKeys.map((key) => (
                    <li key={key} className="flex items-start gap-2.5 text-sm text-[#475569]">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#7c3aed]/10 ring-1 ring-[#7c3aed]/18"
                        aria-hidden="true"
                      >
                        <Check className="h-3 w-3 text-[#7c3aed]" />
                      </span>
                      <span>{t(`hero.trustBullets.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
              <FadeIn immediate>
                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/demo"
                    className={cn(buttonVariants({ variant: "default", size: "default" }), "w-full sm:w-auto")}
                  >
                    {t("hero.ctaPrimary")}
                  </Link>
                  <a
                    href="#workflow"
                    className={cn(
                      buttonVariants({ variant: "accent-outline", size: "default" }),
                      "w-full sm:w-auto"
                    )}
                  >
                    {t("hero.ctaSecondary")}
                  </a>
                </div>
              </FadeIn>
              <FadeIn immediate>
                <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={t("hero.chipsAriaLabel")}>
                  {chipKeys.map((key) => (
                    <li key={key}>
                      <span className="chip-dark">
                        <span className="chip-dot" aria-hidden="true" />
                        {t(`hero.chips.${key}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>

            <FadeIn immediate direction="none" className="relative flex min-w-0 w-full justify-center lg:justify-end">
              <CbamProductShowcase
                variant="hero"
                focus="full"
                alt={t("hero.screenshotAlt")}
                priority
                className="w-full"
              />
            </FadeIn>
          </div>
        </PageContainer>
        <SectionWaveEdge className="opacity-40" />
      </section>

      <FullBleedSection id="challenge" ariaLabelledby="cbam-challenge-heading" className="section-light cbam-section">
        <OrbitWaveMotif variant="section" orbitAlign="left" />
        <PageContainer className="section-content">
          <FadeIn>
            <SectionHeading
              id="cbam-challenge-heading"
              title={t("challenge.title")}
              description={t("challenge.description")}
              className="mb-4 lg:mb-5"
            />
          </FadeIn>
          <div className="grid gap-3 lg:grid-cols-3">
            {challengeKeys.map((key, i) => {
              const Icon = challengeIcons[i];
              return (
                <FadeIn key={key} delay={i * 0.04}>
                  <article className="card-glass card-risk flex h-full flex-col p-4 lg:p-5">
                    <div className="icon-accent-wrap mb-2.5">
                      <Icon className="h-[17px] w-[17px] text-[#7c3aed]" aria-hidden="true" />
                    </div>
                    <h3 className="text-[15px] font-semibold leading-snug text-[#071225]">
                      {t(`challenge.items.${key}.title`)}
                    </h3>
                    <p className="body-sm mt-1.5 text-[13px] leading-snug">
                      {t(`challenge.items.${key}.description`)}
                    </p>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>

      <FullBleedSection id="workflow" ariaLabelledby="cbam-workflow-heading" className="section-muted cbam-section">
        <OrbitWaveMotif variant="muted" orbitAlign="center" />
        <PageContainer className="section-content">
          <FadeIn>
            <SectionHeading
              id="cbam-workflow-heading"
              eyebrow={t("workflow.eyebrow")}
              title={t("workflow.title")}
              description={t("workflow.description")}
              className="mb-4 lg:mb-5"
            />
          </FadeIn>
          <ol className="cbam-workflow-grid grid list-none gap-2 sm:grid-cols-2 lg:gap-2.5">
            {CBAM_JOURNEY_STEP_KEYS.map((key, index) => (
              <li key={key}>
                <article className="cbam-workflow-step h-full rounded-lg border border-[#dde5f2]/80 bg-white/90 px-3 py-3 shadow-card ring-1 ring-[#dde5f2]/50">
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[#7c3aed] to-[#2563eb] text-[10px] font-bold tabular-nums text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[13px] font-semibold leading-snug text-[#071225]">
                        {t(`workflow.steps.${key}.name`)}{" "}
                        <span className="font-medium text-[#64748b]">
                          — {t(`workflow.steps.${key}.subtitle`)}
                        </span>
                      </h3>
                      <p className="mt-1 text-xs leading-snug text-[#475569] line-clamp-2">
                        {t(`workflow.steps.${key}.customer`)}
                      </p>
                      <p className="mt-1.5 text-[10px] leading-snug text-[#64748b]">
                        <span className="font-semibold uppercase tracking-[0.1em] text-[#7c3aed]">
                          {t("workflow.platformLabel")}
                        </span>
                        {" · "}
                        {t(`workflow.steps.${key}.platform`)}
                      </p>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>

          <FadeIn delay={0.1}>
            <aside
              aria-labelledby="cbam-compliance-tool-heading"
              className="mt-5 rounded-xl border border-[#7c3aed]/12 bg-gradient-to-br from-white via-white to-[#7c3aed]/[0.03] p-4 shadow-card lg:mt-6"
            >
              <div className="grid gap-4 lg:grid-cols-[1fr_220px] lg:items-start">
                <div>
                  <div className="flex items-start gap-2.5">
                    <div className="icon-accent-wrap shrink-0 scale-90">
                      <ShieldCheck className="h-[17px] w-[17px] text-[#7c3aed]" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7c3aed]">
                        {t("complianceTool.badge")}
                      </p>
                      <h3
                        id="cbam-compliance-tool-heading"
                        className="mt-1 text-base font-semibold text-[#071225]"
                      >
                        {t("complianceTool.title")}
                      </h3>
                      <p className="mt-1.5 max-w-2xl text-xs leading-snug text-[#64748b] lg:text-[13px]">
                        {t("complianceTool.description")}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                    {complianceToolKeys.map((key) => (
                      <li
                        key={key}
                        className="flex items-start gap-2 rounded-lg bg-[#f8fafc]/80 px-2.5 py-2 ring-1 ring-[#dde5f2]/80"
                      >
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[#7c3aed]" aria-hidden="true" />
                        <span className="text-xs leading-snug text-[#475569]">
                          {t(`complianceTool.items.${key}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <ComplianceControlPanel density="compact" />
              </div>
            </aside>
          </FadeIn>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>

      <ProductFeatureSection
        id="supplier"
        featureKey="supplier"
        visual={{ type: "supplierWorkflow" }}
        variant="light"
        visualScale="compact"
      />
      <ProductFeatureSection
        id="calculation"
        featureKey="calculation"
        visual={{ type: "screenshot", focus: "calculation" }}
        variant="dark"
        imageFirst
        visualScale="featured"
      />
      <ProductFeatureSection
        id="evidence"
        featureKey="evidence"
        visual={{ type: "evidencePack" }}
        variant="light"
        bulletCount={6}
        visualScale="compact"
      />
      <ProductFeatureSection
        id="monitoring"
        featureKey="monitoring"
        visual={{ type: "monitoringKpi" }}
        variant="dark"
        imageFirst
        visualScale="compact"
      />

      <FullBleedSection id="audience" ariaLabelledby="cbam-audience-heading" className="section-light cbam-section">
        <OrbitWaveMotif variant="section" orbitAlign="right" />
        <PageContainer className="section-content">
          <FadeIn>
            <SectionHeading
              id="cbam-audience-heading"
              eyebrow={t("audience.eyebrow")}
              title={t("audience.title")}
              description={t("audience.description")}
              className="mb-4 lg:mb-5"
            />
          </FadeIn>
          <div className="grid gap-3 sm:grid-cols-2">
            {audienceKeys.map((key, i) => {
              const Icon = audienceIcons[i];
              return (
                <FadeIn key={key} delay={i * 0.04}>
                  <article className="card-glass flex h-full items-start gap-3">
                    <div className="icon-accent-wrap shrink-0">
                      <Icon className="h-[19px] w-[19px] text-[#7c3aed]" aria-hidden="true" />
                    </div>
                    <p className="text-[15px] font-semibold leading-snug text-[#071225] lg:text-base">
                      {t(`audience.items.${key}`)}
                    </p>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>

      <FullBleedSection id="faq" ariaLabelledby="cbam-faq-heading" className="section-muted cbam-section">
        <OrbitWaveMotif variant="muted" orbitAlign="center" />
        <PageContainer className="section-content">
          <FadeIn>
            <SectionHeading
              id="cbam-faq-heading"
              eyebrow={t("faq.eyebrow")}
              title={t("faq.title")}
              className="mb-4 lg:mb-5"
            />
          </FadeIn>
          <div className="space-y-2.5">
            {faqKeys.map((key, i) => (
              <FadeIn key={key} delay={i * 0.03}>
                <article className="card-glass p-4 lg:p-5">
                  <h3 className="text-[15px] font-semibold text-[#071225]">
                    {t(`faq.items.${key}.question`)}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-snug text-[#64748b]">
                    {t(`faq.items.${key}.answer`)}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>

      <FullBleedSection ariaLabelledby="cbam-cta-heading" className="section-light cbam-section cbam-section-cta">
        <OrbitWaveMotif variant="cta" orbitAlign="center" />
        <PageContainer className="section-content">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-cta px-6 py-9 shadow-[0_20px_56px_rgba(124,58,237,0.24)] sm:px-10 sm:py-10 lg:px-14 lg:py-11">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.22),transparent_55%)]"
                aria-hidden="true"
              />
              <div className="relative z-10 mx-auto max-w-2xl text-center">
                <h2
                  id="cbam-cta-heading"
                  className="text-[clamp(1.625rem,2.2vw+0.5rem,2.25rem)] font-bold tracking-[-0.03em] text-white"
                >
                  {t("cta.title")}
                </h2>
                <div className="mt-6">
                  <Link
                    href="/demo"
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "lg" }),
                      "w-full border-0 bg-white text-[#071225] shadow-card hover:bg-white/95 sm:w-auto"
                    )}
                  >
                    {t("cta.primary")}
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </PageContainer>
        <SectionWaveEdge className="opacity-30" />
      </FullBleedSection>
    </div>
  );
}
