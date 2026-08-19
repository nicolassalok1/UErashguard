/* [HOME] Teaser catalogue — scroll horizontal snap natif (CONVENTIONS §6),
   cartes ProductCard (structure 21st.dev #17441/#8286). */
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { Section } from "@/components/shared/Section";
import { HatchDivider } from "@/components/shared/HatchDivider";
import { RevealText } from "@/components/shared/RevealText";
import { ProductCard } from "@/components/shop/ProductCard";

export function CatalogTeaser() {
  const rest = PRODUCTS.filter((p) => !p.hero);

  return (
    <Section id="catalog" className="hairline-t" bleed>
      <div className="container-site mb-12 flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-6">
          <HatchDivider />
          <RevealText as="h2" className="type-display-lg text-fg">
            The rest of the arsenal
          </RevealText>
        </div>
        <Link href="/shop" className="type-label link-underline py-2 text-fg">
          Shop all
        </Link>
      </div>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 lg:px-16">
        {rest.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
            className="w-[70vw] shrink-0 snap-start sm:w-[45vw] lg:w-[23vw]"
          />
        ))}
      </div>
    </Section>
  );
}
