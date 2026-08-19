/* [INFRA] Reveal de texte par lignes masquées — SplitText (mask lines),
   power4.out, once:true. reduced-motion → fade 0.3 s. (CONVENTIONS §4) */
"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { EASE, DUR, MM, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealTextProps = {
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function RevealText({
  as: Tag = "div",
  children,
  className,
  delay = 0,
}: RevealTextProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = scope.current?.firstElementChild as HTMLElement | null;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(`${MM.desktop}, ${MM.mobile}`, () => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
        });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: DUR.text,
          ease: EASE.text,
          stagger: STAGGER.lines,
          delay,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
        return () => split.revert();
      });

      mm.add(MM.reduced, () => {
        gsap.from(el, {
          opacity: 0,
          duration: DUR.reduced,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    },
    { scope },
  );

  return (
    <div ref={scope}>
      <Tag className={cn(className)}>{children}</Tag>
    </div>
  );
}
