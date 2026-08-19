/* [HOME] Hero — one-product UV Long Sleeve. Structure éditoriale split
   inspirée de 21st.dev #4927/#17441 (intro cinématique + commerce hero),
   re-tokenisée DA. LCP = image priority, jamais opacity:0 initial
   (web-method §4) — seuls les textes se révèlent. */
import Image from "next/image";
import Link from "next/link";
import { HERO_PRODUCT } from "@/data/products";
import { SITE } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { RevealText } from "@/components/shared/RevealText";
import { HatchDivider } from "@/components/shared/HatchDivider";
import { AddToCartButton } from "@/components/shared/AddToCartButton";

export function Hero() {
  const product = HERO_PRODUCT;

  return (
    <section className="hairline-b relative overflow-hidden">
      <div className="container-site grid min-h-[calc(100svh-4rem)] grid-cols-1 items-stretch gap-10 py-12 lg:grid-cols-12 lg:gap-6 lg:py-16">
        {/* Copy */}
        <div className="flex flex-col justify-center gap-8 lg:col-span-6 xl:col-span-5">
          <div className="flex items-center gap-4">
            <HatchDivider className="w-10" />
            <p className="type-meta text-subtle">
              {SITE.name} — {product.badge?.toUpperCase()} — {product.category}
            </p>
          </div>

          {/* taille bornée : la colonne est étroite, « AGAINST » doit tenir
              sur sa ligne masquée (revue visuelle 2026-08-19) */}
          <RevealText
            as="h1"
            className="type-display-xl text-fg lg:text-[clamp(3.25rem,5.8vw,5.75rem)]"
          >
            One layer against the sun
          </RevealText>

          <RevealText
            as="p"
            delay={0.15}
            className="type-body-lg max-w-md text-subtle"
          >
            {product.description}
          </RevealText>

          <div className="flex flex-wrap items-center gap-4">
            <AddToCartButton product={product} size="M">
              Add to cart — {formatPrice(product.price)}
            </AddToCartButton>
            <Link
              href="#product"
              className="type-label link-underline py-3 text-fg"
            >
              See details
            </Link>
          </div>

          <p className="type-meta text-subtle">{SITE.since}</p>
        </div>

        {/* Image produit — LCP */}
        <div className="relative lg:col-span-6 xl:col-span-7">
          <div className="hairline relative aspect-[4/5] h-full max-h-[78svh] w-full overflow-hidden bg-surface">
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
              className="object-cover object-top"
            />
            <div className="scrim-b absolute inset-0" aria-hidden />
            <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-5">
              <span className="type-label bg-brand px-3 py-2 text-fg">
                {product.category}
              </span>
              <span className="type-meta text-fg/80">
                Bike · Run · Surf · Outdoor
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
