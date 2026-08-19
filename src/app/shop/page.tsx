/* [SHOP] Catalogue — grid ProductCard (structure 21st.dev #8286). */
import type { Metadata } from "next";
import { PRODUCTS } from "@/data/products";
import { Section } from "@/components/shared/Section";
import { HatchDivider } from "@/components/shared/HatchDivider";
import { RevealText } from "@/components/shared/RevealText";
import { ProductCard } from "@/components/shop/ProductCard";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "All Sabai Fight Gear — UV Long Sleeve, boxing gloves, MMA gloves, shinguards, gis, rashguards and belts.",
};

export default function ShopPage() {
  return (
    <Section>
      <div className="mb-14 flex flex-col gap-6">
        <HatchDivider />
        <RevealText as="h1" className="type-display-lg text-fg">
          All gear
        </RevealText>
        <p className="type-body max-w-lg text-subtle">
          Everything we make, from the mats to open water. Built by fighters
          since 2015.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </Section>
  );
}
