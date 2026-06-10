"use client";

import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

interface PageCtaBandProps {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: "/demo" | "/platform/cbam" | "/platform" | "/resources";
  secondaryLabel?: string;
  secondaryHref?: "/demo" | "/platform/cbam" | "/platform" | "/resources";
  className?: string;
}

export function PageCtaBand({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
}: PageCtaBandProps) {
  return (
    <FadeIn immediate>
      <div
        className={cn(
          "premium-cta-band relative min-w-0 overflow-hidden rounded-2xl px-5 py-8 sm:rounded-[1.75rem] sm:px-8 sm:py-10 lg:px-12 lg:py-12",
          className
        )}
      >
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-[clamp(1.25rem,4vw+0.35rem,2rem)] font-bold tracking-[-0.03em] text-white">
            {title}
          </h2>
          {description && (
            <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-white/88 sm:text-[15px]">
              {description}
            </p>
          )}
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
