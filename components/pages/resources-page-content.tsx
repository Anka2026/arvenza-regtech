"use client";

import { useMemo, useState } from "react";
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
import { CbamCnScopeChecker } from "@/components/tools/cbam-cn-scope-checker";
import { cn } from "@/lib/utils";

const HERO_CHIP_KEYS = ["item1", "item2", "item3"] as const;

type CategoryKey = "cbamGuides" | "checklists" | "regulationUpdates";
type ResourceStatus = "available" | "inPreparation" | "roadmap";
type FilterKey = "all" | CategoryKey;

/** Categories that have at least one resource card */
const FILTER_CATEGORIES: FilterKey[] = ["all", "checklists", "cbamGuides", "regulationUpdates"];

const RESOURCE_SECTIONS: {
  sectionKey: "available" | "inPreparation" | "roadmap";
  status: ResourceStatus;
  resources: {
    key: ResourceKey;
    category: CategoryKey;
    icon: typeof ClipboardCheck;
    href: "/demo" | "/solutions#roadmap";
    anchorToSubscribe?: boolean;
    anchorToChecker?: boolean;
  }[];
}[] = [
  {
    sectionKey: "available",
    status: "available",
    resources: [
      { key: "cbamChecklist", category: "checklists", icon: ClipboardCheck, href: "/demo" },
      { key: "supplierTemplate", category: "checklists", icon: FileText, href: "/demo" },
      {
        key: "cbamCnScope",
        category: "cbamGuides",
        icon: Search,
        href: "/demo",
        anchorToChecker: true,
      },
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
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filteredSections = useMemo(() => {
    if (activeFilter === "all") return RESOURCE_SECTIONS;

    return RESOURCE_SECTIONS.map((section) => ({
      ...section,
      resources: section.resources.filter((r) => r.category === activeFilter),
    })).filter((section) => section.resources.length > 0);
  }, [activeFilter]);

  return (
    <>
      <FullBleedSection
        ariaLabelledby="resources-heading"
        className="section-resources-hero page-hero-top"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-[0.32]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-16 top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.16),transparent_70%)] blur-3xl"
          aria-hidden="true"
        />
        <OrbitWaveMotif variant="hero" showOrbit showWaves />

        <PageContainer className="section-content min-w-0 page-hero-bottom">
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
            <div
              className="mt-6 flex flex-wrap gap-2"
              role="group"
              aria-label={t("categoryTagsAriaLabel")}
            >
              {FILTER_CATEGORIES.map((key) => {
                const isActive = activeFilter === key;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveFilter(key)}
                    className={cn(
                      "resource-category-filter",
                      isActive && "resource-category-filter-active"
                    )}
                  >
                    {t(`categories.${key}`)}
                  </button>
                );
              })}
            </div>
          </FadeIn>
        </PageContainer>
        <SectionWaveEdge className="opacity-45" />
      </FullBleedSection>

      <FullBleedSection className="section-light resources-section-library">
        <OrbitWaveMotif variant="section" orbitAlign="right" />
        <PageContainer className="section-content min-w-0 page-section-y">
          <FadeIn staticReveal>
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

          {filteredSections.map(({ sectionKey, status, resources }, sectionIndex) => (
            <div key={sectionKey} className={sectionIndex > 0 ? "resource-status-section page-stack-gap" : "mt-6"}>
              <FadeIn staticReveal delay={sectionIndex * 0.02}>
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
                  <FadeIn key={resource.key} staticReveal delay={0.02 + i * 0.02}>
                    <ResourceLibraryCard
                      resourceKey={resource.key}
                      category={resource.category}
                      status={status}
                      icon={resource.icon}
                      href={resource.href}
                      anchorToSubscribe={resource.anchorToSubscribe}
                      anchorToChecker={resource.anchorToChecker}
                    />
                  </FadeIn>
                ))}
              </div>
            </div>
          ))}

          <FadeIn staticReveal>
            <section
              id="cbam-cn-scope-checker"
              className="cn-scope-checker-section mt-10 scroll-mt-28 lg:mt-12"
              aria-labelledby="cn-scope-checker-heading"
            >
              <p className="eyebrow-pill">{t("cnScopeChecker.eyebrow")}</p>
              <h2
                id="cn-scope-checker-heading"
                className="mt-3 text-[clamp(1.25rem,1.75vw+0.5rem,1.75rem)] font-bold tracking-[-0.02em] text-[#071225]"
              >
                {t("cnScopeChecker.title")}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                {t("cnScopeChecker.description")}
              </p>
              <CbamCnScopeChecker className="mt-6" />
            </section>
          </FadeIn>

          <FadeIn staticReveal delay={0.08}>
            <ResourcesSubscribePanel />
          </FadeIn>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>
    </>
  );
}
