export const runtime = 'edge';

import { setRequestLocale } from "next-intl/server";
import { redirect, type Locale } from "@/i18n/routing";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  redirect({ href: "/demo", locale: locale as Locale });
}
