/**
 * The six practice commitments. Copy is written for the person planning the work.
 */
export type EntryIcon =
  | "outcomes"
  | "rapidResponse"
  | "localReach"
  | "complianceByDesign"
  | "commercialModels"
  | "capacityTransfer";

export type Entry = {
  readonly n: string;
  readonly heading: string;
  readonly body: string;
  readonly why: string;
  readonly icon: EntryIcon;
};

export const entries: readonly Entry[] = [
  {
    n: "01",
    heading: "A dossier ready for review",
    body: "Before you submit, we check the dossier against the requirements, flag gaps and help your team close them.",
    why: "Clearer evidence when regulators assess the file.",
    icon: "outcomes",
  },
  {
    n: "02",
    heading: "Help when a filing cannot wait",
    body: "When a query, filing or inspection needs urgent attention, we bring together the team to deal with it.",
    why: "A clear response when timing matters.",
    icon: "rapidResponse",
  },
  {
    n: "03",
    heading: "Local knowledge, regional reach",
    body: "Each market has its own requirements. We adapt your dossier and work with local partners to address them.",
    why: "You know what needs to change for each market.",
    icon: "localReach",
  },
  {
    n: "04",
    heading: "Quality built into the work",
    body: "We put procedures and traceable records in place as the work develops, so your team can use them and prepare for inspection.",
    why: "Records your team can use and inspectors can follow.",
    icon: "complianceByDesign",
  },
  {
    n: "05",
    heading: "Terms that fit the project",
    body: "We can agree milestone fees, retainers or outcome-linked terms depending on the scope and risk of the work.",
    why: "An engagement structure that matches your priorities.",
    icon: "commercialModels",
  },
  {
    n: "06",
    heading: "Leave your team more capable",
    body: "We share the work through practical workshops, SOP handovers and mentoring, so your team can take more of it forward.",
    why: "Tools and knowledge your team can keep using.",
    icon: "capacityTransfer",
  },
];
