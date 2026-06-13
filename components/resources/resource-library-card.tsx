"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { StatusPill } from "@/components/pages/shared/status-pill";
import { buttonVariants } from "@/components/ui/button";
import type { ResourceCategoryKey, ResourceKey, ResourceStatus } from "@/lib/resources-config";
import { cn } from "@/lib/utils";

const VALUE_KEYS = ["item1", "item2"] as const;

const STATUS_VARIANT: Record<ResourceStatus, "available" | "inPreparation" | "roadmap"> = {
  available: "available",
  inPreparation: "inPreparation",
  roadmap: "roadmap",
};

export interface ResourceLibraryCardProps {
  resourceKey: ResourceKey;
  category: ResourceCategoryKey;
  status: ResourceStatus;
  icon: LucideIcon;
  isExpanded?: boolean;
  onExpand?: (key: ResourceKey) => void;
  ctaAction: "checker" | "request" | "expand";
}

export function ResourceLibraryCard({
  resourceKey,
  category,
  status,
  icon: Icon,
  isExpanded = false,
  onExpand,
  ctaAction,
}: ResourceLibraryCardProps) {
  const t = useTranslations("resourcesPage");
  const ctaLabel = t(`resources.${resourceKey}.cta`);

  const ctaButtonClass = cn(
    buttonVariants({
      variant: status === "available" ? "default" : "accent-outline",
      size: "sm",
    }),
    "inline-flex w-full justify-center sm:w-auto"
  );

  return (
    <article
      className={cn(
        "resource-library-card card-premium flex h-full min-w-0 flex-col",
        status === "available" && "resource-library-card-available",
        status === "inPreparation" && "resource-library-card-preparation",
        status === "roadmap" && "resource-library-card-roadmap",
        isExpanded && "resource-library-card-expanded"
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

      <div className="resource-value-preview mt-3">
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

      <dl className="resource-library-meta mt-3">
        <div>
          <dt>{t("metadata.formatLabel")}</dt>
          <dd>{t(`resources.${resourceKey}.format`)}</dd>
        </div>
        <div>
          <dt>{t("metadata.statusLabel")}</dt>
          <dd>{t(`status.${status}`)}</dd>
        </div>
      </dl>

      <div className="resource-library-card-cta mt-auto pt-3">
        {ctaAction === "checker" ? (
          <Link href="/resources/cbam-cn-scope-checker" className={ctaButtonClass}>
            {ctaLabel}
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        ) : ctaAction === "request" ? (
          <Link href="/demo" className={ctaButtonClass}>
            {ctaLabel}
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        ) : (
          <button
            type="button"
            aria-expanded={isExpanded}
            aria-controls={`resource-detail-${resourceKey}`}
            onClick={() => onExpand?.(resourceKey)}
            className={ctaButtonClass}
          >
            {ctaLabel}
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}
      </div>
    </article>
  );
}

export type { ResourceKey, ResourceCategoryKey };
