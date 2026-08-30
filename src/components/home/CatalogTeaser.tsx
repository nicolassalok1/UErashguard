/* [HOME] Teaser catalogue — scroll horizontal snap natif (CONVENTIONS §6),
   cartes ProductCard (structure 21st.dev #17441/#8286).
   MAJ 2026-08-30 : ancre éditoriale « kit complet » (planche studio du shoot,
   contenue et encadrée — rashguard-da §4bis). */
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { Section } from "@/components/shared/Section";
import { HatchDivider } from "@/components/shared/HatchDivider";
import { RevealText } from "@/components/shared/RevealText";
import { RevealImage } from "@/components/shared/RevealImage";
import { ProductCard } from "@/components/shop/ProductCard";

export function CatalogTeaser() {
  const rest = PRODUCTS.filter((p) => !p.hero);

  return (
    <Section id="catalog" className="hairline-t" bleed>
      <div className="container-site mb-12 grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-6 lg:col-span-6">
          <HatchDivider />
          <RevealText as="h2" className="type-display-lg text-fg">
            The rest of the arsenal
          </RevealText>
          <p className="type-body max-w-md text-subtle">
            Gloves, shinguards, shorts, gis and belts — one kit, one standard,
            the same question stitched on all of it.
          </p>
          <Link
            href="/shop"
            className="type-label link-underline w-fit py-2 text-fg"
          >
            Shop all
          </Link>
        </div>

        <div className="hairline lg:col-span-6">
          <RevealImage
            src="/images/lifestyle/kit-full.webp"
            alt="Sabai athlete in full kit — short sleeve, shorts and boxing gloves"
            sizes="(max-width: 1024px) 100vw, 50vw"
            fit="contain"
            className="aspect-[3/2] w-full bg-surface"
            imgClassName="p-6"
          />
        </div>
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
