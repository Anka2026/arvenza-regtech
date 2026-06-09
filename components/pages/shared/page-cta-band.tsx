"use client";

import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

interface PageCtaBandProps {
  title: string;
  primaryLabel: string;
  primaryHref: "/demo" | "/platform/cbam" | "/platform";
  secondaryLabel?: string;
  secondaryHref?: "/demo" | "/platform/cbam" | "/platform";
  className?: string;
}

export function PageCtaBand({
  title,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
}: PageCtaBandProps) {
  return (
    <FadeIn>
      <div
        className={cn(
          "relative overflow-hidden rounded-[1.75rem] bg-gradient-cta px-8 py-10 shadow-[0_24px_64px_rgba(124,58,237,0.28)] sm:px-12 sm:py-12",
          className
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.22),transparent_55%)]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(1.375rem,2vw+0.5rem,2rem)] font-bold tracking-[-0.03em] text-white">
            {title}
          </h2>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={primaryHref}
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "w-full border-0 bg-white text-[#071225] shadow-card hover:bg-white/95 sm:w-auto"
              )}
            >
              {primaryLabel}
            </Link>
            {secondaryLabel && secondaryHref && (
              <Link
                href={secondaryHref}
                className={cn(
                  buttonVariants({ variant: "accent-outline", size: "lg" }),
                  "w-full border-white/40 bg-transparent text-white hover:bg-white/10 sm:w-auto"
                )}
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
