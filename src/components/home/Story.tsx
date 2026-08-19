/* [HOME] Our Story — ADN de marque (docs projet `ADN`/`activity`).
   Photo adultes uniquement (GUARDRAILS §4). */
import { Section } from "@/components/shared/Section";
import { HatchDivider } from "@/components/shared/HatchDivider";
import { RevealText } from "@/components/shared/RevealText";
import { RevealImage } from "@/components/shared/RevealImage";
import { SITE } from "@/data/site";

const FACTS = [
  { value: "2015", label: "Founded in Malaysia" },
  { value: "PRO", label: "Fighter-founded — BJJ black belt" },
  { value: "10+", label: "Product lines, mats to open water" },
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
              pockets. {SITE.name} started in 2015 to fix both.
            </p>
            <p className="type-body text-subtle">
              Every product is designed by a professional fighter and BJJ
              black belt, then improved year after year by the people who
              actually wear it — from boxing gloves and gis to the new UV
              Long Sleeve that takes the same standard out of the gym and
              into the sun.
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
            src="/images/brand/flag-team.webp"
            alt="Two Sabai athletes holding the brand flag in the gym"
            sizes="(max-width: 1024px) 100vw, 50vw"
            colorize
            className="aspect-[4/5] w-full lg:h-full"
          />
        </div>
      </div>
    </Section>
  );
}
