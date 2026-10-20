"use client";

import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="shell pb-24 pt-40 text-center">
      <span className="t-label text-ink-500">Page unavailable</span>
      <h1 className="t-h1 mb-6 mt-6">Let&apos;s try that again</h1>
      <p className="mx-auto max-w-[46ch] text-ink-700">
        The page could not be loaded. Try again, or contact us directly for help
        with your enquiry.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" className="btn btn-primary" onClick={reset}>
          Try again
        </button>
        <Link href="/contact" className="btn btn-secondary">
          Contact us
        </Link>
      </div>
    </section>
  );
}
