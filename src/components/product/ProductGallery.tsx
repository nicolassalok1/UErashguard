/* [SHOP] Galerie produit — structure d'après 21st.dev #7820 (image principale
   + vignettes, navigation clavier), re-tokenisée DA. Mobile : scroll-snap natif
   (CONVENTIONS §6).
   MAJ 2026-08-30 : photos `plate` (studio fond clair) affichées entières
   (`object-contain`) et ratio de cadre 4/3 quand la série est studio —
   rashguard-da §4bis. */
"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

export function ProductGallery({
  product,
  priority,
}: {
  product: Product;
  priority?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const images = product.images;
  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  /* le ratio du cadre est fixé par la série (1re image) : pas de saut de
     layout en naviguant dans la galerie. */
  const studio = images[0].plate === true;

  return (
    <div className="flex flex-col gap-3">
      <div
        className={cn(
          "relative w-full overflow-hidden border border-border bg-surface",
          studio ? "aspect-[4/3]" : "aspect-[4/5]",
        )}
      >
        <Image
          key={images[index].src}
          src={images[index].src}
          alt={images[index].alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={priority}
          className={cn(
            images[index].plate ? "object-contain p-6 lg:p-10" : "object-cover",
          )}
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 items-center justify-center border border-border bg-bg/80 text-fg transition-colors hover:bg-bg"
            >
              <ChevronLeft className="size-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 items-center justify-center border border-border bg-bg/80 text-fg transition-colors hover:bg-bg"
            >
              <ChevronRight className="size-5" strokeWidth={1.5} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={index === i}
              className={cn(
                "relative aspect-square w-20 shrink-0 snap-start overflow-hidden border transition-colors",
                index === i
                  ? "border-brand"
                  : "border-border hover:border-fg/30",
              )}
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="80px"
                className={cn(
                  "transition-opacity",
                  img.plate ? "object-contain p-1.5" : "object-cover",
                  index === i ? "opacity-100" : "opacity-60",
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
