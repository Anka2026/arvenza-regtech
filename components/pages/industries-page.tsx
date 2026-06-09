"use client";

import { useTranslations } from "next-intl";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { PageCtaBand } from "@/components/pages/shared/page-cta-band";

const INDUSTRY_KEYS = [
  "steelAluminium",
  "packagingFmcg",
  "automotive",
  "electronicsBatteries",
  "agricultureFood",
  "importersExporters",
] as const;

export function IndustriesPage() {
  const t = useTranslations("industriesPage");

  return (
    <>
      <FullBleedSection ariaLabelledby="industries-heading" className="section-hero-light pt-24 lg:pt-28">
        <PageContainer className="section-content pb-10">
          <FadeIn>
            <SectionHeading
              id="industries-heading"
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
            />
          </FadeIn>
        </PageContainer>
      </FullBleedSection>

      <FullBleedSection className="section-light pb-14 lg:pb-16">
        <PageContainer className="section-content">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRY_KEYS.map((key, i) => (
              <FadeIn key={key} delay={i * 0.03}>
                <div className="card-premium h-full p-6">
                  <h3 className="text-base font-semibold text-[#071225] lg:text-lg">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#7c3aed]">
                    {t(`items.${key}.focus`)}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#64748b]">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-14">
            <PageCtaBand
              title={t("cta.title")}
              primaryLabel={t("cta.primary")}
              primaryHref="/demo"
            />
          </div>
        </PageContainer>
      </FullBleedSection>
    </>
  );
}
