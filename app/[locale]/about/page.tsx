import { setRequestLocale } from "next-intl/server";
import { redirect, type Locale } from "@/i18n/routing";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  redirect({ href: "/company", locale: locale as Locale });
}
