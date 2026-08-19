/* [INFRA] Footer — structure d'après 21st.dev #24450 (Footer Section 3,
   solaceui : bandeau headline + colonnes), re-tokenisée DA, sans newsletter
   réelle (GUARDRAILS §5) ni liens légaux morts (GUARDRAILS §7). */
import Link from "next/link";
import { SITE } from "@/data/site";
import { HatchDivider } from "@/components/shared/HatchDivider";

export function Footer() {
  return (
    <footer className="hairline-t bg-bg">
      <div className="container-site flex flex-col gap-12 py-16">
        <div className="flex flex-col gap-6">
          <HatchDivider />
          <p className="type-display-lg text-fg">
            {SITE.tagline}
          </p>
        </div>

        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <Link href="/" className="type-label link-underline w-fit text-fg">
              Home
            </Link>
            {SITE.nav.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="type-label link-underline w-fit text-fg"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="type-label link-underline w-fit text-fg"
            >
              Instagram — {SITE.instagramHandle}
            </a>
          </nav>

          <div className="flex flex-col gap-2 md:items-end">
            <p className="type-meta text-subtle">{SITE.since}</p>
            <p className="type-meta text-subtle">
              © 2026 {SITE.name} — {SITE.preview}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
