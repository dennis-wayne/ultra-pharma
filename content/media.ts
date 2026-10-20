/**
 * Every photograph on the site, in one file.
 *
 * There is one. The stock photography that filled the canvas's other image
 * slots was removed at the client's request: it illustrated nothing specific
 * and so failed the first rule in `04 §1`, and a set of twelve borrowed
 * pictures reads as a scrapbook however carefully it is graded. Those slots are
 * now drawn rather than photographed, from the system's own materials. See
 * `FigurePlate`, `FundsDiagram` and `DESIGN-SOURCE.md`.
 *
 * What remains is the firm's own hero asset. To add the firm's own photography
 * later, add an entry here and point a slot at it; nothing else changes.
 */

export type Media = {
  /** The canvas slot id this fills. */
  readonly slot: string;
  /** Category brief carried by the canvas placeholder. */
  readonly brief: string;
  readonly src: string;
  /** Describes the subject. Never a keyword list. */
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly photographer: string;
  readonly source: string;
};

export const media = {
  hero: {
    slot: "up-hero",
    brief:
      "P1 · FACILITY : wide shot, sterile filling line or QC laboratory, unposed",
    src: "/hero-bg.jpg",
    alt: "Ultra Pharma laboratory and regulatory operations in Kenya.",
    width: 4252,
    height: 3145,
    photographer: "Ultra Pharma",
    source: "/hero-bg.jpg",
  },
} as const satisfies Record<string, Media>;

export const allMedia: readonly Media[] = Object.values(media);

/**
 * Third-party photography only. The credits block on `/legal/terms` renders
 * from this and does not render at all while it is empty, which is the state
 * the site ships in: the one photograph on it is the firm's own.
 */
export const photoCredits: readonly Media[] = allMedia.filter((item) =>
  item.source.startsWith("http"),
);
