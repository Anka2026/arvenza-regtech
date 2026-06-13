#!/usr/bin/env node
/**
 * Investor-readiness copy cleanup — maturity labels, pilot wording, TR diacritics.
 * Run: node scripts/cleanup-investor-copy.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

function walk(obj, fn, keyPath = "") {
  if (typeof obj === "string") {
    return fn(obj, keyPath);
  }
  if (Array.isArray(obj)) {
    return obj.map((item, i) => walk(item, fn, `${keyPath}[${i}]`));
  }
  if (obj && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      const p = keyPath ? `${keyPath}.${k}` : k;
      out[k] = walk(v, fn, p);
    }
    return out;
  }
  return obj;
}

function applyReplacements(text, pairs) {
  let out = text;
  for (const [from, to] of pairs) {
    if (typeof from === "string") {
      out = out.split(from).join(to);
    } else {
      out = out.replace(from, to);
    }
  }
  return out;
}

const EN_PAIRS = [
  ["Discuss pilot access", "Request early access"],
  ["Discuss PPWR packaging compliance pilot access", "Request PPWR packaging compliance early access"],
  ["Discuss Agri-Climate Platform pilot access", "Request Agri-Climate Platform early access"],
  ["Discuss CBAM Compliance Console pilot access with our team", "Request CBAM Compliance Console early access with our team"],
  ["Pilot Coordination Layer", "Evidence and Reporting Readiness"],
  ["Pilot Module", "Early Access Module"],
  ["Pilot modules", "Early Access modules"],
  ["Pilot Modules", "Early Access Modules"],
  ["3 pilot modules", "3 early-access modules"],
  ["Pilot module", "Early access module"],
  ["Pilot product area", "Early access product area"],
  ["Pilot coordination layer", "Evidence and reporting readiness layer"],
  ["Pilot solution workflows", "Early access solution workflows"],
  ["Pilot capability areas", "Early access capability areas"],
  ["Pilot capability focused", "Early access capability focused"],
  ["Who this pilot is for", "Who this module is for"],
  ["structured pilot access", "structured early access"],
  ["pilot and roadmap modules", "early-access and roadmap modules"],
  ["Pilot and roadmap modules", "Early-access and roadmap modules"],
  ["pilot and roadmap use cases", "early-access and roadmap use cases"],
  ["Pilot modules clearly labelled", "Early-access modules clearly labelled"],
  ["Pilot and Coming Soon modules", "Early access and roadmap modules"],
  ["Pilot and Coming Soon", "Early Access and Roadmap"],
  ["Ready, Pilot or Coming Soon", "Ready, Early Access or Roadmap"],
  ["Pilot modules in structured access", "Early access modules in structured access"],
  ["The CBAM Compliance Console pilot is positioned", "CBAM Compliance Console is positioned"],
  ["The PPWR / Packaging Compliance pilot structures", "PPWR / Packaging Compliance structures"],
  ["is positioned as a pilot product area", "is positioned as an early access product area"],
  ["A pilot coordination layer", "An evidence and reporting readiness layer"],
  ["A pilot module for organizing", "An early access module for organizing"],
  ["A pilot product area for organizing", "An early access product area for organizing"],
  ["This module is in structured pilot access", "This module is in structured early access"],
  ["Built from regulatory implementation practice", "Built on regulatory implementation expertise"],
  ["Honest maturity model", "Transparent capability map"],
  ["Honest capability alignment", "Capability-matched sector workflows"],
  ["Honest resource status", "Transparent resource status"],
  ["Our team walks you through the digital path from supplier data to declaration-ready evidence", "Our team walks you through the full workflow — from supplier data intake to declaration-ready evidence"],
  ["Pilot and roadmap modules extend the same supplier evidence model", "Early-access and roadmap modules extend the same supplier evidence model"],
  ["extends into pilot and roadmap modules", "extends into early-access and roadmap modules"],
  ["to pilot and roadmap modules", "to early-access and roadmap modules"],
  ["into pilot and roadmap modules", "into early-access and roadmap modules"],
  ["pilot, pilot and roadmap modules", "early-access and roadmap modules"],
  ["Pilot, pilot and roadmap modules", "Early-access and roadmap modules"],
  [" across CBAM, pilot and roadmap modules", " across CBAM, early-access and roadmap modules"],
  ["Pilot — operational monitoring", "Early access — operational monitoring"],
  [" pilot — ", " early access — "],
  [" Platform pilot — ", " Platform early access — "],
  [" compliance pilot — ", " compliance early access — "],
];

const TR_PAIRS = [
  ["Pilot Erişimi Görüşelim", "Erken Erişim Talep Edin"],
  ["Pilot Koordinasyon Katmani", "Kanıt ve Raporlama Hazırlığı"],
  ["Pilot Modul", "Erken Erişim Modülü"],
  ["Pilot modüller", "Erken Erişim Modülleri"],
  ["Pilot modül", "Erken erişim modülü"],
  ["3 pilot modül", "3 erken erişim modülü"],
  ["pilot koordinasyon katmanı", "kanıt ve raporlama hazırlık katmanı"],
  ["Pilot koordinasyon katmanı", "Kanıt ve raporlama hazırlık katmanı"],
  ["pilot ve yol haritası modülleri", "erken erişim ve yol haritası modülleri"],
  ["Pilot ve yol haritası modülleri", "Erken erişim ve yol haritası modülleri"],
  ["yapılandırılmış pilot erişimi", "yapılandırılmış erken erişim"],
  ["yapılandırılmış pilot erişimindedir", "yapılandırılmış erken erişim kapsamındadır"],
  ["pilot ürün alanı", "erken erişim ürün alanı"],
  ["Pilot ürün alanı", "Erken erişim ürün alanı"],
  ["Pilot çözüm iş akışları", "Erken erişim çözüm iş akışları"],
  ["Pilot modüller açıkça etiketlenir", "Erken erişim modülleri açıkça etiketlenir"],
  ["Pilot modüller", "Erken erişim modülleri"],
  ["Bu pilot kimler için", "Bu modül kimler için"],
  ["Pilot yetenek alanları", "Erken erişim yetenek alanları"],
  ["pilot yetenek", "erken erişim yeteneği"],
  [" pilotu ", " erken erişim modülü "],
  [" pilotu—", " erken erişim modülü —"],
  [" pilotu—", " erken erişim modülü —"],
  ["Altı sektör, tek kanıt operasyon modeli", "Sektöre özgü uyum iş akışları"],
  ["Birden fazla regülasyon iş akışı için ortak operasyon modeli", "Çok regülasyonlu iş akışları için ortak operasyon modeli"],
  ["Topladığımız bilgiler", "Topladığımız kişisel veriler"],
  ["İş Akışını İncele", "İş Akışını İnceleyin"],
  ["Blog / İçgörüler", "Blog / Kaynaklar"],
  ["Urun markasi", "Ürün markası"],
  ["Hazir CBAM motoru", "Kullanıma hazır CBAM motoru"],
  ["Hollanda operatoru", "Hollanda operatörü"],
  ["Urun odakli tur", "Ürün odaklı tur"],
  ["Dijital Urun Pasaportu", "Dijital Ürün Pasaportu"],
  ["Yol Haritasi Modulu", "Yol Haritası Modülü"],
  ["Tedarikci Kanit Is Akisi", "Tedarikçi Kanıt İş Akışı"],
  ["ESG Kanit ve Raporlama Calisma Alani", "ESG Kanıt ve Raporlama Çalışma Alanı"],
  ["tedarikci kanit durumu", "tedarikçi kanıt durumu"],
  ["hesaplama hazirligi", "hesaplama hazırlığı"],
  ["raporlama dongusu", "raporlama döngüsü"],
  ["icin operasyonel", "için operasyonel"],
  ["yapilandirilmis", "yapılandırılmış"],
  ["tedarikci kaniti", "tedarikçi kanıtı"],
  ["ambalaj verisi hazirligi", "ambalaj verisi hazırlığı"],
  ["tarimsal iklim verisi", "tarımsal iklim verisi"],
  ["ciftlik duzeyinde kayitlar", "çiftlik düzeyinde kayıtlar"],
  ["kanit hazirligi is akislari", "kanıt hazırlığı iş akışları"],
  ["konum kaniti", "konum kanıtı"],
  ["tedarikci beyanlari", "tedarikçi beyanları"],
  ["izlenebilirlik dokumantasyonu", "izlenebilirlik dokümantasyonu"],
  ["urun veri yapilari", "ürün veri yapıları"],
  ["tedarikci kanit katmanlari", "tedarikçi kanıt katmanları"],
  ["dokumantasyon izlenebilirligi", "dokümantasyon izlenebilirliği"],
  ["tedarikci iletisimi", "tedarikçi iletişimi"],
  ["kanit yukleme", "kanıt yükleme"],
  ["takip is akislari", "takip iş akışları"],
  ["ESG kanit koordinasyonu", "ESG kanıt koordinasyonu"],
  ["calisma alani", "çalışma alanı"],
  ["Hazır, Pilot veya Yakında", "Kullanıma hazır, Erken Erişim veya Yol Haritası"],
  ["Ortak kanıt mantığı üzerinde pilot ve yakında modüller", "Ortak kanıt mantığı üzerinde erken erişim ve yol haritası modülleri"],
  ["pilot modül.", "erken erişim modülü."],
  ["pilot modül.", "erken erişim modülü."],
  ["pilot modüller", "erken erişim modülleri"],
  ["pilot erişimle", "erken erişimle"],
  ["CBAM Compliance Console pilotu;", "CBAM Compliance Console;"],
  ["PPWR / Packaging Compliance pilotu;", "PPWR / Packaging Compliance;"],
  ["pilot ve yol haritası", "erken erişim ve yol haritası"],
  ["pilot erişimini ekibimizle görüşün", "erken erişim talep edin"],
  ["pilot erişimini görüşün", "erken erişim talep edin"],
  ["için pilot modül", "için erken erişim modülü"],
  ["içgörü", "kaynak"],
  ["İçgörü", "Kaynak"],
];

const NL_PAIRS = [
  ["Pilottoegang bespreken", "Vroege toegang aanvragen"],
  ["Pilotcoordinatielaag", "Bewijs- en rapportagegereedheid"],
  ["Pilotmodule", "Module in vroege toegang"],
  ["Pilotmodules", "Modules in vroege toegang"],
  ["3 pilotmodules", "3 modules in vroege toegang"],
  ["pilot- en roadmapmodules", "modules in vroege toegang en roadmapmodules"],
  ["Pilot- en roadmapmodules", "Modules in vroege toegang en roadmapmodules"],
  ["gestructureerde pilottoegang", "gestructureerde vroege toegang"],
  ["gestructureerde pilot erişim", "gestructureerde vroege toegang"],
  ["pilottoegang", "vroege toegang"],
  ["Pilottoegang", "Vroege toegang"],
  ["Pilot oplossingsworkflows", "Oplossingsworkflows in vroege toegang"],
  ["Pilotproduct", "Product in vroege toegang"],
  ["pilotproductgebied", "productgebied in vroege toegang"],
  ["pilotcoördinatielaag", "bewijs- en rapportagecoördinatielaag"],
  ["Pilotcoördinatielaag", "Bewijs- en rapportagecoördinatielaag"],
  ["De CBAM Compliance Console-pilot is", "CBAM Compliance Console is"],
  ["De PPWR / Packaging Compliance-pilot structureert", "PPWR / Packaging Compliance structureert"],
  ["Voor wie deze pilot bedoeld is", "Voor wie deze module bedoeld is"],
  ["Pilotcapability", "Capability in vroege toegang"],
  [" pilot — ", " vroege toegang — "],
  ["EU-duurzaamheidscomplianceplatform", "EU-platform voor duurzaamheidscompliance"],
  ["Gereedstaande productcapaciteit", "Productieklaar product"],
  ["Gereedstaande CBAM-engine", "Gereed CBAM-product"],
  ["Gereedstaande CBAM Calculation Engine", "Gereed CBAM Calculation Engine"],
  ["gereedstaande CBAM Calculation Engine", "gereed CBAM Calculation Engine"],
  ["gereedstaand operationeel product", "productieklaar operationeel product"],
  ["gereedstaande productcapaciteit", "productieklaar product"],
  ["Gereed, Pilot of Binnenkort", "Gereed, Vroege Toegang of Roadmap"],
  ["pilot- en roadmap-use cases", "vroege toegang- en roadmap-use cases"],
  ["Pilot- en binnenkort-modules op gedeelde bewijslagen", "Modules in vroege toegang en roadmap op gedeelde bewijslagen"],
  ["Een pilotmodule voor", "Een module in vroege toegang voor"],
];

function fixExactPilotLabels(obj, locale) {
  const earlyAccess =
    locale === "en" ? "Early Access" : locale === "tr" ? "Erken Erişim" : "Vroege Toegang";

  return walk(obj, (str, keyPath) => {
    if (str === "Pilot") return earlyAccess;
    return str;
  });
}

function patchStatusLabels(obj, locale) {
  const homeModStatus = obj?.home?.modules?.status;
  if (homeModStatus?.pilot) {
    homeModStatus.pilot =
      locale === "en" ? "Early Access" : locale === "tr" ? "Erken Erişim" : "Vroege Toegang";
  }

  const roadmapLegend = obj?.home?.platformRoadmap?.maturityLegend;
  if (roadmapLegend) {
    if (locale === "en") {
      roadmapLegend.ready = "Ready";
      roadmapLegend.pilot = "Early Access";
      roadmapLegend.comingSoon = "Roadmap";
    } else if (locale === "tr") {
      roadmapLegend.ready = "Kullanıma hazır";
      roadmapLegend.pilot = "Erken Erişim";
      roadmapLegend.comingSoon = "Yol Haritası";
    } else if (locale === "nl") {
      roadmapLegend.ready = "Gereed";
      roadmapLegend.pilot = "Vroege Toegang";
      roadmapLegend.comingSoon = "Roadmap";
    }
  }

  const roadmapStatus = obj?.home?.platformRoadmap?.status;
  if (roadmapStatus) {
    if (locale === "en") {
      roadmapStatus.pilot = "Early Access";
      roadmapStatus.comingSoon = "Roadmap";
    } else if (locale === "tr") {
      roadmapStatus.pilot = "Erken Erişim";
      roadmapStatus.comingSoon = "Yol Haritası";
    } else if (locale === "nl") {
      roadmapStatus.pilot = "Vroege Toegang";
      roadmapStatus.comingSoon = "Roadmap";
    }
  }

  const nav = obj?.nav?.status;
  if (nav) {
    if (locale === "en") {
      nav.pilot = "Early Access";
      nav.comingSoon = "Roadmap";
      nav.ready = "Ready";
      nav.roadmap = "Roadmap";
    } else if (locale === "tr") {
      nav.pilot = "Erken Erişim";
      nav.comingSoon = "Yol Haritası";
      nav.ready = "Kullanıma hazır";
      nav.roadmap = "Yol Haritası";
    } else if (locale === "nl") {
      nav.pilot = "Vroege Toegang";
      nav.comingSoon = "Roadmap";
      nav.ready = "Gereed";
      nav.roadmap = "Roadmap";
    }
  }

  const homeStatus = obj?.home?.platform?.status;
  if (homeStatus?.pilot) {
    homeStatus.pilot = locale === "en" ? "Early Access" : locale === "tr" ? "Erken Erişim" : "Vroege Toegang";
  }

  const shared = obj?.platformModules?.shared;
  if (shared) {
    if (locale === "en") {
      shared.discussPilot = "Request early access";
      shared.pilotNotice =
        "This module is in structured early access — previews reflect product direction, not full general availability";
    } else if (locale === "tr") {
      shared.discussPilot = "Erken Erişim Talep Edin";
      shared.pilotNotice =
        "Bu modül yapılandırılmış erken erişim kapsamındadır — önizlemeler genel kullanıma açık ürün durumunu değil, ürün yönünü yansıtır";
    } else if (locale === "nl") {
      shared.discussPilot = "Vroege toegang aanvragen";
      shared.pilotNotice =
        "Deze module is in gestructureerde vroege toegang — previews weerspiegelen productrichting, geen volledige beschikbaarheid";
    }
  }

  // Platform page pilot section labels
  const ppPilot = obj?.platformPage?.pilot;
  if (ppPilot) {
    if (locale === "en") {
      ppPilot.label = "Early Access";
      ppPilot.title = "Early Access modules";
      ppPilot.description =
        "Modules in structured early access — operational monitoring and extended compliance workflows without implying full product availability.";
    } else if (locale === "tr") {
      ppPilot.label = "Erken Erişim";
      ppPilot.title = "Erken Erişim Modülleri";
      ppPilot.description =
        "Yapılandırılmış erken erişimle sunulan modüller — operasyonel izleme ve genişletilmiş uyum iş akışları; tam ürün kullanılabilirliği ima edilmez.";
    } else if (locale === "nl") {
      ppPilot.label = "Vroege Toegang";
      ppPilot.title = "Modules in vroege toegang";
      ppPilot.description =
        "Modules in gestructureerde vroege toegang — operationele monitoring en uitgebreide compliance-workflows zonder volledige productbeschikbaarheid te impliceren.";
    }
  }

  const solPilot = obj?.solutionsPage?.pilot;
  if (solPilot) {
    if (locale === "en") {
      solPilot.label = "Early Access";
      solPilot.title = "Early access solution workflows";
      solPilot.description =
        "Extended use cases in structured early access — operational monitoring, packaging compliance and agricultural climate data workflows without implying full product availability";
    } else if (locale === "tr") {
      solPilot.label = "Erken Erişim";
      solPilot.title = "Erken erişim çözüm iş akışları";
      solPilot.description =
        "Yapılandırılmış erken erişimle sunulan genişletilmiş kullanım senaryoları — tam ürün kullanılabilirliği ima edilmez";
    } else if (locale === "nl") {
      solPilot.label = "Vroege Toegang";
      solPilot.title = "Oplossingsworkflows in vroege toegang";
      solPilot.description =
        "Uitgebreide use cases in gestructureerde vroege toegang — operationele monitoring, verpakkingscompliance en agrarische klimaatdata zonder volledige productbeschikbaarheid te impliceren";
    }
  }
}

function patchContextualCTAs(obj, locale) {
  // TR Başlayın → context-specific where possible via known paths
  if (locale === "tr") {
    if (obj?.common?.getStarted === "Başlayın") obj.common.getStarted = "Platformu İnceleyin";
    if (obj?.footer?.getStarted === "Başlayın") obj.footer.getStarted = "Demo Planlayın";
  }
}

for (const locale of ["en", "tr", "nl"]) {
  const file = path.join(ROOT, "messages", `${locale}.json`);
  let data = JSON.parse(fs.readFileSync(file, "utf8"));
  const pairs = locale === "en" ? EN_PAIRS : locale === "tr" ? TR_PAIRS : NL_PAIRS;

  data = walk(data, (str) => applyReplacements(str, pairs));
  patchStatusLabels(data, locale);
  data = fixExactPilotLabels(data, locale);
  patchContextualCTAs(data, locale);

  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(`Updated messages/${locale}.json`);
}

console.log("Done.");
