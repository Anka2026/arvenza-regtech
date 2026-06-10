#!/usr/bin/env node
/**
 * Verify all product screenshot paths resolve to files under public/
 * Usage: node scripts/verify-screenshots.mjs
 */
import fs from "node:fs";
import path from "node:path";

const PUBLIC = path.join(process.cwd(), "public");

const PATHS = [
  "/assets/screenshots/cbam/cbam-calculation-engine-main.png",
  "/assets/screenshots/cbam-console/dashboard.png",
  "/assets/screenshots/cbam-engine/dashboard.png",
  "/assets/screenshots/ppwr/dashboard.png",
  "/assets/screenshots/agri-climate/dashboard.png",
  "/assets/screenshots/eudr/dashboard.png",
  "/assets/screenshots/eudr/dashboard-en.png",
  "/assets/screenshots/dpp/dashboard.png",
  "/assets/screenshots/supplier-evidence/dashboard.png",
  "/assets/screenshots/esg-workspace/dashboard.png",
];

const missing = [];
const found = [];

for (const urlPath of PATHS) {
  const filePath = path.join(PUBLIC, urlPath.replace(/^\//, ""));
  if (fs.existsSync(filePath)) {
    found.push(urlPath);
  } else {
    missing.push(urlPath);
  }
}

console.log("Screenshot asset verification");
console.log("===========================");
console.log(`Found: ${found.length}/${PATHS.length}`);
for (const p of found) console.log(`  ✓ ${p}`);

if (missing.length) {
  console.log(`\nMissing: ${missing.length}`);
  for (const p of missing) console.log(`  ✗ ${p}`);
  process.exit(1);
}

console.log("\nAll screenshot paths OK");
process.exit(0);
