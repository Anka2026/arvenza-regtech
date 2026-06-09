"use client";

import { useTranslations } from "next-intl";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { CbamProductScreenshot } from "@/components/ui/cbam-product-screenshot";
import { CheckCircle2, FileText } from "lucide-react";

const bulletKeys = ["item1", "item2", "item3", "item4"] as const;
const trailKeys = ["item1", "item2", "item3", "item4"] as const;

export function DashboardPreviewSection() {
  const t = useTranslations("home.dashboardPreview");

  return (
    <FullBleedSection
      id="dashboard-preview"
      ariaLabelledby="dashboard-heading"
      className="section-muted"
    >
      <OrbitWaveMotif variant="muted" orbitAlign="left" />
      <PageContainer className="section-content">
        <div className="grid items-start gap-8 lg:grid-cols-[1.32fr_1fr] lg:gap-10">
          <FadeIn className="relative">
            <div
              className="pointer-events-none absolute -inset-8 rounded-3xl bg-[#7c3aed]/8 blur-3xl"
              aria-hidden="true"
            />
            <CbamProductScreenshot
              focus="monitoring"
              alt={t("screenshotAlt")}
              size="xl"
              elevated
              className="relative shadow-product"
            />
          </FadeIn>

          <FadeIn delay={0.05}>
            <SectionHeading
              id="dashboard-heading"
              eyebrow={t("eyebrow")}
              title={t("title")}
            />
            <ul className="mt-5 space-y-2">
              {bulletKeys.map((key) => (
                <li key={key} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#7c3aed]" aria-hidden="true" />
                  <span className="text-base font-medium text-[#071225]">
                    {t(`bullets.${key}`)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-2xl border border-[rgba(120,130,180,0.22)] bg-white/90 p-4 shadow-card">
              <div className="mb-2.5 flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#7c3aed]" aria-hidden="true" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#64748b]">
                  {t("trailTitle")}
                </p>
              </div>
              <ol className="space-y-0" aria-label={t("trailTitle")}>
                {trailKeys.map((key, i) => (
                  <li
                    key={key}
                    className={`trail-item ${i === trailKeys.length - 1 ? "trail-item-active" : ""}`}
                  >
                    <span
                      className={`absolute -left-[5px] top-1 h-1.5 w-1.5 rounded-full ${
                        i === trailKeys.length - 1
                          ? "bg-[#7c3aed] ring-2 ring-[#7c3aed]/20"
                          : "bg-[#dde5f2]"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-[#071225]">
                      {t(`trailItems.${key}`)}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </FadeIn>
        </div>
      </PageContainer>
      <SectionWaveEdge />
    </FullBleedSection>
  );
}
