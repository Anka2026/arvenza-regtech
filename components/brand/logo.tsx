"use client";

import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";
import { getLogoSrc, BRAND, type LogoVariant } from "@/lib/assets";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  height?: number;
  priority?: boolean;
}

const LOGO_ASPECT: Record<LogoVariant, number> = {
  main: 160 / 36,
  dark: 160 / 36,
  white: 160 / 36,
  symbol: 1,
};

export function Logo({
  variant = "main",
  className,
  height = 32,
  priority = false,
}: LogoProps) {
  const src = getLogoSrc(variant);
  const width = Math.round(height * LOGO_ASPECT[variant]);

  return (
    <SafeImage
      src={src}
      fallbackSrc={variant === "main" ? BRAND.logoMainPng : BRAND.logoMain}
      alt="Arvenza RegTech"
      width={width}
      height={height}
      priority={priority}
      className={cn("object-contain", className)}
      style={{ height, width }}
    />
  );
}

interface HeaderLogoProps {
  wordmark?: string;
  priority?: boolean;
  className?: string;
}

/** Header wordmark — symbol + brand text for clear SaaS recognition */
export function HeaderLogo({
  wordmark = "Arvenza RegTech",
  priority = true,
  className,
}: HeaderLogoProps) {
  return (
    <span className={cn("header-logo-wordmark flex min-w-0 max-w-[min(100%,14rem)] items-center gap-2 sm:max-w-none sm:gap-2.5", className)}>
      <Logo
        variant="symbol"
        priority={priority}
        className="h-8 w-8 shrink-0 sm:h-9 sm:w-9 lg:h-10 lg:w-10"
        height={40}
      />
      <span className="header-logo-text min-w-0 truncate text-[15px] font-semibold leading-tight tracking-tight text-[#071225] sm:text-[17px] lg:text-[18px]">
        {wordmark}
      </span>
    </span>
  );
}

export function LogoMark({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return <Logo variant="symbol" height={size} className={className} />;
}
