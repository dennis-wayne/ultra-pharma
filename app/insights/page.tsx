import { MotionProvider } from "@/components/motion/motion-provider";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/structure/page-header";
import { Mark } from "@/components/primitives/mark";
import { InsightCard } from "@/components/content/insight-card";
import { JsonLd } from "@/components/primitives/json-ld";
import { insights, topicMark } from "@/content/insights";
import { breadcrumbSchema } from "@/lib/schema";
export const metadata: Metadata = {
  title: "Insights",
  description:
    "Analysis on Kenyan healthcare regulation, health technology assessment, reimbursement and East African market access.",
  alternates: { canonical: "/insights" },
};
export default function InsightsPage() {
  const [featured, ...others] = insights;
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: "Insights", path: "/insights" }])}
      />
      <PageHeader
        title="Insights & analysis"
        description="Notes on Kenyan regulation, reimbursement and regional market entry, with a focus on what they mean for your product."
      >
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-500">
          <span>Topics:</span>
          {Array.from(new Set(insights.map((post) => post.category))).map(
            (category) => (
              <span key={category}>{category}</span>
            ),
          )}
        </div>
      </PageHeader>
      <section className="shell section-space" aria-label="Analysis articles">
        {featured ? (
          <>
            <div className="mb-5 text-sm text-ink-500">Featured analysis</div>
            <article className="panel featured-article mb-16">
              <div className="flex flex-wrap items-center justify-between gap-5 border-b border-rule pb-6">
                <span className="t-label text-ink-500">
                  {featured.category}
                </span>
                <Mark
                  name={topicMark(featured.category)}
                  size={32}
                  weight="duotone"
                  className="text-ink-500"
                />
              </div>
              <div className="grid gap-x-16 gap-y-6 pt-8 lg:grid-cols-[1.15fr_1fr]">
                <h2 className="t-h2 t-editorial mb-5 mt-4">
                  <Link
                    href={`/insights/${featured.slug}`}
                    className="no-underline hover:underline"
                  >
                    {featured.title}
                  </Link>
                </h2>
                <div>
                  <p className="text-ink-700">{featured.description}</p>
                  <div className="mt-7 flex flex-wrap gap-5 text-sm text-ink-500">
                    <time dateTime={featured.datePublished}>
                      {featured.displayDate}
                    </time>
                    <span>{featured.readingTime}</span>
                  </div>
                  <Link
                    href={`/insights/${featured.slug}`}
                    className="text-link mt-6"
                  >
                    Read the analysis
                  </Link>
                </div>
              </div>
            </article>
            {others.length > 0 && (
              <>
                <h2 className="t-h3 mb-8 mt-0">More from the practice</h2>
                <div
                  data-reveal-group
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                  {others.map((post) => (
                    <InsightCard post={post} key={post.slug} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="panel">
            <h2 className="t-h3 mt-0">Analysis from the practice</h2>
            <p className="text-ink-700">
              New articles will appear here when published.
            </p>
            <Link href="/services" className="text-link">
              Explore our services
            </Link>
          </div>
        )}
      </section>
      <MotionProvider />
    </>
  );
}
