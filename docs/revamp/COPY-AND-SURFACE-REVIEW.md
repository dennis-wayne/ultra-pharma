# Copy and surface refinement — 21 October 2026

## Humanizer review

The review covered the homepage, services, reimbursement, practice, contact, insights index and all four articles. Legal wording and factual publication dates were retained. Technical names remain where they help a client understand the work.

Representative draft: "We support your regulatory journey through registration and evidence-led market access."

Anti-AI audit: "journey" and "evidence-led" are abstract; the sentence leaves the reader unsure what to ask for. Repeated "from ... to ..." headings also made unrelated sections sound interchangeable. Claims about shorter review cycles overstated what a consultant controls.

Final hero copy: "We help you prepare for Pharmacy and Poisons Board registration and make the case for funded access. Tell us about your product and the question you need to answer."

Final section headings include "Where does your product go next?", "Help with the work ahead", "What working with us looks like" and "How we work". Service descriptions now identify what the team does and what the client receives. Reading estimates match the current article lengths. The PPB article distinguishes applicant preparation from the authority's review and decision.

## Design decisions

- The headline uses the width of its own column, preventing intrusion into the artwork. The original precision/confidence signature has aligned serif keywords and quieter explanatory text.
- The four document sheets have wider margins, a gentler perspective, a separated header, and labels tied to each discipline. Hover and keyboard focus select a sheet; all four destinations remain direct links.
- Practice uses a layered submission dossier with the five actual CTD modules. Reimbursement shows two distinct evidence documents. The SHA funds diagram uses a connected list with readable HTML content.
- Page headers, section introductions, service outputs and card interiors use a consistent spacing rhythm. Editorial article titles retain serif distinction; navigation and explanatory headings use the UI family.
- Article cards are text-led with no reserved image cover. Buttons remain at least 44px high; the native scrollbar has a slim visible thumb. The section rail is hidden before it can overlap content at narrower desktop sizes.
- Illustration motion is finite and uses transform/opacity. Reduced-motion preferences bypass enhancements. No continuous artwork loop or scroll-time artwork measurement was added.

## Verification

- TypeScript, ESLint, string guard and icon guard passed.
- 24 axe checks: all 12 public pages at desktop/light and 390px/dark. Zero reported violations, zero incomplete checks, no horizontal document overflow. Results: verification/final-accessibility.json.
- Decorative SVGs are excluded from axe's automated contrast analysis. Hero labels were checked separately using actual palette values and composited opacity: minimum ratio 5.95:1. Their rendered bounds fit within their sheet bounds. Supporting labels use the same opaque ink tokens against raised paper.
- Accessibility scans now run only with UI_AUDIT=1 in development and an explicit ?audit query. Normal preview navigation does not trigger repeated audits.
- Production build and HTTP route verification are recorded in the release note after completion. Automated checks do not establish field performance or replace final business review of legal and regulatory copy.
