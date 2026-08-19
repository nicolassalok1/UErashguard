/* [SHOP] Options produit + achat — structure d'après 21st.dev #7820
   (sélecteurs taille/couleur, quantité, add to cart), re-tokenisée DA.
   Cibles tactiles ≥ 44 px (web-method §7). */
"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { AddToCartButton } from "@/components/shared/AddToCartButton";
import { cn } from "@/lib/utils";

export function ProductOptions({ product }: { product: Product }) {
  const [size, setSize] = useState<string | undefined>(product.sizes?.[0]);
  const [color, setColor] = useState<string | undefined>(
    product.colors?.[0]?.name,
  );

  return (
    <div className="flex flex-col gap-6">
      {product.colors && product.colors.length > 0 && (
        <fieldset>
          <legend className="type-meta mb-3 text-subtle">
            Color — {color}
          </legend>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setColor(c.name)}
                aria-label={`Color: ${c.name}`}
                aria-pressed={color === c.name}
                className={cn(
                  "flex size-11 items-center justify-center border transition-colors",
                  color === c.name
                    ? "border-brand"
                    : "border-border hover:border-fg/40",
                )}
              >
                <span
                  aria-hidden
                  className="size-6 rounded-[2px]"
                  style={{ backgroundColor: c.value }}
                />
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {product.sizes && product.sizes.length > 0 && (
        <fieldset>
          <legend className="type-meta mb-3 text-subtle">Size</legend>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                className={cn(
                  "type-label flex h-11 min-w-14 items-center justify-center border px-3 transition-colors",
                  size === s
                    ? "border-brand bg-brand text-fg"
                    : "border-border text-fg hover:border-fg/40",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <AddToCartButton
        product={product}
        size={size}
        color={color}
        className="w-full sm:w-auto"
      />
    </div>
  );
}
