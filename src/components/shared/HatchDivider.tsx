/* [INFRA] Diviseur signature — hachures diagonales rouges (rashguard-da §6). */
import { cn } from "@/lib/utils";

export function HatchDivider({ className }: { className?: string }) {
  return <div aria-hidden className={cn("hatch h-2 w-16", className)} />;
}
