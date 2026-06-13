"use client";

import { useTranslations } from "next-intl";
import { Check, FlaskConical, Map } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGE_CONFIG = [
  {
    key: "ready" as const,
    icon: Check,
    solutionKeys: ["cbamWorkflows"] as const,
    className: "solution-maturity-lane-ready",
  },
  {
    key: "pilot" as const,
    icon: FlaskConical,
    solutionKeys: ["cbamConsole", "ppwr", "agriClimate"] as const,
    className: "solution-maturity-lane-pilot",
  },
  {
    key: "comingSoon" as const,
    icon: Map,
    solutionKeys: ["eudr", "dpp", "supplierEvidence", "esgReporting"] as const,
    className: "solution-maturity-lane-roadmap",
  },
];

export function SolutionMaturityRoadmap() {
  const t = useTranslations("solutionsPage.maturity");
  const tStatus = useTranslations("nav.status");

  return (
    <div className="solution-maturity-roadmap" aria-labelledby="solutions-maturity-heading">
      <h2
        id="solutions-maturity-heading"
        className="text-balance text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]"
      >
        {t("title")}
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
        {t("description")}
      </p>

      <div className="solution-maturity-lanes mt-6">
        {STAGE_CONFIG.map(({ key, icon: Icon, solutionKeys, className }) => (
          <div key={key} className={cn("solution-maturity-lane", className)}>
            <div className="solution-maturity-lane-head">
              <div className="solution-maturity-lane-icon" aria-hidden="true">
                <Icon className="h-4 w-4" />
              </div>
              <span className="solution-maturity-lane-label">{tStatus(key === "comingSoon" ? "comingSoon" : key)}</span>
            </div>
            <ul className="solution-maturity-lane-list list-none">
              {solutionKeys.map((solutionKey) => (
                <li key={solutionKey} className="solution-maturity-lane-item">
                  {t(`items.${solutionKey}`)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="solution-maturity-track mt-5" aria-hidden="true">
        <span className="solution-maturity-track-node solution-maturity-track-node-ready" />
        <span className="solution-maturity-track-line" />
        <span className="solution-maturity-track-node solution-maturity-track-node-pilot" />
        <span className="solution-maturity-track-line" />
        <span className="solution-maturity-track-node solution-maturity-track-node-roadmap" />
      </div>
    </div>
  );
}
