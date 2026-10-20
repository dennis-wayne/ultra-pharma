import Link from "next/link";
import type { Insight } from "@/content/insights";
import { Mark } from "@/components/primitives/mark";
import { topicMark } from "@/content/insights";
export function InsightCard({ post }: { readonly post: Insight }) {
  return (
    <article className="panel interactive-panel article-card">
      <div>
        <div className="mb-8 flex items-center justify-between gap-4">
          <span className="t-label text-ink-500">{post.category}</span>
          <Mark
            name={topicMark(post.category)}
            size={24}
            className="text-ink-500"
          />
        </div>
        <h3 className="t-h3">
          <Link href={`/insights/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.description}</p>
      </div>
      <div className="article-card-meta">
        <time dateTime={post.datePublished}>{post.displayDate}</time>
        <span>{post.readingTime}</span>
      </div>
      <span className="article-read" aria-hidden>
        Read analysis <span>↗</span>
      </span>
    </article>
  );
}
