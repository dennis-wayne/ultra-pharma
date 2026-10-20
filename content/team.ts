import { site } from "./site";

/**
 * Typographic fallback per `04 §8`. No stock portraits: an image of an
 * identifiable person implying they work here is a lie, and an honest gap reads
 * better than one. The demo portraits that shipped in the first build were
 * exactly that lie, and are gone; the monogram treatment stands in until the
 * firm supplies real photographs, which drop in through `avatar`. Add `name`,
 * `credentials` and `linkedin` as the firm supplies them and the cards render
 * them without further change.
 *
 * `verified` separates the one real entry from the rest. James Kamindo is the
 * firm's own point of contact and his card carries only what the contact page
 * already publishes: a name, a role and the published email. No credentials are
 * asserted for him, because none have been supplied and inventing them for a
 * real person is the failure this file exists to avoid.
 *
 * **The other three entries are demo data.** Fabricated names and credentials,
 * kept at the client's instruction for presentation, to be replaced with real
 * people before the site reaches a real audience.
 */
export type TeamMember = {
  readonly initials: string;
  readonly role: string;
  readonly name?: string;
  readonly credentials?: string;
  readonly linkedin?: string;
  readonly avatar?: string;
  /** A published address for this person. Rendered as a direct contact link. */
  readonly email?: string;
  /** True only where the person, role and contact detail are confirmed. */
  readonly verified?: boolean;
};

export const team: readonly TeamMember[] = [
  {
    initials: "JK",
    name: "James Kamindo",
    role: "Principal contact",
    email: site.email,
    verified: true,
  },
  {
    initials: "EO",
    name: "Eric Ochieng",
    role: "Quality and compliance",
    credentials: "Lead Auditor ISO 13485 · GMP Specialist",
    linkedin: "https://linkedin.com",
  },
  {
    initials: "AH",
    name: "Dr. Amina Hassan",
    role: "Health economics",
    credentials: "PhD Health Economics · BPTAP Advisory Expert",
    linkedin: "https://linkedin.com",
  },
  {
    initials: "DK",
    name: "David Kamau",
    role: "Market access lead",
    credentials: "MSc Global Health Policy · SHA Engagement",
    linkedin: "https://linkedin.com",
  },
];

/**
 * Anonymised outcomes. Empty until the firm supplies publishable ones, and the
 * section does not render while it is empty. `02 §8`.
 */
export type CaseNote = {
  readonly context: string;
  readonly action: string;
  readonly result: string;
};

export const caseNotes: readonly CaseNote[] = [];

/** Presentation fixtures never render as public staff identities. */
export const publicTeam = team.filter((member) => member.verified === true);
