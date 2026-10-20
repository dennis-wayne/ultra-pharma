# UI refinement specification

Implemented 20 October 2026. The current user brief takes precedence over historical canvas and dossier decisions. See [IMPLEMENTATION.md](IMPLEMENTATION.md) for evidence and open launch gates.

## Character

Preserve the floating pill navigation, rounded panels, softly tinted neutrals, serif display type and rich animation. The visual reference is the regulated product dossier: structured stages, evidence, clear decisions and useful documentation. Photography, generic hero artwork, article cover blocks and oversized icon watermarks are not rendered. Diagrams show actual information. Icons remain selective, semantically distinct and subordinate to the copy.

## Palette and type

| Role | Light value | Purpose |
|---|---|---|
| Paper | #FBFBFA | Main ground |
| Raised | #FFFFFF | Cards and controls |
| Sunk | #F1F2F1 | Quiet inset/feature surfaces |
| Primary ink | #151B1A | Headings and main copy |
| Secondary ink | #414A48 / #626D69 | Body and metadata |
| Teal | #0F6E5C / #0B5546 | Primary action and restrained accent text |

Dark mode uses #101615, #18201E and #0C1110 surfaces, #F3F5F3 primary ink and lifted secondary/teal tokens. Explicit app theme selection drives Tailwind's dark variant. A first visit defaults to light; stored choice survives navigation.

Source Serif 4 carries headlines, Nunito carries body/UI text, and IBM Plex Mono carries genuine stage/reference metadata. Only 400/500 weights and normal style are loaded. Body and form text starts at 16px; concise labels/date metadata may be smaller.

Heading widths respond to their content and context. The hero groups its two statements in separate spans, each allowed up to 24ch, rather than applying a narrow cap to the entire headline. The hero stacks through tablet width and uses a responsive 38-70px scale. Shared page headings allow 26ch; homepage section headings have individual 24/25/28ch limits. Balanced wrapping prevents stranded words without forced line breaks across every viewport.

## Composition and surfaces

The shell is capped at 1248px with 20px mobile gutters. Reading columns remain narrower than the site shell. Panels use quiet borders and elevation, typically 24-28px radii, with smaller 12-16px inner control/mark radii. Controls and navigation remain pill-shaped.

The service bento alternates 7/5 and 5/7 desktop spans. Wide cards split explanation from deliverables. The reimbursement card has a neutral inset tone. At intermediate widths the cards become two columns, then one on mobile. Every stage retains its description, deliverables and destination.

The practice bento uses a 7/5 feature row, three supporting cards, and a horizontal knowledge-transfer strip. The submissions card receives a larger consequence statement. Rapid response has a graphite surface; other panels alternate raised and sunk neutrals. All six entries retain their heading, explanation and consequence. Small concept marks add visual diversity without repeating icons on every row.

Article cards begin with category and a small topic mark, followed directly by title and summary. Date/reading time and the reading affordance sit below. The featured article uses an editorial text split, with no decorative cover area or reserved image space.

## Controls and navigation

Buttons use 14px type, 10px/20px padding and a 44px minimum target. Small header buttons use 9px/17px padding. Pills have thinner visual mass through tight 4px/10px padding; static status tags are not controls. Navigation retains 44px link targets inside a lightly bordered pill. Icon controls remain 44px.

The header's current destination uses the most specific matching route. The mobile Radix dialog has a visible title, trapped focus, Escape dismissal and trigger focus return. Header visibility never hides focused controls. The section rail uses named links and an active-location state; small screens have a real reading-progress line.

The enquiry form has visible labels, optional indicators, autocomplete, field errors, an error summary, retained values after delivery failures, guarded pending state, timeouts, a second-failure direct-email fallback, honest SMTP acceptance wording and a reset that restores first-field focus.

## Motion and smooth scrolling

Use native scrolling and smooth in-page anchors. No wheel interception, synthetic scroller or scroll-linked blur is used. Hero choreography, staged entrances, split-band entry, diagram draws, small icon pops, panel hover, bounded pointer magnetism and the drawer transition preserve the requested motion character.

One IntersectionObserver per page starts finite transform/opacity entrances. Animation contexts, observers and listeners clean up on route changes. Reduced motion bypasses the entrance setup and disables positional CSS transitions/smooth scrolling. Content is visible by default if motion JavaScript fails. Focus immediately settles unfinished reveal ancestors.

Section geometry is cached on resize/content-size changes rather than measured for every scroll frame. Progress updates are scheduled with requestAnimationFrame; React updates only when the active section changes. Header motion starts only on a visibility change, with accumulated direction travel to support slow trackpad scrolling. Static header/nav fills avoid continuous backdrop compositing; the drawer scrim retains a modest blur only while open. Pointer magnetism reuses quickTo tweens and measures its target on pointer entry.

## Integrity and acceptance

All existing public routes, four product stages, six practice entries and four article bodies remain. Unverified demo team identities are excluded from public rendering. No metrics, case studies, map coordinates or qualifications were invented to fill panels. Procedural wording distinguishes an intervention proposal from a guaranteed assessment/listing outcome and links official sources.

Automated scans are evidence, not a conformance certificate. Read the implementation record for the exact route/theme/width coverage, local SMTP tests and unresolved performance/operational acceptance. Preserve the current functional baseline when extending the design.
