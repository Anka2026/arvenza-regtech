"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { PageCtaBand } from "@/components/pages/shared/page-cta-band";
import { StatusPill } from "@/components/pages/shared/status-pill";
import { CbamProductScreenshot } from "@/components/ui/cbam-product-screenshot";
import { buttonVariants } from "@/components/ui/button";
import { PLATFORM_MODULE_ANCHORS } from "@/lib/platform-module-anchors";
import { cn } from "@/lib/utils";

const ARCHITECTURE_LAYER_KEYS = [
  "supplierEvidence",
  "productData",
  "calculationMethodology",
  "documentationReporting",
] as const;

const PILOT_MODULE_KEYS = ["cbamConsole", "ppwr", "agriClimate"] as const;
const COMING_SOON_MODULE_KEYS = ["eudr", "dpp", "supplierEvidence", "esgReporting"] as const;

const PILOT_ANCHOR: Record<(typeof PILOT_MODULE_KEYS)[number], keyof typeof PLATFORM_MODULE_ANCHORS> = {
  cbamConsole: "cbamComplianceConsole",
  ppwr: "ppwr",
  agriClimate: "agriClimate",
};

const COMING_SOON_ANCHOR: Record<
  (typeof COMING_SOON_MODULE_KEYS)[number],
  keyof typeof PLATFORM_MODULE_ANCHORS
> = {
  eudr: "eudr",
  dpp: "dpp",
  supplierEvidence: "supplierEvidence",
  esgReporting: "esgReporting",
};

function ModuleCard({
  moduleKey,
  status,
  anchorId,
}: {
  moduleKey: string;
  status: "pilot" | "comingSoon";
  anchorId: string;
}) {
  const t = useTranslations("platformHub");
  const tStatus = useTranslations("nav.status");

  return (
    <article
      id={anchorId}
      className={cn(
        "platform-module-card card-premium flex scroll-mt-28 flex-col gap-2 p-5",
        status === "pilot" && "product-card-pilot",
        status === "comingSoon" && "product-card-roadmap"
      )}
    >
      <StatusPill variant={status} label={tStatus(status)} />
      <h3 className="text-sm font-semibold leading-snug text-[#071225] lg:text-base">
        {t(`modules.${moduleKey}.title`)}
      </h3>
      <p className="text-xs leading-relaxed text-[#64748b] lg:text-sm">
        {t(`modules.${moduleKey}.description`)}
      </p>
    </article>
  );
}

export function PlatformHubPage() {
  const t = useTranslations("platformHub");
  const tStatus = useTranslations("nav.status");

  return (
    <>
      <FullBleedSection ariaLabelledby="platform-heading" className="section-hero-light pt-24 lg:pt-28">
        <PageContainer className="section-content min-w-0 pb-10">
          <FadeIn immediate>
            <SectionHeading
              id="platform-heading"
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
            />
          </FadeIn>
        </PageContainer>
      </FullBleedSection>

      <FullBleedSection className="section-light pb-14 lg:pb-16">
        <PageContainer className="section-content min-w-0">
          <FadeIn>
            <div className="platform-architecture-strip rounded-[1.25rem] border border-[#7c3aed]/14 bg-gradient-to-br from-[#7c3aed]/[0.05] via-white to-[#2563eb]/[0.04] p-5 sm:rounded-[1.5rem] sm:p-6 lg:p-8">
              <h2 className="text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">
                {t("architecture.title")}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                {t("architecture.body")}
              </p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {ARCHITECTURE_LAYER_KEYS.map((key) => (
                  <div key={key} className="platform-layer-card rounded-xl border border-[#dde5f2]/90 bg-white/90 p-4">
                    <p className="platform-layer-label">{t(`architecture.layers.${key}.title`)}</p>
                    <p className="mt-2 text-xs leading-relaxed text-[#64748b] lg:text-sm">
                      {t(`architecture.layers.${key}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.04}>
            <div className="mt-12 lg:mt-14">
              <h2 className="text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">
                {t("sections.ready.title")}
              </h2>
              <div className="core-product-showcase relative mt-6 overflow-hidden rounded-[1.25rem] border border-[#2563eb]/22 bg-gradient-to-br from-[#2563eb]/[0.06] via-white to-[#7c3aed]/[0.05] p-5 shadow-card sm:rounded-[1.75rem] sm:p-8 lg:p-10">
                <div className="grid min-w-0 items-center gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-start gap-2.5">
                      <StatusPill variant="coreProduct" label={t("readyModule.badge")} />
                      <StatusPill variant="ready" label={tStatus("ready")} />
                    </div>
                    <h3 className="mt-5 text-[clamp(1.375rem,2vw+0.5rem,2rem)] font-bold tracking-[-0.03em] text-[#071225]">
                      {t("readyModule.title")}
                    </h3>
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#64748b] lg:text-lg">
                      {t("readyModule.description")}
                    </p>
                    <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                      <Link
                        href="/platform/cbam"
                        className={cn(
                          buttonVariants({ variant: "default", size: "lg" }),
                          "inline-flex w-full justify-center gap-2 sm:w-auto"
                        )}
                      >
                        {t("readyModule.exploreCta")}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <Link
                        href="/demo"
                        className={cn(
                          buttonVariants({ variant: "accent-outline", size: "lg" }),
                          "w-full justify-center sm:w-auto"
                        )}
                      >
                        {t("readyModule.demoCta")}
                      </Link>
                    </div>
                  </div>
                  <div className="hero-product-stage relative min-w-0 w-full max-w-full">
                    <div
                      className="pointer-events-none absolute -inset-4 rounded-3xl bg-[radial-gradient(circle,rgba(37,99,235,0.12),transparent_70%)] blur-2xl"
                      aria-hidden="true"
                    />
                    <CbamProductScreenshot
                      focus="full"
                      alt={t("readyModule.screenshotAlt")}
                      size="large"
                      elevated
                      className="relative w-full max-w-full shadow-dashboard-glow"
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="mt-12 lg:mt-14">
              <h2 className="text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">
                {t("sections.pilot.title")}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                {t("sections.pilot.description")}
              </p>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {PILOT_MODULE_KEYS.map((key) => (
                  <ModuleCard
                    key={key}
                    moduleKey={key}
                    status="pilot"
                    anchorId={PLATFORM_MODULE_ANCHORS[PILOT_ANCHOR[key]]}
                  />
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="mt-12 lg:mt-14">
              <h2 className="text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">
                {t("sections.comingSoon.title")}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                {t("sections.comingSoon.description")}
              </p>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {COMING_SOON_MODULE_KEYS.map((key) => (
                  <ModuleCard
                    key={key}
                    moduleKey={key}
                    status="comingSoon"
                    anchorId={PLATFORM_MODULE_ANCHORS[COMING_SOON_ANCHOR[key]]}
                  />
                ))}
              </div>
            </div>
          </FadeIn>

          <div className="mt-14">
            <PageCtaBand
              title={t("cta.title")}
              primaryLabel={t("cta.primary")}
              primaryHref="/platform/cbam"
              secondaryLabel={t("cta.secondary")}
              secondaryHref="/demo"
            />
          </div>
        </PageContainer>
      </FullBleedSection>
    </>
  );
}
