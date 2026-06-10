"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Mail, Building2, FileText, Hash } from "lucide-react";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif } from "@/components/home/orbit-wave-motif";
import { FadeIn } from "@/components/ui/fade-in";

export type LegalDocumentKey =
  | "privacyPolicy"
  | "terms"
  | "cookiePolicy"
  | "legalNotice"
  | "accessibility";

const DOCUMENT_SECTION_KEYS: Record<LegalDocumentKey, readonly string[]> = {
  privacyPolicy: ["s1", "s2", "s3", "s4", "s5"],
  terms: ["s1", "s2", "s3", "s4", "s5"],
  cookiePolicy: ["s1", "s2", "s3", "s4", "s5"],
  legalNotice: ["s1", "s2", "s3", "s4", "s5", "s6", "s7"],
  accessibility: ["s1", "s2", "s3", "s4", "s5", "s6"],
};

interface LegalDocumentPageProps {
  documentKey: LegalDocumentKey;
}

export function LegalDocumentPage({ documentKey }: LegalDocumentPageProps) {
  const t = useTranslations(`legal.${documentKey}`);
  const tPage = useTranslations("legalPage");
  const tCommon = useTranslations("common");

  return (
    <div className="legal-page">
      <FullBleedSection ariaLabelledby="legal-heading" className="section-hero-light border-b border-[#dde5f2]/80">
        <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-[0.18]" aria-hidden="true" />
        <OrbitWaveMotif variant="section" orbitAlign="left" />

        <PageContainer className="section-content min-w-0 pb-10 pt-24 lg:pb-12 lg:pt-28">
          <FadeIn immediate>
            <div className="legal-hero-block max-w-4xl">
              <p className="eyebrow-pill">{t("eyebrow")}</p>
              <h1 id="legal-heading" className="heading-section-compact mt-5 text-balance">
                {t("title")}
              </h1>
              <p className="body-lead mt-4 max-w-3xl">{t("description")}</p>
              <p className="legal-updated-badge mt-5">{t("lastUpdated")}</p>
            </div>
          </FadeIn>
        </PageContainer>
      </FullBleedSection>

      <FullBleedSection className="section-light py-12 lg:py-14">
        <PageContainer className="section-content">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0 space-y-4">
              {DOCUMENT_SECTION_KEYS[documentKey].map((key) => (
                <section key={key} className="legal-doc-card">
                  <h2 className="text-base font-semibold text-[#071225] lg:text-lg">
                    {t(`sections.${key}.title`)}
                  </h2>
                  <p className="mt-3 text-sm leading-[1.7] text-[#475569] lg:text-[15px]">
                    {t(`sections.${key}.body`)}
                  </p>
                </section>
              ))}

              <div className="legal-contact-band">
                <p className="text-sm leading-relaxed text-[#475569]">{t("contact")}</p>
                <p className="mt-4 text-sm text-[#64748b]">
                  {tPage("questionsBody")}{" "}
                  <Link href="/demo" className="legal-inline-link">
                    {tPage("demoLink")}
                  </Link>
                </p>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <FadeIn delay={0.06}>
                <div className="legal-sidebar">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#64748b]">
                    {tPage("sidebarTitle")}
                  </h2>
                  <ul className="mt-4 space-y-3.5">
                    <li className="legal-sidebar-item">
                      <FileText className="h-4 w-4 shrink-0 text-[#7c3aed]" aria-hidden="true" />
                      <div>
                        <p className="legal-sidebar-label">{tPage("productBrandLabel")}</p>
                        <p className="legal-sidebar-value">{tPage("productBrandValue")}</p>
                      </div>
                    </li>
                    <li className="legal-sidebar-item">
                      <Building2 className="h-4 w-4 shrink-0 text-[#7c3aed]" aria-hidden="true" />
                      <div>
                        <p className="legal-sidebar-label">{tPage("operatorLabel")}</p>
                        <p className="legal-sidebar-value">{tPage("operatorValue")}</p>
                      </div>
                    </li>
                    <li className="legal-sidebar-item">
                      <Hash className="h-4 w-4 shrink-0 text-[#7c3aed]" aria-hidden="true" />
                      <div>
                        <p className="legal-sidebar-label">{tPage("kvkLabel")}</p>
                        <p className="legal-sidebar-value">{tPage("kvkValue")}</p>
                      </div>
                    </li>
                    <li className="legal-sidebar-item">
                      <Mail className="h-4 w-4 shrink-0 text-[#7c3aed]" aria-hidden="true" />
                      <div>
                        <p className="legal-sidebar-label">{tPage("emailLabel")}</p>
                        <a href={`mailto:${tCommon("email")}`} className="legal-sidebar-value legal-inline-link">
                          {tCommon("email")}
                        </a>
                      </div>
                    </li>
                  </ul>
                  <p className="legal-sidebar-updated mt-5">{t("lastUpdated")}</p>
                </div>
              </FadeIn>
            </aside>
          </div>
        </PageContainer>
      </FullBleedSection>
    </div>
  );
}
