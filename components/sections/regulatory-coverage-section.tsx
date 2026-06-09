"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { sectionHeadSpacing } from "@/components/home/home-section-shell";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowUpRight } from "lucide-react";

const regulationKeys = [
  "cbam",
  "ppwr",
  "eudr",
  "dpp",
  "supplier",
  "csrd",
] as const;

export function RegulatoryCoverageSection() {
  const t = useTranslations("home.regulatoryCoverage");

  return (
    <FullBleedSection
      id="regulations"
      ariaLabelledby="regulations-heading"
      className="section-light border-t border-[#dde5f2]/80"
    >
      <OrbitWaveMotif variant="section" orbitAlign="left" />
      <PageContainer className="section-content">
        <FadeIn>
          <SectionHeading
            id="regulations-heading"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className={sectionHeadSpacing}
          />
        </FadeIn>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {regulationKeys.map((key, i) => {
            const isAvailable = key === "cbam";
            return (
              <FadeIn key={key} delay={i * 0.03}>
                <Link href="/regulations" className="group block h-full">
                  <article className="reg-tile">
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex rounded-lg px-2.5 py-1 text-sm font-bold ring-1 ${
                          isAvailable
                            ? "bg-[#00C896]/10 text-[#071225] ring-[#00C896]/20"
                            : "bg-[#94A3B8]/10 text-[#071225] ring-[#94A3B8]/15"
                        }`}
                      >
                        {t(`items.${key}.title`)}
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-[#64748b]/30 transition-colors group-hover:text-[#00A67E]"
                        aria-hidden="true"
                      />
                    </div>
                    <span className={isAvailable ? "badge-available" : "badge-coming-soon"}>
                      {isAvailable ? t("statusAvailable") : t("statusComingSoon")}
                    </span>
                    <p className="body-sm mt-2 line-clamp-2 text-[13px] leading-snug">
                      {t(`items.${key}.description`)}
                    </p>
                  </article>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </PageContainer>
      <SectionWaveEdge />
    </FullBleedSection>
  );
}
