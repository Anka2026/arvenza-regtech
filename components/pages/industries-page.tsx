"use client";

import {
  ArrowLeftRight,
  Car,
  Cpu,
  Factory,
  Package,
  Sprout,
  Workflow,
} from "lucide-react";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { PageCtaBand } from "@/components/pages/shared/page-cta-band";
import { IndustrySectorCard } from "@/components/industries/industry-sector-card";
import { IndustryStrategyVisual } from "@/components/industries/industry-strategy-visual";
import { useTranslations } from "next-intl";

const HERO_CHIP_KEYS = ["item1", "item2", "item3"] as const;

const INDUSTRY_CONFIG = [
  {
    key: "steelAluminium" as const,
    icon: Factory,
    capabilities: [{ productKey: "cbamEngine" as const, status: "ready" as const }],
  },
  {
    key: "automotive" as const,
    icon: Car,
    capabilities: [
      { productKey: "cbamEngine" as const, status: "ready" as const },
      { productKey: "dpp" as const, status: "comingSoon" as const },
    ],
  },
  {
    key: "packagingFmcg" as const,
    icon: Package,
    capabilities: [{ productKey: "ppwr" as const, status: "pilot" as const }],
  },
  {
    key: "electronicsBatteries" as const,
    icon: Cpu,
    capabilities: [{ productKey: "dpp" as const, status: "comingSoon" as const }],
  },
  {
    key: "agricultureFood" as const,
    icon: Sprout,
    capabilities: [
      { productKey: "agriClimate" as const, status: "pilot" as const },
      { productKey: "eudr" as const, status: "comingSoon" as const },
    ],
  },
  {
    key: "importersExporters" as const,
    icon: ArrowLeftRight,
    capabilities: [
      { productKey: "cbamEngine" as const, status: "ready" as const },
      { productKey: "cbamConsole" as const, status: "pilot" as const },
    ],
  },
];

export function IndustriesPage() {
  const t = useTranslations("industriesPage");

  return (
    <>
      <FullBleedSection
        ariaLabelledby="industries-heading"
        className="section-industries-hero page-hero-top"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-[0.34]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.16),transparent_70%)] blur-3xl"
          aria-hidden="true"
        />
        <OrbitWaveMotif variant="hero" showOrbit showWaves />

        <PageContainer className="section-content min-w-0 page-hero-bottom">
          <div className="grid min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
            <FadeIn immediate>
              <SectionHeading
                id="industries-heading"
                eyebrow={t("eyebrow")}
                title={t("title")}
                description={t("description")}
              />
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t("heroChipsAriaLabel")}>
                {HERO_CHIP_KEYS.map((key) => (
                  <li key={key}>
                    <span className="chip-dark industry-hero-chip">
                      <span className="chip-dot" aria-hidden="true" />
                      {t(`heroChips.${key}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn immediate direction="none" className="min-w-0 w-full">
              <IndustryStrategyVisual />
            </FadeIn>
          </div>
        </PageContainer>
        <SectionWaveEdge className="opacity-45" />
      </FullBleedSection>

      <FullBleedSection className="section-light industries-section-grid">
        <OrbitWaveMotif variant="section" orbitAlign="left" />
        <PageContainer className="section-content min-w-0 page-section-y">
          <FadeIn>
            <div className="industry-segment-head">
              <span className="industry-segment-badge">{t("sectors.label")}</span>
              <h2 className="mt-3 text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">
                {t("sectors.title")}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                {t("sectors.description")}
              </p>
            </div>
          </FadeIn>

          <div className="industry-grid mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {INDUSTRY_CONFIG.map(({ key, icon, capabilities }, i) => (
              <FadeIn key={key} delay={0.03 + i * 0.02}>
                <IndustrySectorCard industryKey={key} icon={icon} capabilities={capabilities} />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.12}>
            <div className="industry-evidence-strip mt-10 lg:mt-12">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-8">
                <div className="industry-evidence-strip-icon" aria-hidden="true">
                  <Workflow className="h-5 w-5 text-[#7c3aed]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">
                    {t("evidenceStrip.title")}
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                    {t("evidenceStrip.description")}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="mt-12 lg:mt-14">
            <PageCtaBand
              title={t("cta.title")}
              primaryLabel={t("cta.primary")}
              primaryHref="/demo"
              secondaryLabel={t("cta.secondary")}
              secondaryHref="/platform/cbam"
            />
          </div>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>
    </>
  );
}
