"use client";

import { useTranslations } from "next-intl";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { sectionHeadSpacing } from "@/components/home/home-section-shell";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Mail, Calculator, AlertCircle } from "lucide-react";

const problemKeys = ["item1", "item2", "item3"] as const;
const icons = [Mail, Calculator, AlertCircle];

export function ProblemSection() {
  const t = useTranslations("home.problem");

  return (
    <FullBleedSection
      id="challenge"
      ariaLabelledby="problem-heading"
      className="section-light home-section-compact section-home-bridge"
    >
      <OrbitWaveMotif variant="section" orbitAlign="left" />
      <PageContainer className="section-content">
        <FadeIn>
          <SectionHeading
            id="problem-heading"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className={sectionHeadSpacing}
          />
        </FadeIn>
        <div className="grid gap-3.5 lg:grid-cols-3 lg:gap-4">
          {problemKeys.map((key, i) => {
            const Icon = icons[i];
            return (
              <FadeIn key={key} delay={i * 0.04}>
                <article className="card-glass card-risk flex h-full flex-col p-5">
                  <div className="icon-accent-wrap mb-3">
                    <Icon className="h-[19px] w-[19px] text-[#7c3aed]" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold leading-snug text-[#071225] lg:text-[17px]">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="body-sm mt-2 text-[14px] leading-relaxed">
                    {t(`items.${key}.description`)}
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
