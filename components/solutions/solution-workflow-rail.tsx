"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const STEP_KEYS = ["step1", "step2", "step3", "step4"] as const;

export type SolutionWorkflowKey =
  | "cbamWorkflows"
  | "cbamConsole"
  | "ppwr"
  | "agriClimate"
  | "eudr"
  | "dpp"
  | "supplierEvidence"
  | "esgReporting"
  | "waterEfficiency";

type SolutionStatus = "ready" | "pilot" | "comingSoon" | "availableOnRequest";

interface SolutionWorkflowRailProps {
  solutionKey: SolutionWorkflowKey;
  status: SolutionStatus;
  compact?: boolean;
  className?: string;
}

export function SolutionWorkflowRail({
  solutionKey,
  status,
  compact = false,
  className,
}: SolutionWorkflowRailProps) {
  const t = useTranslations("solutionsPage");

  return (
    <div
      className={cn(
        "solution-workflow-rail",
        status === "ready" && "solution-workflow-rail-ready",
        status === "pilot" && "solution-workflow-rail-pilot",
        status === "comingSoon" && "solution-workflow-rail-roadmap",
        status === "availableOnRequest" && "solution-workflow-rail-on-request",
        compact && "solution-workflow-rail-compact",
        className
      )}
      aria-label={t("workflowRailAriaLabel")}
    >
      <ol className="solution-workflow-rail-list list-none">
        {STEP_KEYS.map((key, index) => (
          <li key={key} className="solution-workflow-rail-item">
            <span className="solution-workflow-rail-dot" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="solution-workflow-rail-label">
              {t(`solutions.${solutionKey}.workflowSteps.${key}`)}
            </span>
            {index < STEP_KEYS.length - 1 && (
              <span className="solution-workflow-rail-connector" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
