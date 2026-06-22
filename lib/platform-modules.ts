/** Platform module registry — routes, maturity, screenshots, i18n keys */

export type PlatformModuleStatus =
  | "ready"
  | "availableOnRequest"
  | "earlyAccess"
  | "roadmap";

/** @deprecated Use earlyAccess */
export type LegacyPilotStatus = "pilot";
/** @deprecated Use roadmap */
export type LegacyComingSoonStatus = "comingSoon";

export type PlatformModuleKey =
  | "cbamCalc"
  | "cbamComplianceConsole"
  | "ppwr"
  | "agriClimate"
  | "eudr"
  | "dpp"
  | "supplierEvidence"
  | "esgReporting"
  | "waterEfficiency";

export type PlatformModuleRoute =
  | "/platform"
  | "/platform/cbam"
  | "/platform/cbam-console"
  | "/platform/ppwr"
  | "/platform/agri-climate"
  | "/platform/eudr"
  | "/platform/digital-product-passport"
  | "/platform/supplier-evidence"
  | "/platform/esg-workspace"
  | "/platform/water-efficiency";

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
  waterEfficiency: "/assets/screenshots/water-efficiency/dashboard.png",
};

/** Modules that always use preview placeholder regardless of locale */
export const PLATFORM_MODULES_PREVIEW_PLACEHOLDER: Partial<Record<PlatformModuleKey, boolean>> =
  {};

export function shouldUseModulePreviewPlaceholder(
  moduleKey: PlatformModuleKey | undefined,
  _locale?: string
): boolean {
  if (!moduleKey) return false;
  return PLATFORM_MODULES_PREVIEW_PLACEHOLDER[moduleKey] === true;
}

/** Turkish-only product UI — same dashboard asset for all locales */
export const WATER_EFFICIENCY_SCREENSHOT =
  "/assets/screenshots/water-efficiency/dashboard.png";

/** EUDR Turkish UI — English mock for EN/NL locales */
export const EUDR_SCREENSHOT_EN = "/assets/screenshots/eudr/dashboard-en.png";

/** Supplier Evidence Turkish UI — English mock for EN/NL locales */
export const SUPPLIER_SCREENSHOT_EN = "/assets/screenshots/supplier-evidence/dashboard-en.png";

/** ESG Workspace Turkish UI — English mock for EN/NL locales */
export const ESG_SCREENSHOT_EN = "/assets/screenshots/esg-workspace/dashboard-en.png";

export function resolveModuleScreenshotPath(
  moduleKey: PlatformModuleKey,
  locale?: string
): string | undefined {
  if (moduleKey === "waterEfficiency") {
    return WATER_EFFICIENCY_SCREENSHOT;
  }
  if (moduleKey === "eudr" && locale && locale !== "tr") {
    return EUDR_SCREENSHOT_EN;
  }
  if (moduleKey === "supplierEvidence" && locale && locale !== "tr") {
    return SUPPLIER_SCREENSHOT_EN;
  }
  if (moduleKey === "esgReporting" && locale && locale !== "tr") {
    return ESG_SCREENSHOT_EN;
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
  waterEfficiency: "full",
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
  waterEfficiency: "thumbnail",
};

/** Screenshots that already include browser chrome in the asset — skip synthetic chrome wrapper. */
export const PLATFORM_MODULE_SCREENSHOT_INCLUDES_CHROME: Partial<Record<PlatformModuleKey, boolean>> = {
  cbamComplianceConsole: true,
};

export function moduleScreenshotIncludesChrome(moduleKey: PlatformModuleKey): boolean {
  return PLATFORM_MODULE_SCREENSHOT_INCLUDES_CHROME[moduleKey] ?? false;
}

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
  /** When false, skips the platform architecture section on the module detail page */
  showArchitectureSection?: boolean;
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
    status: "availableOnRequest",
    screenshot: PLATFORM_MODULE_SCREENSHOTS.cbamComplianceConsole,
    screenshotFocus: "full",
    i18nKey: "cbamComplianceConsole",
    hubKey: "cbamConsole",
  },
  {
    key: "ppwr",
    slug: "ppwr",
    route: "/platform/ppwr",
    status: "earlyAccess",
    screenshot: PLATFORM_MODULE_SCREENSHOTS.ppwr,
    screenshotFocus: "full",
    i18nKey: "ppwr",
    hubKey: "ppwr",
  },
  {
    key: "agriClimate",
    slug: "agri-climate",
    route: "/platform/agri-climate",
    status: "earlyAccess",
    screenshot: PLATFORM_MODULE_SCREENSHOTS.agriClimate,
    screenshotFocus: "full",
    i18nKey: "agriClimate",
    hubKey: "agriClimate",
  },
  {
    key: "eudr",
    slug: "eudr",
    route: "/platform/eudr",
    status: "roadmap",
    screenshot: PLATFORM_MODULE_SCREENSHOTS.eudr,
    screenshotFocus: "full",
    i18nKey: "eudr",
    hubKey: "eudr",
  },
  {
    key: "dpp",
    slug: "digital-product-passport",
    route: "/platform/digital-product-passport",
    status: "roadmap",
    screenshot: PLATFORM_MODULE_SCREENSHOTS.dpp,
    screenshotFocus: "full",
    i18nKey: "dpp",
    hubKey: "dpp",
  },
  {
    key: "supplierEvidence",
    slug: "supplier-evidence",
    route: "/platform/supplier-evidence",
    status: "availableOnRequest",
    screenshot: PLATFORM_MODULE_SCREENSHOTS.supplierEvidence,
    screenshotFocus: "full",
    i18nKey: "supplierEvidence",
    hubKey: "supplierEvidence",
  },
  {
    key: "esgReporting",
    slug: "esg-workspace",
    route: "/platform/esg-workspace",
    status: "roadmap",
    screenshot: PLATFORM_MODULE_SCREENSHOTS.esgReporting,
    screenshotFocus: "full",
    i18nKey: "esgReporting",
    hubKey: "esgReporting",
  },
  {
    key: "waterEfficiency",
    slug: "water-efficiency",
    route: "/platform/water-efficiency",
    status: "availableOnRequest",
    screenshot: PLATFORM_MODULE_SCREENSHOTS.waterEfficiency,
    screenshotFocus: "full",
    i18nKey: "waterEfficiency",
    hubKey: "waterEfficiency",
    showArchitectureSection: false,
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

export const PLATFORM_EARLY_ACCESS_MODULES = MODULE_DEFINITIONS.filter(
  (m) => m.status === "earlyAccess"
);
/** @deprecated Use PLATFORM_EARLY_ACCESS_MODULES */
export const PLATFORM_PILOT_MODULES = PLATFORM_EARLY_ACCESS_MODULES;
export const PLATFORM_ROADMAP_MODULES = MODULE_DEFINITIONS.filter((m) => m.status === "roadmap");
/** @deprecated Use PLATFORM_ROADMAP_MODULES */
export const PLATFORM_COMING_SOON_MODULES = PLATFORM_ROADMAP_MODULES;
export const PLATFORM_AVAILABLE_ON_REQUEST_MODULES = MODULE_DEFINITIONS.filter(
  (m) => m.status === "availableOnRequest"
);
export const PLATFORM_READY_MODULE = MODULE_DEFINITIONS.find((m) => m.status === "ready")!;

export type PlatformNavModuleKey =
  | "cbamComplianceConsole"
  | "ppwr"
  | "agriClimate"
  | "eudr"
  | "dpp"
  | "supplierEvidence"
  | "esgReporting"
  | "waterEfficiency";

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
  water: "/platform/water-efficiency",
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
  water: "waterEfficiency",
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
  waterEfficiency: "/platform/water-efficiency",
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
  waterEfficiency: "water-efficiency-management",
} as const;
