# Ultra Pharma: comprehensive UI refinement plan

Prepared 20 October 2026. Baseline: `1c7c2ee9d1570e168023a0e6bbada0c97bde37ad`.
Status: visual implementation complete; final production verification and external launch gates are recorded in [IMPLEMENTATION.md](docs/revamp/IMPLEMENTATION.md).

Latest execution instructions supersede the original preservation notes below: remove the hero image, retain selective concept iconography (including the six practice entries), and remove all article cover/image-placeholder areas. Preserve pills, rounded surfaces, neutral tints and rich motion.

## 1. The brief and scope

Refine the existing site into a polished, elegant production experience across every page and every component state. The dominant impression stays black, white and shades of gray, with subtle existing neutral tints and minimal teal.

**The user's latest clarification explicitly protects pill navigation, rounded panels, tinted neutrals and extensive animation.** Keep these characteristics. Improve their proportions, consistency, contrast, interaction quality and responsive execution. This is a comprehensive surface and component refinement, not a replacement of the site's visual identity or information architecture.

Preserve the tagline, logo assets, four-stage pathway, service coverage, six practice entries, Insights, enquiry form, contact channels, theme toggle, routes, deep links, metadata intent and existing content contracts. No generic stock pictures or generated imagery. Existing code is the functional baseline; existing styling is the starting point to refine.

Planning deliverables:

- [Baseline audit](docs/revamp/AUDIT.md): source evidence, conflicts and unresolved production issues.
- [Design and component specification](docs/revamp/DESIGN.md): visual constraints, tokens, component states and motion rules.
- [Local setup and verification record](docs/revamp/SETUP.md): reproducible commands and actual check results.
- This plan: complete page coverage, work sequence, quality gates and launch requirements.

## 2. Authority and decisions

Use this order for this refinement:

1. The user's current brief and subsequent clarification.
2. This execution pack for proposed refinement decisions; record any later change here.
3. Executable routes, content and behavior for the functional baseline.
4. `DESIGN-SOURCE.md` for prior intentional visual decisions, particularly protected pill/rounded/motion treatments.
5. `ultrapharma-docs/` for content provenance, factual cautions and original rationale. Historic recommendations are not evidence of implemented behavior or current regulatory accuracy.

| Concern | Decision for this pass |
|---|---|
| Pills and rounded geometry | Preserve; rationalize into a small role-based radius scale. Do not square off the site. |
| Tinted neutrals | Preserve the graphite/paper character, keeping tint subtle enough to read monochrome. No unrelated hues. |
| Extensive animation | Preserve the repertoire and richness; tune timing, hierarchy, cleanup, performance and reduced-motion behavior. No arbitrary motion stripping. |
| Header | Preserve the floating pill navigation, transparency over the hero, opaque scrolled state and hide/reveal behavior. Refine reliability and compactness. |
| Layout | Refine the existing section compositions and reading order. Do not merge/delete sections or routes as an unannounced simplification. |
| Themes | Preserve light default and remembered explicit dark choice. Refine both equally. |
| Typography | Retain Source Serif 4, Nunito and IBM Plex Mono; fix scale, measure and weight drift before considering a font change. |
| Icons and plates | Preserve concept assignments and drawn visual language; refine size, opacity, surrounding space and inactive color. |
| Imagery | No new generic pictures. Preserve the supplied abstract hero artwork; correct its misleading laboratory alt text. Confirm provenance before publication. |
| Content | Preserve service meaning and legal claims. Surface unverifiable claims for review; do not silently invent replacements. |

## 3. Success criteria

The result should feel like the same firm with much better execution. Visitors should quickly understand what Ultra Pharma does, which pathway stage is relevant, why the reimbursement service matters, and how to enquire. Pages should feel related without repeating every layout.

Acceptance requires all of the following:

- Pill navigation and rounded panels remain recognizable, with deliberate shared proportions.
- Teal directs attention rather than coloring every icon, title, badge and plate.
- Hierarchy works in grayscale: color is never the sole active/error/status signal.
- No generic imagery, fabricated proof, placeholder destinations or controls suggesting unavailable behavior.
- All routes, anchors, articles, themes and contact states have explicit coverage.
- Rich motion remains smooth and consistent; reduced motion and animation failure leave content readable.
- Mobile content fits without clipping, cramped contact rows, tiny form text or overlapping fixed chrome.
- Measured evidence supports accessibility, performance and release claims.

## 4. Complete route and behavior inventory

There are eight static content routes plus four current article URLs, giving twelve current public content URLs. Also cover the not-found experience, the legacy redirect, technical endpoints and form states. These counts describe the audited checkout, not a permanent limit.

| Route/surface | Existing purpose and content | Refinement work | Acceptance evidence |
|---|---|---|---|
| `/` | Hero, pathway, reimbursement band, services, image divider, six why-entries, people, insights, enquiry | Refine the current sequence, visual hierarchy, spacing, card density, icon scale and form presentation | Full-page light/dark desktop/mobile captures; every section and CTA exercised |
| `/services` | Four anchored stages and their service/deliverable lists | Align stage introductions, sticky columns, service labels, icon badges and output rows | All four `#stage-XX` links scroll correctly; content count preserved |
| `/services/reimbursement` | Context/facts, distinction, offering, evidence requirements, engagement phases, next step | Make the existing six sections easier to scan; refine diagrams, facts, lists and phase panels | Rail/anchor agreement, fact traceability, readable stacked diagrams |
| `/practice` | Method, commitments, principles, people, engagement | Refine diagram-to-copy balance, principle panels and people cards; resolve demo identities before production | Verified-only public team treatment and unchanged service meaning |
| `/insights` | Featured article, three further articles and topic labels | Refine featured composition, cover proportions and metadata; make static topic labels clearly descriptive | Four articles reachable; topic labels don't falsely promise filtering |
| `/insights/sha-benefits-package-registered-product` | SHA-related MDX article | Apply shared reading template; verify this article's own metadata and content | Readable prose, semantic headings, accurate article-specific references |
| `/insights/reading-the-bptap-mandate` | BPTAP-related MDX article | Same template; separate historical statements from current claims | Same checks; no assumed applicant pathway |
| `/insights/what-drives-a-ppb-review-timeline` | PPB-related MDX article | Same template, with appropriate topic/authority metadata | Same checks; no invented timeline guarantees |
| `/insights/eac-harmonisation-and-the-second-market` | EAC-related MDX article | Same template, with appropriate regional metadata | Same checks; no generic PPB/SHA/BPTAP sidebar applied blindly |
| `/contact` | Enquiry form, direct channels, Nairobi plate, operating details, onboarding steps | Simplify hierarchy within the current composition; polish fields, select, feedback and channel wrapping | Both form placements tested; all failure/retry/success/reset states covered |
| `/legal/privacy` | Privacy notice | Refine header, text measure, hierarchy and links; confirm retention statement with operator | Complete content, keyboard-readable links, no invented effective date |
| `/legal/terms` | Terms and conditional photo credits | Same reading system; credit section absent when there are no third-party credits | Existing qualifications preserved; no empty container |
| Unknown URL / unknown article | Not-found state | Use shared type/buttons/spacing and useful recovery links | Correct not-found response; functional Services and Contact links |
| `/about` | Permanent redirect to `/practice` | Preserve redirect | Assert actual Next.js permanent redirect status/location; do not assume old documentation's 301 |
| `/api/contact` | SMTP-backed POST enquiry | Preserve payload names and successful response; harden actual validation/failure boundaries | Local isolated mail/transport tests; separate real-inbox acceptance |
| `/sitemap.xml`, `/robots.txt`, manifest/icons | Discovery and identity | Check generated destinations, metadata consistency, favicon/manifest assets and preview indexing policy | Endpoint checks; no accidental preview canonical/indexing mistakes |

## 5. Page-by-page refinement direction

### Home

Keep the abstract hero artwork and floating pills. Improve logo/navigation contrast against each hero crop, title line breaks, paragraph measure, CTA proportions and stage ribbon spacing. Preserve both hero actions and the four pathway labels. Refine the broad teal halo toward a neutral tonal treatment while retaining the hero's depth and animated entrance. Browser inspection shows abstract artwork, not the laboratory operations described by its current alt text; give it accurate alternative text or decorative treatment according to its actual role.

Refine the pathway rail as a legible sequence: consistent stage icon size, aligned question and deliverable baselines, predictable gaps and an orderly vertical mobile form. The active/new stage can use teal; idle structure should be neutral.

Keep the split reimbursement band and funds diagram. Reduce competing accent areas, align the diagram with its text, and ensure fund labels wrap cleanly. Preserve the important distinction between registration and funding without treating the diagram as a promise of an authority's decision.

Keep the alternating service widths and rounded stage plates. Standardize plate padding, border contrast, corner radii and badge alignment; make the stage's deliverables visually stronger than its decorative watermark. Retain the existing service destinations.

Keep all six why-entries and their alternating icon-led treatment. Tighten excessive gaps where they separate a mechanism from its consequence; preserve breathing room and section variation. Use a consistent icon footprint rather than six unrelated visual sizes.

Refine people cards, insight cards and the enquiry block using shared components. Preserve the image divider as a composition element, refine its crop/height, and retain all substantive content. The people grid must adapt gracefully to the number of verified people, including one, rather than leaving presentation gaps or inventing colleagues.

### Services

Keep the current alternating stage introduction and service list layout, large subdued stage artwork and sticky desktop context. Normalize the four stage headings, intro measures, badge sizes, output labels and spacing between services. Keep sticky content below the actual header clearance; disable stickiness when viewport height makes it obstructive.

Maintain `stage-01` through `stage-04` identifiers and their footer/pathway destinations. Make the nested reimbursement navigation item the sole current page on its own route. Preserve the concept-to-icon registry and shared service names.

### Reimbursement

Retain the current six-section composition and its mix of open text, inverted band, rounded offering panels, evidence list and phase panels. Give factual context a compact, readable definition-list treatment; distinguish source/reference data from marketing prose. Refine the access-chain diagram as a diagram of concepts rather than a guaranteed linear application process.

Make evidence rows, offering cards and phase panels share spacing, border, label and icon rules. Preserve phase order and existing content; do not invent dates or durations. Keep caveats beside the associated claim. Review titles, metadata and introductory copy as well as body text for unsupported filing implications.

### Practice

Keep the CTD module plate, method commitments, principles, team section and closing CTA. Improve balance between the plate and long text, standardize principle panels and make team-card geometry consistent with the rest of the site. Preserve initials as the honest fallback when real portraits are unavailable.

Three demo identities must be replaced by confirmed people or withheld from public rendering through an explicit production content rule. Keep the team component and section; do not fill gaps with stock portraits, invented credentials or speculative case results. Review claims about qualifications, committee access and regulatory representation with the operator.

### Insights index and all four articles

Keep the rounded featured article, drawn covers and secondary article cards. Refine title wrapping, cover scale, category/date/reading-time rhythm and click/focus behavior. Avoid stretched link overlays covering unrelated controls or text selection.

The current topic strip contains spans, not filters. In this surface-focused pass, present it as a descriptive topic index with no button affordance. Adding a real URL-backed category filter is a separately recorded enhancement, not an assumed existing feature.

Keep the article reading layout, supporting sidebar and related links. Improve body size, measure, paragraph spacing, lists, reference links, callouts and sidebar density. Use article-specific authority/jurisdiction data rather than the same generic authority row everywhere. Retain publication dates until the editor verifies them; never refresh dates simply to look current. Review demo editorial before public release.

### Contact, both form placements and feedback

Keep the current rounded form, direct contact column, location plate and onboarding strip. Align labels, fields and helper text; use sentence case and clear required/optional indications. Retain the native select unless a concrete usability requirement justifies replacing it. Polish its shell, chevron spacing and focus state while preserving native mobile picking.

Preserve name, organisation, email, phone, need and message fields and `/api/contact`. Preserve values on network/server failure and show the direct email fallback after repeated failure. Make validation local to fields with a focusable summary where needed; associate instructions/errors; announce pending/error/success states; prevent duplicate submission; restore sensible focus after success and reset.

An SMTP handoff is not proof that a recipient read or even received the email. Success wording should describe the verified event. Use an isolated local test transport to exercise the full UI/API sequence without sending a message to anyone. A real monitored inbox delivery check remains a separately authorized launch gate.

Confirm operating hours, the response-time commitment, confidentiality process, location wording and retention operations. Nairobi city coordinates must not imply a verified office pin. Preserve claims pending review in planning; do not silently substitute new facts.

### Legal, not-found and shared shell

Keep the legal routes and existing terms. Apply consistent header/reading measures, visible links and restrained spacing without turning the notices into marketing cards. Verify that the privacy statement matches actual mail/storage/retention operations before release.

Refine the 404 using the same typography, pill controls and spacing. Preserve recovery actions. Keep footer columns, contact routes, social destination, current year behavior and theme control. Check long email/phone/link wrapping and touch targets.

## 6. Shared component work packages

| Package | Primary files | Deliverable |
|---|---|---|
| Tokens and type | `app/globals.css`, `app/layout.tsx`, `lib/motion.ts` | Semantic color roles, explicit dark variant, radius/space/motion scales, corrected 16px body floor and allowed font weights |
| Header and navigation | `components/structure/site-header.tsx`, theme toggle | Preserved pill/glass/scroll character with deterministic active state, responsive fit and reliable keyboard behavior |
| Structural rhythm | `section.tsx`, `index-rail.tsx`, page headers | Shared header/container/section rules; correct anchor offsets; usable section navigation |
| Buttons and links | `components/primitives/button.tsx`, `.btn` classes | Consistent pill sizes, primary/secondary/ghost roles and all interaction states |
| Panels and content | Team cards, pathway, entries, evidence, insight cards | Shared radius/border/elevation/padding roles, with the existing varied compositions retained |
| Figures and plates | `figure-plate.tsx`, funds/insight plates, figure image | Specific meaningful diagrams, quieter teal, readable labels and consistent corner geometry |
| Forms and feedback | `components/forms/contact-form.tsx`, contact API | Accessible labels/feedback, resilient value retention and validated transport states |
| Editorial/content | `content/*`, route-local strings, MDX, `lib/schema.ts` | Traceable content, article-specific metadata, no demo identities published |
| Motion | `components/motion/motion-provider.tsx`, header, reveal | Existing repertoire retained with coordinated timing, route cleanup and reduced-motion parity |

Extract only patterns that actually repeat. Keep server-rendered content as server components and limit client code to interactions. Do not replace Next.js, Tailwind, MDX, Phosphor, GSAP or next-themes during a surface refinement.

## 7. Execution order and gates

Each phase ends in a reviewable change set with route/state evidence. Estimates describe work size, not a promised calendar schedule. Work that requires owner information is tracked separately and does not stop independent UI work.

### Phase 0: establish the baseline

- Clone the correct repository separately; use npm and the committed lockfile; create a `codex/` branch.
- Inventory every route, anchor, shared component, data source and form state.
- Run the existing checks; record failures as pre-existing rather than claiming a clean baseline.
- Run the site and capture light/dark desktop/mobile examples before editing UI.
- Register content questions, source conflicts and claims needing revalidation.

**Gate:** reproducible setup, recorded check results and a complete coverage ledger. No page is silently out of scope.

### Phase 1: precision pass on the shared visual system

- Implement the protected design direction in `docs/revamp/DESIGN.md`.
- Normalize body/secondary typography, role-based radii, border opacity, elevations, spacing and neutral/teal distribution.
- Resolve undefined color utilities and align Tailwind's dark variant with `data-theme`.
- Audit and calibrate buttons, badges, panels, field shells, icons and plate styling.
- Keep all existing animation families and define consistent timing/easing roles.

**Gate:** a local component review surface or focused fixtures demonstrate light/dark and interaction states at 360, 768 and 1440px. No generic UI kit has displaced the existing character. A full Storybook migration is optional, not a prerequisite.

### Phase 2: shared shell and representative pages

- Refine header, pill nav, mobile drawer, footer, page header and section rail.
- Correct competing active links, drawer focus/Escape behavior and header/anchor clearance.
- Refine the entire homepage and reimbursement page as the representative surfaces: artwork hero, dark band, plates, rich motion, cards, diagrams and form.
- Compare before/after screenshots and test complete scrolling, not only the first viewport.

**Gate:** both pages retain their full content/sections and motion character; shell works on mobile/tablet/desktop in both themes. Review this quality level before propagating to remaining pages. Routine iteration continues without a new permission flow.

### Phase 3: complete every remaining page

- Apply the same component rules to Services and Practice without flattening their alternating layouts.
- Refine Insights and the shared article template, then inspect all four actual articles.
- Refine Contact, Privacy, Terms and not-found.
- Resolve topic-strip affordance and article-specific sidebar content.

**Gate:** every row in the route inventory has completed UI/state evidence; no remaining page uses an abandoned variant.

### Phase 4: production behavior and content integrity

- Validate full contact payload shape, email format, allowed need values and field/body limits server-side; handle malformed JSON inside the response boundary.
- Check missing SMTP configuration, timeouts and transport failures; add appropriate abuse controls without making the basic form depend on an unprovisioned service.
- Preserve the API contract; avoid logging personal enquiry contents or secrets.
- Reconcile demo people/editorial, response promises, location/hours and retention operations with the owner.
- Revalidate time-sensitive regulatory statements against official sources before release; record source, checked date, owner and exact affected copy.
- Check metadata, schema, canonical URLs, manifest, redirects, sitemap, link destinations and preview indexing.

**Gate:** isolated form tests pass; no public demo identities or unsupported claims; no unresolved production content dependency is marked complete.

### Phase 5: whole-site quality assurance and release readiness

- Complete the viewport/theme/input/motion coverage matrix below.
- Measure production-build performance; inspect console errors, layout shift and animation smoothness.
- Automate meaningful route, form and accessibility checks; wire all existing guards explicitly into CI.
- Capture final before/after evidence and write known limitations and rollback instructions.
- Prepare a deployment preview and verify its exact commit, if deployment is requested. Promotion/push is separate from this planning setup.

**Gate:** all required checks finish successfully, content gates are closed or explicitly prevent publication, and a rollback target is recorded. A visually polished local build alone is not a production acceptance result.

## 8. Verification matrix

### Coverage

- Every public URL, unknown URL, unknown article and the legacy redirect.
- Widths: 360, 390, 768, 1024, 1440 and 1920px; include short desktop height and a mobile landscape pass.
- Light and dark on all route templates; critical full-page captures at 390 and 1440px in both themes. Spot-check every actual article, not just its template.
- Mouse, touch-style input and keyboard navigation; 200% zoom and 320 CSS-pixel reflow checks.
- Full motion and reduced motion; no-JS/failing-animation readable content; theme first paint and stored preference.
- Long titles/contact details, one verified team member, empty case notes, no optional photo credits, article not found and absent editorial data in a local fixture. Keep existing three-article publication policy consistent across header/footer/index/home.

### Automated checks to retain and add

Retain `npm run typecheck`, `npm run lint`, `npm run lint:strings`, `npm run lint:icons` and `npm run build`. Baseline results are recorded in SETUP.md. These are separate commands today: the existing build does not automatically enforce both custom guards.

Add focused browser checks for navigation/current page, mobile drawer focus and dismissal, anchors, theme persistence, article links, form validation and all feedback states. Add isolated API tests for malformed JSON, missing/invalid fields, wrong optional-field types, oversize payloads, unavailable SMTP and transport rejection. Check the failed-send value retention and second-failure email fallback, not merely that the submit button exists.

Use axe on every route and both themes; manually inspect focus order, focus visibility, reading order, dialogs/disclosures, text contrast and sticky-header obstruction. Automated accessibility scans do not establish conformance by themselves.

### Measurable quality gates

| Area | Target | Evidence |
|---|---|---|
| Palette | Neutral-dominant, subtle tint retained, teal limited to selected emphasis and interaction | Every full-page capture reviewed; no large teal haze/fills introduced |
| Typography | 16px minimum body/form text; smaller labels only where legible and documented | Computed style audit at mobile/desktop; no unapproved weights/italics |
| Contrast | WCAG 2.2 AA: text and interactive boundaries checked in both themes | Contrast matrix including text on photographs, disabled exceptions and active/focus states |
| Controls | Project target of 44px hit areas for primary controls/icon buttons; adequate separation for inline links | Measured boxes and keyboard/touch review; distinguish project target from WCAG AA minimum |
| Reflow | No page-level horizontal overflow at 320 CSS px; no lost content at zoom | Browser measurements and manual inspection |
| Lab loading | LCP <=2.2s and CLS <=0.05 on a recorded mobile/4G profile; these preserve the dossier's stricter targets | Median of three production-build Lighthouse runs, same device/profile/settings |
| Lab responsiveness | TBT <=200ms as a diagnostic target; inspect animation frames/long tasks during menu, scroll and theme interactions | Trace and Lighthouse report; never label TBT as measured INP |
| Field performance | p75 LCP <=2.5s, INP <=200ms, CLS <=0.1, segmented by mobile/desktop once real field data exists | Field report; explicitly mark unavailable before sufficient data |
| Assets | Hero <=140KB at delivered 1440px candidate; above-fold images <=200KB; fully loaded homepage image transfers <=900KB | Network/image audit, separate from HTML/JS/CSS/font bytes; record total page transfer separately |
| Bundle | No unexplained client-JS growth; no duplicate animation/font/icon loading | Before/after build and network comparison; agree any new numerical JS budget from baseline |
| Runtime | No unexplained console errors, hydration warnings, broken internal destinations or missing media | Crawl plus browser logs |
| Delivery | SMTP acceptance and inbox arrival recorded as separate events | Local test transport proof; real-inbox check only when explicitly authorized |

The original dossier's phrase "total page under 900KB" is ambiguous and may be unrealistic with its current fonts/runtime. Report actual total bytes first; keep 900KB as the image envelope above and propose a separate total-transfer cap from measurements rather than claiming the old total-page goal passed.

Accessibility reference: [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/). Field metrics reference: [Google Web Vitals](https://web.dev/articles/vitals). Project-specific stricter targets are identified above rather than represented as universal standards.

## 9. Content and external dependencies

| Dependency | Safe progress while unresolved | Publication gate |
|---|---|---|
| Three demo team identities | Refine TeamCard and test flexible verified-person layouts | Replace with verified data or explicitly exclude demo records from public rendering |
| Demo editorial / dates | Refine index and article template using current fixtures | Editor confirms publication status, dates, sources and maintenance responsibility |
| Current regulatory facts / applicant process | Preserve cautious service meaning; log each source/claim | Official-source verification; no promised filing route or regulatory outcome |
| Supplied hero provenance/alt text | Retain existing abstract artwork and refine presentation | Confirm provenance; correct the inaccurate laboratory-operations alt text without inventing a depicted setting |
| Response window / hours / NDA process | Preserve existing information in the plan | Operator confirms actual service commitments |
| Retention statement | Polish form and privacy presentation | Confirm the stated deletion process covers the real mailbox/storage systems |
| SMTP credentials and monitored inbox | Local isolated transport and failure tests | Configured preview/production transport and separately authorized inbox acceptance |
| Street address / case studies | Use current city-level information and empty-case behavior | Publish specifics only when supplied and cleared; these do not require invented filler |

## 10. Change discipline and first implementation slice

Keep planning/setup, shared tokens/primitives, shell, each page group, behavior hardening and final verification as separate reviewable change sets. No unrelated refactor or framework upgrade. Record every scope change, route/section removal proposal or changed factual/legal claim. Keep the baseline SHA, actual commands and screenshots with the review evidence. Deploy a known commit and retain the prior deployment for rollback when release work is authorized.

The first implementation slice is **tokens/type/state cleanup plus the existing pill header and a representative panel/button/form set**. It should demonstrate the intended quality in light/dark at mobile and desktop before all sections are polished. The visible outcome must retain the site's rounded, tinted, animated identity and make it feel more coherent, precise and expensive through execution.

## 11. Task ledger

- [x] Confirm target repository and isolated checkout.
- [x] Read existing design/copy/architecture guidance and source conflicts.
- [x] Inventory current routes, components, content and state risks.
- [x] Incorporate the instruction to retain pills, rounded panels, tinted neutrals and extensive animation.
- [x] Write source-backed audit, refinement specification and execution plan.
- [x] Finish focused baseline runtime captures and record completed static/build check results in SETUP.md; full route/theme/state acceptance remains implementation work.
- [x] Implement Phase 1 shared visual refinement.
- [x] Implement Phase 2 shell/home/reimbursement refinement.
- [x] Implement Phase 3 remaining page refinement.
- [x] Implement and locally verify Phase 4 enquiry behavior and content safeguards.
- [ ] Operator acceptance: real inbox delivery, editorial publication and retention commitments.
- [x] Complete route/theme accessibility and responsive evidence; see the implementation record.
- [ ] Complete controlled Lighthouse/trace measurements and release acceptance before deployment.
