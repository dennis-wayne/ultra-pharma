import Link from "next/link";
import { stages } from "@/content/pathway";

export function PathwayRail() {
  return (
    <ol className="pathway-rail" data-reveal-group>
      {stages.map((stage) => (
        <li className="pathway-step" key={stage.n}>
          <div className="pathway-step-heading">
            <span className="pathway-step-number">{stage.n}</span>
            <span>{stage.name}</span>
            {stage.isNew && <span className="pathway-step-topic">HTA</span>}
          </div>
          <h3>{stage.question}</h3>
          <ul>
            {stage.deliverables.map((item) => (
              <li key={item.label}>{item.label}</li>
            ))}
          </ul>
          <Link href={stage.href} className="text-link">
            {stage.name} in detail
          </Link>
        </li>
      ))}
    </ol>
  );
}
