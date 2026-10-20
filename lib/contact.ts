export const needOptions = [
  "Registration & PPB Submissions",
  "Market Entry & Regional Expansion",
  "Reimbursement & HTA (SHA / BPTAP)",
  "Quality & Compliance Audits",
  "General Advisory or Rapid Response",
] as const;
export const limits = {
  name: 120,
  organisation: 180,
  email: 254,
  phone: 60,
  need: 100,
  message: 5000,
} as const;
export type ContactValues = Record<keyof typeof limits, string>;
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;
export const emptyContact: ContactValues = {
  name: "",
  organisation: "",
  email: "",
  phone: "",
  need: needOptions[0],
  message: "",
};
export function validateContact(input: unknown): {
  values?: ContactValues;
  errors: ContactErrors;
} {
  if (!input || typeof input !== "object" || Array.isArray(input))
    return {
      errors: {
        name: "Enter your name.",
        email: "Enter your email address.",
        message: "Add a short outline of your enquiry.",
      },
    };
  const source = input as Record<string, unknown>;
  const values = { ...emptyContact };
  const errors: ContactErrors = {};
  for (const key of Object.keys(limits) as Array<keyof ContactValues>) {
    if (source[key] !== undefined && typeof source[key] !== "string") {
      errors[key] = "Enter a text value.";
      continue;
    }
    values[key] =
      typeof source[key] === "string"
        ? source[key].trim()
        : key === "need"
          ? needOptions[4]
          : "";
    if (values[key].length > limits[key])
      errors[key] = `Use ${limits[key]} characters or fewer.`;
  }
  if (!values.name) errors.name = "Enter your name.";
  if (!values.email) errors.email = "Enter your email address.";
  else if (!/^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/.test(values.email))
    errors.email = "Enter a valid email address.";
  if (/[\r\n]/.test(values.name)) errors.name = "Enter your name on one line.";
  if (!values.message) errors.message = "Add a short outline of your enquiry.";
  if (!(needOptions as readonly string[]).includes(values.need))
    errors.need = "Choose a service from the list.";
  return Object.keys(errors).length ? { errors } : { values, errors };
}
