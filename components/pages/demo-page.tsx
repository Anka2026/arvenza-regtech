"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  Clock,
  FileCheck,
  Layers,
  MonitorPlay,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { FadeIn } from "@/components/ui/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const heroBulletKeys = ["item1", "item2", "item3"] as const;
const heroChipKeys = ["item1", "item2", "item3"] as const;
const previewStepKeys = ["step1", "step2", "step3"] as const;
const previewModuleKeys = ["module1", "module2", "module3"] as const;
const expectationKeys = ["item1", "item2", "item3", "item4"] as const;
const processStepKeys = ["step1", "step2", "step3"] as const;
const coverageKeys = ["engine", "compliance", "platform"] as const;
const audienceKeys = ["item1", "item2", "item3", "item4"] as const;

const expectationIcons = [Layers, MonitorPlay, FileCheck, Sparkles] as const;
const coverageIcons = [Calculator, FileCheck, Layers] as const;
const audienceIcons = [Users, Workflow, Calculator, Sparkles] as const;

export function DemoPage() {
  const t = useTranslations("demo");
  const tCommon = useTranslations("common");

  return (
    <div className="demo-page">
      <FullBleedSection ariaLabelledby="demo-hero-heading" className="section-demo-hero page-hero-top">
        <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-[0.3]" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-20 top-12 h-64 w-64 rounded-full hero-glow-purple blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-10 top-24 h-56 w-56 rounded-full hero-glow-cyan blur-3xl" aria-hidden="true" />
        <OrbitWaveMotif variant="hero" showOrbit showWaves />

        <PageContainer className="section-content min-w-0 page-hero-bottom">
          <div className="grid min-w-0 grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-14">
            <div className="min-w-0 max-w-[580px]">
              <FadeIn immediate>
                <p className="eyebrow-pill">{t("hero.eyebrow")}</p>
              </FadeIn>
              <FadeIn immediate>
                <h1 id="demo-hero-heading" className="heading-hero-gradient mt-4 text-balance lg:mt-5">
                  {t("hero.title")}
                </h1>
              </FadeIn>
              <FadeIn immediate>
                <p className="body-lead-hero mt-4 lg:mt-5">{t("hero.description")}</p>
              </FadeIn>
              <FadeIn immediate>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t("hero.chipsAriaLabel")}>
                  {heroChipKeys.map((key) => (
                    <li key={key}>
                      <span className="chip-dark demo-hero-chip">
                        <span className="chip-dot" aria-hidden="true" />
                        {t(`hero.chips.${key}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
              <FadeIn immediate>
                <ul className="mt-6 space-y-2.5">
                  {heroBulletKeys.map((key) => (
                    <li key={key} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7c3aed]" aria-hidden="true" />
                      <span className="text-sm leading-relaxed text-[#475569] lg:text-[15px]">
                        {t(`hero.bullets.${key}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
              <FadeIn immediate>
                <div className="demo-hero-stat stat-capsule mt-7 max-w-full">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7c3aed]">
                    {t("hero.statLabel")}
                  </span>
                  <span className="text-sm font-medium text-[#071225]">{t("hero.statValue")}</span>
                </div>
              </FadeIn>
            </div>

            <FadeIn immediate direction="none" className="relative mx-auto w-full min-w-0 max-w-[540px] lg:mx-0 lg:max-w-none lg:justify-self-end">
              <div className="demo-preview-stack relative min-w-0 overflow-hidden">
                <div
                  className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle,rgba(124,58,237,0.16),transparent_68%)] blur-2xl"
                  aria-hidden="true"
                />
                <div className="demo-preview-card demo-preview-card-main">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="demo-preview-eyebrow">{t("preview.coreProductBadge")}</p>
                      <p className="demo-preview-title">{t("preview.coreProductTitle")}</p>
                    </div>
                    <span className="demo-preview-pill">{t("preview.status")}</span>
                  </div>
                  <p className="demo-preview-label mt-5">{t("preview.workflowLabel")}</p>
                  <ol className="demo-preview-steps mt-2.5">
                    {previewStepKeys.map((key, index) => (
                      <li key={key} className={cn(index === 1 && "demo-preview-step-active")}>
                        <span className="demo-preview-step-index">{index + 1}</span>
                        <span>{t(`preview.steps.${key}`)}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="demo-preview-card demo-preview-card-float">
                  <p className="demo-preview-label">{t("preview.metricsLabel")}</p>
                  <div className="mt-2 grid grid-cols-1 gap-2 min-[360px]:grid-cols-3">
                    {previewModuleKeys.map((key) => (
                      <div key={key} className="demo-preview-metric">
                        <span className="demo-preview-metric-value">{t(`preview.metrics.${key}.value`)}</span>
                        <span className="demo-preview-metric-label">{t(`preview.metrics.${key}.label`)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="demo-preview-card demo-preview-card-chips">
                  <p className="demo-preview-label">{t("preview.modulesLabel")}</p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {previewModuleKeys.map((key) => (
                      <span key={key} className="demo-preview-chip">
                        {t(`preview.modules.${key}`)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </PageContainer>
        <SectionWaveEdge className="opacity-45" />
      </FullBleedSection>

      <FullBleedSection ariaLabelledby="demo-form-heading" className="section-light demo-section-form">
        <OrbitWaveMotif variant="section" orbitAlign="right" />
        <PageContainer className="section-content min-w-0 page-section-y-tight">
          <FadeIn>
            <div className="demo-form-section-head">
              <h2 id="demo-form-heading" className="heading-section-compact">
                {t("formSection.title")}
              </h2>
              <p className="body-lead mt-3 max-w-2xl">{t("formSection.subtitle")}</p>
            </div>
          </FadeIn>

          <div className="mt-6 grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8 xl:gap-10">
            <FadeIn>
              <div className="demo-form-shell">
                <ContactForm namespace="demo" variant="premium" />
              </div>
              <div className="demo-contact-panel mt-5">
                <div className="demo-contact-panel-icon" aria-hidden="true">
                  <Mail className="h-5 w-5 text-[#7c3aed]" />
                </div>
                <div className="min-w-0">
                  <p className="demo-contact-panel-title">{t("contactPanel.title")}</p>
                  <a
                    href={`mailto:${tCommon("email")}`}
                    className="demo-contact-panel-email"
                  >
                    {tCommon("email")}
                  </a>
                  <p className="demo-contact-panel-note">{t("contactPanel.operatorNote")}</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <aside className="demo-expectations-panel h-full">
                <h3 className="text-lg font-semibold tracking-tight text-[#071225]">
                  {t("expectations.title")}
                </h3>
                <p className="body-sm mt-2">{t("expectations.subtitle")}</p>

                <ul className="mt-6 space-y-3.5">
                  {expectationKeys.map((key, index) => {
                    const Icon = expectationIcons[index];
                    return (
                      <li key={key} className="demo-expectation-item">
                        <div className="demo-expectation-icon">
                          <Icon className="h-4 w-4 text-[#7c3aed]" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#071225]">
                            {t(`expectations.items.${key}.title`)}
                          </p>
                          <p className="mt-0.5 text-[13px] leading-relaxed text-[#64748b]">
                            {t(`expectations.items.${key}.description`)}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="demo-process-block mt-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7c3aed]">
                    {t("expectations.process.title")}
                  </p>
                  <ol className="mt-3 space-y-2.5">
                    {processStepKeys.map((key, index) => (
                      <li key={key} className="demo-process-step">
                        <span className="demo-process-index">{index + 1}</span>
                        <span className="text-sm text-[#475569]">{t(`expectations.process.steps.${key}`)}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="demo-meta-row mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="demo-meta-card">
                    <Clock className="h-4 w-4 text-[#7c3aed]" aria-hidden="true" />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#64748b]">
                        {t("expectations.meta.duration.label")}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-[#071225]">
                        {t("expectations.meta.duration.value")}
                      </p>
                    </div>
                  </div>
                  <div className="demo-meta-card">
                    <MonitorPlay className="h-4 w-4 text-[#7c3aed]" aria-hidden="true" />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#64748b]">
                        {t("expectations.meta.format.label")}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-[#071225]">
                        {t("expectations.meta.format.value")}
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </FadeIn>
          </div>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>

      <FullBleedSection ariaLabelledby="demo-coverage-heading" className="section-muted demo-section-coverage">
        <PageContainer className="section-content min-w-0 page-section-y-tight">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <h2 id="demo-coverage-heading" className="heading-section-compact">
                {t("coverage.title")}
              </h2>
              <p className="body-lead mt-3">{t("coverage.subtitle")}</p>
            </div>
          </FadeIn>
          <div className="mt-6 grid gap-3 md:grid-cols-3 lg:gap-4">
            {coverageKeys.map((key, index) => {
              const Icon = coverageIcons[index];
              return (
                <FadeIn key={key} delay={index * 0.05}>
                  <article className="demo-coverage-card">
                    <div className="demo-coverage-icon">
                      <Icon className="h-[18px] w-[18px] text-[#7c3aed]" aria-hidden="true" />
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-[#071225]">
                      {t(`coverage.items.${key}.title`)}
                    </h3>
                    <p className="body-sm mt-2">{t(`coverage.items.${key}.description`)}</p>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>

      <FullBleedSection ariaLabelledby="demo-audience-heading" className="section-light demo-section-audience">
        <PageContainer className="section-content min-w-0 page-section-y-tight">
          <FadeIn>
            <div className="demo-audience-band">
              <h2 id="demo-audience-heading" className="text-lg font-semibold tracking-tight text-[#071225] lg:text-xl">
                {t("audience.title")}
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {audienceKeys.map((key, index) => {
                  const Icon = audienceIcons[index];
                  return (
                    <li key={key} className="demo-audience-item">
                      <Icon className="h-4 w-4 shrink-0 text-[#7c3aed]" aria-hidden="true" />
                      <span className="copy-safe">{t(`audience.items.${key}`)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </FadeIn>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>

      <FullBleedSection ariaLabelledby="demo-cta-heading" className="section-light demo-section-cta page-end-cap">
        <OrbitWaveMotif variant="cta" orbitAlign="center" />
        <PageContainer className="section-content min-w-0">
          <FadeIn>
            <div className="demo-cta-band premium-cta-band relative overflow-hidden rounded-[1.75rem] px-8 py-10 sm:px-12 sm:py-11 lg:px-14 lg:py-12">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.2),transparent_55%)]"
                aria-hidden="true"
              />
              <div className="relative z-10 flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
                <div className="max-w-2xl">
                  <h2
                    id="demo-cta-heading"
                    className="text-[clamp(1.5rem,2vw+0.5rem,2rem)] font-bold tracking-[-0.03em] text-white"
                  >
                    {t("cta.title")}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/85 lg:text-[15px]">
                    {t("cta.description")}
                  </p>
                </div>
                <Link
                  href="#demo-form-heading"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "w-full shrink-0 border-0 bg-white text-[#071225] shadow-card hover:bg-white/95 sm:w-auto"
                  )}
                >
                  {t("cta.primary")}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </PageContainer>
        <SectionWaveEdge className="opacity-35" />
      </FullBleedSection>
    </div>
  );
}
