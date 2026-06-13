"use client";

import { useTranslations } from "next-intl";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { sectionHeadSpacing } from "@/components/home/home-section-shell";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Calculator, FileStack, Users } from "lucide-react";

const credibilityKeys = ["cbamLogic", "supplierEvidence", "productData"] as const;
const credibilityIcons = [Calculator, Users, FileStack] as const;

export function TrustBlockSection() {
  const t = useTranslations("home.trustBlock");

  return (
    <FullBleedSection id="trust" ariaLabelledby="trust-heading" className="section-muted home-section-compact">
      <OrbitWaveMotif variant="muted" orbitAlign="center" showOrbit={false} />
      <PageContainer className="section-content">
        <FadeIn staticReveal>
          <SectionHeading
            id="trust-heading"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className={sectionHeadSpacing}
          />
        </FadeIn>
        <ul className="grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {credibilityKeys.map((key, i) => {
            const Icon = credibilityIcons[i];
            return (
              <li key={key}>
                <article className="credibility-panel-card card-glass flex h-full flex-col p-4">
                  <div className="icon-accent-wrap mb-3">
                    <Icon className="h-[19px] w-[19px] text-[#7c3aed]" aria-hidden="true" />
                  </div>
                  <h3 className="text-[15px] font-semibold leading-snug text-[#071225] lg:text-base">
                    {t(`cards.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                    {t(`cards.${key}.description`)}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
        <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-[#64748b]">
          {t("legalNote")}
        </p>
      </PageContainer>
      <SectionWaveEdge />
    </FullBleedSection>
  );
}
