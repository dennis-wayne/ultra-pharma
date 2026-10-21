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
import { DossierIllustration } from "@/components/content/regulatory-art";
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
      "When a regulator raises a question, we help your team understand it, agree the action and prepare a response.",
  },
  {
    title: "Accountable named leads",
    icon: "namedLead",
    description:
      "You have a named person to speak to about the work, the document register and any questions along the way.",
  },
  {
    title: "Evidence alongside approval",
    icon: "financingSynergy",
    description:
      "We consider reimbursement evidence alongside registration, so access questions are part of the plan early on.",
  },
  {
    title: "A regional perspective",
    icon: "regionalHarmonisation",
    description:
      "We structure the dossier so you can reuse the work, then check what needs to change for each market.",
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
        title="How we work"
        description="We start with your product and the evidence you already have. Then we agree the gaps to close, who is responsible and how to keep the work moving."
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
            <DossierIllustration />
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
              A coherent filing plan begins with a complete evidence review.
            </p>
          </Reveal>
          <div>
            <Reveal>
              <SectionIndex index="01" label="Methodology" />
              <h2 className="t-h2 mb-6 mt-5">
                Start with what is in the dossier
              </h2>
              <p className="t-lede text-ink-700">
                We review the evidence you have against the requirements that
                apply. That gives us a practical starting point for the filing
                plan and a clear record of who will handle each part.
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
            <h2 className="t-h2">You should know where the work stands</h2>
          </div>
          <p>
            The way we handle questions, responsibilities and evidence should
            make your next decision easier to understand.
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
              Want to understand the gaps in your dossier?
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
