#!/usr/bin/env node
/**
 * Builds public/data/cbam-cn-codes.json from EU Combined Nomenclature 2024
 * filtered by Regulation (EU) 2023/956 Annex I CBAM scope rules.
 *
 * Source: scripts/cn2024a.xlsx (UK Trade Info CN2024 export)
 * Run: node scripts/build-cbam-cn-codes.mjs
 */
import fs from "node:fs";
import path from "node:path";
import XLSX from "xlsx";

const ROOT = process.cwd();
const XLSX_PATH = path.join(ROOT, "scripts/cn2024a.xlsx");
const OUT_PATH = path.join(ROOT, "public/data/cbam-cn-codes.json");

function padCn8(value) {
  const digits = String(value).replace(/\D/g, "");
  return digits.padStart(8, "0").slice(-8);
}

function normalizeCode(value) {
  return String(value).replace(/[\s.]/g, "").trim();
}

/** Annex I sector assignment */
function getSector(code) {
  const c = normalizeCode(code);
  if (
    c.startsWith("2507") ||
    c.startsWith("2523")
  ) {
    return "Cement";
  }
  if (c.startsWith("2716")) return "Electricity";
  if (
    c.startsWith("2808") ||
    c.startsWith("2814") ||
    c.startsWith("283421") ||
    c.startsWith("3102") ||
    (c.startsWith("3105") && c !== "31056000")
  ) {
    return "Fertilisers";
  }
  if (c.startsWith("280410")) return "Hydrogen";
  if (c.startsWith("72") || c.startsWith("73") || c === "26011200") return "Iron & Steel";
  if (
    c.startsWith("7601") ||
    c.startsWith("7603") ||
    c.startsWith("7604") ||
    c.startsWith("7605") ||
    c.startsWith("7606") ||
    c.startsWith("7607") ||
    c.startsWith("7608") ||
    c.startsWith("7609") ||
    c.startsWith("7610") ||
    c.startsWith("7611") ||
    c.startsWith("7612") ||
    c.startsWith("7613") ||
    c.startsWith("7614") ||
    c.startsWith("7616")
  ) {
    return "Aluminium";
  }
  return null;
}

function isExcluded(code) {
  const c = normalizeCode(code);

  // Ferro-alloys excluded under 7202 (Annex I exceptions)
  const ferroExcluded7202 = [
    "72022100",
    "72022900",
    "72023000",
    "72024100",
    "72024900",
    "72025000",
    "72026000",
    "72027000",
    "72028000",
    "72029100",
    "72029200",
    "72029300",
    "72029910",
    "72029930",
    "72029980",
  ];
  if (ferroExcluded7202.some((p) => c.startsWith(p.slice(0, 6)) || c === p)) {
    // Match by prefix for subheadings
  }

  if (c.startsWith("72022")) return true; // Ferro-silicon
  if (c.startsWith("720230")) return true;
  if (c.startsWith("720250")) return true;
  if (c.startsWith("720270")) return true;
  if (c.startsWith("720280")) return true;
  if (c.startsWith("720291")) return true;
  if (c.startsWith("720292")) return true;
  if (c.startsWith("720293")) return true;
  if (c.startsWith("72029910")) return true;
  if (c.startsWith("72029930")) return true;
  if (c.startsWith("72029980")) return true;

  // Ferrous waste and scrap
  if (c.startsWith("7204")) return true;

  // Fertiliser exception
  if (c.startsWith("310560")) return true;

  // Aluminium scrap / household articles excluded from CBAM guidance
  if (c.startsWith("760200")) return true;
  if (c.startsWith("7615")) return true;

  // Chapter 73: only specific headings in Annex I
  if (c.startsWith("73")) {
    const heading = c.slice(0, 4);
    const included73 = [
      "7301",
      "7302",
      "7303",
      "7304",
      "7305",
      "7306",
      "7307",
      "7308",
      "7309",
      "7310",
      "7311",
      "7318",
      "7326",
    ];
    if (!included73.includes(heading)) return true;
  }

  // Chapter 72: exclude if not matching included logic - 72 is mostly included except above
  // 7202 partially excluded - handled above; other 7202 subheadings like 72021 (FeMn) included

  return false;
}

function isIncluded(code) {
  const sector = getSector(code);
  if (!sector) return false;
  if (isExcluded(code)) return false;

  // Chapter 72 - broad inclusion minus exclusions
  if (code.startsWith("72")) return true;

  return true;
}

if (!fs.existsSync(XLSX_PATH)) {
  console.error(`Missing ${XLSX_PATH}. Download CN2024 XLSX first.`);
  process.exit(1);
}

const wb = XLSX.readFile(XLSX_PATH);
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });

const entries = [];
const seen = new Set();

for (let i = 1; i < rows.length; i++) {
  const [cn8, description] = rows[i];
  if (!cn8 || !description) continue;

  const code = padCn8(cn8);
  const normalizedCode = normalizeCode(code);
  if (seen.has(normalizedCode)) continue;

  if (!isIncluded(normalizedCode)) continue;

  const sector = getSector(normalizedCode);
  if (!sector) continue;

  seen.add(normalizedCode);
  entries.push({
    code,
    normalizedCode,
    descriptionEn: String(description).trim(),
    sector,
    status: "included",
    notes: "",
  });
}

entries.sort((a, b) => a.normalizedCode.localeCompare(b.normalizedCode));

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, JSON.stringify(entries, null, 2) + "\n");

const sectorBreakdown = entries.reduce((acc, e) => {
  acc[e.sector] = (acc[e.sector] || 0) + 1;
  return acc;
}, {});

console.log(`Wrote ${entries.length} CN codes to ${OUT_PATH}`);
console.log("Sector breakdown:", sectorBreakdown);

// Spot-check test codes
const tests = ["25231000", "28041000", "72162100", "76012080", "99999999"];
for (const t of tests) {
  const hit = entries.find((e) => e.normalizedCode === t);
  console.log(`  ${t}: ${hit ? hit.descriptionEn.slice(0, 60) + " / " + hit.sector : "NOT FOUND"}`);
}
