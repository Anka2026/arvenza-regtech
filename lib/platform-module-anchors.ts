/** Stable anchor IDs on /platform for roadmap module cards and nav deep links */
export const PLATFORM_MODULE_ANCHORS = {
  supplierEvidence: "supplier-evidence-hub",
  pcf: "product-carbon-lca",
  ppwr: "ppwr-packaging-bom",
  eudr: "eudr-due-diligence",
  dpp: "digital-product-passport",
  auditEvidence: "audit-ready-evidence-packs",
  regulatoryReporting: "regulatory-reporting-dashboard",
} as const;

export type PlatformModuleAnchorKey = keyof typeof PLATFORM_MODULE_ANCHORS;

/** Roadmap card keys on platform hub page → anchor IDs */
export const PLATFORM_ROADMAP_ANCHORS = {
  supplierEvidence: PLATFORM_MODULE_ANCHORS.supplierEvidence,
  pcf: PLATFORM_MODULE_ANCHORS.pcf,
  ppwr: PLATFORM_MODULE_ANCHORS.ppwr,
  eudr: PLATFORM_MODULE_ANCHORS.eudr,
  dpp: PLATFORM_MODULE_ANCHORS.dpp,
  auditPacks: PLATFORM_MODULE_ANCHORS.auditEvidence,
  reporting: PLATFORM_MODULE_ANCHORS.regulatoryReporting,
} as const;

export type PlatformRoadmapAnchorKey = keyof typeof PLATFORM_ROADMAP_ANCHORS;

export function platformModuleHref(key: PlatformModuleAnchorKey): `/platform#${string}` {
  return `/platform#${PLATFORM_MODULE_ANCHORS[key]}`;
}
