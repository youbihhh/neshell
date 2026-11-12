"use server";

import { getDesigns } from "../../lib/designs";
import { sendEnquiryEmails } from "../../lib/email/send";
import { enquiryOptions } from "../../lib/services";
import { site } from "../../lib/site";

export type ContactField = "name" | "email" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
};

export async function sendEnquiry(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const get = (key: string) => String(formData.get(key) ?? "").trim();

  // Hidden "company" field: real visitors never see it, spam bots fill it in
  if (get("company")) {
    return { status: "success", message: "Thank you! We've received your enquiry." };
  }

  const name = get("name");
  const email = get("email");
  const message = get("message");

  const errors: ContactState["errors"] = {};
  if (!name) errors.name = "Please tell us your name.";
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Please tell us a little more about your project.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", errors };
  }

  const serviceLabel = enquiryOptions().find((o) => o.value === get("service"))?.label ?? "";
  const designName = (await getDesigns()).find((d) => d.slug === get("design"))?.name ?? "";

  try {
    await sendEnquiryEmails({
      name,
      email,
      phone: get("phone"),
      country: get("country"),
      service: serviceLabel,
      design: designName,
      message,
    });
  } catch (error) {
    console.error("Enquiry email failed", error);
    return {
      status: "error",
      message: `Sorry, we couldn't send your enquiry just now. Please try again, or call us on ${site.phone.display}.`,
    };
  }

  return {
    status: "success",
    message: `Thank you, ${name.split(" ")[0]}! We've received your enquiry and sent a confirmation to ${email}.`,
  };
}
