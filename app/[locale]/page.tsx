import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { JourneySection } from "@/components/sections/journey-section";
import { SupplierPortalBlock } from "@/components/sections/supplier-portal-block";
import { CalculationBlock } from "@/components/sections/calculation-block";
import { EvidenceBlock } from "@/components/sections/evidence-block";
import { PlatformRoadmapSection } from "@/components/sections/platform-roadmap-section";
import { TrustBlockSection } from "@/components/sections/trust-block-section";
import { CtaSection } from "@/components/sections/cta-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://www.arvenza.net"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        tr: "/tr",
        nl: "/nl",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://www.arvenza.net/${locale}`,
      siteName: "Arvenza RegTech",
      locale,
      type: "website",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ProblemSection />
      <JourneySection />
      <SupplierPortalBlock />
      <CalculationBlock />
      <EvidenceBlock />
      <PlatformRoadmapSection />
      <TrustBlockSection />
      <CtaSection />
    </>
  );
}
