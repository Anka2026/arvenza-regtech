#!/usr/bin/env node
/**
 * Verify resourcesPage (and common namespaces) keys exist in en/tr/nl messages.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const LOCALES = ["en", "tr", "nl"];

function loadMessages(locale) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, "messages", `${locale}.json`), "utf8"));
}

function hasPath(obj, keyPath) {
  const parts = keyPath.split(".");
  let cur = obj;
  for (const p of parts) {
    if (cur == null || typeof cur !== "object" || !(p in cur)) return false;
    cur = cur[p];
  }
  return typeof cur === "string" && cur.trim().length > 0;
}

const RESOURCE_KEYS = [
  "cbamCnScope",
  "cbamChecklist",
  "supplierTemplate",
  "cbamRegulationBriefing",
  "embeddedEmissionsGuide",
  "scopeAssessmentChecklist",
  "ppwrPackaging",
  "eudrBrief",
  "dppDataModelBrief",
  "esgEvidenceStructure",
  "waterEfficiencyChecklist",
];

const RESOURCE_FIELD_KEYS = RESOURCE_KEYS.flatMap((key) => [
  `resources.${key}.title`,
  `resources.${key}.description`,
  `resources.${key}.format`,
  `resources.${key}.cta`,
  `resources.${key}.valuePreview.item1`,
  `resources.${key}.valuePreview.item2`,
  `resources.${key}.detail`,
]);

/** Keys referenced by resources page components */
const REQUIRED_RESOURCES_KEYS = [
  "eyebrow",
  "title",
  "description",
  "positioning",
  "heroChipsAriaLabel",
  "heroChips.item1",
  "heroChips.item2",
  "heroChips.item3",
  "categoryTagsAriaLabel",
  "categories.all",
  "categories.tools",
  "categories.checklists",
  "categories.templates",
  "categories.regulatoryNotes",
  "categories.implementationGuides",
  "status.available",
  "status.availableOnRequest",
  "status.inPreparation",
  "status.roadmap",
  "library.title",
  "library.description",
  "toolSpotlight.badge",
  "toolSpotlight.title",
  "toolSpotlight.description",
  "toolSpotlight.cta",
  "toolSpotlight.secondaryCta",
  "detailPanel.close",
  "detailPanel.requestAccess",
  "detailPanel.followRoadmap",
  "detailPanel.getNotified",
  "fields.valuePreview",
  "metadata.formatLabel",
  "metadata.statusLabel",
  "leadMagnet.title",
  "leadMagnet.description",
  "leadMagnet.cta",
  "leadMagnet.highlights.item1",
  "leadMagnet.highlights.item2",
  "leadMagnet.highlights.item3",
  "subscribeBenefits.title",
  "subscribeBenefits.items.item1",
  "subscribeBenefits.items.item2",
  "subscribeBenefits.items.item3",
  "subscribeBenefits.items.item4",
  "subscribe.title",
  "subscribe.description",
  "subscribe.emailLabel",
  "subscribe.emailPlaceholder",
  "subscribe.interestLabel",
  "subscribe.interestPlaceholder",
  "subscribe.submit",
  "subscribe.success",
  "subscribe.contactPrefix",
  "subscribe.interests.cbam",
  "subscribe.interests.supplier",
  "subscribe.interests.ppwr",
  "subscribe.interests.eudr",
  "subscribe.interests.dpp",
  "subscribe.interests.general",
  "cnScopeChecker.backToResources",
  "cnScopeChecker.invalidCodeTitle",
  "cnScopeChecker.invalidCodeMessage",
  "cnScopeChecker.numericCodeRecommended",
  "cnScopeChecker.title",
  "cnScopeChecker.description",
  "cnScopeChecker.searchLabel",
  "cnScopeChecker.searchPlaceholder",
  "cnScopeChecker.examplesAriaLabel",
  "cnScopeChecker.examples.item1",
  "cnScopeChecker.examples.item2",
  "cnScopeChecker.examples.item3",
  "cnScopeChecker.examples.item4",
  "cnScopeChecker.loading",
  "cnScopeChecker.loadError",
  "cnScopeChecker.notFoundTitle",
  "cnScopeChecker.notFoundSubtitle",
  "cnScopeChecker.foundTitle",
  "cnScopeChecker.foundSubtitle",
  "cnScopeChecker.searchedCode",
  "cnScopeChecker.partialMatchNote",
  "cnScopeChecker.fields.code",
  "cnScopeChecker.fields.sector",
  "cnScopeChecker.fields.description",
  "cnScopeChecker.fields.scopeStatus",
  "cnScopeChecker.status.included",
  "cnScopeChecker.status.appearsInScope",
  "cnScopeChecker.nextStep.included",
  "cnScopeChecker.nextStep.notFound",
  "cnScopeChecker.disclaimer",
  ...RESOURCE_FIELD_KEYS,
];

let failed = false;

for (const locale of LOCALES) {
  const messages = loadMessages(locale);
  const ns = messages.resourcesPage;
  if (!ns) {
    console.error(`✗ ${locale}: missing resourcesPage namespace`);
    failed = true;
    continue;
  }
  const missing = REQUIRED_RESOURCES_KEYS.filter((key) => !hasPath(ns, key));
  if (missing.length) {
    console.error(`✗ ${locale}: missing ${missing.length} keys:`);
    for (const k of missing) console.error(`    resourcesPage.${k}`);
    failed = true;
  } else {
    console.log(`✓ ${locale}: all ${REQUIRED_RESOURCES_KEYS.length} resourcesPage keys present`);
  }
}

if (failed) process.exit(1);
console.log("\nAll required resourcesPage i18n keys OK");
