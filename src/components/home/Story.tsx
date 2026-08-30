/* [HOME] Our Story — ADN de marque (docs projet `ADN`/`activity`).
   Photo adultes uniquement (GUARDRAILS §4).
   MAJ 2026-08-30 (annotations client) : fondation Brasil 2017 → Malaisie 2022,
   fondateur nommé, fact « 10+ product lines » retiré, photo sans décor tiers. */
import { Section } from "@/components/shared/Section";
import { HatchDivider } from "@/components/shared/HatchDivider";
import { RevealText } from "@/components/shared/RevealText";
import { RevealImage } from "@/components/shared/RevealImage";
import { SITE } from "@/data/site";

const FACTS = [
  { value: "2017", label: "Founded in Brasil" },
  { value: "2022", label: "Brought to Malaysia" },
  {
    value: "PRO",
    label: `Founded by ${SITE.founder} — pro fighter, BJJ black belt`,
  },
];

export function Story() {
  return (
    <Section id="story">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-6">
          <div className="flex items-center gap-4">
            <HatchDivider className="w-10" />
            <span className="type-meta text-subtle">Our story</span>
          </div>

          <RevealText as="h2" className="type-display-lg text-fg">
            Tired of cheap gear. So we made our own.
          </RevealText>

          <div className="flex max-w-xl flex-col gap-5">
            <p className="type-body-lg text-subtle">
              Twenty years of training and fighting taught our founder one
              thing: cheap gear fails you, and big-brand gear empties your
              pockets. {SITE.name} started in Brasil in 2017 to fix both, and
              came to Malaysia in 2022.
            </p>
            <p className="type-body text-subtle">
              Every product is designed by {SITE.founder} — professional
              fighter and BJJ black belt — then improved year after year by
              the people who actually wear it: from boxing gloves and gis to
              the new UV Long Sleeve that takes the same standard out of the
              gym and into the sun.
            </p>
          </div>

          <dl className="hairline-t grid grid-cols-3 gap-6 pt-8">
            {FACTS.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-2">
                <dt className="sr-only">{fact.label}</dt>
                <dd className="type-headline text-fg">{fact.value}</dd>
                <dd className="type-meta text-subtle">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6">
          <RevealImage
            src="/images/lifestyle/comp-medal.webp"
            alt="Sabai athlete in a What You Fight For? gi after a competition"
            sizes="(max-width: 1024px) 100vw, 50vw"
            colorize
            className="aspect-[4/5] w-full lg:h-full"
          />
        </div>
      </div>
    </Section>
  );
}
