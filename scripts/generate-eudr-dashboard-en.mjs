#!/usr/bin/env node
/**
 * Generates public/assets/screenshots/eudr/dashboard-en.png — English EUDR UI mockup.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT = path.join(process.cwd(), "public/assets/screenshots/eudr/dashboard-en.png");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1920" height="1200" viewBox="0 0 1920 1200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sidebar" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0b1530"/>
      <stop offset="100%" stop-color="#071225"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>
  </defs>
  <rect width="1920" height="1200" fill="#eef1f6"/>
  <rect x="0" y="0" width="260" height="1200" fill="url(#sidebar)"/>
  <text x="32" y="52" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700">ARVENZA</text>
  <text x="32" y="88" fill="#94a3b8" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" letter-spacing="0.12em">EUDR PLATFORM</text>
  <rect x="20" y="110" width="220" height="36" rx="8" fill="#7c3aed" fill-opacity="0.22"/>
  <text x="36" y="133" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600">Overview</text>
  <text x="32" y="178" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="10" font-weight="700" letter-spacing="0.14em">EUDR MANAGEMENT</text>
  <text x="36" y="206" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">Products</text>
  <text x="36" y="234" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">Suppliers</text>
  <text x="36" y="262" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">Origin &amp; Location</text>
  <text x="36" y="290" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">Risk Assessment</text>
  <text x="36" y="318" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">Declaration Files</text>
  <text x="36" y="346" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">Evidence &amp; Documents</text>
  <text x="36" y="374" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="13">Tasks &amp; Workflows</text>
  <rect x="280" y="0" width="1640" height="64" fill="#ffffff"/>
  <text x="304" y="40" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="13">EUDR | EUDR Due Diligence &amp; Traceability Platform</text>
  <text x="1680" y="40" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">EN</text>
  <text x="1740" y="40" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600">Anka Sustainability</text>
  <text x="304" y="118" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700">EUDR Overview</text>
  <text x="304" y="150" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="14">Track products, supply chains and due diligence readiness across commodity scopes.</text>
  <rect x="304" y="176" width="220" height="92" rx="12" fill="#ffffff" stroke="#dde5f2"/>
  <text x="324" y="206" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">Products in Scope</text>
  <text x="324" y="244" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700">128</text>
  <rect x="540" y="176" width="220" height="92" rx="12" fill="#ffffff" stroke="#dde5f2"/>
  <text x="560" y="206" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">Suppliers</text>
  <text x="560" y="244" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700">342</text>
  <rect x="776" y="176" width="220" height="92" rx="12" fill="#ffffff" stroke="#dde5f2"/>
  <text x="796" y="206" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">High Risk Records</text>
  <text x="796" y="244" fill="#dc2626" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700">27</text>
  <rect x="1012" y="176" width="220" height="92" rx="12" fill="#ffffff" stroke="#dde5f2"/>
  <text x="1032" y="206" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">Readiness Score</text>
  <text x="1032" y="244" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700">74/100</text>
  <rect x="304" y="292" width="928" height="420" rx="16" fill="#ffffff" stroke="#dde5f2"/>
  <text x="328" y="328" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700">Supply Chain Map</text>
  <ellipse cx="520" cy="520" rx="280" ry="150" fill="#dbeafe" stroke="#93c5fd" stroke-width="2"/>
  <path d="M420 560 Q620 420 820 500" stroke="#06b6d4" stroke-width="3" fill="none"/>
  <path d="M380 620 Q560 480 760 560" stroke="#7c3aed" stroke-width="3" fill="none"/>
  <circle cx="420" cy="560" r="8" fill="#2563eb"/>
  <circle cx="820" cy="500" r="8" fill="#059669"/>
  <text x="328" y="690" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="11">Low Risk</text>
  <rect x="400" y="676" width="10" height="10" rx="2" fill="#059669"/>
  <text x="490" y="690" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="11">Medium Risk</text>
  <rect x="462" y="676" width="10" height="10" rx="2" fill="#f59e0b"/>
  <text x="590" y="690" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="11">High Risk</text>
  <rect x="562" y="676" width="10" height="10" rx="2" fill="#dc2626"/>
  <rect x="1256" y="292" width="540" height="420" rx="16" fill="#ffffff" stroke="#dde5f2"/>
  <text x="1280" y="328" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700">Tasks &amp; Workflows</text>
  <text x="1280" y="372" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13">Supplier declaration pending</text>
  <text x="1680" y="372" fill="#dc2626" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600">Overdue</text>
  <text x="1280" y="412" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13">Missing location coordinates</text>
  <text x="1680" y="412" fill="#f59e0b" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600">In review</text>
  <text x="1280" y="452" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13">Risk assessment pending</text>
  <text x="1680" y="452" fill="#f59e0b" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600">In review</text>
  <text x="1280" y="492" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="13">Upload evidence document</text>
  <text x="1680" y="492" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600">To complete</text>
  <rect x="304" y="736" width="620" height="300" rx="16" fill="#ffffff" stroke="#dde5f2"/>
  <text x="328" y="772" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700">Risk Distribution</text>
  <circle cx="420" cy="880" r="72" fill="none" stroke="#059669" stroke-width="24" stroke-dasharray="180 452"/>
  <circle cx="420" cy="880" r="72" fill="none" stroke="#f59e0b" stroke-width="24" stroke-dasharray="120 452" stroke-dashoffset="-180"/>
  <rect x="960" y="736" width="836" height="300" rx="16" fill="#ffffff" stroke="#dde5f2"/>
  <text x="984" y="772" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700">Data Completeness Rate</text>
  <text x="984" y="840" fill="#071225" font-family="Segoe UI, Arial, sans-serif" font-size="42" font-weight="700">68%</text>
  <text x="984" y="880" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="13">Location coordinates · 24% missing</text>
  <text x="984" y="908" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="13">Production area records · 18% missing</text>
  <rect x="20" y="1080" width="220" height="96" rx="12" fill="#111827" stroke="#334155"/>
  <text x="36" y="1110" fill="#94a3b8" font-family="Segoe UI, Arial, sans-serif" font-size="11">EUDR mandatory declaration</text>
  <text x="36" y="1142" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700">1 January 2027</text>
  <text x="36" y="1166" fill="#64748b" font-family="Segoe UI, Arial, sans-serif" font-size="12">554 days remaining</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(OUT);
console.log(`Generated ${OUT}`);
