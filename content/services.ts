import type { IconName } from "@/lib/icons";
import type { StageIcon } from "./pathway";

export type Service = {
  readonly name: string;
  readonly description: string;
  /**
   * Its own mark. Where a service is the same labelled thing as a homepage
   * deliverable, both resolve to the same registry concept. `04 §9`.
   */
  readonly icon: IconName;
  /** Rendered only when present. An empty string renders no row. */
  readonly produces?: string;
};

export type ServiceStage = {
  readonly n: string;
  readonly name: string;
  readonly icon: StageIcon;
  readonly blurb: string;
  /** Stage 03 links out to its own page rather than expanding here. */
  readonly href?: string;
  readonly services: readonly Service[];
};

export const serviceStages: readonly ServiceStage[] = [
  {
    n: "01",
    name: "Approval",
    icon: "approval",
    blurb:
      "We help you prepare for registration in Kenya and keep the supporting quality systems ready for inspection.",
    services: [
      {
        name: "Regulatory strategy",
        icon: "regulatoryStrategy",
        description:
          "We check how your product is classified, review the dossier against Pharmacy and Poisons Board requirements and agree a filing plan based on the work still needed.",
        produces: "A filing strategy and dossier gap register.",
      },
      {
        name: "Submissions and eCTD",
        icon: "submissions",
        description:
          "We assemble the dossier, publish eCTD submissions and handle correspondence and queries while the authority reviews the file.",
        produces:
          "A submission-ready dossier and a query log with closure evidence.",
      },
      {
        name: "Compliance and quality",
        icon: "qualitySystems",
        description:
          "We help your team document procedures, review GxP readiness and prepare the quality systems for inspection.",
        produces:
          "An SOP set, an audit-readiness assessment, and a remediation plan.",
      },
    ],
  },
  {
    n: "02",
    name: "Market entry",
    icon: "marketEntry",
    blurb:
      "Planning another market? We adapt your existing dossier to local requirements so you can reuse the work you have already done.",
    services: [
      {
        name: "Multi-market dossiers",
        icon: "multiMarketDossiers",
        description:
          "We prepare harmonised submissions for EAC and wider African markets, then adapt the file to the requirements of each authority.",
      },
      {
        name: "Specialised therapeutics",
        icon: "specialisedTherapeutics",
        description:
          "Some products need a different approach. We help identify the route for rare disease treatments, biologics and advanced therapies.",
      },
    ],
  },
  {
    n: "03",
    name: "Reimbursement",
    icon: "reimbursement",
    href: "/services/reimbursement",
    blurb:
      "We help you prepare the clinical and economic evidence for assessment and plan engagement with SHA and the panel secretariat.",
    services: [
      {
        name: "HTA dossier development",
        icon: "htaDossier",
        description:
          "We bring together clinical effectiveness, safety and value evidence around an appropriate local comparator, in a form assessors can review.",
      },
      {
        name: "Cost-effectiveness and budget-impact modelling",
        icon: "economicModelling",
        description:
          "We model cost-effectiveness with Kenyan cost and disease data, then examine what funding the intervention could cost the relevant fund.",
      },
      {
        name: "Stakeholder engagement and SHA liaison",
        icon: "stakeholderEngagement",
        description:
          "We help you prepare for discussions with the Ministry of Health, the Social Health Authority and the panel secretariat, including what evidence needs to be ready and when.",
      },
    ],
  },
  {
    n: "04",
    name: "Lifecycle",
    icon: "lifecycle",
    blurb:
      "We help you manage the changes, renewals and obligations that continue after approval.",
    services: [
      {
        name: "Post-approval management",
        icon: "postApproval",
        description:
          "We keep track of variations, renewals, pharmacovigilance obligations and agreed commitments after approval.",
      },
      {
        name: "Label and indication expansion",
        icon: "labelExpansion",
        description:
          "We bring together the evidence and submissions needed to apply for a wider indication.",
      },
    ],
  },
];
