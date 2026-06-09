export const runtime = 'edge';

import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const regulationKeys = [
  "cbam",
  "ppwr",
  "eudr",
  "dpp",
  "supplier",
  "csrd",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.regulations" });
  return { title: t("title"), description: t("description") };
}

export default async function RegulationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("regulations");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
      />
      <Section>
        <div className="space-y-6">
          {regulationKeys.map((key, i) => (
            <FadeIn key={key} delay={i * 0.06}>
              <article className="surface-card-hover p-8 md:p-10">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-gradient-brand px-3 py-1 text-xs font-bold text-white">
                    {t(`items.${key}.abbreviation`)}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-navy">
                  {t(`items.${key}.title`)}
                </h2>
                <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
                  {t(`items.${key}.description`)}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {([0, 1, 2, 3] as const).map((idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs text-muted-foreground"
                    >
                      <CheckCircle2 className="h-3 w-3 text-primary/60" />
                      {t(`items.${key}.coverage.${idx}`)}
                    </span>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <div className="mt-14 rounded-2xl border border-primary/15 bg-gradient-brand-soft p-10 text-center">
            <h3 className="text-xl font-bold text-navy">{t("cta.title")}</h3>
            <p className="mt-2 text-muted-foreground">{t("cta.description")}</p>
            <Button className="mt-6" size="lg" asChild>
              <Link href="/platform/cbam">{t("cta.button")}</Link>
            </Button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
