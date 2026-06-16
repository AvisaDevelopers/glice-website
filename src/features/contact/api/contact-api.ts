import { contactRoutes } from "@/features/contact/api/routes";
import { apiClient } from "@/lib/api-client";

export type SendContactUsPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const CONTACT_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "subject",
  "message",
] as const satisfies readonly (keyof SendContactUsPayload)[];

function getContactPayload(form: HTMLFormElement): SendContactUsPayload {
  const data = new FormData(form);

  return Object.fromEntries(
    CONTACT_FIELDS.map((field) => [
      field,
      String(data.get(field) ?? "").trim(),
    ]),
  ) as SendContactUsPayload;
}

export async function sendContactUs(form: HTMLFormElement): Promise<void> {
  await apiClient.post(
    contactRoutes.sendContactUs,
    getContactPayload(form),
    false,
  );
}
