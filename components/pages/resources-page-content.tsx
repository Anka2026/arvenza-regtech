"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  FileText,
  Package,
  Search,
  TreePine,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { StatusPill } from "@/components/pages/shared/status-pill";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CATEGORY_KEYS = ["all", "cbamGuides", "checklists", "sectorBriefings", "regulationUpdates"] as const;

type CategoryKey = (typeof CATEGORY_KEYS)[number];
type ResourceStatus = "available" | "inPreparation" | "roadmap";

type ResourceKey =
  | "cbamChecklist"
  | "supplierTemplate"
  | "embeddedEmissionsGuide"
  | "cbamCnScope"
  | "ppwrPackaging"
  | "eudrBrief";

const RESOURCE_CONFIG: {
  key: ResourceKey;
  category: CategoryKey;
  status: ResourceStatus;
  icon: typeof ClipboardCheck;
  href: "/demo" | "/solutions#roadmap";
  anchor?: boolean;
}[] = [
  {
    key: "cbamChecklist",
    category: "checklists",
    status: "available",
    icon: ClipboardCheck,
    href: "/demo",
  },
  {
    key: "supplierTemplate",
    category: "checklists",
    status: "available",
    icon: FileText,
    href: "/demo",
  },
  {
    key: "embeddedEmissionsGuide",
    category: "cbamGuides",
    status: "inPreparation",
    icon: BookOpen,
    href: "/demo",
    anchor: true,
  },
  {
    key: "cbamCnScope",
    category: "cbamGuides",
    status: "inPreparation",
    icon: Search,
    href: "/demo",
    anchor: true,
  },
  {
    key: "ppwrPackaging",
    category: "regulationUpdates",
    status: "roadmap",
    icon: Package,
    href: "/solutions#roadmap",
  },
  {
    key: "eudrBrief",
    category: "regulationUpdates",
    status: "roadmap",
    icon: TreePine,
    href: "/solutions#roadmap",
  },
];

const STATUS_VARIANT: Record<ResourceStatus, "available" | "inPreparation" | "roadmap"> = {
  available: "available",
  inPreparation: "inPreparation",
  roadmap: "roadmap",
};

const SUBSCRIBE_BENEFIT_KEYS = ["item1", "item2", "item3", "item4"] as const;

export function ResourcesPageContent() {
  const t = useTranslations("resourcesPage");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <FullBleedSection ariaLabelledby="resources-heading" className="section-hero-light pt-24 lg:pt-28">
        <PageContainer className="section-content min-w-0 pb-10">
          <FadeIn>
            <SectionHeading
              id="resources-heading"
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
            />
            <p className="mt-4 max-w-3xl text-sm font-medium text-[#64748b] lg:text-[15px]">
              {t("positioning")}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {CATEGORY_KEYS.map((key) => (
                <span
                  key={key}
                  className={cn("resource-category-chip", key === "all" && "resource-category-chip-active")}
                >
                  {t(`categories.${key}`)}
                </span>
              ))}
            </div>
          </FadeIn>
        </PageContainer>
      </FullBleedSection>

      <FullBleedSection className="section-light pb-14 lg:pb-16">
        <PageContainer className="section-content min-w-0">
          <FadeIn>
            <h2 className="text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">
              {t("library.title")}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
              {t("library.description")}
            </p>
          </FadeIn>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {RESOURCE_CONFIG.map(({ key, category, status, icon: Icon, href, anchor }) => {
              const ctaLabel = t(`resources.${key}.cta`);
              return (
                <article
                  key={key}
                  className={cn(
                    "resource-card card-premium flex h-full min-w-0 flex-col p-5 sm:p-6",
                    status === "available" && "resource-card-available",
                    status === "roadmap" && "opacity-[0.97]"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7c3aed]/10 ring-1 ring-[#7c3aed]/18"
                      aria-hidden="true"
                    >
                      <Icon className="h-[18px] w-[18px] text-[#7c3aed]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="resource-category-label">{t(`categories.${category}`)}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <StatusPill variant={STATUS_VARIANT[status]} label={t(`status.${status}`)} />
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-4 text-base font-semibold leading-snug text-[#071225] lg:text-[17px]">
                    {t(`resources.${key}.title`)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#64748b]">
                    {t(`resources.${key}.description`)}
                  </p>
                  {anchor ? (
                    <a
                      href="#subscribe"
                      className={cn(
                        buttonVariants({ variant: status === "available" ? "default" : "accent-outline", size: "sm" }),
                        "mt-5 w-full justify-center sm:w-auto"
                      )}
                    >
                      {ctaLabel}
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className={cn(
                        buttonVariants({ variant: status === "available" ? "default" : "accent-outline", size: "sm" }),
                        "mt-5 w-full justify-center sm:w-auto"
                      )}
                    >
                      {ctaLabel}
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </article>
              );
            })}
          </div>

          <FadeIn delay={0.1}>
            <div
              id="lead-magnet"
              className="resource-lead-magnet mt-12 scroll-mt-28 rounded-[1.25rem] border p-5 sm:rounded-[1.5rem] sm:p-6 lg:mt-14 lg:p-8"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#7c3aed]/12 ring-1 ring-[#7c3aed]/22"
                      aria-hidden="true"
                    >
                      <ClipboardCheck className="h-5 w-5 text-[#7c3aed]" />
                    </div>
                    <StatusPill variant="available" label={t("status.available")} />
                  </div>
                  <h2 className="mt-4 text-balance text-[clamp(1.125rem,1.5vw+0.5rem,1.5rem)] font-bold tracking-[-0.02em] text-[#071225]">
                    {t("leadMagnet.title")}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                    {t("leadMagnet.description")}
                  </p>
                </div>
                <Link
                  href="/demo"
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "w-full shrink-0 lg:w-auto"
                  )}
                >
                  {t("leadMagnet.cta")}
                  <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </FadeIn>

          <div className="resource-subscribe-benefits mt-10 rounded-[1.25rem] border border-[#7c3aed]/14 bg-gradient-to-br from-[#7c3aed]/[0.04] via-white to-[#2563eb]/[0.03] p-5 sm:rounded-[1.5rem] sm:p-6 lg:mt-12 lg:p-8">
            <h2 className="text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">
              {t("subscribeBenefits.title")}
            </h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {SUBSCRIBE_BENEFIT_KEYS.map((key) => (
                <li key={key} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#64748b]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7c3aed]" aria-hidden="true" />
                  {t(`subscribeBenefits.items.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          <div
            id="subscribe"
            className="mt-8 scroll-mt-28 rounded-[1.25rem] border border-[#dde5f2] bg-white p-5 shadow-card sm:rounded-[1.75rem] sm:p-8 lg:mt-10 lg:p-10"
          >
              <h2 className="text-balance text-lg font-bold tracking-[-0.03em] text-[#071225] sm:text-xl">
                {t("subscribe.title")}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#64748b]">
                {t("subscribe.description")}
              </p>
              {submitted ? (
                <p className="mt-4 text-sm text-[#059669]" role="status">
                  {t("subscribe.success")}
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="resource-email" className="block text-sm font-medium text-[#071225]">
                      {t("subscribe.emailLabel")}
                    </label>
                    <input
                      id="resource-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1.5 w-full min-w-0 rounded-lg border border-[#dde5f2] px-4 py-2.5 text-sm text-[#071225] outline-none focus:border-[#7c3aed]/50 focus:ring-2 focus:ring-[#7c3aed]/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="resource-interest" className="block text-sm font-medium text-[#071225]">
                      {t("subscribe.interestLabel")}
                    </label>
                    <select
                      id="resource-interest"
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="mt-1.5 w-full min-w-0 rounded-lg border border-[#dde5f2] px-4 py-2.5 text-sm text-[#071225] outline-none focus:border-[#7c3aed]/50 focus:ring-2 focus:ring-[#7c3aed]/20"
                    >
                      <option value="">{t("subscribe.interestPlaceholder")}</option>
                      <option value="cbam">{t("subscribe.interests.cbam")}</option>
                      <option value="ppwr">{t("subscribe.interests.ppwr")}</option>
                      <option value="eudr">{t("subscribe.interests.eudr")}</option>
                      <option value="dpp">{t("subscribe.interests.dpp")}</option>
                      <option value="general">{t("subscribe.interests.general")}</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full sm:w-auto")}
                  >
                    {t("subscribe.submit")}
                  </button>
                </form>
              )}
            </div>
        </PageContainer>
      </FullBleedSection>
    </>
  );
}
