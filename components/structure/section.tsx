import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionProps = HTMLAttributes<HTMLElement> & {
  /** Two digits. Owned here so numbering cannot drift out of sequence. */
  readonly index: string;
  readonly children: ReactNode;
  readonly width?: "page" | "wide" | "text";
  readonly tone?: "paper" | "sunk" | "deep";
  readonly bordered?: boolean;
};

const widthClass = {
  page: "max-w-[1200px]",
  wide: "max-w-[1440px]",
  text: "max-w-[720px]",
} as const;

/**
 * Owns the section index number and the vertical rhythm. `id` is set from the
 * index so `IndexRail` can track it without a second source of truth.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  {
    index,
    children,
    width = "page",
    tone = "paper",
    bordered = false,
    className,
    ...props
  },
  ref,
) {
  return (
    <section
      ref={ref}
      id={`sec-${index}`}
      data-sec={index}
      data-slot="section"
      className={cn(
        tone === "sunk" && "bg-paper-sunk",
        tone === "deep" && "bg-paper-deep text-deep-ink",
        bordered && "border-t border-rule",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "shell section-space",
          width === "text" && widthClass.text,
        )}
      >
        {children}
      </div>
    </section>
  );
});

export type SectionIndexProps = {
  readonly index: string;
  readonly label: string;
  /** On the inverted band the index and label take the deep palette. */
  readonly tone?: "paper" | "deep";
  readonly className?: string;
};

/**
 * The numbered eyebrow. The number is inside the same block as the label so a
 * screen reader announces the structure without the rail duplicating it.
 */
export function SectionIndex({
  index,
  label,
  tone = "paper",
  className,
}: SectionIndexProps) {
  return (
    <div data-slot="section-index" className={cn("section-label", className)}>
      <span
        className={cn(
          "t-index",
          tone === "deep" ? "text-deep-ink-soft" : "text-ink-400",
        )}
      >
        {index}
      </span>
      <span
        className={cn(
          "t-label",
          tone === "deep" ? "text-deep-ink-soft" : "text-ink-500",
        )}
      >
        {label}
      </span>
    </div>
  );
}
