"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { PageCtaBand } from "@/components/pages/shared/page-cta-band";
import { StatusPill } from "@/components/pages/shared/status-pill";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const RESOURCE_KEYS = ["cbamChecklist", "regulationUpdates", "guides", "blog"] as const;

export function ResourcesPageContent() {
  const t = useTranslations("resourcesPage");
  const tStatus = useTranslations("nav.status");
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
        <PageContainer className="section-content pb-10">
          <FadeIn>
            <SectionHeading
              id="resources-heading"
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
            />
          </FadeIn>
        </PageContainer>
      </FullBleedSection>

      <FullBleedSection className="section-light pb-14 lg:pb-16">
        <PageContainer className="section-content">
          <div className="grid gap-4 sm:grid-cols-2">
            {RESOURCE_KEYS.map((key, i) => (
              <FadeIn key={key} delay={i * 0.03}>
                <div className="card-premium flex h-full flex-col p-6">
                  <StatusPill variant="comingSoon" label={tStatus("comingSoon")} />
                  <h3 className="mt-3 text-base font-semibold text-[#071225] lg:text-lg">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#64748b]">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.1}>
            <div className="mt-14">
              <PageCtaBand
                title={t("ctaBand.title")}
                primaryLabel={t("ctaBand.primary")}
                primaryHref="/platform/cbam"
                secondaryLabel={t("ctaBand.secondary")}
                secondaryHref="/demo"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="mt-14 rounded-[1.75rem] border border-[#dde5f2] bg-white p-8 shadow-card lg:p-10">
              <h2 className="text-xl font-bold tracking-[-0.03em] text-[#071225]">
                {t("subscribe.title")}
              </h2>
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
                      className="mt-1.5 w-full rounded-lg border border-[#dde5f2] px-4 py-2.5 text-sm text-[#071225] outline-none focus:border-[#7c3aed]/50 focus:ring-2 focus:ring-[#7c3aed]/20"
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
                      className="mt-1.5 w-full rounded-lg border border-[#dde5f2] px-4 py-2.5 text-sm text-[#071225] outline-none focus:border-[#7c3aed]/50 focus:ring-2 focus:ring-[#7c3aed]/20"
                    >
                      <option value="">{t("subscribe.interestPlaceholder")}</option>
                      <option value="cbam">{t("subscribe.interests.cbam")}</option>
                      <option value="ppwr">{t("subscribe.interests.ppwr")}</option>
                      <option value="eudr">{t("subscribe.interests.eudr")}</option>
                      <option value="dpp">{t("subscribe.interests.dpp")}</option>
                      <option value="general">{t("subscribe.interests.general")}</option>
                    </select>
                  </div>
                  <button type="submit" className={cn(buttonVariants({ variant: "default", size: "lg" }))}>
                    {t("subscribe.submit")}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </PageContainer>
      </FullBleedSection>
    </>
  );
}
