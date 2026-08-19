/* [INFRA] Drawer panier — shadcn Sheet re-tokenisé (structure d'après
   21st.dev #4485 variante shopping-cart — RESEARCH §4). Lignes rendues
   après hydratation. Checkout shadow : GUARDRAILS §5. */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useCart, cartCount, cartTotal, useCartHydrated } from "@/store/cart";
import { getProduct } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { SITE } from "@/data/site";

export function CartDrawer() {
  const { lines, open, setOpen, setQty, remove } = useCart();
  const hydrated = useCartHydrated();
  const shown = hydrated ? lines : [];
  const count = cartCount(shown);
  const total = cartTotal(shown);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 rounded-none border-l border-border bg-elevated p-0 sm:max-w-md"
      >
        <SheetHeader className="hairline-b gap-1 p-6">
          <SheetTitle className="type-label text-fg">
            Cart{count > 0 ? ` (${count})` : ""}
          </SheetTitle>
          <SheetDescription className="type-meta text-subtle">
            {SITE.preview}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {shown.length === 0 ? (
            <div className="flex h-full flex-col items-start justify-center gap-4">
              <p className="type-body text-subtle">Your cart is empty.</p>
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="type-label link-underline text-fg"
              >
                Browse the shop
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {shown.map((line) => {
                const product = getProduct(line.slug);
                if (!product) return null;
                const key = `${line.slug}-${line.size ?? ""}-${line.color ?? ""}`;
                return (
                  <li key={key} className="flex gap-4">
                    <div className="relative size-20 shrink-0 overflow-hidden bg-surface">
                      <Image
                        src={product.images[0].src}
                        alt={product.images[0].alt}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="type-body truncate font-medium text-fg">
                          {product.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => remove(line.slug, line.size, line.color)}
                          aria-label={`Remove ${product.name}`}
                          className="flex size-6 items-center justify-center text-subtle transition-colors hover:text-fg"
                        >
                          <X className="size-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                      <p className="type-meta text-subtle">
                        {[line.size, line.color].filter(Boolean).join(" · ")}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="hairline flex items-center">
                          <button
                            type="button"
                            onClick={() =>
                              setQty(line.slug, line.qty - 1, line.size, line.color)
                            }
                            aria-label="Decrease quantity"
                            className="flex size-8 items-center justify-center text-subtle transition-colors hover:text-fg"
                          >
                            <Minus className="size-3" strokeWidth={1.5} />
                          </button>
                          <span className="type-meta w-6 text-center text-fg">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setQty(line.slug, line.qty + 1, line.size, line.color)
                            }
                            aria-label="Increase quantity"
                            className="flex size-8 items-center justify-center text-subtle transition-colors hover:text-fg"
                          >
                            <Plus className="size-3" strokeWidth={1.5} />
                          </button>
                        </div>
                        <span className="type-body font-medium text-fg">
                          {formatPrice(product.price * line.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {shown.length > 0 && (
          <div className="hairline-t flex flex-col gap-4 p-6">
            <div className="flex items-center justify-between">
              <span className="type-label text-fg">Subtotal</span>
              <span className="type-body-lg font-medium text-fg">
                {formatPrice(total)}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              className="type-label flex h-12 items-center justify-center rounded-[2px] bg-brand text-fg transition-colors hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Checkout
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
