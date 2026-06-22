#!/usr/bin/env node
/** Smoke-check platform module routes for client runtime errors */
import puppeteer from "puppeteer";

const BASE = process.env.SMOKE_BASE_URL ?? "http://localhost:3028";
const LOCALES = ["en", "tr", "nl"];
const MODULE_SLUGS = [
  "cbam",
  "cbam-console",
  "ppwr",
  "agri-climate",
  "eudr",
  "digital-product-passport",
  "supplier-evidence",
  "esg-workspace",
  "water-efficiency",
];

async function checkRoute(page, locale, slug) {
  const path = slug === "cbam" ? "/platform/cbam" : `/platform/${slug}`;
  const url = `${BASE}/${locale}${path}`;
  const errors = [];

  const onPageError = (err) => {
    errors.push({ kind: "pageerror", message: err.message, stack: err.stack });
  };
  const onConsole = (msg) => {
    if (msg.type() === "error") {
      errors.push({ kind: "console", message: msg.text() });
    }
  };

  page.on("pageerror", onPageError);
  page.on("console", onConsole);

  let status = 0;
  try {
    const res = await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
    status = res?.status() ?? 0;
    await new Promise((r) => setTimeout(r, 1500));
  } finally {
    page.off("pageerror", onPageError);
    page.off("console", onConsole);
  }

  const bodyText = await page.evaluate(() => document.body?.innerText ?? "");
  const crashed = bodyText.includes("Application error");
  const rawKeys = bodyText.match(/platformModules\.[a-zA-Z0-9_.]+/g) ?? [];

  return { url, status, crashed, errors, rawKeys: [...new Set(rawKeys)] };
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  const failures = [];

  for (const slug of MODULE_SLUGS) {
    for (const locale of LOCALES) {
      const result = await checkRoute(page, locale, slug);
      const ok =
        result.status >= 200 &&
        result.status < 400 &&
        !result.crashed &&
        result.errors.length === 0 &&
        result.rawKeys.length === 0;

      const label = `${locale}/platform/${slug === "cbam" ? "cbam" : slug}`;
      if (ok) {
        console.log(`✓ ${label}`);
      } else {
        console.log(`✗ ${label}`);
        if (result.status) console.log(`  status: ${result.status}`);
        if (result.crashed) console.log("  crashed: Application error visible");
        if (result.rawKeys.length) console.log(`  raw i18n: ${result.rawKeys.join(", ")}`);
        for (const err of result.errors) {
          console.log(`  ${err.kind}: ${err.message}`);
          if (err.stack) console.log(err.stack.split("\n").slice(0, 6).join("\n"));
        }
        failures.push({ label, ...result });
      }
    }
  }

  await browser.close();

  if (failures.length) {
    console.log(`\n${failures.length} route check(s) failed`);
    process.exit(1);
  }

  console.log("\nAll platform module routes OK");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
