"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { SectionShell, SectionIntro } from "@/components/ui/section-shell";
import { FadeIn } from "@/components/ui/fade-in";
import { BrowserMockup } from "@/components/ui/browser-mockup";
import { MODULE_KEYS, MODULE_SCREENSHOTS, type ModuleKey } from "@/lib/assets";
import { ArrowUpRight } from "lucide-react";

const CBAM_MODULE_KEYS = new Set(["cbamCalc", "cbamConsole"]);

function moduleHref(key: string): "/platform/cbam" | "/platform" {
  return CBAM_MODULE_KEYS.has(key) ? "/platform/cbam" : "/platform";
}

export function ModuleSpotlightSection() {
  const t = useTranslations("home.moduleSpotlight");

  return (
    <SectionShell id="modules" variant="light" ariaLabelledby="modules-heading">
      <FadeIn>
        <SectionIntro
          id="modules-heading"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          align="center"
          className="mx-auto text-center"
        />
      </FadeIn>

      <div className="grid gap-5 md:grid-cols-2">
        {MODULE_KEYS.map((key: ModuleKey, i) => (
          <FadeIn key={key} delay={i * 0.04}>
            <article className="card-structured group overflow-hidden">
              <div className="border-b border-border p-6 pb-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-semibold tabular-nums text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1.5 text-lg font-semibold leading-snug tracking-[-0.01em] text-navy">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="body-sm mt-2">{t(`items.${key}.description`)}</p>
                  </div>
                  <Link
                    href={moduleHref(key)}
                    className="mt-1 shrink-0 rounded-md border border-transparent p-1.5 text-muted-foreground/50 transition-colors hover:border-border hover:bg-surface-muted hover:text-navy"
                    aria-label={t(`items.${key}.title`)}
                  >
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <div className="bg-navy-dark/95 p-3 sm:p-4">
                <BrowserMockup
                  src={MODULE_SCREENSHOTS[key]}
                  alt={t(`items.${key}.screenshotAlt`)}
                  darkChrome
                  elevated
                  aspectClass="aspect-[16/9]"
                  className="border-navy-mid/50"
                />
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </SectionShell>
  );
}
