/* [INFRA] Formatage des prix — seul point de vérité (CONVENTIONS §4).
   Devise : MYR (RM) — RESEARCH §6. */

export function formatPrice(amount: number): string {
  return `RM ${amount.toFixed(0)}`;
}
