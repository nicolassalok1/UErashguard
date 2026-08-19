/* [HOME] Features bento — structure d'après 21st.dev #979 (Feature Section
   with Bento Grid, manuarora700), re-tokenisée DA : hairlines, radius 0,
   photos N&B→couleur via RevealImage (signature). */
import { RevealText } from "@/components/shared/RevealText";
import { RevealImage } from "@/components/shared/RevealImage";
import { HatchDivider } from "@/components/shared/HatchDivider";
import { Section } from "@/components/shared/Section";

const CELLS = [
  {
    title: "UV FPS 50 fabric",
    body: "Rated cover for what the sun hits. Full arm, high collar, zero gaps between cuff and glove.",
    src: "/images/products/uv-ls-mockup.webp",
    alt: "UV Long Sleeve front and back mockup",
    span: "lg:col-span-7",
    colorize: false,
  },
  {
    title: "Born on the mats",
    body: "A decade of fight gear behind every seam. Same standard as our competition rashguards.",
    src: "/images/lifestyle/comp-grappling.webp",
    alt: "Grappling competition action",
    span: "lg:col-span-5",
    colorize: true,
  },
  {
    title: "Bike. Run. Surf.",
    body: "Quick-dry knit that breathes at pace and dries before the next set.",
    src: "/images/lifestyle/uv-rider.webp",
    alt: "Rider wearing the UV Long Sleeve",
    span: "lg:col-span-5",
    colorize: true,
  },
  {
    title: "Flatlock everywhere",
    body: "No rub at hour three. Seams laid flat, print sublimated — it will not crack.",
    src: "/images/products/rashguard-detail.webp",
    alt: "Flatlock seam and sleeve detail",
    span: "lg:col-span-7",
    colorize: false,
  },
];

export function FeatureBento() {
  return (
    <Section id="features">
      <div className="mb-14 flex flex-col gap-6">
        <HatchDivider />
        <RevealText as="h2" className="type-display-lg max-w-3xl text-fg">
          Built for the long hours outside
        </RevealText>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {CELLS.map((cell) => (
          <article
            key={cell.title}
            className={`hairline group flex flex-col bg-surface ${cell.span}`}
          >
            <RevealImage
              src={cell.src}
              alt={cell.alt}
              sizes="(max-width: 1024px) 100vw, 50vw"
              colorize={cell.colorize}
              className="aspect-[16/10] w-full"
            />
            <div className="flex flex-col gap-2 p-6">
              <h3 className="type-headline text-fg">{cell.title}</h3>
              <p className="type-body max-w-lg text-subtle">{cell.body}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
