/* [INFRA] Header sticky — structure d'après 21st.dev #8964 (Header 1,
   sshahaider), re-tokenisée DA : fond opaque au scroll (pas de backdrop-blur,
   interdit rashguard-da §4), hairline, wordmark Archivo. RESEARCH §4. */
"use client";

import React from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/data/site";
import { CartButton } from "@/components/shared/CartButton";
import { useCartHydrated } from "@/store/cart";

function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScrolled(10);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-transparent transition-colors duration-200",
        (scrolled || open) && "hairline-b bg-bg",
      )}
    >
      <nav className="container-site flex h-16 items-center justify-between">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-xl font-black tracking-tight uppercase [font-stretch:125%] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {SITE.wordmark}
          <span className="text-brand">.</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-6">
          <div className="hidden items-center gap-6 md:flex">
            {SITE.nav.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="type-label link-underline py-2 text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <CartButton />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex size-11 items-center justify-center text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="size-5" strokeWidth={1.5} />
            ) : (
              <Menu className="size-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </nav>
      <MobileMenu open={open} onNavigate={() => setOpen(false)} />
    </header>
  );
}

function MobileMenu({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) {
  const mounted = useCartHydrated();
  if (!open || !mounted) return null;

  return createPortal(
    <div
      id="mobile-menu"
      className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col justify-between bg-bg p-6 md:hidden"
    >
      <nav className="flex flex-col gap-2">
        {SITE.nav.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={onNavigate}
            className="type-display-lg hairline-b py-4 text-fg"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <p className="type-meta text-subtle">{SITE.since}</p>
    </div>,
    document.body,
  );
}
