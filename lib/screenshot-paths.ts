import fs from "node:fs";
import path from "node:path";
import { PLATFORM_MODULE_SCREENSHOTS, type PlatformModuleKey } from "./platform-modules";
import { CBAM_PRODUCT_SCREENSHOT, MODULE_SCREENSHOTS, SCREENSHOTS } from "./assets";

/** All screenshot paths referenced by the app — for deploy/CI verification */
export const ALL_SCREENSHOT_PATHS = [
  CBAM_PRODUCT_SCREENSHOT,
  ...Object.values(SCREENSHOTS),
  ...Object.values(PLATFORM_MODULE_SCREENSHOTS),
  ...Object.values(MODULE_SCREENSHOTS),
  "/assets/screenshots/cbam-engine/dashboard.png",
] as const;

const uniquePaths = Array.from(new Set(ALL_SCREENSHOT_PATHS));

export function resolvePublicScreenshotPath(urlPath: string, publicDir = path.join(process.cwd(), "public")): string {
  return path.join(publicDir, urlPath.replace(/^\//, "").replace(/\//g, path.sep));
}

export function verifyScreenshotAssets(publicDir?: string): {
  ok: boolean;
  missing: string[];
  found: string[];
} {
  const missing: string[] = [];
  const found: string[] = [];

  for (const urlPath of uniquePaths) {
    const filePath = resolvePublicScreenshotPath(urlPath, publicDir);
    if (fs.existsSync(filePath)) {
      found.push(urlPath);
    } else {
      missing.push(urlPath);
    }
  }

  return { ok: missing.length === 0, missing, found };
}

export const PLATFORM_MODULE_SCREENSHOT_FILES: Record<PlatformModuleKey, string> = {
  ...PLATFORM_MODULE_SCREENSHOTS,
};
