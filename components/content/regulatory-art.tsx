import type { ReactNode } from "react";

/** The labels describe the work; no sample product data or approval status is shown. */
export function StageDocumentContent({ index }: { readonly index: number }) {
  const contents: readonly ReactNode[] = [
    <g key="dossier">
      <text className="document-label" x="-36" y="-121">
        Quality
      </text>
      <path className="document-divider" d="M-36-111h94" />
      <text className="document-label" x="-36" y="-95">
        Clinical
      </text>
      <path className="document-divider" d="M-36-85h94" />
      <rect x="-36" y="-63" width="6" height="6" rx="1" />
      <text className="document-label" x="-20" y="-56">
        Module review
      </text>
      <rect x="-36" y="-43" width="6" height="6" rx="1" />
      <text className="document-label" x="-20" y="-36">
        Filing plan
      </text>
    </g>,
    <g key="reach">
      <rect x="-36" y="-127" width="94" height="32" rx="4" />
      <text className="document-label" x="-24" y="-109">
        Kenya
      </text>
      <path className="document-divider" d="M11-95v21" />
      <rect x="-36" y="-74" width="94" height="32" rx="4" />
      <text className="document-label" x="-24" y="-54">
        East Africa
      </text>
    </g>,
    <g key="evidence">
      <text className="document-label" x="-36" y="-117">
        Clinical evidence
      </text>
      <path className="document-divider" d="M-36-104h94M-36-94h60" />
      <text className="document-label" x="-36" y="-72">
        Economic case
      </text>
      <path className="document-divider" d="M-36-59h94M-36-49h60" />
    </g>,
    <g key="lifecycle">
      <path className="document-divider" d="M-27-123v80" />
      {[-123, -84, -45].map((y, i) => (
        <g key={y}>
          <circle cx="-27" cy={y} r="3.5" />
          <text className="document-label" x="-15" y={y + 3}>
            {["Monitoring", "Variations", "Renewals"][i]}
          </text>
        </g>
      ))}
    </g>,
  ];
  return (
    <>
      {contents[index] ?? null}
      <path className="document-footer" d="M-36-21h94" />
    </>
  );
}

export function DossierIllustration() {
  const modules = [
    "Regional requirements",
    "Evidence summaries",
    "Quality documentation",
    "Nonclinical evidence",
    "Clinical evidence",
  ];
  return (
    <svg
      className="supporting-art dossier-art"
      viewBox="0 0 420 260"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        className="supporting-art-paper"
        x="69"
        y="17"
        width="302"
        height="221"
        rx="12"
      />
      <rect
        className="supporting-art-paper"
        x="59"
        y="25"
        width="302"
        height="221"
        rx="12"
      />
      <rect
        className="supporting-art-paper"
        x="49"
        y="33"
        width="302"
        height="221"
        rx="12"
      />
      <text className="supporting-art-title" x="71" y="62">
        Submission dossier
      </text>
      <text className="supporting-art-label" x="71" y="81">
        Common Technical Document
      </text>
      <path className="supporting-art-line" d="M71 96h258" />
      {modules.map((label, index) => (
        <g key={label} transform={`translate(71 ${119 + index * 26})`}>
          <text className="supporting-art-label" x="0" y="0">
            M{index + 1}
          </text>
          <text className="supporting-art-label" x="35" y="0">
            {label}
          </text>
          <path className="supporting-art-line" d="M248-5h10" />
        </g>
      ))}
    </svg>
  );
}

export function AccessIllustration() {
  return (
    <svg
      className="supporting-art access-art"
      viewBox="0 0 360 180"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="supporting-art-paper"
        d="M31 18h95l18 18v122H19V30a12 12 0 0 1 12-12Z"
      />
      <text className="supporting-art-title" x="35" y="58">
        Registration
      </text>
      <path
        className="supporting-art-line"
        d="M126 18v18h18M35 73h92M35 126h92"
      />
      <text className="supporting-art-label" x="35" y="94">
        Quality &amp; safety
      </text>
      <text className="supporting-art-label" x="35" y="112">
        Clinical evidence
      </text>
      <path
        className="supporting-art-bridge"
        d="M154 90h52"
        strokeDasharray="3 6"
      />
      <rect
        className="supporting-art-paper"
        x="216"
        y="18"
        width="125"
        height="140"
        rx="12"
      />
      <text className="supporting-art-title" x="232" y="58">
        Access case
      </text>
      <path className="supporting-art-line" d="M232 73h92M232 126h92" />
      <text className="supporting-art-label" x="232" y="94">
        Comparative value
      </text>
      <text className="supporting-art-label" x="232" y="112">
        Budget impact
      </text>
    </svg>
  );
}
