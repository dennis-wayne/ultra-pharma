# Local setup and baseline verification

Historical baseline record. For the completed implementation and current check results, see [IMPLEMENTATION.md](IMPLEMENTATION.md). Statements about an unchanged source tree below describe the initial planning pass only.

Date: 20 October 2026, Africa/Nairobi.

- Repository: `https://github.com/dennis-wayne/ultra-pharma.git`
- Local directory: `C:\Users\denni\Documents\ultra-pharma`
- Baseline commit: `1c7c2ee9d1570e168023a0e6bbada0c97bde37ad`
- Planning branch: `codex/ui-revamp-plan`
- Runtime found: Node `v24.13.1`, npm `11.8.0`, Git `2.53.0.windows.1`.
- Baseline checkout was clean. No applicable AGENTS.md was found in the target tree or checked ancestor directories.

This checkout is separate from `C:\Users\denni\Documents\James Kamindo` and its existing dashboard repository. No files in that dashboard were changed.

## Reproduce

```powershell
Set-Location 'C:\Users\denni\Documents\ultra-pharma'
npm ci --no-audit --no-fund
npm run typecheck
npm run lint
npm run lint:strings
npm run lint:icons
npm run dev -- --hostname 127.0.0.1 --port 3100
```

Use the committed npm lockfile. Do not install a different framework/package-manager stack for the visual pass. Node 24 was observed locally; this is not a claim that the deployment runtime is pinned to the same version.

The content pages can render without SMTP credentials. Copy `.env.example` to `.env.local` only when configuring a transport. The supplied template has no credentials. Local form testing should use an isolated test mailbox/transport; don't send enquiries to a real recipient during routine UI checks.

## Check record

All completed checks below exited successfully. Runtime route checks are recorded separately from visual, accessibility and delivery acceptance.

| Check | Result |
|---|---|
| Clone / correct origin / baseline SHA | Passed |
| npm lockfile install | Passed: 500 packages installed with npm ci; lockfile unchanged |
| TypeScript | Passed: npm run typecheck, exit 0 |
| ESLint | Passed: npm run lint, exit 0 |
| String guard | Passed: npm run lint:strings, exit 0 |
| Icon guard | Passed: npm run lint:icons; 60 distinct concepts, exit 0 |
| Local development rendering | Passed: Home, Reimbursement and Contact rendered through the browser at port 3100 |
| Production build | Passed: npm run build, exit 0; all 19 generated entries completed, including four article URLs |
| Browser visual baseline | Captured: Home at 1440x1000 and 390x844 in both themes; Reimbursement desktop in both themes; Contact mobile light |
| Production HTTP smoke checks | All 12 public content URLs, robots and sitemap returned 200; unknown route returned 404; /about returned 308 to /practice |
| Lighthouse / axe / full browser matrix | Not run; implementation verification work |
| SMTP real-inbox delivery | Not run; no external message sent |

Only planning/setup documents and a safe environment template are in scope for this initial pass. Application UI and API implementation changes belong to later phases in REVAMP_PLAN.md.

Production build output reports Home at 191KB first-load JS and shared first-load output at 195KB. These are framework-reported bundle figures, not measured network transfer, Lighthouse results or field performance.

The production preview was started with `npm run start -- --hostname 127.0.0.1 --port 3100` at `http://127.0.0.1:3100`. The development server was stopped before building. Stop the preview before starting another server on the same port.

Final scope check: application source, public assets, Next config, package manifest and lockfile have no changes from the baseline. Documentation link checks and git diff --check passed. No commit, push or deployment was performed.

## Browser baseline evidence

These are viewport captures of the unchanged application, not the proposed design and not a full-site visual acceptance suite. Rich motion was enabled. No enquiry was submitted.

- [Home desktop light](baseline/home-desktop-light.png)
- [Home desktop dark](baseline/home-desktop-dark.png)
- [Home mobile light](baseline/home-mobile-light.png)
- [Home mobile dark](baseline/home-mobile-dark.png)
- [Reimbursement desktop light](baseline/reimbursement-desktop-light.png)
- [Reimbursement desktop dark](baseline/reimbursement-desktop-dark.png)
- [Contact mobile light](baseline/contact-mobile-light.png)

Measured Home body font: 15px. Measured Home document width: 1454px at a 1440px viewport and 422px at a 390px viewport. Both desktop Services and Reimbursement links reported aria-current=page on the reimbursement route. The hero visibly shows abstract artwork despite its laboratory-operations alt text. These confirmed observations are included in AUDIT.md.
