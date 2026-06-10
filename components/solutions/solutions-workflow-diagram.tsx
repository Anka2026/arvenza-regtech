"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Calculator, FileStack, Gauge, Users, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

const STEP_KEYS = ["pressure", "supplierData", "calculation", "evidence", "workflow"] as const;
const STEP_ICONS = [Gauge, Users, Calculator, FileStack, Workflow] as const;

interface SolutionsWorkflowDiagramProps {
  className?: string;
}

export function SolutionsWorkflowDiagram({ className }: SolutionsWorkflowDiagramProps) {
  const t = useTranslations("solutionsPage.heroWorkflow");

  return (
    <div
      className={cn("solutions-workflow-diagram", className)}
      role="img"
      aria-label={t("diagramAriaLabel")}
    >
      <div
        className="pointer-events-none absolute -inset-4 rounded-[1.75rem] bg-[radial-gradient(circle,rgba(37,99,235,0.12),transparent_68%)] blur-2xl"
        aria-hidden="true"
      />
      <div className="solutions-workflow-inner relative">
        {STEP_KEYS.map((key, index) => {
          const Icon = STEP_ICONS[index];
          const isLast = index === STEP_KEYS.length - 1;
          return (
            <div key={key} className="solutions-workflow-step-wrap">
              <div
                className={cn(
                  "solutions-workflow-step",
                  isLast && "solutions-workflow-step-final"
                )}
              >
                <div className="solutions-workflow-step-icon" aria-hidden="true">
                  <Icon className="h-4 w-4 text-[#7c3aed]" />
                </div>
                <p className="solutions-workflow-step-label">{t(`steps.${key}`)}</p>
              </div>
              {!isLast && (
                <div className="solutions-workflow-connector" aria-hidden="true">
                  <ArrowRight className="h-3.5 w-3.5 text-[#7c3aed]/70" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
