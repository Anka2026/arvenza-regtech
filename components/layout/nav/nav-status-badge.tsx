import { cn } from "@/lib/utils";

export type NavStatusKey =
  | "available"
  | "pilot"
  | "comingSoon"
  | "roadmap"
  | "ready"
  | "coreProduct";

const statusClass: Record<NavStatusKey, string> = {
  available: "nav-badge nav-badge-available",
  pilot: "nav-badge nav-badge-pilot",
  comingSoon: "nav-badge nav-badge-soon",
  roadmap: "nav-badge nav-badge-roadmap",
  ready: "nav-badge nav-badge-ready",
  coreProduct: "nav-badge nav-badge-core",
};

interface NavStatusBadgeProps {
  status: NavStatusKey;
  label: string;
  className?: string;
}

export function NavStatusBadge({ status, label, className }: NavStatusBadgeProps) {
  return <span className={cn(statusClass[status], className)}>{label}</span>;
}
