import { MotionProvider } from "@/components/motion/motion-provider";
import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionIndex } from "@/components/structure/section";
import { PageHeader } from "@/components/structure/page-header";
import { IndexRail } from "@/components/structure/index-rail";
import { Reveal } from "@/components/primitives/reveal";
import { TeamCard } from "@/components/content/team-card";
import { JsonLd } from "@/components/primitives/json-ld";
import { publicTeam } from "@/content/team";
import { breadcrumbSchema } from "@/lib/schema";
import { Mark } from "@/components/primitives/mark";
import type { IconName } from "@/lib/icons";
export const metadata: Metadata = {
  title: "Practice",
  description:
    "How Ultra Pharma structures regulatory engagements, dossier reviews and market-access work in Kenya and East Africa.",
  alternates: { canonical: "/practice" },
};
const modules = ["Regional", "Summaries", "Quality", "Nonclinical", "Clinical"];
const commitments = [
  {
    title: "Pre-submission CTD audits",
    description:
      "Module-by-module review of the dossier against the applicable requirements before filing.",
  },
  {
    title: "A live document register",
    description:
      "A clear record of queries, document iterations and agreed milestone dates.",
  },
  {
    title: "Technical regulatory liaison",
    description:
      "Preparation of technical responses and coordination of engagement with the relevant authorities.",
  },
];
const principles: readonly {
  title: string;
  description: string;
  icon: IconName;
}[] = [
  {
    title: "Queries with a response",
    icon: "analysedQueries",
    description:
      "Regulatory questions are analysed alongside recommended actions and draft responses, giving you a clear next step.",
  },
  {
    title: "Accountable named leads",
    icon: "namedLead",
    description:
      "A named point of contact coordinates the work, the document register and communication through the engagement.",
  },
  {
    title: "Evidence alongside approval",
    icon: "financingSynergy",
    description:
      "The evidence for reimbursement is considered alongside the registration strategy, keeping access questions visible.",
  },
  {
    title: "A regional perspective",
    icon: "regionalHarmonisation",
    description:
      "Dossiers are structured with local requirements and regional harmonisation in mind, while checking what each market requires.",
  },
];
export default function PracticePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: "Practice", path: "/practice" }])}
      />
      <IndexRail sections={["01", "02", "03", "04"]} />
      <PageHeader
        title="The practice"
        description="Careful dossiers. Clear communication. An in-country perspective on the decisions that move healthcare products forward."
      />
      <Section index="01" bordered>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="panel">
            <div className="mb-8 flex items-center justify-between gap-4">
              <span className="t-label text-ink-500">
                The Common Technical Document
              </span>
              <span className="t-index text-ink-500">CTD</span>
            </div>
            <h2 className="t-h3 mb-8 mt-0">
              Five modules.
              <br />
              One coherent dossier.
            </h2>
            <ol className="m-0 list-none p-0">
              {modules.map((name, i) => (
                <li
                  key={name}
                  className="flex items-baseline justify-between border-t border-rule py-4"
                >
                  <span>{name}</span>
                  <span className="t-index text-ink-500">M{i + 1}</span>
                </li>
              ))}
            </ol>
            <p className="mb-0 mt-5 text-sm text-ink-500">
              From gap analysis to a filing plan.
            </p>
          </Reveal>
          <div>
            <Reveal>
              <SectionIndex index="01" label="Methodology" />
              <h2 className="t-h2 mb-6 mt-5">
                Dossiers, deadlines, and technical depth
              </h2>
              <p className="t-lede text-ink-700">
                Every engagement begins with the evidence in hand, the gaps to
                close, and the requirements that apply. From there, we agree a
                filing plan and a clear register of responsibilities.
              </p>
            </Reveal>
            <div className="mt-8">
              {commitments.map((item) => (
                <div key={item.title} className="border-t border-rule py-5">
                  <h3 className="m-0 text-base font-medium">{item.title}</h3>
                  <p className="mb-0 mt-2 text-ink-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
      <Section index="02" tone="sunk" bordered>
        <Reveal className="section-top">
          <div>
            <SectionIndex index="02" label="Principles" />
            <h2 className="t-h2">Clarity at every step</h2>
          </div>
          <p>
            The working principles behind our regulatory and market-access
            engagements.
          </p>
        </Reveal>
        <div data-reveal-group className="grid gap-6 md:grid-cols-2">
          {principles.map((item) => (
            <article key={item.title} className="panel">
              <span className="surface-mark mb-7">
                <Mark name={item.icon} size={26} weight="duotone" />
              </span>
              <h3 className="t-h3 m-0">{item.title}</h3>
              <p className="mb-0 mt-4 text-ink-700">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section index="03" bordered>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionIndex index="03" label="People" />
            <h2 className="t-h2 mb-6 mt-5">The people who do the work</h2>
            <p className="max-w-[46ch] text-ink-700">
              Speak with our principal contact about your product, your current
              evidence and the regulatory or access questions ahead.
            </p>
          </Reveal>
          <div data-reveal-group>
            {publicTeam.map((member) => (
              <TeamCard key={member.initials} member={member} />
            ))}
          </div>
        </div>
      </Section>
      <Section index="04" tone="sunk" bordered>
        <div className="panel flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-[620px]">
            <SectionIndex index="04" label="Engagement" />
            <h2 className="t-h2 mb-5 mt-5">
              Start with a confidential dossier gap audit
            </h2>
            <p className="mb-0 text-ink-700">
              Tell us about the product and its current stage. We can agree a
              confidentiality arrangement before proprietary dossier material is
              shared.
            </p>
          </div>
          <Link href="/contact" className="btn btn-primary">
            Discuss an engagement
          </Link>
        </div>
      </Section>
      <MotionProvider />
    </>
  );
}
