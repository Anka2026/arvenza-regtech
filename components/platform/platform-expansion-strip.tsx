"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { NavStatusBadge } from "@/components/layout/nav/nav-status-badge";
import { platformModuleHref, PLATFORM_MODULE_BY_KEY } from "@/lib/platform-modules";
import { moduleStatusNavKey } from "@/lib/module-status-display";

const EARLY_ACCESS_KEYS = ["ppwr", "agriClimate"] as const;
const ON_REQUEST_KEYS = ["cbamComplianceConsole", "supplierEvidence"] as const;
const ROADMAP_KEYS = ["eudr", "dpp", "esgReporting"] as const;

export function PlatformExpansionStrip() {
  const t = useTranslations("platformHub.expansion");
  const tNav = useTranslations("nav.platformMenu.modules");
  const tStatus = useTranslations("nav.status");

  return (
    <div className="platform-expansion-strip mt-10 rounded-[1.25rem] border border-[#dde5f2]/90 bg-[#f8fafc]/80 p-5 sm:p-6 lg:mt-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 max-w-2xl">
          <h2 className="text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">
            {t("title")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
            {t("description")}
          </p>
        </div>
        <Link
          href="/solutions"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#7c3aed] transition-colors hover:text-[#6d28d9]"
        >
          {t("viewSolutionsCta")}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
            {t("earlyAccessLabel")}
          </p>
          <ul className="mt-3 space-y-2">
            {EARLY_ACCESS_KEYS.map((key) => {
              const statusKey = moduleStatusNavKey(PLATFORM_MODULE_BY_KEY[key].status);
              return (
              <li key={key}>
                <Link
                  href={platformModuleHref(key)}
                  className="platform-expansion-link group flex items-center justify-between gap-3 rounded-lg border border-[#dde5f2]/80 bg-white px-3 py-2.5 transition-colors hover:border-[#7c3aed]/25 hover:bg-[#7c3aed]/[0.03]"
                >
                  <span className="min-w-0 text-sm font-medium text-[#071225] group-hover:text-[#7c3aed]">
                    {tNav(`${key}.title`)}
                  </span>
                  <NavStatusBadge status={statusKey === "earlyAccess" ? "pilot" : "available"} label={tStatus(statusKey)} />
                </Link>
              </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
            {t("onRequestLabel")}
          </p>
          <ul className="mt-3 space-y-2">
            {ON_REQUEST_KEYS.map((key) => {
              const statusKey = moduleStatusNavKey(PLATFORM_MODULE_BY_KEY[key].status);
              return (
              <li key={key}>
                <Link
                  href={platformModuleHref(key)}
                  className="platform-expansion-link group flex items-center justify-between gap-3 rounded-lg border border-[#dde5f2]/80 bg-white px-3 py-2.5 transition-colors hover:border-[#7c3aed]/25 hover:bg-[#7c3aed]/[0.03]"
                >
                  <span className="min-w-0 text-sm font-medium text-[#071225] group-hover:text-[#7c3aed]">
                    {tNav(`${key}.title`)}
                  </span>
                  <NavStatusBadge status="available" label={tStatus(statusKey)} />
                </Link>
              </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
            {t("roadmapLabel")}
          </p>
          <ul className="mt-3 space-y-2">
            {ROADMAP_KEYS.map((key) => (
              <li key={key}>
                <Link
                  href={platformModuleHref(key)}
                  className="platform-expansion-link group flex items-center justify-between gap-3 rounded-lg border border-[#dde5f2]/80 bg-white px-3 py-2.5 transition-colors hover:border-[#7c3aed]/25 hover:bg-[#7c3aed]/[0.03]"
                >
                  <span className="min-w-0 text-sm font-medium text-[#071225] group-hover:text-[#7c3aed]">
                    {tNav(`${key}.title`)}
                  </span>
                  <NavStatusBadge status="roadmap" label={tStatus("roadmap")} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
