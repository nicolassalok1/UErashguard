/* [INFRA] Store panier — zustand + persist localStorage.
   Piège d'hydratation couvert : les composants lisent `useCartHydrated()`
   avant d'afficher badge/lignes (CONVENTIONS §4). */
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useSyncExternalStore } from "react";
import { getProduct } from "@/data/products";

export type CartLine = {
  slug: string;
  size?: string;
  color?: string;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  open: boolean;
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  remove: (slug: string, size?: string, color?: string) => void;
  setQty: (slug: string, qty: number, size?: string, color?: string) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
};

const sameLine = (a: CartLine, b: Omit<CartLine, "qty">) =>
  a.slug === b.slug && a.size === b.size && a.color === b.color;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      open: false,
      add: (line, qty = 1) =>
        set((s) => {
          const existing = s.lines.find((l) => sameLine(l, line));
          const lines = existing
            ? s.lines.map((l) =>
                sameLine(l, line) ? { ...l, qty: l.qty + qty } : l,
              )
            : [...s.lines, { ...line, qty }];
          return { lines, open: true };
        }),
      remove: (slug, size, color) =>
        set((s) => ({
          lines: s.lines.filter((l) => !sameLine(l, { slug, size, color })),
        })),
      setQty: (slug, qty, size, color) =>
        set((s) => ({
          lines:
            qty <= 0
              ? s.lines.filter((l) => !sameLine(l, { slug, size, color }))
              : s.lines.map((l) =>
                  sameLine(l, { slug, size, color }) ? { ...l, qty } : l,
                ),
        })),
      clear: () => set({ lines: [] }),
      setOpen: (open) => set({ open }),
    }),
    {
      name: "sabai-cart",
      partialize: (s) => ({ lines: s.lines }),
    },
  ),
);

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.qty, 0);
}

export function cartTotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => {
    const p = getProduct(l.slug);
    return sum + (p ? p.price * l.qty : 0);
  }, 0);
}

/* Le HTML serveur ne connaît pas localStorage : n'afficher badge et lignes
   qu'après hydratation. useSyncExternalStore : false côté serveur/premier
   rendu, true ensuite — sans setState dans un effet. */
const emptySubscribe = () => () => {};

export function useCartHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
