"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslations, useLocale } from "next-intl";
import { ChevronDown, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { PlatformDropdownPanel } from "@/components/layout/nav/nav-dropdown-panels";
import { SolutionsDropdownPanel } from "@/components/layout/nav/nav-dropdown-panels";
import { IndustriesDropdownPanel } from "@/components/layout/nav/nav-dropdown-panels";
import { ResourcesDropdownPanel } from "@/components/layout/nav/nav-dropdown-panels";
import { CompanyDropdownPanel } from "@/components/layout/nav/nav-dropdown-panels";
import { cn } from "@/lib/utils";
import { locales, type Locale } from "@/i18n/routing";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  tr: "TR",
  nl: "NL",
};

type NavDropdownKey = "platform" | "solutions" | "industries" | "resources" | "company";

const TOP_LINKS: {
  key: NavDropdownKey | "regulations";
  labelKey: string;
  href: "/company" | "/platform" | "/solutions" | "/industries" | "/resources" | "/regulations";
  hasPanel?: boolean;
}[] = [
  { key: "company", labelKey: "company", href: "/company", hasPanel: true },
  { key: "platform", labelKey: "platform", href: "/platform", hasPanel: true },
  { key: "solutions", labelKey: "solutions", href: "/solutions", hasPanel: true },
  { key: "industries", labelKey: "industries", href: "/industries", hasPanel: true },
  { key: "resources", labelKey: "resources", href: "/resources", hasPanel: true },
  { key: "regulations", labelKey: "regulations", href: "/regulations" },
];

const PANELS: Record<NavDropdownKey, typeof PlatformDropdownPanel> = {
  company: CompanyDropdownPanel,
  platform: PlatformDropdownPanel,
  solutions: SolutionsDropdownPanel,
  industries: IndustriesDropdownPanel,
  resources: ResourcesDropdownPanel,
};

interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
  expanded: NavDropdownKey | null;
  onToggleExpanded: (key: NavDropdownKey) => void;
  onSwitchLocale: (locale: Locale) => void;
}

export function MobileNavDrawer({
  open,
  onClose,
  expanded,
  onToggleExpanded,
  onSwitchLocale,
}: MobileNavDrawerProps) {
  const t = useTranslations("nav");
  const tLang = useTranslations("language");
  const tA11y = useTranslations("a11y");
  const locale = useLocale() as Locale;
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    drawerRef.current?.focus();
    return () => previous?.focus();
  }, [open]);

  if (typeof document === "undefined" || !open) return null;

  return createPortal(
    <div className="mobile-nav-root" role="presentation">
      <button
        type="button"
        className="mobile-nav-backdrop"
        onClick={onClose}
        aria-label={tA11y("closeMenu")}
      />
      <div
        ref={drawerRef}
        id="mobile-nav-drawer"
        tabIndex={-1}
        className="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={tA11y("mobileNavDialog")}
      >
        <div className="mobile-nav-drawer-header">
          <span className="text-sm font-semibold text-[#071225]">{t("brandName")}</span>
          <button
            type="button"
            onClick={onClose}
            className="mobile-nav-close"
            aria-label={tA11y("closeMenu")}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="mobile-nav-body" aria-label={tA11y("mobileNavMain")}>
          {TOP_LINKS.map(({ key, labelKey, href, hasPanel }) => {
            const isExpandable = hasPanel && key !== "regulations";
            const isExpanded = isExpandable && expanded === key;
            const Panel = isExpandable ? PANELS[key as NavDropdownKey] : null;

            return (
              <div key={key} className="mobile-nav-section">
                <div className="mobile-nav-row">
                  <Link href={href} onClick={onClose} className="mobile-nav-link">
                    {t(labelKey as "company")}
                  </Link>
                  {isExpandable ? (
                    <button
                      type="button"
                      onClick={() => onToggleExpanded(key as NavDropdownKey)}
                      className="mobile-nav-expand"
                      aria-expanded={isExpanded}
                      aria-controls={`mobile-nav-panel-${key}`}
                      aria-label={t(labelKey as "company")}
                    >
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  ) : null}
                </div>
                {isExpanded && Panel ? (
                  <div id={`mobile-nav-panel-${key}`} className="mobile-nav-panel">
                    <Panel onNavigate={onClose} className="!w-full !max-w-none shadow-none" />
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="mobile-nav-footer">
          <div className="flex flex-wrap gap-2">
            {locales.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  onSwitchLocale(loc);
                  onClose();
                }}
                className={cn(
                  "mobile-nav-locale",
                  loc === locale && "mobile-nav-locale-active"
                )}
              >
                {localeLabels[loc]} · {tLang(loc)}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href="https://app.arvenza.net"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full")}
            >
              {t("login")}
            </a>
            <Link
              href="/demo"
              onClick={onClose}
              className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full")}
            >
              {t("bookDemo")}
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
