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
import { cn } from "@/lib/utils";

const SOLUTION_KEYS = [
  "cbam",
  "supplierEvidence",
  "pcf",
  "ppwr",
  "eudr",
  "dpp",
  "reporting",
] as const;

const SOLUTION_STATUS: Record<
  (typeof SOLUTION_KEYS)[number],
  "available" | "pilot" | "comingSoon"
> = {
  cbam: "available",
  supplierEvidence: "available",
  pcf: "pilot",
  ppwr: "comingSoon",
  eudr: "comingSoon",
  dpp: "comingSoon",
  reporting: "pilot",
};

export function SolutionsPage() {
  const t = useTranslations("solutionsPage");
  const tStatus = useTranslations("nav.status");

  return (
    <>
      <FullBleedSection ariaLabelledby="solutions-heading" className="section-hero-light pt-24 lg:pt-28">
        <PageContainer className="section-content pb-10">
          <FadeIn>
            <SectionHeading
              id="solutions-heading"
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
            />
          </FadeIn>
        </PageContainer>
      </FullBleedSection>

      <FullBleedSection className="section-light pb-14 lg:pb-16">
        <PageContainer className="section-content">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[1.75rem] border border-[#7c3aed]/20 bg-gradient-to-br from-[#7c3aed]/[0.06] via-white to-[#2563eb]/[0.04] p-8 shadow-card lg:p-10">
              <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
                <div>
                  <div className="flex flex-wrap items-start gap-3">
                    <StatusPill variant="flagship" label={t("flagship.badge")} />
                    <StatusPill variant="available" label={tStatus("availableNow")} />
                  </div>
                  <h2 className="mt-5 text-[clamp(1.5rem,2.5vw+0.5rem,2.25rem)] font-bold tracking-[-0.03em] text-[#071225]">
                    {t("flagship.title")}
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#64748b] lg:text-lg">
                    {t("flagship.description")}
                  </p>
                  <Link
                    href="/platform/cbam"
                    className={cn(buttonVariants({ variant: "default", size: "lg" }), "mt-6 inline-flex gap-2")}
                  >
                    {t("flagship.cta")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <div className="relative">
                  <div
                    className="pointer-events-none absolute -inset-4 rounded-3xl bg-[radial-gradient(circle,rgba(124,58,237,0.14),transparent_70%)] blur-2xl"
                    aria-hidden="true"
                  />
                  <CbamProductScreenshot
                    focus="full"
                    alt={t("flagship.screenshotAlt")}
                    size="large"
                    elevated
                    className="relative shadow-dashboard-glow"
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SOLUTION_KEYS.map((key) => {
                const status = SOLUTION_STATUS[key];
                return (
                  <div key={key} className="card-premium flex flex-col gap-2 p-5">
                    <StatusPill variant={status} label={tStatus(status)} />
                    <h3 className="text-base font-semibold text-[#071225]">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#64748b]">
                      {t(`items.${key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </FadeIn>

          <div className="mt-14">
            <PageCtaBand
              title={t("cta.title")}
              primaryLabel={t("cta.primary")}
              primaryHref="/demo"
            />
          </div>
        </PageContainer>
      </FullBleedSection>
    </>
  );
}
