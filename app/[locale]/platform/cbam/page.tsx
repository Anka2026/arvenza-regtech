export const runtime = 'edge';

import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { CbamPlatformPage } from "@/components/platform/cbam/cbam-platform-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.cbamPlatform" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://www.arvenza.net"),
    alternates: {
      canonical: `/${locale}/platform/cbam`,
      languages: {
        en: "/en/platform/cbam",
        tr: "/tr/platform/cbam",
        nl: "/nl/platform/cbam",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://www.arvenza.net/${locale}/platform/cbam`,
      siteName: "Arvenza RegTech",
      locale,
      type: "website",
    },
  };
}

export default async function CbamPlatformRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CbamPlatformPage />;
}
