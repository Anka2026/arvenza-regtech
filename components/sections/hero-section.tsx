"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FileCheck, GitBranch, Scale, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { HeroProductStage } from "@/components/home/hero-product-stage";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { FadeIn } from "@/components/ui/fade-in";
import { PageContainer } from "@/components/layout/page-container";
import { cn } from "@/lib/utils";

const trustKeys = ["item1", "item2", "item3", "item4"] as const;
const signalKeys = ["regulatory", "supplierEvidence", "declarationReady", "workflow"] as const;
const signalIcons = [Scale, Users, FileCheck, GitBranch] as const;

export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section aria-labelledby="hero-heading" className="section-hero-light section-hero-home">
      <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-[0.42]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-24 top-12 h-80 w-80 rounded-full hero-glow-purple blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 top-24 h-72 w-72 rounded-full hero-glow-cyan blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(37,99,235,0.08),transparent_70%)]" aria-hidden="true" />
      <OrbitWaveMotif variant="hero" showOrbit showWaves />

      <PageContainer className="section-content min-w-0 page-hero-bottom page-hero-top">
        <div className="grid w-full min-w-0 grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,44%)_minmax(0,56%)] lg:gap-8 xl:gap-10">
          <div className="min-w-0 lg:max-w-[540px]">
            <FadeIn immediate>
              <p className="eyebrow-pill">{t("eyebrow")}</p>
              <p className="mt-3 text-sm font-semibold tracking-wide text-[#4338ca]">{t("platformTagline")}</p>
            </FadeIn>
            <FadeIn immediate>
              <h1 id="hero-heading" className="heading-hero-gradient mt-4 text-balance lg:mt-5">
                {t("title")}
              </h1>
            </FadeIn>
            <FadeIn immediate>
              <p className="body-lead-hero mt-4 lg:mt-5">{t("description")}</p>
            </FadeIn>

            <FadeIn immediate>
              <div className="hero-cta-panel mt-6">
                <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/demo"
                    className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full sm:w-auto")}
                  >
                    {t("ctaPrimary")}
                  </Link>
                  <Link
                    href="/platform/cbam"
                    className={cn(
                      buttonVariants({ variant: "accent-outline", size: "lg" }),
                      "w-full sm:w-auto"
                    )}
                  >
                    {t("ctaSecondary")}
                  </Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn immediate>
              <ul className="hero-signal-grid mt-6" aria-label={t("signalsAriaLabel")}>
                {signalKeys.map((key, i) => {
                  const Icon = signalIcons[i];
                  return (
                    <li key={key}>
                      <article className="hero-signal-card">
                        <div className="hero-signal-icon" aria-hidden="true">
                          <Icon className="h-4 w-4 text-[#7c3aed]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold leading-snug text-[#071225] lg:text-sm">
                            {t(`signals.${key}.title`)}
                          </p>
                          <p className="mt-0.5 text-[11px] leading-relaxed text-[#64748b] lg:text-xs">
                            {t(`signals.${key}.description`)}
                          </p>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </FadeIn>

            <FadeIn immediate>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t("trustAriaLabel")}>
                {trustKeys.map((key) => (
                  <li key={key}>
                    <span className="chip-dark">
                      <span className="chip-dot" aria-hidden="true" />
                      {t(`trust.${key}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          <FadeIn immediate direction="none" className="min-w-0 w-full lg:justify-self-end">
            <HeroProductStage />
          </FadeIn>
        </div>
      </PageContainer>
      <SectionWaveEdge className="opacity-55" />
    </section>
  );
}
