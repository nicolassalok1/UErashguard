/* [INFRA] Bouton d'ajout au panier — accent DA, ouvre le drawer (CONVENTIONS §4). */
"use client";

import { useCart } from "@/store/cart";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

type AddToCartButtonProps = {
  product: Product;
  size?: string;
  color?: string;
  className?: string;
  children?: React.ReactNode;
};

export function AddToCartButton({
  product,
  size,
  color,
  className,
  children,
}: AddToCartButtonProps) {
  const add = useCart((s) => s.add);

  return (
    <button
      type="button"
      onClick={() => add({ slug: product.slug, size, color })}
      className={cn(
        "type-label inline-flex h-12 min-w-44 items-center justify-center gap-3 rounded-[2px] bg-brand px-8 text-fg transition-colors duration-200",
        "hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        className,
      )}
    >
      {children ?? "Add to cart"}
    </button>
  );
}
