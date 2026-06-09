export const runtime = 'edge';

import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { DemoPage } from "@/components/pages/demo-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.demo" });
  return { title: t("title"), description: t("description") };
}

export default async function DemoRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DemoPage />;
}
