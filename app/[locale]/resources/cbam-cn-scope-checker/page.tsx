export const runtime = "edge";

import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CbamCnScopeCheckerPageContent } from "@/components/pages/cbam-cn-scope-checker-page-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.cbamCnScopeChecker" });
  return { title: t("title"), description: t("description") };
}

export default async function CbamCnScopeCheckerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CbamCnScopeCheckerPageContent />;
}
