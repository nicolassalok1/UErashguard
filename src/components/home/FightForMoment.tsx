/* [HOME] Moment fort — « WHAT YOU FIGHT FOR? » plein écran sur la photo
   dos-de-gi à l'éléphant rouge, N&B→couleur au scroll (rashguard-da §6).
   Texte sur scrim ≥ 40 % (rashguard-da §4). */
import { RevealImage } from "@/components/shared/RevealImage";
import { RevealText } from "@/components/shared/RevealText";
import { SITE } from "@/data/site";

export function FightForMoment() {
  return (
    <section className="hairline-t hairline-b relative">
      <RevealImage
        src="/images/lifestyle/elephant-back.webp"
        alt="Back of a black gi with the red Sabai elephant"
        sizes="100vw"
        colorize
        priority={false}
        className="h-[90svh] w-full"
      />
      <div className="scrim-b absolute inset-0" aria-hidden />
      <div className="absolute inset-0 flex items-end">
        <div className="container-site flex flex-col gap-4 pb-16">
          <RevealText as="p" className="type-display-xl max-w-5xl text-fg">
            {SITE.tagline}
          </RevealText>
          <p className="type-meta text-fg/80">
            The question stitched on every glove, belt and pair of shorts we
            make.
          </p>
        </div>
      </div>
    </section>
  );
}
