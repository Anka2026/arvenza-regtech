"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight, Building2, Calculator, GitBranch, Layers } from "lucide-react";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { FadeIn } from "@/components/ui/fade-in";
import { PageCtaBand } from "@/components/pages/shared/page-cta-band";
import { StatusPill } from "@/components/pages/shared/status-pill";
import { CompanyProductContext } from "@/components/company/company-product-context";
import { CompanyLeadershipSection } from "@/components/company/company-leadership-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SECTION_KEYS = ["whatIs", "whyNow", "whyCbamFirst", "roadmapLogic", "operatedBy"] as const;
const SECTION_ICONS = [Layers, Building2, Calculator, GitBranch, Building2] as const;
const TRUST_KEYS = ["item1", "item2", "item3", "item4", "item5"] as const;
const HERO_CHIP_KEYS = ["item1", "item2", "item3"] as const;
const WHY_NOW_STRIP_KEYS = ["item1", "item2", "item3"] as const;

export function CompanyPage() {
  const t = useTranslations("companyPage");
  const tStatus = useTranslations("nav.status");

  return (
    <div className="corporate-page">
      <FullBleedSection ariaLabelledby="company-heading" className="section-company-hero page-hero-top">
        <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-[0.32]" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full hero-glow-purple blur-3xl" aria-hidden="true" />
        <OrbitWaveMotif variant="hero" showOrbit showWaves />

        <PageContainer className="section-content min-w-0 page-hero-bottom">
          <div className="grid min-w-0 grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-12">
            <div className="min-w-0 max-w-[600px]">
              <FadeIn immediate>
                <p className="eyebrow-pill">{t("eyebrow")}</p>
                <h1 id="company-heading" className="heading-hero-gradient company-hero-heading mt-4 text-balance lg:mt-5">
                  {t("title")}
                </h1>
                <p className="body-lead-hero mt-4 lg:mt-5">{t("description")}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t("heroChipsAriaLabel")}>
                  {HERO_CHIP_KEYS.map((key) => (
                    <li key={key}>
                      <span className="chip-dark company-hero-chip">
                        <span className="chip-dot" aria-hidden="true" />
                        {t(`heroChips.${key}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>

            <FadeIn immediate direction="none" className="min-w-0 w-full space-y-4">
              <CompanyProductContext />
              <div className="company-fact-panel">
                <p className="company-fact-panel-kicker">{t("factPanel.kicker")}</p>
                <div className="company-fact-grid mt-3">
                  <div className="company-fact-item">
                    <p className="corporate-info-label">{t("cards.productBrand.label")}</p>
                    <p className="company-fact-value">{t("cards.productBrand.title")}</p>
                  </div>
                  <div className="company-fact-item company-fact-item-featured">
                    <p className="corporate-info-label">{t("cards.readyProduct.label")}</p>
                    <p className="company-fact-value">{t("cards.readyProduct.title")}</p>
                    <StatusPill variant="ready" label={tStatus("ready")} className="mt-2" />
                  </div>
                  <div className="company-fact-item">
                    <p className="corporate-info-label">{t("cards.legalOperator.label")}</p>
                    <p className="company-fact-value text-sm leading-snug">{t("cards.legalOperator.title")}</p>
                    <p className="company-fact-detail">{t("cards.legalOperator.kvk")}</p>
                  </div>
                  <div className="company-fact-item">
                    <p className="corporate-info-label">{t("cards.roadmapLogic.label")}</p>
                    <p className="company-fact-value text-sm leading-snug">{t("cards.roadmapLogic.title")}</p>
                  </div>
                </div>
                <Link
                  href="/platform/cbam"
                  className={cn(
                    buttonVariants({ variant: "accent-outline", size: "sm" }),
                    "mt-4 inline-flex w-full justify-center sm:w-auto"
                  )}
                >
                  {t("factPanel.cta")}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </PageContainer>
        <SectionWaveEdge className="opacity-45" />
      </FullBleedSection>

      <FullBleedSection className="section-light company-section-narrative page-end-cap">
        <OrbitWaveMotif variant="section" orbitAlign="left" />
        <PageContainer className="section-content min-w-0 page-section-y">
          <FadeIn staticReveal>
            <article className="company-why-now-panel">
              <div className="company-why-now-panel-glow" aria-hidden="true" />
              <div className="relative">
                <div className="corporate-section-icon">
                  <Building2 className="h-[18px] w-[18px] text-[#7c3aed]" aria-hidden="true" />
                </div>
                <h2 className="mt-3 text-[clamp(1.25rem,1.75vw+0.5rem,1.75rem)] font-bold tracking-[-0.02em] text-[#071225]">
                  {t("whyArvenzaNow.title")}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                  {t("whyArvenzaNow.body")}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={t("whyArvenzaNow.stripAriaLabel")}>
                  {WHY_NOW_STRIP_KEYS.map((key) => (
                    <li key={key}>
                      <span className="corporate-trust-chip company-trust-chip-strong">{t(`whyArvenzaNow.strip.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </FadeIn>

          <FadeIn staticReveal delay={0.04}>
            <article className="corporate-section-card corporate-section-card-featured mt-5">
              <div className="corporate-section-icon">
                <Building2 className="h-[18px] w-[18px] text-[#7c3aed]" aria-hidden="true" />
              </div>
              <h2 className="mt-3 text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">
                {t("operatorTeam.title")}
              </h2>
              <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                {t("operatorTeam.body")}
              </p>
              <div className="company-operator-card mt-4">
                <p className="corporate-info-label">{t("operatorTeam.operatorLabel")}</p>
                <p className="mt-1 text-base font-semibold text-[#071225]">{t("operatorTeam.operatorName")}</p>
                <p className="mt-0.5 text-sm text-[#64748b]">{t("operatorTeam.operatorCountry")}</p>
                <p className="mt-1 text-sm font-medium text-[#475569]">{t("operatorTeam.operatorKvk")}</p>
                <p className="company-operator-clarifier mt-3">{t("operatorTeam.clarifier")}</p>
              </div>
            </article>
          </FadeIn>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:mt-6">
            {SECTION_KEYS.map((key, i) => {
              const Icon = SECTION_ICONS[i];
              const featured = key === "whatIs";
              return (
                <FadeIn key={key} staticReveal delay={0.06 + i * 0.03}>
                  <article
                    className={cn(
                      "corporate-section-card h-full",
                      featured && "corporate-section-card-featured md:col-span-2"
                    )}
                  >
                    <div className="corporate-section-icon">
                      <Icon className="h-[18px] w-[18px] text-[#7c3aed]" aria-hidden="true" />
                    </div>
                    <h2 className="mt-3 text-base font-semibold leading-snug text-[#071225] lg:text-[17px]">
                      {t(`sections.${key}.title`)}
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                      {t(`sections.${key}.body`)}
                    </p>
                  </article>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn staticReveal delay={0.12}>
            <div className="company-trust-strip page-stack-gap" aria-label={t("trust.ariaLabel")}>
              <p className="company-trust-strip-title">{t("trust.title")}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {TRUST_KEYS.map((key) => (
                  <li key={key}>
                    <span className="corporate-trust-chip">{t(`trust.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <div className="page-stack-gap">
            <CompanyLeadershipSection />
          </div>

          <div className="page-stack-gap">
            <PageCtaBand
              title={t("cta.title")}
              description={t("cta.body")}
              primaryLabel={t("cta.primary")}
              primaryHref="/platform/cbam"
              secondaryLabel={t("cta.secondary")}
              secondaryHref="/demo"
            />
          </div>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>
    </div>
  );
}
