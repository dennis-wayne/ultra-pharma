import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/content/site";
import { validateContact } from "@/lib/contact";

const MAX_BYTES = 16000;
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
const reply = (body: object, status: number) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      const source = new URL(origin);
      const host = request.headers.get("host") ?? request.nextUrl.host;
      if (
        !["http:", "https:"].includes(source.protocol) ||
        source.host !== host
      )
        return reply({ error: "Request origin not allowed" }, 403);
    } catch {
      return reply({ error: "Request origin not allowed" }, 403);
    }
  }
  if (!request.headers.get("content-type")?.includes("application/json"))
    return reply({ error: "JSON required" }, 415);
  if (Number(request.headers.get("content-length")) > MAX_BYTES)
    return reply({ error: "Enquiry too large" }, 413);
  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply({ error: "Missing enquiry" }, 400);
    let bytes = 0;
    let raw = "";
    const decoder = new TextDecoder();
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > MAX_BYTES) {
        await reader.cancel();
        return reply({ error: "Enquiry too large" }, 413);
      }
      raw += decoder.decode(chunk.value, { stream: true });
    }
    body = JSON.parse(raw + decoder.decode());
  } catch {
    return reply({ error: "Malformed request" }, 400);
  }
  if (body && typeof body === "object" && "website" in body && body.website)
    return reply({ error: "Enquiry could not be accepted" }, 400);
  const { values, errors } = validateContact(body);
  if (!values)
    return reply({ error: "Check enquiry details", fields: errors }, 400);
  const host = process.env.SMTP_HOST;
  if (!host) return reply({ error: "Enquiry service unavailable" }, 503);
  const port = Number(process.env.SMTP_PORT ?? "465");
  if (!Number.isInteger(port) || port < 1 || port > 65535)
    return reply({ error: "Enquiry service unavailable" }, 503);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (Boolean(user) !== Boolean(pass))
    return reply({ error: "Enquiry service unavailable" }, 503);
  const { name, organisation, email, phone, need, message } = values;
  const rows = [
    ["Name", name],
    ["Organisation", organisation || "Not given"],
    ["Email", email],
    ["Phone", phone || "Not given"],
    ["Need", need],
  ];
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : port === 465,
    ...(user && pass ? { auth: { user, pass } } : {}),
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  try {
    const result = await transporter.sendMail({
      from: process.env.EMAIL_FROM || user || site.email,
      to: process.env.CONTACT_INBOX || site.email,
      replyTo: email,
      subject: `Website enquiry: ${need}, ${name}`,
      text: [
        ...rows.map(([key, value]) => `${key}: ${value}`),
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `<dl>${rows.map(([key, value]) => `<dt>${key}</dt><dd>${escapeHtml(value)}</dd>`).join("")}</dl><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });
    if (!result.accepted?.length || result.rejected?.length)
      return reply({ error: "Delivery failed" }, 502);
    return reply({ ok: true }, 200);
  } catch {
    // Do not log enquiry contents, credentials or transport errors containing them.
    console.error("Contact transport failed");
    return reply({ error: "Delivery failed" }, 502);
  } finally {
    transporter.close();
  }
}
