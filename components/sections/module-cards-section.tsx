"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { sectionHeadSpacing } from "@/components/home/home-section-shell";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { MODULE_KEYS, type ModuleKey } from "@/lib/assets";
import {
  Calculator,
  LayoutDashboard,
  TreePine,
  Package,
  Fingerprint,
  Users,
  BarChart3,
  Sprout,
  ArrowUpRight,
} from "lucide-react";

const moduleIcons: Record<ModuleKey, typeof Calculator> = {
  cbamCalc: Calculator,
  cbamConsole: LayoutDashboard,
  eudr: TreePine,
  ppwr: Package,
  dpp: Fingerprint,
  supplier: Users,
  esg: BarChart3,
  agri: Sprout,
};

const CBAM_MODULE_KEYS = new Set(["cbamCalc", "cbamConsole"]);

function moduleHref(key: string): "/platform/cbam" | "/platform" {
  return CBAM_MODULE_KEYS.has(key) ? "/platform/cbam" : "/platform";
}

export function ModuleCardsSection() {
  const t = useTranslations("home.moduleCards");

  return (
    <FullBleedSection id="modules" ariaLabelledby="modules-heading" className="section-light">
      <OrbitWaveMotif variant="section" orbitAlign="right" />
      <PageContainer className="section-content">
        <FadeIn>
          <SectionHeading
            id="modules-heading"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className={sectionHeadSpacing}
          />
        </FadeIn>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MODULE_KEYS.map((key: ModuleKey, i) => {
            const Icon = moduleIcons[key];
            return (
              <FadeIn key={key} delay={i * 0.02}>
                <Link href={moduleHref(key)} className="group block h-full">
                  <article className="card-module">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed]/14 to-[#2563eb]/10 ring-1 ring-[#7c3aed]/14">
                        <Icon className="h-[18px] w-[18px] text-[#7c3aed]" aria-hidden="true" />
                      </div>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-[#64748b]/30 transition-colors group-hover:text-[#7c3aed]"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-[15px] font-semibold leading-snug text-[#071225]">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="body-sm mt-1 line-clamp-2 text-[13px] leading-snug">
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
