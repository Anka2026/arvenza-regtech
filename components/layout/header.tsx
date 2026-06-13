"use client";

import { useState, useEffect, useRef, useCallback, type ComponentType } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { MobileNavDrawer } from "@/components/layout/nav/mobile-nav-drawer";
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
  const [mounted, setMounted] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, closeMobile]);

  useEffect(() => {
    setOpenDropdown(null);
    setMobileExpanded(null);
    setMobileOpen(false);
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

  const toggleMobileSection = (key: NavDropdownKey) => {
    setMobileExpanded((prev) => (prev === key ? null : key));
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 transition-all duration-300",
        mobileOpen ? "z-[210]" : "z-50",
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
          className="rounded-lg p-2.5 text-[#64748b] transition-colors hover:bg-white/85 hover:text-[#071225] xl:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={mobileOpen ? tA11y("closeMenu") : tA11y("openMenu")}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </PageContainer>

      {mounted ? (
        <MobileNavDrawer
          open={mobileOpen}
          onClose={closeMobile}
          expanded={mobileExpanded}
          onToggleExpanded={toggleMobileSection}
          onSwitchLocale={switchLocale}
        />
      ) : null}
    </header>
  );
}
