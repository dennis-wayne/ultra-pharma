/**
 * Demo editorial. Every regulatory fact below is drawn from the verified public
 * record in `01 §4`; nothing here asserts a firm outcome, client or credential.
 *
 * The section renders only at three or more pieces. `01 D-10`.
 */
export type Insight = {
  readonly slug: string;
  readonly title: string;
  readonly category: "Reimbursement" | "Policy" | "Approval" | "Market entry";
  readonly description: string;
  /** ISO. Rendered through --t-data because it is checkable. */
  readonly datePublished: string;
  readonly displayDate: string;
  readonly readingTime: string;
};

export const insights: readonly Insight[] = [
  {
    slug: "sha-benefits-package-registered-product",
    title: "What SHA coverage means for a registered product",
    category: "Reimbursement",
    description:
      "Coverage under the Social Health Authority flows through three funds. What that structure changes for a product that already holds Pharmacy and Poisons Board registration.",
    datePublished: "2026-02-10",
    displayDate: "10 February 2026",
    readingTime: "2 min read",
  },
  {
    slug: "reading-the-bptap-mandate",
    title: "What BPTAP assesses",
    category: "Policy",
    description:
      "The Benefits Package and Tariffs Advisory Panel was gazetted in April 2025. What its published mandate covers, and what it does not.",
    datePublished: "2026-01-22",
    displayDate: "22 January 2026",
    readingTime: "2 min read",
  },
  {
    slug: "what-drives-a-ppb-review-timeline",
    title: "Why a PPB review takes time",
    category: "Approval",
    description:
      "The file you submit and the way you answer queries affect the review. A practical look at what your team can prepare.",
    datePublished: "2025-12-04",
    displayDate: "4 December 2025",
    readingTime: "2 min read",
  },
  {
    slug: "eac-harmonisation-and-the-second-market",
    title: "Planning for your next East African market",
    category: "Market entry",
    description:
      "The East African Community medicines regulatory harmonisation framework reduces duplication across member states. What still has to be rebuilt per market.",
    datePublished: "2025-11-06",
    displayDate: "6 November 2025",
    readingTime: "2 min read",
  },
];

export function topicMark(category: Insight["category"]) {
  return {
    Reimbursement: "topicReimbursement",
    Policy: "topicPolicy",
    Approval: "topicApproval",
    "Market entry": "topicMarketEntry",
  }[category] as
    "topicReimbursement" | "topicPolicy" | "topicApproval" | "topicMarketEntry";
}

export function getInsight(slug: string): Insight | undefined {
  return insights.find((post) => post.slug === slug);
}
