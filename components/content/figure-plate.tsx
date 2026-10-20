import type { ReactNode } from "react";
import type { IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";
export type PlateField = "grid" | "ledger" | "graticule" | "hatch";
export type PlateTone = "sunk" | "raised" | "wash" | "deep";
export type PlateAspect = "16/9" | "5/2" | "3/2" | "4/3" | "4/5" | "1/1";
export type FigurePlateProps = {
  readonly icon?: IconName;
  readonly label?: string;
  readonly index?: string;
  readonly title?: string;
  readonly note?: string;
  readonly children?: ReactNode;
  readonly aspect?: PlateAspect;
  readonly field?: PlateField;
  readonly tone?: PlateTone;
  readonly markSize?: number;
  readonly className?: string;
};
/** Typography and actual subject matter replace decorative icon watermarks. */
export function FigurePlate({
  label,
  index,
  title,
  note,
  children,
  field = "grid",
  tone = "sunk",
  className,
}: FigurePlateProps) {
  return (
    <div
      data-slot="figure-plate"
      data-media-in
      className={cn("plate", `plate-${tone}`, className)}
    >
      <span aria-hidden className={cn("plate-field", `plate-field-${field}`)} />
      <div className="plate-body">
        <div className="flex items-start justify-between gap-4">
          <span className="t-label text-ink-500">{label}</span>
          {index && <span className="t-index text-ink-500">{index}</span>}
        </div>
        <div>
          {title && (
            <p className="m-0 mb-5 max-w-[24ch] font-display text-2xl font-medium leading-snug">
              {title}
            </p>
          )}
          {children}
          {note && <p className="t-data mb-0 mt-5 text-ink-500">{note}</p>}
        </div>
      </div>
    </div>
  );
}
