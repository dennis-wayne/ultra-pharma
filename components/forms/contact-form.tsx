"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import {
  emptyContact,
  limits,
  needOptions,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact";

export function ContactForm() {
  const prefix = useId();
  const [values, setValues] = useState<ContactValues>({ ...emptyContact });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "error" | "sent"
  >("idle");
  const [attempts, setAttempts] = useState(0);
  const summary = useRef<HTMLDivElement>(null);
  const sent = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLInputElement>(null);
  const pending = useRef(false);
  const controller = useRef<AbortController | null>(null);
  const honey = useRef<HTMLInputElement>(null);
  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => {
    if (status === "sent") sent.current?.focus();
    else if (status === "error") summary.current?.focus();
  }, [status]);
  const set = (key: keyof ContactValues, value: string) => {
    setValues((old) => ({ ...old, [key]: value }));
    setErrors((old) => ({ ...old, [key]: undefined }));
  };
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const validation = validateContact(values);
    if (!validation.values) {
      setErrors(validation.errors);
      setStatus("error");
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    pending.current = true;
    setErrors({});
    setStatus("submitting");
    controller.current = new AbortController();
    const timeout = setTimeout(() => controller.current?.abort(), 20000);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validation.values,
          website: honey.current?.value ?? "",
        }),
        signal: controller.current.signal,
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        if (result.fields) setErrors(result.fields);
        throw new Error("Send failed");
      }
      setStatus("sent");
      setAttempts(0);
    } catch {
      setStatus("error");
      setAttempts((old) => old + 1);
    } finally {
      clearTimeout(timeout);
      pending.current = false;
    }
  }
  if (status === "sent")
    return (
      <div
        ref={sent}
        tabIndex={-1}
        data-slot="contact-success"
        className="py-10 outline-none"
        role="status"
      >
        <span className="stamp-pill">Enquiry sent</span>
        <h3 className="t-h3 mb-4 mt-7">Thank you for getting in touch.</h3>
        <p className="text-ink-700">
          Your enquiry was accepted for sending. If the matter is
          time-sensitive, you can also contact us directly at{" "}
          <Link href={`mailto:${site.email}`} className="underline">
            {site.email}
          </Link>
          .
        </p>
        <button
          type="button"
          className="btn btn-secondary mt-6"
          onClick={() => {
            setValues({ ...emptyContact });
            setErrors({});
            setStatus("idle");
            requestAnimationFrame(() => first.current?.focus());
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  const field = (
    key: "name" | "organisation" | "email" | "phone",
    label: string,
    autoComplete: string,
    required = false,
    type = "text",
  ) => (
    <div>
      <label htmlFor={`${prefix}-${key}`} className="field-label">
        {label}
        {!required && (
          <span className="font-normal text-ink-500"> (optional)</span>
        )}
      </label>
      <input
        ref={key === "name" ? first : undefined}
        id={`${prefix}-${key}`}
        name={key}
        type={type}
        autoComplete={autoComplete}
        required={required}
        maxLength={limits[key]}
        className="field"
        value={values[key]}
        onChange={(event) => set(key, event.target.value)}
        aria-invalid={Boolean(errors[key]) || undefined}
        aria-describedby={errors[key] ? `${prefix}-${key}-error` : undefined}
      />
      {errors[key] && (
        <p id={`${prefix}-${key}-error`} className="field-error">
          {errors[key]}
        </p>
      )}
    </div>
  );
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-busy={status === "submitting"}
      className="space-y-6"
    >
      <p className="m-0 text-sm text-ink-500">
        Name, email and enquiry are required.
      </p>
      {status === "error" && (
        <div ref={summary} tabIndex={-1} role="alert" className="form-notice">
          <p className="m-0 font-medium">
            {Object.values(errors).some(Boolean)
              ? "Please check the details below."
              : "Your enquiry could not be sent."}
          </p>
          <p className="mb-0 mt-2">
            {Object.values(errors).some(Boolean)
              ? "Correct the marked fields and try again."
              : "Your details have been kept. Please try again."}
            {attempts >= 2 && (
              <>
                {" "}
                You can also email{" "}
                <Link href={`mailto:${site.email}`} className="underline">
                  {site.email}
                </Link>
                .
              </>
            )}
          </p>
          {Object.entries(errors).some(([, value]) => value) && (
            <ul className="mb-0 mt-3 list-disc pl-5">
              {Object.entries(errors)
                .filter(([, value]) => value)
                .map(([key, message]) => (
                  <li key={key}>
                    <a
                      href={`#${prefix}-${key}`}
                      onClick={(event) => {
                        event.preventDefault();
                        document.getElementById(`${prefix}-${key}`)?.focus();
                      }}
                      className="underline"
                    >
                      {message}
                    </a>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
      <fieldset
        disabled={status === "submitting"}
        className="m-0 space-y-6 border-0 p-0"
      >
        <legend className="sr-only">Enquiry details</legend>
        <div className="grid gap-6 md:grid-cols-2">
          {field("name", "Your name", "name", true)}
          {field("organisation", "Organisation", "organization")}
          {field("email", "Email address", "email", true, "email")}
          {field("phone", "Phone number", "tel", false, "tel")}
        </div>
        <div>
          <label htmlFor={`${prefix}-need`} className="field-label">
            What do you need help with?
          </label>
          <select
            id={`${prefix}-need`}
            name="need"
            className="field"
            value={values.need}
            onChange={(event) => set("need", event.target.value)}
            aria-invalid={Boolean(errors.need) || undefined}
            aria-describedby={errors.need ? `${prefix}-need-error` : undefined}
          >
            {needOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          {errors.need && (
            <p id={`${prefix}-need-error`} className="field-error">
              {errors.need}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${prefix}-message`} className="field-label">
            Your enquiry
          </label>
          <textarea
            id={`${prefix}-message`}
            name="message"
            className="field"
            rows={5}
            maxLength={limits.message}
            required
            value={values.message}
            onChange={(event) => set("message", event.target.value)}
            aria-invalid={Boolean(errors.message) || undefined}
            aria-describedby={`${prefix}-message-help${errors.message ? ` ${prefix}-message-error` : ""}`}
          />
          <p
            id={`${prefix}-message-help`}
            className="mb-0 mt-2 text-sm text-ink-500"
          >
            A short outline of the product, current stage and support you need.
            Please keep confidential files for a later conversation.
          </p>
          {errors.message && (
            <p id={`${prefix}-message-error`} className="field-error">
              {errors.message}
            </p>
          )}
        </div>
        <div className="absolute -left-[10000px]" aria-hidden>
          <label htmlFor={`${prefix}-website`}>Leave this field empty</label>
          <input
            ref={honey}
            id={`${prefix}-website`}
            name="website"
            autoComplete="off"
            tabIndex={-1}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-rule pt-6">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending enquiry..." : "Send enquiry"}
          </button>
          <Link
            href="/legal/privacy"
            className="text-sm text-ink-500 underline"
          >
            How we handle your information
          </Link>
        </div>
      </fieldset>
      <span role="status" className="sr-only">
        {status === "submitting" ? "Sending your enquiry. Please wait." : ""}
      </span>
    </form>
  );
}
