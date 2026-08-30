# GUARDRAILS — UErashguard

> **Obligatoire pour tout agent qui écrit du copy, de la data ou des visuels.**
> Les violations font échouer le gate de fin de phase (`npm run gate` → scan lexical + revue).

## Principe

Une règle formulée en principe ne se teste pas ; une liste de mots, si. Le scan `scripts/guardrails-scan.mjs` (branché sur `npm run gate`) porte sur : copy, data, attributs `alt`, metadata, slugs — soit `src/**/*.{ts,tsx}`. Limites de mot (`\b`) obligatoires.

## 1. Allégations UV (contrainte active n°1)

Le produit hero annonce une protection UV. **Seul wording autorisé : « UV FPS 50 »** — repris à l'identique du visuel fourni par le client (bannière logo, WhatsApp 2026-08-19). Tant que le client n'a pas fourni la norme ou le certificat correspondant :

- **Lexique interdit** (minuscules, scanné) : `spf` · `upf` · `sunscreen` · `dermatologist` · `dermatologically` · `clinically` · `medical` · `medically` · `cancer` · `melanoma` · `certified` · `certification` · `guaranteed` · `en 13758` · `as/nzs`.
- **Lexique autorisé** (l'angle de vente qui reste) : « UV FPS 50 rated fabric » · « built for long hours in the sun » · « covers what the sun hits » · « breathable sun cover for bike, run, surf » — le bénéfice se raconte par l'usage (ride, run, surf, outdoor), jamais par la promesse médicale.
- Mention obligatoire : aucune imposée à ce stade. Si le client fournit une certification, elle entrera ici avec son emplacement exact.

## 2. Ambiguïtés de marque à éviter

- Sabai Fight Gear est une marque d'équipement : ne jamais laisser entendre que le site est une fédération, un club ou un organisateur d'événements. Les photos d'événement (MMU Cyberjaya, mai 2026) illustrent la communauté — caption factuelle, pas de « we host » / « our championship ».
- Ne pas revendiquer de partenariat/sponsoring non documenté : `official partner` · `sponsored by` interdits sauf source client.
- L'éléphant est le logo d'une autre entité sur certaines photos (écussons de clubs tiers : Arte Suave, Nelson de Jesus) — ne jamais présenter ces écussons comme des marques Sabai ; recadrer si nécessaire.

## 3. Contraintes géographiques

Marque malaisienne à audience internationale : le marketing ne mentionne aucune ville. Les mentions légales (hors périmètre POC, §7) contiendront l'adresse réelle — champ `[À COMPLÉTER]`, jamais inventé.

## 4. Personnes réelles

- **Aucune citation inventée.** Pas de section « testimonials » avec fausses quotes : les photos d'événement réelles en tiennent lieu. Tout futur emplacement de citation porte `[CITATION À VALIDER]` et ne s'affiche pas.
- Photos fournies par la marque (athlètes, famille, enfants) : droits présumés côté client — **à confirmer par écrit avant mise en production**, en particulier pour les mineurs (série Sabai_May).
- **2026-08-30 — dérogation client.** Nicolas a confirmé oralement détenir les droits sur les deux photos de gants portés par un enfant (`assets-src/sabai-kids-gloves-{guard,close}.jpg`) et a demandé leur mise en ligne. Elles sont publiées sur la fiche `kids-boxing-gloves`, en positions 2 et 3 — l'image 1 reste le packshot sans personne (vignette du shop et de la carte produit). **⚠ Accord à formaliser par écrit avant mise en production.** Les autres photos d'enfants (série Sabai_May) restent hors des pages commerciales.
- Aucun visage généré par IA.

## 5. Contenu de démonstration (contrainte active n°2 — tunnel shadow)

Le site est un POC : panier et tunnel présents, **paiement volontairement non branché**.

- **Badge permanent site-wide** (`PreviewBadge`, monté dans le layout racine) : « Preview build — payments disabled ». Il couvre aussi le caractère placeholder des prix.
- Prix : valeurs réalistes en RM, flaguées `// TODO PRIX RÉELS` dans `src/data/products.ts`.
- Tunnel : le bouton de commande affiche « Payments are not enabled in this preview » à l'action. S'il existe un écran de confirmation, il est étiqueté « DEMO — no payment processed, no order created », sans numéro de commande réaliste. **Jamais un faux tunnel qui semble fonctionner.**
- Formulaires (newsletter, contact) : état local « Preview — signups are disabled », **aucune collecte réelle**, aucun envoi réseau.

## 6. RGPD / traceurs

- Aucun analytics, aucun pixel, aucun cookie tiers → **pas de bannière de consentement** (en poser une serait un dark pattern). Le panier persiste en `localStorage` (storage fonctionnel exempté).
- Média et fontes **self-hosted uniquement** (next/font au build, images locales). Aucune requête tierce à l'exécution — c'est scanné : `googleapis` · `gstatic` · `cdn.` interdits dans `src/**`.

## 7. Pages légales

**Hors périmètre POC** — assumé et visible : pas de pages légales factices, pas de faux SIRET/registration. Avant mise en production : mentions légales, CGV, confidentialité, cookies — champs `[À COMPLÉTER — REGISTRATION / SIÈGE / DIRECTEUR DE PUBLICATION / CONTACT / HÉBERGEUR]` à faire valider par un juriste. Le footer du POC affiche « Preview build » à la place des liens légaux.

## 8. Contrôle d'accès

Sans objet (pas d'age gate).

## Lexique interdit consolidé (source du scan)

```
spf, upf, sunscreen, dermatologist, dermatologically, clinically, medical,
medically, cancer, melanoma, certified, certification, guaranteed,
official partner, sponsored by, googleapis, gstatic
```

Le scan tolère les occurrences dans `docs/**` et ce fichier (documentation), pas dans `src/**`.
