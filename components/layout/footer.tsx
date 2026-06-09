"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LogoMark } from "@/components/brand/logo";
import { OrbitWaveMotif } from "@/components/home/orbit-wave-motif";
import { PageContainer } from "@/components/layout/page-container";
import { Mail, MapPin } from "lucide-react";

const officeKeys = ["netherlands", "turkey", "digital"] as const;

type FooterHref =
  | "/platform"
  | "/platform/cbam"
  | "/solutions"
  | "/industries"
  | "/regulations"
  | "/regulations/cbam"
  | "/company"
  | "/resources"
  | "/demo"
  | "/legal/privacy-policy"
  | "/legal/terms"
  | "/legal/cookie-policy"
  | "/legal/legal-notice"
  | "/legal/accessibility";

type FooterLink = {
  href: FooterHref;
  label: string;
};

export function Footer() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const year = new Date().getFullYear();

  const linkGroups: { title: string; links: FooterLink[] }[] = [
    {
      title: t("columns.company"),
      links: [
        { href: "/company", label: t("companyLinks.about") },
        { href: "/resources", label: t("companyLinks.resources") },
        { href: "/demo", label: t("companyLinks.demo") },
      ],
    },
    {
      title: t("columns.platform"),
      links: [
        { href: "/platform", label: t("platformLinks.overview") },
        { href: "/platform/cbam", label: t("platformLinks.cbam") },
        { href: "/solutions", label: t("platformLinks.solutions") },
        { href: "/industries", label: t("platformLinks.industries") },
      ],
    },
    {
      title: t("columns.regulations"),
      links: [
        { href: "/regulations/cbam", label: t("regulationLinks.cbam") },
        { href: "/regulations", label: t("regulationLinks.ppwr") },
        { href: "/regulations", label: t("regulationLinks.eudr") },
        { href: "/regulations", label: t("regulationLinks.dpp") },
      ],
    },
    {
      title: t("columns.legal"),
      links: [
        { href: "/legal/privacy-policy", label: t("legalLinks.privacy") },
        { href: "/legal/terms", label: t("legalLinks.terms") },
        { href: "/legal/cookie-policy", label: t("legalLinks.cookies") },
        { href: "/legal/legal-notice", label: t("legalLinks.imprint") },
        { href: "/legal/accessibility", label: t("legalLinks.accessibility") },
      ],
    },
  ];

  return (
    <footer className="footer-dark relative isolate overflow-hidden" role="contentinfo">
      <OrbitWaveMotif variant="footer" showOrbit showWaves />
      <PageContainer className="section-content py-11 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-8">
          <div className="lg:col-span-5">
            <div className="footer-brand-block">
              <div className="footer-brand-intro">
                <Link href="/" className="footer-brand-logo" aria-label={tCommon("brandName")}>
                  <LogoMark size={64} className="h-16 w-16 object-contain sm:h-[72px] sm:w-[72px]" />
                </Link>
                <div className="footer-brand-copy">
                  <p className="footer-brand-name">{tCommon("brandName")}</p>
                  <p className="footer-tagline">{t("tagline")}</p>
                </div>
              </div>
              <p className="footer-body mt-4 text-[13px] leading-relaxed sm:text-sm">{t("brandDescription")}</p>
              <a href={`mailto:${tCommon("email")}`} className="footer-email-link mt-4">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {tCommon("email")}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-5 gap-y-7 min-[480px]:grid-cols-2 lg:col-span-7 lg:grid-cols-5 lg:gap-x-3 lg:gap-y-0">
            {linkGroups.map((group) => (
              <div key={group.title} className="min-w-0">
                <h3 className="footer-column-title">{group.title}</h3>
                <ul className="list-none space-y-1.5">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.href}-${link.label}`}>
                      <Link href={link.href} className="footer-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="min-w-0 min-[480px]:col-span-2 lg:col-span-1">
              <h3 className="footer-column-title">{t("offices.title")}</h3>
              <ul className="list-none space-y-3">
                {officeKeys.map((office) => (
                  <li key={office} className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#A78BFA]/80" aria-hidden="true" />
                    <div>
                      <p className="text-[12px] font-medium leading-snug text-[#E2E8F0]">
                        {t(`offices.${office}.label`)}
                      </p>
                      <p className="footer-body mt-0.5 whitespace-pre-line text-[12px] leading-snug">
                        {t(`offices.${office}.address`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-legal-panel mt-8 lg:mt-10">
          <p className="text-sm leading-relaxed text-[#94A3B8]">{t("legalNote")}</p>
          <p className="mt-2 text-xs text-[#64748B]">{t("copyright", { year })}</p>
        </div>
      </PageContainer>
    </footer>
  );
}
