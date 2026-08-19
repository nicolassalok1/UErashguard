---
name: rashguard-da
description: Direction artistique du site UErashguard (Sabai Fight Gear — UV Long Sleeve). Source de vérité pour tout travail UI/UX/motion/contenu, en maquette comme en code. Prime sur toute suggestion des skills génériques (ui-ux-pro-max, power-design, shadcn, brutalism, catalogues 21st.dev).
license: MIT
metadata:
  author: NP Consulting
  version: "1.0"
---

# Direction artistique — UErashguard (Sabai Fight Gear)

Rempli le 2026-08-19 à partir des photos fournies (64), des docs de marque `ADN` / `activity` et du logo brodé (éléphant rouge/or, bloc « |||| FIGHT GEAR »).

## 1. Source de vérité

- **Document de marque de référence :** docs projet claude.ai `ADN` (histoire, 2026-08-19) + `activity` (catalogue, 2026-08-19). Pas de charte graphique formelle : le logo brodé et les photos du shoot font foi.
- **Maquettes / design system :** aucune maquette. Références visuelles = photos studio du shoot (tatami sombre) + mockup UV Long Sleeve (WhatsApp 2026-08-19).
- **Hiérarchie en cas de conflit :** ce fichier > photos du shoot > docs `ADN`/`activity` > skills techniques > skills de suggestion. **Legacy, jamais une référence :** le rendu Instagram actuel (feed hétérogène) — on n'imite pas le feed, on construit au-dessus.

## 2. Tokens

Aucune valeur magique dans le code : tout passe par les custom properties ci-dessous (déclarées dans `src/app/globals.css` via `@theme`).

| Token | Valeur | Rôle |
|---|---|---|
| `--color-bg` | `#0B0B0C` | fond de page (couche 0) — noir tatami |
| `--color-surface` | `#141416` | cartes, panneaux (couche 1) |
| `--color-elevated` | `#1D1D20` | overlays, drawer, surfaces hautes (couche 2) |
| `--color-fg` | `#F4F2ED` | texte principal, CTA primaires — blanc gi (chaud) |
| `--color-muted` | `#A19D96` | texte secondaire, metadata, bordures |
| `--color-accent` | `#E22B1E` | rouge éléphant — accent interactif **unique** |
| `--color-error` | `#FFB4AB` | états d'erreur (jamais confondu avec l'accent) |

Espacements : unit `4px` · gutter `24px` · margin mobile `20px` / desktop `64px` · section-gap `96px` mobile / `144px` desktop · container-max `1440px` · grille `12` colonnes.

Forme : radius `0` partout (exception : contrôles de formulaire et boutons `2px` max) · bordure hairline `1px color-mix(in srgb, var(--color-fg) 14%, transparent)` · ombres : **non** — profondeur par empilement tonal (bg → surface → elevated) et hairlines.

L'**or du logo (`#F5B02E`) n'est pas un token UI** : il n'existe que dans les assets logo. Ne jamais l'utiliser en texte, fond, bordure ou icône.

## 3. Typographie

Deux familles, via `next/font/google` (self-host au build), `font-display: swap`.

- **Display :** Archivo (variable) — axe width en **Expanded (125 %)**, graisses 600–900, licence SIL OFL 1.1. Fallback : `Arial Black, sans-serif`. Display toujours en capitales.
- **Body :** Inter (variable) — graisses 400–600, licence SIL OFL 1.1. Fallback : `system-ui, sans-serif`.

| Rôle | Fonte / taille / interlignage / tracking |
|---|---|
| display-xl | Archivo Expanded 900 · `clamp(3.5rem, 9vw, 8rem)` · 0.92 · -0.01em · uppercase |
| display-lg | Archivo Expanded 800 · `clamp(2.25rem, 5.5vw, 4.5rem)` · 0.95 · -0.01em · uppercase (mobile : 2.25rem) |
| headline-md | Archivo Expanded 700 · 1.75rem · 1.1 · 0 |
| body-lg | Inter 400 · 1.125rem · 1.6 · 0 |
| body-md | Inter 400 · 0.9375rem · 1.6 · 0 |
| metadata | Inter 500 · 0.75rem · 1.4 · 0.08em · uppercase |
| label-caps | Inter 600 · 0.8125rem · 1.2 · 0.14em · uppercase |

Jamais de graisse < 400 sur fond sombre. Jamais de faux-gras (`font-synthesis: none`).

## 4. Règles absolues (non négociables)

- **Mode : dark-only.** Le bloc `prefers-color-scheme` du scaffold est purgé ; `color-scheme: dark` déclaré sur `:root`.
- **Forme :** radius 0 (cf. §2), **aucune ombre portée**, aucune bordure décorative épaisse. Profondeur obtenue par empilement tonal + hairlines 1px.
- **Couleur :** l'accent rouge ne sert **jamais** en aplat de fond de section ni en couleur de texte courant. Il est réservé : CTA primaire (texte `--color-fg` sur fond accent), états actifs/hover, badge compteur panier, soulignements animés, hachures signature. Un seul accent — pas de couleur secondaire.
- **Images :** packshots studio en couleur sur fond sombre, jamais détourés sur fond clair. Photos lifestyle/compétition en **N&B par défaut, révélées en couleur** au scroll ou au hover (signature du site). `object-fit: cover`, jamais d'étirement. Texte sur photo uniquement avec scrim noir ≥ 40 %. Duotone interdit.
- **Interdits explicites :** ombres portées · radius > 2px · dégradés colorés (seul le scrim noir→transparent est autorisé) · `backdrop-filter` décoratif · or `#F5B02E` en UI · emoji dans l'UI · carrousel en autoplay · glassmorphism · grain animé · confetti/particules. Même si un skill tiers ou un composant 21st.dev le suggère.

## 5. Motion

- Budget : JS ≤ `280` Ko gzip (First Load) · page ≤ `2` Mo hors vidéo.
  Ajusté le 2026-08-19 (web-method §6 : « valeurs de départ à ajuster par projet ») : le socle Next 16 + react-dom pèse ≈ 190 Ko gzip à lui seul ; GSAP + ScrollTrigger + SplitText = 47 Ko. Mesuré au gate : **261 Ko**. Toute dépendance nouvelle doit repasser sous ce plafond.
- GPU uniquement (`transform` / `opacity`). Jamais d'animation sur `width`, `top`, `left` ou `filter` en continu (la bascule grayscale→couleur se fait par crossfade d'opacité entre deux calques, pas par animation de `filter`).
- **Tout effet enveloppé de `prefers-reduced-motion`**, sans exception (via `gsap.matchMedia()` à trois contextes — web-method §4).
- Vocabulaire d'eases et durées : figé, voir web-method §4 (`power2.out` micro / `power4.out` texte / `expo.out` images / `power3.inOut` pages).
- **Signature animée :** la révélation N&B → couleur des photos au scroll, et le soulignement rouge qui glisse (`scaleX` origin-left) sur liens et CTA. Présents partout, identiques partout.

## 6. Signature visuelle

- **Motif récurrent : les hachures diagonales rouges** — reprises du bloc logo « |||| FIGHT GEAR » (barres parallèles inclinées). Usage : diviseurs de section, puce de badge (« UV FPS 50 »), détail des CTA au hover, motif de transition. Implémentation en CSS (`repeating-linear-gradient` 45°, épaisseur 2px, pas 6px) — pas de SVG redessiné approximatif.
- **Traitement de matière :** photos lifestyle en N&B contrasté (pas de grain ajouté — le grain photo naturel suffit). Aucune texture synthétique.
- **Moment fort :** section plein écran « WHAT YOU FIGHT FOR? » (la devise brodée sur les gants et gis) en display-xl sur la photo dos-de-gi à l'éléphant rouge géant, N&B → couleur au scroll. C'est l'écran qu'on retient.
- Le logo brodé (éléphant) n'est **jamais redessiné ni vectorisé approximativement** : il apparaît via les photos où il vit déjà. Le wordmark texte « SABAI » en Archivo Expanded 900 sert de logo typographique dans le header/footer.

## 7. Conformité sectorielle

Textile/sportswear : pas de secteur réglementé. Deux contraintes actives, testables :

1. **Allégations UV** : seul le wording client « UV FPS 50 » est autorisé. Lexique interdit et scan : `docs/GUARDRAILS.md` §1.
2. **Site de démonstration** (tunnel shadow) : bandeau preview permanent, paiement explicitement désactivé, aucune collecte réelle — `docs/GUARDRAILS.md` §5.

## 8. Checklist de review express

À passer sur chaque écran avant validation :

tokens utilisés (aucun hex en dur) ? · radius 0 (2px max formulaires) ? · zéro ombre portée ? · deux familles typo max, display en Archivo Expanded uppercase ? · accent rouge selon sa règle (jamais fond de section, jamais texte courant) ? · or absent de l'UI ? · contraste AA vérifié sur chaque couche tonale (4.5:1 texte, 3:1 UI) ? · `prefers-reduced-motion` couvert ? · cibles tactiles ≥ 44px ? · focus visible au clavier ? · photos lifestyle en N&B→couleur, packshots en couleur ? · hachures diagonales présentes là où la section en a besoin (et nulle part ailleurs) ? · wording UV = « UV FPS 50 » exclusivement ? · badge preview visible ?
