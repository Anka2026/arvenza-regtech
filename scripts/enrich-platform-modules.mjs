#!/usr/bin/env node
/**
 * Product page enrichment — maturity labels, structure keys, premium EN/TR/NL copy.
 * Run: node scripts/enrich-platform-modules.mjs
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

const NAV_STATUS = {
  en: {
    ready: "Ready",
    availableOnRequest: "Available on request",
    earlyAccess: "Early access",
    roadmap: "Roadmap",
    pilot: "Early access",
    comingSoon: "Roadmap",
  },
  tr: {
    ready: "Kullanıma hazır",
    availableOnRequest: "Talep üzerine erişilebilir",
    earlyAccess: "Erken erişim",
    roadmap: "Yol haritası",
    pilot: "Erken erişim",
    comingSoon: "Yol haritası",
  },
  nl: {
    ready: "Gereed voor gebruik",
    availableOnRequest: "Beschikbaar op aanvraag",
    earlyAccess: "Vroege toegang",
    roadmap: "Roadmap",
    pilot: "Vroege toegang",
    comingSoon: "Roadmap",
  },
};

const SHARED = {
  en: {
    whyEyebrow: "Why this product exists",
    capabilitiesEyebrow: "Core capabilities",
    workflowEyebrow: "Product workflow",
    audienceEyebrow: "Who it is for",
    outputsEyebrow: "Outputs",
    architectureEyebrow: "Platform architecture",
    earlyAccessNotice:
      "This module is in structured early access — previews reflect product direction, not full general availability",
    availableOnRequestNotice:
      "This module is available on request — previews show current capability scope; access is coordinated with our team",
    roadmapNotice:
      "This module is on the product roadmap — previews reflect planned capability direction, not live product availability",
    exploreProduct: "Explore product",
    requestAccess: "Request access",
    requestDemo: "Request a demo",
    viewWorkflow: "View workflow",
    followRoadmap: "Follow roadmap",
    architectureLayerLabel: "Architecture layer",
    architectureDataLabel: "Data structured",
    architectureEvidenceLabel: "Evidence managed",
    architectureOutputLabel: "Output supported",
    architectureLayers: {
      supplierEvidence: "Supplier evidence layer",
      productData: "Product data layer",
      calculationMethodology: "Calculation and methodology layer",
      documentationReporting: "Documentation and reporting layer",
    },
  },
  tr: {
    whyEyebrow: "Bu ürün neden var",
    capabilitiesEyebrow: "Temel yetenekler",
    workflowEyebrow: "Ürün iş akışı",
    audienceEyebrow: "Kimler için",
    outputsEyebrow: "Çıktılar",
    architectureEyebrow: "Platform mimarisi",
    earlyAccessNotice:
      "Bu modül yapılandırılmış erken erişim kapsamındadır — önizlemeler genel kullanıma açık ürün durumunu değil, ürün yönünü yansıtır",
    availableOnRequestNotice:
      "Bu modüle talep üzerine erişilebilir — önizlemeler mevcut yetenek kapsamını gösterir; erişim ekibimizle koordine edilir",
    roadmapNotice:
      "Bu modül ürün yol haritasındadır — önizlemeler planlanan yetenek yönünü yansıtır, canlı ürün kullanılabilirliğini göstermez",
    exploreProduct: "Ürünü inceleyin",
    requestAccess: "Erişim talep edin",
    requestDemo: "Demo planlayın",
    viewWorkflow: "İş akışını inceleyin",
    followRoadmap: "Yol haritasını takip edin",
    architectureLayerLabel: "Mimari katman",
    architectureDataLabel: "Yapılandırılan veri",
    architectureEvidenceLabel: "Yönetilen kanıt",
    architectureOutputLabel: "Desteklenen çıktı",
    architectureLayers: {
      supplierEvidence: "Tedarikçi kanıtı katmanı",
      productData: "Ürün verisi katmanı",
      calculationMethodology: "Hesaplama ve metodoloji katmanı",
      documentationReporting: "Dokümantasyon ve raporlama katmanı",
    },
  },
  nl: {
    whyEyebrow: "Waarom dit product bestaat",
    capabilitiesEyebrow: "Kernmogelijkheden",
    workflowEyebrow: "Productworkflow",
    audienceEyebrow: "Voor wie",
    outputsEyebrow: "Outputs",
    architectureEyebrow: "Platformarchitectuur",
    earlyAccessNotice:
      "Deze module is in gestructureerde vroege toegang — previews weerspiegelen productrichting, geen volledige beschikbaarheid",
    availableOnRequestNotice:
      "Deze module is beschikbaar op aanvraag — previews tonen de huidige capability-scope; toegang wordt met ons team gecoördineerd",
    roadmapNotice:
      "Deze module staat op de productroadmap — previews weerspiegelen geplande capability-richting, geen live beschikbaarheid",
    exploreProduct: "Product bekijken",
    requestAccess: "Toegang aanvragen",
    requestDemo: "Demo aanvragen",
    viewWorkflow: "Workflow bekijken",
    followRoadmap: "Roadmap volgen",
    architectureLayerLabel: "Architectuurlaag",
    architectureDataLabel: "Gestructureerde data",
    architectureEvidenceLabel: "Beheerd bewijs",
    architectureOutputLabel: "Ondersteunde output",
    architectureLayers: {
      supplierEvidence: "Leveranciersbewijslaag",
      productData: "Productdatalaag",
      calculationMethodology: "Berekenings- en methodologielaag",
      documentationReporting: "Documentatie- en rapportagelaag",
    },
  },
};

/** Per-module enrichment patches by locale */
const MODULE_PATCHES = {
  cbamComplianceConsole: {
    en: {
      category: "Operational control layer",
      title: "Operational control for CBAM evidence and reporting readiness",
      description:
        "An operational control layer for CBAM teams that need to coordinate supplier follow-up, evidence completeness, task ownership and reporting readiness across periods.",
      why: {
        title: "Why this product exists",
        description:
          "Once calculation work begins, CBAM teams need a structured view of evidence quality, open follow-ups and reporting-cycle readiness — without reverting to spreadsheet tracking.",
      },
      capabilities: {
        title: "Core capabilities",
        description: "Operational visibility across CBAM preparation — complementary to the ready Calculation Engine.",
        items: {
          item5: { title: "Missing data alerts", description: "Highlight gaps before they block calculation review or declaration preparation." },
          item6: { title: "Readiness overview", description: "Consolidated readiness view from data intake through evidence packaging." },
        },
      },
      outputs: {
        title: "What teams receive",
        description: "Structured operational outputs for recurring CBAM cycles.",
        items: {
          item1: { title: "Evidence completeness dashboard", description: "Period-level view of supplier evidence status and open gaps." },
          item2: { title: "Follow-up action queue", description: "Prioritized supplier and internal tasks linked to reporting scope." },
          item3: { title: "Readiness summary", description: "Handoff-ready overview before calculation review and declaration preparation." },
        },
      },
      architecture: {
        title: "How this product fits the Arvenza architecture",
        description: "The Compliance Console sits in the documentation and reporting layer, coordinating evidence state produced upstream.",
        layerKey: "documentationReporting",
        dataStructured: "Reporting-period scope, supplier lists, task ownership and readiness checkpoints",
        evidenceManaged: "Evidence completeness status, follow-up records and review queues across CBAM cycles",
        outputSupported: "Operational readiness views and coordinated handoff to declaration preparation",
      },
      audience: { title: "Who it is for" },
      cta: { title: "Request access to CBAM Compliance Console" },
    },
    tr: {
      category: "Operasyonel kontrol katmanı",
      title: "CBAM kanıt ve raporlama hazırlığı için operasyonel kontrol",
      description:
        "CBAM ekiplerinin tedarikçi takibini, kanıt tamlığını, görev sahipliğini ve raporlama dönemlerine göre hazırlık durumunu koordine etmesi için operasyonel kontrol katmanı.",
      why: {
        title: "Bu ürün neden var",
        description:
          "Hesaplama süreci başladığında CBAM ekiplerinin kanıt kalitesi, açık takipler ve raporlama döngüsü hazırlığı için yapılandırılmış bir görünüme ihtiyacı vardır — elektronik tablo takibine geri dönmeden.",
      },
      capabilities: {
        title: "Temel yetenekler",
        description: "CBAM hazırlığı genelinde operasyonel görünürlük — kullanıma hazır Calculation Engine'i tamamlar.",
        items: {
          item1: { title: "Tedarikçi takibi", description: "Dönem ve tedarikçi bazında iletişim, yanıt ve açık veri taleplerini izleyin." },
          item2: { title: "Kanıt durumu izleme", description: "Gönderim kalitesi, tamlık işaretleme ve eksik kanıtları döngüler genelinde izleyin." },
          item3: { title: "Görev sahipliği", description: "İç inceleme görevleri, tedarikçi eylemleri ve eskalasyon sahipliğini atayın ve takip edin." },
          item4: { title: "Son tarih görünürlüğü", description: "Raporlama dönemi kilometre taşlarını ve beyan penceresi hazırlık takvimini görün." },
          item5: { title: "Eksik veri uyarıları", description: "Hesaplama incelemesini veya beyan hazırlığını engellemeden önce boşlukları vurgulayın." },
          item6: { title: "Hazırlık özeti", description: "Veri alımından kanıt paketlemesine kadar birleşik hazırlık görünümü." },
        },
      },
      outputs: {
        title: "Ekiplerin elde ettiği çıktılar",
        description: "Tekrarlayan CBAM döngüleri için yapılandırılmış operasyonel çıktılar.",
        items: {
          item1: { title: "Kanıt tamlığı panosu", description: "Tedarikçi kanıt durumu ve açık boşlukların dönem bazlı görünümü." },
          item2: { title: "Takip eylem kuyruğu", description: "Raporlama kapsamına bağlı önceliklendirilmiş tedarikçi ve iç görevler." },
          item3: { title: "Hazırlık özeti", description: "Hesaplama incelemesi ve beyan hazırlığı öncesinde devredilebilir genel bakış." },
        },
      },
      architecture: {
        title: "Bu ürün Arvenza mimarisinde nereye oturur",
        description: "Compliance Console, yukarı akışta üretilen kanıt durumunu koordine eden dokümantasyon ve raporlama katmanında yer alır.",
        layerKey: "documentationReporting",
        dataStructured: "Raporlama dönemi kapsamı, tedarikçi listeleri, görev sahipliği ve hazırlık kontrol noktaları",
        evidenceManaged: "Kanıt tamlığı durumu, takip kayıtları ve CBAM döngüleri genelinde inceleme kuyrukları",
        outputSupported: "Operasyonel hazırlık görünümleri ve beyan hazırlığına koordineli devir",
      },
      audience: { title: "Kimler için" },
      cta: { title: "CBAM Compliance Console erişimi talep edin" },
    },
    nl: {
      category: "Operationele control-laag",
      title: "Operationele controle voor CBAM-bewijs en rapportagegereedheid",
      description:
        "Een operationele controlelaag voor CBAM-teams die leveranciersopvolging, bewijsvolledigheid, taakeigenaarschap en rapportagegereedheid over perioden moeten coördineren.",
      why: {
        title: "Waarom dit product bestaat",
        description:
          "Zodra berekeningswerk start, hebben CBAM-teams een gestructureerd beeld nodig van bewijskwaliteit, open opvolgingen en rapportagecyclus-gereedheid — zonder terug te vallen op spreadsheet-tracking.",
      },
      capabilities: {
        title: "Kernmogelijkheden",
        description: "Operationele zichtbaarheid in CBAM-voorbereiding — complementair aan de gereed Calculation Engine.",
        items: {
          item5: { title: "Ontbrekende-data-alerts", description: "Markeer hiaten voordat ze berekeningsreview of aangiftevoorbereiding blokkeren." },
          item6: { title: "Gereedheidsoverzicht", description: "Geconsolideerd gereedheidsbeeld van data-inname tot bewijspakkettering." },
        },
      },
      outputs: {
        title: "Wat teams ontvangen",
        description: "Gestructureerde operationele outputs voor terugkerende CBAM-cycli.",
        items: {
          item1: { title: "Bewijsvolledigheidsdashboard", description: "Periodeniveau-overzicht van leveranciersbewijsstatus en open hiaten." },
          item2: { title: "Opvolgactiewachtrij", description: "Geprioriteerde leveranciers- en interne taken gekoppeld aan rapportagescope." },
          item3: { title: "Gereedheidssamenvatting", description: "Overdraagbaar overzicht vóór berekeningsreview en aangiftevoorbereiding." },
        },
      },
      architecture: {
        title: "Hoe dit product past binnen de Arvenza-architectuur",
        description: "De Compliance Console zit in de documentatie- en rapportagelaag en coördineert upstream geproduceerde bewijsstatus.",
        layerKey: "documentationReporting",
        dataStructured: "Rapportageperiode-scope, leverancierslijsten, taakeigenaarschap en gereedheidscontrolepunten",
        evidenceManaged: "Bewijsvolledigheidsstatus, opvolgrecords en reviewwachtrijen over CBAM-cycli",
        outputSupported: "Operationele gereedheidsviews en gecoördineerde overdracht naar aangiftevoorbereiding",
      },
      audience: { title: "Voor wie" },
      cta: { title: "Toegang aanvragen tot CBAM Compliance Console" },
    },
  },
  ppwr: {
    en: {
      category: "Packaging data layer",
      description:
        "A packaging-data preparation layer for packaging BOMs, recycled-content evidence, supplier documentation and product-family readiness.",
      why: {
        title: "Why this product exists",
        description:
          "PPWR preparation requires material-level packaging data, supplier evidence and product-family traceability — structured before requirements become operationally binding.",
      },
      capabilities: {
        title: "Core capabilities",
        description: "Packaging data structuring and evidence preparation for PPWR readiness.",
        items: {
          item5: { title: "Material data readiness", description: "Track completeness of material attributes required for packaging compliance review." },
          item6: { title: "Documentation traceability", description: "Link packaging records to supplier evidence files and review status." },
        },
      },
      outputs: {
        title: "What teams receive",
        description: "Structured packaging data outputs for internal review and regulatory readiness planning.",
        items: {
          item1: { title: "Packaging BOM register", description: "Organized material compositions by SKU and product family." },
          item2: { title: "Recycled-content evidence pack", description: "Supplier attestations linked to packaging components." },
          item3: { title: "Readiness review file", description: "Documentation bundle for internal sign-off before operational cycles." },
        },
      },
      architecture: {
        title: "How this product fits the Arvenza architecture",
        description: "PPWR module structures product and packaging data while managing supplier evidence in the product data layer.",
        layerKey: "productData",
        dataStructured: "Packaging BOMs, product-family mapping and material composition records",
        evidenceManaged: "Recycled-content attestations, supplier packaging declarations and supporting documents",
        outputSupported: "Review-ready packaging data bundles and documentation traceability",
      },
      audience: { title: "Who it is for" },
      cta: { title: "Request access to PPWR packaging compliance" },
    },
    tr: {
      category: "Ambalaj verisi katmanı",
      description:
        "Ambalaj ürün ağaçları, geri dönüştürülmüş içerik kanıtı, tedarikçi dokümantasyonu ve ürün ailesi hazırlığı için ambalaj verisi hazırlık katmanı.",
      why: {
        title: "Bu ürün neden var",
        description:
          "PPWR hazırlığı; malzeme düzeyinde ambalaj verisi, tedarikçi kanıtı ve ürün ailesi izlenebilirliği gerektirir — gereksinimler operasyonel bağlayıcı hale gelmeden önce yapılandırılmalıdır.",
      },
      capabilities: {
        title: "Temel yetenekler",
        description: "PPWR hazırlığı için ambalaj verisi yapılandırma ve kanıt hazırlığı.",
        items: {
          item1: { title: "Ambalaj BOM yapısı", description: "Malzeme bileşimlerini, parça referanslarını ve ürün ailesi ambalaj mantığını yapılandırın." },
          item2: { title: "Geri dönüştürülmüş içerik kanıtı", description: "Malzeme ve SKU bazında geri dönüştürülmüş içerik kanıtını ve tedarikçi beyanlarını düzenleyin." },
          item3: { title: "Tedarikçi doküman toplama", description: "Ambalajla ilgili tedarikçi beyanları ve destekleyici dokümantasyonu toplayın." },
          item4: { title: "Ambalaj ailesi eşlemesi", description: "SKU ve ürün ailesi düzeyinde ambalaj kapsamını haritalayın." },
          item5: { title: "Malzeme verisi hazırlığı", description: "Ambalaj uyum incelemesi için gerekli malzeme niteliklerinin tamlığını izleyin." },
          item6: { title: "Dokümantasyon izlenebilirliği", description: "Ambalaj kayıtlarını tedarikçi kanıt dosyalarına ve inceleme durumuna bağlayın." },
        },
      },
      outputs: {
        title: "Ekiplerin elde ettiği çıktılar",
        description: "İç inceleme ve düzenleyici hazırlık planlaması için yapılandırılmış ambalaj verisi çıktıları.",
        items: {
          item1: { title: "Ambalaj BOM kaydı", description: "SKU ve ürün ailesi bazında düzenlenmiş malzeme bileşimleri." },
          item2: { title: "Geri dönüştürülmüş içerik kanıt paketi", description: "Ambalaj bileşenlerine bağlı tedarikçi beyanları." },
          item3: { title: "Hazırlık inceleme dosyası", description: "Operasyonel döngüler öncesinde iç onay için dokümantasyon paketi." },
        },
      },
      architecture: {
        title: "Bu ürün Arvenza mimarisinde nereye oturur",
        description: "PPWR modülü, ürün verisi katmanında ambalaj verisini yapılandırırken tedarikçi kanıtını yönetir.",
        layerKey: "productData",
        dataStructured: "Ambalaj BOM'ları, ürün ailesi eşlemesi ve malzeme bileşimi kayıtları",
        evidenceManaged: "Geri dönüştürülmüş içerik beyanları, tedarikçi ambalaj bildirimleri ve destekleyici dokümanlar",
        outputSupported: "İncelemeye hazır ambalaj verisi paketleri ve dokümantasyon izlenebilirliği",
      },
      audience: { title: "Kimler için" },
      cta: { title: "PPWR ambalaj uyumu erişimi talep edin" },
    },
    nl: {
      category: "Verpakkingsdatalaag",
      description:
        "Een verpakkingsdata-voorbereidingslaag voor verpakking-BOM's, gerecycled-contentbewijs, leveranciersdocumentatie en productfamilie-gereedheid.",
      why: {
        title: "Waarom dit product bestaat",
        description:
          "PPWR-voorbereiding vereist verpakkingsdata op materiaalniveau, leveranciersbewijs en productfamilie-traceerbaarheid — gestructureerd voordat vereisten operationeel bindend worden.",
      },
      capabilities: {
        title: "Kernmogelijkheden",
        items: {
          item5: { title: "Materiaaldata-gereedheid", description: "Volg volledigheid van materiaalattributen voor verpakkingscompliance-review." },
          item6: { title: "Documentatie-traceerbaarheid", description: "Koppel verpakkingsrecords aan leveranciersbewijsbestanden en reviewstatus." },
        },
      },
      outputs: {
        title: "Wat teams ontvangen",
        items: {
          item1: { title: "Verpakking-BOM-register", description: "Georganiseerde materiaalsamenstellingen per SKU en productfamilie." },
          item2: { title: "Gerecycled-contentbewijspakket", description: "Leveranciersattesten gekoppeld aan verpakkingscomponenten." },
          item3: { title: "Gereedheidsreviewbestand", description: "Documentatiebundel voor interne goedkeuring vóór operationele cycli." },
        },
      },
      architecture: {
        title: "Hoe dit product past binnen de Arvenza-architectuur",
        layerKey: "productData",
        dataStructured: "Verpakking-BOM's, productfamilie-mapping en materiaalsamenstellingrecords",
        evidenceManaged: "Gerecycled-contentattesten, leveranciersverklaringen en ondersteunende documenten",
        outputSupported: "Reviewklare verpakkingsdatabundels en documentatie-traceerbaarheid",
      },
      audience: { title: "Voor wie" },
      cta: { title: "Toegang aanvragen tot PPWR-verpakkingscompliance" },
    },
  },
};

// Load extended patches from companion file if present
const extPath = path.join(ROOT, "scripts", "platform-modules-enriched-ext.json");
if (fs.existsSync(extPath)) {
  const ext = JSON.parse(fs.readFileSync(extPath, "utf8"));
  for (const [key, locales] of Object.entries(ext.modules ?? {})) {
    MODULE_PATCHES[key] = MODULE_PATCHES[key] ?? {};
    for (const [loc, patch] of Object.entries(locales)) {
      MODULE_PATCHES[key][loc] = deepMerge(MODULE_PATCHES[key][loc] ?? {}, patch);
    }
  }
  if (ext.cbamPlatform) {
    globalThis.CBAM_PATCHES = ext.cbamPlatform;
  }
}

const CBAM_PATCHES = globalThis.CBAM_PATCHES ?? {
  en: {
    hero: {
      ctaPrimary: "Request a demo",
      ctaSecondary: "View workflow",
    },
    challenge: { title: "Why this product exists" },
    outputs: {
      eyebrow: "Outputs",
      title: "Declaration-ready outputs from one product flow",
      description: "Structured outputs teams use across recurring CBAM reporting cycles.",
      items: {
        item1: { title: "Embedded emissions results", description: "Product-level calculations with methodology traceability." },
        item2: { title: "Evidence packs", description: "Review-ready files linking supplier data, documents and methodology notes." },
        item3: { title: "Declaration-ready exports", description: "Formatted outputs for importers, internal sign-off and verifier briefing." },
      },
    },
    architecture: {
      title: "How this product fits the Arvenza architecture",
      description: "CBAM Calculation Engine spans the calculation and methodology layer, connecting supplier evidence to documentation outputs.",
      layerKey: "calculationMethodology",
      dataStructured: "CN scope, supplier inputs, installation records and reporting-period context",
      evidenceManaged: "Supplier declarations, supporting documents, methodology notes and quality flags",
      outputSupported: "Embedded emissions results, evidence packs and declaration-ready CBAM outputs",
    },
    cta: { primary: "Request a demo", secondary: "Explore product" },
  },
  tr: {
    hero: {
      ctaPrimary: "Demo planlayın",
      ctaSecondary: "İş akışını inceleyin",
    },
    challenge: { title: "Bu ürün neden var" },
    outputs: {
      eyebrow: "Çıktılar",
      title: "Tek ürün akışından beyana hazır çıktılar",
      description: "Ekiplerin tekrarlayan CBAM raporlama döngülerinde kullandığı yapılandırılmış çıktılar.",
      items: {
        item1: { title: "Gömülü emisyon sonuçları", description: "Metodoloji izlenebilirliği ile ürün düzeyinde hesaplamalar." },
        item2: { title: "Kanıt paketleri", description: "Tedarikçi verisi, dokümanlar ve metodoloji notlarını bağlayan incelemeye hazır dosyalar." },
        item3: { title: "Beyana hazır dışa aktarımlar", description: "İthalatçılar, iç onay ve doğrulayıcı brifingi için biçimlendirilmiş çıktılar." },
      },
    },
    architecture: {
      title: "Bu ürün Arvenza mimarisinde nereye oturur",
      description: "CBAM Calculation Engine, tedarikçi kanıtını dokümantasyon çıktılarına bağlayan hesaplama ve metodoloji katmanını kapsar.",
      layerKey: "calculationMethodology",
      dataStructured: "CN kapsamı, tedarikçi girdileri, tesis kayıtları ve raporlama dönemi bağlamı",
      evidenceManaged: "Tedarikçi beyanları, destekleyici dokümanlar, metodoloji notları ve kalite işaretleri",
      outputSupported: "Gömülü emisyon sonuçları, kanıt paketleri ve beyana hazır CBAM çıktıları",
    },
    cta: { primary: "Demo planlayın", secondary: "Ürünü inceleyin" },
  },
  nl: {
    hero: {
      ctaPrimary: "Demo aanvragen",
      ctaSecondary: "Workflow bekijken",
    },
    challenge: { title: "Waarom dit product bestaat" },
    outputs: {
      eyebrow: "Outputs",
      title: "Aangifteklare outputs uit één productflow",
      items: {
        item1: { title: "Ingebedde emissieresultaten", description: "Productniveau-berekeningen met methodologie-traceerbaarheid." },
        item2: { title: "Bewijspakketten", description: "Reviewklare bestanden met leveranciersdata, documenten en methodologienotities." },
        item3: { title: "Aangifteklare exports", description: "Geformatteerde outputs voor importeurs, interne goedkeuring en verifier-briefing." },
      },
    },
    architecture: {
      title: "Hoe dit product past binnen de Arvenza-architectuur",
      layerKey: "calculationMethodology",
      dataStructured: "CN-scope, leveranciersinputs, installatierecords en rapportageperiode-context",
      evidenceManaged: "Leveranciersverklaringen, ondersteunende documenten, methodologienotities en kwaliteitsvlaggen",
      outputSupported: "Ingebedde emissieresultaten, bewijspakketten en aangifteklare CBAM-outputs",
    },
    cta: { primary: "Demo aanvragen", secondary: "Product bekijken" },
  },
};

function sanitizePilotText(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/Discuss pilot access/gi, "Request access")
    .replace(/Pilot Erişimi Görüşelim/gi, "Erişim talep edin")
    .replace(/Pilottoegang bespreken/gi, "Toegang aanvragen")
    .replace(/\bpilot capability\b/gi, "early access capability")
    .replace(/\bpilot module\b/gi, "early access module")
    .replace(/\bpilot modül\b/gi, "erken erişim modülü")
    .replace(/\bpilot coordination layer\b/gi, "operational control layer")
    .replace(/\bpilot erişimini görüşün\b/gi, "erişim talep edin")
    .replace(/\bpilot product area\b/gi, "early access product area");
}

function walkStrings(obj, fn) {
  if (typeof obj === "string") return fn(obj);
  if (Array.isArray(obj)) return obj.map((v) => walkStrings(v, fn));
  if (obj && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      out[k] = walkStrings(v, fn);
    }
    return out;
  }
  return obj;
}

function patchModule(mod, patch) {
  const merged = deepMerge(mod, patch);
  if (patch.why) merged.why = patch.why;
  if (patch.audience) {
    merged.audience = deepMerge(mod.useCases ?? mod.audience ?? {}, patch.audience);
    merged.useCases = merged.audience;
  }
  if (patch.why && !merged.why.title) merged.why = patch.why;
  if (!merged.why && merged.positioning) {
    merged.why = merged.positioning;
  }
  return merged;
}

for (const locale of LOCALES) {
  const { file, data } = load(locale);
  data.nav.status = { ...data.nav.status, ...NAV_STATUS[locale] };
  data.platformModules.shared = deepMerge(data.platformModules.shared, SHARED[locale]);

  for (const [key, locales] of Object.entries(MODULE_PATCHES)) {
    const patch = locales[locale];
    if (!patch || !data.platformModules[key]) continue;
    data.platformModules[key] = patchModule(data.platformModules[key], patch);
  }

  const cbamPatch = CBAM_PATCHES[locale];
  if (cbamPatch) {
    if (cbamPatch.hero) Object.assign(data.cbamPlatform.hero, cbamPatch.hero);
    if (cbamPatch.challenge) Object.assign(data.cbamPlatform.challenge, cbamPatch.challenge);
    if (cbamPatch.outputs) data.cbamPlatform.outputs = cbamPatch.outputs;
    if (cbamPatch.architecture) data.cbamPlatform.architecture = cbamPatch.architecture;
    if (cbamPatch.cta) Object.assign(data.cbamPlatform.cta, cbamPatch.cta);
  }

  const expansionOnRequest = {
    en: "Available on request",
    tr: "Talep üzerine erişilebilir",
    nl: "Beschikbaar op aanvraag",
  };
  if (data.platformHub?.expansion) {
    data.platformHub.expansion.onRequestLabel = expansionOnRequest[locale];
  }

  data.platformModules = walkStrings(data.platformModules, sanitizePilotText);
  save({ file, data });
  console.log(`✓ ${locale}: enriched`);
}

console.log("Done. Run: node scripts/platform-modules-enriched-ext.mjs for remaining modules if ext file exists.");
