import Link from "next/link";
export default function NotFound() {
  return (
    <section className="shell pb-24 pt-40 text-center md:pb-32 md:pt-48">
      <span className="t-index text-ink-500">404 / Page not found</span>
      <h1 className="t-h1 mb-6 mt-6">That page is not here</h1>
      <p className="mx-auto max-w-[48ch] text-ink-700">
        The address may have changed. Explore our services or contact us for
        help with your enquiry.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link href="/services" className="btn btn-primary">
          Explore services
        </Link>
        <Link href="/contact" className="btn btn-secondary">
          Contact us
        </Link>
      </div>
    </section>
  );
}
