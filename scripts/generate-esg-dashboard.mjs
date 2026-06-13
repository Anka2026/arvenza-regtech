#!/usr/bin/env node
/**
 * Generates ESG Workspace dashboard screenshots:
 *   public/assets/screenshots/esg-workspace/dashboard.png    (TR)
 *   public/assets/screenshots/esg-workspace/dashboard-en.png (EN)
 */
import path from "node:path";
import sharp from "sharp";

const DIR = path.join(process.cwd(), "public/assets/screenshots/esg-workspace");

function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildSvg(locale) {
  const tr = locale === "tr";
  const L = tr
    ? {
        workspace: "ESG ÇALIŞMA ALANI",
        overview: "Genel Bakış",
        section: "ESG KANITI",
        nav1: "Kanıt Kütüphanesi",
        nav2: "Raporlama Girdileri",
        nav3: "Dokümantasyon",
        nav4: "Tedarikçi Kayıtları",
        nav5: "Gözden Geçirme",
        nav6: "Denetim İzi",
        breadcrumb: "ESG | Kanıt ve Raporlama Çalışma Alanı",
        localeTag: "TR",
        title: "ESG Kanıt Genel Bakışı",
        subtitle:
          "ESG iş akışları genelinde kanıt durumu, raporlama girdileri ve dokümantasyon hazırlığını koordine edin.",
        card1: "Kanıt Kalemleri",
        card2: "Gözden Geçirmeye Hazır",
        card3: "Eksik Kanıt",
        card4: "Raporlama Hazırlığı",
        panel1: "Kategoriye Göre Kanıt Durumu",
        cat1: "Çevresel beyanlar",
        cat2: "Sosyal ve yönetişim kayıtları",
        cat3: "Tedarikçi dokümantasyonu",
        cat4: "Raporlama döngüsü girdileri",
        panel2: "Dokümantasyon Paneli",
        doc1: "Kapsam 3 tedarikçi anketi",
        doc2: "Tesis enerji kayıtları",
        doc3: "Politika beyanı yüklemesi",
        doc4: "Tedarikçi takip talebi",
        statusReady: "Hazır",
        statusReview: "Kalite İncelemesi",
        statusMissing: "Eksik Kanıt",
        statusProgress: "Devam Ediyor",
        timeline: "Raporlama Hazırlığı Zaman Çizelgesi",
        step1: "Kanıt alımı",
        step2: "Kalite incelemesi",
        step3: "Raporlama montajı",
        step4: "İç onay",
      }
    : {
        workspace: "ESG WORKSPACE",
        overview: "Overview",
        section: "ESG EVIDENCE",
        nav1: "Evidence Library",
        nav2: "Reporting Inputs",
        nav3: "Documentation",
        nav4: "Supplier Records",
        nav5: "Review",
        nav6: "Audit Trail",
        breadcrumb: "ESG | Evidence & Reporting Workspace",
        localeTag: "EN",
        title: "ESG Evidence Overview",
        subtitle:
          "Coordinate evidence status, reporting inputs and documentation readiness across ESG workflows.",
        card1: "Evidence Items",
        card2: "Ready for Review",
        card3: "Missing Evidence",
        card4: "Reporting Readiness",
        panel1: "Evidence Status by Category",
        cat1: "Environmental disclosures",
        cat2: "Social & governance records",
        cat3: "Supplier documentation",
        cat4: "Reporting cycle inputs",
        panel2: "Documentation Panel",
        doc1: "Scope 3 supplier questionnaire",
        doc2: "Facility energy records",
        doc3: "Policy attestation upload",
        doc4: "Supplier follow-up request",
        statusReady: "Ready",
        statusReview: "Review",
        statusMissing: "Missing Evidence",
        statusProgress: "In Progress",
        timeline: "Reporting Readiness Timeline",
        step1: "Evidence intake",
        step2: "Quality review",
        step3: "Reporting assembly",
        step4: "Internal sign-off",
      };

  const t = (key) => escapeXml(L[key]);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1920" height="1200" viewBox="0 0 1920 1200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sidebar" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0b1530"/>
      <stop offset="100%" stop-color="#071225"/>
    </linearGradient>
  </defs>
  <rect width="1920" height="1200" fill="#eef1f6"/>
  <rect x="0" y="0" width="260" height="1200" fill="url(#sidebar)"/>
  <text x="32" y="52" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700">ARVENZA</text>
  <text x="32" y="88" fill="#94a3b8" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" letter-spacing="0.12em">${t("workspace")}</text>
  <rect x="20" y="110" width="220" height="36" rx="8" fill="#7c3aed" fill-opacity="0.22"/>
  <text x="36" y="133" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600">${t("overview")}</text>
  <text x="32" y="178" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="10" font-weight="700" letter-spacing="0.14em">${t("section")}</text>
  <text x="36" y="206" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">${t("nav1")}</text>
  <text x="36" y="234" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">${t("nav2")}</text>
  <text x="36" y="262" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">${t("nav3")}</text>
  <text x="36" y="290" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">${t("nav4")}</text>
  <text x="36" y="318" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">${t("nav5")}</text>
  <text x="36" y="346" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">${t("nav6")}</text>
  <rect x="280" y="0" width="1640" height="64" fill="#ffffff"/>
  <text x="304" y="40" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="13">${t("breadcrumb")}</text>
  <text x="1680" y="40" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">${t("localeTag")}</text>
  <text x="1740" y="40" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600">Anka Sustainability</text>
  <text x="304" y="118" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700">${t("title")}</text>
  <text x="304" y="150" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="14">${t("subtitle")}</text>
  <rect x="304" y="176" width="200" height="88" rx="12" fill="#ffffff" stroke="#dde5f2"/>
  <text x="324" y="206" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">${t("card1")}</text>
  <text x="324" y="242" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="700">186</text>
  <rect x="520" y="176" width="200" height="88" rx="12" fill="#ffffff" stroke="#dde5f2"/>
  <text x="540" y="206" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">${t("card2")}</text>
  <text x="540" y="242" fill="#059669" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="700">94</text>
  <rect x="736" y="176" width="200" height="88" rx="12" fill="#ffffff" stroke="#dde5f2"/>
  <text x="756" y="206" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">${t("card3")}</text>
  <text x="756" y="242" fill="#dc2626" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="700">31</text>
  <rect x="952" y="176" width="200" height="88" rx="12" fill="#ffffff" stroke="#dde5f2"/>
  <text x="972" y="206" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">${t("card4")}</text>
  <text x="972" y="242" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="700">72%</text>
  <rect x="304" y="284" width="620" height="380" rx="16" fill="#ffffff" stroke="#dde5f2"/>
  <text x="328" y="320" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700">${t("panel1")}</text>
  <rect x="328" y="348" width="520" height="28" rx="6" fill="#f1f5f9"/>
  <rect x="328" y="348" width="364" height="28" rx="6" fill="#7c3aed" fill-opacity="0.35"/>
  <text x="328" y="398" fill="#475569" font-family="Segoe UI, Arial, sans-serif" font-size="13">${t("cat1")}</text>
  <text x="780" y="398" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600">70%</text>
  <rect x="328" y="418" width="520" height="28" rx="6" fill="#f1f5f9"/>
  <rect x="328" y="418" width="416" height="28" rx="6" fill="#2563eb" fill-opacity="0.32"/>
  <text x="328" y="468" fill="#475569" font-family="Segoe UI, Arial, sans-serif" font-size="13">${t("cat2")}</text>
  <text x="780" y="468" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600">80%</text>
  <rect x="328" y="488" width="520" height="28" rx="6" fill="#f1f5f9"/>
  <rect x="328" y="488" width="312" height="28" rx="6" fill="#06b6d4" fill-opacity="0.35"/>
  <text x="328" y="538" fill="#475569" font-family="Segoe UI, Arial, sans-serif" font-size="13">${t("cat3")}</text>
  <text x="780" y="538" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600">60%</text>
  <rect x="328" y="558" width="520" height="28" rx="6" fill="#f1f5f9"/>
  <rect x="328" y="558" width="468" height="28" rx="6" fill="#059669" fill-opacity="0.28"/>
  <text x="328" y="608" fill="#475569" font-family="Segoe UI, Arial, sans-serif" font-size="13">${t("cat4")}</text>
  <text x="780" y="608" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600">90%</text>
  <rect x="948" y="284" width="848" height="380" rx="16" fill="#ffffff" stroke="#dde5f2"/>
  <text x="972" y="320" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700">${t("panel2")}</text>
  <text x="972" y="364" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13">${t("doc1")}</text>
  <text x="1680" y="364" fill="#059669" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600">${t("statusReady")}</text>
  <text x="972" y="404" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13">${t("doc2")}</text>
  <text x="1680" y="404" fill="#f59e0b" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600">${t("statusReview")}</text>
  <text x="972" y="444" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13">${t("doc3")}</text>
  <text x="1680" y="444" fill="#dc2626" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600">${t("statusMissing")}</text>
  <text x="972" y="484" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13">${t("doc4")}</text>
  <text x="1680" y="484" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600">${t("statusProgress")}</text>
  <rect x="304" y="688" width="1492" height="280" rx="16" fill="#ffffff" stroke="#dde5f2"/>
  <text x="328" y="724" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700">${t("timeline")}</text>
  <line x1="360" y1="820" x2="1720" y2="820" stroke="#dde5f2" stroke-width="2"/>
  <circle cx="480" cy="820" r="10" fill="#7c3aed"/>
  <circle cx="760" cy="820" r="10" fill="#2563eb"/>
  <circle cx="1040" cy="820" r="10" fill="#06b6d4"/>
  <circle cx="1320" cy="820" r="10" fill="#94a3b8"/>
  <text x="440" y="860" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">${t("step1")}</text>
  <text x="720" y="860" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">${t("step2")}</text>
  <text x="990" y="860" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">${t("step3")}</text>
  <text x="1280" y="860" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">${t("step4")}</text>
</svg>`;
}

async function writePng(filename, locale) {
  const out = path.join(DIR, filename);
  await sharp(Buffer.from(buildSvg(locale))).png({ compressionLevel: 9 }).toFile(out);
  console.log(`Generated ${out}`);
}

await writePng("dashboard.png", "tr");
await writePng("dashboard-en.png", "en");
console.log("ESG dashboard screenshots complete.");
