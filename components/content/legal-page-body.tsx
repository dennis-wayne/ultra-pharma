import { MotionProvider } from "@/components/motion/motion-provider";
import Link from "next/link";
import type { LegalPage } from "@/content/legal";
import { photoCredits } from "@/content/media";
import { PageHeader } from "@/components/structure/page-header";
export function LegalPageBody({ page }: { readonly page: LegalPage }) {
  return (
    <>
      <PageHeader title={page.title} />
      <div className="shell section-space">
        <div className="mx-auto max-w-[720px]">
          <div className="space-y-7 text-lg leading-relaxed text-ink-700">
            {page.body.map((paragraph) => (
              <p key={paragraph} className="m-0">
                {paragraph}
              </p>
            ))}
          </div>
          {page.slug === "terms" && photoCredits.length > 0 && (
            <section className="mt-12 border-t border-rule pt-8">
              <h2 className="t-h3 mt-0">Photography credits</h2>
              <ul className="list-none p-0">
                {photoCredits.map((item) => (
                  <li
                    key={item.slot}
                    className="flex flex-wrap gap-5 border-b border-rule py-4"
                  >
                    <span>{item.photographer}</span>
                    <Link
                      href={item.source}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <Link href="/contact" className="text-link mt-10">
            Contact Ultra Pharma
          </Link>
        </div>
      </div>
      <MotionProvider />
    </>
  );
}
