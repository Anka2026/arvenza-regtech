"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { CbamProductScreenshot } from "@/components/ui/cbam-product-screenshot";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SECTION_KEYS = ["requirements", "supplierData", "emissions", "evidence", "support"] as const;

export function RegulationsCbamPage() {
  const t = useTranslations("regulationsCbam");

  return (
    <>
      <FullBleedSection ariaLabelledby="cbam-reg-heading" className="section-hero-light pt-24 lg:pt-28">
        <PageContainer className="section-content min-w-0 pb-10">
          <FadeIn>
            <SectionHeading
              id="cbam-reg-heading"
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
            />
          </FadeIn>
        </PageContainer>
      </FullBleedSection>

      <FullBleedSection className="section-light pb-14 lg:pb-16">
        <PageContainer className="section-content min-w-0 max-w-3xl">
          <div className="space-y-10">
            {SECTION_KEYS.map((key, i) => (
              <FadeIn key={key} delay={i * 0.03}>
                <section>
                  <h2 className="text-lg font-semibold text-[#071225] lg:text-xl">
                    {t(`sections.${key}.title`)}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                    {t(`sections.${key}.body`)}
                  </p>
                </section>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.15}>
            <div className="mt-14 overflow-hidden rounded-[1.25rem] border border-[#7c3aed]/20 bg-gradient-to-br from-[#7c3aed]/[0.06] via-white to-[#2563eb]/[0.04] p-5 shadow-card sm:rounded-[1.75rem] sm:p-8 lg:p-10">
              <div className="grid min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
                <div className="relative order-2 min-w-0 lg:order-1">
                  <div
                    className="pointer-events-none absolute -inset-4 rounded-3xl bg-[radial-gradient(circle,rgba(124,58,237,0.14),transparent_70%)] blur-2xl"
                    aria-hidden="true"
                  />
                  <CbamProductScreenshot
                    focus="full"
                    alt={t("cta.screenshotAlt")}
                    size="large"
                    elevated
                    className="relative shadow-dashboard-glow"
                  />
                </div>
                <div className="order-1 text-center lg:order-2 lg:text-left">
                  <h2 className="text-xl font-bold tracking-[-0.03em] text-[#071225] lg:text-2xl">
                    {t("cta.title")}
                  </h2>
                  <Link
                    href="/platform/cbam"
                    className={cn(
                      buttonVariants({ variant: "default", size: "lg" }),
                      "mt-6 inline-flex gap-2"
                    )}
                  >
                    {t("cta.button")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </PageContainer>
      </FullBleedSection>
    </>
  );
}
