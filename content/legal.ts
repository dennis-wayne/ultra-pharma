import { site } from "./site";

export type LegalPage = {
  readonly slug: "privacy" | "terms";
  readonly crumb: string;
  readonly title: string;
  readonly description: string;
  readonly body: readonly string[];
};

export const privacy: LegalPage = {
  slug: "privacy",
  crumb: "Ultra Pharma / Legal / Privacy notice",
  title: "Privacy notice",
  description:
    "What Ultra Pharma collects through this website, how long it is kept, and your rights under the Data Protection Act 2019.",
  body: [
    "Ultra Pharma collects a small amount of personal information through this website. When you send an enquiry, we keep your name, organisation, contact details and message so that we can reply. We keep it for twelve months and then delete it.",
    "We do not sell your information, we do not track you across the internet, and we do not use advertising.",
    `Under the Data Protection Act 2019 you may ask us what we hold about you, ask us to correct it, or ask us to delete it. Contact ${site.email}.`,
  ],
};

export const terms: LegalPage = {
  slug: "terms",
  crumb: "Ultra Pharma / Legal / Terms",
  title: "Terms",
  description:
    "Terms governing use of this website and the professional services described on it.",
  body: [
    "These terms govern the use of this website and the professional services described on it. Nothing on this site is regulatory, legal or medical advice, and no client relationship is created until an engagement letter is signed by both parties.",
    "Service descriptions set out what we do rather than what any authority will decide. Regulatory and health technology assessment outcomes are determined by the relevant authority, and we do not promise a determination, a timeline or an inclusion decision.",
    "Content on this site is owned by Ultra Pharma unless stated otherwise.",
  ],
};
