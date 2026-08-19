/* [INFRA] Scan lexical des garde-fous — échoue si un terme interdit
   apparaît dans src/**. Lexique : docs/GUARDRAILS.md (consolidé).
   Branché sur `npm run gate`. */
import { readFileSync } from "node:fs";
import { globSync } from "node:fs";

const FORBIDDEN = [
  "spf",
  "upf",
  "sunscreen",
  "dermatologist",
  "dermatologically",
  "clinically",
  "medical",
  "medically",
  "cancer",
  "melanoma",
  "certified",
  "certification",
  "guaranteed",
  "official partner",
  "sponsored by",
  "googleapis",
  "gstatic",
];

const FILES = globSync("src/**/*.{ts,tsx,md,json}");
let failed = false;

for (const file of FILES) {
  const text = readFileSync(file, "utf8").toLowerCase();
  for (const term of FORBIDDEN) {
    // \b : limites de mot pour éviter les faux positifs sur sous-chaînes
    if (new RegExp(`\\b${term.replace(/[/\\]/g, "\\$&")}\\b`).test(text)) {
      console.error(`${file} : terme interdit « ${term} »`);
      failed = true;
    }
  }
}

if (!failed) console.log(`✓ guardrails — ${FILES.length} fichiers scannés, aucun terme interdit`);
process.exit(failed ? 1 : 0);
