"use client";

import {
  resolveModuleScreenshotPath,
  PRODUCT_SCREENSHOT_FOCUS,
  resolveModuleScreenshotFocus,
  moduleScreenshotIncludesChrome,
  type PlatformModuleKey,
  type ProductScreenshotFocus,
  type ProductScreenshotPresentation,
} from "@/lib/platform-modules";
import { BrowserMockup, type BrowserMockupProps } from "@/components/ui/browser-mockup";
import { useLocale } from "next-intl";

type ProductScreenshotProps = Omit<BrowserMockupProps, "src"> & {
  moduleKey?: PlatformModuleKey;
  src?: string;
  focus?: ProductScreenshotFocus;
  /** hero = full UI for detail pages; thumbnail = hub cards; detail = tight crop */
  presentation?: ProductScreenshotPresentation;
  showChrome?: boolean;
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
  const locale = useLocale();
  const resolvedSrc =
    src ?? (moduleKey ? resolveModuleScreenshotPath(moduleKey, locale) : undefined);

  if (!resolvedSrc) {
    throw new Error("ProductScreenshot requires src or moduleKey");
  }
  const resolvedFocus = moduleKey
    ? resolveModuleScreenshotFocus(moduleKey, presentation, focus)
    : focus ?? "full";
  const preset = PRODUCT_SCREENSHOT_FOCUS[resolvedFocus];
  const resolvedShowChrome =
    props.showChrome ?? (moduleKey ? moduleScreenshotIncludesChrome(moduleKey) : true);
  const { showChrome: _showChrome, ...browserProps } = props;

  return (
    <BrowserMockup
      src={resolvedSrc}
      alt={alt}
      objectFit={objectFit ?? preset.objectFit}
      objectPosition={objectPosition ?? preset.objectPosition}
      showChrome={resolvedShowChrome}
      {...browserProps}
    />
  );
}
