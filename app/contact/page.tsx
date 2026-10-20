import { MotionProvider } from "@/components/motion/motion-provider";
import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { ContactDetails } from "@/components/content/contact-details";
import { PageHeader } from "@/components/structure/page-header";
import { Reveal } from "@/components/primitives/reveal";
import { JsonLd } from "@/components/primitives/json-ld";
import { contactPageSchema, breadcrumbSchema } from "@/lib/schema";
import { Mark } from "@/components/primitives/mark";
import type { IconName } from "@/lib/icons";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Ultra Pharma in Nairobi about PPB registration, HTA evidence, reimbursement and regional market access.",
  alternates: { canonical: "/contact" },
};
const steps: readonly { title: string; description: string; icon: IconName }[] =
  [
    {
      title: "Confidential intake",
      icon: "confidentiality",
      description:
        "Begin with an outline of your enquiry. A confidentiality agreement is available before proprietary dossier data or product details are shared.",
    },
    {
      title: "A named lead",
      icon: "namedLead",
      description:
        "Your enquiry is aligned with a named point of contact, with scope and responsibilities agreed before work begins.",
    },
    {
      title: "A practical roadmap",
      icon: "filingRoadmap",
      description:
        "Once an engagement begins, the work is organised around a document register, milestones and the applicable requirements.",
    },
  ];
export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageSchema()} />
      <JsonLd
        data={breadcrumbSchema([{ name: "Contact", path: "/contact" }])}
      />
      <PageHeader
        title="Let's talk about your next step"
        description="A registration question, an evidence gap, or a regional market-entry plan. Start with a short outline of what you need."
      />
      <section className="shell section-space">
        <div className="grid items-start gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <h2 className="t-h3 mb-7 mt-0">Direct contact</h2>
            <ContactDetails />
            <div className="panel mt-8">
              <span className="t-label text-ink-500">Based in Nairobi</span>
              <p className="mb-0 mt-7 font-display text-3xl leading-tight">
                Local perspective.
                <br />
                Regional reach.
              </p>
              <p className="mb-0 mt-5 text-ink-700">
                Regulatory affairs and market-access support for Kenya and East
                Africa.
              </p>
            </div>
            <p className="mt-6 text-sm text-ink-500">
              Please avoid sending patient information or confidential dossier
              files through this initial enquiry form.
            </p>
          </Reveal>
          <div className="panel">
            <div className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-rule pb-7">
              <div>
                <h2 className="t-h3 m-0">Send an enquiry</h2>
                <p className="mb-0 mt-2 text-ink-500">
                  Tell us where your product stands.
                </p>
              </div>
              <span className="stamp-pill">NDA available on request</span>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
      <section className="border-t border-rule bg-paper-sunk">
        <div className="shell section-space">
          <Reveal className="section-top">
            <div>
              <span className="t-label text-ink-500">Working together</span>
              <h2 className="t-h2">What happens next</h2>
            </div>
          </Reveal>
          <div data-reveal-group className="grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <article key={step.title} className="panel">
                <div className="flex items-center justify-between gap-5">
                  <span className="surface-mark">
                    <Mark name={step.icon} size={26} weight="duotone" />
                  </span>
                  <span className="t-index text-ink-500">0{i + 1}</span>
                </div>
                <h3 className="t-h3 mb-4 mt-7">{step.title}</h3>
                <p className="m-0 text-ink-700">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <MotionProvider />
    </>
  );
}
