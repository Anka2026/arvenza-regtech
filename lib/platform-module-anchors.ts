/** Stable anchor IDs on /platform for module cards and nav deep links */
export const PLATFORM_MODULE_ANCHORS = {
  cbamComplianceConsole: "cbam-compliance-console",
  ppwr: "ppwr-packaging-compliance",
  agriClimate: "agri-climate-platform",
  eudr: "eudr-due-diligence",
  dpp: "digital-product-passport",
  supplierEvidence: "supplier-evidence-workflow",
  esgReporting: "esg-evidence-reporting",
} as const;

export type PlatformModuleAnchorKey = keyof typeof PLATFORM_MODULE_ANCHORS;

export function platformModuleHref(key: PlatformModuleAnchorKey): `/platform#${string}` {
  return `/platform#${PLATFORM_MODULE_ANCHORS[key]}`;
}
