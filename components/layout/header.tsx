"use client";

import { useState, useEffect, useRef, useCallback, type ComponentType } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { HeaderLogo } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";
import {
  PlatformDropdownPanel,
  SolutionsDropdownPanel,
  IndustriesDropdownPanel,
  ResourcesDropdownPanel,
  CompanyDropdownPanel,
} from "@/components/layout/nav/nav-dropdown-panels";
import { cn } from "@/lib/utils";
import { locales, type Locale } from "@/i18n/routing";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  tr: "TR",
  nl: "NL",
};

type NavDropdownKey = "platform" | "solutions" | "industries" | "resources" | "company";

const NAV_HREFS: Record<
  NavDropdownKey,
  "/platform" | "/solutions" | "/industries" | "/resources" | "/company"
> = {
  platform: "/platform",
  solutions: "/solutions",
  industries: "/industries",
  resources: "/resources",
  company: "/company",
};

const NAV_DROPDOWNS: {
  key: NavDropdownKey;
  labelKey: NavDropdownKey;
  activePaths: string[];
  align?: "center" | "start";
}[] = [
  { key: "company", labelKey: "company", activePaths: ["/company", "/contact"] },
  { key: "platform", labelKey: "platform", activePaths: ["/platform"] },
  { key: "solutions", labelKey: "solutions", activePaths: ["/solutions"] },
  { key: "industries", labelKey: "industries", activePaths: ["/industries"] },
  { key: "resources", labelKey: "resources", activePaths: ["/resources", "/regulations"] },
];

const DROPDOWN_PANELS: Record<
  NavDropdownKey,
  ComponentType<{ onNavigate?: () => void; className?: string }>
> = {
  platform: PlatformDropdownPanel,
  solutions: SolutionsDropdownPanel,
  industries: IndustriesDropdownPanel,
  resources: ResourcesDropdownPanel,
  company: CompanyDropdownPanel,
};

export function Header() {
  const t = useTranslations("nav");
  const tLang = useTranslations("language");
  const tA11y = useTranslations("a11y");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<NavDropdownKey | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<NavDropdownKey | null>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
  };

  const isNavActive = (paths: string[]) =>
    paths.some((href) => (href === "/" ? pathname === "/" : pathname.startsWith(href)));

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpenDropdown(null), 120);
  }, [clearCloseTimer]);

  const openNavDropdown = (key: NavDropdownKey) => {
    clearCloseTimer();
    setOpenDropdown(key);
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  const toggleMobileSection = (key: NavDropdownKey) => {
    setMobileExpanded((prev) => (prev === key ? null : key));
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-nav-scrolled" : "glass-nav"
      )}
    >
      <PageContainer className="flex h-[4.75rem] items-center justify-between gap-3 sm:h-20 md:gap-4 xl:gap-6">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center rounded-md focus-visible:ring-offset-4"
          aria-label={t("brandAriaLabel")}
        >
          <HeaderLogo priority wordmark={t("brandName")} />
        </Link>

        <nav
          ref={navRef}
          className="hidden flex-1 items-center justify-center gap-0.5 xl:flex"
          aria-label="Main navigation"
          onMouseLeave={scheduleClose}
        >
          {NAV_DROPDOWNS.map(({ key, labelKey, activePaths }) => {
            const Panel = DROPDOWN_PANELS[key];
            const isOpen = openDropdown === key;
            const isActive = isNavActive(activePaths);

            return (
              <div
                key={key}
                className="relative flex items-center"
                onMouseEnter={() => openNavDropdown(key)}
              >
                <Link
                  href={NAV_HREFS[key]}
                  className={cn(
                    "nav-link rounded-r-none pr-1",
                    (isActive || isOpen) && "nav-link-active"
                  )}
                >
                  {t(labelKey)}
                </Link>
                <button
                  type="button"
                  className={cn(
                    "nav-link inline-flex items-center rounded-l-none pl-0.5",
                    (isActive || isOpen) && "nav-link-active",
                    isOpen && "nav-trigger-open"
                  )}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  aria-label={t(labelKey)}
                  onClick={() => setOpenDropdown(isOpen ? null : key)}
                >
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 opacity-60 transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div
                    className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 pt-1"
                    onMouseEnter={clearCloseTimer}
                  >
                    <Panel onNavigate={() => setOpenDropdown(null)} />
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-[15px] font-medium text-[#64748b] transition-colors hover:border-[#dde5f2] hover:bg-white/85 hover:text-[#071225]"
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              aria-label={tA11y("languageMenu")}
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              {localeLabels[locale]}
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  langOpen && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
            {langOpen && (
              <ul
                role="listbox"
                className="absolute right-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden rounded-xl border border-[#dde5f2] bg-white py-1 shadow-card"
              >
                {locales.map((loc) => (
                  <li key={loc} role="option" aria-selected={loc === locale}>
                    <button
                      type="button"
                      onClick={() => switchLocale(loc)}
                      className={cn(
                        "flex w-full px-4 py-2.5 text-sm transition-colors hover:bg-[#f3f6fc]",
                        loc === locale
                          ? "font-semibold text-[#7c3aed]"
                          : "text-[#64748b]"
                      )}
                    >
                      {tLang(loc)}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <a
            href="https://app.arvenza.net"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "ghost", size: "default" }))}
          >
            {t("login")}
          </a>
          <Link
            href="/demo"
            className={cn(buttonVariants({ variant: "default", size: "default" }))}
          >
            {t("bookDemo")}
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2.5 text-[#64748b] transition-colors hover:bg-white/85 hover:text-[#071225] lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? tA11y("closeMenu") : tA11y("openMenu")}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </PageContainer>

      {mobileOpen && (
        <div
          className="fixed inset-0 top-[4.75rem] z-40 overflow-y-auto border-t border-[#dde5f2] bg-white/95 backdrop-blur-xl sm:top-20 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="flex flex-col px-4 py-4">
            {NAV_DROPDOWNS.map(({ key, labelKey, activePaths }) => {
              const Panel = DROPDOWN_PANELS[key];
              const isExpanded = mobileExpanded === key;
              const isActive = isNavActive(activePaths);

              return (
                <div key={key} className="border-b border-[#dde5f2]/60">
                  <div className="flex items-center justify-between py-4">
                    <Link
                      href={NAV_HREFS[key]}
                      onClick={closeMobile}
                      className={cn(
                        "text-lg font-medium transition-colors",
                        isActive ? "text-[#7c3aed]" : "text-[#071225]"
                      )}
                    >
                      {t(labelKey)}
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleMobileSection(key)}
                      className="rounded-lg p-2 text-[#64748b]"
                      aria-expanded={isExpanded}
                      aria-label={t(labelKey)}
                    >
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="pb-4">
                      <Panel
                        onNavigate={closeMobile}
                        className="!w-full !max-w-none shadow-none"
                      />
                    </div>
                  )}
                </div>
              );
            })}

            <div className="mt-6 flex flex-wrap gap-2 px-2">
              {locales.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => {
                    switchLocale(loc);
                    closeMobile();
                  }}
                  className={cn(
                    "rounded-lg border px-4 py-2 text-sm font-semibold transition-colors",
                    loc === locale
                      ? "border-[#7c3aed]/30 bg-[#7c3aed]/5 text-[#7c3aed]"
                      : "border-[#dde5f2] text-[#64748b]"
                  )}
                >
                  {localeLabels[loc]}
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 px-2 pb-8">
              <a
                href="https://app.arvenza.net"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
              >
                {t("login")}
              </a>
              <Link
                href="/demo"
                onClick={closeMobile}
                className={cn(buttonVariants({ variant: "default", size: "lg" }))}
              >
                {t("bookDemo")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
