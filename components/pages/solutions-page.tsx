"use client";

import { useTranslations } from "next-intl";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { PageCtaBand } from "@/components/pages/shared/page-cta-band";
import { SolutionModuleCard } from "@/components/solutions/solution-module-card";
import { SolutionMaturityRoadmap } from "@/components/solutions/solution-maturity-roadmap";
import { SolutionsWorkflowDiagram } from "@/components/solutions/solutions-workflow-diagram";

const HERO_CHIP_KEYS = ["item1", "item2", "item3"] as const;
const PILOT_KEYS = ["cbamConsole", "ppwr", "agriClimate"] as const;
const ROADMAP_KEYS = ["eudr", "dpp"] as const;

export function SolutionsPage() {
  const t = useTranslations("solutionsPage");

  return (
    <>
      <FullBleedSection
        ariaLabelledby="solutions-heading"
        className="section-solutions-hero page-hero-top"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-[0.32]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-16 top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.18),transparent_70%)] blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.14),transparent_70%)] blur-3xl"
          aria-hidden="true"
        />
        <OrbitWaveMotif variant="hero" showOrbit showWaves />

        <PageContainer className="section-content min-w-0 page-hero-bottom">
          <div className="grid min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 xl:gap-12">
            <div className="min-w-0">
              <FadeIn immediate>
                <SectionHeading
                  id="solutions-heading"
                  eyebrow={t("eyebrow")}
                  title={t("title")}
                  description={t("description")}
                />
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t("heroChipsAriaLabel")}>
                  {HERO_CHIP_KEYS.map((key) => (
                    <li key={key}>
                      <span className="chip-dark solution-hero-chip">
                        <span className="chip-dot" aria-hidden="true" />
                        {t(`heroChips.${key}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
            <FadeIn immediate direction="none" className="min-w-0 w-full">
              <SolutionsWorkflowDiagram />
            </FadeIn>
          </div>
        </PageContainer>
        <SectionWaveEdge className="opacity-45" />
      </FullBleedSection>

      <FullBleedSection className="section-light solutions-section-ready">
        <PageContainer className="section-content min-w-0 page-section-y">
          <FadeIn>
            <div className="solution-segment-head">
              <span className="solution-segment-badge solution-segment-badge-ready">{t("sections.ready.label")}</span>
              <h2 className="mt-3 text-[clamp(1.25rem,1.75vw+0.5rem,1.75rem)] font-bold tracking-[-0.02em] text-[#071225]">
                {t("sections.ready.title")}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                {t("sections.ready.description")}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.04}>
            <div className="solution-featured-wrap mt-6">
              <SolutionModuleCard solutionKey="cbamWorkflows" status="ready" featured />
            </div>
          </FadeIn>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>

      <FullBleedSection className="section-muted solutions-section-pilot">
        <OrbitWaveMotif variant="muted" orbitAlign="left" />
        <PageContainer className="section-content min-w-0 page-section-y">
          <FadeIn>
            <div className="solution-segment-head">
              <span className="solution-segment-badge solution-segment-badge-pilot">{t("sections.pilot.label")}</span>
              <h2 className="mt-3 text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">
                {t("sections.pilot.title")}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                {t("sections.pilot.description")}
              </p>
            </div>
          </FadeIn>
          <div className="solution-pilot-grid mt-6">
            {PILOT_KEYS.map((key, i) => (
              <FadeIn key={key} delay={0.04 + i * 0.03}>
                <SolutionModuleCard solutionKey={key} status="pilot" />
              </FadeIn>
            ))}
          </div>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>

      <FullBleedSection id="roadmap" className="section-light solutions-section-roadmap scroll-mt-28 page-end-cap">
        <OrbitWaveMotif variant="section" orbitAlign="right" />
        <PageContainer className="section-content min-w-0 page-section-y">
          <FadeIn>
            <div className="solution-segment-head">
              <span className="solution-segment-badge solution-segment-badge-roadmap">{t("sections.roadmap.label")}</span>
              <h2 className="mt-3 text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">
                {t("sections.roadmap.title")}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                {t("sections.roadmap.description")}
              </p>
            </div>
          </FadeIn>
          <div className="solution-roadmap-grid mt-6">
            {ROADMAP_KEYS.map((key, i) => (
              <FadeIn key={key} delay={0.04 + i * 0.03}>
                <SolutionModuleCard solutionKey={key} status="comingSoon" />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.08}>
            <div className="mt-10 lg:mt-12">
              <SolutionMaturityRoadmap />
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
