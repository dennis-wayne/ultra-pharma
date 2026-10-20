"use client";

import { useEffect, useRef, useState } from "react";

export type IndexRailProps = {
  readonly sections: readonly string[];
  readonly idPrefix?: string;
};

export function IndexRail({ sections, idPrefix = "sec" }: IndexRailProps) {
  const [active, setActive] = useState(sections[0] ?? "");
  const progress = useRef<HTMLDivElement>(null);
  const key = sections.join(",");
  useEffect(() => {
    const ids = key.split(",");
    let frame = 0;
    let positions: Array<{ id: string; top: number }> = [];
    let max = 0;
    let previous = "";
    const measure = () => {
      positions = ids.flatMap((id) => {
        const node = document.getElementById(`${idPrefix}-${id}`);
        return node
          ? [{ id, top: node.getBoundingClientRect().top + window.scrollY }]
          : [];
      });
      max = document.documentElement.scrollHeight - innerHeight;
      queue();
    };
    const update = () => {
      frame = 0;
      let current = ids[0] ?? "";
      for (const section of positions) {
        if (section.top <= window.scrollY + 170) current = section.id;
      }
      if (current !== previous) {
        previous = current;
        setActive(current);
      }
      if (progress.current)
        progress.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(measure);
    resize.observe(document.body);
    measure();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", measure);
      resize.disconnect();
    };
  }, [key, idPrefix]);
  return (
    <>
      <nav aria-label="On this page" className="section-rail">
        {sections.map((n) => (
          <a
            key={n}
            href={`#${idPrefix}-${n}`}
            aria-label={`Go to section ${n}`}
            aria-current={n === active ? "location" : undefined}
          >
            {n}
          </a>
        ))}
      </nav>
      <div ref={progress} className="mobile-progress" aria-hidden />
    </>
  );
}
