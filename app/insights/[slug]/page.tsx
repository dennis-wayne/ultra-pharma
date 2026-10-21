import { MotionProvider } from "@/components/motion/motion-provider";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/primitives/json-ld";
import { insights, getInsight } from "@/content/insights";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { Prose } from "@/components/content/prose";
import { InsightCard } from "@/components/content/insight-card";

// Explicit imports keep the article graph bounded and unknown slugs on the 404 path.
const articles = {
  "sha-benefits-package-registered-product": () =>
    import("@/content/insights/sha-benefits-package-registered-product.mdx"),
  "reading-the-bptap-mandate": () =>
    import("@/content/insights/reading-the-bptap-mandate.mdx"),
  "what-drives-a-ppb-review-timeline": () =>
    import("@/content/insights/what-drives-a-ppb-review-timeline.mdx"),
  "eac-harmonisation-and-the-second-market": () =>
    import("@/content/insights/eac-harmonisation-and-the-second-market.mdx"),
};
const context = {
  Reimbursement: {
    jurisdiction: "Kenya",
    authority: "Social Health Authority / BPTAP",
  },
  Policy: { jurisdiction: "Kenya", authority: "Ministry of Health / BPTAP" },
  Approval: { jurisdiction: "Kenya", authority: "Pharmacy and Poisons Board" },
  "Market entry": {
    jurisdiction: "East Africa",
    authority: "EAC / national authorities",
  },
};
type Params = { readonly slug: string };
export const dynamicParams = false;
export function generateStaticParams(): Params[] {
  return insights.map((post) => ({ slug: post.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return { title: "Article not found", robots: { index: false } };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.datePublished,
    },
  };
}
export default async function InsightPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post || !Object.hasOwn(articles, slug)) notFound();
  const { default: Article } = await articles[slug as keyof typeof articles]();
  const details = context[post.category];
  const related = insights.filter((other) => other.slug !== slug).slice(0, 2);
  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.description,
          slug,
          datePublished: post.datePublished,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Insights", path: "/insights" },
          { name: post.title, path: `/insights/${slug}` },
        ])}
      />
      <header className="page-header">
        <div className="shell text-center" data-hero>
          <Link href="/insights" className="text-link text-ink-500">
            Back to insights
          </Link>
          <p className="t-label">{post.category}</p>
          <h1 className="t-h1 t-editorial">{post.title}</h1>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-ink-500">
            <time dateTime={post.datePublished}>{post.displayDate}</time>
            <span>{post.readingTime}</span>
            <span>Ultra Pharma</span>
          </div>
        </div>
      </header>
      <div className="shell section-space grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-20">
        <article>
          <p className="t-lede mb-10 mt-0 max-w-[62ch] border-l-2 border-rule-strong pl-6 text-ink-700">
            {post.description}
          </p>
          <Prose>
            <Article />
          </Prose>
          <div className="panel mt-12">
            <h2 className="t-h3 m-0">What does this mean for your product?</h2>
            <p className="mb-6 mt-4 text-ink-700">
              Discuss the evidence, requirements and next steps that apply to
              your situation.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Talk to us
            </Link>
          </div>
        </article>
        <aside className="space-y-8 lg:sticky lg:top-32">
          <div className="rounded-2xl border border-rule p-6">
            <h2 className="t-label mb-5 mt-0 text-ink-500">Article context</h2>
            <dl className="m-0 space-y-5">
              <div>
                <dt className="t-label text-ink-500">Jurisdiction</dt>
                <dd className="m-0 mt-1 text-sm">{details.jurisdiction}</dd>
              </div>
              <div>
                <dt className="t-label text-ink-500">Relevant authorities</dt>
                <dd className="m-0 mt-1 text-sm">{details.authority}</dd>
              </div>
              <div>
                <dt className="t-label text-ink-500">Topic</dt>
                <dd className="m-0 mt-1 text-sm">{post.category}</dd>
              </div>
            </dl>
          </div>
          <p className="m-0 text-sm text-ink-500">
            This article provides general context. Requirements and procedures
            may change; confirm the current position for a specific engagement.
          </p>
          <Link href="/services" className="text-link">
            Explore the services
          </Link>
        </aside>
      </div>
      {related.length > 0 && (
        <section className="border-t border-rule bg-paper-sunk">
          <div className="shell section-space">
            <h2 className="t-h2 mb-10 mt-0">Related analysis</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((other) => (
                <InsightCard key={other.slug} post={other} />
              ))}
            </div>
          </div>
        </section>
      )}
      <MotionProvider />
    </>
  );
}
