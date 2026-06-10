"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Building2, FileText, Hash, Mail, Scale } from "lucide-react";
import { FullBleedSection, PageContainer } from "@/components/layout/page-container";
import { OrbitWaveMotif, SectionWaveEdge } from "@/components/home/orbit-wave-motif";
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
  const tFooter = useTranslations("footer");
  const sections = DOCUMENT_SECTION_KEYS[documentKey];

  return (
    <div className="legal-page">
      <FullBleedSection ariaLabelledby="legal-heading" className="section-legal-hero page-hero-top">
        <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-[0.24]" aria-hidden="true" />
        <OrbitWaveMotif variant="legal" orbitAlign="right" intensity="subtle" showWaves={false} />

        <PageContainer className="section-content min-w-0 page-hero-bottom">
          <FadeIn immediate>
            <div className="legal-hero-block max-w-4xl">
              <div className="legal-hero-icon" aria-hidden="true">
                <Scale className="h-5 w-5 text-[#7c3aed]" />
              </div>
              <p className="eyebrow-pill mt-4">{t("eyebrow")}</p>
              <h1 id="legal-heading" className="heading-section-compact mt-4 text-balance">
                {t("title")}
              </h1>
              <p className="body-lead mt-4 max-w-3xl">{t("description")}</p>
              <p className="legal-updated-badge mt-5">{t("lastUpdated")}</p>
            </div>
          </FadeIn>
        </PageContainer>
        <SectionWaveEdge className="opacity-40" />
      </FullBleedSection>

      <FullBleedSection className="section-light legal-section-body">
        <PageContainer className="section-content page-section-y-tight legal-section-body">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,260px)] lg:gap-8">
            <aside className="order-first min-w-0 lg:order-2 lg:sticky lg:top-28 lg:self-start">
              <FadeIn delay={0.06}>
                <div className="legal-sidebar">
                  <h2 className="legal-sidebar-title">{tPage("sidebarTitle")}</h2>
                  <ul className="mt-4 space-y-3.5">
                    <li className="legal-sidebar-item">
                      <FileText className="h-4 w-4 shrink-0 text-[#7c3aed]" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="legal-sidebar-label">{tPage("productBrandLabel")}</p>
                        <p className="legal-sidebar-value copy-safe">{tPage("productBrandValue")}</p>
                      </div>
                    </li>
                    <li className="legal-sidebar-item">
                      <Building2 className="h-4 w-4 shrink-0 text-[#7c3aed]" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="legal-sidebar-label">{tPage("operatorLabel")}</p>
                        <p className="legal-sidebar-value copy-safe">{tPage("operatorValue")}</p>
                      </div>
                    </li>
                    <li className="legal-sidebar-item">
                      <Hash className="h-4 w-4 shrink-0 text-[#7c3aed]" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="legal-sidebar-label">{tPage("kvkLabel")}</p>
                        <p className="legal-sidebar-value">{tPage("kvkValue")}</p>
                      </div>
                    </li>
                    <li className="legal-sidebar-item">
                      <Mail className="h-4 w-4 shrink-0 text-[#7c3aed]" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="legal-sidebar-label">{tPage("emailLabel")}</p>
                        <a href={`mailto:${tCommon("email")}`} className="legal-sidebar-value legal-inline-link copy-safe">
                          {tCommon("email")}
                        </a>
                        <p className="mt-1.5 text-xs leading-relaxed text-[#64748b]">{tFooter("contactNote")}</p>
                      </div>
                    </li>
                  </ul>

                  <div className="legal-sidebar-toc mt-6 border-t border-[#dde5f2]/90 pt-5">
                    <p className="legal-sidebar-label">{tPage("tocLabel")}</p>
                    <ol className="legal-toc-list mt-3 list-none">
                      {sections.map((key, index) => (
                        <li key={key}>
                          <a href={`#legal-section-${key}`} className="legal-toc-link copy-safe">
                            <span className="legal-toc-index">{String(index + 1).padStart(2, "0")}</span>
                            {t(`sections.${key}.title`)}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <p className="legal-sidebar-updated mt-5">{t("lastUpdated")}</p>
                </div>
              </FadeIn>
            </aside>

            <div className="order-last min-w-0 space-y-3 lg:order-1">
              {sections.map((key, index) => (
                <section key={key} id={`legal-section-${key}`} className="legal-doc-card scroll-mt-28">
                  <div className="legal-doc-card-head">
                    <span className="legal-section-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="legal-doc-card-title">{t(`sections.${key}.title`)}</h2>
                  </div>
                  <p className="legal-doc-card-body">{t(`sections.${key}.body`)}</p>
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
                <p className="mt-3 text-sm text-[#64748b]">
                  {tPage("emailLabel")}:{" "}
                  <a href={`mailto:${tCommon("email")}`} className="legal-inline-link">
                    {tCommon("email")}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </PageContainer>
        <SectionWaveEdge />
      </FullBleedSection>
    </div>
  );
}
