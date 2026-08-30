/* [CONTENU] Catalogue produits — POC.
   ⚠ TODO PRIX RÉELS : tous les prix sont des placeholders à confirmer par le client
   (couverts par le bandeau preview site-wide — GUARDRAILS §5).
   Wording UV : « UV FPS 50 » exclusivement (GUARDRAILS §1).

   MAJ 2026-08-30 — annotations client (captures annotées) :
   · UV Long Sleeve : galerie réduite à la seule photo produit valide (rider).
     ⚠ TODO PHOTOS : 3 visuels retirés (mockups / mauvais produit), à remplacer.
   · Boxing gloves : RM 229, coloris blanc + noir, tailles 06/08/12/16 oz.
   · Shinguards : RM 259, photos « porté », la photo de gi part vers BJJ Gi.
   · BJJ Gi : tailles femme F0–F4, « Competition approved », photos compétition.
   · Rashguard renommé « Believe In Yourself Rashguard ».
   · BJJ Belt : nouvelle photo (broderie What You Fight For?).
   · Nouveaux : MMA shorts, Kids boxing gloves, Short Sleeve, BJJ Kids Gi. */

export type ProductImage = {
  src: string;
  alt: string;
  /** Planche studio fond clair (shoot 2026-08-30) : rendue `object-contain`
      encadrée sur le noir, jamais recadrée — rashguard-da §4bis. */
  plate?: boolean;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number; // MYR — placeholder
  badge?: string;
  hero?: boolean;
  images: ProductImage[];
  sizes?: string[];
  colors?: { name: string; value: string }[];
  description: string;
  highlights: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "uv-longsleeve",
    name: "UV Long Sleeve",
    category: "UV FPS 50",
    price: 159,
    badge: "New",
    hero: true,
    // ⚠ TODO PHOTOS : une seule photo produit validée à ce jour.
    images: [
      {
        src: "/images/lifestyle/uv-rider.webp",
        alt: "Rider wearing the UV Long Sleeve on a scooter",
      },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "One layer between you and the sun. UV FPS 50 rated fabric, cut for long hours outside — bike, run, surf, roadwork. Breathable, quick-dry, and built to the same standard as our fight gear.",
    highlights: [
      "UV FPS 50 rated fabric",
      "Breathable, quick-dry knit",
      "Flatlock seams — no rub on long distance",
      "Athletic cut, full arm cover",
      "Built by fighters, worn everywhere",
    ],
  },
  {
    slug: "classic-boxing-gloves",
    name: "Classic Boxing Gloves",
    category: "Striking",
    price: 229,
    images: [
      {
        src: "/images/products/gloves-set.webp",
        alt: "White Sabai boxing gloves on dark mats",
      },
      {
        src: "/images/products/gloves-worn.webp",
        alt: "Black Sabai boxing gloves worn in guard",
        plate: true,
      },
      {
        src: "/images/products/gloves-detail.webp",
        alt: "Boxing gloves close-up with elephant logo",
      },
      {
        src: "/images/products/gloves-strap.webp",
        alt: "Boxing glove strap embroidered What You Fight For",
      },
      {
        src: "/images/products/gloves-pair.webp",
        alt: "Pair of Sabai boxing gloves side by side",
      },
      {
        src: "/images/products/gloves-sizes.webp",
        alt: "Sabai boxing gloves lined up from the smallest to the largest size",
        plate: true,
      },
    ],
    sizes: ["06oz", "08oz", "12oz", "16oz"],
    colors: [
      { name: "White", value: "#e8e6e1" },
      { name: "Black", value: "#1a1a1a" },
    ],
    description:
      "Our flagship gloves — layered foam, full wrist strap, and the fit feedback of years of fighters. The strap says what they are for.",
    highlights: [
      "Multi-layer impact foam",
      "Full hook-and-loop wrist strap",
      "Premium synthetic leather shell",
      "Embroidered — What You Fight For?",
    ],
  },
  {
    slug: "kids-boxing-gloves",
    name: "Kids Boxing Gloves",
    category: "Striking",
    price: 179,
    badge: "New",
    // GUARDRAILS §4 — photos d'un mineur : droits confirmés oralement par le
    // client (2026-08-30). ⚠ À FORMALISER PAR ÉCRIT avant mise en production.
    // Le packshot sans personne reste en image 1 (vignette shop et carte).
    images: [
      {
        src: "/images/products/gloves-sizes.webp",
        alt: "Sabai boxing gloves lined up from kids to adult sizes",
        plate: true,
      },
      {
        src: "/images/products/kids-gloves-guard.webp",
        alt: "Young fighter in guard wearing Sabai kids boxing gloves",
        plate: true,
      },
      {
        src: "/images/products/kids-gloves-close.webp",
        alt: "Sabai kids boxing gloves held close in guard",
        plate: true,
      },
    ],
    sizes: ["4oz", "6oz", "8oz"], // TODO TAILLES : à confirmer client
    colors: [{ name: "Black", value: "#1a1a1a" }],
    description:
      "The same build as the adult gloves, scaled down and softened for young hands. Wide strap they can close alone, foam that forgives a missed angle.",
    highlights: [
      "Kid-scaled hand compartment",
      "Softer multi-layer foam",
      "Wide wrist strap — easy to close alone",
      "Same shell as the adult glove",
    ],
  },
  {
    slug: "mma-sparring-gloves",
    name: "MMA Sparring Gloves",
    category: "Grappling",
    price: 199,
    images: [
      {
        src: "/images/products/mma-pair.webp",
        alt: "White and red MMA sparring gloves pair",
      },
      {
        src: "/images/products/mma-fist.webp",
        alt: "Closed fist in MMA sparring glove",
      },
      {
        src: "/images/products/mma-open.webp",
        alt: "Open palm MMA sparring glove",
      },
      {
        src: "/images/products/mma-black.webp",
        alt: "Black and red MMA gloves",
      },
    ],
    sizes: ["S/M", "L/XL"],
    description:
      "Open-palm sparring gloves with real knuckle cover. Grip, clinch and strike without changing gear.",
    highlights: [
      "Open palm for grip and clinch",
      "Segmented knuckle padding",
      "Double wrist closure",
    ],
  },
  {
    slug: "mma-shorts",
    name: "MMA Shorts",
    category: "Striking",
    price: 149,
    badge: "New",
    images: [
      {
        src: "/images/products/shorts-side.webp",
        alt: "Sabai MMA shorts worn, side split and elephant logo",
        plate: true,
      },
      {
        src: "/images/products/shorts-back.webp",
        alt: "Sabai MMA shorts from the back, What You Fight For print",
        plate: true,
      },
      {
        src: "/images/products/shorts-flat.webp",
        alt: "Sabai MMA shorts flat lay",
        plate: true,
      },
      {
        src: "/images/products/shorts-glove.webp",
        alt: "MMA shorts worn with Sabai boxing gloves",
        plate: true,
      },
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", value: "#1a1a1a" }],
    description:
      "Cut for the full range — high side split, flat waistband, nothing that digs in on a shot or a check. The question is printed down the leg.",
    highlights: [
      "High side split for kicks and shots",
      "Flat elastic waistband with inner cord",
      "Sublimated print — never cracks",
      "What You Fight For? down the leg",
    ],
  },
  {
    slug: "shinguards",
    name: "Shinguards",
    category: "Striking",
    price: 259,
    images: [
      {
        src: "/images/products/shinguards-worn.webp",
        alt: "Sabai shinguards worn, front view",
        plate: true,
      },
      {
        src: "/images/products/shinguards-side.webp",
        alt: "Sabai shinguards worn, side view of the shin plate",
        plate: true,
      },
      {
        src: "/images/products/shinguards-pair.webp",
        alt: "Pair of Sabai shinguards with instep cover",
        plate: true,
      },
    ],
    sizes: ["M", "L", "XL"],
    description:
      "Full-front shin and instep cover that stays in place through rounds of low kicks and checks.",
    highlights: [
      "Contoured shin plate",
      "Locked instep cover",
      "Double elastic back straps",
    ],
  },
  {
    slug: "bjj-gi-black",
    name: "BJJ Gi — Black",
    category: "Grappling",
    price: 359,
    images: [
      {
        src: "/images/products/gi-black-flat.webp",
        alt: "Black Sabai BJJ gi flat lay with white belt",
      },
      {
        src: "/images/products/gi-black-worn-f.webp",
        alt: "Black Sabai gi worn with a purple belt",
        plate: true,
      },
      {
        src: "/images/products/gi-black-worn.webp",
        alt: "Black gi worn, front view",
      },
      {
        src: "/images/products/gi-black-open.webp",
        alt: "Black gi jacket open showing inner print",
      },
      {
        src: "/images/products/gi-black-back.webp",
        alt: "Black gi shoulder embroidery detail",
      },
      {
        src: "/images/lifestyle/comp-grappling.webp",
        alt: "Sabai gi in a competition guard pass",
      },
      {
        src: "/images/lifestyle/comp-medal.webp",
        alt: "Sabai athlete with a medal after a competition",
      },
    ],
    sizes: ["A0", "A1", "A2", "A3", "A4", "F0", "F1", "F2", "F3", "F4"],
    description:
      "Competition-cut pearl weave gi. Malaysian and Brazilian flags on the shoulder — where this gi lives and where it comes from.",
    highlights: [
      "Pearl weave jacket",
      "Ripstop pants",
      "Embroidered — no patches to peel",
      "Competition approved",
    ],
  },
  {
    slug: "bjj-gi-white",
    name: "BJJ Gi — White",
    category: "Grappling",
    price: 359,
    images: [
      {
        src: "/images/products/gi-white-worn.webp",
        alt: "White Sabai gi worn with black belt",
      },
      {
        src: "/images/products/gi-white-stand.webp",
        alt: "White gi standing portrait",
      },
      {
        src: "/images/products/gi-white-detail.webp",
        alt: "White gi shoulder logo detail",
      },
      {
        src: "/images/lifestyle/comp-action.webp",
        alt: "Sabai gi in competition action",
      },
      {
        src: "/images/lifestyle/comp-victory.webp",
        alt: "Sabai athlete having their hand raised after a match",
      },
    ],
    sizes: ["A0", "A1", "A2", "A3", "A4", "F0", "F1", "F2", "F3", "F4"],
    description:
      "The classic. Same pearl weave and cut as the black — in the color every academy accepts.",
    highlights: [
      "Pearl weave jacket",
      "Ripstop pants",
      "Reinforced stress points",
      "Competition approved",
    ],
  },
  {
    slug: "bjj-gi-kids",
    name: "BJJ Gi — Kids",
    category: "Grappling",
    price: 259,
    badge: "New",
    // ⚠ TODO PHOTOS : visuels de la coupe adulte en attendant les photos kids.
    images: [
      {
        src: "/images/products/gi-black-flat.webp",
        alt: "Sabai BJJ gi flat lay with belt",
      },
      {
        src: "/images/products/gi-black-open.webp",
        alt: "Sabai gi jacket open showing inner print",
      },
      {
        src: "/images/products/gi-black-back.webp",
        alt: "Sabai gi shoulder embroidery detail",
      },
    ],
    sizes: ["M4x0", "M3x0", "M2x0", "M0", "M1", "M2", "M3"],
    description:
      "The academy gi in kid sizes. Same pearl weave, same embroidery, cut to survive a season of growth spurts and Saturday tournaments.",
    highlights: [
      "Pearl weave jacket",
      "Ripstop pants",
      "Embroidered — no patches to peel",
      "Competition approved",
    ],
  },
  {
    slug: "believe-in-yourself-rashguard",
    name: "Believe In Yourself Rashguard",
    category: "Grappling",
    price: 149,
    images: [
      {
        src: "/images/products/rashguard-side.webp",
        alt: "White competition rashguard, Believe In Yourself sleeve print",
      },
      {
        src: "/images/products/rashguard-back.webp",
        alt: "Competition rashguard back print",
      },
      {
        src: "/images/products/rashguard-detail.webp",
        alt: "Rashguard sleeve logo detail",
      },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "No-gi competition rashguard. Compression fit, sublimated print that will not crack — Believe In Yourself down the sleeve.",
    highlights: [
      "Compression fit",
      "Sublimated print — never cracks",
      "Flatlock seams",
    ],
  },
  {
    slug: "what-you-fight-for-short-sleeve",
    name: "What You Fight For? Short Sleeve",
    category: "Grappling",
    price: 129,
    badge: "New",
    images: [
      {
        src: "/images/products/ss-rash-worn.webp",
        alt: "Sabai short sleeve rashguard worn, side view",
        plate: true,
      },
      {
        src: "/images/products/ss-rash-worn-back.webp",
        alt: "Short sleeve rashguard from the back, What You Fight For print",
        plate: true,
      },
      {
        src: "/images/products/ss-rash-front.webp",
        alt: "Sabai short sleeve rashguard front, flat lay",
        plate: true,
      },
      {
        src: "/images/products/ss-rash-back.webp",
        alt: "Sabai short sleeve rashguard back, flat lay",
        plate: true,
      },
      {
        src: "/images/lifestyle/kit-studio.webp",
        alt: "Short sleeve worn head to toe with Sabai shorts, gloves and shinguards",
        plate: true,
      },
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "White / Red", value: "#e8e6e1" }],
    description:
      "The short sleeve cut, for the rounds where you want your forearms free. Malaysian and Brazilian flags on the sleeve, the question across the back.",
    highlights: [
      "Compression fit, short sleeve",
      "Sublimated print — never cracks",
      "Flatlock seams",
      "What You Fight For? across the back",
    ],
  },
  {
    slug: "bjj-belt",
    name: "BJJ Belt",
    category: "Grappling",
    price: 89,
    images: [
      {
        src: "/images/products/belt.webp",
        alt: "Sabai BJJ belt embroidered What You Fight For",
        plate: true,
      },
      {
        src: "/images/products/belt-full.webp",
        alt: "Sabai BJJ belt full length with rank bar",
        plate: true,
      },
    ],
    sizes: ["A1", "A2", "A3", "A4"],
    colors: [
      { name: "White", value: "#e8e6e1" },
      { name: "Blue", value: "#2b3f8f" },
      { name: "Purple", value: "#5b3a8f" },
      { name: "Brown", value: "#6b4a2f" },
      { name: "Black", value: "#1a1a1a" },
    ],
    description:
      "Dense cotton belt that holds a knot through a full training day. Earn it, then keep it for good.",
    highlights: [
      "Dense 8-layer core",
      "Holds the knot",
      "Embroidered rank bar",
      "Embroidered — What You Fight For?",
    ],
  },
  {
    slug: "drawstring-bag",
    name: "Drawstring Bag",
    category: "Accessories",
    price: 49,
    badge: "New",
    images: [
      {
        src: "/images/products/bag.webp",
        alt: "Black Sabai drawstring gym bag with the elephant wordmark",
        plate: true,
      },
      {
        src: "/images/products/bag-fightfor.webp",
        alt: "Drawstring gym bag printed What You Fight For?",
        plate: true,
      },
    ],
    colors: [{ name: "Black", value: "#1a1a1a" }],
    description:
      "For the kit that comes home wet. Water-resistant shell, corner-reinforced eyelets, and cords long enough to wear it over a gi on the walk back.",
    highlights: [
      "Water-resistant shell",
      "Corner-reinforced cord eyelets",
      "Cords double as shoulder straps",
      "What You Fight For? on the reverse",
    ],
  },
];

export const HERO_PRODUCT = PRODUCTS.find((p) => p.hero) ?? PRODUCTS[0];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
