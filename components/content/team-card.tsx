import Link from "next/link";
import type { TeamMember } from "@/content/team";
export function TeamCard({ member }: { readonly member: TeamMember }) {
  if (!member.verified) return null;
  return (
    <article
      data-slot="team-card"
      className="panel flex min-h-[280px] flex-col justify-between"
    >
      <div className="flex items-start justify-between gap-6">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-rule bg-paper-sunk font-display text-2xl">
          {member.initials}
        </span>
        <span className="t-label text-ink-500">Nairobi, Kenya</span>
      </div>
      <div className="mt-8">
        <h3 className="t-h3 t-editorial m-0">{member.name ?? member.role}</h3>
        <p className="mb-0 mt-2 text-ink-500">{member.role}</p>
        {member.credentials && (
          <p className="text-ink-700">{member.credentials}</p>
        )}
        {member.email && (
          <Link
            href={`mailto:${member.email}`}
            className="text-link mt-5 break-all"
          >
            {member.email}
          </Link>
        )}
        {member.linkedin && (
          <Link
            href={member.linkedin}
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn profile
          </Link>
        )}
      </div>
    </article>
  );
}
