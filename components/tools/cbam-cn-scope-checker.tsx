"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { AlertCircle, CheckCircle2, Search, XCircle } from "lucide-react";
import {
  formatCnCodeDisplay,
  normalizeCnInput,
  searchCbamCnCodes,
  type CbamCnCodeEntry,
} from "@/lib/cbam-cn-scope-search";
import { cn } from "@/lib/utils";

const EXAMPLE_KEYS = ["item1", "item2", "item3", "item4"] as const;

interface CbamCnScopeCheckerProps {
  className?: string;
}

export function CbamCnScopeChecker({ className }: CbamCnScopeCheckerProps) {
  const t = useTranslations("resourcesPage.cnScopeChecker");
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<CbamCnCodeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/data/cbam-cn-codes.json");
        if (!res.ok) throw new Error("Failed to load CN codes");
        const data = (await res.json()) as CbamCnCodeEntry[];
        if (!cancelled) {
          setEntries(data);
          setLoadError(false);
        }
      } catch {
        if (!cancelled) setLoadError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const normalizedQuery = normalizeCnInput(query);
  const trimmedQuery = query.trim();
  const hasQuery = normalizedQuery.length > 0 || trimmedQuery.length >= 3;
  const isShortNumericCode =
    normalizedQuery.length > 0 && /^\d+$/.test(normalizedQuery) && normalizedQuery.length < 8;
  const isKeywordQuery = trimmedQuery.length >= 3 && !/^\d+$/.test(normalizedQuery);

  const { exact, partial } = useMemo(
    () => (hasQuery && entries.length ? searchCbamCnCodes(entries, query) : { exact: [], partial: [] }),
    [entries, hasQuery, query]
  );

  const allMatches = useMemo(() => {
    if (isShortNumericCode && exact.length === 0) {
      return [];
    }

    const combined = [
      ...exact,
      ...partial.filter((p) => !exact.some((e) => e.entry.normalizedCode === p.entry.normalizedCode)),
    ];
    return combined;
  }, [exact, partial, isShortNumericCode]);

  const showInvalidCode =
    hasQuery && !loading && !loadError && isShortNumericCode && exact.length === 0;
  const showNotFound =
    hasQuery && !loading && !loadError && !showInvalidCode && allMatches.length === 0;

  const runSearch = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const exampleValues = useMemo(() => EXAMPLE_KEYS.map((key) => t(`examples.${key}`)), [t]);

  return (
    <div className={cn("cn-scope-checker", className)}>
      <div className="cn-scope-checker-panel">
        <div className="cn-scope-checker-search-wrap">
          <label htmlFor="cn-scope-search" className="sr-only">
            {t("searchLabel")}
          </label>
          <Search className="cn-scope-checker-search-icon" aria-hidden="true" />
          <input
            id="cn-scope-search"
            type="search"
            inputMode="search"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="cn-scope-checker-search-input"
          />
        </div>

        <div className="cn-scope-checker-examples" role="group" aria-label={t("examplesAriaLabel")}>
          {EXAMPLE_KEYS.map((key, index) => (
            <button
              key={key}
              type="button"
              className="cn-scope-checker-example-chip"
              onClick={() => runSearch(exampleValues[index])}
            >
              {exampleValues[index]}
            </button>
          ))}
        </div>

        {loading ? <p className="cn-scope-checker-status">{t("loading")}</p> : null}

        {loadError ? (
          <div className="cn-scope-checker-alert cn-scope-checker-alert-error" role="alert">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <p>{t("loadError")}</p>
          </div>
        ) : null}

        {showInvalidCode ? (
          <div className="cn-scope-checker-result cn-scope-checker-result-not-found" role="alert">
            <div className="cn-scope-checker-result-head">
              <AlertCircle className="h-5 w-5 shrink-0 text-[#b45309]" aria-hidden="true" />
              <div className="min-w-0">
                <p className="cn-scope-checker-result-title">{t("invalidCodeTitle")}</p>
                <p className="cn-scope-checker-result-subtitle">{t("invalidCodeMessage")}</p>
              </div>
            </div>
            {normalizedQuery ? (
              <p className="cn-scope-checker-query-display">
                {t("searchedCode")}:{" "}
                <span className="font-mono">{normalizedQuery}</span>
              </p>
            ) : null}
          </div>
        ) : null}

        {showNotFound ? (
          <div className="cn-scope-checker-result cn-scope-checker-result-not-found">
            <div className="cn-scope-checker-result-head">
              <XCircle className="h-5 w-5 shrink-0 text-[#64748b]" aria-hidden="true" />
              <div className="min-w-0">
                <p className="cn-scope-checker-result-title">{t("notFoundTitle")}</p>
                <p className="cn-scope-checker-result-subtitle">{t("notFoundSubtitle")}</p>
              </div>
            </div>
            {normalizedQuery ? (
              <p className="cn-scope-checker-query-display">
                {t("searchedCode")}:{" "}
                <span className="font-mono">{formatCnCodeDisplay(normalizedQuery)}</span>
              </p>
            ) : null}
            <p className="cn-scope-checker-next-step">{t("nextStep.notFound")}</p>
            {isKeywordQuery ? (
              <p className="cn-scope-checker-match-note">{t("numericCodeRecommended")}</p>
            ) : null}
          </div>
        ) : null}

        {allMatches.length > 0 ? (
          <ul className="cn-scope-checker-results list-none">
            {allMatches.map(({ entry, matchType }, index) => (
              <li key={entry.normalizedCode}>
                <article
                  className={cn(
                    "cn-scope-checker-result",
                    matchType === "exact" && "cn-scope-checker-result-exact"
                  )}
                >
                  <div className="cn-scope-checker-result-head">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#059669]" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p className="cn-scope-checker-result-title">{t("foundTitle")}</p>
                      <p className="cn-scope-checker-result-subtitle">{t("foundSubtitle")}</p>
                    </div>
                    <div className="cn-scope-checker-badges">
                      <span className="cn-scope-checker-sector-badge">{entry.sector}</span>
                      <span className="cn-scope-checker-status-badge">{t("status.included")}</span>
                    </div>
                  </div>

                  <dl className="cn-scope-checker-meta">
                    <div>
                      <dt>{t("fields.code")}</dt>
                      <dd className="font-mono">{formatCnCodeDisplay(entry.code)}</dd>
                    </div>
                    <div>
                      <dt>{t("fields.sector")}</dt>
                      <dd>{entry.sector}</dd>
                    </div>
                    <div className="cn-scope-checker-meta-wide">
                      <dt>{t("fields.description")}</dt>
                      <dd>{entry.descriptionEn}</dd>
                    </div>
                    <div>
                      <dt>{t("fields.scopeStatus")}</dt>
                      <dd>{t("status.appearsInScope")}</dd>
                    </div>
                  </dl>

                  <p className="cn-scope-checker-next-step">{t("nextStep.included")}</p>

                  {matchType !== "exact" && index === 0 && exact.length === 0 ? (
                    <p className="cn-scope-checker-match-note">{t("partialMatchNote")}</p>
                  ) : null}
                </article>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="cn-scope-checker-disclaimer" role="note">
          <AlertCircle className="h-4 w-4 shrink-0 text-[#7c3aed]" aria-hidden="true" />
          <p>{t("disclaimer")}</p>
        </div>
      </div>
    </div>
  );
}
