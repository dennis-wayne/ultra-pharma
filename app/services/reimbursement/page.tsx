import { MotionProvider } from "@/components/motion/motion-provider";
import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionIndex } from "@/components/structure/section";
import { PageHeader } from "@/components/structure/page-header";
import { IndexRail } from "@/components/structure/index-rail";
import { Reveal } from "@/components/primitives/reveal";
import { JsonLd } from "@/components/primitives/json-ld";
import { EvidenceList } from "@/components/content/evidence-list";
import {
  caveat,
  evidence,
  facts,
  phases,
  reimbursementServices,
} from "@/content/reimbursement";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { Mark } from "@/components/primitives/mark";
export const metadata: Metadata = {
  title: "Health product assessment and benefit listing",
  description:
    "HTA dossiers, economic modelling and stakeholder engagement to support assessment of interventions for Kenya's SHA benefits package.",
  alternates: { canonical: "/services/reimbursement" },
};
const accessChain = ["Registered", "Assessed", "Listed", "Funded"];
export default function ReimbursementPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Health product assessment and national benefit listing",
          description: metadata.description as string,
          path: "/services/reimbursement",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Services", path: "/services" },
          { name: "Reimbursement", path: "/services/reimbursement" },
        ])}
      />
      <IndexRail sections={["01", "02", "03", "04", "05", "06"]} />
      <PageHeader
        title="Health product assessment and national benefit listing"
        parent={{ label: "Services", href: "/services" }}
        description="Preparing the evidence that supports assessment for Kenya's national health benefits package. Connecting regulatory approval with the case for funded access."
      />
      <Section index="01" bordered>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionIndex index="01" label="The context" />
            <h2 className="t-h2 mb-6 mt-5">
              How evidence informs what SHA covers
            </h2>
            <p className="text-ink-700">
              Kenya&apos;s Social Health Insurance Act 2023 established a new
              health-financing framework. Coverage is organised through the
              Primary Healthcare Fund, the Social Health Insurance Fund, and the
              Emergency, Chronic and Critical Illness Fund.
            </p>
            <p className="mt-5 text-ink-700">
              The Benefits Package and Tariffs Advisory Panel advises the
              Ministry of Health and the Social Health Authority on benefits and
              tariffs, informed by health technology assessment.
            </p>
            <a
              href="https://www.health.go.ke/node/1873"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link mt-2"
            >
              Read the Ministry of Health announcement
            </a>
            <dl className="mb-0 mt-8 border-t border-rule">
              {facts.map((fact) => (
                <div
                  key={fact.key}
                  className="grid gap-2 border-b border-rule py-4 sm:grid-cols-[140px_minmax(0,1fr)]"
                >
                  <dt className="t-label text-ink-500">{fact.key}</dt>
                  <dd className="t-data m-0">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal className="panel">
            <span className="t-label text-ink-500">The access chain</span>
            <ol className="mb-8 mt-7 list-none p-0">
              {accessChain.map((step, i) => (
                <li
                  key={step}
                  className="flex items-baseline gap-5 border-b border-rule py-5"
                >
                  <span className="t-index text-ink-500">0{i + 1}</span>
                  <span className="font-display text-2xl">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mb-0 text-ink-700">
              Registration and funding are separate decisions. This is a
              conceptual pathway, not a guarantee that a particular product will
              pass each stage.
            </p>
          </Reveal>
        </div>
      </Section>
      <section
        id="sec-02"
        data-sec="02"
        className="bg-paper-deep text-deep-ink"
      >
        <div className="shell section-space grid items-start gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionIndex
              index="02"
              label="What it means for your product"
              tone="deep"
            />
            <h2 className="t-h2 mb-0 mt-5">
              Registration establishes that a product may be sold. It does not
              establish that it will be funded.
            </h2>
          </Reveal>
          <Reveal>
            <p className="t-lede m-0 text-deep-ink-soft">
              A product outside the benefits package may compete on
              out-of-pocket price against a funded alternative. Planning for the
              evidence behind access decisions belongs alongside the regulatory
              strategy.
            </p>
          </Reveal>
        </div>
      </section>
      <Section index="03" bordered>
        <Reveal className="section-top">
          <div>
            <SectionIndex index="03" label="What we do" />
            <h2 className="t-h2">HTA and reimbursement services</h2>
          </div>
          <p>
            Clinical evidence, health economics and structured engagement
            brought together in a clear assessment case.
          </p>
        </Reveal>
        <div data-reveal-group className="grid gap-6 md:grid-cols-3">
          {reimbursementServices.map((service) => (
            <article key={service.name} className="panel">
              <span className="surface-mark mb-7">
                <Mark name={service.icon} size={26} weight="duotone" />
              </span>
              <h3 className="t-h3 m-0">{service.name}</h3>
              <p className="mb-0 mt-5 text-ink-700">{service.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-rule bg-paper-sunk p-6">
          <p className="m-0 max-w-[88ch] text-ink-700">{caveat}</p>
          <p className="mb-0 mt-3 text-ink-700">
            BPTAP now publishes an intervention-proposal form. A proposal is
            distinct from a guaranteed product listing or funding decision.{" "}
            <a
              href="https://bptap.health.go.ke/interventions-form"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              View the official proposal channel.
            </a>
          </p>
        </div>
      </Section>
      <Section index="04" bordered>
        <div className="grid items-start gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32">
            <SectionIndex index="04" label="The evidence" />
            <h2 className="t-h2 mb-6 mt-5">
              Seven areas an assessment considers
            </h2>
            <p className="text-ink-700">
              A coherent evidence base spans clinical, economic and operational
              questions. The requirements for an individual intervention depend
              on the assessment and available evidence.
            </p>
          </Reveal>
          <Reveal>
            <EvidenceList items={evidence} />
          </Reveal>
        </div>
      </Section>
      <Section index="05" tone="sunk" bordered>
        <Reveal className="section-top">
          <div>
            <SectionIndex index="05" label="How we work" />
            <h2 className="t-h2">Phases of engagement</h2>
          </div>
          <p>
            Begin with feasibility, build the evidence, and support engagement
            and the review that follows.
          </p>
        </Reveal>
        <div
          data-reveal-group
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {phases.map((phase) => (
            <article key={phase.n} className="panel flex flex-col">
              <span className="t-index text-ink-500">{phase.n}</span>
              <h3 className="t-h3 mb-4 mt-8">{phase.name}</h3>
              <p className="mb-7 mt-0 text-ink-700">{phase.description}</p>
              <p className="mb-0 mt-auto border-t border-rule pt-5 text-sm text-ink-700">
                {phase.deliverable ??
                  "Review questions and follow-through support."}
              </p>
            </article>
          ))}
        </div>
      </Section>
      <Section index="06" bordered>
        <div className="panel flex flex-wrap items-center justify-between gap-8">
          <div>
            <SectionIndex index="06" label="Next step" />
            <h2 className="t-h2 mb-0 mt-5 max-w-[24ch]">
              Start with a feasibility assessment
            </h2>
          </div>
          <Link href="/contact" className="btn btn-primary">
            Talk to us
          </Link>
        </div>
      </Section>
      <MotionProvider />
    </>
  );
}
