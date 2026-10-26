import { MotionProvider } from "@/components/motion/motion-provider";
import Link from "next/link";
import { Section, SectionIndex } from "@/components/structure/section";
import { IndexRail } from "@/components/structure/index-rail";
import { Reveal } from "@/components/primitives/reveal";
import { PathwayRail } from "@/components/content/pathway-rail";
import { FundsDiagram } from "@/components/content/funds-diagram";
import { NumberedEntry } from "@/components/content/numbered-entry";
import { InsightCard } from "@/components/content/insight-card";
import { ContactDetails } from "@/components/content/contact-details";
import { ContactForm } from "@/components/forms/contact-form";
import { stages } from "@/content/pathway";
import { entries } from "@/content/entries";
import { insights } from "@/content/insights";
import { Mark } from "@/components/primitives/mark";
import { HeroPathway } from "@/components/content/hero-pathway";

export default function HomePage() {
  const showInsights = insights.length >= 3;
  const sections = ["01", "02", "03", "04", "05", "06"];
  return (
    <>
      <IndexRail sections={sections} />
      <section id="sec-01" data-sec="01" className="hero">
        <div className="shell">
          <div className="hero-layout">
            <div data-hero className="hero-copy">
              <p className="hero-discipline">
                Regulatory affairs &amp; health technology assessment
              </p>
              <h1 className="t-hero">
                <span>From evidence</span> <span>to access.</span>
              </h1>
              <p className="hero-promise">
                <span className="hero-promise-key">Precision</span>{" "}
                <span>in healthcare.</span>{" "}
                <span className="hero-promise-key">Confidence</span>{" "}
                <span>in regulation.</span>
              </p>
              <p className="hero-description">
                We help you prepare for Pharmacy and Poisons Board registration
                and make the case for funded access. Tell us about your product
                and the question you need to answer.
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
            <HeroPathway
              stages={stages.map(({ n, name, question, href }) => ({
                n,
                name,
                question,
                href,
              }))}
            />
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
            <h2 className="t-h2">Where does your product go next?</h2>
          </div>
          <p>
            Registration is one part of the work. Your product may also need a
            plan for another market, reimbursement or changes after approval.
          </p>
        </Reveal>
        <PathwayRail />
      </Section>

      <div className="chapter-divider">
        <div className="shell flex flex-wrap items-baseline justify-between gap-5">
          <p>A clear plan matters as much as a complete dossier.</p>
          <span className="t-index text-ink-500">
            Ultra Pharma / The practice
          </span>
        </div>
      </div>

      <Section index="03" width="wide" className="home-practice">
        <Reveal className="section-top">
          <div>
            <SectionIndex index="03" label="Practice" />
            <h2 className="t-h2">What working with us looks like</h2>
          </div>
          <p>
            You should know what we are working on, who is responsible and what
            needs to happen next. Here is how we organise the work.
          </p>
        </Reveal>
        <div className="practice-bento" data-reveal-group>
          {entries.map((entry) => (
            <NumberedEntry key={entry.n} entry={entry} />
          ))}
        </div>
      </Section>

      <Section index="04" width="wide">
        <Reveal className="section-top">
          <div>
            <SectionIndex index="04" label="Services" />
            <h2 className="t-h2">Help with the work ahead</h2>
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
        {showInsights && (
          <div className="home-insights">
            <Reveal className="section-top">
              <div>
                <span className="t-label text-ink-500">
                  Insights from the practice
                </span>
                <h2 className="t-h2">A closer look at regulation and access</h2>
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
          </div>
        )}
      </Section>

      <section
        id="sec-05"
        data-sec="05"
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
            <h2 className="t-h2 t-statement mb-6 mt-5">
              Registration does not settle the funding question.
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

      <Section index="06" bordered>
        <div className="grid items-start gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <SectionIndex index="06" label="Contact" />
            <h2 className="t-h2 mb-6 mt-5">Talk to us</h2>
            <p className="mb-8 max-w-[46ch] text-ink-700">
              A short outline of your product and the help you need is enough to
              start. You can use the form or contact us directly.
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
