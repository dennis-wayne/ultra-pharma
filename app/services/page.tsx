import { MotionProvider } from "@/components/motion/motion-provider";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/structure/page-header";
import { IndexRail } from "@/components/structure/index-rail";
import { Reveal } from "@/components/primitives/reveal";
import { JsonLd } from "@/components/primitives/json-ld";
import { serviceStages } from "@/content/services";
import { breadcrumbSchema } from "@/lib/schema";
import { Mark } from "@/components/primitives/mark";
export const metadata: Metadata = {
  title: "Services",
  description:
    "Regulatory strategy, submissions, market entry, health technology assessment and lifecycle management for healthcare products in Kenya.",
  alternates: { canonical: "/services" },
};
export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: "Services", path: "/services" }])}
      />
      <IndexRail
        sections={serviceStages.map((stage) => stage.n)}
        idPrefix="stage"
      />
      <PageHeader
        title="Services"
        description="Organised the way a product moves: approval, market entry, reimbursement, and lifecycle management."
      />
      {serviceStages.map((stage, index) => (
        <section
          key={stage.n}
          id={`stage-${stage.n}`}
          data-sec={stage.n}
          className={`border-b border-rule ${index % 2 ? "bg-paper-sunk/50" : ""}`}
        >
          <div className="shell section-space grid items-start gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal
              className={`lg:sticky lg:top-32 lg:col-span-5 ${index % 2 ? "lg:order-2" : ""}`}
            >
              <div className="mb-7 flex items-center gap-4">
                <span className="surface-mark">
                  <Mark name={stage.icon} size={28} weight="duotone" />
                </span>
                <span className="t-index text-ink-500">Stage {stage.n}</span>
              </div>
              <h2 className="t-h2 mb-5 mt-5">{stage.name}</h2>
              <p className="t-lede max-w-[34ch] text-ink-700">{stage.blurb}</p>
              {stage.href && (
                <Link href={stage.href} className="btn btn-primary mt-7">
                  Explore reimbursement
                </Link>
              )}
            </Reveal>
            <div data-reveal-group className="lg:col-span-7">
              {stage.services.map((service) => (
                <article
                  key={service.name}
                  className="border-b border-rule pb-9 pt-9 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <h3 className="t-h3 m-0">{service.name}</h3>
                  <p className="mb-0 mt-4 max-w-[64ch] text-ink-700">
                    {service.description}
                  </p>
                  {service.produces && (
                    <div className="mt-5 rounded-xl border border-rule bg-paper-raised p-4">
                      <span className="t-label block text-ink-500">
                        What this produces
                      </span>
                      <p className="mb-0 mt-2 text-ink-900">
                        {service.produces}
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}
      <MotionProvider />
    </>
  );
}
