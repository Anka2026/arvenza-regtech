"use client";

import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Calculator,
  Fingerprint,
  LayoutDashboard,
  Package,
  Sprout,
  TreePine,
  Users,
  BarChart3,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { StatusPill } from "@/components/pages/shared/status-pill";
import { SolutionWorkflowRail, type SolutionWorkflowKey } from "@/components/solutions/solution-workflow-rail";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SolutionStatus = "ready" | "pilot" | "comingSoon";

const FEATURE_KEYS = ["item1", "item2", "item3"] as const;

const SOLUTION_ICONS: Record<SolutionWorkflowKey, typeof Calculator> = {
  cbamWorkflows: Calculator,
  cbamConsole: LayoutDashboard,
  ppwr: Package,
  agriClimate: Sprout,
  eudr: TreePine,
  dpp: Fingerprint,
  supplierEvidence: Users,
  esgReporting: BarChart3,
};

const SOLUTION_HREF: Record<
  SolutionWorkflowKey,
  | "/platform/cbam"
  | "/platform/cbam-console"
  | "/platform/ppwr"
  | "/platform/agri-climate"
  | "/platform/eudr"
  | "/platform/digital-product-passport"
  | "/platform/supplier-evidence"
  | "/platform/esg-workspace"
  | "/demo"
  | "/resources"
> = {
  cbamWorkflows: "/platform/cbam",
  cbamConsole: "/platform/cbam-console",
  ppwr: "/platform/ppwr",
  agriClimate: "/platform/agri-climate",
  eudr: "/platform/eudr",
  dpp: "/platform/digital-product-passport",
  supplierEvidence: "/platform/supplier-evidence",
  esgReporting: "/platform/esg-workspace",
};

const STATUS_VARIANT: Record<SolutionStatus, "ready" | "pilot" | "comingSoon"> = {
  ready: "ready",
  pilot: "pilot",
  comingSoon: "comingSoon",
};

export interface SolutionModuleCardProps {
  solutionKey: SolutionWorkflowKey;
  status: SolutionStatus;
  featured?: boolean;
}

export function SolutionModuleCard({ solutionKey, status, featured = false }: SolutionModuleCardProps) {
  const t = useTranslations("solutionsPage");
  const tStatus = useTranslations("nav.status");
  const Icon = SOLUTION_ICONS[solutionKey];
  const href = SOLUTION_HREF[solutionKey];
  const productHref = href;

  const primaryHref = status === "comingSoon" ? "/resources" : status === "pilot" ? "/demo" : href;
  const secondaryHref = status === "ready" ? "/demo" : productHref;

  return (
    <article
      className={cn(
        "solution-module-card card-premium flex h-full min-w-0 flex-col",
        status === "ready" && "solution-module-card-ready",
        status === "pilot" && "solution-module-card-pilot",
        status === "comingSoon" && "solution-module-card-roadmap",
        featured && "solution-module-card-featured"
      )}
    >
      <div className="solution-module-card-header">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "solution-module-icon-wrap",
              status === "ready" && "solution-module-icon-wrap-ready",
              featured && "solution-module-icon-wrap-lg"
            )}
            aria-hidden="true"
          >
            <Icon className={cn(featured ? "h-5 w-5" : "h-[18px] w-[18px]")} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill variant={STATUS_VARIANT[status]} label={tStatus(STATUS_VARIANT[status])} />
              {status === "ready" && (
                <span className="solution-powered-chip">{t(`solutions.${solutionKey}.poweredBy`)}</span>
              )}
            </div>
            <h3
              className={cn(
                "mt-2.5 font-bold leading-snug tracking-[-0.02em] text-[#071225]",
                featured ? "text-[clamp(1.25rem,2vw+0.35rem,1.625rem)]" : "text-base lg:text-[17px]"
              )}
            >
              {t(`solutions.${solutionKey}.title`)}
            </h3>
          </div>
        </div>
      </div>

      <SolutionWorkflowRail solutionKey={solutionKey} status={status} compact={!featured} />

      <div className="solution-module-card-body flex flex-1 flex-col">
        <p className="text-sm leading-relaxed text-[#64748b]">{t(`solutions.${solutionKey}.problem`)}</p>

        <div className="mt-4">
          <p className="solution-cluster-label">{t("fields.features")}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {FEATURE_KEYS.map((key) => (
              <li key={key}>
                <span className="solution-feature-chip">{t(`solutions.${solutionKey}.features.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="solution-output-frame">
            <p className="solution-cluster-label">{t("fields.output")}</p>
            <p className="mt-1.5 text-sm font-medium leading-snug text-[#071225]">
              {t(`solutions.${solutionKey}.output`)}
            </p>
          </div>
          <div className="solution-target-frame">
            <p className="solution-cluster-label">{t("fields.targetTeam")}</p>
            <p className="mt-1.5 flex items-start gap-1.5 text-sm leading-snug text-[#475569]">
              <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7c3aed]" aria-hidden="true" />
              {t(`solutions.${solutionKey}.targetTeam`)}
            </p>
          </div>
        </div>
      </div>

      <div className="solution-module-card-cta mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Link
          href={primaryHref}
          className={cn(
            buttonVariants({ variant: "default", size: featured ? "lg" : "sm" }),
            "w-full justify-center sm:w-auto"
          )}
        >
          {t(`solutions.${solutionKey}.cta`)}
          <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
        </Link>
        {status !== "ready" && (
          <Link
            href={secondaryHref}
            className={cn(
              buttonVariants({ variant: "accent-outline", size: featured ? "default" : "sm" }),
              "w-full justify-center sm:w-auto"
            )}
          >
            {t(`solutions.${solutionKey}.secondaryCta`)}
          </Link>
        )}
        {status === "ready" && (
          <Link
            href={secondaryHref}
            className={cn(
              buttonVariants({ variant: "accent-outline", size: "lg" }),
              "w-full justify-center sm:w-auto"
            )}
          >
            {t("solutions.cbamWorkflows.secondaryCta")}
          </Link>
        )}
      </div>
    </article>
  );
}
