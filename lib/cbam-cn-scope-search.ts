export type CbamCnCodeEntry = {
  code: string;
  normalizedCode: string;
  descriptionEn: string;
  sector: string;
  status: "included";
  notes: string;
};

export type CbamCnSearchMatch = {
  entry: CbamCnCodeEntry;
  matchType: "exact" | "prefix" | "description" | "sector";
};

export function normalizeCnInput(input: string): string {
  return input.replace(/[\s.]/g, "").trim();
}

export function searchCbamCnCodes(
  entries: CbamCnCodeEntry[],
  rawQuery: string,
  maxResults = 12
): { exact: CbamCnSearchMatch[]; partial: CbamCnSearchMatch[] } {
  const query = normalizeCnInput(rawQuery).toLowerCase();
  const queryText = rawQuery.trim().toLowerCase();

  if (!query && !queryText) {
    return { exact: [], partial: [] };
  }

  const exact: CbamCnSearchMatch[] = [];
  const partial: CbamCnSearchMatch[] = [];
  const seen = new Set<string>();

  const push = (list: CbamCnSearchMatch[], item: CbamCnSearchMatch) => {
    if (seen.has(item.entry.normalizedCode)) return;
    seen.add(item.entry.normalizedCode);
    list.push(item);
  };

  if (query) {
    for (const entry of entries) {
      if (entry.normalizedCode === query) {
        push(exact, { entry, matchType: "exact" });
      }
    }

    if (exact.length === 0) {
      for (const entry of entries) {
        if (
          entry.normalizedCode.startsWith(query) ||
          query.startsWith(entry.normalizedCode)
        ) {
          push(partial, { entry, matchType: "prefix" });
        }
      }
    } else {
      for (const entry of entries) {
        if (entry.normalizedCode.startsWith(query) && entry.normalizedCode !== query) {
          push(partial, { entry, matchType: "prefix" });
        }
      }
    }
  }

  if (queryText.length >= 3) {
    for (const entry of entries) {
      if (entry.descriptionEn.toLowerCase().includes(queryText)) {
        push(partial, { entry, matchType: "description" });
      } else if (entry.sector.toLowerCase().includes(queryText)) {
        push(partial, { entry, matchType: "sector" });
      }
    }
  }

  exact.sort((a, b) => a.entry.normalizedCode.localeCompare(b.entry.normalizedCode));
  partial.sort((a, b) => {
    const typeOrder: Record<CbamCnSearchMatch["matchType"], number> = {
      exact: -1,
      prefix: 0,
      sector: 1,
      description: 2,
    };
    const diff = typeOrder[a.matchType] - typeOrder[b.matchType];
    if (diff !== 0) return diff;
    return a.entry.normalizedCode.localeCompare(b.entry.normalizedCode);
  });

  return {
    exact: exact.slice(0, maxResults),
    partial: partial.slice(0, maxResults),
  };
}

export function formatCnCodeDisplay(code: string): string {
  const n = normalizeCnInput(code).padStart(8, "0");
  return `${n.slice(0, 4)} ${n.slice(4, 6)} ${n.slice(6, 8)}`;
}
