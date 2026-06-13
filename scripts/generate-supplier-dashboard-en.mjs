#!/usr/bin/env node
/** Generates public/assets/screenshots/supplier-evidence/dashboard-en.png */
import path from "node:path";
import sharp from "sharp";

const OUT = path.join(process.cwd(), "public/assets/screenshots/supplier-evidence/dashboard-en.png");

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
  <text x="32" y="88" fill="#94a3b8" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" letter-spacing="0.12em">SUPPLIER EVIDENCE</text>
  <rect x="20" y="110" width="220" height="36" rx="8" fill="#7c3aed" fill-opacity="0.22"/>
  <text x="36" y="133" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600">Overview</text>
  <text x="32" y="178" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="10" font-weight="700" letter-spacing="0.14em">WORKFLOWS</text>
  <text x="36" y="206" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">Data Requests</text>
  <text x="36" y="234" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">Evidence Uploads</text>
  <text x="36" y="262" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">Follow-up Queue</text>
  <text x="36" y="290" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">Documentation</text>
  <rect x="280" y="0" width="1640" height="64" fill="#ffffff"/>
  <text x="304" y="40" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="13">Supplier Evidence | Supplier Data Collection &amp; Evidence Flow</text>
  <text x="1680" y="40" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">EN</text>
  <text x="1740" y="40" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600">Anka Sustainability</text>
  <text x="304" y="118" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700">Supplier Data Collection &amp; Evidence Flow</text>
  <text x="304" y="150" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="14">Track supplier onboarding, evidence requests and documentation status across compliance workflows.</text>
  <rect x="304" y="176" width="220" height="92" rx="12" fill="#ffffff" stroke="#dde5f2"/>
  <text x="324" y="206" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">Active Suppliers</text>
  <text x="324" y="244" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700">248</text>
  <rect x="540" y="176" width="220" height="92" rx="12" fill="#ffffff" stroke="#dde5f2"/>
  <text x="560" y="206" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">Ready for Review</text>
  <text x="560" y="244" fill="#059669" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700">112</text>
  <rect x="776" y="176" width="220" height="92" rx="12" fill="#ffffff" stroke="#dde5f2"/>
  <text x="796" y="206" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">Missing Evidence</text>
  <text x="796" y="244" fill="#dc2626" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700">46</text>
  <rect x="1012" y="176" width="220" height="92" rx="12" fill="#ffffff" stroke="#dde5f2"/>
  <text x="1032" y="206" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">Open Requests</text>
  <text x="1032" y="244" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700">38</text>
  <rect x="304" y="292" width="620" height="400" rx="16" fill="#ffffff" stroke="#dde5f2"/>
  <text x="328" y="328" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700">Supplier Onboarding Status</text>
  <text x="328" y="372" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13">Supplier profile completed</text>
  <text x="780" y="372" fill="#059669" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600">Ready for Review</text>
  <text x="328" y="412" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13">Contact verification pending</text>
  <text x="780" y="412" fill="#f59e0b" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600">Data Quality Review</text>
  <text x="328" y="452" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13">Documentation template assigned</text>
  <text x="780" y="452" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600">Documentation Status</text>
  <text x="328" y="492" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13">Initial evidence package missing</text>
  <text x="780" y="492" fill="#dc2626" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600">Missing Evidence</text>
  <rect x="948" y="292" width="848" height="400" rx="16" fill="#ffffff" stroke="#dde5f2"/>
  <text x="972" y="328" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700">Evidence Request Queue</text>
  <text x="972" y="372" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13">Emission data template — Q2 cycle</text>
  <text x="1680" y="372" fill="#f59e0b" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600">Supplier Follow-up</text>
  <text x="972" y="412" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13">Product BOM evidence upload</text>
  <text x="1680" y="412" fill="#059669" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600">Ready for Review</text>
  <text x="972" y="452" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13">Facility certificate renewal</text>
  <text x="1680" y="452" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600">Documentation Status</text>
  <text x="972" y="492" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13">Methodology attestation form</text>
  <text x="1680" y="492" fill="#f59e0b" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600">Data Quality Review</text>
  <rect x="304" y="716" width="1492" height="260" rx="16" fill="#ffffff" stroke="#dde5f2"/>
  <text x="328" y="752" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700">Documentation Status Summary</text>
  <rect x="328" y="784" width="320" height="120" rx="12" fill="#f8fafc" stroke="#dde5f2"/>
  <text x="348" y="816" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">Submitted this cycle</text>
  <text x="348" y="856" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="32" font-weight="700">164</text>
  <rect x="672" y="784" width="320" height="120" rx="12" fill="#f8fafc" stroke="#dde5f2"/>
  <text x="692" y="816" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">Awaiting supplier response</text>
  <text x="692" y="856" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="32" font-weight="700">38</text>
  <rect x="1016" y="784" width="320" height="120" rx="12" fill="#f8fafc" stroke="#dde5f2"/>
  <text x="1036" y="816" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">Flagged for quality review</text>
  <text x="1036" y="856" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="32" font-weight="700">22</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(OUT);
console.log(`Generated ${OUT}`);
