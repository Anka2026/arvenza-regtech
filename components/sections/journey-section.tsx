"use client";

import { useTranslations } from "next-intl";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { sectionHeadSpacing } from "@/components/home/home-section-shell";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { CBAM_JOURNEY_STEP_KEYS, type CbamJourneyStepKey } from "@/lib/assets";

export function JourneySection() {
  const t = useTranslations("home.journey");

  return (
    <FullBleedSection id="journey" ariaLabelledby="journey-heading" className="section-muted section-rhythm-soft">
      <OrbitWaveMotif variant="muted" orbitAlign="center" />
      <PageContainer className="section-content">
        <FadeIn immediate>
          <SectionHeading
            id="journey-heading"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className={sectionHeadSpacing}
          />
        </FadeIn>

        <ol className="journey-compact-list mt-2 list-none">
          {CBAM_JOURNEY_STEP_KEYS.map((key, index) => (
            <li key={key}>
              <JourneyStep stepKey={key} index={index} />
            </li>
          ))}
        </ol>
      </PageContainer>
      <SectionWaveEdge />
    </FullBleedSection>
  );
}

function JourneyStep({ stepKey, index }: { stepKey: CbamJourneyStepKey; index: number }) {
  const t = useTranslations("home.journey");
  const stepNum = String(index + 1).padStart(2, "0");

  return (
    <article className="journey-step-compact">
      <div className="flex items-start gap-3">
        <span className="step-badge shrink-0">{stepNum}</span>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold leading-snug text-[#071225] lg:text-[17px]">
            {t(`steps.${stepKey}.name`)}
            <span className="ml-1.5 font-medium text-gradient">{t(`steps.${stepKey}.subtitle`)}</span>
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[#475569]">
            {t(`steps.${stepKey}.outcome`)}
          </p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#7c3aed]">
            {t("capabilityLabel")}
          </p>
          <p className="mt-1 text-sm leading-snug text-[#64748b]">
            {t(`steps.${stepKey}.capability`)}
          </p>
        </div>
      </div>
    </article>
  );
}
