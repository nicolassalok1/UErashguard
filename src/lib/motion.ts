/* [INFRA] Vocabulaire de motion figé — web-method §4 + rashguard-da §5.
   Aucun ease ni durée littéral dans les composants : tout vient d'ici. */

export const EASE = {
  micro: "power2.out", // hover, focus — 0.2–0.3 s
  text: "power4.out", // reveal de texte — 0.8–1.2 s
  image: "expo.out", // reveal d'image / clip-path — 0.8–1.2 s
  page: "power3.inOut", // transitions — ≤ 1.2 s
} as const;

export const DUR = {
  micro: 0.25,
  text: 0.9,
  image: 1,
  page: 1,
  reduced: 0.3, // fade opacité en prefers-reduced-motion
} as const;

/* Trois contextes gsap.matchMedia — web-method §4 */
export const MM = {
  desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

export const STAGGER = {
  lines: 0.09,
  grid: 0.07,
} as const;
