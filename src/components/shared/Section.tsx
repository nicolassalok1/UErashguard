/* [INFRA] Wrapper de section — section-gap DA + container (CONVENTIONS §4). */
import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  /** pleine largeur : pas de container interne */
  bleed?: boolean;
};

export function Section({ bleed, className, children, ...props }: SectionProps) {
  return (
    <section className={cn("py-24 lg:py-36", className)} {...props}>
      {bleed ? children : <div className="container-site">{children}</div>}
    </section>
  );
}
