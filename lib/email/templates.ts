import { site, whatsappLink } from "../site";

export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  country: string;
  service: string; // human-readable label
  design: string; // human-readable name
  message: string;
};

type Email = { subject: string; html: string; text: string };

const ORANGE = "#FF8C00";
const DARK = "#09090b";
const FONT = "'Poppins', 'Segoe UI', Helvetica, Arial, sans-serif";

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const nl2br = (value: string) => escape(value).replace(/\r?\n/g, "<br>");

const firstName = (name: string) => name.trim().split(/\s+/)[0] || "there";

// Rows for the "your enquiry" summary, skipping anything left blank
function summaryRows(enquiry: Enquiry) {
  return [
    ["Interested in", enquiry.service],
    ["House design", enquiry.design],
    ["Country", enquiry.country],
    ["Phone / WhatsApp", enquiry.phone],
  ].filter(([, value]) => value);
}

// Shared outer shell: dark header with the logo, white card, dark footer.
// Built with tables and inline styles so it renders in Gmail, Outlook and Apple Mail.
function layout({ siteUrl, preheader, body }: { siteUrl: string; preheader: string; body: string }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<title>${escape(site.name)}</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  @media (max-width: 620px) {
    .container { width: 100% !important; }
    .px { padding-left: 24px !important; padding-right: 24px !important; }
    .h1 { font-size: 26px !important; line-height: 34px !important; }
    .stack { display: block !important; width: 100% !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escape(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;">
  <tr>
    <td align="center" style="padding:32px 12px;">
      <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;">
        <tr>
          <td align="center" style="background:${DARK};padding:32px 40px;">
            <a href="${siteUrl}" style="text-decoration:none;">
              <img src="${siteUrl}/images/logo1.png" width="170" alt="${escape(site.name)}" style="display:block;width:170px;max-width:100%;height:auto;border:0;">
            </a>
          </td>
        </tr>
        <tr><td style="height:4px;line-height:4px;font-size:0;background:${ORANGE};">&nbsp;</td></tr>
        ${body}
        <tr>
          <td class="px" style="background:${DARK};padding:32px 40px;font-family:${FONT};color:#a1a1aa;font-size:13px;line-height:22px;">
            <p style="margin:0 0 4px;color:#ffffff;font-size:15px;font-weight:600;">${escape(site.name)}</p>
            <p style="margin:0 0 16px;color:${ORANGE};">${escape(site.tagline)}</p>
            <p style="margin:0;">
              <a href="${site.phone.href}" style="color:#d4d4d8;text-decoration:none;">${escape(site.phone.display)}</a>
              &nbsp;&middot;&nbsp;
              <a href="mailto:${site.email}" style="color:#d4d4d8;text-decoration:none;">${escape(site.email)}</a>
            </p>
            <p style="margin:0;">${escape(site.address)}</p>
          </td>
        </tr>
      </table>
      <p style="margin:20px 0 0;font-family:${FONT};font-size:12px;line-height:18px;color:#a1a1aa;">
        You're receiving this email because you sent an enquiry through our website.
      </p>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function button(href: string, label: string, background: string, color = "#ffffff") {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="display:inline-table;margin:0 8px 12px 0;">
  <tr>
    <td style="background:${background};">
      <a href="${href}" style="display:inline-block;padding:15px 28px;font-family:${FONT};font-size:15px;font-weight:600;color:${color};text-decoration:none;">${label}</a>
    </td>
  </tr>
</table>`;
}

/** The thank-you email sent back to the person who enquired */
export function confirmationEmail(enquiry: Enquiry, siteUrl: string): Email {
  const name = firstName(enquiry.name);
  const rows = summaryRows(enquiry)
    .map(
      ([label, value]) => `<tr>
        <td style="padding:6px 0;font-family:${FONT};font-size:13px;color:#71717a;width:140px;vertical-align:top;">${label}</td>
        <td style="padding:6px 0;font-family:${FONT};font-size:14px;color:#18181b;font-weight:500;">${escape(value)}</td>
      </tr>`,
    )
    .join("");

  const steps = [
    ["We review your enquiry", "Our team looks at your project and prepares any questions we have."],
    ["We get in touch", "We'll contact you to arrange a free consultation — in person or by video call, wherever you are."],
    ["You receive your proposal", "A clear plan and estimate for your project, with no hidden costs."],
  ]
    .map(
      ([title, text], i) => `<tr>
        <td width="44" style="vertical-align:top;padding:0 0 18px;">
          <div style="width:32px;height:32px;line-height:32px;text-align:center;background:${ORANGE};color:#ffffff;font-family:${FONT};font-size:14px;font-weight:700;">${i + 1}</div>
        </td>
        <td style="vertical-align:top;padding:0 0 18px;font-family:${FONT};">
          <p style="margin:4px 0 2px;font-size:15px;font-weight:600;color:#18181b;">${title}</p>
          <p style="margin:0;font-size:14px;line-height:22px;color:#52525b;">${text}</p>
        </td>
      </tr>`,
    )
    .join("");

  const body = `
        <tr>
          <td class="px" style="padding:48px 40px 8px;font-family:${FONT};">
            <p style="margin:0 0 12px;font-size:12px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:${ORANGE};">Enquiry received</p>
            <h1 class="h1" style="margin:0 0 16px;font-size:30px;line-height:38px;font-weight:700;color:#18181b;">Thank you, ${escape(name)}!</h1>
            <p style="margin:0;font-size:16px;line-height:26px;color:#52525b;">
              We've received your enquiry and we're excited to hear about your project.
              A member of our team will get back to you shortly.
            </p>
          </td>
        </tr>
        <tr>
          <td class="px" style="padding:28px 40px 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;border-left:4px solid ${ORANGE};">
              <tr>
                <td style="padding:22px 24px;">
                  <p style="margin:0 0 10px;font-family:${FONT};font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#71717a;">Your enquiry</p>
                  ${rows ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>` : ""}
                  <p style="margin:12px 0 0;font-family:${FONT};font-size:14px;line-height:22px;color:#3f3f46;font-style:italic;">&ldquo;${nl2br(enquiry.message)}&rdquo;</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="px" style="padding:32px 40px 8px;">
            <p style="margin:0 0 20px;font-family:${FONT};font-size:18px;font-weight:700;color:#18181b;">What happens next</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${steps}</table>
          </td>
        </tr>
        <tr>
          <td class="px" style="padding:8px 40px 44px;">
            <p style="margin:0 0 18px;font-family:${FONT};font-size:15px;line-height:24px;color:#52525b;">In the meantime, take a look at our house designs or chat with us directly.</p>
            ${button(`${siteUrl}/designs`, "Browse house designs", ORANGE)}
            ${button(whatsappLink(), "Chat on WhatsApp", "#25D366")}
          </td>
        </tr>`;

  const text = [
    `Thank you, ${name}!`,
    "",
    "We've received your enquiry and a member of our team will get back to you shortly.",
    "",
    "YOUR ENQUIRY",
    ...summaryRows(enquiry).map(([label, value]) => `${label}: ${value}`),
    `Message: ${enquiry.message}`,
    "",
    "WHAT HAPPENS NEXT",
    "1. We review your enquiry",
    "2. We get in touch to arrange a free consultation",
    "3. You receive a clear proposal and estimate",
    "",
    `Browse our house designs: ${siteUrl}/designs`,
    `Chat on WhatsApp: ${whatsappLink()}`,
    "",
    `${site.name} — ${site.tagline}`,
    `${site.phone.display} · ${site.email}`,
  ].join("\n");

  return {
    subject: `Thank you for your enquiry, ${name} — ${site.name}`,
    html: layout({
      siteUrl,
      preheader: "We've received your enquiry and will be in touch shortly.",
      body,
    }),
    text,
  };
}

/** The notification sent to the company inbox; replying goes straight to the enquirer */
export function notificationEmail(enquiry: Enquiry, siteUrl: string): Email {
  const rows = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ...summaryRows(enquiry),
  ]
    .map(
      ([label, value]) => `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;font-family:${FONT};font-size:13px;color:#71717a;width:150px;vertical-align:top;">${label}</td>
        <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;font-family:${FONT};font-size:15px;color:#18181b;font-weight:500;">${escape(value)}</td>
      </tr>`,
    )
    .join("");

  const body = `
        <tr>
          <td class="px" style="padding:40px 40px 8px;font-family:${FONT};">
            <p style="margin:0 0 12px;font-size:12px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:${ORANGE};">New website enquiry</p>
            <h1 class="h1" style="margin:0 0 8px;font-size:26px;line-height:34px;font-weight:700;color:#18181b;">${escape(enquiry.name)}</h1>
            <p style="margin:0;font-size:15px;color:#52525b;">Reply to this email to respond directly to them.</p>
          </td>
        </tr>
        <tr>
          <td class="px" style="padding:20px 40px 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
          </td>
        </tr>
        <tr>
          <td class="px" style="padding:20px 40px 44px;">
            <p style="margin:0 0 10px;font-family:${FONT};font-size:13px;color:#71717a;">Message</p>
            <div style="background:#fafafa;border-left:4px solid ${ORANGE};padding:18px 22px;font-family:${FONT};font-size:15px;line-height:24px;color:#27272a;">${nl2br(enquiry.message)}</div>
          </td>
        </tr>`;

  const text = [
    "New website enquiry",
    "",
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    ...summaryRows(enquiry).map(([label, value]) => `${label}: ${value}`),
    "",
    enquiry.message,
  ].join("\n");

  return {
    subject: `New enquiry from ${enquiry.name}${enquiry.service ? ` — ${enquiry.service}` : ""}`,
    html: layout({ siteUrl, preheader: `${enquiry.name}: ${enquiry.message.slice(0, 90)}`, body }),
    text,
  };
}
