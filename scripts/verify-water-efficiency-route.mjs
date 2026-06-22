#!/usr/bin/env node
import puppeteer from "puppeteer";

const BASE = process.env.SMOKE_BASE_URL ?? "http://localhost:3028";
const EXPECTED_IMG = "/assets/screenshots/water-efficiency/dashboard.png";

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage();

for (const loc of ["en", "tr", "nl"]) {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));

  await page.goto(`${BASE}/${loc}/platform/water-efficiency`, {
    waitUntil: "networkidle2",
  });

  const result = await page.evaluate((expectedImg) => {
    const img = document.querySelector(`img[src*="${expectedImg}"]`);
    return {
      crashed: document.body.innerText.includes("Application error"),
      imgSrc: img?.getAttribute("src") ?? null,
      hasPlaceholderOnly: !img && !!document.querySelector("[role='img'][aria-label]"),
      note: document.querySelector(".product-interface-language-note")?.innerText ?? null,
      rawKeys: (document.body.innerText.match(/platformModules\.[a-zA-Z0-9_.]+/g) ?? []).slice(
        0,
        5
      ),
    };
  }, EXPECTED_IMG);

  page.removeAllListeners("pageerror");

  console.log(`${loc}:`, {
    ...result,
    imgOk: result.imgSrc?.includes(EXPECTED_IMG),
    errors,
  });
}

await browser.close();
