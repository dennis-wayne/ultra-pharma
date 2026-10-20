# Design source of truth

## Current refinement, 20 October 2026

The current user brief and `REVAMP_PLAN.md` supersede historical canvas decisions
where they conflict. Pills, rounded panels, tinted neutrals and rich motion stay.
The hero image is no longer rendered. Its place is taken by the real four-stage
pathway, presented as an animated layered document. Selective concept icons remain
on the six practice entries and a few service/principle/editorial surfaces; repeated
row icons and oversized watermarks are removed. Article cover blocks are removed
entirely, with category, title, summary and publication details carrying the card.
Service stages and the six practice entries now use asymmetric bento compositions.
Headings use context-specific widths; the hero groups its two statements explicitly.
Buttons retain 44px targets with tighter type and padding. Native scrolling uses
cached section geometry, a shared entrance observer and no scroll-time blur.

Only verified team records render publicly. Demo people remain as private content
fixtures. BPTAP procedural wording was revised after checking its published
intervention-proposal channel; proposing an intervention is not a promised listing
or funding decision. Detailed evidence and remaining operational gates are recorded
under `docs/revamp/`.

The implementation follows the Claude Design canvas:

- Project: `Ultrapharma Website Revamp` (`7c529bad-62f9-4fdc-a034-1d8c62ce0ddb`)
- File: `Ultra Pharma.dc.html`

The canvas is the authority on visual decisions. `ultrapharma-docs/` remains the
authority on copy, facts and information architecture.

## Where the canvas overrides the dossier docs

Recorded so the difference reads as a decision rather than a mistake.

| Concern | `03-design-system-dossier.md` | Canvas (implemented) |
|---|---|---|
| Display face | Newsreader 300/400 | Source Serif 4, weight 500 |
| Button radius | `--r-md` 4px | 999px pill |
| Panel radius | `--r-md` 4px | 18 to 20px |
| Input radius | `--r-sm` 2px | 10px |
| Card elevation | 1px rule, never a shadow | `--shadow-card` on team, service and form panels |
| Photo treatment | Build-time grade, no CSS filters | `--photo-grade` CSS filter |
| Theme image variants | Two graded variants per image | One asset, one filter, both themes |
| Index rail side | Left of viewport | Right of viewport |

Everything else, including the palette, the three-token stamp rule, the type
scale, the section numbering and the 16px body floor, matches the docs.

## Image slots

The canvas ships `<image-slot>` placeholders carrying a category brief, for
example `P1 · FACILITY — wide shot, sterile filling line or QC laboratory,
unposed, 16:9`. Images dropped into the canvas could not be exported: the design
API caps file reads at 256 KiB and `.image-slots.state.json` returned truncated.

Every slot is therefore filled from Unsplash against its own brief and the six
selection criteria in `04 §6`. All sources live in `content/media.ts`. To swap in
the firm's own photography, replace the `src` in that one file. The hero is the
one exception: it uses a supplied local asset, `public/hero-bg.jpg`, rather than
an Unsplash source.

## Round two: the refinement pass

After the initial build, a second implementation pass (a separate front-end
agent, then a review and fix pass) took the site further from the written docs
in ways worth recording as decisions rather than drift. Some were confirmed
directly with the client; the rest are objectively-scoped fixes (accessibility,
structural HTML, unverifiable copy) rather than taste calls, so they are noted
here rather than re-litigated.

| Concern | Docs said | Shipped, and why |
|---|---|---|
| Signature element | `--t-numeral` mono numeral is "the system's most distinctive typographic move," appearing only on `PathwayRail` and `NumberedEntry` | Both components are icon-led instead: a Phosphor duotone icon in place of the numeral. Confirmed directly with the client after flagging the change explicitly — the icon treatment stays. `--t-numeral` and `--numeral` remain in the token set (still used for `FigureBlock`-style standalone figures) but no longer anchor the two signature components |
| Icon weight | Phosphor "regular weight... no filled variants mixed with regular ones" | Three weights in deliberate, consistent roles: **duotone** for large decorative badge and background-watermark icons, **bold** for small inline utility icons (arrows, close, check), **regular** elsewhere. Not mixed at random — each role is fixed |
| UI font | Inter Tight | Nunito |
| Button and card elevation | "Panels and cards use a 1px `--rule-strong`, never a shadow"; hover is "border shift... no lift" | Cards (team, service, insight, phase) carry `--shadow-card`/`--shadow-xs` and lift 1px on hover. The hero header controls additionally use `backdrop-filter: blur(...)` on their pill nav and mobile drawer — the one deliberate use of glass in the system, scoped to the transparent-header-over-hero-photograph state only, never elsewhere |
| Header behaviour | Implied static/sticky per `03 §7` Tier 2 listing | `position: fixed`, transparent with white text over the homepage hero, opaque on scroll and on every other route, hides on scroll-down and reappears on scroll-up (GSAP + ScrollTrigger). Pages must clear its height with top padding since it no longer occupies flow |
| Motion recipe | `03 §5`: opacity plus a 16px rise, nothing else specified | Extended: an 8px blur-to-focus is layered onto every reveal; icon and rail-marker pop-ins use `back.out` overshoot easing; the reimbursement feature band's image and copy slide in from opposite sides; the two hero CTAs carry a small pointer-magnetic pull on desktop. Still no parallax, no scroll-jacking, no counting-up figures |
| Team and Proof block | `04 §8`: real photographs only, or the typographic-initials fallback; "stock portraits are a lie" | Client's own instruction, given directly during this build: ship named individuals, credentials and Unsplash portraits as **demo data for a presentation**, explicitly to be replaced before the site is real. `content/team.ts` carries this as fabricated names and fake LinkedIn links, not verified people. **This is the one item in this table that is not production-ready and must not go live to a real audience unswapped** |
| `/contact` page copy | `05 §5` | Rewritten with more detail (NDA availability, a named-lead promise, a three-step onboarding strip). Kept where it stayed inside what is checkable; an early draft asserted "senior regulatory pharmacists" and an active "NDA Protected" status and a specialist bench that the firm has not confirmed — corrected to state these as things that happen for an enquiry (a confidentiality agreement is available, a named lead is assigned) rather than as existing credentials or infrastructure |

### Fixed during the review pass, not decisions

Objective defects, corrected rather than logged as taste:

- `/insights` and `/insights/[slug]` each nested a second `<main>` inside the one `layout.tsx` already provides. Changed to a plain `<div>`.
- `.icon-btn`'s hit area had shrunk under the 44px touch-target minimum during a sizing pass. The visual box is unchanged; the invisible `::after` hit-area extension was widened to restore 44px.
- `font-semibold` (600) had crept into eyebrow labels across most pages, over the stated 500 ceiling. Normalised to `font-medium`.
- The reimbursement page's fact list (gazette number, dates, chair, secretariat) rendered in body type instead of `--t-data`. Corrected.
- The hero image's declared dimensions (2400×1600) didn't match the asset's real dimensions (4252×3145); corrected so `sizes`-based responsive selection works from accurate metadata.
- An unused `media.divider` entry (superseded when the homepage divider was changed to reuse the hero photograph) still surfaced on the `/legal/terms` photo-credits list, crediting an image no longer shown anywhere. Removed.
- The reimbursement "how we work" lede described the process ending in formal panel "submission and defense," implying a specific confirmed procedural step beyond what `01 §4` verifies. Softened to "submission and the review process that follows."

## Round three: the imagery pass

The client asked for the stock photography to come out. `04 §1` already
anticipated the failure mode ("the reflexive fix, dropping a stock photograph
into every section, produces something worse") and `04 §8` already prescribed
the typographic fallback for portraits, so this is the documented position
rather than a reversal of it.

Ten of the eleven photographs are gone. What replaced them is not an absence:
each slot is now **drawn** in the design system's own vocabulary, at the same
geometry and visual weight the photograph held, so the page proportions the
canvas set are unchanged.

| Slot | Was | Is |
|---|---|---|
| Homepage hero | `public/hero-bg.jpg`, the firm's own asset | Unchanged. The one photograph on the site |
| Homepage full-bleed divider | The hero asset, reused | Unchanged. The single photographic breath in a long page |
| Homepage reimbursement band | P3 care, capsules | `FundsDiagram`: the three SHA funds as a ruled diagram, per the `04 §10` exception |
| Homepage services, four stage cards | P1/P4/P3/P5 thumbnails, 3:2 | `FigurePlate` at 5:2, carrying the stage index and the stage's own question |
| Homepage and `/insights` article cards | P2 document thumbnails | `InsightPlate`: one drawn cover per category, icon and ruling fixed per category |
| `/insights/[slug]` lead image | P2 document, 16:9 | Removed. It illustrated nothing specific, which `04 §1` says is grounds for removal |
| `/practice` office | P4 place, stock office interior | `FigurePlate`: the five CTD modules as a dossier index |
| `/contact` location | P4 place, Nairobi skyline | `FigurePlate`: a graticule field, the pin, and the city coordinate |
| `/services/reimbursement` | P3 care, consultation | `FigurePlate`: the access chain, Registered to Assessed to Listed to Funded |
| Proof block portraits | Unsplash portraits of strangers | The monogram treatment `04 §8` asked for in the first place |

### The plate

`components/content/figure-plate.tsx`. A plate is a ruled ground, one Phosphor
duotone icon at watermark weight, and mono and display type. Four fields, one
per job, so no page repeats a ruling twice in a row: `grid` for anything
structural, `ledger` for anything documentary, `graticule` for place, `hatch`
for texture. Every value in it is a token, so both themes come from one
definition and there is no second asset to grade.

Two consequences worth recording:

- **The aspect is a class, not an inline style.** The motion layer clears
  inline styles on `[data-media-in]` for a visitor with reduced motion set, and
  a plate has no intrinsic size to fall back on the way an image does.
- **No image on the site is remote any more.** The Unsplash entry in
  `next.config.ts` `images.remotePatterns` is gone, so a stock URL cannot
  quietly return. The photography credits block on `/legal/terms` renders from
  `photoCredits` and does not render at all while there is no third-party
  photograph to credit, which is the state the site ships in.

### Default theme

`defaultTheme="light"`, `enableSystem={false}` in `app/layout.tsx`. The palette
and the plates are authored light-first, so a first visit lands on light
whatever the operating system is set to. Dark remains a deliberate choice made
with the toggle, and is remembered from then on.

### What this closes, and what it does not

Closes: the highest-priority pre-launch item in the round-two table. There are
no fabricated portraits on the site.

Does not close: `content/team.ts` still carries four fabricated names,
credentials and LinkedIn links as demo data for a presentation. **That must
still be replaced with real people before the site reaches a real audience.**

## Round four: the icon system, and a real name

### The monotony was structural, not decorative

The client's read was right: the site looked like five icons repeated. The
cause was not laziness at the call sites, it was that `04 §9`'s rule, one icon
per labelled thing, had nowhere to live. Marks were imported ad hoc, page by
page, and the four pathway marks were the ones everyone reached for. `SealCheck`
appeared eight times across four meanings; `Scales` nine, including on an
article cover and on a diagram about money.

The fix is `lib/icons.ts`, a registry of **60 concepts**, each bound to exactly
one Phosphor icon, plus `components/primitives/mark.tsx` to render one by name.

| Family | Concepts | What changed |
|---|---|---|
| Pathway | 4 | Unchanged, but now they label a stage and nothing else, anywhere |
| Capabilities | 13 | New. Every deliverable and every service has its own mark, shared between the homepage and `/services` where they are the same thing |
| Editorial covers | 4 | New family, deliberately not the pathway marks |
| Plates and diagrams | 4 | The funds diagram takes coins, not the reimbursement scales; the access chain takes a flow arrow |
| Principles and commitments | 7 | New. Replaces three identical ticks and two borrowed pathway marks |
| Phases | 4 | Moved from a positional array into the content model |
| Evidence | 7 | New. Seven domains of proof, seven marks |
| Why-entries | 6 | Unchanged, already distinct |
| Process, channels, metadata | 11 | `confidentiality` and `namedLead` are each shared by the two surfaces that make the same promise |

**Consistency across surfaces is the opposite of monotony within one.** A
concept that appears on three pages carries the same mark on all three, which
is why `htaDossier` is identical on the homepage rail, on `/services` and on
the reimbursement page. What changed is that a *different* concept no longer
borrows a mark that already means something else.

### The rule is now enforced rather than remembered

`npm run lint:icons` fails the build when one icon is bound to two concepts,
and when any page or component imports a Phosphor icon directly instead of
going through the registry. Controls and state glyphs are exempt by name:
arrows, the menu and close glyphs, the spinner, the theme toggle, and the check
and warning marks repeat on purpose, and the uniqueness rule would be actively
wrong for them.

The guard is what makes this durable. Without it the registry is a convention,
and conventions decay silently.

### James Kamindo

`content/team.ts` now carries one real person: the firm's own point of contact,
with the role and the published email from the contact page and **no invented
credentials**. `TeamMember.verified` marks the entry, and a card with a name but
no credentials now renders none rather than announcing a gap.

**The other three cards remain fabricated demo data**, kept at the client's
instruction. They now sit beside a real named person, which raises rather than
lowers the stakes: a reader has no way to tell which of the four are real. This
stays the last blocking item before the site meets a real audience.

### Fixed in passing

- The phase card fallback row rendered in italics, against the standing "weight
  400 and 500 only, no italics" rule. Normalised.
- The contact form's success state used `SealCheck`, the Approval mark. A sent
  enquiry is a confirmed state, not a regulatory approval; it now uses the check
  mark, and the send button uses a send glyph rather than the generic arrow.
