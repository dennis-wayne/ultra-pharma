const funds = [
  {
    n: "01",
    name: "Primary Healthcare Fund",
    note: "Primary healthcare services",
  },
  {
    n: "02",
    name: "Social Health Insurance Fund",
    note: "Benefits at the tariff set for each service",
  },
  {
    n: "03",
    name: "Emergency, Chronic and Critical Illness Fund",
    note: "Cover beyond the insurance benefit",
  },
] as const;
export function FundsDiagram() {
  return (
    <div className="rounded-[24px] border border-deep-rule p-6 md:p-9">
      <div className="mb-9 flex flex-wrap items-baseline justify-between gap-3">
        <span className="t-label text-deep-ink">SHA coverage</span>
        <span className="t-index text-deep-ink-soft">Three funds</span>
      </div>
      <ol className="m-0 list-none p-0">
        {funds.map((fund) => (
          <li
            key={fund.n}
            className="flex gap-5 border-t border-deep-rule py-6"
          >
            <span className="t-index pt-1 text-deep-ink-soft">{fund.n}</span>
            <div>
              <h3 className="m-0 font-display text-xl font-medium text-deep-ink">
                {fund.name}
              </h3>
              <p className="mb-0 mt-2 text-sm text-deep-ink-soft">
                {fund.note}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <p className="t-index mb-0 mt-3 border-t border-deep-rule pt-5 text-deep-ink-soft">
        Social Health Insurance Act 2023
        <br />
        Benefits Package and Tariffs Advisory Panel
      </p>
    </div>
  );
}
