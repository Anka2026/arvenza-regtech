"use client";

import { useTranslations } from "next-intl";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { sectionHeadSpacing } from "@/components/home/home-section-shell";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { CBAM_JOURNEY_STEP_KEYS, type CbamJourneyStepKey } from "@/lib/assets";
import {
  ClipboardCheck,
  Database,
  Calculator,
  FileCheck,
  FileOutput,
  Activity,
} from "lucide-react";

const stepIcons: Record<CbamJourneyStepKey, typeof Database> = {
  assess: ClipboardCheck,
  collect: Database,
  calculate: Calculator,
  evidence: FileCheck,
  report: FileOutput,
  monitor: Activity,
};

export function HowItWorksSection() {
  const t = useTranslations("home.howItWorks");

  return (
    <FullBleedSection id="how-it-works" ariaLabelledby="how-heading" className="section-muted">
      <OrbitWaveMotif variant="muted" orbitAlign="left" />
      <PageContainer className="section-content">
        <FadeIn>
          <SectionHeading
            id="how-heading"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className={sectionHeadSpacing}
          />
        </FadeIn>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CBAM_JOURNEY_STEP_KEYS.map((key, i) => {
            const Icon = stepIcons[key];
            return (
              <FadeIn key={key} delay={i * 0.03}>
                <article className="process-step">
                  <div className="mb-2.5 flex items-center gap-2">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00C896] text-xs font-bold text-[#0B1426]"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00C896]/10 ring-1 ring-[#00C896]/15">
                      <Icon className="h-4 w-4 text-[#00A67E]" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-[#071225] lg:text-[17px]">
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p className="body-sm mt-1 line-clamp-3 text-[13px]">
                    {t(`steps.${key}.description`)}
                  </p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </PageContainer>
      <SectionWaveEdge />
    </FullBleedSection>
  );
}
