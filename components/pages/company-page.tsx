"use client";

import { useTranslations } from "next-intl";
import { Building2, Calculator, Clock, GitBranch, Layers } from "lucide-react";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif } from "@/components/home/orbit-wave-motif";
import { FadeIn } from "@/components/ui/fade-in";
import { PageCtaBand } from "@/components/pages/shared/page-cta-band";

const SECTION_KEYS = ["whatIs", "whyNow", "whyCbamFirst", "roadmapLogic", "operatedBy"] as const;
const SECTION_ICONS = [Layers, Clock, Calculator, GitBranch, Building2] as const;
const TRUST_KEYS = ["item1", "item2", "item3", "item4", "item5"] as const;

export function CompanyPage() {
  const t = useTranslations("companyPage");

  return (
    <div className="corporate-page">
      <FullBleedSection ariaLabelledby="company-heading" className="section-hero-light border-b border-[#dde5f2]/80">
        <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-[0.22]" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full hero-glow-purple blur-3xl" aria-hidden="true" />
        <OrbitWaveMotif variant="hero" showOrbit />

        <PageContainer className="section-content min-w-0 pb-12 pt-24 lg:pb-14 lg:pt-28">
          <div className="grid min-w-0 grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-14">
            <div className="min-w-0 max-w-[600px]">
              <FadeIn immediate>
                <p className="eyebrow-pill">{t("eyebrow")}</p>
              </FadeIn>
              <FadeIn immediate>
                <h1 id="company-heading" className="heading-hero mt-5 text-balance">
                  {t("title")}
                </h1>
              </FadeIn>
              <FadeIn immediate>
                <p className="body-lead-hero mt-5">{t("description")}</p>
              </FadeIn>
            </div>

            <FadeIn immediate direction="none" className="relative mx-auto w-full min-w-0 max-w-[520px] lg:mx-0 lg:max-w-none lg:justify-self-end">
              <div className="corporate-card-stack relative">
                <div
                  className="pointer-events-none absolute -inset-5 rounded-[2rem] bg-[radial-gradient(circle,rgba(124,58,237,0.14),transparent_68%)] blur-2xl"
                  aria-hidden="true"
                />
                <div className="corporate-info-card">
                  <p className="corporate-info-label">{t("cards.productBrand.label")}</p>
                  <p className="corporate-info-title">{t("cards.productBrand.title")}</p>
                </div>
                <div className="corporate-info-card">
                  <p className="corporate-info-label">{t("cards.legalOperator.label")}</p>
                  <p className="corporate-info-title">{t("cards.legalOperator.title")}</p>
                  <p className="corporate-info-detail mt-1">{t("cards.legalOperator.kvk")}</p>
                </div>
                <div className="corporate-info-card corporate-info-card-featured">
                  <p className="corporate-info-label">{t("cards.readyProduct.label")}</p>
                  <p className="corporate-info-title">{t("cards.readyProduct.title")}</p>
                  <span className="corporate-info-badge">{t("cards.readyProduct.status")}</span>
                </div>
                <div className="corporate-info-card">
                  <p className="corporate-info-label">{t("cards.roadmapLogic.label")}</p>
                  <p className="corporate-info-title text-[15px] leading-snug lg:text-base">
                    {t("cards.roadmapLogic.title")}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </PageContainer>
      </FullBleedSection>

      <FullBleedSection className="section-light py-12 lg:py-14">
        <PageContainer className="section-content min-w-0">
          <FadeIn>
            <article className="corporate-section-card corporate-section-card-featured">
              <div className="corporate-section-icon">
                <Layers className="h-[18px] w-[18px] text-[#7c3aed]" aria-hidden="true" />
              </div>
              <h2 className="mt-3 text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">
                {t("sections.whatIs.title")}
              </h2>
              <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                {t("sections.whatIs.body")}
              </p>
            </article>
          </FadeIn>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-6 lg:gap-5">
            {SECTION_KEYS.slice(1).map((key, i) => {
              const Icon = SECTION_ICONS[i + 1];
              return (
                <FadeIn key={key} delay={0.04 + i * 0.04}>
                  <article className="corporate-section-card h-full">
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

          <FadeIn delay={0.12}>
            <div
              className="corporate-trust-strip mt-10 rounded-[1.25rem] border border-[#7c3aed]/16 bg-gradient-to-br from-[#7c3aed]/[0.06] via-white to-[#2563eb]/[0.04] p-5 sm:rounded-[1.5rem] sm:p-6 lg:mt-12 lg:p-8"
              aria-label={t("trust.ariaLabel")}
            >
              <ul className="flex flex-wrap gap-2">
                {TRUST_KEYS.map((key) => (
                  <li key={key}>
                    <span className="corporate-trust-chip">{t(`trust.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <div className="mt-10 lg:mt-12">
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
      </FullBleedSection>
    </div>
  );
}
