/** Optional local instrumentation. The layout only loads this in development. */
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const source = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const runner = `
(() => {
  if (!new URLSearchParams(location.search).has('audit')) return;
  let key = '', busy = false, timer;
  async function audit() {
    if (busy || !document.querySelector('main h1')) return;
    busy = true;
    try {
      await document.fonts.ready;
      const settled = document.createElement('style');
      settled.textContent = '[data-reveal], [data-reveal-group] > *, [data-hero] > *, [data-hero-stages] > *, [data-media-in], [data-slide-in], [data-icon-pop] { opacity: 1 !important; filter: none !important; transform: none !important; }';
      document.head.append(settled);
      const result = await axe.run({ exclude: [['svg[aria-hidden="true"]']] }, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } });
      settled.remove();
      let output = document.getElementById('ui-audit-results');
      if (!output) { output = document.createElement('script'); output.id = 'ui-audit-results'; output.type = 'application/json'; document.body.append(output); }
      output.dataset.auditKey = location.pathname + "|" + document.documentElement.getAttribute("data-theme") + "|" + innerWidth;
      output.textContent = JSON.stringify({ path: location.pathname, theme: document.documentElement.getAttribute('data-theme'), width: innerWidth, violations: result.violations.map(v => ({ id: v.id, impact: v.impact, description: v.description, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })), incomplete: result.incomplete.map(v => ({ id:v.id, nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary})) })), decorativeSvgRequiresManualContrastReview: true, passes: result.passes.length });
    } catch (error) { console.error('Local accessibility audit failed', error); }
    finally { busy = false; }
  }
  setInterval(() => {
    const next = location.pathname + document.documentElement.getAttribute('data-theme') + innerWidth;
    if (next !== key) { key = next; clearTimeout(timer); timer = setTimeout(audit, 1400); }
  }, 500);
})();`;
writeFileSync("public/__audit.js", source + "\n" + runner);
console.log("Prepared optional local axe audit. Start dev with UI_AUDIT=1.");
