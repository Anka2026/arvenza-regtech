"use client";

import { useTranslations } from "next-intl";
import { SectionShell, SectionIntro } from "@/components/ui/section-shell";
import { FadeIn } from "@/components/ui/fade-in";

const statKeys = [
  "expertise",
  "modules",
  "regulations",
  "languages",
  "entity",
] as const;

export function TrustSection() {
  const t = useTranslations("home.trust");

  return (
    <SectionShell id="trust" variant="muted" ariaLabelledby="trust-heading">
      <FadeIn>
        <SectionIntro
          id="trust-heading"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          align="center"
          className="mx-auto text-center"
        />
      </FadeIn>
      <FadeIn delay={0.08}>
        <div className="overflow-hidden rounded-xl border border-border bg-white">
          <dl className="grid divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x lg:divide-y-0">
            {statKeys.map((key) => (
              <div
                key={key}
                className="flex flex-col items-center px-6 py-8 text-center sm:py-10"
              >
                <dt className="sr-only">{t(`items.${key}.label`)}</dt>
                <dd className="stat-value">{t(`items.${key}.value`)}</dd>
                <dd className="body-sm mt-3 max-w-[160px] font-medium text-navy/80">
                  {t(`items.${key}.label`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="body-sm mx-auto mt-8 max-w-2xl text-center text-[13px]">
          {t("entityNote")}
        </p>
      </FadeIn>
    </SectionShell>
  );
}
