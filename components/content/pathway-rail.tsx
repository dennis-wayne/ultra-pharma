import Link from "next/link";
import { stages } from "@/content/pathway";
export function PathwayRail() {
  return (
    <div className="relative">
      <div data-draw aria-hidden className="h-px bg-rule-strong" />
      <div
        data-reveal-group
        className="grid gap-8 pt-8 md:grid-cols-2 lg:grid-cols-4"
      >
        {stages.map((stage) => (
          <div key={stage.n} className="flex flex-col">
            <div className="mb-7 flex items-center justify-between gap-2">
              <span className="t-index text-ink-500">
                {stage.n} / {stage.name}
              </span>
              {stage.isNew && (
                <span
                  className="h-1.5 w-1.5 rounded-full bg-stamp-600"
                  aria-hidden
                />
              )}
            </div>
            <h3 className="t-h3 m-0 min-h-[62px]">{stage.question}</h3>
            <ul className="mb-5 mt-5 list-none p-0 text-ink-700">
              {stage.deliverables.map((item) => (
                <li key={item.label} className="py-1.5">
                  {item.label}
                </li>
              ))}
            </ul>
            <Link href={stage.href} className="text-link mt-auto w-fit">
              {stage.name} in detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
