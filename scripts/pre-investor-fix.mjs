#!/usr/bin/env node
/**
 * Pre-investor fix — TR copy, resources, CN checker, module why headings, company roadmap label.
 * Run: node scripts/pre-investor-fix.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const LOCALES = ["en", "tr", "nl"];

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

const SHARED_A11Y = {
  en: {
    "a11y.mobileNavDialog": "Mobile navigation menu",
    "a11y.mobileNavMain": "Mobile site navigation",
  },
  tr: {
    "a11y.mobileNavDialog": "Mobil navigasyon menüsü",
    "a11y.mobileNavMain": "Mobil site navigasyonu",
  },
  nl: {
    "a11y.mobileNavDialog": "Mobiel navigatiemenu",
    "a11y.mobileNavMain": "Mobiele sitenavigatie",
  },
};

const NAV = {
  en: {
    "nav.regulations": "Regulations",
    "nav.platformMenu.roadmapModulesLabel": "Roadmap modules",
  },
  tr: {
    "nav.regulations": "Regülasyonlar",
    "nav.platformMenu.roadmapModulesLabel": "Yol haritası modülleri",
  },
  nl: {
    "nav.regulations": "Regelgeving",
    "nav.platformMenu.roadmapModulesLabel": "Roadmapmodules",
  },
};

const TR_FIXES = {
  "platformHub.architecture.title": "Tüm regülasyon iş akışları için ortak platform mimarisi",
  "solutionsPage.title": "AB regülasyon yükümlülüklerini yapılandırılmış iş akışlarına dönüştürün",
  "platformHub.heroChips.item3": "Şeffaf yetenek özeti",
  "resourcesPage.sections.available.title": "Talep edilebilir kaynaklar",
  "companyPage.productContext.layers.roadmap.label": "Yol Haritası",
  "platformModules.shared.whyEyebrow": "Bu modül neden gerekli",
  "platformModules.cbamComplianceConsole.why.title":
    "Hesaplama çıktılarından operasyonel CBAM hazırlığına",
  "platformModules.ppwr.why.title": "Ambalaj verisini kanıt ve raporlama hazırlığına dönüştürün",
  "platformModules.agriClimate.why.title": "Çiftlik verisinden doğrulanabilir iklim kanıtına",
  "platformModules.eudr.why.title": "Tedarik zinciri izlenebilirliğini risk temelli kanıta bağlayın",
  "platformModules.dpp.why.title": "Ürün verisini pasaport hazırlığına yapılandırın",
  "platformModules.supplierEvidence.why.title":
    "Tedarikçi verisini izlenebilir kanıt akışına dönüştürün",
  "platformModules.esgReporting.why.title":
    "ESG dokümantasyonunu raporlamaya hazır kanıt dosyasına dönüştürün",
};

const EN_WHY = {
  "platformModules.shared.whyEyebrow": "Why this module matters",
  "platformModules.cbamComplianceConsole.why.title":
    "From calculation outputs to operational CBAM readiness",
  "platformModules.ppwr.why.title": "Turn packaging data into evidence and reporting readiness",
  "platformModules.agriClimate.why.title": "From farm-level data to verifiable climate evidence",
  "platformModules.eudr.why.title": "Connect supply chain traceability to risk-based evidence",
  "platformModules.dpp.why.title": "Structure product data for passport readiness",
  "platformModules.supplierEvidence.why.title": "Turn supplier data into traceable evidence workflows",
  "platformModules.esgReporting.why.title": "Turn ESG documentation into reporting-ready evidence files",
};

const NL_WHY = {
  "platformModules.shared.whyEyebrow": "Waarom deze module ertoe doet",
  "platformModules.cbamComplianceConsole.why.title":
    "Van berekeningsoutput naar operationele CBAM-gereedheid",
  "platformModules.ppwr.why.title": "Verpakkingsdata omzetten in bewijs- en rapportagegereedheid",
  "platformModules.agriClimate.why.title": "Van farm-level data naar verifieerbaar klimatebewijs",
  "platformModules.eudr.why.title": "Supplychain-traceerbaarheid koppelen aan risicogebaseerd bewijs",
  "platformModules.dpp.why.title": "Productdata structureren voor paspoortgereedheid",
  "platformModules.supplierEvidence.why.title":
    "Leveranciersdata omzetten in traceerbare bewijsworkflows",
  "platformModules.esgReporting.why.title":
    "ESG-documentatie omzetten in rapportageklare bewijsbestanden",
};

const RESOURCE_PATCHES = {
  en: {
    "resourcesPage.status.availableOnRequest": "Available on request",
    "resourcesPage.resources.cbamRegulationBriefing.title": "CBAM Reporting Requirements Briefing",
    "resourcesPage.resources.cbamRegulationBriefing.description":
      "A concise briefing on CBAM reporting obligations, product scope, supplier evidence and the transition from data collection to declaration-ready preparation.",
    "resourcesPage.resources.cbamRegulationBriefing.format": "Regulatory briefing",
    "resourcesPage.resources.cbamRegulationBriefing.cta": "Request briefing",
    "resourcesPage.resources.cbamRegulationBriefing.valuePreview.item1":
      "Reporting obligations and product scope overview",
    "resourcesPage.resources.cbamRegulationBriefing.valuePreview.item2":
      "Supplier evidence and declaration-ready preparation steps",
    "resourcesPage.resources.cbamRegulationBriefing.detail":
      "Request the briefing through our team to structure CBAM reporting preparation — not an automated download.",
    "resourcesPage.resources.embeddedEmissionsGuide.title":
      "Direct and Indirect Embedded Emissions Guide",
    "resourcesPage.resources.embeddedEmissionsGuide.description":
      "A practical guide to direct emissions, indirect emissions, activity data, supplier evidence and calculation inputs used in CBAM workflows.",
    "resourcesPage.resources.embeddedEmissionsGuide.format": "Implementation guide",
    "resourcesPage.resources.embeddedEmissionsGuide.cta": "Request guide",
    "resourcesPage.resources.embeddedEmissionsGuide.valuePreview.item1":
      "Direct and indirect emissions data fields",
    "resourcesPage.resources.embeddedEmissionsGuide.valuePreview.item2":
      "Activity data, supplier evidence and calculation inputs",
    "resourcesPage.resources.embeddedEmissionsGuide.detail":
      "Request the guide through our team — shared when you request access, not a downloadable file.",
    "resourcesPage.resources.scopeAssessmentChecklist.title":
      "CBAM Product Scope Assessment Checklist",
    "resourcesPage.resources.scopeAssessmentChecklist.description":
      "A checklist for screening CN codes, product descriptions, customs classification and supplier documentation before reporting preparation.",
    "resourcesPage.resources.scopeAssessmentChecklist.format": "Checklist",
    "resourcesPage.resources.scopeAssessmentChecklist.cta": "Request checklist",
    "resourcesPage.resources.scopeAssessmentChecklist.valuePreview.item1":
      "CN code and product description screening",
    "resourcesPage.resources.scopeAssessmentChecklist.valuePreview.item2":
      "Customs classification and supplier documentation review",
    "resourcesPage.resources.scopeAssessmentChecklist.detail":
      "Request the checklist to structure scope assessment before your next reporting cycle.",
    "resourcesPage.cnScopeChecker.nextStep.notFound":
      "This CN code does not fall within the mandatory CBAM product scope listed in Annex I of Regulation (EU) 2023/956. Final determination requires product description, customs classification and technical review.",
  },
  tr: {
    "resourcesPage.status.availableOnRequest": "Talep üzerine erişilebilir",
    "resourcesPage.resources.cbamRegulationBriefing.title": "CBAM Raporlama Gereklilikleri Bilgi Notu",
    "resourcesPage.resources.cbamRegulationBriefing.description":
      "CBAM raporlama yükümlülükleri, ürün kapsamı, tedarikçi kanıtı ve veri toplamadan beyana hazır hazırlığa geçiş için kısa uygulama notu.",
    "resourcesPage.resources.cbamRegulationBriefing.format": "Regülasyon notu",
    "resourcesPage.resources.cbamRegulationBriefing.cta": "Bilgi notunu talep edin",
    "resourcesPage.resources.cbamRegulationBriefing.valuePreview.item1":
      "Raporlama yükümlülükleri ve ürün kapsamı özeti",
    "resourcesPage.resources.cbamRegulationBriefing.valuePreview.item2":
      "Tedarikçi kanıtı ve beyana hazır hazırlık adımları",
    "resourcesPage.resources.cbamRegulationBriefing.detail":
      "CBAM raporlama hazırlığını yapılandırmak için bilgi notunu ekibimiz aracılığıyla talep edin — otomatik indirme değildir.",
    "resourcesPage.resources.embeddedEmissionsGuide.title":
      "Doğrudan ve Dolaylı Gömülü Emisyonlar Rehberi",
    "resourcesPage.resources.embeddedEmissionsGuide.description":
      "CBAM iş akışlarında kullanılan doğrudan emisyonlar, dolaylı emisyonlar, faaliyet verisi, tedarikçi kanıtı ve hesaplama girdileri için pratik rehber.",
    "resourcesPage.resources.embeddedEmissionsGuide.format": "Uygulama rehberi",
    "resourcesPage.resources.embeddedEmissionsGuide.cta": "Rehberi talep edin",
    "resourcesPage.resources.embeddedEmissionsGuide.valuePreview.item1":
      "Doğrudan ve dolaylı emisyon veri alanları",
    "resourcesPage.resources.embeddedEmissionsGuide.valuePreview.item2":
      "Faaliyet verisi, tedarikçi kanıtı ve hesaplama girdileri",
    "resourcesPage.resources.embeddedEmissionsGuide.detail":
      "Rehberi ekibimiz aracılığıyla talep edin — erişim talebinde paylaşılır, indirilebilir dosya değildir.",
    "resourcesPage.resources.scopeAssessmentChecklist.title":
      "CBAM Ürün Kapsam Değerlendirme Kontrol Listesi",
    "resourcesPage.resources.scopeAssessmentChecklist.description":
      "Raporlama hazırlığı öncesinde CN kodları, ürün açıklamaları, gümrük sınıflandırması ve tedarikçi dokümantasyonunu kontrol etmek için kapsam değerlendirme listesi.",
    "resourcesPage.resources.scopeAssessmentChecklist.format": "Kontrol listesi",
    "resourcesPage.resources.scopeAssessmentChecklist.cta": "Kontrol listesini talep edin",
    "resourcesPage.resources.scopeAssessmentChecklist.valuePreview.item1":
      "CN kodu ve ürün açıklaması taraması",
    "resourcesPage.resources.scopeAssessmentChecklist.valuePreview.item2":
      "Gümrük sınıflandırması ve tedarikçi dokümantasyonu incelemesi",
    "resourcesPage.resources.scopeAssessmentChecklist.detail":
      "Bir sonraki raporlama dönemi öncesinde kapsam değerlendirmesini yapılandırmak için kontrol listesini talep edin.",
    "resourcesPage.cnScopeChecker.nextStep.notFound":
      "Bu CN/GTİP kodu, AB Tüzüğü 2023/956 Ek-I'de listelenen zorunlu CBAM ürün kapsamı içinde yer almamaktadır. Nihai değerlendirme için ürün tanımı, gümrük sınıflandırması ve teknik inceleme gerekebilir.",
  },
  nl: {
    "resourcesPage.status.availableOnRequest": "Beschikbaar op aanvraag",
    "resourcesPage.resources.cbamRegulationBriefing.title": "CBAM-rapportagevereisten briefing",
    "resourcesPage.resources.cbamRegulationBriefing.description":
      "Een beknopte briefing over CBAM-rapportageverplichtingen, productscope, leveranciersbewijs en de stap van dataverzameling naar aangifteklare voorbereiding.",
    "resourcesPage.resources.cbamRegulationBriefing.format": "Regelgevingsbriefing",
    "resourcesPage.resources.cbamRegulationBriefing.cta": "Briefing aanvragen",
    "resourcesPage.resources.cbamRegulationBriefing.valuePreview.item1":
      "Overzicht rapportageverplichtingen en productscope",
    "resourcesPage.resources.cbamRegulationBriefing.valuePreview.item2":
      "Leveranciersbewijs en aangifteklare voorbereidingsstappen",
    "resourcesPage.resources.cbamRegulationBriefing.detail":
      "Vraag de briefing aan via ons team — geen automatische download.",
    "resourcesPage.resources.embeddedEmissionsGuide.title":
      "Gids voor directe en indirecte ingebedde emissies",
    "resourcesPage.resources.embeddedEmissionsGuide.description":
      "Een praktische gids voor directe emissies, indirecte emissies, activiteitsdata, leveranciersbewijs en berekeningsinput in CBAM-workflows.",
    "resourcesPage.resources.embeddedEmissionsGuide.format": "Implementatiegids",
    "resourcesPage.resources.embeddedEmissionsGuide.cta": "Gids aanvragen",
    "resourcesPage.resources.embeddedEmissionsGuide.valuePreview.item1":
      "Datavelden voor directe en indirecte emissies",
    "resourcesPage.resources.embeddedEmissionsGuide.valuePreview.item2":
      "Activiteitsdata, leveranciersbewijs en berekeningsinput",
    "resourcesPage.resources.embeddedEmissionsGuide.detail":
      "Vraag de gids aan via ons team — geen downloadbaar bestand.",
    "resourcesPage.resources.scopeAssessmentChecklist.title":
      "CBAM-checklist voor productscopebeoordeling",
    "resourcesPage.resources.scopeAssessmentChecklist.description":
      "Een checklist voor het beoordelen van CN-codes, productomschrijvingen, douaneclassificatie en leveranciersdocumentatie vóór rapportagevoorbereiding.",
    "resourcesPage.resources.scopeAssessmentChecklist.format": "Checklist",
    "resourcesPage.resources.scopeAssessmentChecklist.cta": "Checklist aanvragen",
    "resourcesPage.resources.scopeAssessmentChecklist.valuePreview.item1":
      "Screening van CN-codes en productomschrijvingen",
    "resourcesPage.resources.scopeAssessmentChecklist.valuePreview.item2":
      "Douaneclassificatie en leveranciersdocumentatie",
    "resourcesPage.resources.scopeAssessmentChecklist.detail":
      "Vraag de checklist aan om scopebeoordeling te structureren vóór de volgende rapportagecyclus.",
    "resourcesPage.cnScopeChecker.nextStep.notFound":
      "Deze CN-code valt niet binnen het verplichte CBAM-productbereik zoals vermeld in bijlage I van Verordening (EU) 2023/956. Voor een definitieve beoordeling zijn productomschrijving, douaneclassificatie en technische toetsing vereist.",
  },
};

for (const locale of LOCALES) {
  const { file, data } = load(locale);

  for (const [key, value] of Object.entries(SHARED_A11Y[locale])) set(data, key, value);
  for (const [key, value] of Object.entries(NAV[locale])) set(data, key, value);
  for (const [key, value] of Object.entries(RESOURCE_PATCHES[locale])) set(data, key, value);

  if (locale === "tr") {
    for (const [key, value] of Object.entries(TR_FIXES)) set(data, key, value);
  } else if (locale === "en") {
    for (const [key, value] of Object.entries(EN_WHY)) set(data, key, value);
  } else if (locale === "nl") {
    for (const [key, value] of Object.entries(NL_WHY)) set(data, key, value);
  }

  save({ file, data });
  console.log(`✓ ${locale}: pre-investor fixes applied`);
}

console.log("Pre-investor fix complete.");
