#!/usr/bin/env node
/**
 * Adds Water Efficiency Management module i18n to en/tr/nl messages.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const LOCALES = ["en", "tr", "nl"];

const COPY = {
  en: {
    metadata: {
      title: "Water Efficiency Management | Arvenza RegTech",
      description:
        "Structure water consumption data, water balance inputs, improvement actions and evidence documentation in a traceable management workflow.",
    },
    navModule: "Water Efficiency Management",
    solutionsMenu: "Water Efficiency Management",
    platformHubModule: {
      title: "Water Efficiency Management",
      description:
        "Structure facility-level water data, meter records, improvement actions and evidence documentation in a traceable workflow.",
      exploreCta: "Explore water efficiency module",
      screenshotAlt: "Water Efficiency Management dashboard preview",
    },
    demoInterest: "Water Efficiency Management",
    solutionsSection: {
      label: "Available on request",
      title: "Additional capability workflows",
      description:
        "Extended resource-efficiency workflows available on request — structured data intake and evidence documentation without displacing the core CBAM product.",
    },
    solutionCard: {
      title: "Water Efficiency Management",
      problem:
        "Structure facility-level water data, evidence files and improvement actions in a repeatable workflow.",
      approach:
        "Water Efficiency Management coordinates meter records, water balance inputs, improvement actions and supporting evidence in one traceable management workflow.",
      capability: "Water Efficiency Management",
      workflowSteps: {
        step1: "Define facility scope",
        step2: "Collect meter data",
        step3: "Build balance inputs",
        step4: "Track improvement actions",
      },
      features: {
        item1: "Facility water data",
        item2: "Evidence documentation",
        item3: "Action tracking",
      },
      output: "Facility water overview and review-ready evidence package",
      targetTeam: "Sustainability, facility and environmental teams managing water efficiency evidence",
      cta: "Request access",
      secondaryCta: "View module",
    },
    maturityItem: "Water Efficiency Management",
    resource: {
      title: "Water Efficiency Data Collection Checklist",
      description:
        "A practical checklist for collecting meter readings, source records, water balance inputs and improvement action evidence.",
      format: "Checklist",
      cta: "Request checklist",
      valuePreview: {
        item1: "Meter readings and source records",
        item2: "Water balance inputs and improvement action evidence",
      },
      detail: "Request the checklist to structure water efficiency data collection before workflow setup.",
    },
    previewPlaceholder: {
      title: "Product preview",
      description:
        "Module screenshot available on request — preview shows current capability scope for Water Efficiency Management.",
    },
    module: {
      eyebrow: "Water Efficiency Management",
      title: "Water efficiency workflows for facility-level evidence and action tracking",
      description:
        "Structure water consumption data, meter records, water balance inputs, improvement actions and supporting evidence in a traceable management workflow.",
      category: "Resource efficiency",
      chipsAriaLabel: "Water efficiency highlights",
      chips: {
        item1: "Facility-level water data",
        item2: "Evidence documentation",
        item3: "Action tracking",
      },
      screenshotAlt: "Water Efficiency Management dashboard preview",
      why: {
        title: "From water consumption records to traceable improvement actions",
        description:
          "Water efficiency work often depends on scattered meter readings, facility records, process-level assumptions and action plans. Arvenza structures these inputs into a repeatable workflow so teams can track water use, document evidence and monitor improvement actions in one place.",
      },
      capabilities: {
        title: "Core capabilities",
        description: "Structured facility-level water data, evidence and action workflows — available on request.",
        items: {
          item1: { title: "Water consumption data structure", description: "Organize consumption records by facility, source and reporting period." },
          item2: { title: "Meter and source records", description: "Maintain meter readings and water source documentation in one archive." },
          item3: { title: "Water balance preparation", description: "Prepare balance inputs from intake, use and discharge records." },
          item4: { title: "Process-level allocation inputs", description: "Capture process-level allocation assumptions with traceable references." },
          item5: { title: "Improvement action tracking", description: "Track planned and completed water efficiency actions with ownership." },
          item6: { title: "Evidence file documentation", description: "Attach supporting files to meter records, actions and balance inputs." },
          item7: { title: "Review and reporting readiness", description: "Prepare review-ready outputs for internal sign-off and reporting cycles." },
        },
      },
      workflow: {
        title: "Water efficiency management workflow",
        description: "From facility definition through evidence preparation and review-ready outputs.",
        steps: {
          step1: { title: "Define facility and water sources", description: "Set facility scope, water sources and ownership for the workflow." },
          step2: { title: "Collect meter and activity data", description: "Gather meter readings and activity data needed for balance preparation." },
          step3: { title: "Build water balance inputs", description: "Structure intake, use and discharge inputs for balance review." },
          step4: { title: "Track improvement actions", description: "Monitor planned actions, status updates and supporting evidence." },
          step5: { title: "Prepare evidence and review outputs", description: "Assemble documentation and review-ready reporting packages." },
        },
      },
      audience: {
        title: "Who it is for",
        items: {
          item1: { title: "Sustainability teams", description: "Groups coordinating water data and evidence across facilities." },
          item2: { title: "Facility managers", description: "Teams responsible for meter records and on-site water use." },
          item3: { title: "Environmental managers", description: "Functions overseeing environmental performance and improvement programs." },
          item4: { title: "Water efficiency project teams", description: "Project groups running targeted water reduction initiatives." },
          item5: { title: "Consultants managing client evidence files", description: "Advisors preparing structured evidence files for client review cycles." },
        },
      },
      outputs: {
        title: "Workflow outputs",
        items: {
          item1: { title: "Facility water data overview", description: "Structured summary of consumption and source records by facility." },
          item2: { title: "Meter and source record archive", description: "Searchable archive of meter readings and source documentation." },
          item3: { title: "Water balance preparation file", description: "Prepared balance inputs ready for review and validation." },
          item4: { title: "Improvement action tracker", description: "Status view of planned and completed efficiency actions." },
          item5: { title: "Evidence documentation file", description: "Linked evidence files supporting balance and action records." },
          item6: { title: "Review-ready reporting package", description: "Packaged outputs prepared for internal review and reporting cycles." },
        },
      },
      architecture: {
        title: "How this module fits the Arvenza architecture",
        description:
          "Water Efficiency Management extends the Arvenza evidence model beyond carbon-focused workflows. It uses the same operating logic: structured data intake, evidence documentation, workflow ownership and reporting-ready outputs.",
        layerKey: "documentationReporting",
        dataStructured: "Facility water sources, meter records and consumption data structures",
        evidenceManaged: "Water balance inputs, improvement actions and supporting documentation",
        outputSupported: "Review-ready reporting packages and facility water overview files",
      },
      cta: { title: "Request access to Water Efficiency Management" },
    },
  },
  tr: {
    metadata: {
      title: "Su Verimliliği Yönetimi | Arvenza RegTech",
      description:
        "Su tüketim verilerini, su dengesi girdilerini, iyileştirme aksiyonlarını ve kanıt dokümantasyonunu izlenebilir bir yönetim iş akışında yapılandırın.",
    },
    navModule: "Su Verimliliği Yönetimi",
    solutionsMenu: "Su Verimliliği Yönetimi",
    platformHubModule: {
      title: "Su Verimliliği Yönetimi",
      description:
        "Tesis düzeyinde su verisini, sayaç kayıtlarını, iyileştirme aksiyonlarını ve kanıt dokümantasyonunu izlenebilir bir iş akışında yapılandırın.",
      exploreCta: "Su verimliliği modülünü inceleyin",
      screenshotAlt: "Su Verimliliği Yönetimi pano önizlemesi",
    },
    demoInterest: "Su Verimliliği Yönetimi",
    solutionsSection: {
      label: "Talep üzerine erişilebilir",
      title: "Ek yetenek iş akışları",
      description:
        "Talep üzerine erişilebilen kaynak verimliliği iş akışları — yapılandırılmış veri girişi ve kanıt dokümantasyonu; ana CBAM ürününün önüne geçmez.",
    },
    solutionCard: {
      title: "Su Verimliliği Yönetimi",
      problem:
        "Tesis düzeyindeki su verisini, kanıt dosyalarını ve iyileştirme aksiyonlarını tekrarlanabilir bir iş akışında yapılandırın.",
      approach:
        "Su Verimliliği Yönetimi; sayaç kayıtlarını, su dengesi girdilerini, iyileştirme aksiyonlarını ve destekleyici kanıtları tek izlenebilir yönetim iş akışında koordine eder.",
      capability: "Su Verimliliği Yönetimi",
      workflowSteps: {
        step1: "Tesis kapsamını tanımlayın",
        step2: "Sayaç verilerini toplayın",
        step3: "Denge girdilerini oluşturun",
        step4: "Aksiyonları takip edin",
      },
      features: {
        item1: "Tesis düzeyinde su verisi",
        item2: "Kanıt dokümantasyonu",
        item3: "Aksiyon takibi",
      },
      output: "Tesis su verisi özeti ve gözden geçirmeye hazır kanıt paketi",
      targetTeam: "Su verimliliği kanıtını yöneten sürdürülebilirlik, tesis ve çevre ekipleri",
      cta: "Erişim talep edin",
      secondaryCta: "Modülü inceleyin",
    },
    maturityItem: "Su Verimliliği Yönetimi",
    resource: {
      title: "Su Verimliliği Veri Toplama Kontrol Listesi",
      description:
        "Sayaç okumaları, kaynak kayıtları, su dengesi girdileri ve iyileştirme aksiyonu kanıtlarını toplamak için pratik kontrol listesi.",
      format: "Kontrol listesi",
      cta: "Kontrol listesini talep edin",
      valuePreview: {
        item1: "Sayaç okumaları ve kaynak kayıtları",
        item2: "Su dengesi girdileri ve iyileştirme aksiyonu kanıtları",
      },
      detail: "İş akışı kurulumundan önce su verimliliği veri toplamayı yapılandırmak için kontrol listesini talep edin.",
    },
    previewPlaceholder: {
      title: "Ürün önizlemesi",
      description:
        "Modül ekran görüntüsü talep üzerine erişilebilir — önizleme Su Verimliliği Yönetimi için mevcut yetenek kapsamını gösterir.",
    },
    module: {
      eyebrow: "Su Verimliliği Yönetimi",
      title: "Tesis düzeyinde kanıt ve aksiyon takibi için su verimliliği iş akışları",
      description:
        "Su tüketim verilerini, sayaç kayıtlarını, su dengesi girdilerini, iyileştirme aksiyonlarını ve destekleyici kanıtları izlenebilir bir yönetim iş akışında yapılandırın.",
      category: "Kaynak verimliliği",
      chipsAriaLabel: "Su verimliliği vurguları",
      chips: {
        item1: "Tesis düzeyinde su verisi",
        item2: "Kanıt dokümantasyonu",
        item3: "Aksiyon takibi",
      },
      screenshotAlt: "Su Verimliliği Yönetimi pano önizlemesi",
      why: {
        title: "Su tüketim kayıtlarından izlenebilir iyileştirme aksiyonlarına",
        description:
          "Su verimliliği çalışmaları çoğu zaman dağınık sayaç okumalarına, tesis kayıtlarına, proses düzeyi varsayımlara ve aksiyon planlarına dayanır. Arvenza bu girdileri tekrarlanabilir bir iş akışına dönüştürerek ekiplerin su kullanımını, kanıt dokümantasyonunu ve iyileştirme aksiyonlarını tek yerde takip etmesini sağlar.",
      },
      capabilities: {
        title: "Temel yetenekler",
        description: "Tesis düzeyinde yapılandırılmış su verisi, kanıt ve aksiyon iş akışları — talep üzerine erişilebilir.",
        items: {
          item1: { title: "Su tüketim verisi yapısı", description: "Tüketim kayıtlarını tesis, kaynak ve raporlama dönemine göre düzenleyin." },
          item2: { title: "Sayaç ve kaynak kayıtları", description: "Sayaç okumalarını ve su kaynağı dokümantasyonunu tek arşivde tutun." },
          item3: { title: "Su dengesi hazırlığı", description: "Giriş, kullanım ve deşarj kayıtlarından denge girdilerini hazırlayın." },
          item4: { title: "Proses düzeyi dağıtım girdileri", description: "Proses düzeyi dağıtım varsayımlarını izlenebilir referanslarla kaydedin." },
          item5: { title: "İyileştirme aksiyonu takibi", description: "Planlanan ve tamamlanan su verimliliği aksiyonlarını sahiplikle takip edin." },
          item6: { title: "Kanıt dosyası dokümantasyonu", description: "Sayaç kayıtları, aksiyonlar ve denge girdilerine destekleyici dosyalar ekleyin." },
          item7: { title: "Gözden geçirme ve raporlama hazırlığı", description: "İç onay ve raporlama döngüleri için gözden geçirmeye hazır çıktılar hazırlayın." },
        },
      },
      workflow: {
        title: "Su verimliliği yönetim iş akışı",
        description: "Tesis tanımından kanıt hazırlığına ve gözden geçirmeye hazır çıktılara.",
        steps: {
          step1: { title: "Tesis ve su kaynaklarını tanımlayın", description: "Tesis kapsamını, su kaynaklarını ve iş akışı sahipliğini belirleyin." },
          step2: { title: "Sayaç ve faaliyet verilerini toplayın", description: "Denge hazırlığı için gerekli sayaç okumalarını ve faaliyet verilerini toplayın." },
          step3: { title: "Su dengesi girdilerini oluşturun", description: "Giriş, kullanım ve deşarj girdilerini denge incelemesi için yapılandırın." },
          step4: { title: "İyileştirme aksiyonlarını takip edin", description: "Planlanan aksiyonları, durum güncellemelerini ve destekleyici kanıtları izleyin." },
          step5: { title: "Kanıtları ve gözden geçirme çıktılarını hazırlayın", description: "Dokümantasyonu ve gözden geçirmeye hazır raporlama paketlerini oluşturun." },
        },
      },
      audience: {
        title: "Kimler için",
        items: {
          item1: { title: "Sürdürülebilirlik ekipleri", description: "Tesisler genelinde su verisi ve kanıtı koordine eden gruplar." },
          item2: { title: "Tesis yöneticileri", description: "Sayaç kayıtlarından ve saha su kullanımından sorumlu ekipler." },
          item3: { title: "Çevre yöneticileri", description: "Çevresel performans ve iyileştirme programlarını yöneten birimler." },
          item4: { title: "Su verimliliği proje ekipleri", description: "Hedefli su azaltma girişimlerini yürüten proje grupları." },
          item5: { title: "Müşteri kanıt dosyalarını yöneten danışmanlar", description: "Müşteri inceleme döngüleri için yapılandırılmış kanıt dosyaları hazırlayan danışmanlar." },
        },
      },
      outputs: {
        title: "İş akışı çıktıları",
        items: {
          item1: { title: "Tesis su verisi özeti", description: "Tesis bazında tüketim ve kaynak kayıtlarının yapılandırılmış özeti." },
          item2: { title: "Sayaç ve kaynak kayıt arşivi", description: "Sayaç okumaları ve kaynak dokümantasyonu için aranabilir arşiv." },
          item3: { title: "Su dengesi hazırlık dosyası", description: "İnceleme ve doğrulamaya hazır denge girdileri." },
          item4: { title: "İyileştirme aksiyonu takip listesi", description: "Planlanan ve tamamlanan verimlilik aksiyonlarının durum görünümü." },
          item5: { title: "Kanıt dokümantasyon dosyası", description: "Denge ve aksiyon kayıtlarını destekleyen kanıt dosyaları." },
          item6: { title: "Gözden geçirmeye hazır raporlama paketi", description: "İç inceleme ve raporlama döngüleri için hazırlanmış paketlenmiş çıktılar." },
        },
      },
      architecture: {
        title: "Bu modül Arvenza mimarisinde nereye oturur",
        description:
          "Su Verimliliği Yönetimi, Arvenza'nın kanıt modelini karbon odaklı iş akışlarının ötesine taşır. Aynı operasyon mantığını kullanır: yapılandırılmış veri girişi, kanıt dokümantasyonu, iş akışı sahipliği ve raporlamaya hazır çıktılar.",
        layerKey: "documentationReporting",
        dataStructured: "Tesis su kaynakları, sayaç kayıtları ve tüketim verisi yapıları",
        evidenceManaged: "Su dengesi girdileri, iyileştirme aksiyonları ve destekleyici dokümantasyon",
        outputSupported: "Gözden geçirmeye hazır raporlama paketleri ve tesis su verisi özet dosyaları",
      },
      cta: { title: "Su Verimliliği Yönetimi için erişim talep edin" },
    },
  },
  nl: {
    metadata: {
      title: "Water-efficiëntiebeheer | Arvenza RegTech",
      description:
        "Structureer waterverbruiksgegevens, waterbalansinvoer, verbeteracties en bewijsdocumentatie in een traceerbare beheerworkflow.",
    },
    navModule: "Water-efficiëntiebeheer",
    solutionsMenu: "Water-efficiëntiebeheer",
    platformHubModule: {
      title: "Water-efficiëntiebeheer",
      description:
        "Structureer waterdata op locatieniveau, meterregistraties, verbeteracties en bewijsdocumentatie in een traceerbare workflow.",
      exploreCta: "Water-efficiëntiemodule bekijken",
      screenshotAlt: "Water-efficiëntiebeheer dashboardvoorbeeld",
    },
    demoInterest: "Water-efficiëntiebeheer",
    solutionsSection: {
      label: "Beschikbaar op aanvraag",
      title: "Aanvullende capability-workflows",
      description:
        "Uitbreidbare hulpbronnenefficiëntie-workflows beschikbaar op aanvraag — gestructureerde data-invoer en bewijsdocumentatie zonder het kern-CBAM-product te verdringen.",
    },
    solutionCard: {
      title: "Water-efficiëntiebeheer",
      problem:
        "Structureer waterdata op locatieniveau, bewijsdossiers en verbeteracties in een herhaalbare workflow.",
      approach:
        "Water-efficiëntiebeheer coördineert meterregistraties, waterbalansinvoer, verbeteracties en ondersteunend bewijs in één traceerbare beheerworkflow.",
      capability: "Water-efficiëntiebeheer",
      workflowSteps: {
        step1: "Locatiescope definiëren",
        step2: "Meterdata verzamelen",
        step3: "Balansinvoer opbouwen",
        step4: "Acties opvolgen",
      },
      features: {
        item1: "Waterdata op locatieniveau",
        item2: "Bewijsdocumentatie",
        item3: "Actieopvolging",
      },
      output: "Wateroverzicht per locatie en reviewgereed bewijspakket",
      targetTeam: "Duurzaamheids-, locatie- en milieuteams die water-efficiëntiebewijs beheren",
      cta: "Toegang aanvragen",
      secondaryCta: "Module bekijken",
    },
    maturityItem: "Water-efficiëntiebeheer",
    resource: {
      title: "Checklist voor water-efficiëntiedata",
      description:
        "Een praktische checklist voor meterstanden, bronregistraties, waterbalansinvoer en bewijs voor verbeteracties.",
      format: "Checklist",
      cta: "Checklist aanvragen",
      valuePreview: {
        item1: "Meterstanden en bronregistraties",
        item2: "Waterbalansinvoer en bewijs voor verbeteracties",
      },
      detail: "Vraag de checklist aan om water-efficiëntiedataverzameling te structureren vóór workflow-setup.",
    },
    previewPlaceholder: {
      title: "Productvoorbeeld",
      description:
        "Modulescreenshot beschikbaar op aanvraag — voorbeeld toont de huidige capability-scope voor Water-efficiëntiebeheer.",
    },
    module: {
      eyebrow: "Water-efficiëntiebeheer",
      title: "Water-efficiëntieworkflows voor bewijs en actieopvolging op locatieniveau",
      description:
        "Structureer waterverbruiksgegevens, meterregistraties, waterbalansinvoer, verbeteracties en ondersteunend bewijs in een traceerbare beheerworkflow.",
      category: "Hulpbronnenefficiëntie",
      chipsAriaLabel: "Water-efficiëntie highlights",
      chips: {
        item1: "Waterdata op locatieniveau",
        item2: "Bewijsdocumentatie",
        item3: "Actieopvolging",
      },
      screenshotAlt: "Water-efficiëntiebeheer dashboardvoorbeeld",
      why: {
        title: "Van waterverbruiksregistraties naar traceerbare verbeteracties",
        description:
          "Water-efficiëntiewerk steunt vaak op verspreide meterstanden, locatieregistraties, procesniveau-aannames en actieplannen. Arvenza structureert deze input in een herhaalbare workflow zodat teams watergebruik, bewijsdocumentatie en verbeteracties op één plek kunnen volgen.",
      },
      capabilities: {
        title: "Kernmogelijkheden",
        description: "Gestructureerde waterdata, bewijs- en actieworkflows op locatieniveau — beschikbaar op aanvraag.",
        items: {
          item1: { title: "Structuur voor waterverbruiksdata", description: "Organiseer verbruiksregistraties per locatie, bron en rapportageperiode." },
          item2: { title: "Meter- en bronregistraties", description: "Beheer meterstanden en waterbron-documentatie in één archief." },
          item3: { title: "Voorbereiding van waterbalans", description: "Bereid balansinvoer voor op basis van intake-, gebruiks- en lozingsregistraties." },
          item4: { title: "Procesniveau-toerekeningsinput", description: "Leg procesniveau-toerekeningsaannames vast met traceerbare referenties." },
          item5: { title: "Opvolging van verbeteracties", description: "Volg geplande en voltooide water-efficiëntieacties met eigenaarschap." },
          item6: { title: "Documentatie van bewijsdossiers", description: "Koppel ondersteunende bestanden aan meterregistraties, acties en balansinvoer." },
          item7: { title: "Review- en rapportagegereedheid", description: "Bereid reviewgereed output voor interne goedkeuring en rapportagecycli." },
        },
      },
      workflow: {
        title: "Water-efficiëntiebeheer-workflow",
        description: "Van locatiedefinitie tot bewijsvoorbereiding en reviewgereed output.",
        steps: {
          step1: { title: "Definieer locatie en waterbronnen", description: "Stel locatiescope, waterbronnen en workflow-eigenaarschap vast." },
          step2: { title: "Verzamel meter- en activiteitsdata", description: "Verzamel meterstanden en activiteitsdata voor balansvoorbereiding." },
          step3: { title: "Bouw waterbalansinvoer op", description: "Structureer intake-, gebruiks- en lozingsinput voor balansreview." },
          step4: { title: "Volg verbeteracties op", description: "Monitor geplande acties, statusupdates en ondersteunend bewijs." },
          step5: { title: "Bereid bewijs en review-output voor", description: "Stel documentatie en reviewgereed rapportagepakketten samen." },
        },
      },
      audience: {
        title: "Voor wie",
        items: {
          item1: { title: "Duurzaamheidsteams", description: "Teams die waterdata en bewijs over locaties coördineren." },
          item2: { title: "Locatiemanagers", description: "Teams verantwoordelijk voor meterregistraties en watergebruik ter plaatse." },
          item3: { title: "Milieumanagers", description: "Functies die milieuprestaties en verbeterprogramma's beheren." },
          item4: { title: "Projectteams voor water-efficiëntie", description: "Projectgroepen die gerichte waterreductie-initiatieven uitvoeren." },
          item5: { title: "Adviseurs die bewijsdossiers beheren", description: "Adviseurs die gestructureerde bewijsdossiers voor klantreviews voorbereiden." },
        },
      },
      outputs: {
        title: "Workflow-output",
        items: {
          item1: { title: "Overzicht van waterdata per locatie", description: "Gestructureerd overzicht van verbruiks- en bronregistraties per locatie." },
          item2: { title: "Archief van meter- en bronregistraties", description: "Doorzoekbaar archief van meterstanden en brondocumentatie." },
          item3: { title: "Voorbereidingsbestand voor waterbalans", description: "Voorbereide balansinvoer klaar voor review en validatie." },
          item4: { title: "Tracker voor verbeteracties", description: "Statusoverzicht van geplande en voltooide efficiëntieacties." },
          item5: { title: "Bewijsdocumentatiedossier", description: "Gekoppelde bewijsbestanden ter ondersteuning van balans- en actieregistraties." },
          item6: { title: "Reviewgereed rapportagepakket", description: "Verpakte output voorbereid voor interne review en rapportagecycli." },
        },
      },
      architecture: {
        title: "Hoe deze module past binnen de Arvenza-architectuur",
        description:
          "Water-efficiëntiebeheer breidt het Arvenza-bewijsmodel uit voorbij koolstofgerichte workflows. Het gebruikt dezelfde operationele logica: gestructureerde data-invoer, bewijsdocumentatie, workflow-eigenaarschap en rapportageklare output.",
        layerKey: "documentationReporting",
        dataStructured: "Waterbronnen per locatie, meterregistraties en verbruiksdatastructuren",
        evidenceManaged: "Waterbalansinvoer, verbeteracties en ondersteunende documentatie",
        outputSupported: "Reviewgereed rapportagepakket en overzichtsbestanden per locatie",
      },
      cta: { title: "Toegang aanvragen voor Water-efficiëntiebeheer" },
    },
  },
};

function applyLocale(locale) {
  const filePath = path.join(ROOT, "messages", `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const c = COPY[locale];

  data.metadata.platformModules.waterEfficiency = c.metadata;
  data.nav.platformMenu.modules.waterEfficiency = { title: c.navModule };
  data.nav.platformMenu.onRequestModulesLabel = locale === "en"
    ? "Available on request capabilities"
    : locale === "tr"
      ? "Talep üzerine erişilebilir yetenekler"
      : "Beschikbaar op aanvraag-capabilities";
  data.nav.solutionsMenu.areas.waterEfficiency = c.solutionsMenu;
  data.platformHub.modules.waterEfficiency = c.platformHubModule;
  data.solutionsPage.sections.onRequest = c.solutionsSection;
  data.solutionsPage.solutions.waterEfficiency = c.solutionCard;
  data.solutionsPage.maturity.items.waterEfficiency = c.maturityItem;
  data.demo.form.interests.waterEfficiency = c.demoInterest;
  data.resourcesPage.resources.waterEfficiencyChecklist = c.resource;
  data.platformModules.waterEfficiency = c.module;
  data.platformModules.shared.previewPlaceholder = c.previewPlaceholder;

  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(`Updated messages/${locale}.json`);
}

for (const locale of LOCALES) {
  applyLocale(locale);
}

console.log("Water Efficiency i18n applied.");
