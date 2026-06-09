"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LayoutDashboard } from "lucide-react";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  objectFit?: "contain" | "cover" | "object-top";
  objectPosition?: string;
  fallbackSrc?: string;
}

export function SafeImage({
  src,
  alt,
  className,
  style,
  fill,
  width,
  height,
  priority,
  sizes,
  objectFit = "contain",
  objectPosition,
  fallbackSrc,
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  const fitClass =
    objectFit === "cover"
      ? "object-cover"
      : objectFit === "object-top"
        ? "object-cover object-top"
        : "object-contain";

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }
    setFailed(true);
  };

  if (failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-surface-muted",
          fill ? "absolute inset-0" : className
        )}
        role="img"
        aria-label={alt}
      >
        <LayoutDashboard className="h-8 w-8 text-indigo-700/25" aria-hidden="true" />
      </div>
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      priority={priority}
      sizes={sizes}
      className={cn(fitClass, className)}
      style={{ ...style, objectPosition }}
      onError={handleError}
    />
  );
}
