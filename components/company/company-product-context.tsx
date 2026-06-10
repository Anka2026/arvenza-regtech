"use client";

import { useTranslations } from "next-intl";
import { Calculator, GitBranch, Layers, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const LAYER_KEYS = ["supplierEvidence", "readyProduct", "roadmap"] as const;
const LAYER_ICONS = [Layers, Calculator, GitBranch] as const;

export function CompanyProductContext({ className }: { className?: string }) {
  const t = useTranslations("companyPage.productContext");

  return (
    <div className={cn("company-product-context", className)} role="img" aria-label={t("ariaLabel")}>
      <div
        className="pointer-events-none absolute -inset-4 rounded-[1.75rem] bg-[radial-gradient(circle,rgba(124,58,237,0.14),transparent_68%)] blur-2xl"
        aria-hidden="true"
      />
      <div className="company-product-context-inner relative">
        <p className="company-product-context-kicker">{t("kicker")}</p>
        <div className="company-product-context-layers">
          {LAYER_KEYS.map((key, index) => {
            const Icon = LAYER_ICONS[index];
            const isReady = key === "readyProduct";
            return (
              <div
                key={key}
                className={cn(
                  "company-product-context-layer",
                  isReady && "company-product-context-layer-ready"
                )}
              >
                <div className="company-product-context-layer-icon" aria-hidden="true">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="company-product-context-layer-label">{t(`layers.${key}.label`)}</p>
                  <p className="company-product-context-layer-value">{t(`layers.${key}.value`)}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="company-product-context-operator">
          <ShieldCheck className="h-4 w-4 shrink-0 text-[#7c3aed]" aria-hidden="true" />
          <p className="text-xs leading-relaxed text-[#64748b]">{t("operatorNote")}</p>
        </div>
      </div>
    </div>
  );
}
