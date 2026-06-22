"use client";

import { CbamProductScreenshot } from "@/components/ui/cbam-product-screenshot";
import type { BrowserMockupProps } from "@/components/ui/browser-mockup";
import type { CbamScreenshotFocus } from "@/lib/assets";
import { cn } from "@/lib/utils";

interface CbamProductShowcaseProps {
  alt: string;
  focus?: CbamScreenshotFocus;
  variant?: "hero" | "feature";
  mockupSize?: BrowserMockupProps["size"];
  priority?: boolean;
  className?: string;
}

export function CbamProductShowcase({
  alt,
  focus = "full",
  variant = "feature",
  mockupSize,
  priority = false,
  className,
}: CbamProductShowcaseProps) {
  const isHero = variant === "hero";
  const screenshotFocus = isHero ? "full" : focus;
  const size = mockupSize ?? (isHero ? "heroCompact" : "feature");

  return (
    <div
      className={cn(
        "relative w-full",
        isHero ? "hero-product-stage mx-auto w-full max-w-[600px] lg:max-w-none" : "w-full lg:max-w-none",
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute rounded-[1.75rem] blur-3xl",
          isHero
            ? "-inset-4 bg-[radial-gradient(circle,rgba(124,58,237,0.16),transparent_68%)]"
            : "-inset-6 bg-[radial-gradient(circle,rgba(124,58,237,0.14),transparent_72%)]"
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          "relative",
          isHero &&
            "rounded-[1.15rem] shadow-[0_20px_56px_rgba(15,23,42,0.18),0_0_0_1px_rgba(124,58,237,0.08)] ring-1 ring-[#7c3aed]/10"
        )}
      >
        <CbamProductScreenshot
          focus={screenshotFocus}
          alt={alt}
          size={size}
          priority={priority}
          elevated
          className={cn(
            "relative w-full",
            isHero ? "shadow-dashboard-glow" : "shadow-[0_18px_48px_rgba(15,23,42,0.2)]"
          )}
        />
      </div>
    </div>
  );
}
