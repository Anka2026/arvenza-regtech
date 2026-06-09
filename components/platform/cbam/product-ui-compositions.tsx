"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle2,
  Circle,
  Clock,
  FileCheck,
  Loader2,
  ShieldCheck,
} from "lucide-react";

type PanelVariant = "light" | "dark";
type PanelDensity = "default" | "compact";

type UiNamespace =
  | "cbamPlatform.supplier"
  | "cbamPlatform.evidence"
  | "cbamPlatform.monitoring"
  | "cbamPlatform.complianceTool"
  | "home.supplierPortal"
  | "home.evidence";

const stepKeys = ["item1", "item2", "item3", "item4", "item5"] as const;
const evidenceKeys = ["item1", "item2", "item3", "item4"] as const;
const metricKeys = ["item1", "item2", "item3", "item4", "item5"] as const;
const controlKeys = ["item1", "item2", "item3", "item4", "item5"] as const;

function panelShell(variant: PanelVariant, compact: boolean) {
  return cn(
    "overflow-hidden rounded-xl border",
    compact
      ? "shadow-[0_12px_36px_rgba(15,23,42,0.1)]"
      : "rounded-2xl shadow-[0_22px_64px_rgba(15,23,42,0.14)]",
    variant === "dark"
      ? "border-white/10 bg-[#0f1a32]/95 ring-1 ring-white/[0.06]"
      : "border-[#dde5f2]/80 bg-white/95 ring-1 ring-[#dde5f2]/60"
  );
}

function textPrimary(variant: PanelVariant) {
  return variant === "dark" ? "text-[#F8FAFC]" : "text-[#071225]";
}

function textMuted(variant: PanelVariant) {
  return variant === "dark" ? "text-slate-400" : "text-[#64748b]";
}

const stateIcon = {
  done: CheckCircle2,
  active: Loader2,
  pending: Circle,
  alert: AlertCircle,
} as const;

const stateColor = {
  done: "text-emerald-500",
  active: "text-[#7c3aed] animate-spin",
  pending: "text-[#cbd5e1]",
  alert: "text-amber-500",
} as const;

interface SupplierWorkflowPanelProps {
  namespace?: Extract<UiNamespace, "cbamPlatform.supplier" | "home.supplierPortal">;
  variant?: PanelVariant;
  density?: PanelDensity;
}

export function SupplierWorkflowPanel({
  namespace = "cbamPlatform.supplier",
  variant = "light",
  density = "default",
}: SupplierWorkflowPanelProps) {
  const t = useTranslations(namespace);
  const compact = density === "compact";

  return (
    <div
      className={cn(panelShell(variant, compact), compact ? "p-3.5" : "p-5 lg:p-6")}
      aria-hidden="true"
    >
      <p
        className={cn(
          "font-semibold uppercase tracking-[0.14em]",
          compact ? "text-[10px]" : "text-[11px]",
          textMuted(variant)
        )}
      >
        {t("ui.title")}
      </p>
      <ul className={cn(compact ? "mt-2.5 space-y-1.5" : "mt-4 space-y-2.5")}>
        {stepKeys.map((key) => {
          const state = t(`ui.steps.${key}.state`) as keyof typeof stateIcon;
          const Icon = stateIcon[state] ?? Circle;
          return (
            <li
              key={key}
              className={cn(
                "flex items-center gap-2.5 rounded-lg",
                compact ? "px-2.5 py-2" : "rounded-xl px-3.5 py-3",
                variant === "dark" ? "bg-white/[0.04]" : "bg-[#f8fafc]",
                state === "active" && "ring-1 ring-[#7c3aed]/25"
              )}
            >
              <Icon className={cn("shrink-0", compact ? "h-3.5 w-3.5" : "h-4 w-4", stateColor[state])} />
              <span className={cn("font-medium", compact ? "text-xs" : "text-sm", textPrimary(variant))}>
                {t(`ui.steps.${key}.label`)}
              </span>
              <span className={cn("ml-auto font-medium", compact ? "text-[10px]" : "text-[11px]", textMuted(variant))}>
                {t(`ui.steps.${key}.status`)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

interface EvidencePackPanelProps {
  namespace?: Extract<UiNamespace, "cbamPlatform.evidence" | "home.evidence">;
  variant?: PanelVariant;
  density?: PanelDensity;
}

export function EvidencePackPanel({
  namespace = "cbamPlatform.evidence",
  variant = "light",
  density = "default",
}: EvidencePackPanelProps) {
  const t = useTranslations(namespace);
  const compact = density === "compact";

  return (
    <div
      className={cn(panelShell(variant, compact), compact ? "p-3.5" : "p-5 lg:p-6")}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between gap-3">
        <p
          className={cn(
            "font-semibold uppercase tracking-[0.14em]",
            compact ? "text-[10px]" : "text-[11px]",
            textMuted(variant)
          )}
        >
          {t("ui.title")}
        </p>
        <span className="rounded-full bg-[#7c3aed]/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#7c3aed]">
          {t("ui.badge")}
        </span>
      </div>
      <ul className={cn(compact ? "mt-2.5 space-y-1.5" : "mt-4 space-y-2")}>
        {evidenceKeys.map((key, i) => (
          <li
            key={key}
            className={cn(
              "flex items-start gap-2.5 rounded-lg border",
              compact ? "px-2.5 py-2" : "rounded-xl px-3.5 py-3",
              variant === "dark"
                ? "border-white/10 bg-white/[0.03]"
                : "border-[#eef2f7] bg-[#fafbfc]"
            )}
          >
            <FileCheck
              className={cn("mt-0.5 shrink-0", compact ? "h-3.5 w-3.5" : "h-4 w-4", i < 3 ? "text-[#7c3aed]" : "text-[#94a3b8]")}
            />
            <div className="min-w-0 flex-1">
              <p className={cn("font-medium", compact ? "text-xs" : "text-sm", textPrimary(variant))}>
                {t(`ui.items.${key}.label`)}
              </p>
              {!compact && (
                <p className={cn("mt-0.5 text-xs", textMuted(variant))}>{t(`ui.items.${key}.meta`)}</p>
              )}
            </div>
            <span
              className={cn(
                "shrink-0 rounded px-1.5 py-0.5 font-semibold",
                compact ? "text-[9px]" : "text-[10px]",
                i < 2
                  ? "bg-emerald-500/10 text-emerald-600"
                  : i === 2
                    ? "bg-amber-500/10 text-amber-600"
                    : variant === "dark"
                      ? "bg-white/10 text-slate-400"
                      : "bg-[#eef2f7] text-[#64748b]"
              )}
            >
              {t(`ui.items.${key}.status`)}
            </span>
          </li>
        ))}
      </ul>
      <div
        className={cn(
          "rounded-lg",
          compact ? "mt-2.5 px-3 py-2" : "mt-4 rounded-xl px-4 py-3",
          variant === "dark" ? "bg-[#7c3aed]/15" : "bg-gradient-to-r from-[#7c3aed]/8 to-[#2563eb]/8"
        )}
      >
        <p className={cn("font-medium", compact ? "text-[11px]" : "text-xs", textPrimary(variant))}>
          {t("ui.readinessLabel")}
        </p>
        <div className={cn("overflow-hidden rounded-full bg-black/10", compact ? "mt-1.5 h-1.5" : "mt-2 h-2")}>
          <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#7c3aed] to-[#2563eb]" />
        </div>
      </div>
    </div>
  );
}

interface MonitoringKpiPanelProps {
  variant?: PanelVariant;
  density?: PanelDensity;
}

export function MonitoringKpiPanel({ variant = "dark", density = "default" }: MonitoringKpiPanelProps) {
  const t = useTranslations("cbamPlatform.monitoring");
  const compact = density === "compact";

  return (
    <div
      className={cn(panelShell(variant, compact), compact ? "p-3.5" : "p-5 lg:p-6")}
      aria-hidden="true"
    >
      <p
        className={cn(
          "font-semibold uppercase tracking-[0.14em]",
          compact ? "text-[10px]" : "text-[11px]",
          textMuted(variant)
        )}
      >
        {t("ui.title")}
      </p>
      <div className={cn("grid grid-cols-2", compact ? "mt-2.5 gap-1.5" : "mt-4 gap-2.5")}>
        {metricKeys.map((key) => (
          <div
            key={key}
            className={cn(
              "rounded-lg border",
              compact ? "px-2.5 py-2" : "rounded-xl px-3.5 py-3",
              variant === "dark"
                ? "border-white/10 bg-white/[0.04]"
                : "border-[#eef2f7] bg-[#fafbfc]"
            )}
          >
            <p className={cn("font-medium uppercase tracking-wider", compact ? "text-[9px]" : "text-[10px]", textMuted(variant))}>
              {t(`ui.metrics.${key}.label`)}
            </p>
            <p className={cn("font-bold tracking-tight", compact ? "mt-0.5 text-lg" : "mt-1 text-xl", textPrimary(variant))}>
              {t(`ui.metrics.${key}.value`)}
            </p>
            {!compact && (
              <p className={cn("mt-0.5 text-[11px]", textMuted(variant))}>{t(`ui.metrics.${key}.hint`)}</p>
            )}
          </div>
        ))}
      </div>
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg",
          compact ? "mt-2 px-2.5 py-2" : "mt-3 rounded-xl px-3.5 py-2.5",
          variant === "dark" ? "bg-amber-500/10" : "bg-amber-50 ring-1 ring-amber-200/60"
        )}
      >
        <AlertCircle className={cn("shrink-0 text-amber-500", compact ? "h-3.5 w-3.5" : "h-4 w-4")} />
        <p className={cn("font-medium", compact ? "text-[11px]" : "text-xs", variant === "dark" ? "text-amber-200" : "text-amber-800")}>
          {t("ui.alert")}
        </p>
      </div>
    </div>
  );
}

interface ComplianceControlPanelProps {
  density?: PanelDensity;
}

export function ComplianceControlPanel({ density = "default" }: ComplianceControlPanelProps) {
  const t = useTranslations("cbamPlatform.complianceTool");
  const compact = density === "compact";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-[#dde5f2]/80 bg-[#fafbfc] ring-1 ring-[#dde5f2]/60",
        compact ? "p-3" : "rounded-xl p-4"
      )}
      aria-hidden="true"
    >
      <div className={cn("flex items-center gap-2 border-b border-[#eef2f7]", compact ? "pb-2" : "pb-3")}>
        <ShieldCheck className={cn("text-[#7c3aed]", compact ? "h-3.5 w-3.5" : "h-4 w-4")} />
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748b]">
          {t("ui.title")}
        </p>
      </div>
      <ul className={cn(compact ? "mt-2 space-y-1" : "mt-3 space-y-2")}>
        {controlKeys.map((key) => {
          const state = t(`ui.queue.${key}.state`) as "done" | "active" | "pending";
          const Icon = state === "done" ? CheckCircle2 : state === "active" ? Clock : Circle;
          return (
            <li
              key={key}
              className={cn(
                "flex items-center gap-2 rounded-md bg-white ring-1 ring-[#eef2f7]",
                compact ? "px-2 py-1.5" : "rounded-lg px-3 py-2"
              )}
            >
              <Icon
                className={cn(
                  "shrink-0",
                  compact ? "h-3 w-3" : "h-3.5 w-3.5",
                  state === "done" ? "text-emerald-500" : state === "active" ? "text-[#7c3aed]" : "text-[#cbd5e1]"
                )}
              />
              <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-[#071225]">
                {t(`ui.queue.${key}.label`)}
              </span>
              <span className="text-[9px] font-medium text-[#64748b]">{t(`ui.queue.${key}.value`)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
