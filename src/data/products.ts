/* [CONTENU] Catalogue produits — POC.
   ⚠ TODO PRIX RÉELS : tous les prix sont des placeholders à confirmer par le client
   (couverts par le bandeau preview site-wide — GUARDRAILS §5).
   Wording UV : « UV FPS 50 » exclusivement (GUARDRAILS §1). */

export type ProductImage = {
  src: string;
  alt: string;
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
    images: [
      {
        src: "/images/products/uv-ls-model.webp",
        alt: "UV Long Sleeve worn with a boxing glove over the shoulder",
      },
      {
        src: "/images/products/uv-ls-mockup.webp",
        alt: "UV Long Sleeve front and back view",
      },
      {
        src: "/images/products/uv-ls-gloves.webp",
        alt: "UV Long Sleeve with crossed arms and boxing gloves",
      },
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
    price: 259,
    images: [
      {
        src: "/images/products/gloves-set.webp",
        alt: "White and red Sabai boxing gloves on dark mats",
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
        src: "/images/products/gloves-red.webp",
        alt: "Red and black colorway boxing gloves",
      },
      {
        src: "/images/products/gloves-blue.webp",
        alt: "Blue and black colorway boxing gloves",
      },
    ],
    sizes: ["10oz", "12oz", "14oz", "16oz"],
    colors: [
      { name: "White / Red", value: "#e8e6e1" },
      { name: "Red / Black", value: "#b3241a" },
      { name: "Blue / Black", value: "#2b3f8f" },
    ],
    description:
      "Our flagship gloves — layered foam, full wrist strap, and the fit feedback of ten years of fighters. The strap says what they are for.",
    highlights: [
      "Multi-layer impact foam",
      "Full hook-and-loop wrist strap",
      "Premium synthetic leather shell",
      "Embroidered — What You Fight For?",
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
    slug: "shinguards",
    name: "Shinguards",
    category: "Striking",
    price: 229,
    images: [
      {
        src: "/images/products/shinguards.webp",
        alt: "Black Sabai shinguards with red elephant logo",
      },
      {
        src: "/images/products/shinguards-gloves.webp",
        alt: "Shinguards and boxing gloves on dark mats",
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
        src: "/images/products/gi-black-open.webp",
        alt: "Black gi jacket open showing inner print",
      },
      {
        src: "/images/products/gi-black-worn.webp",
        alt: "Black gi worn, front view",
      },
      {
        src: "/images/products/gi-black-back.webp",
        alt: "Black gi shoulder embroidery detail",
      },
    ],
    sizes: ["A0", "A1", "A2", "A3", "A4"],
    description:
      "Competition-cut pearl weave gi. Malaysian and Brazilian flags on the shoulder — where this gi lives and where it comes from.",
    highlights: [
      "Pearl weave jacket",
      "Ripstop pants",
      "Embroidered — no patches to peel",
      "IBJJF-style competition cut",
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
    ],
    sizes: ["A0", "A1", "A2", "A3", "A4"],
    description:
      "The classic. Same pearl weave and cut as the black — in the color every academy accepts.",
    highlights: [
      "Pearl weave jacket",
      "Ripstop pants",
      "Reinforced stress points",
    ],
  },
  {
    slug: "competition-rashguard",
    name: "Competition Rashguard",
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
    slug: "bjj-belt",
    name: "BJJ Belt",
    category: "Grappling",
    price: 89,
    images: [
      {
        src: "/images/products/belt.webp",
        alt: "Black BJJ belt knot detail on white gi",
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
    highlights: ["Dense 8-layer core", "Holds the knot", "Embroidered rank bar"],
  },
];

export const HERO_PRODUCT = PRODUCTS.find((p) => p.hero) ?? PRODUCTS[0];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
