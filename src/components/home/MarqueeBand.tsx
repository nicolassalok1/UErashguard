/* [HOME] Bande marquee — devise de marque en défilement (Marquee partagé,
   structure d'après 21st.dev #23537 — RESEARCH §4). */
import { Marquee } from "@/components/shared/Marquee";
import { SITE } from "@/data/site";

const ITEMS = [
  SITE.tagline.toUpperCase(),
  "UV FPS 50",
  "BIKE · RUN · SURF",
  SITE.since,
];

export function MarqueeBand() {
  return (
    <div className="hairline-b bg-bg py-5">
      <Marquee label="Brand banner" duration={30}>
        {ITEMS.map((item) => (
          <span key={item} className="flex items-center">
            <span className="type-label px-6 whitespace-nowrap text-fg">
              {item}
            </span>
            <span aria-hidden className="hatch h-3 w-6 shrink-0" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
