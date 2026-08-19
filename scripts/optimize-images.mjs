/* [INFRA] Optimisation des photos — assets-src/ → public/images/ (WebP).
   Usage : node scripts/optimize-images.mjs
   Les sorties sont commitées ; relancer uniquement à l'ajout de photos.
   Mapping sémantique : CONVENTIONS §7, sélection : RESEARCH §5. */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const SRC = "assets-src";
const OUT = "public/images";
const MAX_W = 2048;
const QUALITY = 82;

/** destination → fichier source */
const MAP = {
  // — UV Long Sleeve (produit hero)
  "products/uv-ls-model.webp": "WhatsApp_Image_20260819_at_12.20.00_2.jpeg",
  "products/uv-ls-mockup.webp": "WhatsApp_Image_20260819_at_12.20.00.jpeg",
  "products/uv-ls-gloves.webp": "WhatsApp_Image_20260819_at_12.19.59.jpeg",
  "brand/uv-fps50.webp": "WhatsApp_Image_20260819_at_12.20.00_1.jpeg",
  "lifestyle/uv-rider.webp": "WhatsApp_Image_20260819_at_12.19.56.jpeg",
  // — Boxing gloves
  "products/gloves-set.webp": "DSC00618.jpg",
  "products/gloves-detail.webp": "DSC00621.jpg",
  "products/gloves-strap.webp": "DSC00623.jpg",
  "products/gloves-pair.webp": "DSC00625.jpg",
  "products/gloves-red.webp": "WhatsApp_Image_20260819_at_12.20.01.jpeg",
  "products/gloves-blue.webp": "WhatsApp_Image_20260819_at_12.20.02.jpeg",
  // — MMA gloves
  "products/mma-pair.webp": "DSC00635.jpg",
  "products/mma-fist.webp": "DSC00632.jpg",
  "products/mma-open.webp": "DSC00633.jpg",
  "products/mma-punch.webp": "DSC00631.jpg",
  "products/mma-grip.webp": "DSC00634.jpg",
  "products/mma-black.webp": "WhatsApp_Image_20260819_at_12.20.01_1.jpeg",
  // — Shinguards
  "products/shinguards.webp": "DSC00626.jpg",
  "products/shinguards-gloves.webp": "DSC006562.jpg",
  // — Gi black
  "products/gi-black-flat.webp": "DSC00646.jpg",
  "products/gi-black-open.webp": "DSC00638.jpg",
  "products/gi-black-worn.webp": "DSC0065222.jpg",
  "products/gi-black-back.webp": "DSC00663.jpg",
  // — Gi white
  "products/gi-white-worn.webp": "DSC00675.jpg",
  "products/gi-white-stand.webp": "DSC006752.jpg",
  "products/gi-white-detail.webp": "DSC00677.jpg",
  // — Rashguard
  "products/rashguard-side.webp": "DSC006482.jpg",
  "products/rashguard-back.webp": "DSC00650.jpg",
  "products/rashguard-detail.webp": "DSC00669.jpg",
  // — Belt
  "products/belt.webp": "DSC00680.jpg",
  // — Lifestyle / compétition (N&B→couleur via RevealImage, pas en data)
  "lifestyle/elephant-back.webp": "WhatsApp_Image_20260819_at_12.19.57_1.jpeg",
  "lifestyle/comp-grappling.webp": "WhatsApp_Image_20260819_at_12.19.56_1.jpeg",
  "lifestyle/comp-action.webp": "WhatsApp_Image_20260819_at_12.19.57.jpeg",
  "lifestyle/comp-team.webp": "WhatsApp_Image_20260819_at_12.19.58.jpeg",
  "lifestyle/comp-victory.webp": "WhatsApp_Image_20260819_at_12.19.58_1.jpeg",
  "lifestyle/comp-flag.webp": "WhatsApp_Image_20260819_at_12.19.59_1.jpeg",
  "lifestyle/comp-medal.webp": "WhatsApp_Image_20260819_at_12.19.56_2.jpeg",
  // — Story (adultes uniquement — GUARDRAILS §4)
  "brand/flag-team.webp": "Sabai_May9.jpg",
  "brand/belt-detail.webp": "DSC00680.jpg",
  "brand/gi-detail.webp": "DSC00660.jpg",
};

let done = 0;
for (const [dest, srcName] of Object.entries(MAP)) {
  const srcPath = path.join(SRC, srcName);
  if (!existsSync(srcPath)) {
    console.error(`✗ source manquante : ${srcPath}`);
    process.exitCode = 1;
    continue;
  }
  const outPath = path.join(OUT, dest);
  await mkdir(path.dirname(outPath), { recursive: true });
  await sharp(srcPath)
    .rotate()
    .resize({ width: MAX_W, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outPath);
  done++;
}
console.log(`✓ ${done}/${Object.keys(MAP).length} images optimisées → ${OUT}`);
