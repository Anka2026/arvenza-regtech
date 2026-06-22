#!/usr/bin/env node
/** Update Water Efficiency copy — Turkish-only product interface across all locales */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const PATCHES = {
  en: {
    metadata: {
      description:
        "Structure water consumption data, water balance inputs, improvement actions and evidence documentation for Türkiye-specific water efficiency regulation workflows.",
    },
    platformHub: {
      description:
        "Structure facility-level water data, meter records and improvement actions for Türkiye water efficiency regulation workflows — Turkish product interface.",
    },
    solutions: {
      problem:
        "Türkiye-specific water efficiency regulation workflows require structured facility-level water data, evidence files and improvement action tracking.",
      approach:
        "Water Efficiency Management coordinates meter records, water balance inputs and improvement actions for Türkiye water efficiency regulation workflows — with a Turkish product interface.",
    },
    module: {
      title: "Water efficiency workflows for Türkiye regulation and facility-level evidence tracking",
      description:
        "Structure water consumption data, meter records, water balance inputs, improvement actions and supporting evidence for Türkiye-specific water efficiency regulation workflows.",
      interfaceLanguageNote:
        "Interface currently available in Turkish for Türkiye water efficiency regulation workflows.",
    },
  },
  tr: {
    metadata: {
      description:
        "Su tüketim verilerini, su dengesi girdilerini, iyileştirme aksiyonlarını ve kanıt dokümantasyonunu Türkiye su verimliliği mevzuatı iş akışları için yapılandırın.",
    },
    platformHub: {
      description:
        "Tesis düzeyinde su verisini, sayaç kayıtlarını ve iyileştirme aksiyonlarını Türkiye su verimliliği mevzuatı iş akışları için yapılandırın — Türkçe ürün arayüzü.",
    },
    solutions: {
      problem:
        "Türkiye su verimliliği mevzuatı iş akışları; tesis düzeyinde su verisi, kanıt dosyaları ve iyileştirme aksiyonu takibinin yapılandırılmasını gerektirir.",
      approach:
        "Su Verimliliği Yönetimi; sayaç kayıtlarını, su dengesi girdilerini ve iyileştirme aksiyonlarını Türkiye su verimliliği mevzuatı iş akışları için koordine eder — Türkçe ürün arayüzü.",
    },
    module: {
      title: "Türkiye su verimliliği mevzuatı için tesis düzeyinde kanıt ve aksiyon takibi",
      description:
        "Su tüketim verilerini, sayaç kayıtlarını, su dengesi girdilerini, iyileştirme aksiyonlarını ve destekleyici kanıtları Türkiye su verimliliği mevzuatı iş akışları için izlenebilir bir yönetim iş akışında yapılandırın.",
      interfaceLanguageNote:
        "Arayüz Türkçe olarak sunulur; modül Türkiye su verimliliği mevzuatı iş akışları için geliştirilmiştir.",
    },
  },
  nl: {
    metadata: {
      description:
        "Structureer waterverbruiksgegevens, waterbalansinvoer, verbeteracties en bewijsdocumentatie voor workflows rond Turkse regelgeving voor water-efficiëntie.",
    },
    platformHub: {
      description:
        "Structureer waterdata op locatieniveau, meterregistraties en verbeteracties voor workflows rond Turkse regelgeving voor water-efficiëntie — Turks productinterface.",
    },
    solutions: {
      problem:
        "Workflows rond Turkse regelgeving voor water-efficiëntie vereisen gestructureerde waterdata op locatieniveau, bewijsdossiers en opvolging van verbeteracties.",
      approach:
        "Water-efficiëntiebeheer coördineert meterregistraties, waterbalansinvoer en verbeteracties voor workflows rond Turkse regelgeving voor water-efficiëntie — met een Turks productinterface.",
    },
    module: {
      title: "Water-efficiëntieworkflows voor Turkse regelgeving en bewijs op locatieniveau",
      description:
        "Structureer waterverbruiksgegevens, meterregistraties, waterbalansinvoer, verbeteracties en ondersteunend bewijs voor workflows rond Turkse regelgeving voor water-efficiëntie.",
      interfaceLanguageNote:
        "De interface is momenteel beschikbaar in het Turks voor workflows rond Turkse regelgeving voor water-efficiëntie.",
    },
  },
};

for (const locale of ["en", "tr", "nl"]) {
  const filePath = path.join(ROOT, "messages", `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const p = PATCHES[locale];

  data.metadata.platformModules.waterEfficiency.description = p.metadata.description;
  data.platformHub.modules.waterEfficiency.description = p.platformHub.description;
  data.solutionsPage.solutions.waterEfficiency.problem = p.solutions.problem;
  data.solutionsPage.solutions.waterEfficiency.approach = p.solutions.approach;
  Object.assign(data.platformModules.waterEfficiency, p.module);

  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(`Updated messages/${locale}.json`);
}

console.log("Water Efficiency Turkish-only UI copy applied.");
