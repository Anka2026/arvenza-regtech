"use client";

import { useTranslations } from "next-intl";
import { Building2, Layers, Scale, Workflow } from "lucide-react";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif } from "@/components/home/orbit-wave-motif";
import { FadeIn } from "@/components/ui/fade-in";
import { PageCtaBand } from "@/components/pages/shared/page-cta-band";

const SECTION_KEYS = ["whatIs", "experience", "operator", "legal"] as const;
const SECTION_ICONS = [Layers, Workflow, Building2, Scale] as const;

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
                <div className="corporate-info-card corporate-info-card-featured">
                  <p className="corporate-info-label">{t("cards.flagship.label")}</p>
                  <p className="corporate-info-title">{t("cards.flagship.title")}</p>
                  <span className="corporate-info-badge">{t("cards.flagship.badge")}</span>
                </div>
                <div className="corporate-info-card">
                  <p className="corporate-info-label">{t("cards.platform.label")}</p>
                  <p className="corporate-info-title">{t("cards.platform.title")}</p>
                </div>
                <div className="corporate-info-card corporate-info-card-row">
                  <div>
                    <p className="corporate-info-label">{t("cards.operator.label")}</p>
                    <p className="corporate-info-title">{t("cards.operator.title")}</p>
                    <p className="corporate-info-detail">{t("cards.operator.detail")}</p>
                  </div>
                  <div className="corporate-info-kvk">
                    <p className="corporate-info-label">{t("cards.registry.label")}</p>
                    <p className="corporate-info-title">{t("cards.registry.title")}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </PageContainer>
      </FullBleedSection>

      <FullBleedSection className="section-light py-12 lg:py-14">
        <PageContainer className="section-content">
          <FadeIn>
            <h2 className="heading-section-compact max-w-3xl">{t("sectionsTitle")}</h2>
          </FadeIn>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:gap-5">
            {SECTION_KEYS.map((key, i) => {
              const Icon = SECTION_ICONS[i];
              return (
                <FadeIn key={key} delay={i * 0.04}>
                  <article className="corporate-section-card">
                    <div className="corporate-section-icon">
                      <Icon className="h-[18px] w-[18px] text-[#7c3aed]" aria-hidden="true" />
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-[#071225] lg:text-[17px]">
                      {t(`sections.${key}.title`)}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                      {t(`sections.${key}.body`)}
                    </p>
                  </article>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.12}>
            <div className="corporate-legal-note mt-8">
              <p>{t("legalNote")}</p>
            </div>
          </FadeIn>

          <div className="mt-10 lg:mt-12">
            <PageCtaBand
              title={t("cta.title")}
              primaryLabel={t("cta.primary")}
              primaryHref="/demo"
              secondaryLabel={t("cta.secondary")}
              secondaryHref="/platform/cbam"
            />
          </div>
        </PageContainer>
      </FullBleedSection>
    </div>
  );
}
