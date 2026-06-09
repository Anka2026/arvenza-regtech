"use client";

import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  FileStack,
  Layers,
  GitBranch,
  Lock,
} from "lucide-react";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { FadeIn } from "@/components/ui/fade-in";

const valueKeys = [
  "workflows",
  "evidence",
  "modules",
  "traceability",
  "security",
] as const;

const valueIcons = [ShieldCheck, FileStack, Layers, GitBranch, Lock];

export function TrustStripSection() {
  const t = useTranslations("home.valueStrip");

  return (
    <FullBleedSection id="value-strip" ariaLabelledby="value-strip-heading" className="value-strip-band">
      <OrbitWaveMotif variant="dark" orbitAlign="center" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(124,58,237,0.22),transparent_55%)]"
        aria-hidden="true"
      />
      <PageContainer className="section-content">
        <FadeIn>
          <h2 id="value-strip-heading" className="sr-only">
            {t("title")}
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-2">
            {valueKeys.map((key, i) => {
              const Icon = valueIcons[i];
              return (
                <li key={key} className="value-strip-item px-2 py-0.5">
                  <Icon className="h-5 w-5 shrink-0 text-purple-200/85" aria-hidden="true" />
                  <span>{t(`items.${key}`)}</span>
                </li>
              );
            })}
          </ul>
        </FadeIn>
      </PageContainer>
      <SectionWaveEdge className="opacity-30" />
    </FullBleedSection>
  );
}
