/* [SHOP] Carte produit — structure d'après 21st.dev #17441
   (MinimalProductCard, révélation couleur circulaire au curseur) et #8286,
   re-tokenisée DA : N&B → couleur, hairlines, coins architecturaux. */
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [active, setActive] = useState(false);

  const setOrigin = (clientX: number, clientY: number) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty(
      "--reveal-x",
      `${((clientX - rect.left) / rect.width) * 100}%`,
    );
    card.style.setProperty(
      "--reveal-y",
      `${((clientY - rect.top) / rect.height) * 100}%`,
    );
    setActive(true);
  };

  const img = product.images[0];

  return (
    <Link
      ref={cardRef}
      href={`/shop/${product.slug}`}
      onMouseEnter={(e) => setOrigin(e.clientX, e.clientY)}
      onTouchStart={(e) =>
        setOrigin(e.touches[0].clientX, e.touches[0].clientY)
      }
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className={cn(
        "group relative block overflow-hidden border border-border bg-surface transition-colors duration-500",
        "hover:border-fg/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        className,
      )}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {/* fond N&B */}
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(max-width: 768px) 70vw, 25vw"
          className="object-cover grayscale"
        />
        {/* couleur révélée en cercle depuis le curseur */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            clipPath: `circle(${active ? "150%" : "0%"} at var(--reveal-x, 50%) var(--reveal-y, 50%))`,
            transition: "clip-path 1.4s var(--ease-out-expo)",
          }}
        >
          <Image
            src={img.src}
            alt=""
            fill
            sizes="(max-width: 768px) 70vw, 25vw"
            className="object-cover"
          />
        </div>
        {product.badge && (
          <span className="type-meta absolute top-3 left-3 bg-brand px-2 py-1 text-fg">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 p-4">
        <span className="type-meta text-subtle">{product.category}</span>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="type-body font-medium text-fg">{product.name}</h3>
          <span className="type-body text-subtle">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>

      {/* coins architecturaux au hover (structure #17441) */}
      <span aria-hidden className="absolute top-0 left-0 h-px w-8 bg-brand opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span aria-hidden className="absolute top-0 left-0 h-8 w-px bg-brand opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span aria-hidden className="absolute right-0 bottom-0 h-px w-8 bg-brand opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span aria-hidden className="absolute right-0 bottom-0 h-8 w-px bg-brand opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </Link>
  );
}
