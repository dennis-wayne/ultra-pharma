"use client";

import { useState } from "react";
import Link from "next/link";
import type { Stage } from "@/content/pathway";
import { StageDocumentContent } from "./regulatory-art";

type HeroStage = Pick<Stage, "n" | "name" | "question" | "href">;

/** A schematic service illustration, never a product's regulatory status. */
export function HeroPathway({
  stages,
}: {
  readonly stages: readonly HeroStage[];
}) {
  const [highlighted, setHighlighted] = useState(2);
  const current = stages[highlighted] ?? stages[0];
  return (
    <figure
      className="hero-atelier"
      aria-label="The four-stage product pathway"
    >
      <svg
        className="pathway-drawing"
        viewBox="20 60 660 410"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="pathway-route-under"
          d="M42 344c33-18 49-28 74-20l142 28 142 28 142 28c29 8 59 9 91-6"
        />
        <path
          data-pathway-route
          className="pathway-route"
          pathLength="1"
          d="M42 344c33-18 49-28 74-20l142 28 142 28 142 28c29 8 59 9 91-6"
        />
        {stages.map((stage, index) => (
          <g key={stage.n} data-portal-intro>
            <g
              className="pathway-gate"
              data-highlighted={index === highlighted || undefined}
            >
              <ellipse
                className="gate-shadow"
                cx={122 + index * 142}
                cy={330 + index * 28}
                rx="67"
                ry="8"
                transform={`rotate(11 ${122 + index * 142} ${330 + index * 28})`}
              />
              <g
                transform={`matrix(.92 -.32 0 1 ${116 + index * 142} ${324 + index * 28})`}
              >
                <path className="gate-edge" d="m80-189 4-2V-5L80 0Z" />
                <path
                  className="gate-plane"
                  d="M-48-212H58l22 22v178q0 12-12 12H-48q-12 0-12-12v-188q0-12 12-12Z"
                />
                <path className="gate-fold" d="M58-212v22h22" />
                <text className="document-heading" x="-38" y="-178">
                  {stage.name}
                </text>
                <text className="document-subheading" x="-38" y="-160">
                  {
                    [
                      "Dossier review",
                      "Regional strategy",
                      "Clinical + economic",
                      "Ongoing obligations",
                    ][index]
                  }
                </text>
                <g
                  className="gate-engraving"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path className="document-divider" d="M-38-143H58" />
                  <StageDocumentContent index={index} />
                </g>
              </g>
            </g>
          </g>
        ))}
        <g className="pathway-endpoints">
          <circle cx="42" cy="344" r="3.5" />
          <circle cx="633" cy="402" r="3.5" />
        </g>
      </svg>
      <figcaption>
        <nav
          aria-label="Explore the product pathway"
          className="atelier-stages"
          data-hero-stages
        >
          {stages.map((stage, index) => (
            <Link
              key={stage.n}
              href={stage.href}
              onMouseEnter={() => setHighlighted(index)}
              onFocus={() => setHighlighted(index)}
              data-highlighted={index === highlighted || undefined}
            >
              <span className="atelier-stage-index">{stage.n}</span>
              <span>{stage.name}</span>
              <span className="sr-only">: {stage.question}</span>
            </Link>
          ))}
        </nav>
        <div className="atelier-question">
          <p key={current.n}>{current.question}</p>
          <span>Regulatory strategy. Evidence for access.</span>
        </div>
      </figcaption>
    </figure>
  );
}
