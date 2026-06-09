"use client";

import { useTranslations } from "next-intl";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { sectionHeadSpacing } from "@/components/home/home-section-shell";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Award, Cpu, CalendarCheck, Building2, Languages } from "lucide-react";

const trustKeys = ["expertise", "engine", "output", "anka", "languages"] as const;
const trustIcons = [Award, Cpu, CalendarCheck, Building2, Languages];

export function TrustBlockSection() {
  const t = useTranslations("home.trustBlock");

  return (
    <FullBleedSection id="trust" ariaLabelledby="trust-heading" className="section-muted">
      <OrbitWaveMotif variant="muted" orbitAlign="center" />
      <PageContainer className="section-content">
        <FadeIn>
          <SectionHeading
            id="trust-heading"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className={sectionHeadSpacing}
          />
        </FadeIn>
        <ul className="grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {trustKeys.map((key, i) => {
            const Icon = trustIcons[i];
            return (
              <li key={key}>
                <FadeIn delay={i * 0.03}>
                  <div className="card-glass flex h-full flex-col">
                    <div className="icon-accent-wrap mb-3">
                      <Icon className="h-[19px] w-[19px] text-[#7c3aed]" aria-hidden="true" />
                    </div>
                    <p className="text-[15px] font-semibold leading-snug text-[#071225] lg:text-base">
                      {t(`items.${key}`)}
                    </p>
                  </div>
                </FadeIn>
              </li>
            );
          })}
        </ul>
        <FadeIn delay={0.15}>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-[#64748b]">
            {t("legalNote")}
          </p>
        </FadeIn>
      </PageContainer>
      <SectionWaveEdge />
    </FullBleedSection>
  );
}
