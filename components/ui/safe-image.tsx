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

/** Static public assets — native img avoids Next optimizer failures on edge/static hosts */
function isStaticPublicAsset(src: string) {
  return src.startsWith("/assets/") || src.startsWith("/images/");
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
          "flex items-center justify-center bg-[#eef1f6]",
          fill ? "absolute inset-0" : className
        )}
        role="img"
        aria-label={alt}
      >
        <LayoutDashboard className="h-8 w-8 text-[#7c3aed]/30" aria-hidden="true" />
      </div>
    );
  }

  const imageStyle: React.CSSProperties = {
    ...style,
    objectPosition: objectPosition ?? "left top",
  };

  if (isStaticPublicAsset(currentSrc)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={currentSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        className={cn(fill ? "absolute inset-0 h-full w-full" : "", fitClass, className)}
        style={imageStyle}
        onError={handleError}
      />
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
      unoptimized
      className={cn(fitClass, className)}
      style={imageStyle}
      onError={handleError}
    />
  );
}
