"use client";

import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";
import { PlatformScreenshotPreview } from "@/components/ui/browser-mockup";

const bulletKeys = ["item1", "item2", "item3", "item4"] as const;

export function PlatformPreviewSection() {
  const t = useTranslations("home.platformPreview");

  return (
    <Section variant="muted" id="platform-preview" ariaLabelledby="platform-preview-heading">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
        <FadeIn className="order-2 lg:order-1">
          <PlatformScreenshotPreview className="mx-auto max-w-xl lg:max-w-none" />
        </FadeIn>

        <div className="order-1 lg:order-2">
          <FadeIn>
            <SectionHeader
              id="platform-preview-heading"
              title={t("title")}
              description={t("description")}
              className="mb-8 lg:mb-0"
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <ul className="space-y-2.5 lg:mt-10">
              {bulletKeys.map((key) => (
                <li key={key}>
                  <div className="flex items-center gap-4 rounded-xl border border-border/60 bg-white/70 px-4 py-3.5 transition-all duration-200 hover:border-primary/15 hover:bg-white hover:shadow-soft">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/10 bg-gradient-brand-soft">
                      <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                    </div>
                    <span className="text-[15px] font-medium text-navy">
                      {t(`bullets.${key}`)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
