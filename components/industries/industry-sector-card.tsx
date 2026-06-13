"use client";

import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { StatusPill } from "@/components/pages/shared/status-pill";
import { buttonVariants } from "@/components/ui/button";
import {
  industrySectorAnchor,
  industrySectorHref,
  type IndustrySectorKey,
} from "@/lib/industry-sector-anchors";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type IndustryKey = IndustrySectorKey;

type ProductKey =
  | "cbamEngine"
  | "cbamConsole"
  | "ppwr"
  | "dpp"
  | "agriClimate"
  | "eudr";

type CapabilityStatus = "ready" | "pilot" | "comingSoon";

const WORKFLOW_KEYS = ["step1", "step2", "step3"] as const;

const PRODUCT_HREF = {
  cbamEngine: "/platform/cbam",
  cbamConsole: "/platform/cbam-console",
  ppwr: "/platform/ppwr",
  dpp: "/platform/digital-product-passport",
  agriClimate: "/platform/agri-climate",
  eudr: "/platform/eudr",
} as const;

const ACCENT_CLASS: Record<IndustryKey, string> = {
  steelAluminium: "industry-card-accent-steel",
  automotive: "industry-card-accent-auto",
  packagingFmcg: "industry-card-accent-packaging",
  electronicsBatteries: "industry-card-accent-electronics",
  agricultureFood: "industry-card-accent-agri",
  importersExporters: "industry-card-accent-trade",
};

export interface IndustrySectorCardProps {
  industryKey: IndustryKey;
  icon: LucideIcon;
  capabilities: { productKey: ProductKey; status: CapabilityStatus }[];
}

export function IndustrySectorCard({ industryKey, icon: Icon, capabilities }: IndustrySectorCardProps) {
  const t = useTranslations("industriesPage");
  const tStatus = useTranslations("nav.status");
  const locale = useLocale() as Locale;

  const primaryCapability = capabilities[0];
  const primaryHref = PRODUCT_HREF[primaryCapability.productKey];
  const sectorAnchor = industrySectorAnchor(locale, industryKey);
  const sectorHref = industrySectorHref(locale, industryKey);

  return (
    <article
      id={sectorAnchor}
      className={cn(
        "industry-sector-card card-premium flex h-full min-w-0 scroll-mt-28 flex-col",
        ACCENT_CLASS[industryKey]
      )}
    >
      <Link
        href={sectorHref}
        className="industry-sector-card-visual industry-sector-card-link group/visual block"
        aria-labelledby={`${sectorAnchor}-title`}
      >
        <div className="industry-sector-card-visual-glow" aria-hidden="true" />
        <Icon className="industry-sector-card-visual-icon h-8 w-8 transition-transform duration-200 group-hover/visual:scale-105" />
        <div className="industry-sector-card-visual-rail">
          {WORKFLOW_KEYS.map((key, i) => (
            <span key={key} className="industry-sector-visual-node">
              {String(i + 1).padStart(2, "0")}
            </span>
          ))}
        </div>
      </Link>

      <div className="industry-sector-card-body flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3
            id={`${sectorAnchor}-title`}
            className="text-base font-bold leading-snug tracking-[-0.02em] text-[#071225] lg:text-[17px]"
          >
            <Link
              href={sectorHref}
              className="industry-sector-card-title-link transition-colors hover:text-[#7c3aed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]/40 focus-visible:ring-offset-2"
            >
              {t(`items.${industryKey}.title`)}
            </Link>
          </h3>
          <Link
            href={sectorHref}
            className="industry-sector-icon-badge shrink-0 transition-colors hover:border-[#7c3aed]/35 hover:bg-[#7c3aed]/10"
            aria-label={t(`items.${industryKey}.title`)}
          >
            <Icon className="h-4 w-4 text-[#7c3aed]" />
          </Link>
        </div>

        <p className="industry-regulation-chip mt-3">{t(`items.${industryKey}.regulatoryPressure`)}</p>

        <div className="industry-sector-signal-block mt-4">
          <p className="industry-field-label">{t("fields.sectorSignal")}</p>
          <p className="industry-sector-signal mt-1.5">{t(`items.${industryKey}.sectorSignal`)}</p>
        </div>

        <div className="mt-4">
          <p className="industry-field-label">{t("fields.workflowSummary")}</p>
          <ol className="industry-workflow-summary mt-2 list-none">
            {WORKFLOW_KEYS.map((key) => (
              <li key={key} className="industry-workflow-summary-item">
                <span className="industry-workflow-summary-dot" aria-hidden="true" />
                {t(`items.${industryKey}.workflowSteps.${key}`)}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-4 rounded-lg border border-[#dde5f2]/90 bg-[#f8fafc]/80 px-3 py-2.5">
          <p className="industry-field-label">{t("fields.operationalChallenge")}</p>
          <p className="mt-1.5 text-xs leading-relaxed text-[#64748b] lg:text-sm">
            {t(`items.${industryKey}.operationalChallenge`)}
          </p>
        </div>

        <div className="mt-4">
          <p className="industry-field-label">{t("fields.relevantCapability")}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {capabilities.map(({ productKey, status }) => (
              <li key={productKey}>
                <Link
                  href={PRODUCT_HREF[productKey]}
                  className="industry-capability-chip group inline-flex items-center gap-1.5"
                >
                  <span>{t(`products.${productKey}`)}</span>
                  <StatusPill variant={status} label={tStatus(status)} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="industry-sector-card-cta mt-5 flex flex-col gap-2 border-t border-[#dde5f2]/80 pt-4 sm:flex-row sm:flex-wrap">
        <Link
          href={primaryHref}
          className={cn(buttonVariants({ variant: "default", size: "sm" }), "w-full justify-center sm:w-auto")}
        >
          {t("viewSectorWorkflow")}
          <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
        </Link>
        <Link
          href="/demo"
          className={cn(buttonVariants({ variant: "accent-outline", size: "sm" }), "w-full justify-center sm:w-auto")}
        >
          {t(`items.${industryKey}.cta`)}
        </Link>
        <Link
          href={primaryHref}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "w-full justify-center text-[#64748b] sm:w-auto"
          )}
        >
          {t(`items.${industryKey}.secondaryCta`)}
        </Link>
      </div>
    </article>
  );
}
