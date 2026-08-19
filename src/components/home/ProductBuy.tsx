/* [HOME] Section achat du produit hero — galerie + options + highlights
   (structure d'après 21st.dev #7820, re-tokenisée — RESEARCH §4). */
import { HERO_PRODUCT } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { Section } from "@/components/shared/Section";
import { HatchDivider } from "@/components/shared/HatchDivider";
import { RevealText } from "@/components/shared/RevealText";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductOptions } from "@/components/product/ProductOptions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ProductBuy() {
  const product = HERO_PRODUCT;

  return (
    <Section id="product" className="bg-surface">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery product={product} />

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <HatchDivider className="w-10" />
              <span className="type-meta text-subtle">{product.category}</span>
            </div>
            <RevealText as="h2" className="type-display-lg text-fg">
              {product.name}
            </RevealText>
            <p className="type-body-lg font-medium text-fg">
              {formatPrice(product.price)}
            </p>
            <p className="type-body max-w-lg text-subtle">
              {product.description}
            </p>
          </div>

          <ProductOptions product={product} />

          <Accordion
            type="single"
            collapsible
            defaultValue="highlights"
            className="hairline-t"
          >
            <AccordionItem value="highlights" className="border-border">
              <AccordionTrigger className="type-label rounded-none py-4 text-fg hover:no-underline">
                What you get
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-2">
                  {product.highlights.map((h) => (
                    <li key={h} className="flex items-baseline gap-3">
                      <span aria-hidden className="hatch h-2 w-4 shrink-0" />
                      <span className="type-body text-subtle">{h}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care" className="border-border">
              <AccordionTrigger className="type-label rounded-none py-4 text-fg hover:no-underline">
                Fabric &amp; care
              </AccordionTrigger>
              <AccordionContent>
                <p className="type-body max-w-lg text-subtle">
                  Polyester-spandex performance knit, UV FPS 50 rated. Cold
                  machine wash, hang dry in the shade, no iron, no softener —
                  it keeps the fit and the print.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </Section>
  );
}
