import type { EvidenceItem } from "@/content/reimbursement";
export function EvidenceList({
  items,
}: {
  readonly items: readonly EvidenceItem[];
}) {
  if (!items.length) return null;
  return (
    <ol
      data-slot="evidence-list"
      className="m-0 list-none border-t border-rule p-0"
    >
      {items.map((item) => (
        <li
          key={item.n}
          className="flex items-baseline gap-6 border-b border-rule py-6"
        >
          <span className="t-index shrink-0 text-ink-500">{item.n}</span>
          <span className="text-ink-900">{item.requirement}</span>
        </li>
      ))}
    </ol>
  );
}
