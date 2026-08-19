# UErashguard — Sabai Fight Gear

Site one-product premium autour du **UV Long Sleeve (UV FPS 50)** + catalogue complet.
**POC** : e-commerce complet en shadow — panier fonctionnel, checkout démo, paiement à brancher plus tard.

## Lancer

```powershell
npm install
npm run dev        # http://localhost:3000
```

## Gates (à passer avant toute livraison)

```powershell
npm run gate       # typecheck → lint → scan guardrails → build
```

## Documents de gouvernance — à lire avant d'écrire une ligne

| Fichier | Rôle |
|---|---|
| `.claude/skills/rashguard-da/SKILL.md` | Direction artistique — source de vérité visuelle |
| `docs/CONVENTIONS.md` | Contrat d'implémentation (gelé après infra) |
| `docs/GUARDRAILS.md` | Lexique interdit + règles du mode démo |
| `docs/RESEARCH.md` | Décisions sourcées et datées |

## Stack

Next 16 (App Router) · React 19 · Tailwind v4 · shadcn (radix) · GSAP + @gsap/react · zustand.
Composants structurels issus de 21st.dev (voir RESEARCH §4), **re-tokenisés** selon la DA.

## Structure

- `/` — home one-product (hero, features, achat, moment « What You Fight For? », story, teaser catalogue)
- `/shop` + `/shop/[slug]` — catalogue et fiches produit
- `/checkout` — tunnel démo (paiement désactivé)
- `assets-src/` — photos originales · `public/images/` — WebP optimisées (`npm run images`)

## TODO avant production

- [ ] Prix réels (`src/data/products.ts` — placeholders)
- [ ] Intégration paiement (Stripe Checkout ou équivalent) + retrait du mode preview
- [ ] Pages légales (mentions, CGV, confidentialité — GUARDRAILS §7)
- [ ] Confirmation écrite des droits à l'image (GUARDRAILS §4)
- [ ] Certification UV si disponible (GUARDRAILS §1)
