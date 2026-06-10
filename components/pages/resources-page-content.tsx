"use client";

import { useTranslations } from "next-intl";
import {
  BookOpen,
  ClipboardCheck,
  FileText,
  Library,
  Package,
  Search,
  TreePine,
} from "lucide-react";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import {
  ResourceLibraryCard,
  type ResourceKey,
} from "@/components/resources/resource-library-card";
import { ResourcesSubscribePanel } from "@/components/resources/resources-subscribe-panel";

const CATEGORY_TAG_KEYS = ["cbamGuides", "checklists", "sectorBriefings", "regulationUpdates"] as const;
const HERO_CHIP_KEYS = ["item1", "item2", "item3"] as const;

type CategoryKey = (typeof CATEGORY_TAG_KEYS)[number];
type ResourceStatus = "available" | "inPreparation" | "roadmap";

const RESOURCE_SECTIONS: {
  sectionKey: "available" | "inPreparation" | "roadmap";
  status: ResourceStatus;
  resources: {
    key: ResourceKey;
    category: CategoryKey;
    icon: typeof ClipboardCheck;
    href: "/demo" | "/solutions#roadmap";
    anchorToSubscribe?: boolean;
  }[];
}[] = [
  {
    sectionKey: "available",
    status: "available",
    resources: [
      { key: "cbamChecklist", category: "checklists", icon: ClipboardCheck, href: "/demo" },
      { key: "supplierTemplate", category: "checklists", icon: FileText, href: "/demo" },
    ],
  },
  {
    sectionKey: "inPreparation",
    status: "inPreparation",
    resources: [
      {
        key: "embeddedEmissionsGuide",
        category: "cbamGuides",
        icon: BookOpen,
        href: "/demo",
        anchorToSubscribe: true,
      },
      {
        key: "cbamCnScope",
        category: "cbamGuides",
        icon: Search,
        href: "/demo",
        anchorToSubscribe: true,
      },
    ],
  },
  {
    sectionKey: "roadmap",
    status: "roadmap",
    resources: [
      { key: "ppwrPackaging", category: "regulationUpdates", icon: Package, href: "/solutions#roadmap" },
      { key: "eudrBrief", category: "regulationUpdates", icon: TreePine, href: "/solutions#roadmap" },
    ],
  },
];

export function ResourcesPageContent() {
  const t = useTranslations("resourcesPage");

  return (
    <>
      <FullBleedSection
        ariaLabelledby="resources-heading"
        className="section-resources-hero pt-24 lg:pt-28"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-[0.32]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-16 top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.16),transparent_70%)] blur-3xl"
          aria-hidden="true"
        />
        <OrbitWaveMotif variant="hero" showOrbit showWaves />

        <PageContainer className="section-content min-w-0 pb-10 lg:pb-12">
          <FadeIn immediate>
            <SectionHeading
              id="resources-heading"
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
            />
            <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-[#64748b] lg:text-[15px]">
              {t("positioning")}
            </p>
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t("heroChipsAriaLabel")}>
              {HERO_CHIP_KEYS.map((key) => (
                <li key={key}>
                  <span className="chip-dark resource-hero-chip">
                    <span className="chip-dot" aria-hidden="true" />
                    {t(`heroChips.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2" role="list" aria-label={t("categoryTagsAriaLabel")}>
              {CATEGORY_TAG_KEYS.map((key) => (
                <span key={key} role="listitem" className="resource-category-chip">
                  {t(`categories.${key}`)}
                </span>
              ))}
            </div>
          </FadeIn>
        </PageContainer>
        <SectionWaveEdge className="opacity-45" />
      </FullBleedSection>

      <FullBleedSection className="section-light resources-section-library">
        <OrbitWaveMotif variant="section" orbitAlign="right" />
        <PageContainer className="section-content min-w-0 py-10 lg:py-12">
          <FadeIn>
            <div className="resource-library-head">
              <div className="resource-library-head-icon" aria-hidden="true">
                <Library className="h-5 w-5 text-[#7c3aed]" />
              </div>
              <div>
                <h2 className="text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">
                  {t("library.title")}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                  {t("library.description")}
                </p>
              </div>
            </div>
          </FadeIn>

          {RESOURCE_SECTIONS.map(({ sectionKey, status, resources }, sectionIndex) => (
            <div key={sectionKey} className={sectionIndex > 0 ? "resource-status-section mt-10 lg:mt-12" : "mt-8"}>
              <FadeIn delay={sectionIndex * 0.04}>
                <div className="resource-status-head">
                  <span className={`resource-status-badge resource-status-badge-${status}`}>
                    {t(`sections.${sectionKey}.label`)}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-[#071225] lg:text-lg">
                    {t(`sections.${sectionKey}.title`)}
                  </h3>
                  <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-[#64748b]">
                    {t(`sections.${sectionKey}.description`)}
                  </p>
                </div>
              </FadeIn>
              <div className="resource-library-grid mt-5">
                {resources.map((resource, i) => (
                  <FadeIn key={resource.key} delay={0.04 + sectionIndex * 0.04 + i * 0.03}>
                    <ResourceLibraryCard
                      resourceKey={resource.key}
                      category={resource.category}
                      status={status}
                      icon={resource.icon}
                      href={resource.href}
                      anchorToSubscribe={resource.anchorToSubscribe}
                    />
                  </FadeIn>
                ))}
              </div>
            </div>
          ))}

          <FadeIn delay={0.12}>
            <ResourcesSubscribePanel />
          </FadeIn>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>
    </>
  );
}
