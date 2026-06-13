import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  FileText,
  Fingerprint,
  Package,
  Search,
  TreePine,
} from "lucide-react";

export type ResourceCategoryKey =
  | "tools"
  | "checklists"
  | "templates"
  | "regulatoryNotes"
  | "implementationGuides";

export type ResourceStatus = "available" | "inPreparation" | "roadmap";

export type ResourceKey =
  | "cbamCnScope"
  | "cbamChecklist"
  | "supplierTemplate"
  | "embeddedEmissionsGuide"
  | "ppwrPackaging"
  | "eudrBrief"
  | "dppDataModelBrief"
  | "esgEvidenceStructure";

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
    key: "embeddedEmissionsGuide",
    category: "implementationGuides",
    status: "inPreparation",
    icon: BookOpen,
    ctaAction: "expand",
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
];

const STATUS_ORDER: Record<ResourceStatus, number> = {
  available: 0,
  inPreparation: 1,
  roadmap: 2,
};

export function sortResources(items: ResourceDefinition[]): ResourceDefinition[] {
  return [...items].sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);
}
