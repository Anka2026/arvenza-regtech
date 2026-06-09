export const runtime = 'edge';

import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  LegalDocumentPage,
  type LegalDocumentKey,
} from "@/components/pages/legal-document-page";
import { locales } from "@/i18n/routing";

const SLUG_TO_KEY: Record<string, LegalDocumentKey> = {
  "privacy-policy": "privacyPolicy",
  terms: "terms",
  "cookie-policy": "cookiePolicy",
  "legal-notice": "legalNotice",
  accessibility: "accessibility",
};

const METADATA_NAMESPACE: Record<LegalDocumentKey, string> = {
  privacyPolicy: "metadata.legalPrivacy",
  terms: "metadata.legalTerms",
  cookiePolicy: "metadata.legalCookies",
  legalNotice: "metadata.legalNotice",
  accessibility: "metadata.legalAccessibility",
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    Object.keys(SLUG_TO_KEY).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const documentKey = SLUG_TO_KEY[slug];
  if (!documentKey) return {};
  const t = await getTranslations({ locale, namespace: METADATA_NAMESPACE[documentKey] });
  return { title: t("title"), description: t("description") };
}

export default async function LegalDocumentRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const documentKey = SLUG_TO_KEY[slug];
  if (!documentKey) notFound();
  setRequestLocale(locale);
  return <LegalDocumentPage documentKey={documentKey} />;
}
