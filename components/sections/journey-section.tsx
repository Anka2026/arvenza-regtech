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
    <FullBleedSection id="journey" ariaLabelledby="journey-heading" className="section-muted">
      <OrbitWaveMotif variant="muted" orbitAlign="center" />
      <PageContainer className="section-content">
        <FadeIn>
          <SectionHeading
            id="journey-heading"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className={sectionHeadSpacing}
          />
        </FadeIn>

        <div className="relative mt-2">
          <div
            className="pointer-events-none absolute left-[1.125rem] top-4 hidden h-[calc(100%-2rem)] w-px lg:left-1/2 lg:block lg:-translate-x-px"
            aria-hidden="true"
          >
            <div className="h-full w-full bg-gradient-to-b from-[#7C3AED]/40 via-[#2563EB]/15 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-16 w-px bg-gradient-to-b from-[#7C3AED] to-transparent motion-reduce:animate-none animate-[journey-pulse_3s_ease-in-out_infinite]" />
          </div>
          <ol className="grid list-none gap-4 lg:gap-5">
            {CBAM_JOURNEY_STEP_KEYS.map((key, i) => (
              <li key={key}>
                <JourneyStep stepKey={key} index={i} />
              </li>
            ))}
          </ol>
        </div>
      </PageContainer>
      <SectionWaveEdge />
    </FullBleedSection>
  );
}

function JourneyStep({ stepKey, index }: { stepKey: CbamJourneyStepKey; index: number }) {
  const t = useTranslations("home.journey");
  const stepNum = String(index + 1).padStart(2, "0");
  const alignRight = index % 2 === 1;

  return (
    <FadeIn delay={index * 0.04}>
      <div
        className={`relative grid items-start gap-4 lg:grid-cols-2 lg:gap-10 ${
          alignRight ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
        }`}
      >
        <div className={`${alignRight ? "lg:pl-10" : "lg:pr-10 lg:text-right"}`}>
          <div
            className={`flex items-center gap-3 ${alignRight ? "" : "lg:flex-row-reverse lg:justify-start"}`}
          >
            <span className="step-badge">{stepNum}</span>
            <div className={alignRight ? "" : "lg:text-right"}>
              <h3 className="text-lg font-semibold text-[#071225] lg:text-xl">
                {t(`steps.${stepKey}.name`)}
              </h3>
              <p className="text-sm font-medium text-gradient">{t(`steps.${stepKey}.subtitle`)}</p>
            </div>
          </div>
        </div>

        <article className="journey-step-card lg:mt-0">
          <p className="text-sm leading-relaxed text-[#475569]">{t(`steps.${stepKey}.outcome`)}</p>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7c3aed]">
            {t("capabilityLabel")}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-[#64748b]">
            {t(`steps.${stepKey}.capability`)}
          </p>
        </article>
      </div>
    </FadeIn>
  );
}
