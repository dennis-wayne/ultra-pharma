import { writeFileSync } from "node:fs";
const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3100";
const routes = ["/", "/services", "/services/reimbursement", "/practice", "/insights", "/contact", "/legal/privacy", "/legal/terms", "/insights/sha-benefits-package-registered-product", "/insights/reading-the-bptap-mandate", "/insights/what-drives-a-ppb-review-timeline", "/insights/eac-harmonisation-and-the-second-market"];
const results = [];
for (const path of routes) {
  const response = await fetch(base + path);
  const html = await response.text();
  const h1 = (html.match(/<h1\b/g) ?? []).length;
  const main = (html.match(/<main\b/g) ?? []).length;
  const clean = !/Eric Ochieng|Dr\. Amina Hassan|David Kamau|article-cover|hero-bg\.jpg/.test(html);
  const passed = response.status === 200 && h1 === 1 && main === 1 && clean;
  results.push({ path, status: response.status, h1, main, noDemoPeopleOrRemovedMedia: clean, passed });
  console.log(`${passed ? "PASS" : "FAIL"} ${path} (${response.status}, h1=${h1}, main=${main})`);
}
for (const path of ["/revamp-not-found", "/insights/not-a-published-article"]) {
  const response = await fetch(base + path);
  results.push({ path, status: response.status, passed: response.status === 404 });
}
const about = await fetch(base + "/about", { redirect: "manual" });
results.push({ path: "/about", status: about.status, location: about.headers.get("location"), passed: about.status === 308 && about.headers.get("location")?.endsWith("/practice") });
for (const path of ["/robots.txt", "/sitemap.xml"]) { const response = await fetch(base + path); results.push({ path, status: response.status, passed: response.status === 200 }); }
writeFileSync("docs/revamp/route-checks.json", JSON.stringify(results, null, 2));
if (results.some((result) => !result.passed)) process.exitCode = 1;
