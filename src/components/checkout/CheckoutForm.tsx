/* [CHECKOUT] Tunnel shadow — structure d'après 21st.dev #109 (Interactive
   Checkout, kokonutd), re-tokenisée DA. Paiement volontairement désactivé :
   stub explicite, jamais un faux tunnel qui semble fonctionner ; aucune
   collecte réelle (GUARDRAILS §5). */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart, cartTotal, useCartHydrated } from "@/store/cart";
import { getProduct } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FIELDS: { id: string; label: string; type: string; span?: boolean }[] = [
  { id: "email", label: "Email", type: "email", span: true },
  { id: "firstName", label: "First name", type: "text" },
  { id: "lastName", label: "Last name", type: "text" },
  { id: "address", label: "Address", type: "text", span: true },
  { id: "city", label: "City", type: "text" },
  { id: "postcode", label: "Postcode", type: "text" },
];

export function CheckoutForm() {
  const lines = useCart((s) => s.lines);
  const hydrated = useCartHydrated();
  const [attempted, setAttempted] = useState(false);
  const shown = hydrated ? lines : [];
  const total = cartTotal(shown);

  if (hydrated && shown.length === 0) {
    return (
      <div className="flex flex-col items-start gap-4">
        <p className="type-body-lg text-subtle">Your cart is empty.</p>
        <Link href="/shop" className="type-label link-underline text-fg">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
      {/* Formulaire — aucune donnée n'est envoyée nulle part */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setAttempted(true);
        }}
        className="flex flex-col gap-6"
        aria-describedby="demo-note"
      >
        <h2 className="type-headline text-fg">Shipping</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FIELDS.map((f) => (
            <div
              key={f.id}
              className={`flex flex-col gap-2 ${f.span ? "sm:col-span-2" : ""}`}
            >
              <Label htmlFor={f.id} className="type-meta text-subtle">
                {f.label}
              </Label>
              <Input
                id={f.id}
                name={f.id}
                type={f.type}
                autoComplete="off"
                className="h-11 rounded-[2px] border-border bg-surface text-fg"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="type-label mt-2 flex h-12 items-center justify-center rounded-[2px] bg-brand px-8 text-fg transition-colors hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Place order — {formatPrice(total)}
        </button>

        <p
          id="demo-note"
          role={attempted ? "alert" : undefined}
          className={`type-body border px-4 py-3 ${
            attempted
              ? "border-brand text-fg"
              : "border-border text-subtle"
          }`}
        >
          {attempted
            ? "Payments are not enabled in this preview. No order was created, nothing was charged, and nothing you typed was sent or stored."
            : "Preview build — this checkout is a demo. Payment is not connected yet; submitting will not create an order or send any data."}
        </p>
      </form>

      {/* Récap commande */}
      <aside className="hairline flex h-fit flex-col gap-6 bg-surface p-6">
        <h2 className="type-label text-fg">Order summary</h2>
        <ul className="flex flex-col gap-4">
          {shown.map((line) => {
            const product = getProduct(line.slug);
            if (!product) return null;
            return (
              <li
                key={`${line.slug}-${line.size ?? ""}-${line.color ?? ""}`}
                className="flex items-center gap-4"
              >
                <div className="relative size-14 shrink-0 overflow-hidden bg-elevated">
                  <Image
                    src={product.images[0].src}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="type-body truncate text-fg">
                    {product.name} × {line.qty}
                  </span>
                  <span className="type-meta text-subtle">
                    {[line.size, line.color].filter(Boolean).join(" · ")}
                  </span>
                </div>
                <span className="type-body text-fg">
                  {formatPrice(product.price * line.qty)}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="hairline-t flex flex-col gap-2 pt-4">
          <div className="flex justify-between">
            <span className="type-body text-subtle">Shipping</span>
            <span className="type-body text-subtle">Calculated later</span>
          </div>
          <div className="flex justify-between">
            <span className="type-label text-fg">Total</span>
            <span className="type-body-lg font-medium text-fg">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}
