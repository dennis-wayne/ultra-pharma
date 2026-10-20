# Baseline audit and conflict register

Audited 20 October 2026 against `1c7c2ee9d1570e168023a0e6bbada0c97bde37ad` from [dennis-wayne/ultra-pharma](https://github.com/dennis-wayne/ultra-pharma). Source audit plus focused browser baseline on Home, Reimbursement and Contact, recorded in SETUP.md. No Lighthouse/accessibility scores or regulatory fact validation are claimed.

## What already exists and should survive

- Next.js 15 App Router, React 19, strict TypeScript, Tailwind v4, MDX, Phosphor, GSAP and next-themes.
- Eight static content pages, four MDX article URLs, a not-found component, `/about` redirect and SMTP contact API.
- Light default and explicit remembered dark choice.
- Pill navigation, rounded panels, tinted neutrals, extensive GSAP motion, concept icon registry and meaningful drawn plates. The user explicitly protected these during this planning session.
- Four pathway stages, ten detailed services, six why-entries, contact channels, actual legal pages, metadata/schema helpers and a local abstract hero image.
- Form value retention after failure, second-failure email fallback and reset after success.
- Empty case notes and empty third-party photo credits already avoid fabricated content.

## Findings

Severity is implementation priority, not a quantified risk score. Source-level findings are distinguished from behavior that still needs browser confirmation.

| ID | Priority | Evidence | Finding and planned treatment |
|---|---|---|---|
| A01 | Launch blocker | `content/team.ts`; homepage and Practice map all team records | One verified contact and three expressly fabricated demo people/credentials render together. Resolve real data or explicitly exclude demos from public output before launch; retain the team UI. |
| A02 | High | `app/globals.css` body, `.t-body`, `.t-body-sm`, `.t-data`; `README.md` | Actual body is 15px and secondary body/data often 14px despite the documented 16px floor. Refine readable typography and exceptions. |
| A03 | High | `app/contact/page.tsx`, `app/not-found.tsx`, header and other routes; `@theme inline` | Utilities including `text-ink-600`, `bg-ink-950`, `text-stamp-800/300/400` reference values absent from the defined theme. Audit all occurrences and map to valid semantic roles. |
| A04 | High | `app/layout.tsx` ThemeProvider; `globals.css`; `dark:` class usage | Theme choice is a `data-theme` attribute, but no matching Tailwind custom dark variant is declared. Check OS/app-theme divergence and implement consistent variant behavior. |
| A05 | Medium | `site-header.tsx` `pathname.startsWith(href)`; browser desktop reimbursement | Confirmed both Services and Reimbursement have `aria-current="page"`. Preserve pills; resolve the most specific active destination. |
| A06 | High | `site-header.tsx` mobile effects/rendering | Drawer has outside/Escape/resize handling but no explicit modal/disclosure focus contract or reduced-motion branch around its timelines. Choose the proper accessible behavior, preserve rounded animated presentation, verify on keyboard/touch. |
| A07 | High | `index-rail.tsx` | Clickable index links are `aria-hidden` and `tabIndex=-1`. It is useful navigation visually but unavailable to keyboard/assistive users. Name and expose navigation correctly while avoiding redundant announcements. |
| A08 | Medium | `index-rail.tsx` | Comment promises a mobile progress bar; JSX renders only a hidden-below-lg desktop rail. Reconcile the documented fallback with actual implementation rather than claiming it exists. |
| A09 | Medium | `app/insights/page.tsx` | "Category Quick Filter" is a comment describing plain spans. No filtering exists. Refine as clearly descriptive topics; real filtering is an optional later enhancement. |
| A10 | Medium | `app/insights/[slug]/page.tsx` | Same jurisdiction/authority sidebar strings are applied to every topic. Model per-article metadata and verify relevance, without inventing sources. |
| A11 | Launch gate | `content/insights.ts` comment and hardcoded dates; MDX content | Editorial is explicitly described as demo. Source accuracy, dates, author/editor approval and maintenance are not established by a successful build. |
| A12 | High | `app/api/contact/route.ts` | `request.json()` is outside try/catch. Validator asserts a full Payload but checks only three strings; malformed optional values can reach downstream formatting. No email format, field length, need allowlist or request-size checks are visible. Preserve contract and harden boundaries. |
| A13 | High | Same API; README Environment | SMTP credentials are external. No `.env.example` exists at baseline despite README instructions. Delivery and operational readiness are unverified. Add a safe template and document isolated testing. |
| A14 | Medium | `contact-form.tsx` sent/error states and Field | Native required/email validation exists, but there is no full field-error association/summary or explicit success focus contract. Refine all feedback states and preserve values. |
| A15 | High | `app/layout.tsx` prepaint script; motion provider; hidden CSS states | Content visibility depends partly on animation setup after `motion-ready` is added. Test failed JS/GSAP, route changes and reduced motion, and guarantee readable fallback. This is a test risk, not an observed blank-page reproduction. |
| A16 | Medium | `globals.css`, page-level utilities and inline hero styles | Teal watermarks, halos, badges, metadata and link hover effects compete with CTA emphasis. Preserve visual identity and motion; quiet inactive accents and unify component roles. |
| A17 | Medium | `app/layout.tsx` font weights; route `font-light` uses | 300/600/700 weights load despite 400/500 standing rule; many page paragraphs use font-light. Reconcile actual usage and font payload without changing families. |
| A18 | Medium | `README.md`, route source files | README says no hardcoded page copy and lists `npm run storybook`; route-local strings exist and package.json has no Storybook script. Correct setup docs and move repeated content only where useful. |
| A19 | High | `package.json`, `scripts/check-*.ts`, absent CI/test configs | Custom guards are independent commands; build does not automatically run them. No committed browser/a11y/Lighthouse/Storybook infrastructure found. Historic docs describe desired gates, not completed checks. |
| A20 | Review gate | `content/site.ts`, `content/legal.ts`, Contact and Practice | Response time, hours, retention/deletion, NDA process, qualifications and access/representation claims need operator confirmation. Preserve current claims in the plan; do not treat their existence in source as verification. |
| A21 | Medium | `public/hero-bg.jpg`, `content/media.ts` | Hero source JPEG is 2,585,318 bytes with metadata declaring 4252x3145. Next image optimization is configured; actual delivered bytes need measuring. Supplied/local is not proof of photographic provenance or depicted operations. |
| A22 | Medium | `next.config.ts`, old build guide, production HTTP smoke check | Confirmed /about responds 308 with Location /practice, while original guide calls for 301. Preserve the permanent redirect intent and test actual behavior rather than claiming 301. |
| A23 | High | Browser Home, light mode | At 1440px viewport the document/body width measured 1454px; at 390px the document width measured 422px. Horizontal overflow is reproduced, not just suspected. Trace the overflowing elements and correct grid minimums/positioning without hiding content with a blanket overflow rule. |
| A24 | Medium | Browser Home hero; `content/media.ts` | The image is abstract artwork, while alt text describes laboratory/regulatory operations. Preserve the artwork and correct its alternative text/decorative role; do not replace it with an unrequested generic photo. |

## Document conflicts to resolve explicitly

| Historical material | Current evidence / instruction | Resolution |
|---|---|---|
| Old flat/sharp dossier controls | Canvas log intentionally changed to pills/rounded/shadows; user now explicitly retains them | Preserve and refine current geometry/elevation |
| Old photo sourcing/build-time grading | Later log removes stock photos and uses one local hero plus drawn plates | Keep current no-generic-photo approach; measure current image delivery |
| Old restrained reveal-only motion | Later log and source add blur, overshoot, magnetism, header/drawer choreography; user protects extensive animation | Preserve repertoire, improve consistency, fallbacks and performance |
| Original numeral-led signature | Later recorded client decision uses icon-led pathway and entries | Keep concept icons; refine rather than restore unrequested numerals |
| Body 16px / weight ceiling 500 | CSS and loaded/used fonts drift | Fix in refinement, preserving font families |
| "Seven routes" / article work conditional | Current code has twelve content URLs and articles already built | Inventory executable routes; preserve current content scope |
| Historical "facts verified" language | Dates/procedures may have changed; not reverified in this planning pass | Add source/date/owner ledger and official-source review before publication |

## Interpretation limits

This plan does not assert that a current legal/regulatory process exists, that the hero depicts an owned facility, or that any existing performance/a11y target passes. Source findings identify specific code and content to verify. Browser screenshots and baseline command results belong in SETUP.md; production approval requires the execution plan's separate evidence gates.
