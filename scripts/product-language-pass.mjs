#!/usr/bin/env node
/**
 * Product language and architecture pass — i18n patches for EN/TR/NL.
 * Run: node scripts/product-language-pass.mjs
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

const SUPPLIER_SOLUTION = {
  en: {
    title: "Supplier Evidence Workflows",
    problem:
      "Compliance teams need repeatable supplier outreach, data requests, evidence upload and follow-up workflows shared across CBAM, packaging and product-data programs",
    approach:
      "The Supplier Evidence Workflow roadmap module is planned to unify supplier communication, evidence quality marking and follow-up logic across Arvenza use cases",
    capability: "Supplier Evidence Workflow",
    workflowSteps: {
      step1: "Define supplier scope",
      step2: "Issue data requests",
      step3: "Review evidence quality",
      step4: "Track follow-up actions",
    },
    features: {
      item1: "Supplier outreach",
      item2: "Evidence upload",
      item3: "Follow-up queue",
    },
    output: "Structured supplier evidence trail per product scope",
    targetTeam: "Compliance operations, procurement and sustainability teams coordinating supplier data",
    cta: "Follow roadmap",
    secondaryCta: "View roadmap module",
  },
  tr: {
    title: "Tedarikçi Kanıt İş Akışları",
    problem:
      "Uyum ekipleri CBAM, ambalaj ve ürün verisi programları genelinde tekrarlanabilir tedarikçi iletişimi, veri talebi, kanıt yükleme ve takip iş akışlarına ihtiyaç duyar",
    approach:
      "Tedarikçi Kanıt İş Akışı yol haritası modülü; tedarikçi iletişimi, kanıt kalite işaretleme ve takip mantığını Arvenza kullanım senaryolarında birleştirmeyi planlar",
    capability: "Tedarikçi Kanıt İş Akışı",
    workflowSteps: {
      step1: "Tedarikçi kapsamını tanımlayın",
      step2: "Veri talepleri gönderin",
      step3: "Kanıt kalitesini inceleyin",
      step4: "Takip eylemlerini izleyin",
    },
    features: {
      item1: "Tedarikçi iletişimi",
      item2: "Kanıt yükleme",
      item3: "Takip kuyruğu",
    },
    output: "Ürün kapsamı başına yapılandırılmış tedarikçi kanıt izi",
    targetTeam: "Tedarikçi verisini koordine eden uyum operasyonları, tedarik ve sürdürülebilirlik ekipleri",
    cta: "Yol Haritasını Takip Edin",
    secondaryCta: "Yol haritası modülünü inceleyin",
  },
  nl: {
    title: "Leveranciersbewijsworkflows",
    problem:
      "Compliance-teams hebben herhaalbare leverancierscommunicatie, dataverzoeken, bewijsupload en opvolgworkflows nodig in CBAM-, verpakking- en productdataprogramma's",
    approach:
      "De roadmapmodule Leveranciersbewijsworkflow is gepland om leverancierscommunicatie, bewijskwaliteitsmarkering en opvolglogica te verenigen in Arvenza-use cases",
    capability: "Leveranciersbewijsworkflow",
    workflowSteps: {
      step1: "Leveranciersscope definiëren",
      step2: "Dataverzoeken versturen",
      step3: "Bewijskwaliteit beoordelen",
      step4: "Opvolgacties volgen",
    },
    features: {
      item1: "Leverancierscommunicatie",
      item2: "Bewijsupload",
      item3: "Opvolgqueue",
    },
    output: "Gestructureerd leveranciersbewijsspoor per productscope",
    targetTeam: "Compliance-operaties, inkoop en duurzaamheidsteams die leveranciersdata coördineren",
    cta: "Roadmap volgen",
    secondaryCta: "Roadmapmodule bekijken",
  },
};

const ESG_SOLUTION = {
  en: {
    title: "ESG Evidence & Reporting Workspace",
    problem:
      "ESG and reporting teams need to coordinate evidence inputs, reporting-cycle documentation and traceability across multiple sustainability workflows",
    approach:
      "The ESG Evidence & Reporting Workspace roadmap module is planned for evidence coordination, reporting inputs and documentation traceability",
    capability: "ESG Evidence & Reporting Workspace",
    workflowSteps: {
      step1: "Define reporting scope",
      step2: "Collect evidence inputs",
      step3: "Structure documentation",
      step4: "Prepare review outputs",
    },
    features: {
      item1: "Evidence coordination",
      item2: "Reporting inputs",
      item3: "Documentation traceability",
    },
    output: "Structured ESG evidence workspace per reporting cycle",
    targetTeam: "ESG, sustainability reporting and compliance teams preparing evidence-led disclosures",
    cta: "Follow roadmap",
    secondaryCta: "View roadmap module",
  },
  tr: {
    title: "ESG Kanıt ve Raporlama Çalışma Alanı",
    problem:
      "ESG ve raporlama ekipleri; kanıt girdilerini, raporlama döngüsü dokümantasyonunu ve birden fazla sürdürülebilirlik iş akışında izlenebilirliği koordine etmek zorundadır",
    approach:
      "ESG Kanıt ve Raporlama Çalışma Alanı yol haritası modülü; kanıt koordinasyonu, raporlama girdileri ve dokümantasyon izlenebilirliği için planlanmaktadır",
    capability: "ESG Kanıt ve Raporlama Çalışma Alanı",
    workflowSteps: {
      step1: "Raporlama kapsamını tanımlayın",
      step2: "Kanıt girdilerini toplayın",
      step3: "Dokümantasyonu yapılandırın",
      step4: "İnceleme çıktılarını hazırlayın",
    },
    features: {
      item1: "Kanıt koordinasyonu",
      item2: "Raporlama girdileri",
      item3: "Dokümantasyon izlenebilirliği",
    },
    output: "Raporlama döngüsü başına yapılandırılmış ESG kanıt çalışma alanı",
    targetTeam: "Kanıta dayalı açıklamalar hazırlayan ESG, sürdürülebilirlik raporlama ve uyum ekipleri",
    cta: "Yol Haritasını Takip Edin",
    secondaryCta: "Yol haritası modülünü inceleyin",
  },
  nl: {
    title: "ESG-bewijs- en rapportagewerkruimte",
    problem:
      "ESG- en rapportageteams moeten bewijsinputs, documentatie per rapportagecyclus en traceerbaarheid over meerdere duurzaamheidsworkflows coördineren",
    approach:
      "De roadmapmodule ESG-bewijs- en rapportagewerkruimte is gepland voor bewiscoördinatie, rapportage-inputs en documentatie-traceerbaarheid",
    capability: "ESG-bewijs- en rapportagewerkruimte",
    workflowSteps: {
      step1: "Rapportagescope definiëren",
      step2: "Bewijsinputs verzamelen",
      step3: "Documentatie structureren",
      step4: "Reviewoutputs voorbereiden",
    },
    features: {
      item1: "Bewiscoördinatie",
      item2: "Rapportage-inputs",
      item3: "Documentatie-traceerbaarheid",
    },
    output: "Gestructureerde ESG-bewijswerkruimte per rapportagecyclus",
    targetTeam: "ESG-, duurzaamheidsrapportage- en compliance-teams die op bewijs gebaseerde disclosures voorbereiden",
    cta: "Roadmap volgen",
    secondaryCta: "Roadmapmodule bekijken",
  },
};

const EXPANSION = {
  en: {
    title: "Architecture expansion on the same evidence model",
    description:
      "Future capabilities extend the platform architecture through early-access and roadmap modules — detailed workflows live under Solutions.",
    earlyAccessLabel: "Early access capabilities",
    roadmapLabel: "Roadmap capabilities",
    viewSolutionsCta: "View all solutions",
  },
  tr: {
    title: "Aynı kanıt modeli üzerinde mimari genişleme",
    description:
      "Gelecek yetenekler platform mimarisini erken erişim ve yol haritası modülleriyle genişletir — ayrıntılı iş akışları Çözümler altında yer alır.",
    earlyAccessLabel: "Erken erişim yetenekleri",
    roadmapLabel: "Yol haritası yetenekleri",
    viewSolutionsCta: "Tüm çözümleri inceleyin",
  },
  nl: {
    title: "Architectuuruitbreiding op hetzelfde bewijsmodel",
    description:
      "Toekomstige capabilities breiden de platformarchitectuur uit via modules in vroege toegang en roadmap — gedetailleerde workflows staan onder Oplossingen.",
    earlyAccessLabel: "Capabilities in vroege toegang",
    roadmapLabel: "Roadmap-capabilities",
    viewSolutionsCta: "Alle oplossingen bekijken",
  },
};

const PLATFORM_MENU = {
  en: {
    architectureLabel: "Platform architecture",
    architectureLinks: {
      platformArchitecture: "Platform architecture",
      evidenceModel: "Evidence model",
      calculationWorkflow: "Calculation workflow",
    },
    earlyAccessLabel: "Early access capabilities",
    viewSolutionsCta: "View all solutions",
    featuredLabel: "Featured product",
  },
  tr: {
    architectureLabel: "Platform mimarisi",
    architectureLinks: {
      platformArchitecture: "Platform mimarisi",
      evidenceModel: "Kanıt modeli",
      calculationWorkflow: "Hesaplama iş akışı",
    },
    earlyAccessLabel: "Erken erişim yetenekleri",
    viewSolutionsCta: "Tüm çözümleri inceleyin",
    featuredLabel: "Öne çıkan ürün",
  },
  nl: {
    architectureLabel: "Platformarchitectuur",
    architectureLinks: {
      platformArchitecture: "Platformarchitectuur",
      evidenceModel: "Bewijsmodel",
      calculationWorkflow: "Berekeningsworkflow",
    },
    earlyAccessLabel: "Capabilities in vroege toegang",
    viewSolutionsCta: "Alle oplossingen bekijken",
    featuredLabel: "Uitgelicht product",
  },
};

for (const locale of LOCALES) {
  const bundle = load(locale);
  const d = bundle.data;

  d.platformHub.expansion = EXPANSION[locale];
  Object.assign(d.nav.platformMenu, PLATFORM_MENU[locale]);

  d.nav.resourcesMenu.items.updates =
    locale === "en" ? "Updates" : locale === "tr" ? "Güncellemeler" : "Updates";
  delete d.nav.resourcesMenu.items.insights;

  d.platformHub.heroChips =
    locale === "en"
      ? { item1: "Ready CBAM Calculation Engine", item2: "Shared evidence architecture", item3: "Transparent capability map" }
      : locale === "tr"
        ? {
            item1: "Kullanıma hazır CBAM Calculation Engine",
            item2: "Ortak kanıt mimarisi",
            item3: "Şeffaf yetenek haritası",
          }
        : {
            item1: "Gereed CBAM Calculation Engine",
            item2: "Gedeeld bewijsarchitectuur",
            item3: "Transparante capability-kaart",
          };

  d.platformHub.cta.secondary =
    locale === "en" ? "View solutions" : locale === "tr" ? "Çözümleri inceleyin" : "Oplossingen bekijken";

  d.industriesPage.sectors.description =
    locale === "en"
      ? "Structured regulation workflows for different sectors using the same evidence logic — Ready, Early Access or Roadmap"
      : locale === "tr"
        ? "Farklı sektörler için aynı kanıt mantığıyla yapılandırılmış regülasyon iş akışları — Kullanıma hazır, Erken Erişim veya Yol Haritası"
        : "Gestructureerde regelgevingsworkflows voor verschillende sectoren met dezelfde bewijslogica — Gereed, Vroege Toegang of Roadmap";

  if (d.companyPage?.heroChips) {
    if (locale === "tr") {
      d.companyPage.heroChips.item2 = "Kullanıma hazır CBAM Calculation Engine";
      d.companyPage.heroChips.item3 = "Hollanda merkezli işletici";
    }
  }

  d.solutionsPage.solutions.supplierEvidence = SUPPLIER_SOLUTION[locale];
  d.solutionsPage.solutions.esgReporting = ESG_SOLUTION[locale];
  d.solutionsPage.maturity.items.supplierEvidence = SUPPLIER_SOLUTION[locale].title;
  d.solutionsPage.maturity.items.esgReporting = ESG_SOLUTION[locale].title;

  if (locale === "en") {
    d.solutionsPage.solutions.cbamWorkflows.cta = "Explore CBAM Calculation Engine";
    d.solutionsPage.solutions.cbamConsole.cta = "Request early access";
    d.solutionsPage.solutions.ppwr.cta = "Request early access";
    d.solutionsPage.solutions.agriClimate.cta = "Request early access";
    d.solutionsPage.solutions.eudr.cta = "Follow roadmap";
    d.solutionsPage.solutions.dpp.cta = "Follow roadmap";
    d.metadata.platformModules.ppwr.title =
      "PPWR / Packaging Compliance | Packaging Data and Supplier Evidence";
    d.metadata.platformModules.cbamComplianceConsole.title =
      "CBAM Compliance Console | Evidence and Reporting Readiness";
  } else if (locale === "tr") {
    d.solutionsPage.solutions.cbamWorkflows.cta = "CBAM Calculation Engine'i İnceleyin";
    d.solutionsPage.solutions.cbamConsole.cta = "Erken Erişim Talep Edin";
    d.solutionsPage.solutions.ppwr.cta = "Erken Erişim Talep Edin";
    d.solutionsPage.solutions.agriClimate.cta = "Erken Erişim Talep Edin";
    d.solutionsPage.solutions.eudr.cta = "Yol Haritasını Takip Edin";
    d.solutionsPage.solutions.dpp.cta = "Yol Haritasını Takip Edin";
    d.metadata.platformModules.ppwr.title =
      "PPWR / Ambalaj Uyumu | Ambalaj Verisi ve Tedarikçi Kanıtı";
    d.metadata.platformModules.cbamComplianceConsole.title =
      "CBAM Compliance Console | Kanıt ve Raporlama Hazırlığı";
  } else {
    d.solutionsPage.solutions.cbamWorkflows.cta = "CBAM Calculation Engine bekijken";
    d.solutionsPage.solutions.cbamConsole.cta = "Vroege toegang aanvragen";
    d.solutionsPage.solutions.ppwr.cta = "Vroege toegang aanvragen";
    d.solutionsPage.solutions.agriClimate.cta = "Vroege toegang aanvragen";
    d.solutionsPage.solutions.eudr.cta = "Roadmap volgen";
    d.solutionsPage.solutions.dpp.cta = "Roadmap volgen";
    d.metadata.platformModules.ppwr.title =
      "PPWR / Packaging Compliance | Verpakkingsdata en leveranciersbewijs";
    d.metadata.platformModules.cbamComplianceConsole.title =
      "CBAM Compliance Console | Bewijs- en rapportagegereedheid";
  }

  save(bundle);
  console.log(`✓ Patched ${locale}.json`);
}

console.log("\nProduct language pass complete");
