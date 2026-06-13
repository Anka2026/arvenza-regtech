"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { X } from "lucide-react";
import { StatusPill } from "@/components/pages/shared/status-pill";
import { buttonVariants } from "@/components/ui/button";
import type { ResourceKey, ResourceCategoryKey, ResourceStatus } from "@/lib/resources-config";
import { cn } from "@/lib/utils";

const VALUE_KEYS = ["item1", "item2"] as const;

const STATUS_VARIANT = {
  available: "available",
  availableOnRequest: "available",
  inPreparation: "inPreparation",
  roadmap: "roadmap",
} as const;

interface ResourceDetailPanelProps {
  resourceKey: ResourceKey;
  category: ResourceCategoryKey;
  status: ResourceStatus;
  onClose: () => void;
}

export function ResourceDetailPanel({
  resourceKey,
  category,
  status,
  onClose,
}: ResourceDetailPanelProps) {
  const t = useTranslations("resourcesPage");

  const secondaryHref =
    status === "roadmap"
      ? "/solutions#roadmap"
      : status === "available" || status === "availableOnRequest"
        ? "/demo"
        : "/resources#subscribe";
  const secondaryLabel =
    status === "roadmap"
      ? t("detailPanel.followRoadmap")
      : status === "available" || status === "availableOnRequest"
        ? t("detailPanel.requestAccess")
        : t("detailPanel.getNotified");

  return (
    <div
      id={`resource-detail-${resourceKey}`}
      className="resource-detail-panel scroll-mt-28"
      role="region"
      aria-labelledby={`resource-detail-title-${resourceKey}`}
    >
      <div className="resource-detail-panel-inner">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="resource-category-label">{t(`categories.${category}`)}</p>
            <div className="mt-2">
              <StatusPill variant={STATUS_VARIANT[status]} label={t(`status.${status}`)} />
            </div>
            <h3
              id={`resource-detail-title-${resourceKey}`}
              className="mt-3 text-lg font-bold tracking-tight text-[#071225]"
            >
              {t(`resources.${resourceKey}.title`)}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="resource-detail-close"
            aria-label={t("detailPanel.close")}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[#475569] lg:text-[15px]">
          {t(`resources.${resourceKey}.description`)}
        </p>

        {t.has(`resources.${resourceKey}.detail`) ? (
          <p className="mt-3 text-sm leading-relaxed text-[#64748b]">
            {t(`resources.${resourceKey}.detail`)}
          </p>
        ) : null}

        <ul className="resource-value-list mt-4 list-none">
          {VALUE_KEYS.map((key) => (
            <li key={key} className="resource-value-item">
              <span className="resource-value-dot" aria-hidden="true" />
              {t(`resources.${resourceKey}.valuePreview.${key}`)}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={secondaryHref}
            className={cn(buttonVariants({ variant: "default", size: "sm" }))}
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
