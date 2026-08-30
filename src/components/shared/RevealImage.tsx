/* [INFRA] Reveal d'image par clip-path (expo.out, once) + signature
   N&B → couleur : deux calques, crossfade d'opacité scrubbé au scroll —
   GPU uniquement, jamais d'animation de filter (rashguard-da §5).
   Jamais utilisé sur l'élément LCP avec un état initial invisible. */
"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, DUR, MM } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** signature DA : calque N&B sous calque couleur révélé au scroll */
  colorize?: boolean;
  /** `contain` pour les planches studio fond clair — rashguard-da §4bis */
  fit?: "cover" | "contain";
  imgClassName?: string;
};

export function RevealImage({
  src,
  alt,
  sizes,
  className,
  priority,
  colorize,
  fit = "cover",
  imgClassName,
}: RevealImageProps) {
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(`${MM.desktop}, ${MM.mobile}`, () => {
        if (!priority) {
          gsap.from(root, {
            clipPath: "inset(100% 0% 0% 0%)",
            duration: DUR.image,
            ease: EASE.image,
            scrollTrigger: { trigger: root, start: "top 85%", once: true },
          });
        }
        if (colorize) {
          gsap.fromTo(
            root.querySelector("[data-color-layer]"),
            { opacity: 0 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top 75%",
                end: "top 30%",
                scrub: true,
              },
            },
          );
        }
      });

      mm.add(MM.reduced, () => {
        const layer = root.querySelector("[data-color-layer]");
        if (layer) gsap.set(layer, { opacity: 1 });
      });
    },
    { scope },
  );

  return (
    <div ref={scope} className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(fitClass, colorize && "grayscale", imgClassName)}
      />
      {colorize && (
        <div data-color-layer className="absolute inset-0" aria-hidden>
          <Image
            src={src}
            alt=""
            fill
            sizes={sizes}
            className={cn(fitClass, imgClassName)}
          />
        </div>
      )}
    </div>
  );
}
