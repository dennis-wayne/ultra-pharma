import test, { afterEach, beforeEach, mock } from "node:test";
import assert from "node:assert/strict";
import nodemailer from "nodemailer";
import { NextRequest } from "next/server";
import { POST } from "../app/api/contact/route";
import { emptyContact, validateContact } from "../lib/contact";

const valid = {
  ...emptyContact,
  name: "Local test",
  email: "sender@example.test",
  message: "A local verification enquiry. No external delivery.",
};
const envKeys = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_SECURE",
  "EMAIL_USER",
  "EMAIL_PASS",
  "EMAIL_FROM",
  "CONTACT_INBOX",
];
let previous: Record<string, string | undefined>;
beforeEach(() => {
  previous = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));
  for (const key of envKeys) delete process.env[key];
  Object.assign(process.env, {
    SMTP_HOST: "127.0.0.1",
    SMTP_PORT: "1025",
    EMAIL_FROM: "site@example.test",
    CONTACT_INBOX: "sink@example.test",
  });
});
afterEach(() => {
  mock.restoreAll();
  for (const key of envKeys) {
    if (previous[key] === undefined) delete process.env[key];
    else process.env[key] = previous[key];
  }
});
function request(body: unknown, headers: Record<string, string> = {}) {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}
function transport(accepted = true) {
  const send = mock.fn(async () => ({
    accepted: accepted ? ["sink@example.test"] : [],
    rejected: accepted ? [] : ["sink@example.test"],
  }));
  const close = mock.fn();
  mock.method(nodemailer, "createTransport", () => ({ sendMail: send, close }));
  return { send, close };
}
test("normalizes strings and defaults optional fields without losing the contract", () => {
  const result = validateContact({
    name: " Test ",
    email: "test@example.test",
    message: " Context ",
  });
  assert.equal(result.values?.name, "Test");
  assert.equal(result.values?.message, "Context");
  assert.equal(result.values?.organisation, "");
  assert.deepEqual(result.errors, {});
});
test("rejects malformed optional types and header injection", () => {
  assert.ok(
    validateContact({ ...valid, organisation: {} }).errors.organisation,
  );
  assert.ok(validateContact({ ...valid, phone: 12 }).errors.phone);
  assert.ok(
    validateContact({
      ...valid,
      email: "test@example.test\r\nBcc: hidden@example.test",
    }).errors.email,
  );
  assert.ok(validateContact({ ...valid, need: "Unknown" }).errors.need);
});
test("malformed JSON and non-object bodies return 400", async () => {
  assert.equal((await POST(request("{"))).status, 400);
  assert.equal((await POST(request([]))).status, 400);
});
test("rejects content type, foreign origins and oversized streamed bodies", async () => {
  assert.equal(
    (await POST(request(valid, { "content-type": "text/plain" }))).status,
    415,
  );
  assert.equal(
    (await POST(request(valid, { origin: "https://other.example" }))).status,
    403,
  );
  assert.equal((await POST(request("x".repeat(16001)))).status, 413);
  assert.equal(
    (await POST(request(valid, { "content-length": "16001" }))).status,
    413,
  );
});
test("returns field errors for missing or invalid values", async () => {
  const response = await POST(request({ ...valid, email: "bad", message: "" }));
  const body = await response.json();
  assert.equal(response.status, 400);
  assert.ok(body.fields.email);
  assert.ok(body.fields.message);
});
test("rejects honeypot submissions without claiming a successful send", async () => {
  assert.equal((await POST(request({ ...valid, website: "bot" }))).status, 400);
});
test("missing SMTP configuration fails honestly", async () => {
  delete process.env.SMTP_HOST;
  assert.equal((await POST(request(valid))).status, 503);
});
test("uses the actual Host header when Next normalizes the URL hostname", async () => {
  const { send } = transport();
  const response = await POST(
    request(valid, { host: "127.0.0.1:3100", origin: "http://127.0.0.1:3100" }),
  );
  assert.equal(response.status, 200);
  assert.equal(send.mock.callCount(), 1);
});
test("partial credentials and invalid port fail before transport creation", async () => {
  process.env.EMAIL_USER = "someone";
  assert.equal((await POST(request(valid))).status, 503);
  delete process.env.EMAIL_USER;
  process.env.SMTP_PORT = "NaN";
  assert.equal((await POST(request(valid))).status, 503);
});
test("success requires SMTP acceptance and closes the transport", async () => {
  const { send, close } = transport();
  const response = await POST(request(valid));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(send.mock.callCount(), 1);
  assert.equal(close.mock.callCount(), 1);
  assert.equal(response.headers.get("cache-control"), "no-store");
});
test("rejected recipients never produce success", async () => {
  const { close } = transport(false);
  assert.equal((await POST(request(valid))).status, 502);
  assert.equal(close.mock.callCount(), 1);
});
test("transport exceptions return a recoverable error and close", async () => {
  const close = mock.fn();
  mock.method(nodemailer, "createTransport", () => ({
    sendMail: async () => {
      throw new Error("Local test failure");
    },
    close,
  }));
  assert.equal((await POST(request(valid))).status, 502);
  assert.equal(close.mock.callCount(), 1);
});
test("escapes message markup in the HTML email", async () => {
  let message: { html: string; text: string } | undefined;
  mock.method(nodemailer, "createTransport", () => ({
    sendMail: async (input: typeof message) => {
      message = input;
      return { accepted: ["sink@example.test"], rejected: [] };
    },
    close() {},
  }));
  await POST(
    request({ ...valid, message: "<script>alert(1)</script> & details" }),
  );
  assert.ok(message?.html.includes("&lt;script&gt;"));
  assert.ok(!message?.html.includes("<script>"));
  assert.ok(message?.text.includes("<script>"));
});
