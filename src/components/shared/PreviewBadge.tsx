/* [INFRA] Badge démo permanent site-wide — GUARDRAILS §5. */
import { SITE } from "@/data/site";

export function PreviewBadge() {
  return (
    <div
      role="status"
      className="type-meta pointer-events-none fixed bottom-4 left-4 z-50 rounded-[2px] border border-border bg-elevated/95 px-3 py-2 text-[10px] text-subtle"
    >
      {SITE.preview}
    </div>
  );
}
