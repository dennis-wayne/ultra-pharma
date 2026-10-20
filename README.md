# Ultra Pharma

Regulatory affairs and health technology assessment consultancy, Nairobi.
`ultrapharma.co.ke`

Next.js 15 App Router, TypeScript strict, Tailwind v4 CSS-first, Phosphor
Icons, GSAP, MDX.

## Design source

The current refinement brief and execution plan are in [REVAMP_PLAN.md](REVAMP_PLAN.md).
It preserves the pill navigation, rounded panels, tinted neutrals and extensive
animation while refining the UI across every route. The baseline audit,
component specification and setup record are linked from that plan. Current changes,
validation evidence and launch dependencies are in [the implementation record](docs/revamp/IMPLEMENTATION.md).

The current implementation follows the refinement brief in `REVAMP_PLAN.md`.
`DESIGN-SOURCE.md` records historical decisions and the current changes. The older
`ultrapharma-docs/` dossier remains useful for content provenance; it is not proof
that a historical fact or an operational commitment is still current.

## Commands

```bash
npm run dev            # development server
npm run build          # production build
npm run typecheck      # tsc --noEmit
npm run lint           # eslint
npm run lint:strings   # BPTAP naming, deleted claims, dead links, em dashes
npm run lint:icons     # one icon per labelled thing, enforced
npm test              # enquiry validation and API boundary tests
npm run audit:prepare # optional local axe instrumentation
```

`lint:strings` is the guard that matters most. It fails on the two incorrect
forms of the BPTAP name, on every unverifiable claim deleted in `05 §9`, on
`href="#"`, on em dashes and on emoji.

`lint:icons` is the second. Every icon that labels something is bound to one
concept in `lib/icons.ts` and rendered with `<Mark name="..." />`. The check
fails if two concepts share an icon, or if a page imports a Phosphor icon
directly. Controls and state glyphs (arrows, menu, spinner, check, warning) are
exempt: they repeat on purpose.

## Layout

```
app/          routes. One page per route, content imported not inlined
components/
  primitives/ button, theme toggle, reveal, json-ld, mark
  structure/  header, footer, section, index rail, logo
  content/    pathway rail, numbered entry, evidence list, team card, figures
  forms/      contact form
  motion/     the GSAP layer
content/      every string and image reference, typed
  insights/   MDX articles
lib/          schema, motion tokens, icon registry, utils
scripts/      check-strings
```

## Content

Most shared copy lives in `content/`; some route-specific strings remain in page
components. Check both when reviewing copy. There is no Storybook command in the
current package scripts.

- `content/site.ts` navigation, contact channels, footer
- `content/media.ts` legacy media inventory; no photography is currently rendered
- `content/pathway.ts` the four stages
- `content/entries.ts` the six numbered entries
- `content/services.ts` the services page
- `content/reimbursement.ts` the reimbursement page, facts verified against `01 §4`
- `content/team.ts` team and case notes. One verified entry, three demo
- `content/insights.ts` article index, with bodies in `content/insights/*.mdx`

## Standing rules

- The panel is the Benefits Package and Tariffs Advisory Panel. The build fails
  on either incorrect form.
- No claim ships that cannot be checked.
- The reimbursement service is evidence generation and structured engagement,
  not guaranteed filing or outcome.
- `--stamp-600` fills and rules, `--stamp-700` accent text, `--stamp-on` text on
  a stamp fill.
- No section renders an empty container.
- Weight 400 and 500 only, no italics.
- Body 16px minimum. `--t-label` and `--t-index` are the only exceptions.
- Every checkable fact, date and reference number in `--t-data`.

## Outstanding

Blocking items from `01 §7`, still with the client:

1. Confirm the enquiry inbox, SMTP configuration and actual retention/deletion process.
2. Confirm any additional team members, credentials and case outcomes. Only records
   explicitly marked verified render; presentation fixtures are excluded.
3. Review editorial publication dates, service commitments and legal copy with the operator.
4. Use city-level location until a publishable street address is provided.

BPTAP now publishes an intervention-proposal form. The service page and relevant
article link to the official source without promising a listing/funding outcome.

## Imagery

The site renders no generic photography, including in the hero. The hero uses the
actual four-stage product pathway. Articles lead with category, a small concept
mark, title, summary and publication details, with no reserved cover/image area.
Icons are selective: useful concept marks and functional controls, not oversized
watermarks or an icon on every text row. Archived image files are not rendered.

No image is loaded from a remote host, and `next.config.ts` allows none. To add
the firm's own photography, add an entry to `content/media.ts` and point a slot
at it.

Light is the default theme. Dark is a deliberate choice made with the toggle.

## Environment

Copy `.env.example` to `.env.local` and fill in the SMTP values for the contact
form.

For isolated local testing, `node scripts/dev-smtp.mjs` starts a loopback-only
SMTP sink on port 1025; `--reject` exercises delivery failure. It never relays mail.
Set `SMTP_HOST=127.0.0.1`, `SMTP_PORT=1025`, `SMTP_SECURE=false`,
`EMAIL_FROM=site@example.test` and `CONTACT_INBOX=sink@example.test` for that process.
The default UI renders without credentials and reports service unavailability
honestly. Never use production credentials for routine UI checks.

`npm run audit:prepare` generates ignored `public/__audit.js`. Start the dev server
with `UI_AUDIT=1` to collect local axe results in `#ui-audit-results`. The runner
temporarily settles reveal styles while scanning. It is not loaded in production.
