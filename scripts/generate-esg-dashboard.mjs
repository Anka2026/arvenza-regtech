#!/usr/bin/env node
/** Generates public/assets/screenshots/esg-workspace/dashboard.png */
import path from "node:path";
import sharp from "sharp";

const OUT = path.join(process.cwd(), "public/assets/screenshots/esg-workspace/dashboard.png");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
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
  <text x="32" y="88" fill="#94a3b8" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" letter-spacing="0.12em">ESG WORKSPACE</text>
  <rect x="20" y="110" width="220" height="36" rx="8" fill="#7c3aed" fill-opacity="0.22"/>
  <text x="36" y="133" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600">Overview</text>
  <text x="32" y="178" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="10" font-weight="700" letter-spacing="0.14em">ESG EVIDENCE</text>
  <text x="36" y="206" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">Evidence Library</text>
  <text x="36" y="234" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">Reporting Inputs</text>
  <text x="36" y="262" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">Documentation</text>
  <text x="36" y="290" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">Supplier Records</text>
  <text x="36" y="318" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">Review Queue</text>
  <text x="36" y="346" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">Audit Trail</text>
  <rect x="280" y="0" width="1640" height="64" fill="#ffffff"/>
  <text x="304" y="40" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="13">ESG | Evidence &amp; Reporting Workspace</text>
  <text x="1680" y="40" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">EN</text>
  <text x="1740" y="40" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600">Anka Sustainability</text>
  <text x="304" y="118" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700">ESG Evidence Overview</text>
  <text x="304" y="150" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="14">Coordinate evidence status, reporting inputs and documentation readiness across ESG workflows.</text>
  <rect x="304" y="176" width="200" height="88" rx="12" fill="#ffffff" stroke="#dde5f2"/>
  <text x="324" y="206" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">Evidence Items</text>
  <text x="324" y="242" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="700">186</text>
  <rect x="520" y="176" width="200" height="88" rx="12" fill="#ffffff" stroke="#dde5f2"/>
  <text x="540" y="206" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">Ready for Review</text>
  <text x="540" y="242" fill="#059669" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="700">94</text>
  <rect x="736" y="176" width="200" height="88" rx="12" fill="#ffffff" stroke="#dde5f2"/>
  <text x="756" y="206" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">Missing Evidence</text>
  <text x="756" y="242" fill="#dc2626" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="700">31</text>
  <rect x="952" y="176" width="200" height="88" rx="12" fill="#ffffff" stroke="#dde5f2"/>
  <text x="972" y="206" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">Reporting Readiness</text>
  <text x="972" y="242" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="700">72%</text>
  <rect x="304" y="284" width="620" height="380" rx="16" fill="#ffffff" stroke="#dde5f2"/>
  <text x="328" y="320" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700">Evidence Status by Category</text>
  <rect x="328" y="348" width="520" height="28" rx="6" fill="#f1f5f9"/>
  <rect x="328" y="348" width="364" height="28" rx="6" fill="#7c3aed" fill-opacity="0.35"/>
  <text x="328" y="398" fill="#475569" font-family="Segoe UI, Arial, sans-serif" font-size="13">Environmental disclosures</text>
  <text x="780" y="398" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600">70%</text>
  <rect x="328" y="418" width="520" height="28" rx="6" fill="#f1f5f9"/>
  <rect x="328" y="418" width="416" height="28" rx="6" fill="#2563eb" fill-opacity="0.32"/>
  <text x="328" y="468" fill="#475569" font-family="Segoe UI, Arial, sans-serif" font-size="13">Social &amp; governance records</text>
  <text x="780" y="468" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600">80%</text>
  <rect x="328" y="488" width="520" height="28" rx="6" fill="#f1f5f9"/>
  <rect x="328" y="488" width="312" height="28" rx="6" fill="#06b6d4" fill-opacity="0.35"/>
  <text x="328" y="538" fill="#475569" font-family="Segoe UI, Arial, sans-serif" font-size="13">Supplier documentation</text>
  <text x="780" y="538" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600">60%</text>
  <rect x="328" y="558" width="520" height="28" rx="6" fill="#f1f5f9"/>
  <rect x="328" y="558" width="468" height="28" rx="6" fill="#059669" fill-opacity="0.28"/>
  <text x="328" y="608" fill="#475569" font-family="Segoe UI, Arial, sans-serif" font-size="13">Reporting cycle inputs</text>
  <text x="780" y="608" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600">90%</text>
  <rect x="948" y="284" width="848" height="380" rx="16" fill="#ffffff" stroke="#dde5f2"/>
  <text x="972" y="320" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700">Documentation Panel</text>
  <text x="972" y="364" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13">Scope 3 supplier questionnaire</text>
  <text x="1680" y="364" fill="#059669" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600">Ready for Review</text>
  <text x="972" y="404" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13">Facility energy records</text>
  <text x="1680" y="404" fill="#f59e0b" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600">Data Quality Review</text>
  <text x="972" y="444" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13">Policy attestation upload</text>
  <text x="1680" y="444" fill="#dc2626" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600">Missing Evidence</text>
  <text x="972" y="484" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13">Supplier follow-up request</text>
  <text x="1680" y="484" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600">Supplier Follow-up</text>
  <rect x="304" y="688" width="1492" height="280" rx="16" fill="#ffffff" stroke="#dde5f2"/>
  <text x="328" y="724" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700">Reporting Readiness Timeline</text>
  <line x1="360" y1="820" x2="1720" y2="820" stroke="#dde5f2" stroke-width="2"/>
  <circle cx="480" cy="820" r="10" fill="#7c3aed"/>
  <circle cx="760" cy="820" r="10" fill="#2563eb"/>
  <circle cx="1040" cy="820" r="10" fill="#06b6d4"/>
  <circle cx="1320" cy="820" r="10" fill="#94a3b8"/>
  <text x="440" y="860" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">Evidence intake</text>
  <text x="720" y="860" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">Quality review</text>
  <text x="990" y="860" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">Reporting assembly</text>
  <text x="1280" y="860" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">Internal sign-off</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(OUT);
console.log(`Generated ${OUT}`);
