"use client";

import { useTranslations } from "next-intl";
import {
  ArrowLeftRight,
  Car,
  Cpu,
  Factory,
  Package,
  Sprout,
  Workflow,
} from "lucide-react";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { PageCtaBand } from "@/components/pages/shared/page-cta-band";
import { StatusPill } from "@/components/pages/shared/status-pill";

type IndustryKey =
  | "steelAluminium"
  | "automotive"
  | "packagingFmcg"
  | "electronicsBatteries"
  | "agricultureFood"
  | "importersExporters";

type ProductKey =
  | "cbamEngine"
  | "cbamConsole"
  | "ppwr"
  | "dpp"
  | "agriClimate"
  | "eudr";

type CapabilityStatus = "ready" | "pilot" | "comingSoon";

const INDUSTRY_CONFIG: {
  key: IndustryKey;
  icon: typeof Factory;
  capabilities: { productKey: ProductKey; status: CapabilityStatus }[];
}[] = [
  {
    key: "steelAluminium",
    icon: Factory,
    capabilities: [{ productKey: "cbamEngine", status: "ready" }],
  },
  {
    key: "automotive",
    icon: Car,
    capabilities: [
      { productKey: "cbamEngine", status: "ready" },
      { productKey: "dpp", status: "comingSoon" },
    ],
  },
  {
    key: "packagingFmcg",
    icon: Package,
    capabilities: [{ productKey: "ppwr", status: "pilot" }],
  },
  {
    key: "electronicsBatteries",
    icon: Cpu,
    capabilities: [{ productKey: "dpp", status: "comingSoon" }],
  },
  {
    key: "agricultureFood",
    icon: Sprout,
    capabilities: [
      { productKey: "agriClimate", status: "pilot" },
      { productKey: "eudr", status: "comingSoon" },
    ],
  },
  {
    key: "importersExporters",
    icon: ArrowLeftRight,
    capabilities: [
      { productKey: "cbamEngine", status: "ready" },
      { productKey: "cbamConsole", status: "pilot" },
    ],
  },
];

export function IndustriesPage() {
  const t = useTranslations("industriesPage");
  const tStatus = useTranslations("nav.status");

  return (
    <>
      <FullBleedSection ariaLabelledby="industries-heading" className="section-hero-light pt-24 lg:pt-28">
        <PageContainer className="section-content min-w-0 pb-10">
          <FadeIn>
            <SectionHeading
              id="industries-heading"
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
            />
          </FadeIn>
        </PageContainer>
      </FullBleedSection>

      <FullBleedSection className="section-light pb-14 lg:pb-16">
        <PageContainer className="section-content min-w-0">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {INDUSTRY_CONFIG.map(({ key, icon: Icon, capabilities }, i) => (
              <FadeIn key={key} delay={i * 0.03}>
                <article className="industry-card card-premium flex h-full min-w-0 flex-col p-5 lg:p-6">
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7c3aed]/10 ring-1 ring-[#7c3aed]/18"
                      aria-hidden="true"
                    >
                      <Icon className="h-[18px] w-[18px] text-[#7c3aed]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold leading-snug text-[#071225] lg:text-[17px]">
                        {t(`items.${key}.title`)}
                      </h3>
                      <p className="industry-regulation-chip mt-2.5 inline-flex max-w-full">
                        {t(`items.${key}.regulatoryPressure`)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-4 border-t border-[#dde5f2]/80 pt-4">
                    <div>
                      <p className="industry-field-label">{t("fields.operationalChallenge")}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#64748b]">
                        {t(`items.${key}.operationalChallenge`)}
                      </p>
                    </div>
                    <div>
                      <p className="industry-field-label">{t("fields.arvenzaWorkflow")}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#64748b]">
                        {t(`items.${key}.arvenzaWorkflow`)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto border-t border-[#dde5f2]/80 pt-4">
                    <p className="industry-field-label">{t("fields.relevantCapability")}</p>
                    <ul className="mt-2.5 space-y-2">
                      {capabilities.map(({ productKey, status }) => (
                        <li
                          key={productKey}
                          className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5"
                        >
                          <span className="text-sm font-medium text-[#071225]">
                            {t(`products.${productKey}`)}
                          </span>
                          <StatusPill variant={status} label={tStatus(status)} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.12}>
            <div className="industry-evidence-strip mt-12 rounded-[1.25rem] border border-[#7c3aed]/16 bg-gradient-to-br from-[#7c3aed]/[0.06] via-white to-[#2563eb]/[0.04] p-5 sm:rounded-[1.5rem] sm:p-6 lg:mt-14 lg:p-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-8">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#7c3aed]/12 ring-1 ring-[#7c3aed]/20"
                  aria-hidden="true"
                >
                  <Workflow className="h-5 w-5 text-[#7c3aed]" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">
                    {t("evidenceStrip.title")}
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                    {t("evidenceStrip.description")}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="mt-14">
            <PageCtaBand
              title={t("cta.title")}
              primaryLabel={t("cta.primary")}
              primaryHref="/demo"
              secondaryLabel={t("cta.secondary")}
              secondaryHref="/platform/cbam"
            />
          </div>
        </PageContainer>
      </FullBleedSection>
    </>
  );
}
