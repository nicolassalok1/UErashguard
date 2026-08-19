/* [SHOP] Fiche produit — structure d'après 21st.dev #7820 (galerie +
   options + contenu), re-tokenisée DA. `params` est une Promise (Next 16,
   CONVENTIONS §8). */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, getProduct } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { Section } from "@/components/shared/Section";
import { HatchDivider } from "@/components/shared/HatchDivider";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductOptions } from "@/components/product/ProductOptions";
import { ProductCard } from "@/components/shop/ProductCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  ).slice(0, 3);

  return (
    <>
      <Section className="pt-12 lg:pt-16">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/shop" className="type-meta link-underline text-subtle">
                Shop
              </Link>
            </li>
            <li aria-hidden className="type-meta text-subtle">
              /
            </li>
            <li className="type-meta text-fg">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery product={product} priority />

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <HatchDivider className="w-10" />
                <span className="type-meta text-subtle">
                  {product.category}
                </span>
              </div>
              <h1 className="type-display-lg text-fg">{product.name}</h1>
              <p className="type-body-lg font-medium text-fg">
                {formatPrice(product.price)}
              </p>
              <p className="type-body max-w-lg text-subtle">
                {product.description}
              </p>
            </div>

            <ProductOptions product={product} />

            <ul className="hairline-t flex flex-col gap-2 pt-6">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-baseline gap-3">
                  <span aria-hidden className="hatch h-2 w-4 shrink-0" />
                  <span className="type-body text-subtle">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section className="hairline-t pt-16">
          <h2 className="type-headline mb-8 text-fg">More {product.category}</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
