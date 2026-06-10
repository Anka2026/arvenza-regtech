/** Centralized public asset paths — matches files in public/assets */

export const BRAND = {
  logoMain: "/assets/brand/arvenza-logo-main.jpg",
  logoMainPng: "/assets/brand/arvenza-logo-main.png",
  logoSymbol: "/assets/brand/arvenza-logo-header.jpg",
  logoWhite: "/assets/brand/arvenza-logo-white.png",
  logoDark: "/assets/brand/arvenza-logo-dark.png",
  logoHeader: "/assets/brand/arvenza-logo-header.jpg",
  wave: "/assets/brand/arvenza-wave.png",
} as const;

/** Master visual for CBAM Calculation Engine — real product UI */
export const CBAM_PRODUCT_SCREENSHOT =
  "/assets/screenshots/cbam/cbam-calculation-engine-main.png";

export type CbamScreenshotFocus =
  | "full"
  | "hero"
  | "heroNav"
  | "sidebar"
  | "kpi"
  | "chart"
  | "calculation"
  | "insightRail"
  | "monitoring";

export const CBAM_SCREENSHOT_FOCUS: Record<
  CbamScreenshotFocus,
  { objectPosition: string; objectFit: "contain" | "cover" }
> = {
  full: { objectPosition: "left top", objectFit: "contain" },
  hero: { objectPosition: "left top", objectFit: "contain" },
  heroNav: { objectPosition: "left top", objectFit: "contain" },
  sidebar: { objectPosition: "left center", objectFit: "contain" },
  kpi: { objectPosition: "36% 14%", objectFit: "cover" },
  chart: { objectPosition: "50% 58%", objectFit: "cover" },
  calculation: { objectPosition: "38% 36%", objectFit: "cover" },
  insightRail: { objectPosition: "93% 46%", objectFit: "cover" },
  monitoring: { objectPosition: "38% 20%", objectFit: "cover" },
};

export const SCREENSHOTS = {
  cbamEngine: CBAM_PRODUCT_SCREENSHOT,
  cbamConsole: "/assets/screenshots/cbam-console/dashboard.png",
  cbamProduct: CBAM_PRODUCT_SCREENSHOT,
  eudr: "/assets/screenshots/eudr/dashboard.png",
  ppwr: "/assets/screenshots/ppwr/dashboard.png",
  dpp: "/assets/screenshots/dpp/dashboard.png",
  supplierEvidence: "/assets/screenshots/supplier-evidence/dashboard.png",
  esgWorkspace: "/assets/screenshots/esg-workspace/dashboard.png",
  agriClimate: "/assets/screenshots/agri-climate/dashboard.png",
} as const;

export const PLATFORM_HERO_SCREENSHOT = CBAM_PRODUCT_SCREENSHOT;

export type ModuleKey =
  | "cbamCalc"
  | "cbamConsole"
  | "eudr"
  | "ppwr"
  | "dpp"
  | "supplier"
  | "esg"
  | "agri";

export type ModuleScreenshotKey = ModuleKey;

export const MODULE_SCREENSHOTS: Record<ModuleKey, string> = {
  cbamCalc: CBAM_PRODUCT_SCREENSHOT,
  cbamConsole: SCREENSHOTS.cbamConsole,
  eudr: SCREENSHOTS.eudr,
  ppwr: SCREENSHOTS.ppwr,
  dpp: SCREENSHOTS.dpp,
  supplier: SCREENSHOTS.supplierEvidence,
  esg: SCREENSHOTS.esgWorkspace,
  agri: SCREENSHOTS.agriClimate,
};

export const MODULE_KEYS: ModuleKey[] = [
  "cbamCalc",
  "cbamConsole",
  "eudr",
  "ppwr",
  "dpp",
  "supplier",
  "esg",
  "agri",
];

/** CBAM customer journey — core product workflow */
export const CBAM_JOURNEY_STEP_KEYS = [
  "assess",
  "collect",
  "calculate",
  "evidence",
  "report",
  "monitor",
] as const;

export type CbamJourneyStepKey = (typeof CBAM_JOURNEY_STEP_KEYS)[number];

/** Platform roadmap modules — CBAM Calculation Engine is separate (ready core product) */
export const ROADMAP_MODULE_CONFIG = [
  { key: "cbamComplianceConsole", status: "pilot" as const },
  { key: "ppwr", status: "pilot" as const },
  { key: "agriClimate", status: "pilot" as const },
  { key: "eudr", status: "comingSoon" as const },
  { key: "dpp", status: "comingSoon" as const },
  { key: "supplier", status: "comingSoon" as const },
  { key: "esgReporting", status: "comingSoon" as const },
] as const;

export type RoadmapModuleKey = (typeof ROADMAP_MODULE_CONFIG)[number]["key"];

export const ROADMAP_MODULE_KEYS = ROADMAP_MODULE_CONFIG.map((m) => m.key);

export type LogoVariant = "main" | "dark" | "white" | "symbol";

export function getLogoSrc(variant: LogoVariant = "main"): string {
  switch (variant) {
    case "dark":
      return BRAND.logoDark;
    case "white":
      return BRAND.logoWhite;
    case "symbol":
      return BRAND.logoHeader;
    default:
      return BRAND.logoMain;
  }
}
