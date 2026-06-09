import { cn } from "@/lib/utils";

interface AmbientBackgroundProps {
  variant?: "hero" | "section" | "muted";
  className?: string;
}

/** Full-bleed premium atmosphere — purple/blue/cyan radials, dots, wave lines */
export function AmbientBackground({
  variant = "section",
  className,
}: AmbientBackgroundProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-grid-dots opacity-[0.22]" />
      {variant === "hero" && (
        <>
          <div className="absolute inset-0 bg-wave-lines opacity-90" />
          <div className="absolute -left-[20%] top-[-10%] h-[70%] w-[55%] rounded-full bg-[#7c3aed]/[0.14] blur-[100px]" />
          <div className="absolute -right-[10%] top-[5%] h-[65%] w-[50%] rounded-full bg-[#2563eb]/[0.12] blur-[90px]" />
          <div className="absolute bottom-0 left-[30%] h-[40%] w-[40%] rounded-full bg-[#06b6d4]/[0.08] blur-[80px]" />
        </>
      )}
      {variant === "section" && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,0.06),transparent_55%)]" />
      )}
      {variant === "muted" && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(37,99,235,0.06),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,rgba(124,58,237,0.05),transparent_50%)]" />
        </>
      )}
    </div>
  );
}
