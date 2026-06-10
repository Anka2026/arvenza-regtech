"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { FadeIn } from "@/components/ui/fade-in";
import { CbamProductScreenshot } from "@/components/ui/cbam-product-screenshot";
import { PageContainer } from "@/components/layout/page-container";
import { cn } from "@/lib/utils";

const trustKeys = ["item1", "item2", "item3", "item4"] as const;

export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section aria-labelledby="hero-heading" className="section-hero-light">
      <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-[0.35]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full hero-glow-purple blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-16 bottom-8 h-64 w-64 rounded-full hero-glow-cyan blur-3xl" aria-hidden="true" />
      <OrbitWaveMotif variant="hero" showOrbit showWaves />

      <PageContainer className="section-content min-w-0 pb-14 pt-24 lg:min-h-[560px] lg:pb-16 lg:pt-28">
        <div className="grid w-full min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-[48%_52%] lg:gap-8 xl:gap-10">
          <div className="min-w-0 max-w-[560px]">
            <FadeIn immediate>
              <p className="eyebrow-pill">{t("eyebrow")}</p>
              <p className="mt-3 text-sm font-medium text-[#64748b]">{t("platformTagline")}</p>
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
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                <Link
                  href="/demo"
                  className={cn(buttonVariants({ variant: "default", size: "default" }), "w-full sm:w-auto")}
                >
                  {t("ctaPrimary")}
                </Link>
                <Link
                  href="/platform"
                  className={cn(
                    buttonVariants({ variant: "accent-outline", size: "default" }),
                    "w-full sm:w-auto"
                  )}
                >
                  {t("ctaSecondary")}
                </Link>
              </div>
            </FadeIn>
            <FadeIn immediate>
              <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={t("trustAriaLabel")}>
                {trustKeys.map((key) => (
                  <li key={key}>
                    <span className="chip-dark">
                      <span className="chip-dot" aria-hidden="true" />
                      {t(`trust.${key}`)}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#64748b]">
                {t("platformVision")}
              </p>
            </FadeIn>
          </div>

          <FadeIn immediate direction="none" className="hero-product-stage relative flex min-w-0 w-full justify-center lg:justify-end">
            <div className="relative w-full min-w-0 max-w-[560px]">
              <div
                className="pointer-events-none absolute -inset-4 rounded-3xl bg-[radial-gradient(circle,rgba(124,58,237,0.18),transparent_70%)] blur-2xl"
                aria-hidden="true"
              />
              <CbamProductScreenshot
                focus="full"
                alt={t("screenshotAlt")}
                size="large"
                elevated
                priority
                className="relative shadow-dashboard-glow"
              />
              <div className="pointer-events-none absolute bottom-4 left-4 hidden max-w-[160px] rounded-xl border border-[rgba(120,130,180,0.22)] bg-white/92 p-2.5 shadow-card backdrop-blur-sm sm:block motion-reduce:animate-none animate-[float-dot_5s_ease-in-out_infinite]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gradient">
                  {t("mockCards.supplier")}
                </p>
                <p className="mt-1 text-[11px] text-[#64748b]">{t("mockCards.supplierStatus")}</p>
              </div>
              <div className="pointer-events-none absolute right-4 top-16 hidden max-w-[150px] rounded-xl border border-[rgba(120,130,180,0.22)] bg-white/92 p-2.5 shadow-card backdrop-blur-sm sm:block motion-reduce:animate-none animate-[float-dot_6s_ease-in-out_infinite_0.8s]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gradient">
                  {t("mockCards.emissions")}
                </p>
                <p className="mt-1 text-[11px] font-semibold text-[#071225]">{t("mockCards.emissionsValue")}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </PageContainer>
      <SectionWaveEdge className="opacity-40" />
    </section>
  );
}
