"use client";

import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { SectionHeading } from "@/components/home/section-heading";
import { CbamCnScopeCheckerLazy } from "@/components/tools/cbam-cn-scope-checker-lazy";
import { Link } from "@/i18n/routing";

export function CbamCnScopeCheckerPageContent() {
  const t = useTranslations("resourcesPage");

  return (
    <>
      <FullBleedSection
        ariaLabelledby="cn-scope-checker-page-heading"
        className="section-resources-hero page-hero-top"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-[0.32]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-16 top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.16),transparent_70%)] blur-3xl"
          aria-hidden="true"
        />
        <OrbitWaveMotif variant="hero" showOrbit={false} showWaves intensity="subtle" />

        <PageContainer className="section-content min-w-0 page-hero-bottom">
          <Link
            href="/resources"
            className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#64748b] transition-colors hover:text-[#7c3aed]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t("cnScopeChecker.backToResources")}
          </Link>
          <SectionHeading
            id="cn-scope-checker-page-heading"
            eyebrow={t("cnScopeChecker.eyebrow")}
            title={t("cnScopeChecker.title")}
            description={t("cnScopeChecker.description")}
          />
        </PageContainer>
        <SectionWaveEdge className="section-wave-edge-compact opacity-45" />
      </FullBleedSection>

      <FullBleedSection className="section-light section-inner-pad cn-scope-checker-section">
        <PageContainer className="section-content min-w-0 page-section-y-tight">
          <section aria-labelledby="cn-scope-checker-tool-heading">
            <h2 id="cn-scope-checker-tool-heading" className="sr-only">
              {t("cnScopeChecker.searchLabel")}
            </h2>
            <CbamCnScopeCheckerLazy />
          </section>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>
    </>
  );
}
