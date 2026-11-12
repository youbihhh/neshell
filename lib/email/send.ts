import nodemailer, { type Transporter } from "nodemailer";
import { site } from "../site";
import { confirmationEmail, notificationEmail, type Enquiry } from "./templates";

// Absolute site address, used for the logo and links inside the emails
export const siteUrl = () => (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

let transporter: Transporter | undefined;

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error("Email is not configured: set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local");
  }
  transporter ??= nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  return { transporter, user };
}

/**
 * Sends the enquiry to the company inbox, then a thank-you email to the visitor.
 * Throws only if the company copy fails — that's the one that must not be lost.
 */
export async function sendEnquiryEmails(enquiry: Enquiry) {
  const { transporter, user } = getTransporter();
  const inbox = process.env.ENQUIRY_INBOX || user;
  const from = `"${site.name}" <${user}>`;
  const url = siteUrl();

  await transporter.sendMail({
    from,
    to: inbox,
    replyTo: `"${enquiry.name}" <${enquiry.email}>`,
    ...notificationEmail(enquiry, url),
  });

  try {
    await transporter.sendMail({
      from,
      to: enquiry.email,
      replyTo: inbox,
      ...confirmationEmail(enquiry, url),
    });
  } catch (error) {
    // The team still has the enquiry, so don't fail the visitor's submission
    console.error("Could not send confirmation email to", enquiry.email, error);
  }
}
