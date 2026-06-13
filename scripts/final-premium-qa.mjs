#!/usr/bin/env node
/**
 * Final three-language premium copy QA — maturity labels, TR diacritics, NL/EN polish.
 * Run: node scripts/final-premium-qa.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

function load(locale) {
  const file = path.join(ROOT, "messages", `${locale}.json`);
  return { file, data: JSON.parse(fs.readFileSync(file, "utf8")) };
}

function save({ file, data }) {
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function set(obj, keyPath, value) {
  const parts = keyPath.split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (cur[parts[i]] == null) cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

const PATCHES = {
  tr: {
    "metadata.modules.dpp.description":
      "Planlanan Dijital Ürün Pasaportu modülü — ürün veri yapıları, tedarikçi kanıt katmanları ve dokümantasyon izlenebilirliği.",
    "nav.platformMenu.featuredStatus": "Kullanıma hazır",
    "nav.solutionsMenu.featuredStatus": "Kullanıma hazır",
    "nav.status.pilot": "Erken Erişim",
    "nav.status.comingSoon": "Yol Haritası",
    "nav.status.earlyAccess": "Erken Erişim",
    "home.regulatoryCoverage.statusComingSoon": "Yol Haritası",
    "home.regulatoryCoverage.items.supplier.title": "Tedarikçi Kanıtı",
    "home.regulatoryCoverage.items.supplier.description":
      "Tedarikçi veri toplama, kanıt doğrulama ve tedarik zinciri izlenebilirliği.",
    "platformHub.sections.ready.label": "Kullanıma hazır",
    "platformHub.sections.comingSoon.title": "Yol haritası modülleri",
    "platformHub.sections.comingSoon.label": "Yol Haritası",
    "platformHub.modules.ppwr.exploreCta": "PPWR Ambalaj Uyumunu İnceleyin",
    "platformHub.modules.supplierEvidence.exploreCta":
      "Tedarikçi Kanıt İş Akışı yol haritasını inceleyin",
    "platformHub.modules.esgReporting.exploreCta":
      "ESG Kanıt ve Raporlama Çalışma Alanı yol haritasını inceleyin",
    "solutionsPage.sections.ready.label": "Kullanıma hazır",
    "solutionsPage.sections.roadmap.label": "Yol Haritası",
    "companyPage.cards.readyProduct.status": "Kullanıma hazır",
    "companyPage.trust.title": "Güvenilirlik sinyalleri",
    "resourcesPage.status.available": "Erişilebilir",
    "resourcesPage.status.inPreparation": "Hazırlanıyor",
    "platformModules.ppwr.eyebrow": "PPWR / Ambalaj Uyumu",
    "platformModules.supplierEvidence.eyebrow": "Tedarikçi Kanıt İş Akışı",
    "platformModules.esgReporting.eyebrow": "ESG Kanıt ve Raporlama Çalışma Alanı",
    "metadata.platformModules.dpp.description":
      "Planlanan Dijital Ürün Pasaportu modülü — ürün veri yapıları, tedarikçi kanıt katmanları ve dokümantasyon izlenebilirliği.",
  },
  en: {
    "platformHub.sections.comingSoon.title": "Roadmap modules",
    "platformHub.sections.comingSoon.label": "Roadmap",
    "solutionsPage.sections.roadmap.label": "Roadmap",
    "home.regulatoryCoverage.statusComingSoon": "Roadmap",
    "nav.status.comingSoon": "Roadmap",
  },
  nl: {
    "platformHub.sections.ready.title": "Productieklaar product",
    "platformHub.sections.ready.description":
      "CBAM Calculation Engine is het productieklaar operationele product binnen de Arvenza-platformarchitectuur.",
    "platformHub.sections.pilot.title": "Modules in vroege toegang",
    "platformHub.sections.pilot.description":
      "Modules in gestructureerde vroege toegang — operationele monitoring en uitgebreide compliance-workflows zonder volledige productbeschikbaarheid te impliceren.",
    "platformHub.sections.comingSoon.title": "Roadmapmodules",
    "platformHub.sections.comingSoon.label": "Roadmap",
    "solutionsPage.sections.roadmap.label": "Roadmap",
    "home.regulatoryCoverage.statusComingSoon": "Roadmap",
    "home.companyPage.heroChips.item3": "Gereed CBAM-product, bredere roadmap",
    "companyPage.heroChips.item3": "Gereed CBAM-product, bredere roadmap",
    "nav.status.comingSoon": "Roadmap",
  },
};

for (const locale of ["en", "tr", "nl"]) {
  const { file, data } = load(locale);
  for (const [keyPath, value] of Object.entries(PATCHES[locale])) {
    set(data, keyPath, value);
  }
  save({ file, data });
  console.log(`✓ ${locale}: premium QA patches applied`);
}

console.log("Final premium QA complete.");
