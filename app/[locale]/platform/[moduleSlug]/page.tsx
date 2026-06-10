export const runtime = "edge";

import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PlatformModulePage } from "@/components/platform/platform-module-page";
import {
  getPlatformModuleBySlug,
  PLATFORM_DYNAMIC_MODULE_SLUGS,
} from "@/lib/platform-modules";
import { locales } from "@/i18n/routing";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    PLATFORM_DYNAMIC_MODULE_SLUGS.map((moduleSlug) => ({ locale, moduleSlug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; moduleSlug: string }>;
}): Promise<Metadata> {
  const { locale, moduleSlug } = await params;
  const platformModule = getPlatformModuleBySlug(moduleSlug);
  if (!platformModule) return {};

  const t = await getTranslations({
    locale,
    namespace: `metadata.platformModules.${platformModule.i18nKey}`,
  });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://www.arvenza.net"),
    alternates: {
      canonical: `/${locale}${platformModule.route}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}${platformModule.route}`])),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://www.arvenza.net/${locale}${platformModule.route}`,
      siteName: "Arvenza RegTech",
      locale,
      type: "website",
    },
  };
}

export default async function PlatformModuleRoute({
  params,
}: {
  params: Promise<{ locale: string; moduleSlug: string }>;
}) {
  const { locale, moduleSlug } = await params;
  setRequestLocale(locale);

  const platformModule = getPlatformModuleBySlug(moduleSlug);
  if (!platformModule || platformModule.slug === "cbam") notFound();

  return <PlatformModulePage module={platformModule} />;
}
