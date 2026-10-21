import type { IconName } from "@/lib/icons";

/**
 * The four stages. `icon` is the stage's own mark, fixed per `03 §8` so meaning
 * stays stable; the registry holds the binding.
 */
export type StageIcon =
  "approval" | "marketEntry" | "reimbursement" | "lifecycle";

/**
 * A deliverable is a labelled thing, so it carries a mark of its own rather
 * than borrowing the stage's. The same concept appears as a service on
 * `/services` and resolves to the same mark there. `04 §9`.
 */
export type Deliverable = {
  readonly label: string;
  readonly icon: IconName;
};

export type Stage = {
  readonly n: string;
  readonly name: string;
  readonly question: string;
  readonly icon: StageIcon;
  readonly isNew: boolean;
  readonly href: string;
  readonly blurb: string;
  readonly deliverables: readonly Deliverable[];
  /** Homepage services grid: 7 and 5 alternating at lg. */
  readonly span: 7 | 5;
};

export const stages: readonly Stage[] = [
  {
    n: "01",
    name: "Approval",
    question: "Can it be sold?",
    icon: "approval",
    isNew: false,
    href: "/services#stage-01",
    blurb:
      "We help you prepare for registration in Kenya and keep the supporting quality systems ready for inspection.",
    deliverables: [
      { label: "Regulatory strategy", icon: "regulatoryStrategy" },
      { label: "Submissions and eCTD", icon: "submissions" },
      { label: "Compliance and quality systems", icon: "qualitySystems" },
    ],
    span: 7,
  },
  {
    n: "02",
    name: "Market entry",
    question: "Can it reach the market?",
    icon: "marketEntry",
    isNew: false,
    href: "/services#stage-02",
    blurb:
      "We adapt your existing dossier to the next market, keeping local requirements in view.",
    deliverables: [
      { label: "Multi-market dossiers", icon: "multiMarketDossiers" },
      { label: "Local adaptation", icon: "localAdaptation" },
      { label: "Expedited pathways", icon: "expeditedPathways" },
    ],
    span: 5,
  },
  {
    n: "03",
    name: "Reimbursement",
    question: "Will it be paid for?",
    icon: "reimbursement",
    isNew: true,
    href: "/services/reimbursement",
    blurb:
      "We help you prepare the evidence authorities need when they assess the case for funded access.",
    deliverables: [
      { label: "HTA dossiers", icon: "htaDossier" },
      { label: "Economic modelling", icon: "economicModelling" },
      { label: "SHA and BPTAP engagement", icon: "stakeholderEngagement" },
    ],
    span: 5,
  },
  {
    n: "04",
    name: "Lifecycle",
    question: "Does it stay valuable?",
    icon: "lifecycle",
    isNew: false,
    href: "/services#stage-04",
    blurb:
      "We help you manage renewals, changes and the work that continues after approval.",
    deliverables: [
      { label: "Post-approval monitoring", icon: "postApproval" },
      { label: "Label expansion", icon: "labelExpansion" },
      { label: "Portfolio strategy", icon: "portfolioStrategy" },
    ],
    span: 7,
  },
];
