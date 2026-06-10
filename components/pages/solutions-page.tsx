"use client";

import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Calculator,
  Fingerprint,
  LayoutDashboard,
  Package,
  Sprout,
  TreePine,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { PageCtaBand } from "@/components/pages/shared/page-cta-band";
import { StatusPill } from "@/components/pages/shared/status-pill";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SolutionKey =
  | "cbamWorkflows"
  | "cbamConsole"
  | "ppwr"
  | "agriClimate"
  | "eudr"
  | "dpp";

type SolutionStatus = "ready" | "pilot" | "comingSoon";

const READY_KEY: SolutionKey = "cbamWorkflows";
const PILOT_KEYS: SolutionKey[] = ["cbamConsole", "ppwr", "agriClimate"];
const ROADMAP_KEYS: SolutionKey[] = ["eudr", "dpp"];

const SOLUTION_ICONS: Record<SolutionKey, typeof Calculator> = {
  cbamWorkflows: Calculator,
  cbamConsole: LayoutDashboard,
  ppwr: Package,
  agriClimate: Sprout,
  eudr: TreePine,
  dpp: Fingerprint,
};

const SOLUTION_HREF: Record<SolutionKey, "/platform/cbam" | "/demo" | "/resources"> = {
  cbamWorkflows: "/platform/cbam",
  cbamConsole: "/demo",
  ppwr: "/demo",
  agriClimate: "/demo",
  eudr: "/resources",
  dpp: "/resources",
};

const STATUS_VARIANT: Record<SolutionStatus, "ready" | "pilot" | "comingSoon"> = {
  ready: "ready",
  pilot: "pilot",
  comingSoon: "comingSoon",
};

const STATUS_KEY: Record<SolutionKey, SolutionStatus> = {
  cbamWorkflows: "ready",
  cbamConsole: "pilot",
  ppwr: "pilot",
  agriClimate: "pilot",
  eudr: "comingSoon",
  dpp: "comingSoon",
};

function SolutionWorkflowVisual({ status }: { status: SolutionStatus }) {
  return (
    <div
      className={cn(
        "solution-workflow-visual",
        status === "ready" && "solution-workflow-visual-ready",
        status === "pilot" && "solution-workflow-visual-pilot",
        status === "comingSoon" && "solution-workflow-visual-roadmap"
      )}
      aria-hidden="true"
    >
      <span className="solution-workflow-node" />
      <span className="solution-workflow-line" />
      <span className="solution-workflow-node" />
      <span className="solution-workflow-line" />
      <span className="solution-workflow-node" />
      <span className="solution-workflow-line" />
      <span className="solution-workflow-node solution-workflow-node-end" />
    </div>
  );
}

function SolutionCard({
  solutionKey,
  featured = false,
}: {
  solutionKey: SolutionKey;
  featured?: boolean;
}) {
  const t = useTranslations("solutionsPage");
  const tStatus = useTranslations("nav.status");
  const status = STATUS_KEY[solutionKey];
  const Icon = SOLUTION_ICONS[solutionKey];
  const href = SOLUTION_HREF[solutionKey];

  return (
    <article
      className={cn(
        "solution-card card-premium flex h-full min-w-0 flex-col p-5 sm:p-6",
        status === "ready" && "solution-card-ready",
        status === "pilot" && "product-card-pilot",
        status === "comingSoon" && "product-card-roadmap",
        featured && "solution-card-featured"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-xl ring-1",
            featured ? "h-11 w-11" : "h-10 w-10",
            status === "ready"
              ? "bg-[#2563eb]/10 ring-[#2563eb]/20"
              : "bg-[#7c3aed]/10 ring-[#7c3aed]/18"
          )}
          aria-hidden="true"
        >
          <Icon
            className={cn(
              featured ? "h-5 w-5" : "h-[18px] w-[18px]",
              status === "ready" ? "text-[#2563eb]" : "text-[#7c3aed]"
            )}
          />
        </div>
        <div className="min-w-0 flex-1">
          <StatusPill variant={STATUS_VARIANT[status]} label={tStatus(STATUS_VARIANT[status])} />
          <h3
            className={cn(
              "mt-3 font-semibold leading-snug text-[#071225]",
              featured ? "text-[clamp(1.25rem,2vw+0.35rem,1.625rem)]" : "text-base lg:text-[17px]"
            )}
          >
            {t(`solutions.${solutionKey}.title`)}
          </h3>
        </div>
      </div>

      <SolutionWorkflowVisual status={status} />

      <div className="mt-4 space-y-4 border-t border-[#dde5f2]/80 pt-4">
        <div>
          <p className="solution-field-label">{t("fields.problem")}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-[#64748b]">
            {t(`solutions.${solutionKey}.problem`)}
          </p>
        </div>
        <div>
          <p className="solution-field-label">{t("fields.approach")}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-[#64748b]">
            {t(`solutions.${solutionKey}.approach`)}
          </p>
        </div>
        <div>
          <p className="solution-field-label">{t("fields.capability")}</p>
          <p className="mt-1.5 text-sm font-medium text-[#071225]">
            {t(`solutions.${solutionKey}.capability`)}
          </p>
        </div>
      </div>

      <Link
        href={href}
        className={cn(
          buttonVariants({
            variant: status === "ready" ? "default" : status === "pilot" ? "default" : "accent-outline",
            size: featured ? "lg" : "sm",
          }),
          "mt-5 w-full justify-center sm:w-auto sm:self-start"
        )}
      >
        {t(`solutions.${solutionKey}.cta`)}
        <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </article>
  );
}

export function SolutionsPage() {
  const t = useTranslations("solutionsPage");

  return (
    <>
      <FullBleedSection ariaLabelledby="solutions-heading" className="section-hero-light pt-24 lg:pt-28">
        <PageContainer className="section-content min-w-0 pb-10">
          <FadeIn immediate>
            <SectionHeading
              id="solutions-heading"
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
            />
          </FadeIn>
        </PageContainer>
      </FullBleedSection>

      <FullBleedSection className="section-light pb-14 lg:pb-16">
        <PageContainer className="section-content min-w-0">
          <SolutionCard solutionKey={READY_KEY} featured />

          <div className="solutions-section-divider mt-10 lg:mt-12" aria-hidden="true" />

          <div className="mt-10 lg:mt-12">
            <h2 className="text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">
              {t("sections.pilot.title")}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
              {t("sections.pilot.description")}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {PILOT_KEYS.map((key) => (
                <SolutionCard key={key} solutionKey={key} />
              ))}
            </div>
          </div>

          <div id="roadmap" className="mt-10 scroll-mt-28 lg:mt-12">
            <h2 className="text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">
              {t("sections.roadmap.title")}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
              {t("sections.roadmap.description")}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              {ROADMAP_KEYS.map((key) => (
                <SolutionCard key={key} solutionKey={key} />
              ))}
            </div>
          </div>

          <div className="solution-maturity-strip mt-10 rounded-[1.25rem] border border-[#7c3aed]/16 bg-gradient-to-br from-[#7c3aed]/[0.06] via-white to-[#2563eb]/[0.04] p-5 sm:rounded-[1.5rem] sm:p-6 lg:mt-12 lg:p-8">
              <h2 className="text-balance text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">
                {t("maturity.title")}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b] lg:text-[15px]">
                {t("maturity.description")}
              </p>
          </div>

          <div className="mt-12 lg:mt-14">
            <PageCtaBand
              title={t("cta.title")}
              primaryLabel={t("cta.primary")}
              primaryHref="/demo"
              secondaryLabel={t("cta.secondary")}
              secondaryHref="/resources"
            />
          </div>
        </PageContainer>
      </FullBleedSection>
    </>
  );
}
