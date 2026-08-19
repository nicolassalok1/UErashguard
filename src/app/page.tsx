/* [HOME] Page d'accueil — dominée par le UV Long Sleeve (CONVENTIONS §9). */
import { Hero } from "@/components/home/Hero";
import { MarqueeBand } from "@/components/home/MarqueeBand";
import { FeatureBento } from "@/components/home/FeatureBento";
import { FightForMoment } from "@/components/home/FightForMoment";
import { ProductBuy } from "@/components/home/ProductBuy";
import { Story } from "@/components/home/Story";
import { CatalogTeaser } from "@/components/home/CatalogTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <FeatureBento />
      <ProductBuy />
      <FightForMoment />
      <Story />
      <CatalogTeaser />
    </>
  );
}
