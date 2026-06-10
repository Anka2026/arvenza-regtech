"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { sectionHeadSpacing } from "@/components/home/home-section-shell";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { ROADMAP_MODULE_CONFIG, type RoadmapModuleKey } from "@/lib/assets";
import { roadmapModuleHref } from "@/lib/platform-modules";
import {
  Package,
  TreePine,
  Fingerprint,
  Users,
  BarChart3,
  ArrowRight,
  LayoutDashboard,
  Sprout,
  Calculator,
} from "lucide-react";
import { cn } from "@/lib/utils";

type RoadmapStatus = "pilot" | "comingSoon";

const roadmapIcons: Record<RoadmapModuleKey, typeof TreePine> = {
  cbamComplianceConsole: LayoutDashboard,
  ppwr: Package,
  agriClimate: Sprout,
  eudr: TreePine,
  dpp: Fingerprint,
  supplier: Users,
  esgReporting: BarChart3,
};

const statusBadgeClass: Record<RoadmapStatus, string> = {
  pilot: "badge-pilot",
  comingSoon: "badge-coming-soon",
};

export function PlatformRoadmapSection() {
  const t = useTranslations("home.platformRoadmap");

  return (
    <FullBleedSection id="roadmap" ariaLabelledby="roadmap-heading" className="section-dark-band home-section-compact">
      <OrbitWaveMotif variant="dark" orbitAlign="right" />
      <div className="pointer-events-none absolute inset-0 dark-section-glow" aria-hidden="true" />
      <PageContainer className="section-content">
        <FadeIn>
          <SectionHeading
            id="roadmap-heading"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            dark
            className={sectionHeadSpacing}
          />
        </FadeIn>

        <ul className="roadmap-maturity-legend list-none" aria-label={t("maturityLegendAriaLabel")}>
          <li><span className="badge-ready">{t("maturityLegend.ready")}</span></li>
          <li><span className="badge-pilot">{t("maturityLegend.pilot")}</span></li>
          <li><span className="badge-coming-soon">{t("maturityLegend.comingSoon")}</span></li>
        </ul>

        <FadeIn delay={0.04}>
          <article className="card-dark mb-4 border-[#7C3AED]/35 lg:mb-5">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED]/12 ring-1 ring-[#7C3AED]/20">
                <Calculator className="h-[18px] w-[18px] text-[#A78BFA]" aria-hidden="true" />
              </div>
              <span className="badge-core-product">{t("coreProductLabel")}</span>
              <span className="badge-ready">{t("coreProductStatus")}</span>
            </div>
            <h3 className="text-lg font-semibold text-[#F8FAFC] lg:text-xl">{t("coreProductTitle")}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#94A3B8] lg:text-[15px]">
              {t("coreProductDescription")}
            </p>
            <Link
              href="/platform/cbam"
              className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C4B5FD] transition-colors hover:text-white"
            >
              {t("coreProductCta")}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </article>
        </FadeIn>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#94A3B8]">
          {t("modulesLabel")}
        </p>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ROADMAP_MODULE_CONFIG.map(({ key, status }, i) => {
            const Icon = roadmapIcons[key];
            return (
              <FadeIn key={key} delay={0.06 + i * 0.02}>
                <Link href={roadmapModuleHref(key)} className="group block h-full">
                  <article
                    className={cn(
                      "card-dark h-full opacity-95 transition-colors hover:border-[#7C3AED]/45",
                      status === "comingSoon" && "opacity-80"
                    )}
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED]/12 ring-1 ring-[#7C3AED]/20">
                        <Icon className="h-[18px] w-[18px] text-[#A78BFA]" aria-hidden="true" />
                      </div>
                      <span className={statusBadgeClass[status]}>{t(`status.${status}`)}</span>
                    </div>
                    <h3 className="text-[15px] font-semibold leading-snug text-[#F8FAFC] group-hover:text-white">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-[#94A3B8]">
                      {t(`items.${key}.description`)}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#C4B5FD] group-hover:text-white">
                      {t("moduleExploreCta")}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </article>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </PageContainer>
      <SectionWaveEdge className="opacity-25" />
    </FullBleedSection>
  );
}
