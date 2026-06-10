#!/usr/bin/env node
/**
 * Full TR/NL non-platform copy + EN supplement for component-required keys.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    const value = source[key];
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      target[key] &&
      typeof target[key] === "object" &&
      !Array.isArray(target[key])
    ) {
      deepMerge(target[key], value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

const enSupplement = {
  industriesPage: {
    items: {
      steelAluminium: {
        title: "Steel & Aluminium",
        regulatoryPressure: "CBAM reporting pressure on covered metal exports",
        sectorSignal: "Installation-level emissions data across multiple CN codes and suppliers",
        operationalChallenge:
          "Coordinating supplier emissions inputs, installation references and evidence quality before each quarterly reporting cycle",
      },
      automotive: {
        title: "Automotive Supply Chains",
        regulatoryPressure: "CBAM material evidence plus expanding product-data requirements",
        sectorSignal: "Multi-tier supplier complexity across materials and components",
        operationalChallenge:
          "Aligning CBAM preparation with broader product and supplier documentation workflows",
      },
      packagingFmcg: {
        title: "Packaging & FMCG",
        regulatoryPressure: "PPWR packaging data and supplier evidence preparation",
        sectorSignal: "Material-level BOM data and recycled-content documentation needs",
        operationalChallenge:
          "Structuring packaging supplier evidence before requirements become operationally binding",
      },
      electronicsBatteries: {
        title: "Electronics & Batteries",
        regulatoryPressure: "Digital Product Passport and component traceability preparation",
        sectorSignal: "Component documentation and supplier evidence across product families",
        operationalChallenge:
          "Building product-level data structures before passport requirements scale",
      },
      agricultureFood: {
        title: "Agriculture & Food",
        regulatoryPressure: "EUDR and agricultural climate evidence expectations",
        sectorSignal: "Producer-level records and geolocation evidence across commodity chains",
        operationalChallenge:
          "Structuring farm-level data and traceability documentation across suppliers",
      },
      importersExporters: {
        title: "Importers & Exporters",
        regulatoryPressure: "CBAM declaration readiness across trade flows and covered goods",
        sectorSignal: "CN-code scope mapping and multi-supplier evidence coordination",
        operationalChallenge:
          "Monitoring reporting-cycle readiness across suppliers before declaration windows",
      },
    },
  },
  resourcesPage: {
    resources: {
      cbamChecklist: {
        title: "CBAM Readiness Checklist",
        description:
          "A practical checklist to map product scope, supplier data gaps and evidence requirements before your next CBAM reporting cycle",
        cta: "Request checklist",
      },
      supplierTemplate: {
        title: "Supplier Data Request Template",
        description:
          "Structured fields for supplier outreach, installation-level data requests and evidence upload guidance",
        cta: "Request template",
      },
      embeddedEmissionsGuide: {
        title: "Embedded Emissions Practical Guide",
        description:
          "A structured guide to direct and indirect emissions logic, methodology traceability and calculation input preparation",
        cta: "Get notified",
      },
      cbamCnScope: {
        title: "CN Code and Product Scope Guide",
        description:
          "A practical workflow for CN-code screening, product scope checks and CBAM coverage mapping",
        cta: "Get notified",
      },
      ppwrPackaging: {
        title: "PPWR Packaging Briefing",
        description:
          "Roadmap briefing on packaging BOM preparation, supplier evidence structuring and PPWR-aligned data workflows",
        cta: "Follow roadmap",
      },
      eudrBrief: {
        title: "EUDR Due Diligence Briefing",
        description:
          "Roadmap briefing on geolocation evidence, supplier declarations and traceability documentation preparation",
        cta: "Follow roadmap",
      },
    },
  },
};

const trPatch = {
  solutionsPage: {
    description:
      "Arvenza RegTech; tedarikçi verisi, ürün kanıtı, hesaplama girdileri ve dokümantasyon iş akışlarını pratik uyum kullanım senaryoları etrafında düzenler — bağlı ürün modülleri, ortak operasyon modeli",
    fields: {
      features: "İş akışı odağı",
      output: "İş akışı çıktısı",
      targetTeam: "Hedef ekip",
    },
    sections: {
      ready: { label: "Hazır" },
      roadmap: { label: "Yakında" },
    },
    solutions: {
      cbamWorkflows: {
        problem:
          "Çeyreklik CBAM hazırlığı; tedarikçi düzeyinde gömülü emisyon verisi, tesis bilgisi, metodoloji izlenebilirliği ve kanıt kalite kontrolleri gerektirir — birçok ekip bunu hâlâ dağınık Excel ve e-posta trafiğinde yönetiyor",
        approach:
          "CBAM Calculation Engine; tedarikçi veri toplama, gömülü emisyon hesabı, metodoloji notları ve beyana hazır kanıt dosyasını tek kontrollü iş akışında birleştirir",
        output: "Raporlama dönemi başına denetime hazır CBAM kanıt dosyası",
        targetTeam:
          "Çeyreklik CBAM beyanları hazırlayan ihracat uyumu, sürdürülebilirlik ve tedarik ekipleri",
        secondaryCta: "Demo Talep Et",
      },
      cbamConsole: {
        problem:
          "Tedarikçi veri toplama başladığında ekiplerin kanıt durumu, takip aksiyonları, hesaplama hazırlığı ve raporlama dönemi ilerlemesine dair net bir operasyonel görünüme ihtiyacı vardır",
        approach:
          "CBAM Compliance Console pilotu; CBAM döngüleri genelinde tedarikçi kanıtı, hesaplama hazırlığı ve raporlama koordinasyonu için izleme ve koordinasyon katmanı olarak konumlanır",
        workflowSteps: {
          step1: "Veri girişini izle",
          step2: "Kanıt boşluklarını takip et",
          step3: "Takibi koordine et",
          step4: "Döngü hazırlığını gözden geçir",
        },
        features: {
          item1: "Kanıt durumu görünümü",
          item2: "Takip kuyruğu",
          item3: "Döngü ilerleme takibi",
        },
        output: "Raporlama dönemi başına operasyonel CBAM hazırlık panosu",
        targetTeam:
          "Çok tedarikçili hazırlığı koordine eden CBAM program liderleri ve uyum operasyon ekipleri",
        secondaryCta: "Ürün modülünü inceleyin",
      },
      ppwr: {
        problem:
          "Ambalaj ekipleri; PPWR gereklilikleri operasyonel olarak bağlayıcı hale gelmeden önce malzeme düzeyinde ürün ağacı verisi, tedarikçi dokümantasyonu, geri dönüştürülmüş içerik kanıtı ve ürün ailesi mantığını organize etmelidir",
        approach:
          "PPWR / Packaging Compliance pilotu; ambalaj ürün ağaçlarını, tedarikçi kanıtını ve ambalaj verisi hazırlığını tekrarlanabilir bir kanıt iş akışı etrafında yapılandırır",
        workflowSteps: {
          step1: "Ambalaj kapsamını haritala",
          step2: "Tedarikçi ürün ağacı verisi topla",
          step3: "Kanıt bağlantılarını yapılandır",
          step4: "İnceleme çıktılarını hazırla",
        },
        features: {
          item1: "Ambalaj ürün ağacı yapısı",
          item2: "Geri dönüştürülmüş içerik kanıtı",
          item3: "Tedarikçi dokümantasyonu",
        },
        output: "Ürün ailesi başına yapılandırılmış ambalaj uyum veri paketi",
        targetTeam:
          "PPWR uyumlu dokümantasyon hazırlayan ambalaj, sürdürülebilirlik ve tedarik ekipleri",
        secondaryCta: "Ürün modülünü inceleyin",
      },
      agriClimate: {
        title: "Agri-Climate Veri İş Akışları",
        problem:
          "Tarımsal ve emtia bağlantılı tedarik zincirleri giderek üretici düzeyi kayıtlar, konum kanıtı, çiftlik düzeyi veri ve izlenebilirlik dokümantasyonu gerektiriyor",
        approach:
          "Agri-Climate Platform; tarımsal iklim verisi, çiftlik düzeyi kayıtlar ve kanıt hazırlığı iş akışlarını yapılandırmak için pilot ürün alanı olarak konumlanır",
        workflowSteps: {
          step1: "Üretici ağını haritala",
          step2: "Çiftlik düzeyi veri topla",
          step3: "Kanıt kalitesini doğrula",
          step4: "İklim kayıtlarını hazırla",
        },
        features: {
          item1: "Çiftlik düzeyi kayıtlar",
          item2: "Konum kanıtı hazırlığı",
          item3: "Üretici dokümantasyonu",
        },
        output: "Emtia kapsamı başına yapılandırılmış tarımsal iklim kanıtı",
        targetTeam:
          "Tarımsal ihracatçılar, emtia tüccarları ve gıda tedarik zinciri uyum ekipleri",
        secondaryCta: "Ürün modülünü inceleyin",
      },
      eudr: {
        title: "EUDR Due Diligence İş Akışları",
        problem:
          "Emtia bağlantılı tedarik zincirleri konum verisi, tedarikçi beyanları, risk sınıflandırması ve izlenebilirlik dokümantasyonuna hazırlanmalıdır",
        approach:
          "EUDR Due Diligence yol haritası modülü; platform genelinde kullanılan tedarikçi kanıtı ve dokümantasyon mantığı üzerine planlanmıştır",
        workflowSteps: {
          step1: "Emtia kapsamını belirle",
          step2: "Konum verisi topla",
          step3: "Beyanları yapılandır",
          step4: "Due diligence dosyalarını hazırla",
        },
        features: {
          item1: "Konum kanıtı",
          item2: "Tedarikçi beyanları",
          item3: "İzlenebilirlik dokümantasyonu",
        },
        output: "Emtia iş akışı başına due diligence dokümantasyon paketi",
        targetTeam: "Emtia ithalatçıları, marka tedarik zinciri ekipleri ve uyum fonksiyonları",
        secondaryCta: "Yol haritası modülünü inceleyin",
      },
      dpp: {
        title: "Digital Product Passport Hazırlığı",
        problem:
          "Üreticiler; DPP gereklilikleri pratik bir veri zorluğu haline gelmeden önce ürün düzeyi veri yapıları, kanıt katmanları, bileşen dokümantasyonu ve izlenebilirlik mantığına ihtiyaç duyar",
        approach:
          "Digital Product Passport yol haritası modülü; ürün veri yapıları, tedarikçi kanıt katmanları ve dokümantasyon izlenebilirliği etrafında planlanmıştır",
        workflowSteps: {
          step1: "Ürün kapsamını tanımla",
          step2: "Bileşen kanıtı topla",
          step3: "Pasaport verisini yapılandır",
          step4: "Hazırlık çıktılarını oluştur",
        },
        features: {
          item1: "Ürün veri yapıları",
          item2: "Bileşen dokümantasyonu",
          item3: "Kanıt izlenebilirliği",
        },
        output: "SKU ailesi başına ürün pasaportu hazırlık veri paketi",
        targetTeam: "Üreticiler, ürün uyum ekipleri ve sürdürülebilirlik veri fonksiyonları",
        secondaryCta: "Yol haritası modülünü inceleyin",
      },
    },
    maturity: {
      title: "Çözüm olgunluk yol haritası",
      description:
        "Arvenza hazır CBAM uyum iş akışıyla başlar; aynı kanıt disiplinini pilot ve yol haritası kullanım senaryolarına genişletir",
    },
    heroWorkflow: {
      diagramAriaLabel: "Regülasyon baskısından operasyonel iş akışına kullanım senaryosu akışı",
      steps: {
        pressure: "Regülasyon baskısı",
        supplierData: "Tedarikçi verisi",
        calculation: "Hesaplama girdisi",
        evidence: "Kanıt dosyası",
        workflow: "İş akışı",
      },
    },
    heroChips: {
      item1: "Kullanım senaryosu iş akışları",
      item2: "Hazır CBAM çözümü",
      item3: "Şeffaf olgunluk modeli",
    },
  },
  industriesPage: {
    items: {
      steelAluminium: {
        title: "Çelik ve Alüminyum",
        regulatoryPressure: "Kapsanan metal ihracatında CBAM raporlama baskısı",
        sectorSignal: "Birden fazla CN kodu ve tedarikçide tesis düzeyi emisyon verisi",
        operationalChallenge:
          "Her çeyreklik raporlama dönemi öncesi tedarikçi emisyon girdileri, tesis referansları ve kanıt kalitesini koordine etmek",
        workflowSteps: {
          step1: "CN kodları ve tesisleri haritala",
          step2: "Tedarikçi emisyon verisi topla",
          step3: "Beyana hazır kanıt dosyası hazırla",
        },
      },
      automotive: {
        title: "Otomotiv Tedarik Zincirleri",
        regulatoryPressure: "CBAM malzeme kanıtı ve genişleyen ürün verisi gereklilikleri",
        sectorSignal: "Malzeme ve bileşenler genelinde çok katmanlı tedarikçi karmaşıklığı",
        operationalChallenge:
          "CBAM hazırlığını daha geniş ürün ve tedarikçi dokümantasyon iş akışlarıyla hizalamak",
        workflowSteps: {
          step1: "Çok katmanlı tedarikçi verisini koordine et",
          step2: "CBAM malzeme kanıtı hazırla",
          step3: "Ürün verisi iş akışlarına genişlet",
        },
      },
      packagingFmcg: {
        title: "Ambalaj ve FMCG",
        regulatoryPressure: "PPWR ambalaj verisi ve tedarikçi kanıtı hazırlığı",
        sectorSignal: "Malzeme düzeyinde ürün ağacı verisi ve geri dönüştürülmüş içerik dokümantasyonu ihtiyacı",
        operationalChallenge:
          "Gereklilikler operasyonel olarak bağlayıcı hale gelmeden ambalaj tedarikçi kanıtını yapılandırmak",
        workflowSteps: {
          step1: "Ambalaj ürün ağacı kapsamını yapılandır",
          step2: "Tedarikçi ambalaj kanıtı topla",
          step3: "PPWR uyumlu dokümantasyon hazırla",
        },
      },
      electronicsBatteries: {
        title: "Elektronik ve Bataryalar",
        regulatoryPressure: "Digital Product Passport ve bileşen izlenebilirliği hazırlığı",
        sectorSignal: "Ürün aileleri genelinde bileşen dokümantasyonu ve tedarikçi kanıtı",
        operationalChallenge:
          "Pasaport gereklilikleri ölçeklenmeden ürün düzeyi veri yapılarını oluşturmak",
        workflowSteps: {
          step1: "Bileşen ve ürün kapsamını haritala",
          step2: "Tedarikçi dokümantasyonunu organize et",
          step3: "Pasaport hazırlık verisini oluştur",
        },
      },
      agricultureFood: {
        title: "Tarım ve Gıda",
        regulatoryPressure: "EUDR ve tarımsal iklim kanıt beklentileri",
        sectorSignal: "Emtia zincirlerinde üretici düzeyi kayıtlar ve konum kanıtı",
        operationalChallenge:
          "Tedarikçiler genelinde çiftlik düzeyi veri ve izlenebilirlik dokümantasyonunu yapılandırmak",
        workflowSteps: {
          step1: "Üretici ve emtia kapsamını haritala",
          step2: "Çiftlik düzeyi kanıt topla",
          step3: "Due diligence dokümantasyonu hazırla",
        },
      },
      importersExporters: {
        title: "İthalatçılar ve İhracatçılar",
        regulatoryPressure: "Ticaret akışları ve kapsanan mallar genelinde CBAM beyan hazırlığı",
        sectorSignal: "CN kodu kapsam eşlemesi ve çok tedarikçili kanıt koordinasyonu",
        operationalChallenge:
          "Beyan pencerelerinden önce tedarikçiler genelinde raporlama dönemi hazırlığını izlemek",
        workflowSteps: {
          step1: "CN kodları ve ticaret akışlarını kapsamla",
          step2: "Tedarikçi kanıt girişini koordine et",
          step3: "Raporlama dönemi hazırlığını izle",
        },
      },
    },
    strategyVisual: {
      ariaLabel: "Regülasyon baskısından yapılandırılmış iş akışına dikey strateji",
      kicker: "Dikey strateji modeli",
      steps: {
        pressure: "Regülasyon baskısı",
        evidence: "Tedarikçi kanıtı",
        workflow: "Yapılandırılmış iş akışı",
      },
      sectors: {
        step1: "Malzeme ve ticaret",
        step2: "Ambalaj ve elektronik",
        step3: "Tarım ve gıda",
      },
    },
    sectors: {
      label: "Hedef sektörler",
      title: "Altı sektör, tek kanıt operasyon modeli",
      description:
        "Her sektör kartı regülasyon baskısını, iş akışı uygunluğunu ve dürüst hazırlığı destekleyen Arvenza yeteneklerini eşler — Hazır, Pilot veya Yakında",
    },
    heroChips: {
      item1: "Sektöre özel iş akışları",
      item2: "Regülasyon baskısı haritalama",
      item3: "Şeffaf yetenek uyumu",
    },
  },
  resourcesPage: {
    resources: {
      cbamChecklist: {
        title: "CBAM Hazırlık Kontrol Listesi",
        description:
          "Sonraki CBAM raporlama döneminiz öncesi ürün kapsamı, tedarikçi veri boşlukları ve kanıt gerekliliklerini haritalamak için pratik kontrol listesi",
        cta: "Kontrol listesini talep et",
        format: "Kontrol listesi",
      },
      supplierTemplate: {
        title: "Tedarikçi Veri Talep Şablonu",
        description:
          "Tedarikçi iletişimi, tesis düzeyi veri talepleri ve kanıt yükleme rehberliği için yapılandırılmış alanlar",
        cta: "Şablonu talep et",
        format: "Şablon",
      },
      embeddedEmissionsGuide: {
        title: "Gömülü Emisyonlar Pratik Rehberi",
        description:
          "Doğrudan ve dolaylı emisyon mantığı, metodoloji izlenebilirliği ve hesaplama girdisi hazırlığı için yapılandırılmış rehber",
        cta: "Yayınlanınca haber ver",
        format: "Rehber",
        valuePreview: {
          item1: "Doğrudan ve dolaylı emisyon açıklaması",
          item2: "Metodoloji izlenebilirliği beklentileri",
        },
      },
      cbamCnScope: {
        title: "CN Kodu ve Ürün Kapsamı Rehberi",
        description:
          "CN kodu taraması, ürün kapsam kontrolü ve CBAM kapsam eşlemesi için pratik iş akışı",
        cta: "Yayınlanınca haber ver",
        format: "Rehber",
        valuePreview: {
          item1: "CN kodu tarama iş akışı",
          item2: "Ürün kapsam kontrol yapısı",
        },
      },
      ppwrPackaging: {
        title: "PPWR Ambalaj Bilgilendirmesi",
        description:
          "Ambalaj ürün ağacı hazırlığı, tedarikçi kanıtı yapılandırması ve PPWR uyumlu veri iş akışları için yol haritası bilgilendirmesi",
        cta: "Yol Haritasını Takip Et",
        format: "Bilgilendirme",
        valuePreview: {
          item1: "Ambalaj ürün ağacı hazırlık özeti",
          item2: "Tedarikçi kanıtı yapılandırma mantığı",
        },
      },
      eudrBrief: {
        title: "EUDR Due Diligence Bilgilendirmesi",
        description:
          "Konum kanıtı, tedarikçi beyanları ve izlenebilirlik dokümantasyonu hazırlığı için yol haritası bilgilendirmesi",
        cta: "Yol Haritasını Takip Et",
        format: "Bilgilendirme",
        valuePreview: {
          item1: "Konum kanıtı hazırlığı",
          item2: "Due diligence dokümantasyon yapısı",
        },
      },
    },
    sections: {
      available: { label: "Mevcut" },
      inPreparation: { label: "Hazırlanıyor" },
      roadmap: {
        label: "Yol Haritası",
        title: "Regülasyon bilgilendirmeleri",
        description:
          "Arvenza kaynak kütüphanesini genişletirken PPWR ve EUDR iş akışları için yol haritası bilgilendirmeleri",
      },
    },
    heroChips: {
      item1: "Mevcut kontrol listeleri",
      item2: "Şeffaf kaynak durumu",
      item3: "Pratik iş akışı değeri",
    },
    subscribe: {
      contactPrefix: "E-posta mı tercih edersiniz? İletişim:",
    },
  },
};

const nlPatch = {
  solutionsPage: {
    description:
      "Arvenza RegTech organiseert praktische compliance use cases rond leveranciersdata, productbewijs, berekeningsinput en documentatieworkflows — aparte productmodules, gedeelde operatielogica",
    fields: {
      problem: "Het probleem",
      approach: "Arvenza-aanpak",
      capability: "Relevante capaciteit",
      features: "Workflowfocus",
      output: "Workflowoutput",
      targetTeam: "Doelteam",
    },
    sections: {
      ready: {
        label: "Gereed",
        title: "Gereed oplossingsworkflow",
        description:
          "CBAM Compliance Workflows is de gereed operationele use case — aangedreven door CBAM Calculation Engine van leveranciersdata tot declaratieklare bewijslast",
      },
      pilot: {
        title: "Pilot oplossingsworkflows",
        description:
          "Uitgebreide use cases in gestructureerde pilottoegang — operationele monitoring, verpakkingscompliance en agrarische klimaatdata zonder volledige productbeschikbaarheid te impliceren",
      },
      roadmap: {
        label: "Binnenkort",
        title: "Roadmap oplossingsworkflows",
        description:
          "Geplande use cases die dezelfde leveranciersbewijslagen uitbreiden naar EUDR- en Digital Product Passport-readiness",
      },
    },
    solutions: {
      cbamWorkflows: {
        poweredBy: "Aangedreven door CBAM Calculation Engine",
        problem:
          "Kwartaal-CBAM-voorbereiding vereist ingebedde emissies op leveranciersniveau, installatie-informatie, methodologietraceerbaarheid en bewijskwaliteitscontroles — veel teams beheren dit nog via verspreide spreadsheets en e-mailthreads",
        approach:
          "CBAM Calculation Engine structureert leveranciersdataverzameling, berekening van ingebedde emissies, methodologienotities en declaratieklare bewijslast in één gecontroleerde workflow",
        output: "Auditklare CBAM-bewijspakket per rapportagecyclus",
        targetTeam:
          "Exportcompliance-, duurzaamheids- en inkoopteams die kwartaal-CBAM-aangiften voorbereiden",
        cta: "CBAM Calculation Engine bekijken",
        secondaryCta: "Demo aanvragen",
      },
      cbamConsole: {
        problem:
          "Zodra leveranciersdataverzameling start, hebben teams een helder operationeel overzicht nodig van bewijsstatus, opvolgacties, berekeningsgereedheid en voortgang per rapportagecyclus",
        approach:
          "De CBAM Compliance Console-pilot is gepositioneerd als monitoring- en coördinatielaag voor leveranciersbewijs, berekeningsgereedheid en rapportagevoorbereiding over CBAM-cycli",
        workflowSteps: {
          step1: "Intake monitoren",
          step2: "Bewijsgaten volgen",
          step3: "Opvolging coördineren",
          step4: "Cyclusgereedheid beoordelen",
        },
        features: {
          item1: "Overzicht bewijsstatus",
          item2: "Opvolgwachtrij",
          item3: "Voortgang per cyclus",
        },
        output: "Operationeel CBAM-gereedheidsoverzicht per rapportagecyclus",
        targetTeam:
          "CBAM-programmaleiders en compliance operations die multi-leveranciersvoorbereiding coördineren",
        cta: "Pilottoegang bespreken",
        secondaryCta: "Productmodule bekijken",
      },
      ppwr: {
        problem:
          "Verpakkingsteams moeten BOM-data op materiaalniveau, leveranciersdocumentatie, gerecycled-contentbewijs en productfamilielogica organiseren vóór PPWR-vereisten operationeel bindend worden",
        approach:
          "De PPWR / Packaging Compliance-pilot structureert verpakkings-BOM's, leveranciersbewijs en verpakkingsdatavoorbereiding rond een herhaalbare bewijsworkflow",
        workflowSteps: {
          step1: "Verpakkingscope in kaart brengen",
          step2: "Leveranciers-BOM-data verzamelen",
          step3: "Bewijskoppelingen structureren",
          step4: "Reviewoutputs voorbereiden",
        },
        features: {
          item1: "Verpakking-BOM-structuur",
          item2: "Gerecycled-contentbewijs",
          item3: "Leveranciersdocumentatie",
        },
        output: "Gestructureerd verpakkingscompliance-datapakket per productfamilie",
        targetTeam:
          "Verpakking-, duurzaamheids- en inkoopteams die PPWR-conforme documentatie voorbereiden",
        cta: "Pilottoegang bespreken",
        secondaryCta: "Productmodule bekijken",
      },
      agriClimate: {
        title: "Agri-Climate dataworkflows",
        problem:
          "Agrarische en commodity-gebonden supply chains vereisen steeds vaker producentniveau-records, geolocatiebewijs, farm-level data en traceerbaarheidsdocumentatie",
        approach:
          "Agri-Climate Platform is gepositioneerd als pilotproductgebied voor het structureren van agrarische klimaatdata, farm-level records en bewijsvoorbereidingsworkflows",
        workflowSteps: {
          step1: "Producentennetwerk in kaart brengen",
          step2: "Farm-level data verzamelen",
          step3: "Bewijskwaliteit valideren",
          step4: "Klimaatrecords voorbereiden",
        },
        features: {
          item1: "Bedrijfsniveau-records",
          item2: "Geolocatiebewijs-voorbereiding",
          item3: "Producentdocumentatie",
        },
        output: "Gestructureerd agrarisch klimaatbewijs per commodity-scope",
        targetTeam:
          "Agrarische exporteurs, commodityhandelaren en food supply chain compliance-teams",
        cta: "Pilottoegang bespreken",
        secondaryCta: "Productmodule bekijken",
      },
      eudr: {
        title: "EUDR Due Diligence workflows",
        problem:
          "Commodity-gebonden supply chains moeten zich voorbereiden op geolocatiedata, leveranciersverklaringen, risicoclassificatie en traceerbaarheidsdocumentatie",
        approach:
          "De EUDR Due Diligence-roadmapmodule is gepland op dezelfde leveranciersbewijs- en documentatielogica als het bredere platform",
        workflowSteps: {
          step1: "Commodity-scope bepalen",
          step2: "Geolocatiedata verzamelen",
          step3: "Verklaringen structureren",
          step4: "Diligencedossiers voorbereiden",
        },
        features: {
          item1: "Geolocatiebewijs",
          item2: "Leveranciersverklaringen",
          item3: "Traceerbaarheidsdocumentatie",
        },
        output: "Due diligence-documentatiepakket per commodity-workflow",
        targetTeam: "Commodity-importeurs, brand supply chain-teams en compliancefuncties",
        cta: "Roadmap volgen",
        secondaryCta: "Roadmapmodule bekijken",
      },
      dpp: {
        title: "Digital Product Passport-readiness",
        problem:
          "Fabrikanten hebben product-level datastructuren, bewijslagen, componentdocumentatie en traceerbaarheidslogica nodig vóór DPP-vereisten een praktische datachallenge worden",
        approach:
          "De Digital Product Passport-roadmapmodule is gepland rond productdatastructuren, leveranciersbewijslagen en documentatietraceerbaarheid",
        workflowSteps: {
          step1: "Productscope definiëren",
          step2: "Componentbewijs verzamelen",
          step3: "Paspoortdata structureren",
          step4: "Readiness-outputs voorbereiden",
        },
        features: {
          item1: "Productdatastructuren",
          item2: "Componentdocumentatie",
          item3: "Bewijstraceerbaarheid",
        },
        output: "Productpaspoort-readiness-datapakket per SKU-familie",
        targetTeam: "Fabrikanten, productcompliance-teams en duurzaamheidsdatafuncties",
        cta: "Roadmap volgen",
        secondaryCta: "Roadmapmodule bekijken",
      },
    },
    maturity: {
      title: "Oplossingsmaturity-roadmap",
      description:
        "Arvenza start met een gereed CBAM-compliance-workflow en breidt dezelfde bewijsdiscipline uit naar pilot- en roadmap-use cases",
    },
    cta: {
      title: "Bespreek uw compliance-workflow met ons team",
      primary: "Demo aanvragen",
      secondary: "CBAM Calculation Engine bekijken",
    },
    heroWorkflow: {
      diagramAriaLabel: "Use-case-workflow van regeldruk naar operationele workflow",
      steps: {
        pressure: "Regeldruk",
        supplierData: "Leveranciersdata",
        calculation: "Berekeningsinput",
        evidence: "Bewijsdossier",
        workflow: "Workflow",
      },
    },
    heroChips: {
      item1: "Use-case-workflows",
      item2: "Gereed CBAM-oplossing",
      item3: "Eerlijk maturity-model",
    },
  },
  industriesPage: {
    items: {
      steelAluminium: {
        title: "Staal en aluminium",
        regulatoryPressure: "CBAM-rapportagedruk op gedekte metaalexport",
        sectorSignal: "Emissiedata op installatieniveau over meerdere CN-codes en leveranciers",
        operationalChallenge:
          "Leveranciersemissie-inputs, installatiereferenties en bewijskwaliteit coördineren vóór elke kwartaalrapportagecyclus",
        workflowSteps: {
          step1: "CN-codes en installaties in kaart brengen",
          step2: "Leveranciersemissiedata verzamelen",
          step3: "Declaratieklare bewijslast voorbereiden",
        },
        cta: "Demo aanvragen",
        secondaryCta: "CBAM Calculation Engine bekijken",
      },
      automotive: {
        title: "Automotive toeleveringsketens",
        regulatoryPressure: "CBAM-materiaalbewijs plus uitbreidende productdatavereisten",
        sectorSignal: "Multi-tier leverancierscomplexiteit over materialen en componenten",
        operationalChallenge:
          "CBAM-voorbereiding afstemmen op bredere product- en leveranciersdocumentatieworkflows",
        workflowSteps: {
          step1: "Multi-tier leveranciersdata coördineren",
          step2: "CBAM-materiaalbewijs voorbereiden",
          step3: "Uitbreiden naar productdata-workflows",
        },
        cta: "Demo aanvragen",
        secondaryCta: "CBAM Calculation Engine bekijken",
      },
      packagingFmcg: {
        title: "Verpakkingen en FMCG",
        regulatoryPressure: "PPWR-verpakkingsdata en leveranciersbewijsvoorbereiding",
        sectorSignal: "BOM-data op materiaalniveau en gerecycled-contentdocumentatie",
        operationalChallenge:
          "Verpakking-leveranciersbewijs structureren vóór vereisten operationeel bindend worden",
        workflowSteps: {
          step1: "Verpakkings-BOM-scope structureren",
          step2: "Leveranciersverpakkingsbewijs verzamelen",
          step3: "PPWR-conforme documentatie voorbereiden",
        },
        cta: "Pilottoegang bespreken",
        secondaryCta: "PPWR-module bekijken",
      },
      electronicsBatteries: {
        title: "Elektronica en batterijen",
        regulatoryPressure: "Digital Product Passport- en componenttraceerbaarheidsvoorbereiding",
        sectorSignal: "Componentdocumentatie en leveranciersbewijs over productfamilies",
        operationalChallenge:
          "Product-level datastructuren opbouwen vóór paspoortvereisten opschalen",
        workflowSteps: {
          step1: "Component- en productscope in kaart brengen",
          step2: "Leveranciersdocumentatie organiseren",
          step3: "Paspoort-readiness-data voorbereiden",
        },
        cta: "Roadmap volgen",
        secondaryCta: "DPP-module bekijken",
      },
      agricultureFood: {
        title: "Landbouw en voeding",
        regulatoryPressure: "EUDR- en agrarisch klimaatbewijsverwachtingen",
        sectorSignal: "Producentniveau-records en geolocatiebewijs over commodityketens",
        operationalChallenge:
          "Farm-level data en traceerbaarheidsdocumentatie structureren over leveranciers",
        workflowSteps: {
          step1: "Producent- en commodity-scope in kaart brengen",
          step2: "Farm-level bewijs verzamelen",
          step3: "Diligencedocumentatie voorbereiden",
        },
        cta: "Pilottoegang bespreken",
        secondaryCta: "Agri-Climate-module bekijken",
      },
      importersExporters: {
        title: "Importeurs en exporteurs",
        regulatoryPressure: "CBAM-aangiftegereedheid over handelsstromen en gedekte goederen",
        sectorSignal: "CN-code-scope mapping en multi-leveranciersbewijscoördinatie",
        operationalChallenge:
          "Rapportagecyclusgereedheid over leveranciers monitoren vóór aangiftetijdvensters",
        workflowSteps: {
          step1: "CN-codes en handelsstromen afbakenen",
          step2: "Leveranciersbewijs-intake coördineren",
          step3: "Rapportagecyclusgereedheid monitoren",
        },
        cta: "Demo aanvragen",
        secondaryCta: "CBAM Calculation Engine bekijken",
      },
    },
    strategyVisual: {
      ariaLabel: "Verticale strategie van regeldruk naar gestructureerde workflow",
      kicker: "Verticaal strategiemodel",
      steps: {
        pressure: "Regeldruk",
        evidence: "Leveranciersbewijs",
        workflow: "Gestructureerde workflow",
      },
      sectors: {
        step1: "Materialen en handel",
        step2: "Verpakking en elektronica",
        step3: "Landbouw en voeding",
      },
    },
    sectors: {
      label: "Doelsectoren",
      title: "Zes sectoren, één bewijsoperatiemodel",
      description:
        "Elke sectorcard koppelt regeldruk, workflowrelevantie en Arvenza-capaciteiten die eerlijke readiness ondersteunen — Gereed, Pilot of Binnenkort",
    },
    heroChips: {
      item1: "Sectorspecifieke workflows",
      item2: "Regeldruk-mapping",
      item3: "Eerlijke capability-afstemming",
    },
  },
  resourcesPage: {
    library: {
      title: "Regelgevingsresourcebibliotheek",
      description:
        "Praktische gidsen, checklists en briefings voor het structureren van leveranciersdata, berekeningsinput en bewijsworkflows over CBAM en komende EU-vereisten",
    },
    resources: {
      cbamChecklist: {
        title: "CBAM-voorbereidingschecklist",
        description:
          "Praktische checklist om productscope, leveranciersdatagaten en bewijsvereisten in kaart te brengen vóór uw volgende CBAM-rapportagecyclus",
        cta: "Checklist aanvragen",
        format: "Checklist",
      },
      supplierTemplate: {
        title: "Template voor leveranciersdataverzoek",
        description:
          "Gestructureerde velden voor leverancierscommunicatie, dataverzoeken op installatieniveau en bewijs-uploadbegeleiding",
        cta: "Template aanvragen",
        format: "Template",
      },
      embeddedEmissionsGuide: {
        title: "Praktische gids voor ingebedde emissies",
        description:
          "Gestructureerde gids voor directe en indirecte emissielogica, methodologietraceerbaarheid en berekeningsinput-voorbereiding",
        cta: "Ontvang melding",
        format: "Gids",
        valuePreview: {
          item1: "Uitleg directe en indirecte emissies",
          item2: "Verwachtingen methodologietraceerbaarheid",
        },
      },
      cbamCnScope: {
        title: "CN-code- en productscopegids",
        description:
          "Praktische workflow voor CN-code-screening, productscopechecks en CBAM-dekkingsmapping",
        cta: "Ontvang melding",
        format: "Gids",
        valuePreview: {
          item1: "CN-code-screeningworkflow",
          item2: "Structuur productscopecheck",
        },
      },
      ppwrPackaging: {
        title: "PPWR-verpakkingbriefing",
        description:
          "Roadmap-briefing over verpakkings-BOM-voorbereiding, leveranciersbewijsstructurering en PPWR-conforme dataworkflows",
        cta: "Roadmap volgen",
        format: "Briefing",
        valuePreview: {
          item1: "Overzicht verpakkings-BOM-voorbereiding",
          item2: "Logica leveranciersbewijsstructurering",
        },
      },
      eudrBrief: {
        title: "EUDR Due Diligence-briefing",
        description:
          "Roadmap-briefing over geolocatiebewijs, leveranciersverklaringen en traceerbaarheidsdocumentatie-voorbereiding",
        cta: "Roadmap volgen",
        format: "Briefing",
        valuePreview: {
          item1: "Geolocatiebewijs-voorbereiding",
          item2: "Structuur diligencedocumentatie",
        },
      },
    },
    sections: {
      available: {
        label: "Beschikbaar",
        title: "Nu aanvragen",
        description:
          "Praktische checklists en templates die u vandaag kunt aanvragen om CBAM-readiness en leverancierscommunicatie te structureren",
      },
      inPreparation: {
        label: "In voorbereiding",
        title: "Gidsen in ontwikkeling",
        description: "Gestructureerde gidsen in voorbereiding — schrijf u in om ze te ontvangen bij release",
      },
      roadmap: {
        label: "Roadmap",
        title: "Regelgevingsbriefings",
        description:
          "Roadmap-briefings voor PPWR- en EUDR-workflows terwijl Arvenza de resourcebibliotheek uitbreidt",
      },
    },
    heroChips: {
      item1: "Beschikbare checklists",
      item2: "Eerlijke resourcestatus",
      item3: "Praktische workflowwaarde",
    },
    subscribeBenefits: {
      title: "Wat u ontvangt bij inschrijving",
    },
  },
  demo: {
    hero: {
      statValue: "CBAM Calculation Engine · EU-duurzaamheidscompliance",
      chipsAriaLabel: "Demo-hoogtepunten",
      chips: {
        item1: "Productgerichte rondleiding",
        item2: "Focus op CBAM Calculation Engine",
        item3: "Expertbegeleiding bij workflows",
      },
    },
    preview: {
      metrics: {
        module1: { value: "Gegevens" },
        module2: { value: "Berekening" },
      },
      modules: {
        module2: "Rapportage",
      },
    },
    expectations: {
      meta: {
        format: {
          label: "Formaat",
          value: "Live productsessie",
        },
      },
    },
    contactPanel: {
      title: "Rechtstreeks contact",
    },
  },
};

for (const [locale, patch] of [
  ["en", enSupplement],
  ["tr", trPatch],
  ["nl", nlPatch],
]) {
  const messagesPath = path.join(root, "messages", `${locale}.json`);
  const messages = JSON.parse(fs.readFileSync(messagesPath, "utf8"));
  deepMerge(messages, patch);
  fs.writeFileSync(messagesPath, `${JSON.stringify(messages, null, 2)}\n`);
  console.log(`Applied non-platform translations to messages/${locale}.json`);
}
