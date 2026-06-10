"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "arvenza-cookie-consent";

export function CookieConsentBanner() {
  const t = useTranslations("cookieConsent");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* storage unavailable */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("ariaLabel")}
      className="cookie-consent-banner fixed inset-x-0 bottom-0 z-50 border-t border-[#dde5f2] bg-white/95 px-4 py-4 shadow-[0_-8px_32px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="min-w-0 flex-1 text-sm leading-relaxed text-[#475569]">{t("message")}</p>
        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => dismiss("accepted")}
            className={cn(
              "inline-flex items-center justify-center rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white",
              "transition-colors hover:bg-[#6d28d9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c3aed]"
            )}
          >
            {t("accept")}
          </button>
          <button
            type="button"
            onClick={() => dismiss("rejected")}
            className={cn(
              "inline-flex items-center justify-center rounded-lg border border-[#dde5f2] bg-white px-4 py-2 text-sm font-semibold text-[#071225]",
              "transition-colors hover:border-[#c7d2e7] hover:bg-[#f8fafc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c3aed]"
            )}
          >
            {t("reject")}
          </button>
          <Link
            href="/legal/cookie-policy"
            className="inline-flex items-center justify-center px-2 py-2 text-sm font-semibold text-[#7c3aed] underline-offset-2 hover:underline"
          >
            {t("policyLink")}
          </Link>
        </div>
      </div>
    </div>
  );
}
