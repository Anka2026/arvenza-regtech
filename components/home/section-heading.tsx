import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  dark?: boolean;
  className?: string;
  compact?: boolean;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  dark = false,
  className,
  compact = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-4xl min-w-0", className)}>
      {eyebrow && (
        <div className="section-eyebrow-wrap">
          <span className="section-heading-accent" aria-hidden="true" />
          <p className={dark ? "eyebrow-dark mb-2.5" : "eyebrow mb-2.5"}>{eyebrow}</p>
        </div>
      )}
      <h2
        id={id}
        className={cn(
          compact ? "heading-section-compact" : "heading-section",
          "text-balance",
          dark ? "text-white" : "text-[#071225]"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-3xl text-base leading-relaxed lg:mt-5 lg:text-lg",
            dark ? "text-slate-300" : "text-[#475569]"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
