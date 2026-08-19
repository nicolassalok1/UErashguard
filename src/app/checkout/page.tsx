/* [CHECKOUT] Page checkout — tunnel shadow (GUARDRAILS §5). */
import type { Metadata } from "next";
import { Section } from "@/components/shared/Section";
import { HatchDivider } from "@/components/shared/HatchDivider";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Checkout (preview)",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <Section className="min-h-[70svh] pt-12 lg:pt-16">
      <div className="mb-12 flex flex-col gap-6">
        <HatchDivider />
        <h1 className="type-display-lg text-fg">Checkout</h1>
        <p className="type-meta text-subtle">{SITE.preview}</p>
      </div>
      <CheckoutForm />
    </Section>
  );
}
