"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { NavStatusBadge, type NavStatusKey } from "@/components/layout/nav/nav-status-badge";
import { cn } from "@/lib/utils";
import { platformModuleHref } from "@/lib/platform-module-anchors";

const PLATFORM_MODULE_KEYS = [
  { key: "cbamComplianceConsole", status: "pilot" as const },
  { key: "ppwr", status: "pilot" as const },
  { key: "agriClimate", status: "pilot" as const },
  { key: "eudr", status: "comingSoon" as const },
  { key: "dpp", status: "comingSoon" as const },
  { key: "supplierEvidence", status: "comingSoon" as const },
  { key: "esgReporting", status: "comingSoon" as const },
] as const;

const SOLUTION_KEYS = [
  { key: "cbam", status: "ready" as const, href: "/platform/cbam" as const },
  { key: "cbamComplianceConsole", status: "pilot" as const, href: "/solutions" as const },
  { key: "ppwr", status: "pilot" as const, href: "/solutions" as const },
  { key: "agriClimate", status: "pilot" as const, href: "/solutions" as const },
  { key: "eudr", status: "comingSoon" as const, href: "/solutions" as const },
  { key: "dpp", status: "comingSoon" as const, href: "/solutions" as const },
  { key: "supplierEvidence", status: "comingSoon" as const, href: "/solutions" as const },
  { key: "esgReporting", status: "comingSoon" as const, href: "/solutions" as const },
] as const;

const INDUSTRY_KEYS = [
  "steelAluminium",
  "packagingFmcg",
  "automotive",
  "electronics",
  "agriculture",
  "importers",
] as const;

const RESOURCE_KEYS = [
  { key: "regulationUpdates", href: "/regulations" as const },
  { key: "guides", href: "/resources" as const },
  { key: "cbamChecklist", href: "/resources" as const },
  { key: "insights", href: "/resources" as const },
] as const;

const COMPANY_KEYS = [
  { key: "about", href: "/company" as const },
  { key: "legal", href: "/legal/legal-notice" as const },
  { key: "contact", href: "/demo" as const },
] as const;

function statusLabel(
  tNav: ReturnType<typeof useTranslations<"nav">>,
  status: NavStatusKey
) {
  const map: Record<NavStatusKey, string> = {
    available: tNav("status.available"),
    pilot: tNav("status.pilot"),
    comingSoon: tNav("status.comingSoon"),
    roadmap: tNav("status.roadmap"),
    ready: tNav("status.ready"),
    coreProduct: tNav("status.coreProduct"),
  };
  return map[status];
}

interface PanelProps {
  onNavigate?: () => void;
  className?: string;
}

export function PlatformDropdownPanel({ onNavigate, className }: PanelProps) {
  const t = useTranslations("nav.platformMenu");
  const tNav = useTranslations("nav");

  return (
    <div className={cn("nav-dropdown-panel nav-dropdown-panel-wide", className)}>
      <div className="grid md:grid-cols-[1.12fr_1fr]">
        <div className="border-b border-[#dde5f2]/80 p-4 md:border-b-0 md:border-r md:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
            {t("featuredLabel")}
          </p>
          <div className="nav-featured-card mt-3">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <NavStatusBadge status="coreProduct" label={t("featuredBadge")} />
              <NavStatusBadge status="ready" label={t("featuredStatus")} />
            </div>
            <h3 className="text-base font-semibold leading-snug text-[#071225] lg:text-[17px]">
              {t("featuredTitle")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#64748b]">{t("featuredDescription")}</p>
            <Link
              href="/platform/cbam"
              onClick={onNavigate}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#7c3aed] transition-colors hover:text-[#6d28d9]"
            >
              {t("featuredCta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="p-4 md:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
            {t("modulesLabel")}
          </p>
          <ul className="mt-3 max-h-[280px] space-y-1 overflow-y-auto pr-1">
            {PLATFORM_MODULE_KEYS.map(({ key, status }) => {
              const moduleTitle = t(`modules.${key}.title`);
              const href = platformModuleHref(key);
              return (
              <li key={key}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  className="nav-dropdown-row group"
                  aria-label={moduleTitle}
                >
                  <span className="min-w-0 flex-1 break-words text-sm font-medium text-[#071225] group-hover:text-[#7c3aed]">
                    {moduleTitle}
                  </span>
                  <NavStatusBadge status={status} label={statusLabel(tNav, status)} />
                </Link>
              </li>
            );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function SolutionsDropdownPanel({ onNavigate, className }: PanelProps) {
  const t = useTranslations("nav.solutionsMenu");
  const tNav = useTranslations("nav");

  return (
    <div className={cn("nav-dropdown-panel w-[min(100vw-2rem,360px)]", className)}>
      <div className="p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
          {t("featuredLabel")}
        </p>
        <Link href="/platform/cbam" onClick={onNavigate} className="nav-featured-card-compact mt-2 block">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-[#071225]">{t("featuredTitle")}</span>
            <NavStatusBadge status="coreProduct" label={t("featuredBadge")} />
            <NavStatusBadge status="ready" label={t("featuredStatus")} />
          </div>
        </Link>
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
          {t("areasLabel")}
        </p>
        <ul className="mt-2 space-y-1">
          {SOLUTION_KEYS.map(({ key, status, href }) => (
            <li key={key}>
              <Link href={href} onClick={onNavigate} className="nav-dropdown-row group">
                <span className="min-w-0 flex-1 text-sm font-medium text-[#071225] group-hover:text-[#7c3aed]">
                  {t(`areas.${key}`)}
                </span>
                <NavStatusBadge status={status} label={statusLabel(tNav, status)} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function IndustriesDropdownPanel({ onNavigate, className }: PanelProps) {
  const t = useTranslations("nav.industriesMenu");

  return (
    <div className={cn("nav-dropdown-panel w-[min(100vw-2rem,320px)]", className)}>
      <ul className="p-2">
        {INDUSTRY_KEYS.map((key) => (
          <li key={key}>
            <Link href="/industries" onClick={onNavigate} className="nav-dropdown-row-simple">
              {t(`items.${key}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ResourcesDropdownPanel({ onNavigate, className }: PanelProps) {
  const t = useTranslations("nav.resourcesMenu");

  return (
    <div className={cn("nav-dropdown-panel w-[min(100vw-2rem,300px)]", className)}>
      <ul className="p-2">
        {RESOURCE_KEYS.map(({ key, href }) => (
          <li key={key}>
            <Link href={href} onClick={onNavigate} className="nav-dropdown-row-simple">
              {t(`items.${key}`)}
            </Link>
          </li>
        ))}
        <li>
          <span className="nav-dropdown-row-simple cursor-default text-[#94a3b8]">
            {t("items.moreComingSoon")}
          </span>
        </li>
      </ul>
    </div>
  );
}

export function CompanyDropdownPanel({ onNavigate, className }: PanelProps) {
  const t = useTranslations("nav.companyMenu");

  return (
    <div className={cn("nav-dropdown-panel w-[min(100vw-2rem,320px)]", className)}>
      <ul className="p-2">
        {COMPANY_KEYS.map(({ key, href }) => (
          <li key={key}>
            <Link href={href} onClick={onNavigate} className="nav-dropdown-row-simple">
              {t(`items.${key}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export {
  PLATFORM_MODULE_KEYS,
  SOLUTION_KEYS,
  INDUSTRY_KEYS,
  RESOURCE_KEYS,
  COMPANY_KEYS,
};
