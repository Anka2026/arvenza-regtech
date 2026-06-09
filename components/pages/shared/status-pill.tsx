import { cn } from "@/lib/utils";

type StatusVariant = "coreProduct" | "ready" | "available" | "pilot" | "inPreparation" | "comingSoon" | "roadmap";

const variantClass: Record<StatusVariant, string> = {
  coreProduct: "badge-core-product",
  ready: "badge-ready",
  available: "badge-available",
  pilot: "badge-pilot",
  inPreparation: "badge-in-preparation",
  comingSoon: "badge-coming-soon",
  roadmap: "badge-roadmap",
};

export function StatusPill({
  variant,
  label,
  className,
}: {
  variant: StatusVariant;
  label: string;
  className?: string;
}) {
  return <span className={cn(variantClass[variant], className)}>{label}</span>;
}
