#!/usr/bin/env node
/**
 * Resources / knowledge hub enrichment — categories, 8 resources, CN checker copy, premium TR/NL.
 * Run: node scripts/enrich-resources-hub.mjs
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

const PATCHES = {
  en: {
    eyebrow: "Resources",
    title: "Resources and implementation guides",
    description:
      "Practical tools, checklists, templates and implementation notes for CBAM readiness, supplier evidence and EU sustainability compliance workflows.",
    positioning:
      "Product-backed resources for structuring supplier data, calculation inputs and evidence workflows — not generic blog content.",
    library: {
      title: "Resource library",
      description:
        "Filter by category to find tools, checklists, templates, regulatory notes and implementation guides aligned with Arvenza workflows.",
    },
    heroChips: {
      item1: "Interactive CN scope tool",
      item2: "Request-ready checklists",
      item3: "Clear resource status",
    },
    categories: {
      all: "All",
      tools: "Tools",
      checklists: "Checklists",
      templates: "Templates",
      regulatoryNotes: "Regulatory notes",
      implementationGuides: "Implementation guides",
    },
    toolSpotlight: {
      badge: "Featured tool",
      title: "CBAM CN Code Scope Checker",
      description:
        "Check whether a CN, HS or GTİP code appears in the listed CBAM product scope and review the related sector and evidence implications.",
      cta: "Open checker",
      secondaryCta: "View all tools",
    },
    detailPanel: {
      close: "Close",
      requestAccess: "Request via demo",
      followRoadmap: "View roadmap modules",
      getNotified: "Get notified when released",
    },
    resources: {
      cbamCnScope: {
        title: "CBAM CN Code Scope Checker",
        description:
          "Check whether a CN, HS or GTİP code appears in the listed CBAM product scope and review the related sector and evidence implications.",
        format: "Interactive tool",
        cta: "Open checker",
        valuePreview: {
          item1: "Annex I scope screening against listed CN codes",
          item2: "Sector context and evidence workflow pointers",
        },
        detail:
          "Run an initial scope screening against listed CBAM product codes. Results support internal triage — not a legal classification decision.",
      },
      cbamChecklist: {
        title: "CBAM Readiness Checklist",
        description:
          "A practical checklist for product scope, supplier data, calculation inputs and evidence gaps before the next reporting cycle.",
        format: "Checklist",
        cta: "Request checklist",
        valuePreview: {
          item1: "Product scope and CN mapping checkpoints",
          item2: "Supplier data and evidence gap review",
        },
        detail:
          "Request the checklist to structure CBAM preparation before your next reporting cycle. Delivered through our team — not an automated download.",
      },
      supplierTemplate: {
        title: "Supplier Data Request Template",
        description:
          "A structured supplier request template for collecting activity data, product information, emissions evidence and supporting documentation.",
        format: "Template",
        cta: "Request template",
        valuePreview: {
          item1: "Structured supplier outreach fields",
          item2: "Evidence and installation-level data requests",
        },
        detail:
          "Request the template to standardize supplier data collection. Shared by our team when you request access — no fake PDF download.",
      },
      embeddedEmissionsGuide: {
        title: "Embedded Emissions Data Guide",
        description:
          "A practical guide to the data fields, supplier evidence and calculation inputs required for embedded emissions workflows.",
        format: "Implementation guide",
        cta: "Read guide",
        valuePreview: {
          item1: "Direct and indirect emissions data fields",
          item2: "Methodology traceability expectations",
        },
        detail:
          "Guide in preparation. Subscribe below to receive it when released. Covers calculation inputs and supplier evidence — not a downloadable file yet.",
      },
      ppwrPackaging: {
        title: "PPWR Packaging Data Preparation Note",
        description:
          "A preparation note for packaging BOMs, recycled-content evidence, supplier documentation and packaging family mapping.",
        format: "Regulatory note",
        cta: "View note",
        valuePreview: {
          item1: "Packaging BOM structuring overview",
          item2: "Recycled-content evidence preparation",
        },
        detail:
          "Preparation note for PPWR-aligned packaging data workflows. In development — subscribe for release notification.",
      },
      eudrBrief: {
        title: "EUDR Due Diligence Starter Note",
        description:
          "A starter note for supplier traceability, geolocation evidence, risk screening and due-diligence documentation.",
        format: "Regulatory note",
        cta: "View note",
        valuePreview: {
          item1: "Supplier traceability preparation",
          item2: "Geolocation and risk screening structure",
        },
        detail:
          "Roadmap starter note aligned with planned EUDR due diligence workflows on the Arvenza platform.",
      },
      dppDataModelBrief: {
        title: "Digital Product Passport Data Model Brief",
        description:
          "A brief on product identity, material composition, sustainability evidence and documentation structures needed for DPP readiness.",
        format: "Implementation brief",
        cta: "Read brief",
        valuePreview: {
          item1: "Product identity and material composition fields",
          item2: "Documentation structures for passport readiness",
        },
        detail:
          "Roadmap brief on product-data structures for Digital Product Passport preparation.",
      },
      esgEvidenceStructure: {
        title: "ESG Evidence File Structure",
        description:
          "A practical structure for organizing ESG source documentation, evidence ownership, disclosure preparation and internal review readiness.",
        format: "Template structure",
        cta: "View structure",
        valuePreview: {
          item1: "ESG evidence library organization",
          item2: "Disclosure preparation and review checkpoints",
        },
        detail:
          "Template structure in preparation for ESG evidence and reporting workflows. Subscribe to receive it when released.",
      },
    },
    cnScopeChecker: {
      invalidCodeTitle: "Enter a valid CN / HS / GTİP code",
      invalidCodeMessage: "Enter an 8-digit CN code or search by product keyword.",
    },
  },
  tr: {
    eyebrow: "Kaynaklar",
    title: "Kaynaklar ve uygulama rehberleri",
    description:
      "CBAM hazırlığı, tedarikçi kanıtı ve AB sürdürülebilirlik uyum iş akışları için pratik araçlar, kontrol listeleri, şablonlar ve uygulama notları.",
    positioning:
      "Tedarikçi verisi, hesaplama girdileri ve kanıt iş akışlarını yapılandırmak için ürün destekli kaynaklar — genel blog içeriği değil.",
    library: {
      title: "Kaynak kütüphanesi",
      description:
        "Araçlar, kontrol listeleri, şablonlar, regülasyon notları ve uygulama rehberleri arasında filtreleyerek Arvenza iş akışlarıyla uyumlu kaynakları bulun.",
    },
    heroChips: {
      item1: "Etkileşimli CN kapsam aracı",
      item2: "Talep edilebilir kontrol listeleri",
      item3: "Net kaynak durumu",
    },
    categories: {
      all: "Tümü",
      tools: "Araçlar",
      checklists: "Kontrol listeleri",
      templates: "Şablonlar",
      regulatoryNotes: "Regülasyon notları",
      implementationGuides: "Uygulama rehberleri",
    },
    toolSpotlight: {
      badge: "Öne çıkan araç",
      title: "CBAM CN Kod Kapsam Kontrol Aracı",
      description:
        "CN, HS veya GTİP kodunun listelenen CBAM ürün kapsamı içinde yer alıp almadığını kontrol edin; ilgili sektör ve kanıt gerekliliklerini görüntüleyin.",
      cta: "Kontrol aracını aç",
      secondaryCta: "Tüm araçları görüntüleyin",
    },
    detailPanel: {
      close: "Kapat",
      requestAccess: "Demo üzerinden talep edin",
      followRoadmap: "Yol haritası modüllerini inceleyin",
      getNotified: "Yayınlandığında bilgilendirilme",
    },
    resources: {
      cbamCnScope: {
        title: "CBAM CN Kod Kapsam Kontrol Aracı",
        description:
          "CN, HS veya GTİP kodunun listelenen CBAM ürün kapsamı içinde yer alıp almadığını kontrol edin; ilgili sektör ve kanıt gerekliliklerini görüntüleyin.",
        format: "Etkileşimli araç",
        cta: "Kontrol aracını aç",
        valuePreview: {
          item1: "Ek-I kapsamına göre listelenen CN kodları taraması",
          item2: "Sektör bağlamı ve kanıt iş akışı yönlendirmeleri",
        },
        detail:
          "Listelenen CBAM ürün kodlarına karşı ön kapsam taraması yapın. Sonuçlar iç triyaj içindir — hukuki sınıflandırma kararı değildir.",
      },
      cbamChecklist: {
        title: "CBAM Hazırlık Kontrol Listesi",
        description:
          "Bir sonraki raporlama dönemi öncesinde ürün kapsamı, tedarikçi verisi, hesaplama girdileri ve kanıt boşluklarını yapılandırmak için pratik kontrol listesi.",
        format: "Kontrol listesi",
        cta: "Kontrol listesini talep edin",
        valuePreview: {
          item1: "Ürün kapsamı ve CN eşleme kontrol noktaları",
          item2: "Tedarikçi verisi ve kanıt boşluğu incelemesi",
        },
        detail:
          "CBAM hazırlığını bir sonraki raporlama dönemi öncesinde yapılandırmak için kontrol listesini talep edin. Ekibimiz aracılığıyla iletilir — otomatik indirme değildir.",
      },
      supplierTemplate: {
        title: "Tedarikçi Veri Talep Şablonu",
        description:
          "Faaliyet verisi, ürün bilgisi, emisyon kanıtı ve destekleyici dokümantasyonu toplamak için yapılandırılmış tedarikçi veri talep şablonu.",
        format: "Şablon",
        cta: "Şablonu talep edin",
        valuePreview: {
          item1: "Yapılandırılmış tedarikçi iletişim alanları",
          item2: "Kanıt ve tesis düzeyinde veri talepleri",
        },
        detail:
          "Tedarikçi veri toplamayı standartlaştırmak için şablonu talep edin. Erişim talebinde ekibimiz tarafından paylaşılır — sahte PDF indirme yoktur.",
      },
      embeddedEmissionsGuide: {
        title: "Gömülü Emisyon Verisi Rehberi",
        description:
          "Gömülü emisyon iş akışları için gerekli veri alanları, tedarikçi kanıtı ve hesaplama girdilerine yönelik pratik rehber.",
        format: "Uygulama rehberi",
        cta: "Rehberi inceleyin",
        valuePreview: {
          item1: "Doğrudan ve dolaylı emisyon veri alanları",
          item2: "Metodoloji izlenebilirliği beklentileri",
        },
        detail:
          "Rehber hazırlanmaktadır. Yayınlandığında almak için aşağıdan abone olun. Hesaplama girdileri ve tedarikçi kanıtını kapsar — henüz indirilebilir dosya değildir.",
      },
      ppwrPackaging: {
        title: "PPWR Ambalaj Verisi Hazırlık Notu",
        description:
          "Ambalaj ürün ağaçları, geri dönüştürülmüş içerik kanıtı, tedarikçi dokümantasyonu ve ambalaj ailesi eşlemesi için hazırlık notu.",
        format: "Regülasyon notu",
        cta: "Notu inceleyin",
        valuePreview: {
          item1: "Ambalaj BOM yapılandırma özeti",
          item2: "Geri dönüştürülmüş içerik kanıtı hazırlığı",
        },
        detail:
          "PPWR uyumlu ambalaj verisi iş akışları için hazırlık notu. Geliştirme aşamasında — yayın bildirimi için abone olun.",
      },
      eudrBrief: {
        title: "EUDR Durum Tespiti Başlangıç Notu",
        description:
          "Tedarikçi izlenebilirliği, coğrafi konum kanıtı, risk taraması ve durum tespiti dokümantasyonu için başlangıç notu.",
        format: "Regülasyon notu",
        cta: "Notu inceleyin",
        valuePreview: {
          item1: "Tedarikçi izlenebilirliği hazırlığı",
          item2: "Coğrafi konum ve risk taraması yapısı",
        },
        detail:
          "Arvenza platformundaki planlanan EUDR durum tespiti iş akışlarıyla uyumlu yol haritası başlangıç notu.",
      },
      dppDataModelBrief: {
        title: "Dijital Ürün Pasaportu Veri Modeli Özeti",
        description:
          "DPP hazırlığı için ürün kimliği, malzeme bileşimi, sürdürülebilirlik kanıtı ve dokümantasyon yapıları hakkında kısa uygulama notu.",
        format: "Uygulama özeti",
        cta: "Notu inceleyin",
        valuePreview: {
          item1: "Ürün kimliği ve malzeme bileşimi alanları",
          item2: "Pasaport hazırlığı için dokümantasyon yapıları",
        },
        detail:
          "Dijital Ürün Pasaportu hazırlığı için ürün verisi yapıları hakkında yol haritası özeti.",
      },
      esgEvidenceStructure: {
        title: "ESG Kanıt Dosya Yapısı",
        description:
          "ESG kaynak dokümantasyonu, kanıt sahipliği, beyan hazırlığı ve iç gözden geçirme hazırlığı için pratik dosya yapısı.",
        format: "Şablon yapısı",
        cta: "Yapıyı inceleyin",
        valuePreview: {
          item1: "ESG kanıt kütüphanesi organizasyonu",
          item2: "Beyan hazırlığı ve inceleme kontrol noktaları",
        },
        detail:
          "ESG kanıt ve raporlama iş akışları için şablon yapısı hazırlanmaktadır. Yayınlandığında almak için abone olun.",
      },
    },
    cnScopeChecker: {
      invalidCodeTitle: "Geçerli bir CN / HS / GTİP kodu girin",
      invalidCodeMessage: "8 haneli bir CN/GTİP kodu girin veya ürün anahtar kelimesiyle arayın.",
    },
  },
  nl: {
    eyebrow: "Resources",
    title: "Resources en implementatiegidsen",
    description:
      "Praktische tools, checklists, templates en implementatienotities voor CBAM-gereedheid, leveranciersbewijs en EU-duurzaamheidscompliance-workflows.",
    positioning:
      "Productgesteunde resources voor het structureren van leveranciersdata, berekeningsinput en bewijsworkflows — geen generieke blogcontent.",
    library: {
      title: "Resourcebibliotheek",
      description:
        "Filter op categorie voor tools, checklists, templates, regelgevingsnotities en implementatiegidsen afgestemd op Arvenza-workflows.",
    },
    heroChips: {
      item1: "Interactieve CN-scope-tool",
      item2: "Op aanvraag beschikbare checklists",
      item3: "Duidelijke resourcestatus",
    },
    categories: {
      all: "Alles",
      tools: "Tools",
      checklists: "Checklists",
      templates: "Templates",
      regulatoryNotes: "Regelgevingsnotities",
      implementationGuides: "Implementatiegidsen",
    },
    toolSpotlight: {
      badge: "Uitgelichte tool",
      title: "CBAM CN-code scope checker",
      description:
        "Controleer of een CN-, HS- of GTİP-code voorkomt in de vermelde CBAM-productscope en bekijk de bijbehorende sector en bewijsvereisten.",
      cta: "Checker openen",
      secondaryCta: "Alle tools bekijken",
    },
    detailPanel: {
      close: "Sluiten",
      requestAccess: "Aanvragen via demo",
      followRoadmap: "Roadmapmodules bekijken",
      getNotified: "Melding bij release",
    },
    resources: {
      cbamCnScope: {
        title: "CBAM CN-code scope checker",
        description:
          "Controleer of een CN-, HS- of GTİP-code voorkomt in de vermelde CBAM-productscope en bekijk de bijbehorende sector en bewijsvereisten.",
        format: "Interactieve tool",
        cta: "Checker openen",
        valuePreview: {
          item1: "Scope-screening tegen vermelde CN-codes (bijlage I)",
          item2: "Sectorcontext en bewijsworkflow-aanwijzingen",
        },
        detail:
          "Voer een eerste scope-screening uit tegen vermelde CBAM-productcodes. Resultaten ondersteunen interne triage — geen juridische classificatie.",
      },
      cbamChecklist: {
        title: "CBAM-gereedheidschecklist",
        description:
          "Een praktische checklist voor productscope, leveranciersdata, berekeningsinput en bewijsleemtes vóór de volgende rapportagecyclus.",
        format: "Checklist",
        cta: "Checklist aanvragen",
        valuePreview: {
          item1: "Productscope- en CN-mappingcontroles",
          item2: "Review van leveranciersdata en bewijshiaten",
        },
        detail:
          "Vraag de checklist aan om CBAM-voorbereiding te structureren. Gedeeld door ons team — geen automatische download.",
      },
      supplierTemplate: {
        title: "Template voor leveranciersdataverzoek",
        description:
          "Een gestructureerde template voor leveranciersdataverzoeken om activiteitsdata, productinformatie, emissiebewijs en ondersteunende documentatie te verzamelen.",
        format: "Template",
        cta: "Template aanvragen",
        valuePreview: {
          item1: "Gestructureerde leverancierscommunicatievelden",
          item2: "Bewijs- en installatieniveau-dataverzoeken",
        },
        detail:
          "Vraag de template aan om leveranciersdatacollectie te standaardiseren. Geen nep-PDF-download.",
      },
      embeddedEmissionsGuide: {
        title: "Gids voor ingebedde-emissiedata",
        description:
          "Een praktische gids voor datavelden, leveranciersbewijs en berekeningsinput voor workflows rond ingebedde emissies.",
        format: "Implementatiegids",
        cta: "Gids bekijken",
        valuePreview: {
          item1: "Datavelden voor directe en indirecte emissies",
          item2: "Verwachtingen voor methodologie-traceerbaarheid",
        },
        detail:
          "Gids in voorbereiding. Abonneer u hieronder om deze te ontvangen wanneer beschikbaar.",
      },
      ppwrPackaging: {
        title: "PPWR-notitie verpakkingsdatavoorbereiding",
        description:
          "Een voorbereidingsnotitie voor verpakking-BOM's, bewijs voor gerecyclede inhoud, leveranciersdocumentatie en verpakkingfamilie-mapping.",
        format: "Regelgevingsnotitie",
        cta: "Notitie bekijken",
        valuePreview: {
          item1: "Overzicht verpakking-BOM-structurering",
          item2: "Voorbereiding bewijs gerecyclede inhoud",
        },
        detail:
          "Voorbereidingsnotitie voor PPWR-verpakkingdataworkflows. In ontwikkeling.",
      },
      eudrBrief: {
        title: "EUDR due diligence-startnotitie",
        description:
          "Een startnotitie voor leveranciers­traceerbaarheid, geolocatiebewijs, risicoscreening en due-diligence-documentatie.",
        format: "Regelgevingsnotitie",
        cta: "Notitie bekijken",
        valuePreview: {
          item1: "Voorbereiding leveranciers­traceerbaarheid",
          item2: "Geolocatie- en risicoscreeningstructuur",
        },
        detail:
          "Roadmap-startnotitie afgestemd op geplande EUDR due diligence-workflows op het Arvenza-platform.",
      },
      dppDataModelBrief: {
        title: "DPP-datamodel brief",
        description:
          "Een korte notitie over productidentiteit, materiaalsamenstelling, duurzaamheidsbewijs en documentatiestructuren voor DPP-gereedheid.",
        format: "Implementatiebrief",
        cta: "Brief bekijken",
        valuePreview: {
          item1: "Productidentiteit- en materiaalsamenstellingvelden",
          item2: "Documentatiestructuren voor paspoortgereedheid",
        },
        detail:
          "Roadmap-brief over productdatastructuren voor Digital Product Passport-voorbereiding.",
      },
      esgEvidenceStructure: {
        title: "ESG-bewijsbestandsstructuur",
        description:
          "Een praktische structuur voor ESG-brondocumentatie, bewijseigenaarschap, rapportagevoorbereiding en interne reviewgereedheid.",
        format: "Templatestructuur",
        cta: "Structuur bekijken",
        valuePreview: {
          item1: "Organisatie ESG-bewijsbibliotheek",
          item2: "Rapportagevoorbereiding en reviewcontroles",
        },
        detail:
          "Templatestructuur in voorbereiding voor ESG-bewijs- en rapportageworkflows.",
      },
    },
    cnScopeChecker: {
      invalidCodeTitle: "Voer een geldige CN-/HS-/GTİP-code in",
      invalidCodeMessage: "Voer een 8-cijferige CN-code in of zoek op producttrefwoord.",
    },
  },
};

function deepMerge(target, source) {
  const out = { ...target };
  for (const [k, v] of Object.entries(source)) {
    if (v && typeof v === "object" && !Array.isArray(v) && target[k] && typeof target[k] === "object") {
      out[k] = deepMerge(target[k], v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

for (const locale of LOCALES) {
  const { file, data } = load(locale);
  data.resourcesPage = deepMerge(data.resourcesPage, PATCHES[locale]);
  save({ file, data });
  console.log(`✓ ${locale}: resources hub enriched`);
}

console.log("Resources hub enrichment complete.");
