import type { PlatformModuleStatus } from "@/lib/platform-modules";
import type { ComponentProps } from "react";
import type { StatusPill } from "@/components/pages/shared/status-pill";

type StatusPillVariant = ComponentProps<typeof StatusPill>["variant"];

export type ModuleDisplayStatus =
  | PlatformModuleStatus
  | "pilot"
  | "comingSoon";

export function normalizeModuleStatus(status: ModuleDisplayStatus): PlatformModuleStatus {
  if (status === "pilot") return "earlyAccess";
  if (status === "comingSoon") return "roadmap";
  return status;
}

export function moduleStatusNavKey(status: ModuleDisplayStatus): string {
  return normalizeModuleStatus(status);
}

export function moduleStatusPillVariant(status: ModuleDisplayStatus): StatusPillVariant {
  switch (normalizeModuleStatus(status)) {
    case "ready":
      return "ready";
    case "availableOnRequest":
      return "available";
    case "earlyAccess":
      return "pilot";
    case "roadmap":
      return "roadmap";
  }
}

export function isRoadmapModule(status: ModuleDisplayStatus): boolean {
  return normalizeModuleStatus(status) === "roadmap";
}

export function isEarlyAccessModule(status: ModuleDisplayStatus): boolean {
  return normalizeModuleStatus(status) === "earlyAccess";
}

export function isAvailableOnRequestModule(status: ModuleDisplayStatus): boolean {
  return normalizeModuleStatus(status) === "availableOnRequest";
}
