"use client";

import {
  CBAM_PRODUCT_SCREENSHOT,
  CBAM_SCREENSHOT_FOCUS,
  type CbamScreenshotFocus,
} from "@/lib/assets";
import { BrowserMockup, type BrowserMockupProps } from "@/components/ui/browser-mockup";

type CbamProductScreenshotProps = Omit<BrowserMockupProps, "src"> & {
  focus?: CbamScreenshotFocus;
};

export function CbamProductScreenshot({
  focus = "full",
  alt,
  objectFit,
  objectPosition,
  ...props
}: CbamProductScreenshotProps) {
  const preset = CBAM_SCREENSHOT_FOCUS[focus];

  return (
    <BrowserMockup
      src={CBAM_PRODUCT_SCREENSHOT}
      alt={alt}
      objectFit={objectFit ?? preset.objectFit}
      objectPosition={objectPosition ?? preset.objectPosition}
      {...props}
    />
  );
}
