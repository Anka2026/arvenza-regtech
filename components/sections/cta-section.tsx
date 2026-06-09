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
    <FullBleedSection ariaLabelledby="cta-heading" className="section-light !pb-10 lg:!pb-12">
      <OrbitWaveMotif variant="cta" orbitAlign="center" />
      <PageContainer className="section-content">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-cta px-8 py-11 shadow-[0_24px_64px_rgba(124,58,237,0.28)] sm:px-12 sm:py-12 lg:px-16 lg:py-14">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.22),transparent_55%)]"
              aria-hidden="true"
            />
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
              <div className="mt-8">
                <Link
                  href="/demo"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "w-full border-0 bg-white text-[#071225] shadow-card hover:bg-white/95 sm:w-auto"
                  )}
                >
                  {t("primary")}
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </PageContainer>
    </FullBleedSection>
  );
}
