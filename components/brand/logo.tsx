"use client";

import Image from "next/image";
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

/** Header ARVENZA wordmark — single horizontal logo asset, no duplicate text */
export function HeaderLogo({
  wordmark = "Arvenza RegTech",
  priority = true,
  className,
}: HeaderLogoProps) {
  return (
    <Image
      src={BRAND.logoHeader}
      alt={wordmark}
      width={280}
      height={64}
      priority={priority}
      className={cn(
        "h-10 w-auto max-w-[148px] shrink-0 object-contain object-left sm:h-12 sm:max-w-none lg:h-16",
        className
      )}
    />
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
