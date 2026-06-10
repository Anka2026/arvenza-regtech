"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/ui/fade-in";
import { ProductScreenshot } from "@/components/ui/product-screenshot";
import { CheckCircle2 } from "lucide-react";
import { type ModuleScreenshotKey } from "@/lib/assets";
import { LEGACY_MODULE_KEY_TO_PLATFORM } from "@/lib/platform-modules";
import { cn } from "@/lib/utils";

const moduleKeys: ModuleScreenshotKey[] = [
  "cbamCalc",
  "cbamConsole",
  "eudr",
  "ppwr",
  "dpp",
  "supplier",
  "esg",
  "agri",
];

interface ModuleShowcaseProps {
  namespace?: "platform";
}

export function ModuleShowcase({ namespace = "platform" }: ModuleShowcaseProps) {
  const t = useTranslations(namespace);

  return (
    <div className="space-y-16 md:space-y-24">
      {moduleKeys.map((key, i) => {
        const reversed = i % 2 === 1;
        return (
          <FadeIn key={key} delay={i * 0.04}>
            <article
              className={cn(
                "grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16",
                reversed && "lg:[direction:rtl]"
              )}
            >
              <div className={cn(reversed && "lg:[direction:ltr]")}>
                <ProductScreenshot
                  moduleKey={LEGACY_MODULE_KEY_TO_PLATFORM[key]}
                  presentation="hero"
                  alt={t(`modules.${key}.title`)}
                  aspectClass="aspect-[16/10]"
                  elevated
                />
              </div>

              <div className={cn("flex flex-col", reversed && "lg:[direction:ltr]")}>
                <span className="mb-3 inline-flex w-fit rounded-md border border-border bg-surface-muted px-2.5 py-1 text-[11px] font-bold tabular-nums text-navy">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl font-bold tracking-[-0.01em] text-navy md:text-2xl">
                  {t(`modules.${key}.title`)}
                </h2>
                <p className="body-lead mt-4 text-base">
                  {t(`modules.${key}.description`)}
                </p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {([0, 1, 2, 3] as const).map((idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-indigo-700/80"
                        aria-hidden="true"
                      />
                      <span className="text-muted-foreground">
                        {t(`modules.${key}.features.${idx}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </FadeIn>
        );
      })}
    </div>
  );
}
