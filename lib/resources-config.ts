import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  FileText,
  Fingerprint,
  ListChecks,
  Package,
  Scale,
  Search,
  TreePine,
  Droplets,
} from "lucide-react";

export type ResourceCategoryKey =
  | "tools"
  | "checklists"
  | "templates"
  | "regulatoryNotes"
  | "implementationGuides";

export type ResourceStatus = "available" | "availableOnRequest" | "inPreparation" | "roadmap";

export type ResourceKey =
  | "cbamCnScope"
  | "cbamChecklist"
  | "supplierTemplate"
  | "cbamRegulationBriefing"
  | "embeddedEmissionsGuide"
  | "scopeAssessmentChecklist"
  | "ppwrPackaging"
  | "eudrBrief"
  | "dppDataModelBrief"
  | "esgEvidenceStructure"
  | "waterEfficiencyChecklist";

export type ResourceCtaAction = "checker" | "request" | "expand";

export interface ResourceDefinition {
  key: ResourceKey;
  category: ResourceCategoryKey;
  status: ResourceStatus;
  icon: LucideIcon;
  ctaAction: ResourceCtaAction;
}

export const RESOURCE_CATEGORIES: readonly (ResourceCategoryKey | "all")[] = [
  "all",
  "tools",
  "checklists",
  "templates",
  "regulatoryNotes",
  "implementationGuides",
] as const;

export const RESOURCE_LIBRARY: ResourceDefinition[] = [
  {
    key: "cbamCnScope",
    category: "tools",
    status: "available",
    icon: Search,
    ctaAction: "checker",
  },
  {
    key: "cbamChecklist",
    category: "checklists",
    status: "available",
    icon: ClipboardCheck,
    ctaAction: "request",
  },
  {
    key: "supplierTemplate",
    category: "templates",
    status: "available",
    icon: FileText,
    ctaAction: "request",
  },
  {
    key: "cbamRegulationBriefing",
    category: "regulatoryNotes",
    status: "availableOnRequest",
    icon: Scale,
    ctaAction: "request",
  },
  {
    key: "embeddedEmissionsGuide",
    category: "implementationGuides",
    status: "availableOnRequest",
    icon: BookOpen,
    ctaAction: "request",
  },
  {
    key: "scopeAssessmentChecklist",
    category: "checklists",
    status: "availableOnRequest",
    icon: ListChecks,
    ctaAction: "request",
  },
  {
    key: "ppwrPackaging",
    category: "regulatoryNotes",
    status: "inPreparation",
    icon: Package,
    ctaAction: "expand",
  },
  {
    key: "eudrBrief",
    category: "regulatoryNotes",
    status: "roadmap",
    icon: TreePine,
    ctaAction: "expand",
  },
  {
    key: "dppDataModelBrief",
    category: "implementationGuides",
    status: "roadmap",
    icon: Fingerprint,
    ctaAction: "expand",
  },
  {
    key: "esgEvidenceStructure",
    category: "templates",
    status: "inPreparation",
    icon: BarChart3,
    ctaAction: "expand",
  },
  {
    key: "waterEfficiencyChecklist",
    category: "checklists",
    status: "availableOnRequest",
    icon: Droplets,
    ctaAction: "request",
  },
];

const STATUS_ORDER: Record<ResourceStatus, number> = {
  available: 0,
  availableOnRequest: 1,
  inPreparation: 2,
  roadmap: 3,
};

export function sortResources(items: ResourceDefinition[]): ResourceDefinition[] {
  return [...items].sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);
}
