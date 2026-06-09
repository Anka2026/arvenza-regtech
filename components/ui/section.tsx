"use client";

import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export function Eyebrow({ children, className, dark = false }: EyebrowProps) {
  return (
    <p
      className={cn(
        dark ? "eyebrow-dark" : "eyebrow-pill",
        className
      )}
    >
      {children}
    </p>
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "muted" | "dark" | "trust";
  ariaLabelledby?: string;
}

export function Section({
  children,
  className,
  id,
  variant = "default",
  ariaLabelledby,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn(
        "section-padding",
        variant === "muted" && "section-muted",
        variant === "dark" && "section-dark-band",
        className
      )}
    >
      <div className="mx-auto max-w-[1360px] px-6 lg:px-10">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-14 max-w-3xl md:mb-16",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div className={cn("mb-4", align === "center" && "flex justify-center")}>
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        id={id}
        className={cn("heading-section text-balance", dark && "text-white")}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "body-lead mt-5",
            align === "center" && "mx-auto max-w-2xl",
            dark && "text-slate-300/90"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
