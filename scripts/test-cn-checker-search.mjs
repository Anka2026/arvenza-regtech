#!/usr/bin/env node
/**
 * Smoke-test CBAM CN scope search expectations.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const data = JSON.parse(
  fs.readFileSync(path.join(ROOT, "public/data/cbam-cn-codes.json"), "utf8")
);

function normalizeCnInput(input) {
  return input.replace(/[\s.]/g, "").trim();
}

function searchCbamCnCodes(entries, rawQuery, maxResults = 12) {
  const query = normalizeCnInput(rawQuery).toLowerCase();
  const queryText = rawQuery.trim().toLowerCase();

  if (!query && !queryText) {
    return { exact: [], partial: [] };
  }

  const exact = [];
  const partial = [];
  const seen = new Set();

  const push = (list, item) => {
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

  return {
    exact: exact.slice(0, maxResults),
    partial: partial.slice(0, maxResults),
  };
}

function classify(input) {
  const normalized = normalizeCnInput(input);
  const isShortNumeric = normalized.length > 0 && /^\d+$/.test(normalized) && normalized.length < 8;
  const { exact, partial } = searchCbamCnCodes(data, input);
  if (isShortNumeric && exact.length === 0) return "invalid";
  if (exact.length > 0) return `in-scope:${exact[0].entry.sector}`;
  if (partial.length > 0) return `partial:${partial[0].entry.sector}`;
  return "not-found";
}

const cases = [
  ["72162100", "in-scope"],
  ["25231000", "in-scope:Cement"],
  ["28041000", "in-scope"],
  ["99999999", "not-found"],
  ["874", "invalid"],
  ["cement", "partial:Cement"],
  ["hydrogen", "partial"],
  ["steel", "partial"],
  ["aluminium", "partial"],
];

let failed = 0;
for (const [input, expectedPrefix] of cases) {
  const result = classify(input);
  const ok = result === expectedPrefix || result.startsWith(expectedPrefix);
  console.log(`${ok ? "✓" : "✗"} ${input} → ${result} (expected ${expectedPrefix})`);
  if (!ok) failed++;
}

process.exit(failed ? 1 : 0);
