"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Gauge, Users, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

const STEP_KEYS = ["step1", "step2", "step3"] as const;

export function IndustryStrategyVisual({ className }: { className?: string }) {
  const t = useTranslations("industriesPage.strategyVisual");

  const steps = [
    { icon: Gauge, key: "pressure" as const },
    { icon: Users, key: "evidence" as const },
    { icon: Workflow, key: "workflow" as const },
  ];

  return (
    <div className={cn("industry-strategy-visual", className)} role="img" aria-label={t("ariaLabel")}>
      <div
        className="pointer-events-none absolute -inset-4 rounded-[1.75rem] bg-[radial-gradient(circle,rgba(124,58,237,0.14),transparent_68%)] blur-2xl"
        aria-hidden="true"
      />
      <div className="industry-strategy-visual-inner relative">
        <p className="industry-strategy-visual-kicker">{t("kicker")}</p>
        <div className="industry-strategy-steps">
          {steps.map(({ icon: Icon, key }, index) => (
            <div key={key} className="industry-strategy-step">
              <div className="industry-strategy-step-icon" aria-hidden="true">
                <Icon className="h-4 w-4 text-[#7c3aed]" />
              </div>
              <p className="industry-strategy-step-label">{t(`steps.${key}`)}</p>
              {index < steps.length - 1 && (
                <span className="industry-strategy-connector" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
        <ul className="industry-strategy-sectors list-none">
          {STEP_KEYS.map((key) => (
            <li key={key} className="industry-strategy-sector-chip">
              {t(`sectors.${key}`)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
