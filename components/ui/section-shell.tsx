"use client";

import { cn } from "@/lib/utils";

interface SectionShellProps {
  children: React.ReactNode;
  id?: string;
  variant?: "light" | "muted" | "dark";
  className?: string;
  ariaLabelledby?: string;
}

export function SectionShell({
  children,
  id,
  variant = "light",
  className,
  ariaLabelledby,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn(
        variant === "light" && "section-light",
        variant === "muted" && "section-muted",
        variant === "dark" && "section-dark",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">{children}</div>
    </section>
  );
}

interface SectionIntroProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export function SectionIntro({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl md:mb-14",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div className={cn("mb-4", align === "center" && "flex flex-col items-center")}>
          {align !== "center" && !dark && <div className="accent-bar" aria-hidden="true" />}
          {align === "center" && !dark && (
            <div className="accent-bar mx-auto w-10" aria-hidden="true" />
          )}
          <p className={cn(dark ? "eyebrow-dark" : "eyebrow")}>{eyebrow}</p>
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
            "body-lead mt-4",
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
