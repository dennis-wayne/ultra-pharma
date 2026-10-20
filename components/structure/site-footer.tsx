import Link from "next/link";
import { footerColumns, site } from "@/content/site";
import { Wordmark } from "./wordmark";
export function SiteFooter() {
  return (
    <footer
      data-slot="site-footer"
      className="border-t border-rule bg-paper-sunk"
    >
      <div className="shell grid gap-12 py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Wordmark />
          <p className="mb-7 mt-5 max-w-[38ch] text-ink-700">
            {site.description}
          </p>
          <span className="text-sm text-ink-500">
            {site.location} / Kenya &amp; East Africa
          </span>
          <p className="mb-0 mt-5">
            <Link href={`mailto:${site.email}`} className="text-link">
              {site.email}
            </Link>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={`Footer ${column.title}`}>
              <h2 className="t-label mb-5 mt-0 text-ink-900">{column.title}</h2>
              <ul className="m-0 list-none space-y-3 p-0">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="inline-block py-1 text-sm text-ink-700 no-underline hover:text-ink-900 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="shell flex flex-wrap justify-between gap-4 border-t border-rule py-6 text-xs text-ink-500">
        <p className="m-0">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p className="m-0">{site.tagline}</p>
      </div>
    </footer>
  );
}
