import { MotionProvider } from "@/components/motion/motion-provider";
import Link from "next/link";
import { Section, SectionIndex } from "@/components/structure/section";
import { IndexRail } from "@/components/structure/index-rail";
import { Reveal } from "@/components/primitives/reveal";
import { PathwayRail } from "@/components/content/pathway-rail";
import { FundsDiagram } from "@/components/content/funds-diagram";
import { NumberedEntry } from "@/components/content/numbered-entry";
import { TeamCard } from "@/components/content/team-card";
import { InsightCard } from "@/components/content/insight-card";
import { ContactDetails } from "@/components/content/contact-details";
import { ContactForm } from "@/components/forms/contact-form";
import { stages } from "@/content/pathway";
import { entries } from "@/content/entries";
import { publicTeam } from "@/content/team";
import { insights } from "@/content/insights";
import { Mark } from "@/components/primitives/mark";

export default function HomePage() {
  const showInsights = insights.length >= 3;
  const sections = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    ...(showInsights ? ["07"] : []),
    "08",
  ];
  return (
    <>
      <IndexRail sections={sections} />
      <section id="sec-01" data-sec="01" className="hero">
        <div className="shell">
          <div className="hero-layout">
            <div data-hero>
              <p className="t-label m-0 text-ink-500">
                Regulatory affairs &amp; health technology assessment
              </p>
              <h1 className="t-hero">
                <span>Precision in healthcare.</span>{" "}
                <span>Confidence in regulation.</span>
              </h1>
              <p className="hero-description">
                Approval is no longer the finish line. We take healthcare
                products through registration with the Pharmacy and Poisons
                Board, and through the health technology assessment that informs
                funded patient access.
              </p>
              <div className="hero-actions">
                <Link href="#sec-02" className="btn btn-primary" data-magnetic>
                  See the pathway
                </Link>
                <Link href="/contact" className="btn btn-secondary">
                  Talk to us
                </Link>
              </div>
            </div>
            <div data-media-in className="hero-document">
              <span className="hero-document-sheet" aria-hidden />
              <div className="hero-document-inner">
                <div className="hero-document-heading">
                  <span className="t-label text-ink-500">
                    The product pathway
                  </span>
                  <span className="t-index text-ink-500">
                    Kenya / East Africa
                  </span>
                </div>
                <div data-hero-stages>
                  {stages.map((stage) => (
                    <Link
                      key={stage.n}
                      href={stage.href}
                      className="hero-stage"
                      data-featured={stage.isNew || undefined}
                    >
                      <span>{stage.n}</span>
                      <div>
                        <strong>{stage.name}</strong>
                        <p>{stage.question}</p>
                      </div>
                      <span aria-hidden className="text-ink-400">
                        ↗
                      </span>
                    </Link>
                  ))}
                </div>
                <p className="mb-0 mt-5 border-t border-rule pt-5 text-sm text-ink-500">
                  From regulatory approval to the evidence for funded access.
                </p>
              </div>
            </div>
          </div>
          <div className="hero-foot">
            <span>Independent expertise. In-country perspective.</span>
            <span>Nairobi, Kenya / Working across East Africa</span>
          </div>
        </div>
      </section>

      <Section index="02" width="wide">
        <Reveal className="section-top">
          <div>
            <SectionIndex index="02" label="The pathway" />
            <h2 className="t-h2">From approval to funded access</h2>
          </div>
          <p>
            Four stages. A product can be registered and still sit outside the
            benefits package. We work across the full pathway.
          </p>
        </Reveal>
        <PathwayRail />
      </Section>

      <section
        id="sec-03"
        data-sec="03"
        className="bg-paper-deep text-deep-ink"
      >
        <div className="shell section-space grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-slide-in="left">
            <FundsDiagram />
          </div>
          <div data-slide-in="right">
            <span className="t-label text-deep-ink-soft">
              Reimbursement / Stage 03
            </span>
            <h2 className="t-h2 mb-6 mt-5">
              Registered is not the same as reimbursed.
            </h2>
            <p className="text-deep-ink-soft">
              Kenya replaced NHIF with the Social Health Authority under the
              Social Health Insurance Act 2023. What SHA pays for, and at what
              tariff, is shaped by health technology assessment through the
              Benefits Package and Tariffs Advisory Panel.
            </p>
            <p className="mt-5 text-deep-ink-soft">
              A product can be fully registered with the Pharmacy and Poisons
              Board and still sit outside the benefits package, competing on
              out-of-pocket price against a funded alternative. Closing that gap
              is a different discipline from registration.
            </p>
            <Link href="/services/reimbursement" className="btn btn-deep mt-7">
              Explore health product assessment
            </Link>
          </div>
        </div>
      </section>

      <Section index="04" width="wide">
        <Reveal className="section-top">
          <div>
            <SectionIndex index="04" label="Services" />
            <h2 className="t-h2">What each stage delivers</h2>
          </div>
          <Link href="/services" className="btn btn-secondary">
            All services
          </Link>
        </Reveal>
        <div data-reveal-group className="service-bento">
          {stages.map((stage) => (
            <article
              key={stage.n}
              className="panel service-bento-card"
              data-stage={stage.n}
            >
              <div className="service-bento-top">
                <div className="flex items-center gap-3">
                  <Mark
                    name={stage.icon}
                    size={24}
                    weight="duotone"
                    className="text-ink-500"
                  />
                  <span className="t-index text-ink-500">Stage {stage.n}</span>
                </div>
                {stage.isNew && (
                  <span className="stamp-pill">Reimbursement &amp; HTA</span>
                )}
              </div>
              <div className="service-bento-copy">
                <h3 className="t-h3 m-0">{stage.name}</h3>
                <p className="mb-0 mt-3 font-display text-xl text-ink-500">
                  {stage.question}
                </p>
                <p className="mb-6 mt-5 max-w-[54ch] text-ink-700">
                  {stage.blurb}
                </p>
              </div>
              <ul className="service-deliverables">
                {stage.deliverables.map((item) => (
                  <li key={item.label}>{item.label}</li>
                ))}
              </ul>
              <Link href={stage.href} className="text-link service-bento-link">
                {stage.name} in detail
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <div className="chapter-divider">
        <div className="shell flex flex-wrap items-baseline justify-between gap-5">
          <p>Precision in the detail. Confidence in the next step.</p>
          <span className="t-index text-ink-500">
            Ultra Pharma / The practice
          </span>
        </div>
      </div>

      <Section index="05" width="wide">
        <Reveal className="section-top">
          <div>
            <SectionIndex index="05" label="Practice" />
            <h2 className="t-h2">Why partners choose Ultra Pharma</h2>
          </div>
          <p>
            Practical systems, in-country knowledge, and delivery models built
            to move healthcare products forward in Kenya and across Africa.
          </p>
        </Reveal>
        <div className="practice-bento" data-reveal-group>
          {entries.map((entry) => (
            <NumberedEntry key={entry.n} entry={entry} />
          ))}
        </div>
      </Section>

      <Section index="06" tone="sunk" bordered>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionIndex index="06" label="People" />
            <h2 className="t-h2 mb-6 mt-5">The people who do the work</h2>
            <p className="max-w-[48ch] text-ink-700">
              Start a conversation with our principal contact about your
              product, the evidence you have, and the next decision you need to
              make.
            </p>
            <Link href="/practice" className="text-link mt-3">
              How the practice works
            </Link>
          </Reveal>
          <div data-reveal-group>
            {publicTeam.map((member) => (
              <TeamCard key={member.initials} member={member} />
            ))}
          </div>
        </div>
      </Section>

      {showInsights && (
        <Section index="07">
          <Reveal className="section-top">
            <div>
              <SectionIndex index="07" label="Insights" />
              <h2 className="t-h2">Regulatory and access analysis</h2>
            </div>
            <Link href="/insights" className="btn btn-secondary">
              All insights
            </Link>
          </Reveal>
          <div
            data-reveal-group
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {insights.slice(0, 3).map((post) => (
              <InsightCard key={post.slug} post={post} />
            ))}
          </div>
        </Section>
      )}

      <Section index="08" bordered>
        <div className="grid items-start gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <SectionIndex index="08" label="Contact" />
            <h2 className="t-h2 mb-6 mt-5">Talk to us</h2>
            <p className="mb-8 max-w-[46ch] text-ink-700">
              Regulatory guidance, a proposal, or rapid-response support on
              something already in motion.
            </p>
            <ContactDetails />
            <p className="mt-6 text-sm text-ink-500">
              Prefer email? Contact us directly with a short outline of your
              enquiry.
            </p>
          </Reveal>
          <div className="panel">
            <ContactForm />
          </div>
        </div>
      </Section>
      <MotionProvider />
    </>
  );
}
