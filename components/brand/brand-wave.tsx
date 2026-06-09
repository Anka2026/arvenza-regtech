"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";
import { BRAND } from "@/lib/assets";

interface BrandWaveProps {
  className?: string;
}

/**
 * Hero right column — single ARVENZA wave visual.
 * No nested logo overlay, no duplicate brand card, no logo fallback.
 */
export function BrandWave({ className }: BrandWaveProps) {
  const t = useTranslations("home.hero");

  return (
    <div
      className={cn("relative mx-auto w-full max-w-[560px] lg:max-w-[600px]", className)}
      aria-hidden="true"
    >
      <div className="hero-visual-panel">
        <div
          className="pointer-events-none absolute left-1/2 top-[42%] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full hero-glow-purple blur-3xl"
        />

        <SafeImage
          src={BRAND.wave}
          alt=""
          width={560}
          height={440}
          priority
          className="relative z-[1] mx-auto h-auto w-full max-w-[460px] lg:max-w-[500px]"
          objectFit="contain"
        />

        <div className="relative z-[2] mt-5 text-center lg:mt-6">
          <p className="text-xs font-bold tracking-[0.22em] text-gradient sm:text-[13px]">
            {t("taglineLine1")}
          </p>
          <p className="text-xs font-bold tracking-[0.22em] text-gradient sm:text-[13px]">
            {t("taglineLine2")}
          </p>
        </div>
      </div>
    </div>
  );
}
