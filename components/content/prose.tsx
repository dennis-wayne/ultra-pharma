import type { ReactNode } from "react";
export function Prose({ children }: { readonly children: ReactNode }) {
  return <div data-slot="prose">{children}</div>;
}
