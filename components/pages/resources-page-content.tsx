"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Library, Search, Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { ResourceLibraryCard } from "@/components/resources/resource-library-card";
import { ResourceDetailPanel } from "@/components/resources/resource-detail-panel";
import { ResourcesSubscribePanel } from "@/components/resources/resources-subscribe-panel";
import {
  RESOURCE_CATEGORIES,
  RESOURCE_LIBRARY,
  sortResources,
  type ResourceCategoryKey,
  type ResourceKey,
} from "@/lib/resources-config";
import { cn } from "@/lib/utils";

const HERO_CHIP_KEYS = ["item1", "item2", "item3"] as const;

type FilterKey = (typeof RESOURCE_CATEGORIES)[number];

export function ResourcesPageContent() {
  const t = useTranslations("resourcesPage");
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [expandedResource, setExpandedResource] = useState<ResourceKey | null>(null);

  const filteredResources = useMemo(() => {
    const list =
      activeFilter === "all"
        ? RESOURCE_LIBRARY
        : RESOURCE_LIBRARY.filter((r) => r.category === activeFilter);
    return sortResources(list);
  }, [activeFilter]);

  const expandedDef = expandedResource
    ? RESOURCE_LIBRARY.find((r) => r.key === expandedResource)
    : null;

  const handleExpand = (key: ResourceKey) => {
    setExpandedResource((prev) => (prev === key ? null : key));
  };

  const showToolSpotlight = activeFilter === "all" || activeFilter === "tools";

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
        <OrbitWaveMotif variant="hero" showOrbit={false} showWaves intensity="subtle" />

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
              {RESOURCE_CATEGORIES.map((key) => {
                const isActive = activeFilter === key;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setActiveFilter(key);
                      setExpandedResource(null);
                    }}
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
        <SectionWaveEdge className="section-wave-edge-compact opacity-45" />
      </FullBleedSection>

      <FullBleedSection className="section-light resources-section-library section-inner-pad">
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

          {showToolSpotlight ? (
            <FadeIn staticReveal>
              <div className="resource-tool-spotlight mt-6">
                <div className="resource-tool-spotlight-glow" aria-hidden="true" />
                <div className="relative grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="resource-tool-spotlight-badge">
                        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                        {t("toolSpotlight.badge")}
                      </span>
                    </div>
                    <h3 className="mt-3 text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">
                      {t("toolSpotlight.title")}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                      {t("toolSpotlight.description")}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row lg:flex-col lg:items-stretch">
                    <Link
                      href="/resources/cbam-cn-scope-checker"
                      className={cn(
                        buttonVariants({ variant: "default", size: "lg" }),
                        "inline-flex w-full items-center justify-center gap-2 sm:w-auto lg:min-w-[12rem]"
                      )}
                    >
                      <Search className="h-4 w-4" aria-hidden="true" />
                      {t("toolSpotlight.cta")}
                    </Link>
                    {activeFilter !== "tools" ? (
                      <button
                        type="button"
                        onClick={() => setActiveFilter("tools")}
                        className={cn(
                          buttonVariants({ variant: "accent-outline", size: "lg" }),
                          "inline-flex w-full items-center justify-center sm:w-auto lg:min-w-[12rem]"
                        )}
                      >
                        {t("toolSpotlight.secondaryCta")}
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </FadeIn>
          ) : null}

          <div className="resource-library-grid mt-6">
            {filteredResources.map((resource, i) => (
              <FadeIn key={resource.key} staticReveal delay={0.02 + i * 0.02}>
                <ResourceLibraryCard
                  resourceKey={resource.key}
                  category={resource.category}
                  status={resource.status}
                  icon={resource.icon}
                  ctaAction={resource.ctaAction}
                  isExpanded={expandedResource === resource.key}
                  onExpand={handleExpand}
                />
              </FadeIn>
            ))}
          </div>

          {expandedDef ? (
            <FadeIn staticReveal>
              <ResourceDetailPanel
                resourceKey={expandedDef.key}
                category={expandedDef.category}
                status={expandedDef.status}
                onClose={() => setExpandedResource(null)}
              />
            </FadeIn>
          ) : null}

          <FadeIn staticReveal delay={0.08}>
            <ResourcesSubscribePanel />
          </FadeIn>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>
    </>
  );
}
