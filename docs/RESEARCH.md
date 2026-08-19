# RESEARCH — UErashguard (Sabai Fight Gear)

> Étape 1 du web-method. Chaque décision est datée et sourcée. Décision non sourcée = à refaire.
> Rédigé le 2026-08-19.

## 1. Produit & périmètre

- **Produit hero : Sabai UV Long Sleeve — « UV FPS 50 »** (rashguard/longsleeve protection UV pour vélo, course, surf, outdoor). Source : doc projet `activity` (« our new UV protection Long Sleeves for Bike riders, runners, surfing or any outdoor activities ») + visuels client WhatsApp du 2026-08-19 (mockup produit blanc + bannière « UV FPS 50 »).
- **Catalogue secondaire** : tous les autres produits Sabai en vente sur le site (gants boxe/MMA, protège-tibias, gis, rashguards, ceintures…). Source : doc `activity` + réponse client (cadrage 2026-08-19) : « on va promote ce produit mais il y a aussi tous les autres produits en vente sur le site ».
- **Conversion : e-commerce complet en shadow** — panier + tunnel présents, paiement non branché (POC, intégration ultérieure). Source : réponse client au cadrage 2026-08-19. Conséquences dans `docs/GUARDRAILS.md` §5.
- **Langue : anglais.** Source : réponse client au cadrage 2026-08-19.
- **Marque** : Sabai Fight Gear, fondée 2015, fondateur combattant pro & ceinture noire BJJ. Marque malaisienne (drapeaux MY sur les gis, événement MMU Cyberjaya 16–17 mai 2026 sur les photos). Sources : docs projet `ADN` + `activity`, photos projet, instagram.com/sabai.fightgear.

## 2. Stack technique

| Décision | Valeur | Source / date |
|---|---|---|
| Framework | Next.js **16.3.1** (App Router, `src/`, TS) | sortie `create-next-app@latest` du 2026-08-19 |
| React | 19.2.8 | idem |
| CSS | Tailwind **v4** (`@theme` dans `globals.css`, pas de `tailwind.config`) | scaffold 2026-08-19 + tailwindcss.com/docs (v4) |
| UI primitives | shadcn CLI (base **radix**, preset nova) : button, sheet, accordion, separator, input, label | `npx shadcn@latest init` 2026-08-19 |
| Animation | GSAP + `@gsap/react` (`useGSAP`) | gsap.com — GSAP et ses plugins sont 100 % gratuits (annonce Webflow 2024, vérifié sur gsap.com/pricing le 2026-08-19) ; skills `gsap-*` du plugin web-starter |
| État panier | zustand (persist localStorage, hydratation différée) | npm zustand, installé 2026-08-19 ; piège d'hydratation documenté dans CONVENTIONS §4 |
| Paiement | **Hors périmètre POC** (tunnel shadow). Candidat futur : Stripe Checkout — à sourcer au moment de l'intégration | décision client 2026-08-19 |
| Backend / DB | Aucun. Data produits en fichier `src/data/products.ts` | choix POC 2026-08-19 |

## 3. Fontes & licences

| Rôle | Fonte | Licence | Source |
|---|---|---|---|
| Display | **Archivo** (variable, axe width → Expanded, graisses 600–900) | SIL OFL 1.1 | fonts.google.com/specimen/Archivo (consulté 2026-08-19) |
| Body | **Inter** (variable) | SIL OFL 1.1 | fonts.google.com/specimen/Inter (consulté 2026-08-19) |

Chargement via `next/font/google` : téléchargées **au build** puis servies en local — aucune requête tierce à l'exécution (règle « assets locaux » de web-method §6, et RGPD §6 des GUARDRAILS). Deux familles maximum — conforme DA §3.

## 4. Composants 21st.dev retenus (structure à re-tokeniser — jamais les valeurs visuelles)

Catalogue interrogé via MCP 21st.dev le 2026-08-19. Règle d'arbitrage : DA > tout (web-method §1).

| Usage | Composant | id | URL |
|---|---|---|---|
| Header sticky (blur scroll, menu mobile) | Header 1 — sshahaider | 8964 | 21st.dev/@sshahaider/components/header-1 |
| Hero cinématique (masques N&B→couleur au scroll) | Cinematic Product Scroll Section — a.karamooz3232 | 17441 | 21st.dev/@a.karamooz3232/components/cinematic-product-scroll-section |
| Features (bento) | Feature Section with Bento Grid — manuarora700 | 979 | 21st.dev/@manuarora700/components/feature-section-with-bento-grid |
| Marquee (reduced-motion OK) | Logo Marquee — ddoemonn | 23537 | 21st.dev/@ddoemonn/components/logo-marquee |
| Fiche produit (galerie + options + CTA) | E-commerce Product Detail — dhileepkumargm | 7820 | 21st.dev/@dhileepkumargm/components/e-commerce-product-detail |
| Grid catalogue | Product Card — ravikatiyar162 | 8286 | 21st.dev/@ravikatiyar162/components/product-card-2 |
| Cart drawer | Drawer (variante shopping-cart) — sshahaider | 4485 | 21st.dev/@sshahaider/components/drawer |
| Checkout | Interactive Checkout — kokonutd | 109 | 21st.dev/@kokonutd/components/interactive-checkout |
| Footer | Footer Section 3 — solaceui | 24450 | 21st.dev/@solaceui/components/footer-section-3 |

## 5. Assets

- **64 photos fournies** (projet claude.ai, importées le 2026-08-19) : packshots studio gants/protège-tibias sur tatami sombre, gis noirs/blancs (flat lay + portés), rashguard blanc « Believe in Yourself », mockup UV Long Sleeve, bannière « UV FPS 50 », photos de compétition (MMU Cyberjaya mai 2026), lifestyle dojo (série Sabai_May), rider scooter en long sleeve.
- Optimisation locale : `scripts/optimize-images.mjs` (sharp) → WebP responsive dans `public/images/`. Aucun CDN tiers.
- **Higgsfield : non utilisé à ce stade** (0 crédit dépensé). Les photos couvrent tous les besoins du POC. Option future (sur accord explicite + devis préalable) : vidéo hero ou visuels outdoor UV.

## 6. Devise & prix

- Devise : **MYR (RM)** — marque malaisienne (drapeaux MY, événement Cyberjaya). Décision POC 2026-08-19.
- **Tous les prix sont des placeholders** à confirmer par le client — flagués `// TODO PRIX RÉELS` dans `src/data/products.ts` et couverts par le bandeau preview site-wide (GUARDRAILS §5).

## 7. Allégations produit (UV)

- Seul wording autorisé : **« UV FPS 50 »**, repris à l'identique du visuel client (WhatsApp 2026-08-19, bannière logo). Aucune norme (EN 13758, AS/NZS 4399), certification ou bénéfice médical ne sera mentionné tant que le client n'a pas fourni la référence. Lexique interdit : `docs/GUARDRAILS.md` §1.

## 8. Gates mesurés (2026-08-19, build production locale)

- `tsc --noEmit` ✓ · `eslint` ✓ · scan guardrails ✓ (40 fichiers) · `next build` ✓ (14 pages statiques/SSG).
- Poids home : **1,17 Mo** total (budget ≤ 2 Mo ✓) · JS First Load : **261 Ko gzip** — react-dom 70 Ko + runtime Next ≈ 120 Ko + GSAP/ScrollTrigger/SplitText 47 Ko + app/radix ≈ 25 Ko. Budget DA ajusté à 280 Ko avec justification (rashguard-da §5).
- Parcours vérifiés (Playwright, chromium) : add-to-cart → drawer → checkout → notice démo « payments not enabled » ✓ · persistance panier après reload + badge post-hydratation ✓ · menu mobile ✓ · `prefers-reduced-motion` : contenu visible sans animation ✓.
- Revue visuelle desktop (1440) + mobile (390) sur `/`, `/shop`, `/shop/[slug]`, `/checkout` — correctif appliqué : taille du H1 hero bornée (« AGAINST » débordait de sa ligne masquée).

## 9. Contraintes légales du secteur

- Textile/sportswear : secteur non réglementé au sens des GUARDRAILS (pas santé, pas alimentaire). Points de vigilance restants : allégations UV (§7), droits à l'image des personnes photographiées (photos fournies par la marque — **à confirmer par le client avant mise en production**), pages légales hors périmètre POC (GUARDRAILS §7).
