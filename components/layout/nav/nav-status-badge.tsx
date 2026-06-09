import { cn } from "@/lib/utils";

export type NavStatusKey = "available" | "pilot" | "comingSoon" | "roadmap" | "availableNow" | "flagship";

const statusClass: Record<NavStatusKey, string> = {
  available: "nav-badge nav-badge-available",
  pilot: "nav-badge nav-badge-pilot",
  comingSoon: "nav-badge nav-badge-soon",
  roadmap: "nav-badge nav-badge-roadmap",
  availableNow: "nav-badge nav-badge-available",
  flagship: "nav-badge nav-badge-flagship",
};

interface NavStatusBadgeProps {
  status: NavStatusKey;
  label: string;
  className?: string;
}

export function NavStatusBadge({ status, label, className }: NavStatusBadgeProps) {
  return <span className={cn(statusClass[status], className)}>{label}</span>;
}
