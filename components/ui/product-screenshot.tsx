"use client";

import {
  PLATFORM_MODULE_SCREENSHOTS,
  PRODUCT_SCREENSHOT_FOCUS,
  resolveModuleScreenshotFocus,
  type PlatformModuleKey,
  type ProductScreenshotFocus,
  type ProductScreenshotPresentation,
} from "@/lib/platform-modules";
import { BrowserMockup, type BrowserMockupProps } from "@/components/ui/browser-mockup";

type ProductScreenshotProps = Omit<BrowserMockupProps, "src"> & {
  moduleKey?: PlatformModuleKey;
  src?: string;
  focus?: ProductScreenshotFocus;
  /** hero = full UI for detail pages; thumbnail = hub cards; detail = tight crop */
  presentation?: ProductScreenshotPresentation;
};

export function ProductScreenshot({
  moduleKey,
  src,
  focus,
  presentation = "hero",
  alt,
  objectFit,
  objectPosition,
  ...props
}: ProductScreenshotProps) {
  const resolvedSrc =
    src ?? (moduleKey ? PLATFORM_MODULE_SCREENSHOTS[moduleKey] : undefined);

  if (!resolvedSrc) {
    throw new Error("ProductScreenshot requires src or moduleKey");
  }

  const resolvedFocus = moduleKey
    ? resolveModuleScreenshotFocus(moduleKey, presentation, focus)
    : focus ?? "full";
  const preset = PRODUCT_SCREENSHOT_FOCUS[resolvedFocus];

  return (
    <BrowserMockup
      src={resolvedSrc}
      alt={alt}
      objectFit={objectFit ?? preset.objectFit}
      objectPosition={objectPosition ?? preset.objectPosition}
      {...props}
    />
  );
}
