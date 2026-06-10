"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { OrbitWaveMotif } from "@/components/home/orbit-wave-motif";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { cn } from "@/lib/utils";

export function CtaSection() {
  const t = useTranslations("home.cta");

  return (
    <FullBleedSection ariaLabelledby="cta-heading" className="section-light home-section-compact !pb-8 lg:!pb-10">
      <OrbitWaveMotif variant="cta" orbitAlign="center" />
      <PageContainer className="section-content">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[1.75rem] premium-cta-band px-6 py-10 sm:px-10 sm:py-11 lg:px-14 lg:py-12">
            <div
              className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[120%] -translate-x-1/2 rounded-full bg-white/10 blur-3xl motion-reduce:animate-none animate-[glow-pulse_8s_ease-in-out_infinite]"
              aria-hidden="true"
            />
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h2
                id="cta-heading"
                className="text-[clamp(1.625rem,2.2vw+0.5rem,2.25rem)] font-bold tracking-[-0.03em] text-white"
              >
                {t("title")}
              </h2>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/demo"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "w-full border-0 bg-white text-[#071225] shadow-card hover:bg-white/95 sm:w-auto"
                  )}
                >
                  {t("primary")}
                </Link>
                <Link
                  href="/platform/cbam"
                  className={cn(
                    buttonVariants({ variant: "accent-outline", size: "lg" }),
                    "w-full border-white/40 bg-transparent text-white hover:bg-white/10 sm:w-auto"
                  )}
                >
                  {t("secondary")}
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </PageContainer>
    </FullBleedSection>
  );
}
