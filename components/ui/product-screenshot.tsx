"use client";

import {
  resolveModuleScreenshotPath,
  PRODUCT_SCREENSHOT_FOCUS,
  resolveModuleScreenshotFocus,
  moduleScreenshotIncludesChrome,
  shouldUseModulePreviewPlaceholder,
  type PlatformModuleKey,
  type ProductScreenshotFocus,
  type ProductScreenshotPresentation,
} from "@/lib/platform-modules";
import { BrowserMockup, type BrowserMockupProps } from "@/components/ui/browser-mockup";
import { ProductPreviewPlaceholder } from "@/components/ui/product-preview-placeholder";
import { useLocale } from "next-intl";
import { Droplets } from "lucide-react";

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
  const resolvedFocus = moduleKey
    ? resolveModuleScreenshotFocus(moduleKey, presentation, focus)
    : focus ?? "full";
  const preset = PRODUCT_SCREENSHOT_FOCUS[resolvedFocus] ?? PRODUCT_SCREENSHOT_FOCUS.full;
  const resolvedShowChrome =
    props.showChrome ?? (moduleKey ? moduleScreenshotIncludesChrome(moduleKey) : true);
  const { showChrome: _showChrome, ...browserProps } = props;
  const usePreviewPlaceholder =
    !resolvedSrc ||
    (moduleKey != null && shouldUseModulePreviewPlaceholder(moduleKey, locale));
  const previewIcon = moduleKey === "waterEfficiency" ? Droplets : undefined;

  if (usePreviewPlaceholder) {
    return (
      <BrowserMockup
        src={resolvedSrc ?? ""}
        alt={alt}
        objectFit={objectFit ?? preset.objectFit}
        objectPosition={objectPosition ?? preset.objectPosition}
        showChrome={resolvedShowChrome}
        placeholder={
          <ProductPreviewPlaceholder alt={alt} icon={previewIcon} />
        }
        {...browserProps}
      />
    );
  }

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
