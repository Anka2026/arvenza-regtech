"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { sectionHeadSpacing } from "@/components/home/home-section-shell";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { CbamProductScreenshot } from "@/components/ui/cbam-product-screenshot";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function PlatformOverviewSection() {
  const t = useTranslations("home.platformOverview");

  return (
    <FullBleedSection
      id="platform"
      ariaLabelledby="platform-overview-heading"
      className="section-dark-band"
    >
      <OrbitWaveMotif variant="dark" orbitAlign="center" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(0,200,150,0.12),transparent_58%)]"
        aria-hidden="true"
      />
      <PageContainer className="section-content">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.28fr] lg:gap-10">
          <FadeIn>
            <SectionHeading
              id="platform-overview-heading"
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
              dark
              className={sectionHeadSpacing}
            />
            <Button
              variant="secondary"
              size="lg"
              className="group mt-6 border-0 bg-white text-[#071225] hover:bg-white/95"
              asChild
            >
              <Link href="/platform/cbam">
                {t("cta")}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </Button>
          </FadeIn>

          <FadeIn delay={0.06} className="relative">
            <div
              className="pointer-events-none absolute -inset-8 rounded-3xl bg-[#7c3aed]/18 blur-3xl"
              aria-hidden="true"
            />
            <CbamProductScreenshot
              focus="full"
              alt={t("screenshotAlt")}
              size="xl"
              elevated
              priority
              className="relative shadow-dashboard-glow"
            />
          </FadeIn>
        </div>
      </PageContainer>
      <SectionWaveEdge className="opacity-25" />
    </FullBleedSection>
  );
}
