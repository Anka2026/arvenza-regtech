"use client";



import { useTranslations } from "next-intl";

import {

  ArrowRight,

  BarChart3,

  Fingerprint,

  LayoutDashboard,

  Package,

  Sprout,

  TreePine,

  Users,

} from "lucide-react";

import { Link } from "@/i18n/routing";

import { FullBleedSection, PageContainer } from "@/components/layout/page-container";

import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";

import { SectionHeading } from "@/components/home/section-heading";

import { FadeIn } from "@/components/ui/fade-in";

import { PageCtaBand } from "@/components/pages/shared/page-cta-band";

import { StatusPill } from "@/components/pages/shared/status-pill";

import { PlatformArchitectureDiagram } from "@/components/platform/platform-architecture-diagram";

import { ProductScreenshot } from "@/components/ui/product-screenshot";

import { CbamProductScreenshot } from "@/components/ui/cbam-product-screenshot";

import { buttonVariants } from "@/components/ui/button";

import {

  PLATFORM_COMING_SOON_MODULES,

  PLATFORM_PILOT_MODULES,

  PLATFORM_READY_MODULE,

  type PlatformModuleDefinition,

} from "@/lib/platform-modules";

import { cn } from "@/lib/utils";



const ARCHITECTURE_LAYER_KEYS = [

  "supplierEvidence",

  "productData",

  "calculationMethodology",

  "documentationReporting",

] as const;



const MODULE_ICONS: Record<string, typeof LayoutDashboard> = {

  cbamConsole: LayoutDashboard,

  cbamComplianceConsole: LayoutDashboard,

  ppwr: Package,

  agriClimate: Sprout,

  eudr: TreePine,

  dpp: Fingerprint,

  supplierEvidence: Users,

  esgReporting: BarChart3,

};



const HERO_CHIP_KEYS = ["item1", "item2", "item3"] as const;



function ModuleCard({ module }: { module: PlatformModuleDefinition }) {

  const t = useTranslations("platformHub");

  const tStatus = useTranslations("nav.status");

  const Icon = MODULE_ICONS[module.hubKey] ?? LayoutDashboard;

  const statusVariant = module.status === "pilot" ? "pilot" : "comingSoon";



  return (

    <FadeIn>

      <Link href={module.route} className="group block h-full">

        <article

          className={cn(

            "platform-module-card-interactive card-premium flex h-full flex-col overflow-hidden",

            module.status === "pilot" && "product-card-pilot",

            module.status === "comingSoon" && "product-card-roadmap"

          )}

        >

          <div className="platform-module-card-preview relative overflow-hidden border-b border-[#dde5f2]/80 bg-[#071225]/[0.02]">

            <ProductScreenshot

              moduleKey={module.key}

              presentation="thumbnail"

              alt={t(`modules.${module.hubKey}.screenshotAlt`)}

              size="feature"

              className="rounded-none border-0 shadow-none transition-transform duration-300 group-hover:scale-[1.02]"

            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          </div>

          <div className="flex flex-1 flex-col gap-2 p-5">

            <div className="flex flex-wrap items-start justify-between gap-2">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#7c3aed]/10 ring-1 ring-[#7c3aed]/18">

                <Icon className="h-[18px] w-[18px] text-[#7c3aed]" aria-hidden="true" />

              </div>

              <StatusPill variant={statusVariant} label={tStatus(statusVariant)} className="shrink-0" />

            </div>

            <h3 className="text-sm font-semibold leading-snug text-[#071225] transition-colors group-hover:text-[#7c3aed] lg:text-base copy-safe">

              {t(`modules.${module.hubKey}.title`)}

            </h3>

            <p className="flex-1 text-xs leading-relaxed text-[#64748b] lg:text-sm">

              {t(`modules.${module.hubKey}.description`)}

            </p>

            <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#7c3aed] lg:text-sm">

              {t(`modules.${module.hubKey}.exploreCta`)}

              <ArrowRight

                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"

                aria-hidden="true"

              />

            </span>

          </div>

        </article>

      </Link>

    </FadeIn>

  );

}



export function PlatformHubPage() {

  const t = useTranslations("platformHub");

  const tStatus = useTranslations("nav.status");



  return (

    <>

      <FullBleedSection ariaLabelledby="platform-heading" className="section-hero-light section-hero-home page-hero-top">

        <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-[0.38]" aria-hidden="true" />

        <div className="pointer-events-none absolute -left-24 top-12 h-80 w-80 rounded-full hero-glow-purple blur-3xl" aria-hidden="true" />

        <OrbitWaveMotif variant="hero" showOrbit showWaves />



        <PageContainer className="section-content min-w-0 page-hero-bottom">

          <div className="grid min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-10 xl:gap-12">

            <div className="min-w-0">

              <FadeIn immediate>

                <SectionHeading

                  id="platform-heading"

                  eyebrow={t("eyebrow")}

                  title={t("title")}

                  description={t("description")}

                />

                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t("heroChipsAriaLabel")}>

                  {HERO_CHIP_KEYS.map((key) => (

                    <li key={key}>

                      <span className="chip-dark">

                        <span className="chip-dot" aria-hidden="true" />

                        {t(`heroChips.${key}`)}

                      </span>

                    </li>

                  ))}

                </ul>

              </FadeIn>

            </div>



            <FadeIn immediate direction="none" className="min-w-0 w-full">

              <PlatformArchitectureDiagram />

            </FadeIn>

          </div>

        </PageContainer>

        <SectionWaveEdge className="opacity-50" />

      </FullBleedSection>



      <FullBleedSection className="section-light home-section-compact">

        <OrbitWaveMotif variant="section" orbitAlign="left" />

        <PageContainer className="section-content min-w-0">

          <div className="platform-architecture-support rounded-[1.25rem] border border-[#7c3aed]/14 bg-gradient-to-br from-[#7c3aed]/[0.04] via-white to-[#2563eb]/[0.03] p-5 sm:rounded-[1.5rem] sm:p-6">

            <h2 className="text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">

              {t("architecture.title")}

            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">

              {t("architecture.supportingBody")}

            </p>

            <ul className="mt-4 flex flex-wrap gap-2" aria-label={t("architecture.flowAriaLabel")}>

              {ARCHITECTURE_LAYER_KEYS.map((key) => (

                <li key={key}>

                  <span className="platform-flow-chip">{t(`architecture.layers.${key}.title`)}</span>

                </li>

              ))}

            </ul>

          </div>



          <div className="platform-segment-header mt-8 lg:mt-10">

            <span className="platform-segment-label">{t("sections.ready.label")}</span>

            <h2 className="mt-2 text-[clamp(1.25rem,1.75vw+0.5rem,1.75rem)] font-bold tracking-[-0.02em] text-[#071225]">

              {t("sections.ready.title")}

            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">

              {t("sections.ready.description")}

            </p>

          </div>



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

                    href={PLATFORM_READY_MODULE.route}

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



          <div className="platform-segment-header mt-10 lg:mt-12">

            <span className="platform-segment-label platform-segment-label-pilot">{t("sections.pilot.label")}</span>

            <h2 className="mt-2 text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">

              {t("sections.pilot.title")}

            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">

              {t("sections.pilot.description")}

            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

              {PLATFORM_PILOT_MODULES.map((module) => (

                <ModuleCard key={module.key} module={module} />

              ))}

            </div>

          </div>



          <div className="platform-segment-header mt-10 lg:mt-12">

            <span className="platform-segment-label platform-segment-label-roadmap">{t("sections.comingSoon.label")}</span>

            <h2 className="mt-2 text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">

              {t("sections.comingSoon.title")}

            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">

              {t("sections.comingSoon.description")}

            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

              {PLATFORM_COMING_SOON_MODULES.map((module) => (

                <ModuleCard key={module.key} module={module} />

              ))}

            </div>

          </div>



          <div className="mt-12 lg:mt-14">

            <PageCtaBand

              title={t("cta.title")}

              primaryLabel={t("cta.primary")}

              primaryHref="/platform/cbam"

              secondaryLabel={t("cta.secondary")}

              secondaryHref="/demo"

            />

          </div>

        </PageContainer>

        <SectionWaveEdge />

      </FullBleedSection>

    </>

  );

}


