/* [INFRA] Marquee CSS infini — pause au hover, statique si reduced-motion
   (structure d'après 21st.dev #23537, re-tokenisée — RESEARCH §4). */
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  /** durée d'un cycle en secondes */
  duration?: number;
  label?: string;
};

export function Marquee({
  children,
  className,
  duration = 28,
  label = "Scrolling banner",
}: MarqueeProps) {
  return (
    <section
      aria-label={label}
      className={cn("marquee-paused overflow-hidden", className)}
    >
      <div
        className="marquee-track flex w-max items-center"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex items-center" aria-hidden={false}>
          {children}
        </div>
        <div className="flex items-center" aria-hidden>
          {children}
        </div>
      </div>
    </section>
  );
}
