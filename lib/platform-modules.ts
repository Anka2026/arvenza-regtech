/** Platform module registry — routes, maturity, screenshots, i18n keys */

export type PlatformModuleStatus = "ready" | "pilot" | "comingSoon";

export type PlatformModuleKey =
  | "cbamCalc"
  | "cbamComplianceConsole"
  | "ppwr"
  | "agriClimate"
  | "eudr"
  | "dpp"
  | "supplierEvidence"
  | "esgReporting";

export type PlatformModuleRoute =
  | "/platform"
  | "/platform/cbam"
  | "/platform/cbam-console"
  | "/platform/ppwr"
  | "/platform/agri-climate"
  | "/platform/eudr"
  | "/platform/digital-product-passport"
  | "/platform/supplier-evidence"
  | "/platform/esg-workspace";

export type ProductScreenshotFocus =
  | "full"
  | "heroNav"
  | "sidebar"
  | "centerDashboard"
  | "detail"
  | "thumbnail";

export type ProductScreenshotPresentation = "hero" | "thumbnail" | "detail";

/** Crop/fit presets — hero and nav views use contain so the left app sidebar stays visible */
export const PRODUCT_SCREENSHOT_FOCUS: Record<
  ProductScreenshotFocus,
  { objectPosition: string; objectFit: "contain" | "cover" }
> = {
  full: { objectPosition: "left top", objectFit: "contain" },
  heroNav: { objectPosition: "left top", objectFit: "contain" },
  sidebar: { objectPosition: "left center", objectFit: "contain" },
  centerDashboard: { objectPosition: "center top", objectFit: "contain" },
  thumbnail: { objectPosition: "left top", objectFit: "contain" },
  detail: { objectPosition: "38% 36%", objectFit: "cover" },
};

export const PLATFORM_MODULE_SCREENSHOTS: Record<PlatformModuleKey, string> = {
  cbamCalc: "/assets/screenshots/cbam/cbam-calculation-engine-main.png",
  cbamComplianceConsole: "/assets/screenshots/cbam-console/dashboard.png",
  ppwr: "/assets/screenshots/ppwr/dashboard.png",
  agriClimate: "/assets/screenshots/agri-climate/dashboard.png",
  eudr: "/assets/screenshots/eudr/dashboard.png",
  dpp: "/assets/screenshots/dpp/dashboard.png",
  supplierEvidence: "/assets/screenshots/supplier-evidence/dashboard.png",
  esgReporting: "/assets/screenshots/esg-workspace/dashboard.png",
};

/** EUDR Turkish UI — English mock for EN/NL locales */
export const EUDR_SCREENSHOT_EN = "/assets/screenshots/eudr/dashboard-en.png";

/** Supplier Evidence Turkish UI — English mock for EN/NL locales */
export const SUPPLIER_SCREENSHOT_EN = "/assets/screenshots/supplier-evidence/dashboard-en.png";

export function resolveModuleScreenshotPath(
  moduleKey: PlatformModuleKey,
  locale?: string
): string {
  if (moduleKey === "eudr" && locale && locale !== "tr") {
    return EUDR_SCREENSHOT_EN;
  }
  if (moduleKey === "supplierEvidence" && locale && locale !== "tr") {
    return SUPPLIER_SCREENSHOT_EN;
  }
  return PLATFORM_MODULE_SCREENSHOTS[moduleKey];
}

export const PLATFORM_MODULE_SCREENSHOT_FOCUS: Record<PlatformModuleKey, ProductScreenshotFocus> = {
  cbamCalc: "full",
  cbamComplianceConsole: "full",
  ppwr: "full",
  agriClimate: "full",
  eudr: "full",
  dpp: "full",
  supplierEvidence: "full",
  esgReporting: "full",
};

export const PLATFORM_MODULE_THUMBNAIL_FOCUS: Record<PlatformModuleKey, ProductScreenshotFocus> = {
  cbamCalc: "thumbnail",
  cbamComplianceConsole: "thumbnail",
  ppwr: "thumbnail",
  agriClimate: "thumbnail",
  eudr: "thumbnail",
  dpp: "thumbnail",
  supplierEvidence: "thumbnail",
  esgReporting: "thumbnail",
};

export function resolveModuleScreenshotFocus(
  moduleKey: PlatformModuleKey,
  presentation: ProductScreenshotPresentation = "hero",
  explicitFocus?: ProductScreenshotFocus
): ProductScreenshotFocus {
  if (explicitFocus) return explicitFocus;
  if (presentation === "thumbnail") return PLATFORM_MODULE_THUMBNAIL_FOCUS[moduleKey];
  if (presentation === "detail") return "detail";
  return PLATFORM_MODULE_SCREENSHOT_FOCUS[moduleKey];
}

export interface PlatformModuleDefinition {
  key: PlatformModuleKey;
  slug: string;
  route: PlatformModuleRoute;
  status: PlatformModuleStatus;
  screenshot: string;
  screenshotFocus: ProductScreenshotFocus;
  /** i18n key under platformModules.* */
  i18nKey: Exclude<PlatformModuleKey, "cbamCalc"> | "cbamCalc";
  hubKey: string;
}

const MODULE_DEFINITIONS: PlatformModuleDefinition[] = [
  {
    key: "cbamCalc",
    slug: "cbam",
    route: "/platform/cbam",
    status: "ready",
    screenshot: PLATFORM_MODULE_SCREENSHOTS.cbamCalc,
    screenshotFocus: "full",
    i18nKey: "cbamCalc",
    hubKey: "cbamCalc",
  },
  {
    key: "cbamComplianceConsole",
    slug: "cbam-console",
    route: "/platform/cbam-console",
    status: "pilot",
    screenshot: PLATFORM_MODULE_SCREENSHOTS.cbamComplianceConsole,
    screenshotFocus: "full",
    i18nKey: "cbamComplianceConsole",
    hubKey: "cbamConsole",
  },
  {
    key: "ppwr",
    slug: "ppwr",
    route: "/platform/ppwr",
    status: "pilot",
    screenshot: PLATFORM_MODULE_SCREENSHOTS.ppwr,
    screenshotFocus: "full",
    i18nKey: "ppwr",
    hubKey: "ppwr",
  },
  {
    key: "agriClimate",
    slug: "agri-climate",
    route: "/platform/agri-climate",
    status: "pilot",
    screenshot: PLATFORM_MODULE_SCREENSHOTS.agriClimate,
    screenshotFocus: "full",
    i18nKey: "agriClimate",
    hubKey: "agriClimate",
  },
  {
    key: "eudr",
    slug: "eudr",
    route: "/platform/eudr",
    status: "comingSoon",
    screenshot: PLATFORM_MODULE_SCREENSHOTS.eudr,
    screenshotFocus: "full",
    i18nKey: "eudr",
    hubKey: "eudr",
  },
  {
    key: "dpp",
    slug: "digital-product-passport",
    route: "/platform/digital-product-passport",
    status: "comingSoon",
    screenshot: PLATFORM_MODULE_SCREENSHOTS.dpp,
    screenshotFocus: "full",
    i18nKey: "dpp",
    hubKey: "dpp",
  },
  {
    key: "supplierEvidence",
    slug: "supplier-evidence",
    route: "/platform/supplier-evidence",
    status: "comingSoon",
    screenshot: PLATFORM_MODULE_SCREENSHOTS.supplierEvidence,
    screenshotFocus: "full",
    i18nKey: "supplierEvidence",
    hubKey: "supplierEvidence",
  },
  {
    key: "esgReporting",
    slug: "esg-workspace",
    route: "/platform/esg-workspace",
    status: "comingSoon",
    screenshot: PLATFORM_MODULE_SCREENSHOTS.esgReporting,
    screenshotFocus: "full",
    i18nKey: "esgReporting",
    hubKey: "esgReporting",
  },
];

export const PLATFORM_MODULES = MODULE_DEFINITIONS;

export const PLATFORM_MODULE_BY_KEY = Object.fromEntries(
  MODULE_DEFINITIONS.map((m) => [m.key, m])
) as Record<PlatformModuleKey, PlatformModuleDefinition>;

export const PLATFORM_MODULE_BY_SLUG = Object.fromEntries(
  MODULE_DEFINITIONS.map((m) => [m.slug, m])
) as Record<string, PlatformModuleDefinition>;

export const PLATFORM_MODULE_ROUTES = Object.fromEntries(
  MODULE_DEFINITIONS.map((m) => [m.key, m.route])
) as Record<PlatformModuleKey, PlatformModuleRoute>;

export const PLATFORM_DYNAMIC_MODULE_SLUGS = MODULE_DEFINITIONS.filter(
  (m) => m.slug !== "cbam"
).map((m) => m.slug);

export const PLATFORM_PILOT_MODULES = MODULE_DEFINITIONS.filter((m) => m.status === "pilot");
export const PLATFORM_COMING_SOON_MODULES = MODULE_DEFINITIONS.filter(
  (m) => m.status === "comingSoon"
);
export const PLATFORM_READY_MODULE = MODULE_DEFINITIONS.find((m) => m.status === "ready")!;

export type PlatformNavModuleKey =
  | "cbamComplianceConsole"
  | "ppwr"
  | "agriClimate"
  | "eudr"
  | "dpp"
  | "supplierEvidence"
  | "esgReporting";

export function platformModuleHref(
  key: PlatformNavModuleKey | PlatformModuleKey
): PlatformModuleRoute {
  const platformModule = PLATFORM_MODULE_BY_KEY[key as PlatformModuleKey];
  if (platformModule) return platformModule.route;
  return "/platform";
}

export function getPlatformModuleBySlug(slug: string): PlatformModuleDefinition | undefined {
  return PLATFORM_MODULE_BY_SLUG[slug];
}

/** Map legacy ModuleKey (lib/assets) to platform routes */
export const LEGACY_MODULE_KEY_ROUTES = {
  cbamCalc: "/platform/cbam",
  cbamConsole: "/platform/cbam-console",
  ppwr: "/platform/ppwr",
  agri: "/platform/agri-climate",
  eudr: "/platform/eudr",
  dpp: "/platform/digital-product-passport",
  supplier: "/platform/supplier-evidence",
  esg: "/platform/esg-workspace",
} as const satisfies Record<string, PlatformModuleRoute>;

/** Map legacy ModuleKey (lib/assets) to platform module registry keys */
export const LEGACY_MODULE_KEY_TO_PLATFORM: Record<
  keyof typeof LEGACY_MODULE_KEY_ROUTES,
  PlatformModuleKey
> = {
  cbamCalc: "cbamCalc",
  cbamConsole: "cbamComplianceConsole",
  ppwr: "ppwr",
  agri: "agriClimate",
  eudr: "eudr",
  dpp: "dpp",
  supplier: "supplierEvidence",
  esg: "esgReporting",
};

export function legacyModuleHref(key: keyof typeof LEGACY_MODULE_KEY_ROUTES): PlatformModuleRoute {
  return LEGACY_MODULE_KEY_ROUTES[key];
}

/** Map roadmap section keys to platform routes */
export const ROADMAP_KEY_ROUTES: Record<string, PlatformModuleRoute> = {
  cbamComplianceConsole: "/platform/cbam-console",
  ppwr: "/platform/ppwr",
  agriClimate: "/platform/agri-climate",
  eudr: "/platform/eudr",
  dpp: "/platform/digital-product-passport",
  supplier: "/platform/supplier-evidence",
  esgReporting: "/platform/esg-workspace",
};

export function roadmapModuleHref(key: string): PlatformModuleRoute {
  return ROADMAP_KEY_ROUTES[key] ?? "/platform";
}

/** @deprecated Use platformModuleHref — kept for migration */
export const PLATFORM_MODULE_ANCHORS = {
  cbamComplianceConsole: "cbam-compliance-console",
  ppwr: "ppwr-packaging-compliance",
  agriClimate: "agri-climate-platform",
  eudr: "eudr-due-diligence",
  dpp: "digital-product-passport",
  supplierEvidence: "supplier-evidence-workflow",
  esgReporting: "esg-evidence-reporting",
} as const;
