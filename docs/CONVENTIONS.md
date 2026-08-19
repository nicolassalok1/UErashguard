# CONVENTIONS — UErashguard (contrat d'implémentation)

> Tout agent lit ce document **et** `docs/GUARDRAILS.md` **et** `.claude/skills/rashguard-da/SKILL.md` avant d'écrire une ligne.
>
> Ce document est **gelé** à la fin de la phase d'infrastructure. Après le gel, seul l'orchestrateur le modifie.

## 0. Règles d'exécution parallèle (non négociable)

1. Installation de dépendances **interdite** après le gel. Manifeste figé : Next 16.3.1 · React 19.2.8 · Tailwind 4 · gsap · @gsap/react · zustand · radix (via shadcn) · lucide-react · sharp (dev).
2. **Aucun agent ne lance le serveur de dev.** Vérification visuelle centralisée par l'orchestrateur (build + screenshots Playwright).
3. Fichiers partagés **gelés** après la phase d'infrastructure : `src/app/layout.tsx` · `src/app/globals.css` · `src/components/shared/**` · `src/components/layout/**` · `src/components/ui/**` · `src/lib/**` · `src/data/**` · `src/store/**` · `next.config.ts` · `scripts/**`. Les agents de section les importent, ne les modifient jamais. Besoin d'évolution → remonter à l'orchestrateur.
4. Un agent de section possède **uniquement** `src/app/<route>/**` et `src/components/<section>/**`.
5. Chemins toujours quotés dans les commandes shell (espace dans `Nathalie Asus`).
6. Gate de fin d'agent : `npx tsc --noEmit`.
7. Documentation de référence : nextjs.org/docs (v16) et tailwindcss.com/docs (v4) — consulter en cas de doute d'API plutôt que de se fier à la mémoire.

## 1. Arborescence & ownership

```
src/
  app/
    layout.tsx            [INFRA]    fontes (Archivo/Inter), Header, CartDrawer, PreviewBadge, Footer, skip-link
    globals.css           [INFRA]    tokens @theme, purge du thème système, utilities (hatch, hairline, type scale)
    page.tsx              [HOME]     one-product UV Long Sleeve
    shop/page.tsx         [SHOP]     catalogue
    shop/[slug]/page.tsx  [SHOP]     fiche produit (generateStaticParams)
    checkout/page.tsx     [CHECKOUT] tunnel shadow (démo)
  components/
    ui/**                 [INFRA]    primitives shadcn re-tokenisées (button, sheet, accordion…)
    shared/**             [INFRA]    voir §4
    layout/**             [INFRA]    Header, Footer, CartDrawer, PreviewBadge
    home/**               [HOME]
    shop/**               [SHOP]     grid, cards
    product/**            [SHOP]     galerie, options, add-to-cart
    checkout/**           [CHECKOUT]
  lib/                    [INFRA]    utils.ts, motion.ts (eases/durées figés), format.ts (prix RM)
  data/                   [CONTENU]  products.ts, site.ts
  store/                  [INFRA]    cart.ts (zustand persist + hydratation différée)
public/images/            [CONTENU]  WebP optimisées (générées par scripts/optimize-images.mjs)
scripts/                  [INFRA]    optimize-images.mjs, guardrails-scan.mjs
```

Chaque fichier porte son propriétaire en commentaire d'en-tête : `/* [INFRA] */`, `/* [HOME] */`, etc.

## 2. Design tokens

Déclarés une seule fois dans `src/app/globals.css` :

```css
@theme {
  --color-bg: #0B0B0C;
  --color-surface: #141416;
  --color-elevated: #1D1D20;
  --color-fg: #F4F2ED;
  --color-muted: #A19D96;
  --color-accent: #E22B1E;
  --color-error: #FFB4AB;

  --font-display: var(--font-archivo);
  --font-body: var(--font-inter);

  /* eases figés — web-method §4 */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
}
```

Site **dark-only** : bloc `prefers-color-scheme` supprimé, `color-scheme: dark` sur `:root`. Tokens nommés par rôle, jamais par teinte. Tailwind : utiliser `bg-bg`, `bg-surface`, `text-fg`, `text-muted`, `bg-accent` — **aucun hex, aucune classe `zinc-*/neutral-*/red-*` dans les composants.** Les tokens shadcn (`--background`, `--foreground`, `--primary`…) sont mappés sur les tokens DA dans `globals.css` — on ne les redéfinit jamais localement.

## 3. Typographie

Échelle du skill `rashguard-da` §3, exposée en utilities : `.type-display-xl`, `.type-display-lg`, `.type-headline`, `.type-body-lg`, `.type-body`, `.type-meta`, `.type-label`. Jamais de graisse < 400 sur fond sombre · jamais de faux-gras (`font-synthesis: none`) · `-webkit-font-smoothing: antialiased` sur `body` · fontes locales via `next/font`, `display: swap`.

## 4. Composants partagés — API

L'infrastructure les construit, les sections les consomment.

| Composant | Props | Comportement |
|---|---|---|
| `Section` | `id?, className?, children` | `<section>` avec section-gap DA et container-max ; toute section de page l'utilise |
| `RevealText` | `as?, children, className?, delay?` | reveal par lignes masquées, `power4.out` 0.9s, `once: true`, reduced-motion → fade 0.3s |
| `RevealImage` | `src, alt, sizes, className?, priority?, colorize?` | reveal clip-path `expo.out` 1s ; si `colorize`, calque N&B → couleur par crossfade d'opacité au scroll (signature DA §5) — jamais sur l'image LCP |
| `Marquee` | `children, speed?, reverse?` | défilement infini CSS, pause au hover, statique si reduced-motion |
| `HatchDivider` | `className?` | hachures diagonales rouges (signature DA §6), hauteur 8px |
| `PriceTag` | `amount` | format `RM 189` via `lib/format.ts` — seul point de formatage des prix |
| `AddToCartButton` | `product, variant?` | bouton accent, ajoute au store, ouvre le drawer |
| `CartButton` | — | icône + badge compteur ; **le badge ne rend qu'après hydratation du store** |
| `PreviewBadge` | — | badge fixe coin bas-gauche « Preview build — payments disabled » (GUARDRAILS §5) |

Deux pièges connus : le store persisté rend son badge **après** hydratation (sinon mismatch SSR/client) ; tout effet hover est gaté `(hover: hover) and (pointer: fine)`.

## 5. Motion

Web-method §4 : vocabulaire figé, `useGSAP({ scope })` partout (jamais de `useEffect` nu), handlers via `contextSafe`, `gsap.matchMedia()` à trois contextes (desktop / mobile / reduced-motion), `once: true` sur les reveals, **jamais `opacity: 0` initial sur l'élément LCP**. Constantes uniques dans `src/lib/motion.ts` — aucun ease/durée littéral dans les composants.

## 6. Mobile

Web-method §5, décisions projet : hero mobile = image statique + reveal texte simple (pas de pin) · galerie produit = scroll-snap horizontal natif · pas de smooth-scroll JS · le moment fort « What You Fight For? » garde le reveal N&B→couleur (léger) mais sans pin · nav mobile = panneau plein écran (pas de mega-menu).

## 7. Assets

- Origine : photos réelles fournies (64, voir RESEARCH §5). Aucun asset externe à l'exécution.
- `scripts/optimize-images.mjs` (sharp) lit `assets-src/` → `public/images/` en WebP (1920/1280/640). Les sorties sont commitées ; le script ne tourne qu'à l'ajout de nouvelles photos.
- Tout emplacement média passe par `RevealImage` ou `next/image` avec `sizes` explicite — remplacement de média sans toucher au layout.

## 8. Pièges du framework (Next 16 / React 19 / Tailwind 4)

- `params` et `searchParams` sont des **Promises** dans les pages/layouts : `const { slug } = await params`.
- Composants GSAP/zustand → `"use client"` obligatoire ; les pages restent des Server Components qui composent des îlots client.
- `next/font/google` télécharge **au build** (réseau requis au premier build).
- Tailwind v4 : pas de `tailwind.config.ts` — tout dans `@theme` ; les classes arbitraires `[...]` sont interdites pour les couleurs (tokens uniquement).
- `next/image` : `sizes` obligatoire sur toute image `fill` ; packshots pré-optimisés localement, pas de domaine distant configuré.
- `generateStaticParams` dans `shop/[slug]` — le build échoue si un slug de `data/products.ts` manque.

## 9. Navigation & hiérarchie de contenu

- Nav header : `Shop` · `Our Story` (ancre home) · panier. Le logo type « SABAI » ramène à `/`.
- **La home est dominée par le UV Long Sleeve** (hero + achat direct). Le catalogue est un teaser en bas de home → `/shop`.
- Le checkout n'apparaît jamais dans la nav — on y accède par le drawer panier.
- Le badge preview reste discret mais permanent ; il ne domine jamais l'écran (GUARDRAILS §5).
- Footer : nav secondaire, Instagram `@sabai.fightgear`, mention « Preview build » — pas de liens légaux morts.
