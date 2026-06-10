#!/usr/bin/env node
/**
 * Deep-merge platform TR/NL translations into messages/*.json
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

for (const locale of ["tr", "nl"]) {
  const messagesPath = path.join(root, "messages", `${locale}.json`);
  const patchPath = path.join(root, "scripts", `platform-modules-i18n-${locale}.json`);
  const polishPath = path.join(root, "scripts", `polish-i18n-${locale}.json`);

  const messages = JSON.parse(fs.readFileSync(messagesPath, "utf8"));
  const patch = JSON.parse(fs.readFileSync(patchPath, "utf8"));
  deepMerge(messages, patch);

  if (fs.existsSync(polishPath)) {
    const polish = JSON.parse(fs.readFileSync(polishPath, "utf8"));
    deepMerge(messages, polish);
  }

  fs.writeFileSync(messagesPath, `${JSON.stringify(messages, null, 2)}\n`);
  console.log(`Merged platform + polish i18n into messages/${locale}.json`);
}
