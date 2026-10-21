import Link from "next/link";
import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  parent,
  children,
}: {
  readonly title: string;
  readonly description?: string;
  readonly parent?: { label: string; href: string };
  readonly children?: ReactNode;
}) {
  return (
    <header className="page-header">
      <div className="shell" data-hero>
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Ultra Pharma</Link>
          <span aria-hidden>/</span>
          {parent && (
            <>
              <Link href={parent.href}>{parent.label}</Link>
              <span aria-hidden>/</span>
            </>
          )}
          <span>{parent ? "Reimbursement" : title}</span>
        </nav>
        <div className="page-header-main">
          <h1 className="t-h1">{title}</h1>
          {description && <p className="t-lede">{description}</p>}
        </div>
        {children && <div className="page-header-extra">{children}</div>}
      </div>
    </header>
  );
}
