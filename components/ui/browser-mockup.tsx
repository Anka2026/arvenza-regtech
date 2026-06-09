"use client";

import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";
import { CBAM_PRODUCT_SCREENSHOT } from "@/lib/assets";

export interface BrowserMockupProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspectClass?: string;
  elevated?: boolean;
  size?: "default" | "large" | "hero" | "heroCompact" | "xl" | "flagship" | "feature" | "product";
  objectFit?: "contain" | "cover" | "object-top";
  objectPosition?: string;
  /** @deprecated Always uses dark chrome */
  darkChrome?: boolean;
}

const sizeClasses: Record<NonNullable<BrowserMockupProps["size"]>, string> = {
  default:
    "aspect-[16/10] min-h-[160px] max-h-[min(44vh,300px)] sm:min-h-[220px] lg:min-h-[240px] lg:max-h-none",
  large:
    "aspect-[16/10] min-h-[160px] max-h-[min(48vh,340px)] sm:min-h-[240px] lg:min-h-[400px] lg:max-h-none",
  hero:
    "aspect-[16/10] min-h-[160px] max-h-[min(50vh,360px)] sm:min-h-[260px] lg:min-h-[420px] xl:min-h-[460px] lg:max-h-none",
  heroCompact:
    "aspect-[16/9] w-full min-h-[150px] max-h-[min(46vh,300px)] sm:max-h-[min(50vh,340px)] lg:max-h-[360px]",
  xl:
    "aspect-[16/10] min-h-[180px] max-h-[min(50vh,360px)] sm:min-h-[300px] lg:min-h-[460px] xl:min-h-[520px] lg:max-h-none",
  flagship:
    "aspect-[16/10] min-h-[180px] max-h-[min(50vh,360px)] sm:min-h-[300px] lg:min-h-[460px] xl:min-h-[540px] 2xl:min-h-[560px] lg:max-h-none",
  feature:
    "aspect-[16/9] min-h-[150px] max-h-[min(40vh,240px)] sm:min-h-[220px] lg:min-h-[300px] lg:max-h-[340px]",
  product:
    "aspect-[4/3] min-h-[180px] max-h-[min(46vh,320px)] sm:min-h-[280px] lg:min-h-[420px] xl:min-h-[460px] lg:max-h-none",
};

export function BrowserMockup({
  src,
  alt,
  className,
  priority = false,
  aspectClass,
  elevated = false,
  size = "default",
  objectFit = "object-top",
  objectPosition,
}: BrowserMockupProps) {
  return (
    <div
      className={cn(
        size === "hero" || size === "heroCompact" || size === "xl" || size === "flagship"
          ? "product-frame-hero"
          : "product-frame",
        "w-full max-w-full",
        elevated && "shadow-product",
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-white/10 bg-[#0f1a32] px-5 py-3.5">
        <div className="flex shrink-0 gap-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]/90" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]/90" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]/90" />
        </div>
        <div className="mx-auto hidden h-8 max-w-[320px] flex-1 items-center rounded-lg bg-white/[0.07] px-4 ring-1 ring-inset ring-white/[0.08] sm:flex">
          <span className="truncate text-xs font-medium tracking-wide text-slate-400">
            app.arvenza.net
          </span>
        </div>
      </div>

      <div
        className={cn(
          "relative w-full overflow-hidden",
          objectFit === "contain" ? "bg-[#eef1f6]" : "bg-[#071225]",
          aspectClass ?? sizeClasses[size]
        )}
      >
        <SafeImage
          src={src}
          alt={alt}
          fill
          priority={priority}
          objectFit={objectFit}
          objectPosition={objectPosition}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 65vw, 900px"
        />
      </div>
    </div>
  );
}

interface PlatformPreviewProps {
  className?: string;
  alt?: string;
}

export function PlatformScreenshotPreview({
  className,
  alt = "CBAM Calculation Engine dashboard",
}: PlatformPreviewProps) {
  return (
    <div className={cn("relative", className)}>
      <BrowserMockup
        src={CBAM_PRODUCT_SCREENSHOT}
        alt={alt}
        priority
        elevated
        size="hero"
        objectFit="contain"
        objectPosition="50% 0%"
      />
    </div>
  );
}
