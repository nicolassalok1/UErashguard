/* [INFRA] Bouton panier du header — badge rendu après hydratation
   (piège SSR/localStorage — CONVENTIONS §4). */
"use client";

import { ShoppingBag } from "lucide-react";
import { useCart, cartCount, useCartHydrated } from "@/store/cart";

export function CartButton() {
  const lines = useCart((s) => s.lines);
  const setOpen = useCart((s) => s.setOpen);
  const hydrated = useCartHydrated();
  const count = hydrated ? cartCount(lines) : 0;

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`Open cart${count > 0 ? ` (${count} items)` : ""}`}
      className="relative flex size-11 items-center justify-center text-fg transition-colors hover:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <ShoppingBag className="size-5" strokeWidth={1.5} />
      {count > 0 && (
        <span
          aria-hidden
          className="type-meta absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-[2px] bg-brand text-[10px] leading-none text-fg"
        >
          {count}
        </span>
      )}
    </button>
  );
}
