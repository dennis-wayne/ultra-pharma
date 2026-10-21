import type { IconName } from "@/lib/icons";

/**
 * `/services/reimbursement`. Facts verified against `01 §4`.
 *
 * The panel is the Benefits Package and Tariffs Advisory Panel. The two
 * incorrect forms in circulation are rejected by `npm run lint:strings`, which
 * is why they are not spelled out here.
 */

export type Fact = {
  readonly key: string;
  readonly value: string;
};

/** Rendered in --t-data, because each one is checkable. */
export const facts: readonly Fact[] = [
  { key: "Body", value: "Benefits Package and Tariffs Advisory Panel" },
  { key: "Gazetted", value: "Notice No. 5044, 23 April 2025" },
  { key: "Inaugurated", value: "26 May 2025" },
  { key: "Chair at inauguration", value: "Prof. Walter Jaoko" },
  { key: "Secretariat", value: "CEMA, University of Nairobi" },
  { key: "Method", value: "Health technology assessment" },
];

export type ReimbursementService = {
  /** The same concepts the homepage lists as stage 03 deliverables. */
  readonly icon: IconName;
  readonly name: string;
  readonly description: string;
};

export const reimbursementServices: readonly ReimbursementService[] = [
  {
    icon: "htaDossier",
    name: "HTA dossier development",
    description:
      "We bring together clinical effectiveness, safety and value evidence around an appropriate local comparator, in a form assessors can review.",
  },
  {
    icon: "economicModelling",
    name: "Cost-effectiveness and budget-impact modelling",
    description:
      "We use Kenyan cost and disease data to model cost-effectiveness, then estimate what inclusion could cost the relevant fund over an agreed period.",
  },
  {
    icon: "stakeholderEngagement",
    name: "Stakeholder engagement and SHA liaison",
    description:
      "We help you prepare for discussions with the Ministry of Health, SHA and the panel secretariat, including what evidence needs to be ready and when.",
  },
];

/**
 * Required verbatim under section 03 per `01 D-04`. The service is evidence
 * generation and structured engagement, not a promised filing route or outcome.
 */
export const caveat =
  "Kenya's HTA process is new and still taking shape. We work with the process as it currently operates, and we will tell you plainly what is established and what is not.";

export type EvidenceItem = {
  readonly n: string;
  readonly requirement: string;
  /** Seven domains of proof, so seven marks rather than one repeated. */
  readonly icon: IconName;
};

export const evidence: readonly EvidenceItem[] = [
  {
    n: "01",
    requirement:
      "Clinical effectiveness against a comparator in current Kenyan practice",
    icon: "clinicalEffectiveness",
  },
  {
    n: "02",
    requirement: "Safety profile and adverse-event data",
    icon: "safety",
  },
  {
    n: "03",
    requirement:
      "Incremental cost-effectiveness analysis with local cost inputs",
    icon: "costEffectiveness",
  },
  {
    n: "04",
    requirement: "Budget-impact model against the relevant fund",
    icon: "budgetImpact",
  },
  {
    n: "05",
    requirement: "Local epidemiological and disease-burden data",
    icon: "epidemiology",
  },
  { n: "06", requirement: "Equity and access considerations", icon: "equity" },
  {
    n: "07",
    requirement: "Implementation feasibility within existing service delivery",
    icon: "implementation",
  },
];

export type Phase = {
  readonly n: string;
  readonly name: string;
  readonly description: string;
  readonly deliverable?: string;
  readonly icon: IconName;
};

export const phases: readonly Phase[] = [
  {
    n: "Phase 1",
    name: "Feasibility assessment",
    icon: "feasibility",
    description:
      "We review the evidence you have and identify what is still needed before a submission can be considered.",
    deliverable:
      "Deliverable: a feasibility opinion and evidence gap register.",
  },
  {
    n: "Phase 2",
    name: "Evidence generation",
    icon: "evidenceGeneration",
    description:
      "We agree the comparator, build the model and source the local data needed to close the evidence gaps.",
    deliverable: "Deliverable: a completed economic model and dossier draft.",
  },
  {
    n: "Phase 3",
    name: "Engagement",
    icon: "engagement",
    description:
      "We help you prepare the dossier and support the agreed discussions and submission process.",
    deliverable: "Deliverable: a final dossier and an engagement record.",
  },
  {
    n: "Phase 4",
    name: "Follow-through",
    icon: "followThrough",
    description:
      "We help you answer questions and keep the evidence in order while the review continues.",
  },
];
