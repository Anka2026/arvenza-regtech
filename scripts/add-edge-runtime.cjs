const fs = require("fs");
const path = require("path");

const root = path.join(process.cwd(), "app");
const targets = ["page.tsx", "layout.tsx", "not-found.tsx"];

function walk(dir) {
  if (!fs.existsSync(dir)) {
    console.error("app folder not found:", dir);
    process.exit(1);
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full);
      continue;
    }

    if (!entry.isFile() || !targets.includes(entry.name)) continue;

    let content = fs.readFileSync(full, "utf8");

    if (content.includes("runtime = 'edge'") || content.includes('runtime = "edge"')) {
      console.log("Already has runtime:", path.relative(process.cwd(), full));
      continue;
    }

    if (content.startsWith("'use client'") || content.startsWith('"use client"')) {
      console.log("Skipped client file:", path.relative(process.cwd(), full));
      continue;
    }

    content = "export const runtime = 'edge';\n\n" + content;
    fs.writeFileSync(full, content);
    console.log("Added runtime:", path.relative(process.cwd(), full));
  }
}

walk(root);
