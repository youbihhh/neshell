import { confirmationEmail, notificationEmail } from "../../../lib/email/templates";
import { siteUrl } from "../../../lib/email/send";

const sample = {
  name: "Ama Mensah",
  email: "ama@example.com",
  phone: "+44 7700 900123",
  country: "United Kingdom",
  service: "A ready-made house design",
  design: "The Abusua",
  message:
    "Hello, I have a plot in East Legon and would like to build The Abusua.\nI live in London — can we arrange a video call?",
};

// Development-only preview: /api/email-preview (thank-you) or ?type=notification
export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }
  const type = new URL(request.url).searchParams.get("type");
  const email = type === "notification" ? notificationEmail(sample, siteUrl()) : confirmationEmail(sample, siteUrl());
  return new Response(email.html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
