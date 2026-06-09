import { cn } from "@/lib/utils";

type StatusVariant = "flagship" | "available" | "pilot" | "comingSoon" | "roadmap";

const variantClass: Record<StatusVariant, string> = {
  flagship: "badge-available",
  available: "badge-available",
  pilot: "badge-pilot",
  comingSoon: "badge-coming-soon",
  roadmap: "badge-coming-soon",
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
