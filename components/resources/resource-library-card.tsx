"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { StatusPill } from "@/components/pages/shared/status-pill";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CategoryKey = "cbamGuides" | "checklists" | "sectorBriefings" | "regulationUpdates";
type ResourceStatus = "available" | "inPreparation" | "roadmap";

export type ResourceKey =
  | "cbamChecklist"
  | "supplierTemplate"
  | "embeddedEmissionsGuide"
  | "cbamCnScope"
  | "ppwrPackaging"
  | "eudrBrief";

const VALUE_KEYS = ["item1", "item2"] as const;

const STATUS_VARIANT: Record<ResourceStatus, "available" | "inPreparation" | "roadmap"> = {
  available: "available",
  inPreparation: "inPreparation",
  roadmap: "roadmap",
};

export interface ResourceLibraryCardProps {
  resourceKey: ResourceKey;
  category: CategoryKey;
  status: ResourceStatus;
  icon: LucideIcon;
  href: "/demo" | "/solutions#roadmap";
  anchorToSubscribe?: boolean;
  anchorToChecker?: boolean;
}

export function ResourceLibraryCard({
  resourceKey,
  category,
  status,
  icon: Icon,
  href,
  anchorToSubscribe = false,
  anchorToChecker = false,
}: ResourceLibraryCardProps) {
  const t = useTranslations("resourcesPage");

  const ctaLabel = t(`resources.${resourceKey}.cta`);

  return (
    <article
      className={cn(
        "resource-library-card card-premium flex h-full min-w-0 flex-col",
        status === "available" && "resource-library-card-available",
        status === "inPreparation" && "resource-library-card-preparation",
        status === "roadmap" && "resource-library-card-roadmap"
      )}
    >
      <div className="resource-library-card-header">
        <div className="resource-library-card-icon-wrap" aria-hidden="true">
          <Icon className="h-5 w-5 text-[#7c3aed]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="resource-category-label">{t(`categories.${category}`)}</p>
          <div className="mt-2">
            <StatusPill variant={STATUS_VARIANT[status]} label={t(`status.${status}`)} />
          </div>
        </div>
      </div>

      <h3 className="resource-library-card-title">{t(`resources.${resourceKey}.title`)}</h3>

      <p className="resource-library-card-desc">{t(`resources.${resourceKey}.description`)}</p>

      <div className="resource-value-preview mt-4">
        <p className="resource-cluster-label">{t("fields.valuePreview")}</p>
        <ul className="resource-value-list mt-2 list-none">
          {VALUE_KEYS.map((key) => (
            <li key={key} className="resource-value-item">
              <span className="resource-value-dot" aria-hidden="true" />
              {t(`resources.${resourceKey}.valuePreview.${key}`)}
            </li>
          ))}
        </ul>
      </div>

      <dl className="resource-library-meta mt-4">
        <div>
          <dt>{t("metadata.formatLabel")}</dt>
          <dd>{t(`resources.${resourceKey}.format`)}</dd>
        </div>
        <div>
          <dt>{t("metadata.statusLabel")}</dt>
          <dd>{t(`status.${status}`)}</dd>
        </div>
      </dl>

      <div className="resource-library-card-cta mt-auto pt-4">
        {anchorToChecker ? (
          <a
            href="#cbam-cn-scope-checker"
            className={cn(
              buttonVariants({
                variant: status === "available" ? "default" : "accent-outline",
                size: "sm",
              }),
              "inline-flex w-full justify-center sm:w-auto"
            )}
          >
            {ctaLabel}
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : anchorToSubscribe ? (
          <a
            href="#subscribe"
            className={cn(
              buttonVariants({
                variant: status === "available" ? "default" : "accent-outline",
                size: "sm",
              }),
              "inline-flex w-full justify-center sm:w-auto"
            )}
          >
            {ctaLabel}
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : (
          <Link
            href={href}
            className={cn(
              buttonVariants({
                variant: status === "available" ? "default" : "accent-outline",
                size: "sm",
              }),
              "inline-flex w-full justify-center sm:w-auto"
            )}
          >
            {ctaLabel}
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}
