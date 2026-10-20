import type { Entry } from "@/content/entries";
import { Mark } from "@/components/primitives/mark";
export function NumberedEntry({ entry }: { readonly entry: Entry }) {
  return (
    <article className="practice-bento-card" data-practice={entry.icon}>
      <div className="practice-bento-heading">
        <span className="practice-mark" data-icon-pop>
          <Mark name={entry.icon} size={32} weight="duotone" />
        </span>
        <h3 className="t-h3 m-0">{entry.heading}</h3>
      </div>
      <p className="practice-bento-body">{entry.body}</p>
      <div className="practice-bento-result">
        <p className="t-label">Why it matters</p>
        <p>{entry.why}</p>
      </div>
    </article>
  );
}
