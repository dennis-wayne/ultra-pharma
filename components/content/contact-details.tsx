import Link from "next/link";
import { channels } from "@/content/site";
export function ContactDetails() {
  return (
    <div className="border-t border-rule">
      {channels.map((channel) => (
        <Link
          className="contact-channel"
          key={channel.label}
          href={channel.href}
          {...(channel.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          <span className="t-label text-ink-500">{channel.label}</span>
          <span className="text-sm font-medium">{channel.value}</span>
        </Link>
      ))}
    </div>
  );
}
